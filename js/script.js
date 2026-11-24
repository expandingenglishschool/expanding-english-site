/* ============================================================================
   EXPANDING ENGLISH — js/script.js
   Todo o comportamento do site: menu mobile, rolagem suave e quiz.
   ============================================================================

   TECNOLOGIA
   - JavaScript puro (vanilla), escrito em estilo ES5: var, function, sem arrow
     functions, sem template strings, sem módulos. Motivo: roda em praticamente
     qualquer navegador e não exige build, npm nem transpilador.
   - Sem bibliotecas externas (nada de jQuery, React etc.).
   - Carregado no final do <body> (index.html); por isso o HTML já existe
     quando este arquivo roda e dá para buscar os elementos direto por id.

   CONTEÚDO
   1. Ano do rodapé
   2. Menu mobile (abrir e fechar)
   3. Rolagem suave entre seções: scrollToSection(id)
   4. Diagnóstico 4D Express: quiz de 5 perguntas -> 3 perfis
   5. Etapa de contato (ANTES das perguntas): nome, WhatsApp e e-mail + consentimento,
      enviados para a planilha do Google; resultado na tela e abertura do WhatsApp

   ONDE EDITAR
   - Número de WhatsApp do resultado .... constante WHATSAPP_NUMBER
   - Perguntas e alternativas ........... constante QUESTIONS
   - Textos dos 3 resultados ............ constante RESULTS
   - Mensagem enviada ao WhatsApp ....... função showResult()
   - Abrir o WhatsApp sozinho no fim .... constante WHATSAPP_AUTO_OPEN_SECONDS (0 desliga)
   - Onde os contatos do quiz chegam .... constante LEAD_ENDPOINT (veja backend/LEIA-ME.md)
   - Versão do texto de consentimento ... constante POLICY_VERSION

   SOBRE O WHATSAPP
   - Os botões do HTML usam o link curto oficial da empresa
     (wa.me/message/...). Esse formato pode não aceitar mensagem pré-preenchida.
   - Por isso o botão do resultado do quiz é montado aqui no formato com número
     (wa.me/NUMERO?text=...), que aceita a mensagem pronta com o perfil.
   ============================================================================ */


/* ============================================================================
   1. ANO DO RODAPÉ
   Preenche o <span id="year"> do rodapé com o ano atual (sem precisar editar
   o HTML todo janeiro).
   ============================================================================ */
var yearEl = document.getElementById('year');
if (yearEl) { yearEl.textContent = new Date().getFullYear(); }


/* ============================================================================
   2. MENU MOBILE
   No celular, o botão hambúrguer (#navtoggle) liga e desliga a classe "open"
   no menu (#navlinks); o CSS faz o menu deslizar para dentro da tela.
   ============================================================================ */
var navtoggle = document.getElementById('navtoggle');
var navlinks = document.getElementById('navlinks');

// As páginas de destino (diagnostico/ e empresas/) têm cabeçalho simples, sem menu: por isso o "if".
if (navtoggle && navlinks) {
  navtoggle.addEventListener('click', function () {
    var isOpen = navlinks.className.indexOf('open') > -1;
    navlinks.className = isOpen ? 'navlinks' : 'navlinks open';
    navtoggle.setAttribute('aria-expanded', String(!isOpen));
  });

  // Ao tocar em um item do menu, o menu fecha (os itens são <button class="navlink">)
  var navButtons = navlinks.querySelectorAll('.navlink');
  for (var ni = 0; ni < navButtons.length; ni++) {
    navButtons[ni].addEventListener('click', function () {
      navlinks.className = 'navlinks';
      navtoggle.setAttribute('aria-expanded', 'false');
    });
  }
}


/* ============================================================================
   3. ROLAGEM SUAVE
   Usada pelos botões do HTML: onclick="scrollToSection('diagnostico')".
   Por que botão + função, e não link com href="#diagnostico"? Links com # são
   interceptados por alguns visualizadores/pré-visualizações (abrem aviso de
   "link externo"). Assim a rolagem acontece sempre dentro da própria página.
   Para criar um novo destino: dê um id à <section> e chame scrollToSection('id').
   ============================================================================ */
function scrollToSection(id) {
  var el = document.getElementById(id);
  if (el) { el.scrollIntoView({ behavior: 'smooth', block: 'start' }); }
}

