# Expanding English — Site e página de links

Endereço oficial: **https://www.expandingenglish.com.br**

Este repositório tem estas páginas:

1. **Site institucional** de página única: `index.html`.
2. **Página de links** (o "link na bio" do Instagram @southaynaguimaraes): `links/index.html`.
3. **Landing do Diagnóstico 4D Express**: `diagnostico/index.html` (`/diagnostico/`). Tem o quiz já na primeira dobra.
4. **Landing para empresas** (workshop, palestra e treinamento): `empresas/index.html` (`/empresas/`).
5. **Política de Privacidade** e **Termos de Uso**: `privacidade/` e `termos/`.

Todas são **estáticas**: abrem direto no navegador, não precisam de servidor, banco de dados nem instalação, e podem ser publicadas de graça no GitHub Pages.

---

## Tecnologias

| Camada | Tecnologia | Onde fica |
|---|---|---|
| Estrutura | HTML5 semântico | `index.html` e `links/index.html` |
| Estilo do site | CSS3 puro: Flexbox + variáveis CSS, sem framework | `css/styles.css` |
| Estilo das landing pages | Complemento do estilo do site (mesmas cores, fontes, cards e quiz) | `css/landing.css` |
| Estilo da página de links | CSS3 puro: Flexbox + variáveis CSS, sem framework | `css/bio.css` |
| Comportamento do site | JavaScript puro, estilo ES5, sem biblioteca | `js/script.js` |
| Comportamento da página de links | Nenhum (a página não usa JavaScript) | — |
| Fontes | **Staatliches** (títulos) e **Manrope** (textos), hospedadas no próprio site (`.woff2`, licença OFL). Nenhum pedido a servidor externo | `fonts/` e `css/fonts.css` |
| Recebimento dos contatos do quiz | Google Apps Script + Planilhas Google (gratuito, na conta da Expanding English) | `backend/` |
| Ícones da página de links | Feather Icons (licença MIT), em sprite SVG dentro do HTML | início de `links/index.html` |
| Imagens | PNG (logos e ícone) e JPG (fotos) | `images/` |
| Build | Nenhum (sem npm, sem bundler, sem compilação) | — |
| Hospedagem | GitHub Pages (site estático) | — |

Navegadores: versões atuais de Chrome, Edge, Safari e Firefox (o CSS usa `clamp()`, `backdrop-filter`, `:focus-visible` e `text-wrap: balance`; navegador antigo ignora o que não conhece e a página continua legível).

---

## Estrutura de pastas

```
expanding-english-site/
├── index.html            Site: estrutura e textos (cada seção tem um comentário no topo)
├── diagnostico/
│   └── index.html        Landing do Diagnóstico 4D Express (quiz na primeira dobra)
├── empresas/
│   └── index.html        Landing para empresas: Palestra, Workshop e Treinamento
├── links/
│   └── index.html        Página de links da bio do Instagram
├── backend/
│   ├── captura-de-leads.gs   Script do Google que recebe os contatos do quiz (cópia do código)
│   └── LEIA-ME.md            Passo a passo para colocar no ar (10 minutos)
├── privacidade/
│   └── index.html        Política de Privacidade (LGPD)
├── termos/
│   └── index.html        Termos de Uso
├── css/
│   ├── legal.css         Páginas de privacidade e termos
│   ├── fonts.css         Declaração das fontes (usada pelo site, pela página de links e pela 404)
│   ├── styles.css        Site: cores, tipografia, layout e responsivo
│   ├── landing.css       Landing pages (diagnostico/ e empresas/): complemento do styles.css
│   └── bio.css           Página de links: cores, tipografia e layout
├── js/
│   └── script.js         Menu mobile, rolagem suave e Diagnóstico 4D Express (quiz). Serve o site e as landing pages; o quiz só roda onde há quiz
├── fonts/                Arquivos das fontes (.woff2) e licenças
├── images/
│   ├── logo-light.png    Logo com texto PRETO, para fundo claro (menu do site), 480 × 136 px
│   ├── logo-dark.png     Logo com texto BRANCO, para fundo escuro (rodapé, página de links e 404), 480 × 136 px
│   ├── icon.png          Só o símbolo (ícone da aba do navegador), 512 × 512 px, fundo transparente
│   ├── apple-touch-icon.png  Ícone para a tela inicial do iPhone (180 × 180 px, fundo branco; o iPhone não aceita transparência)
│   ├── og-expanding-english.jpg  Imagem que aparece ao compartilhar o link (WhatsApp, LinkedIn), 1200 × 630 px
│   ├── hero-thayna.jpg   Foto da primeira dobra do site
│   ├── about-thayna.jpg  Foto da seção "Quem diagnostica" do site
│   └── avatar-thayna.jpg Foto redonda da página de links (quadrada, 400 × 400 px)
├── 404.html              Página exibida quando o endereço não existe
├── CNAME                 Domínio próprio (www.expandingenglish.com.br) para o GitHub Pages
├── robots.txt            Libera os buscadores e aponta o sitemap
├── sitemap.xml           Lista das páginas para o Google (atualize a data ao mudar uma página)
├── .nojekyll             Diz ao GitHub Pages para publicar os arquivos como estão
├── .gitignore            Arquivos que o Git deve ignorar (lixo de sistema e editor)
└── README.md             Este guia
```

