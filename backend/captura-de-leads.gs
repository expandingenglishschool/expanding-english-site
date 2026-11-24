/**
 * ============================================================================
 * EXPANDING ENGLISH — backend/captura-de-leads.gs   (versão 2)
 * Recebe os contatos do Diagnóstico 4D Express, grava numa planilha do Google e
 * avisa por e-mail.
 * ============================================================================
 *
 * TECNOLOGIA: Google Apps Script (JavaScript do Google), gratuito, rodando na
 * conta Google da Expanding English. Este arquivo é só a cópia do código: ele
 * funciona dentro do Google, não no site. Passo a passo: backend/LEIA-ME.md.
 *
 * COMO FUNCIONA (o site envia DOIS eventos por pessoa, com o mesmo "id"):
 *   - "inicio": a pessoa preencheu o contato e começou o quiz. Cria a linha
 *               (status "iniciou") e avisa por e-mail. Assim o contato NÃO se
 *               perde se ela abandonar as perguntas.
 *   - "fim":    a pessoa terminou. Atualiza a MESMA linha com o perfil e as
 *               respostas (status "concluiu") e avisa por e-mail com o perfil.
 *               O "fim" traz todos os dados de novo: se o "inicio" tiver falhado,
 *               a linha é criada nesse momento.
 *
 * A CADA ENVIO: descarta robôs (campo-isca), valida tudo no servidor, grava com
 * trava contra envios simultâneos e neutraliza fórmulas de planilha.
 *
 * PROVA DE CONSENTIMENTO (LGPD): cada linha guarda data e hora, o consentimento,
 * a opção de receber conteúdo e a versão da Política de Privacidade aceita.
 *
 * PRIVACIDADE: a planilha fica privada, na conta da Thayná. Não compartilhe a
 * planilha com ninguém além de quem precisa atender os contatos.
 */

// ---- CONFIGURAÇÃO (edite só aqui) -----------------------------------------
var EMAIL_AVISO = 'expandingenglishschool@gmail.com';  // quem recebe os avisos
var NOME_DA_ABA = 'Leads';
var LINHAS_PARA_PROCURAR = 1000;   // quantas linhas recentes olhar ao procurar o "id"
// ----------------------------------------------------------------------------

var CABECALHO = [
  'Data e hora', 'Nome', 'WhatsApp', 'E-mail', 'Perfil', 'Respostas',
  'Consentimento', 'Aceita conteúdos', 'Versão da política', 'Origem', 'Página',
  'Status', 'ID'
];
var COL = { PERFIL: 5, RESPOSTAS: 6, STATUS: 12, ID: 13 };   // posições (1 = coluna A)