// Acessibilidade: ao trocar de pergunta ou mostrar o resultado, o foco vai para
// o novo conteúdo (as alternativas antigas somem da tela; sem isto, quem usa
// teclado ou leitor de tela perderia o ponto onde estava).
function focusEl(el) {
  if (el && el.focus) { try { el.focus({ preventScroll: true }); } catch (e) { el.focus(); } }
}


/* ============================================================================
   4. DIAGNÓSTICO 4D EXPRESS (quiz)
   Fluxo: 5 perguntas -> cada resposta soma 1 ponto em um perfil -> o perfil com
   mais pontos vira o resultado -> botão leva ao WhatsApp com mensagem pronta.

   Códigos dos perfis (campo "p" de cada alternativa):
     ET = Estrutura Travada
     CE = Contexto Errado
     BD = Bloqueio Disfarçado
   Em caso de empate, vence o primeiro perfil na ordem ET, CE, BD.
   ============================================================================ */

// Tudo daqui até o fim do arquivo é o quiz. Ele roda só nas páginas que têm o quiz
// (index.html e diagnostico/index.html); na página de empresas, nada disso é executado.
(function () {
if (!document.getElementById('diagQuiz')) { return; }

// Número que recebe os resultados do quiz (confirmado pela Thayná).
// Formato internacional, só dígitos: 55 (Brasil) + DDD + número, sem espaços, + ou traços.
var WHATSAPP_NUMBER = '5562996504985';

// Depois do resultado, o WhatsApp abre sozinho após esta contagem (em segundos), com a
// mensagem pronta e a opção "Cancelar" na tela. Use 0 para desligar e deixar só o botão.
var WHATSAPP_AUTO_OPEN_SECONDS = 8;

// Perguntas. Cada alternativa: t = texto exibido, p = perfil que ela pontua.
// Para mudar uma pergunta, edite "q"; para mudar uma resposta, edite o "t" dela.
// Mantenha 3 alternativas por pergunta, uma para cada perfil (ET, CE, BD).
var QUESTIONS = [
  {
    q: "Quando você sabe a resposta em português, o que acontece na hora de falar em inglês?",
    opts: [
      { t: "Consigo montar a frase, mas demoro muito — a conversa já andou quando termino de pensar.", p: "ET" },
      { t: "Quando ninguém está ouvindo, eu me viro bem. É só com alguém esperando que trava.", p: "CE" },
      { t: "Às vezes nem tento — o medo de errar chega antes de eu saber se vou errar.", p: "BD" }
    ]
  },
  {
    q: "Quando você pratica sem ninguém ouvindo (gravando um vídeo, por exemplo), como se sai?",
    opts: [
      { t: "Regular — a trava acontece até sem plateia.", p: "ET" },
      { t: "Bem melhor do que numa conversa ao vivo.", p: "CE" },
      { t: "Bem — o problema não é o inglês em si, é ter alguém me observando.", p: "BD" }
    ]
  },
  {
    q: "O que mais te define quando o assunto é inglês no trabalho?",
    opts: [
      { t: "Sei o vocabulário, mas monto a frase devagar demais pro ritmo real.", p: "ET" },
      { t: "Entendo tudo, escrevo bem — mas ao vivo é outra pessoa que aparece.", p: "CE" },
      { t: "Sei mais do que demonstro — o medo chega antes da palavra.", p: "BD" }
    ]
  },
  {
    q: "Numa reunião ou entrevista importante, o que trava primeiro?",
    opts: [
      { t: "A formulação — não acho as palavras na velocidade certa.", p: "ET" },
      { t: "O contexto — nunca pratiquei sob esse tipo de pressão real.", p: "CE" },
      { t: "A cabeça — o julgamento pesa mais que o conteúdo, ali.", p: "BD" }
    ]
  },
  {
    q: "Se pudesse resolver só uma coisa agora, seria:",
    opts: [
      { t: "Formular a frase mais rápido, sem travar no meio.", p: "ET" },
      { t: "Treinar em situação real, com gente de verdade, sob pressão real.", p: "CE" },
      { t: "Parar de travar por medo antes mesmo de tentar.", p: "BD" }
    ]
  }
];

// Textos de cada resultado: tag (etiqueta), title (título) e body (explicação).
var RESULTS = {
  ET: {
    tag: "Perfil 1 · Estrutura Travada",
    title: "Você sabe montar a frase. Ela só não vem rápido o suficiente.",
    body: "O inglês está lá — só não foi treinado pro ritmo da conversa real. Isso não é falta de vocabulário. É velocidade de acesso sob pressão, e isso se treina de forma específica."
  },
  CE: {
    tag: "Perfil 2 · Contexto Errado",
    title: "Seu inglês funciona. Só não no contexto onde você mais precisa dele.",
    body: "Você entende, escreve bem, se vira quando ninguém está ouvindo — mas o inglês foi construído pra consumo individual, nunca pra resposta em tempo real com alguém esperando. É um gap de contexto, não de capacidade."
  },
  BD: {
    tag: "Perfil 3 · Bloqueio Disfarçado",
    title: "Você sabe mais inglês do que demonstra.",
    body: "O medo de errar, de soar errado, do que os outros vão pensar — chega antes do inglês e ocupa o espaço. Isso não se resolve com mais estudo. Tem solução específica, e não é a que a maioria tenta primeiro."
  }
};

// Estado do quiz: índice da pergunta atual, pontuação de cada perfil e respostas dadas.
var current = 0;
var tally = { ET: 0, CE: 0, BD: 0 };
var answers = [];
var winnerKey = 'ET';

// Endereço (URL "/exec") do script do Google que recebe os contatos do quiz.
// Enquanto estiver VAZIO, o quiz não pede contato: vai direto às perguntas e só oferece
// o WhatsApp no final. Preencha depois de seguir backend/LEIA-ME.md.
var LEAD_ENDPOINT = '';

// Data (AAAA-MM-DD) da versão da Política de Privacidade que o visitante aceitou.
// Vai junto com cada contato, como prova de consentimento. Atualize ao mudar a política.
var POLICY_VERSION = '2026-11-20';

// Elementos da página que o quiz controla (ids definidos no index.html).
var progressEl = document.getElementById('diagProgress');
var qLabelEl = document.getElementById('diagQLabel');
var qEl = document.getElementById('diagQ');
var optsEl = document.getElementById('diagOpts');
var quizEl = document.getElementById('diagQuiz');
var resultEl = document.getElementById('diagResult');
var leadEl = document.getElementById('diagLead');

// Barra de progresso: uma barrinha por pergunta; as já respondidas ganham a classe "done".
function buildProgress() {
  progressEl.innerHTML = '';
  for (var i = 0; i < QUESTIONS.length; i++) {
    var bar = document.createElement('i');
    if (i < current) bar.className = 'done';
    progressEl.appendChild(bar);
  }
}

// Desenha a pergunta atual e suas alternativas. Ao clicar em uma alternativa:
// soma o ponto no perfil dela e avança (ou mostra o resultado, se foi a última).
function renderQuestion(moveFocus) {
  buildProgress();
  var item = QUESTIONS[current];
  qLabelEl.textContent = 'Pergunta ' + (current + 1) + ' de ' + QUESTIONS.length;
  qEl.textContent = item.q;
  optsEl.innerHTML = '';
  for (var i = 0; i < item.opts.length; i++) {
    (function (opt) {
      var btn = document.createElement('button');
      btn.className = 'diag-opt';
      btn.type = 'button';
      btn.textContent = opt.t;
      btn.addEventListener('click', function () {
        tally[opt.p]++;
        answers.push(opt.p);
        current++;
        if (current < QUESTIONS.length) {
          renderQuestion(true);
        } else {
          finishQuiz();
        }
      });
      optsEl.appendChild(btn);
    })(item.opts[i]);
  }
  if (moveFocus) { focusEl(qEl); }
}

// Calcula o perfil vencedor (empate: o primeiro na ordem ET, CE, BD).
function computeWinner() {
  var winner = 'ET';
  var best = -1;
  for (var key in tally) {
    if (tally[key] > best) { best = tally[key]; winner = key; }
  }
  return winner;
}

// Contato do visitante, preenchido na etapa de contato (antes das perguntas).
// Fica null enquanto a pessoa não preencheu (ou se LEAD_ENDPOINT estiver vazio).
var lead = null;
var leadId = '';
var autoTimer = null;

// Fim das 5 perguntas: mostra o resultado na hora, registra a conclusão e, se
// configurado, abre o WhatsApp sozinho (com opção de cancelar).
function finishQuiz() {
  winnerKey = computeWinner();
  showResult();
  if (lead) {
    // O evento "fim" leva TODOS os dados de novo: se o "inicio" tiver falhado, o contato não se perde.
    sendLead(leadPayload('fim'), function (ok) {
      if (!ok) {
        var note = document.getElementById('resultNote');
        note.textContent = 'Não conseguimos registrar seu contato agora. Para falar com a equipe, use o botão abaixo.';
        note.hidden = false;
      }
      startAutoOpen();
    });
  } else {
    startAutoOpen();
  }
}

// Preenche a tela de resultado e monta o link do WhatsApp com a mensagem pronta.
function showResult() {
  var r = RESULTS[winnerKey];
  document.getElementById('resultTag').textContent = r.tag;
  document.getElementById('resultTitle').textContent = r.title;
  document.getElementById('resultBody').textContent = r.body;
  document.getElementById('resultNote').hidden = true;

  var name = lead ? lead.nome : '';
  var msg = 'Oi!' + (name ? ' Sou ' + name + '.' : '') + ' Acabei de fazer o Diagnóstico 4D Express da Expanding English e meu resultado foi: ' + r.tag + '. Quero entender isso a fundo.';
  var waLink = 'https://wa.me/' + WHATSAPP_NUMBER + '?text=' + encodeURIComponent(msg);
  document.getElementById('resultCta').setAttribute('href', waLink);

  quizEl.className = 'diag-quiz hide';
  leadEl.className = 'diag-lead';
  resultEl.className = 'diag-result show';
  focusEl(document.getElementById('resultTitle'));
}

// Contagem para abrir o WhatsApp sozinho. A pessoa pode cancelar (acessibilidade e controle).
function startAutoOpen() {
  if (WHATSAPP_AUTO_OPEN_SECONDS <= 0) { return; }
  cancelAutoOpen();
  var left = WHATSAPP_AUTO_OPEN_SECONDS;
  var box = document.getElementById('resultAuto');
  var secs = document.getElementById('autoSecs');
  secs.textContent = left;
  box.hidden = false;
  autoTimer = setInterval(function () {
    left--;
    secs.textContent = left;
    if (left <= 0) {
      cancelAutoOpen();
      window.location.href = document.getElementById('resultCta').getAttribute('href');
    }
  }, 1000);
}
function cancelAutoOpen() {
  if (autoTimer) { clearInterval(autoTimer); autoTimer = null; }
  document.getElementById('resultAuto').hidden = true;
}
document.getElementById('autoCancel').addEventListener('click', cancelAutoOpen);

// "Refazer o diagnóstico": volta à primeira pergunta. O contato já informado é mantido
// (não pede de novo); ao concluir, o resultado novo atualiza a mesma linha da planilha.
document.getElementById('diagRestart').addEventListener('click', function () {
  cancelAutoOpen();
  current = 0;
  tally.ET = 0; tally.CE = 0; tally.BD = 0;
  answers = [];
  document.getElementById('resultNote').hidden = true;
  resultEl.className = 'diag-result';
  quizEl.className = 'diag-quiz';
  renderQuestion(true);
});

// Início: desenha a primeira pergunta. Com LEAD_ENDPOINT configurado, a etapa de contato
// aparece primeiro e as perguntas ficam escondidas até o envio.
renderQuestion(false);
if (LEAD_ENDPOINT) {
  quizEl.className = 'diag-quiz hide';
  leadEl.className = 'diag-lead show';
}


/* ============================================================================
   5. ETAPA DE CONTATO (antes das perguntas)
   Só aparece se LEAD_ENDPOINT estiver preenchido.
   - pede nome, WhatsApp e e-mail (os três obrigatórios) e o consentimento 1;
   - o consentimento 2 (receber conteúdos) é opcional e começa desmarcado;
   - ao clicar em "Começar", o contato é enviado na hora (evento "inicio"): mesmo que a
     pessoa abandone no meio do quiz, o contato já está na planilha;
   - ao terminar, o evento "fim" atualiza a mesma linha com o perfil e as respostas;
   - se um envio falhar, o quiz segue normalmente; o "fim" reenvia tudo.
   Dados enviados: nome, whatsapp, email, perfil, respostas (códigos ET/CE/BD),
   consentimento, marketing, versão da política, origem (utm), página e um id.
   ============================================================================ */

// Só dígitos do telefone; aceita DDD + número (10 ou 11 dígitos), com ou sem 55.
function normalizePhone(raw) {
  var d = String(raw || '').replace(/\D/g, '');
  if ((d.length === 10 || d.length === 11)) { return '55' + d; }
  if ((d.length === 12 || d.length === 13) && d.substring(0, 2) === '55') { return d; }
  return '';
}

// Lê a origem da visita (?utm_source=instagram&utm_medium=bio...), sem dado pessoal.
function readOrigin() {
  var out = [];
  var q = (window.location.search || '').replace(/^\?/, '').split('&');
  for (var i = 0; i < q.length; i++) {
    var kv = q[i].split('=');
    if (kv[0] === 'utm_source' || kv[0] === 'utm_medium' || kv[0] === 'utm_campaign') {
      out.push(kv[0] + '=' + decodeURIComponent((kv[1] || '').replace(/\+/g, ' ')).substring(0, 60));
    }
  }
  return out.join(' ');
}

// Identificador aleatório do contato (liga o "inicio" ao "fim" na planilha). Não é dado pessoal.
function newLeadId() {
  return Date.now().toString(36) + Math.random().toString(36).substring(2, 10);
}

function leadPayload(evento) {
  return {
    evento: evento,
    id: leadId,
    nome: lead.nome,
    whatsapp: lead.whatsapp,
    email: lead.email,
    perfil: evento === 'fim' ? RESULTS[winnerKey].tag : '',
    respostas: answers.join(','),
    consentimento: 'sim',
    marketing: lead.marketing ? 'sim' : 'nao',
    politica_versao: POLICY_VERSION,
    origem: readOrigin(),
    pagina: window.location.pathname,
    website: document.getElementById('leadWebsite').value
  };
}

function setLeadError(msg, fieldId) {
  var err = document.getElementById('leadError');
  err.textContent = msg;
  var ids = ['leadName', 'leadPhone', 'leadEmail'];
  for (var i = 0; i < ids.length; i++) {
    document.getElementById(ids[i]).setAttribute('aria-invalid', ids[i] === fieldId ? 'true' : 'false');
  }
  if (fieldId) { document.getElementById(fieldId).focus(); }
}

// Envia os dados por POST (formulário simples, sem biblioteca). callback(true|false).
function sendLead(fields, callback) {
  var parts = [];
  for (var k in fields) {
    if (fields.hasOwnProperty(k)) { parts.push(encodeURIComponent(k) + '=' + encodeURIComponent(fields[k])); }
  }
  var finished = false;
  function done(ok) { if (!finished) { finished = true; callback(ok); } }
  try {
    var xhr = new XMLHttpRequest();
    xhr.open('POST', LEAD_ENDPOINT, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded;charset=UTF-8');
    xhr.timeout = 12000;
    xhr.onload = function () { done(xhr.status >= 200 && xhr.status < 300 && /ok/.test(xhr.responseText || '')); };
    xhr.onerror = function () { done(false); };
    xhr.ontimeout = function () { done(false); };
    xhr.send(parts.join('&'));
  } catch (e) { done(false); }
}

leadEl.addEventListener('submit', function (ev) {
  ev.preventDefault();
  var name = document.getElementById('leadName').value.replace(/^\s+|\s+$/g, '');
  var phone = normalizePhone(document.getElementById('leadPhone').value);
  var email = document.getElementById('leadEmail').value.replace(/^\s+|\s+$/g, '');
  var consent = document.getElementById('leadConsent').checked;
  var marketing = document.getElementById('leadMarketing').checked;

  if (name.length < 2) { setLeadError('Informe seu nome.', 'leadName'); return; }
  if (!phone) { setLeadError('Informe um WhatsApp válido, com DDD. Exemplo: (62) 90000-0000.', 'leadPhone'); return; }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { setLeadError('Informe um e-mail válido.', 'leadEmail'); return; }
  if (!consent) { setLeadError('Para continuar, marque a autorização.', 'leadConsent'); return; }
  setLeadError('', '');

  lead = { nome: name, whatsapp: phone, email: email, marketing: marketing };
  leadId = newLeadId();
  sendLead(leadPayload('inicio'), function () { /* o evento "fim" reenvia tudo se este falhar */ });

  leadEl.className = 'diag-lead';
  quizEl.className = 'diag-quiz';
  renderQuestion(true);
});

})();