> **Atenção:** existem dois arquivos chamados `index.html`: o do site (na raiz) e o da página de links (dentro de `links/`). Não troque um pelo outro, e mantenha a pasta `links/` ao lado de `index.html`, porque a página de links usa caminhos que começam com `../`.

### Seções do site (na ordem em que aparecem)

| # | Seção | `id` | O que tem |
|---|---|---|---|
| 1 | Cabeçalho | — | Logo, menu, botão "Fazer diagnóstico" |
| 2 | Hero | — | Promessa principal, 2 botões, foto da fundadora |
| 3 | Manifesto | `manifesto` | Frase de posicionamento e texto de apoio |
| 4 | Diagnóstico 4D Express | `diagnostico` | Quiz de 5 perguntas que termina no WhatsApp |
| 5 | Método 4D | `metodo` | D1 Diagnóstico, D2 Direção, D3 Desenvolvimento, D4 Desempenho |
| 6 | Programas | `programas` | 6 cards, todos "Sob consulta" |
| 7 | Empresas | `empresas` | Workshop Corporativo e Palestra Institucional |
| 8 | Cases | `cases` | 3 casos de resultado |
| 9 | Sobre | `sobre` | Foto, história e 3 credenciais |
| 10 | Contato | `contato` | Convite final (quiz ou WhatsApp) |
| 11 | Rodapé | — | Logo, Instagram, WhatsApp, © ano |

### Blocos da página de links (na ordem em que aparecem)

| # | Bloco | O que tem |
|---|---|---|
| 1 | Topo | Logo, foto redonda, nome, cargo, frase de posicionamento e apresentação curta |
| 2 | Ações principais | **Descobrir meu perfil** (leva ao quiz do site), **Conversar com a Expanding English** (WhatsApp) e **Conhecer o site** |
| 3 | Redes e contato | Instagram, TikTok, YouTube, LinkedIn e os dois e-mails |
| 4 | Quem diagnostica | História curta e 3 credenciais, com os mesmos números do site |
| 5 | Método 4D | D1 a D4, "Nessa ordem. Sempre." |
| 6 | Rodapé | Direitos e link para o site completo |

---

## Como ver no seu computador

**Jeito mais simples:** dê dois cliques em `index.html` (site) ou em `links/index.html` (página de links). As fontes já estão dentro do projeto, então funciona sem internet.

**Com servidor local** (recomendado, é o que mais se parece com o GitHub Pages). Dentro da pasta do projeto:

```bash
python3 -m http.server 8000
```

Depois abra `http://localhost:8000` (site) ou `http://localhost:8000/links/` (página de links).

---

## Como publicar no GitHub Pages

> GitHub Pages é grátis para repositórios **públicos**. Repositório privado exige plano pago (Pro, Team ou Enterprise). Como o repositório é público, qualquer pessoa consegue ler o código: não coloque nele nada que não possa ser público.

1. **Crie o repositório.** No GitHub: **New repository**. Nome sugerido: `expanding-english-site`. Marque **Public**.