function doPost(e) {
  var p = (e && e.parameter) ? e.parameter : {};

  // 1) Robô: o campo-isca "website" é invisível para pessoas.
  if (p.website) { return resposta_('ok'); }

  // 2) Validação no servidor (não confie só no que o site já validou).
  var evento = (p.evento === 'fim') ? 'fim' : 'inicio';
  var id = String(p.id || '').toLowerCase();
  var nome = limpar_(p.nome, 100);
  var whatsapp = String(p.whatsapp || '').replace(/\D/g, '');
  var email = limpar_(p.email, 120);
  if (!/^[a-z0-9]{8,40}$/.test(id) || nome.length < 2 ||
      !/^55\d{10,11}$/.test(whatsapp) || p.consentimento !== 'sim') {
    return resposta_('erro');
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { email = ''; }

  var perfil = limpar_(p.perfil, 60);
  var respostas = limpar_(p.respostas, 30);
  var aceita = (p.marketing === 'sim') ? 'sim' : 'não';

  var linhaNova = [
    new Date(), nome, whatsapp, email,
    perfil, respostas,
    'sim', aceita, limpar_(p.politica_versao, 20),
    limpar_(p.origem, 140), limpar_(p.pagina, 80),
    evento === 'fim' ? 'concluiu' : 'iniciou', id
  ];

  // 3) Grava (com trava para dois envios simultâneos não se atropelarem).
  var criou = false, atualizou = false;
  var trava = LockService.getScriptLock();
  trava.waitLock(15000);
  try {
    var aba = abaLeads_();
    var numero = acharLinha_(aba, id);
    if (numero) {
      if (evento === 'fim') {
        aba.getRange(numero, COL.PERFIL).setValue(perfil);
        aba.getRange(numero, COL.RESPOSTAS).setValue(respostas);
        aba.getRange(numero, COL.STATUS).setValue('concluiu');
        atualizou = true;
      }
      // "inicio" repetido para um id que já existe: ignora.
    } else {
      aba.appendRow(linhaNova);
      criou = true;
    }
  } finally {
    trava.releaseLock();
  }

  // 4) Avisos por e-mail (se falhar, o contato já está salvo na planilha).
  try {
    if (criou && evento === 'inicio') {
      avisar_('Novo contato (começou o diagnóstico): ' + nome, nome, whatsapp, email, '— (ainda respondendo)', aceita, linhaNova);
    } else if (criou || atualizou) {
      avisar_('Diagnóstico concluído: ' + nome + ' — ' + perfil, nome, whatsapp, email, perfil, aceita, linhaNova);
    }
  } catch (erro) { /* mantém o contato salvo mesmo se o e-mail falhar */ }

  return resposta_('ok');
}

// Abrir o endereço no navegador (GET) só mostra que o serviço está de pé; não expõe dados.
function doGet() { return resposta_('servico ativo'); }

function abaLeads_() {
  var planilha = SpreadsheetApp.getActiveSpreadsheet();
  var aba = planilha.getSheetByName(NOME_DA_ABA) || planilha.insertSheet(NOME_DA_ABA);
  if (aba.getLastRow() === 0) {
    aba.appendRow(CABECALHO);
    aba.setFrozenRows(1);
    aba.getRange(1, 1, 1, CABECALHO.length).setFontWeight('bold');
  } else if (aba.getRange(1, COL.ID).getValue() !== 'ID') {
    // planilha criada na versão 1 do script: acrescenta o cabeçalho da coluna ID
    aba.getRange(1, COL.ID).setValue('ID').setFontWeight('bold');
  }
  return aba;
}

// Procura o "id" nas últimas linhas; devolve o número da linha ou 0.
function acharLinha_(aba, id) {
  var ultima = aba.getLastRow();
  if (ultima < 2) { return 0; }
  var primeira = Math.max(2, ultima - LINHAS_PARA_PROCURAR + 1);
  var ids = aba.getRange(primeira, COL.ID, ultima - primeira + 1, 1).getValues();
  for (var i = ids.length - 1; i >= 0; i--) {
    if (String(ids[i][0]) === id) { return primeira + i; }
  }
  return 0;
}

function avisar_(assunto, nome, whatsapp, email, perfil, aceita, linha) {
  MailApp.sendEmail({
    to: EMAIL_AVISO,
    subject: assunto,
    body:
      'Nome: ' + nome + '\n' +
      'WhatsApp: ' + whatsapp + '  (https://wa.me/' + whatsapp + ')\n' +
      'E-mail: ' + (email || '—') + '\n' +
      'Perfil: ' + perfil + '\n' +
      'Aceita receber conteúdos: ' + aceita + '\n' +
      'Origem: ' + (linha[9] || '—') + '\n\n' +
      'Este contato autorizou o uso dos dados para retorno sobre o diagnóstico ' +
      '(política de ' + linha[8] + '). Está na planilha, aba "' + NOME_DA_ABA + '".'
  });
}

function resposta_(texto) {
  return ContentService.createTextOutput(texto).setMimeType(ContentService.MimeType.TEXT);
}

// Corta o tamanho e neutraliza fórmulas (=, +, -, @) que a planilha poderia executar.
function limpar_(valor, max) {
  var s = String(valor == null ? '' : valor).replace(/[\r\n\t]+/g, ' ').trim().substring(0, max);
  if (/^[=+\-@]/.test(s)) { s = "'" + s; }
  return s;
}
