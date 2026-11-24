# Recebimento dos contatos do quiz (Diagnóstico 4D Express)

O site não tem servidor próprio. Os contatos do quiz vão para uma **planilha do Google** da Expanding English, por um pequeno script gratuito (Google Apps Script). Cada contato novo também chega por **e-mail**.

Tempo: cerca de 10 minutos, uma vez só. É preciso estar logada na conta Google da Expanding English (a mesma do e-mail de aviso).

## Passo a passo

1. Acesse **sheets.google.com** e crie uma planilha em branco. Nome sugerido: `Leads Expanding English`.
2. No menu da planilha: **Extensões → Apps Script**.
3. Apague o código que vier de exemplo e **cole todo o conteúdo** de `captura-de-leads.gs` (este repositório, pasta `backend/`).
4. Confira no topo a linha `EMAIL_AVISO`: é o e-mail que recebe o aviso de cada contato novo.
5. Clique em **Salvar** (ícone de disquete).
6. Clique em **Implantar → Nova implantação**. Na engrenagem, escolha **App da Web** e preencha:
   - **Executar como:** Eu (sua conta)
   - **Quem pode acessar:** Qualquer pessoa
7. Clique em **Implantar**. O Google pedirá autorização (acesso à planilha e envio de e-mail): **Autorizar acesso**, escolha a conta e, se aparecer "app não verificado", clique em **Avançado → Acessar (nome do projeto)**. É o seu próprio script.
8. Copie a **URL do app da Web** (termina em `/exec`).
9. No repositório, abra `js/script.js`, ache a linha `var LEAD_ENDPOINT = '';` e cole a URL entre as aspas:

   ```js
   var LEAD_ENDPOINT = 'https://script.google.com/macros/s/XXXXXXXX/exec';
   ```

10. Salve, publique no GitHub e **faça um teste**: responda o quiz com um nome seu, marque o consentimento e envie. Confira se a linha aparece na aba `Leads` e se o e-mail chegou.

Enquanto `LEAD_ENDPOINT` estiver vazio, o quiz **não pede contato**: vai direto às perguntas e só oferece o WhatsApp no final. **A Política de Privacidade descreve o quiz com coleta de contato, então só divulgue o site depois de concluir este passo a passo**, ou peça para ajustar o texto da política.

## Já instalou a versão 1 do script? Atualize para a versão 2

O quiz novo envia dois eventos por pessoa (`inicio` e `fim`, com o mesmo `id`). Com o script antigo ainda funciona, mas cada pessoa vira **duas linhas** na planilha. Para atualizar:

1. Abra a planilha → **Extensões → Apps Script**.
2. Apague o código e cole o conteúdo atual de `captura-de-leads.gs`. **Salvar.**
3. **Implantar → Gerenciar implantações → lápis (editar) → Versão: Nova versão → Implantar.** A URL `/exec` **continua a mesma**, não precisa mexer no `js/script.js`.
4. A planilha existente é aproveitada: o script acrescenta sozinho o cabeçalho "ID" na coluna M. Linhas antigas ficam sem ID, e tudo bem.
5. Publique o site novo (`index.html`, `js/script.js`) e **teste de novo** (passo 10).

## Como fica o fluxo para quem responde

1. **Tela de contato** antes das perguntas: nome, WhatsApp e e-mail (os três obrigatórios) e **dois consentimentos separados** (o primeiro é necessário; o segundo, sobre receber conteúdos, é opcional e começa desmarcado).
2. Ao clicar em **Começar o diagnóstico**, o contato vai na hora para a planilha (status `iniciou`) e chega o e-mail "Novo contato (começou o diagnóstico)". **Se a pessoa abandonar no meio, o contato já está salvo.**
3. 5 perguntas.
4. **Resultado imediato** na tela. A linha da planilha é atualizada (status `concluiu`, perfil e respostas) e chega o e-mail "Diagnóstico concluído: nome, perfil". Assim quem atende já sabe o perfil antes de responder.
5. O **WhatsApp abre sozinho** depois de uma contagem de 8 segundos, com a mensagem pronta e o nome da pessoa. Há um botão **Cancelar** na tela e o botão "Quero entender isso a fundo" fica sempre disponível. Para mudar o tempo ou desligar: `WHATSAPP_AUTO_OPEN_SECONDS` em `js/script.js` (0 desliga).
6. Se algum envio falhar (internet, script fora do ar), o quiz continua e o resultado aparece do mesmo jeito. O envio "fim" reenvia todos os dados, então o contato se recupera. Se falhar também, a tela avisa para usar o botão do WhatsApp.
7. **Refazer o diagnóstico** não pede o contato de novo; o resultado novo atualiza a mesma linha.

## O que fica na planilha

Data e hora, nome, WhatsApp, e-mail, perfil, respostas (códigos), consentimento, se aceita conteúdos, **versão da política aceita** (prova de consentimento), origem (utm, se houver), a página, o status (`iniciou` ou `concluiu`) e um ID interno que liga as duas etapas. Não guarda IP nem dados do aparelho.

## Cuidados

- **A planilha é privada.** Compartilhe só com quem atende os contatos. Se alguém sair da equipe, remova o acesso.
- **Prazo de guarda:** a política diz até 24 meses após o último contato para quem não fechou. Revise a planilha de tempos em tempos e apague o que passou do prazo.
- **Pedido de exclusão:** apague a linha da pessoa e registre a data (veja o checklist interno do documento A6).
- **Quem pede para não receber conteúdos:** troque "Aceita conteúdos" para "não" e nunca mais envie.
- **Se mudar o texto da Política de Privacidade**, atualize também `POLICY_VERSION` em `js/script.js`.
- **Se alterar o script** depois de implantado: **Implantar → Gerenciar implantações → editar (lápis) → Versão: Nova versão**. A URL continua a mesma.
- **Limite do plano gratuito do Google:** cerca de 100 e-mails de aviso por dia (cada pessoa gera até 2). Os contatos continuam sendo gravados na planilha mesmo se o aviso por e-mail não puder ser enviado.
- **Spam:** o script descarta robôs simples (campo-isca) e valida tudo no servidor. Se aparecer contato falso em massa, avise: dá para acrescentar o Cloudflare Turnstile (verificação gratuita).