2. **Envie os arquivos** (escolha um jeito):
   - **Sem terminal:** na página do repositório novo, clique em **uploading an existing file** e arraste o *conteúdo* da pasta (`index.html`, `links`, `css`, `js`, `images`, `.nojekyll`, `.gitignore`, `README.md`). Arraste os arquivos de dentro da pasta, não o ZIP. No Mac, os arquivos que começam com ponto ficam ocultos no Finder: use `Cmd + Shift + .` para mostrá-los. Depois clique em **Commit changes**.
   - **Com terminal**, dentro da pasta do projeto:
     ```bash
     git init
     git add .
     git commit -m "Site Expanding English"
     git branch -M main
     git remote add origin https://github.com/SEU-USUARIO/expanding-english-site.git
     git push -u origin main
     ```

3. **Ligue o Pages.** No repositório: **Settings → Pages → Build and deployment → Source: Deploy from a branch**. Em **Branch**, escolha `main` e a pasta `/ (root)`. Clique em **Save**.

4. **Espere e abra.** O endereço aparece no topo da mesma tela. Os dois endereços seguem este formato:

   | Página | Endereço |
   |---|---|
   | Site | `https://SEU-USUARIO.github.io/expanding-english-site/` |
   | Página de links | `https://SEU-USUARIO.github.io/expanding-english-site/links/` |

   A primeira publicação e as atualizações podem levar alguns minutos (até cerca de 10).

5. **Coloque a página de links no Instagram.** No app: **Editar perfil → Links → Adicionar link externo** e cole o endereço da página de links (o nome dos menus pode mudar conforme a versão do app). Depois toque no link pelo próprio perfil, no celular, para conferir.

6. **Para atualizar depois:** troque o arquivo no repositório (pelo botão de upload ou por `git push`). O Pages republica sozinho.

Os caminhos dos arquivos no código são relativos (`css/styles.css`, `images/...`, `../css/bio.css`), então as páginas abrem tanto em `usuario.github.io/repositorio/` quanto em domínio próprio. Já `404.html`, `robots.txt`, `sitemap.xml` e os endereços de compartilhamento (canonical e og:url) pressupõem o domínio próprio na raiz.

### Domínio próprio: expandingenglish.com.br

O arquivo `CNAME` já vem no pacote com `www.expandingenglish.com.br`. O domínio precisa estar registrado em nome da Thayná (o registro de `.com.br` é feito no Registro.br e tem custo anual).

1. Em **Settings → Pages → Custom domain**, digite `www.expandingenglish.com.br` e salve (confira que o arquivo `CNAME` continua na raiz do repositório).
2. No painel de DNS onde o domínio foi registrado:
   - **Domínio raiz** (`expandingenglish.com.br`, para quem digitar sem o www ser levado ao site): quatro registros **A** apontando para
     `185.199.108.153`, `185.199.109.153`, `185.199.110.153` e `185.199.111.153`.
   - **Subdomínio www**: um registro **CNAME** de `www` para `SEU-USUARIO.github.io` (sem o nome do repositório).
3. A propagação do DNS pode levar até 24 horas. Quando o GitHub liberar, marque **Enforce HTTPS**.

Endereços finais: `www.expandingenglish.com.br/` (site), `/diagnostico/`, `/empresas/`, `/links/`, `/privacidade/` e `/termos/`. **Link do Instagram:** `https://www.expandingenglish.com.br/links/`. Para saber quantos contatos vêm do Instagram, o botão "Descobrir meu perfil" da página de links já leva `?utm_source=instagram&utm_medium=bio` e a origem vai para a planilha. Nos anúncios ou posts, use o mesmo modelo em `/diagnostico/` e `/empresas/`, trocando `utm_source` e `utm_medium`.

Depois de publicar, cadastre o site no **Google Search Console** (https://search.google.com/search-console) e envie `https://www.expandingenglish.com.br/sitemap.xml`.

Confira os valores atuais na documentação oficial antes de configurar: <https://docs.github.com/pages>

---

## Onde editar o quê

### Site

| Quero mudar... | Arquivo | Onde procurar |
|---|---|---|
| Um texto de qualquer seção | `index.html` | A seção marcada pelo comentário no topo |
| Textos da landing do Diagnóstico | `diagnostico/index.html` | Cada bloco tem um comentário numerado no topo. Perguntas e resultados do quiz continuam em `js/script.js` |
| Textos da landing para empresas, mensagens prontas do WhatsApp | `empresas/index.html` | Os botões usam `https://wa.me/5562996504985?text=...` (texto codificado para endereço). Para mudar a mensagem, edite o trecho depois de `text=` |
| Cores da marca | `css/styles.css` | Bloco `:root` (início do arquivo). Mude também em `css/bio.css`. Para texto sobre fundo claro use `--teal-text`, não `--teal` |
| Largura máxima do conteúdo | `css/styles.css` | `--max` no bloco `:root` |
| Fontes | `css/fonts.css` e pasta `fonts/` | Para trocar uma fonte, coloque o `.woff2` em `fonts/`, declare em `css/fonts.css` e ajuste `font-family` nos dois CSS |
| Perguntas e alternativas do quiz | `js/script.js` | Constante `QUESTIONS` |
| Textos dos 3 resultados do quiz | `js/script.js` | Constante `RESULTS` |
| Mensagem que chega no WhatsApp após o quiz | `js/script.js` | Função `showResult()` |
| Número de WhatsApp do resultado do quiz | `js/script.js` | Constante `WHATSAPP_NUMBER` |
| Abrir o WhatsApp sozinho no fim do quiz | `js/script.js` | Constante `WHATSAPP_AUTO_OPEN_SECONDS` (8 segundos; 0 desliga) |
| Para onde vão os contatos do quiz | `js/script.js` | Constante `LEAD_ENDPOINT` (veja `backend/LEIA-ME.md`) |
| Versão da política aceita no quiz | `js/script.js` | Constante `POLICY_VERSION` |
| Link de WhatsApp dos botões | `index.html` e `links/index.html` | Localizar e substituir `https://wa.me/message/PNPG6EUVRORQC1` (5 ocorrências no site e 1 na página de links) |
| Texto da política ou dos termos | `privacidade/index.html`, `termos/index.html` | Edite o texto e atualize a data "Última atualização" no topo |
| Link do Instagram | `index.html` e `links/index.html` | Rodapé do site e bloco "Redes e contato" da página de links |
| Adicionar um programa ou um case | `index.html` | Copie um card inteiro e edite os textos |
| Fotos | `images/hero-thayna.jpg`, `images/about-thayna.jpg` | Troque o arquivo mantendo o mesmo nome. Formato vertical 3:4 (hoje 799 × 1065 px) |
| Logos | `images/logo-light.png`, `images/logo-dark.png` | Troque mantendo o mesmo nome. Fundo transparente. Se a proporção mudar, ajuste `width` e `height` nas tags `<img>` |
| Ícone da aba | `images/icon.png` | Quadrado (hoje 512 × 512 px) |
| Ícone do iPhone | `images/apple-touch-icon.png` | Quadrado 180 × 180 px, **sem transparência** |
| Página 404 | `404.html` | Caminhos começam com `/`; veja o comentário no topo do arquivo |
| Ano do rodapé | — | Automático (`js/script.js`, seção 1) |

### Página de links

| Quero mudar... | Arquivo | Onde procurar |
|---|---|---|
| Nome, cargo, frase de posicionamento ou apresentação | `links/index.html` | Bloco "1. TOPO" |
| Botões principais (quiz, WhatsApp, site) | `links/index.html` | Bloco "2. AÇÕES PRINCIPAIS" |
| Instagram, TikTok, YouTube, LinkedIn ou e-mails | `links/index.html` | Bloco "3. REDES E CONTATO" |
| Assunto pré-preenchido do e-mail | `links/index.html` | Trecho `?subject=...` no `href` de cada `mailto:` |
| História e credenciais | `links/index.html` | Bloco "4. QUEM DIAGNOSTICA" |
| Passos do Método 4D | `links/index.html` | Bloco "5. MÉTODO 4D" |
| Adicionar um botão | `links/index.html` | Copie um `<a class="link">` inteiro (o modelo está comentado no começo da seção 4 do `css/bio.css`) e troque texto, ícone e link |
| Trocar um ícone | `links/index.html` | Sprite no início do arquivo. Cada símbolo tem um `id` (`i-instagram`, `i-tiktok`, `i-youtube`, `i-mail`...) |
| Cores e tamanhos | `css/bio.css` | Bloco `:root` e as seções numeradas. As cores são uma cópia de `css/styles.css`: mude nos dois |
| Foto redonda | `images/avatar-thayna.jpg` | Troque mantendo o mesmo nome. Quadrada (hoje 400 × 400 px), com o rosto centralizado |

### LinkedIn: trocar o endereço ou esconder um botão

Há dois botões de LinkedIn: o do perfil profissional da Thayná (`https://www.linkedin.com/in/thaynaguimaraes/`) e o da página da empresa (`https://www.linkedin.com/company/expandingenglish/`). Em `links/index.html`, bloco "3. REDES E CONTATO":

- **Trocar o endereço:** edite o `href` do botão.
- **Esconder sem apagar:** escreva a palavra `hidden` na primeira linha do link, logo depois de `class="link"`. Para mostrar de novo, apague a palavra.

---

## Identidade visual

| Variável CSS | Cor | Uso |
|---|---|---|
| `--cyan` | `#00D7F1` | Botões principais, detalhes, números |
| `--teal` | `#2AA3C4` | Rótulos (eyebrow), destaques secundários |
| `--navy` | `#195792` | Azul de marca |
| `--navy-deep` | `#0B3459` | Fundos escuros |
| `--navy-deeper` | `#082A47` | Títulos, rodapé, cards escuros |
| `--ink` | `#0A0E14` | Texto principal |
| `--paper` | `#FFFFFF` | Fundo padrão (site) |
| `--mist` | `#F1F8FA` | Fundo das seções claras alternadas (site) |

**Fontes:** Staatliches (títulos, números, detalhes) e Manrope (textos, botões, interface).

---

## Decisões de projeto

Para quem for mexer no código depois, o porquê de algumas escolhas:

- **Menu e botões do site rolam por função, não por link `#`.** Os botões usam `onclick="scrollToSection('id')"` em vez de `href="#id"`, porque links com `#` são interceptados por alguns visualizadores e pré-visualizações (abriam um aviso de "link externo"). Para criar um novo destino: dê um `id` à `<section>` e chame `scrollToSection('id')`.
- **JavaScript em estilo ES5.** Sem arrow functions nem template strings, para rodar em qualquer navegador sem transpilador.
- **Layout em Flexbox, sem Grid.** Vários blocos do site usam `gap` e `margin` juntos. Foi mantido de propósito como reforço de espaçamento. Se remover um dos dois, confira na tela.
- **Nenhum preço no site.** Todos os programas aparecem como "Sob consulta".
- **Rodapé enxuto.** Só logo, Instagram, WhatsApp e direitos. Nenhum dado cadastral da empresa em nenhuma das páginas.
- **Sem estilos inline.** Todo o visual está em `css/styles.css` e `css/bio.css`.
- **Resultado do quiz.** Cada resposta soma 1 ponto em um perfil (ET, CE ou BD). Vence o perfil com mais pontos; em empate, vence o primeiro na ordem ET, CE, BD.
- **Botão do resultado do quiz usa o link com número** (`wa.me/NUMERO?text=...`) porque ele aceita mensagem pronta. Os demais botões usam o link curto oficial da empresa, que pode não aceitar mensagem pronta.
- **Página de links sem JavaScript.** Carrega mais rápido no navegador interno do Instagram e não tem o que quebrar. Os botões que levam ao site são links comuns (`../index.html#diagnostico`).
- **Página de links sem Assessment, Intensivo ou preços.** O Assessment não é produto de topo de funil: é o primeiro diagnóstico de quem já fecha o programa. A página só leva ao que vem antes disso: quiz, WhatsApp, site, redes e e-mails. O detalhamento dos programas fica no site e na conversa.
- **O atributo `hidden` funciona em qualquer botão** (regra `[hidden]` no `css/bio.css`): serve para esconder um canal sem apagar o código.
- **Cores da página de links são uma cópia das do site.** Foi a forma de manter cada CSS independente. Se mudar a paleta, mude em `css/styles.css` e em `css/bio.css`.
- **Foto da página de links é um recorte do rosto** (`avatar-thayna.jpg`), porque a foto da seção "Sobre" é de meio corpo e ficaria pequena no círculo.

---

## Pendências antes de divulgar

Já confirmados pela Thayná: o número de WhatsApp do quiz, o endereço do LinkedIn, o TikTok e os dois e-mails da página de links. O YouTube (`youtube.com/@expandingenglish`) e a página da empresa no LinkedIn também foram enviados por ela.

1. **Domínio e HTTPS:** siga "Domínio próprio" acima (DNS no Registro.br, `Enforce HTTPS` no GitHub). Já estão prontos com o endereço `https://www.expandingenglish.com.br`: `canonical`, `og:url`, `og:image` (`images/og-expanding-english.jpg`), dados estruturados (`url`, `logo`), `sitemap.xml`, `robots.txt` e `CNAME`.
2. **Testar os botões no celular** depois de publicar: WhatsApp, resultado do quiz, Instagram, TikTok, YouTube, LinkedIn (pessoal e da empresa), os dois e-mails e os 6 botões de WhatsApp da página `/empresas/`.
2b. **Testar o link compartilhado:** cole o endereço do site, de `/diagnostico/` e de `/empresas/` numa conversa de WhatsApp para conferir a imagem e o título. O WhatsApp guarda a prévia em cache: se mudar a imagem depois, o aviso demora a atualizar.
3b. **Captura de contatos do quiz (obrigatório antes de divulgar):** siga `backend/LEIA-ME.md` e cole a URL em `LEAD_ENDPOINT` (`js/script.js`). Sem isso o quiz não pede contato, e a Política de Privacidade (que descreve a coleta) ficaria desalinhada com o site.
4. **Política de Privacidade e Termos de Uso:** páginas já criadas (`privacidade/index.html` e `termos/index.html`), a partir do documento A6. Foram acrescentados: seção de crianças e adolescentes, transferência internacional (Google), aviso de que o diagnóstico não é avaliação psicológica/clínica, foro do consumidor e dados de hospedagem. Antes de divulgar: revisão jurídica final e atualizar a data "Última atualização" (e `POLICY_VERSION` em `js/script.js`) para o dia da publicação. Se o site passar a usar GA4 ou Pixel, atualize a seção 7 da política (hoje diz que não há cookies de análise nem de publicidade). Os 3 cases foram confirmados pela Thayná como reais e autorizados.
5. **Regra de conteúdo:** nenhum preço, valor ou percentual de preço em nenhuma página (decisão da Thayná). Tudo "Sob consulta".

### O que já foi tratado para publicar

- Fontes hospedadas no site (nenhum pedido externo; confirmado por teste).
- Logos reduzidas de 1919 × 545 para 480 × 136 px (de ~57 KB para ~26–31 KB cada), com `width` e `height` nas imagens e `loading="lazy"` nas que ficam abaixo da primeira tela.
- Ícone próprio para o iPhone (o ícone transparente aparecia com fundo preto).
- Estrutura para leitor de tela: `<main>`, ordem dos títulos, atalho "Pular para o conteúdo", foco do teclado acompanha o quiz, aviso quando o JavaScript está desligado.
- No celular, os títulos das seções param abaixo do menu fixo ao clicar no menu (antes ficavam alguns pixels escondidos).
- Contraste de cores: texto pequeno em azul-água passou a usar `--teal-text` (#1F7B94, 4,86:1 no branco e 4,53:1 no fundo claro). O `--teal` original (#2AA3C4) continua nos degradês, barra de progresso e bordas, e NÃO deve ser usado em texto sobre fundo claro. Verificação automática (axe-core): zero violações.
- Dados estruturados (JSON-LD) da empresa e página 404 no padrão da marca.

### Checklist rápido de publicação

- [ ] Site abre no computador e no celular
- [ ] Menu do celular abre, fecha e rola até a seção
- [ ] Quiz: tela de contato primeiro, linha `iniciou` na planilha ao começar, linha atualizada para `concluiu` no fim, dois e-mails de aviso, WhatsApp abre sozinho após a contagem e o botão Cancelar funciona
- [ ] Botão do resultado abre o WhatsApp com a mensagem do perfil
- [ ] Botões de WhatsApp e Instagram abrem o destino certo
- [ ] Fotos e logos carregam
- [ ] Links "Privacidade" e "Termos de Uso" do rodapé (site e página de links) abrem as páginas certas
- [ ] Endereço inexistente (ex.: `/teste`) mostra a página 404 da marca
- [ ] Página de links abre pelo endereço `.../links/` no celular
- [ ] "Descobrir meu perfil" abre o quiz no site
- [ ] TikTok abre o perfil @southaynaguimaraes
- [ ] YouTube abre o canal certo 
- [ ] LinkedIn · Thayná Guimarães abre o perfil certo
- [ ] LinkedIn · Expanding English abre a página da empresa
- [ ] Os dois e-mails abrem o app de e-mail com o assunto "Contato pelo Instagram"
- [ ] Link da página de links colado no perfil do Instagram

---

© Expanding English. Marca, textos, logos e fotos: todos os direitos reservados.
