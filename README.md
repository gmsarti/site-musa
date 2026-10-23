# Pousada Musa — Site Institucional

Site de uma página (_one-page_) para a **Pousada Musa**, em Engenhos, Iguape/SP. O projeto reúne apresentação da pousada, acomodações, observação de aves, experiências, galeria, avaliações, localização, FAQ e um fluxo de solicitação de reserva pelo WhatsApp.

> **Status:** site preenchido com os dados públicos da listagem do Google Maps e com fotos reais da pousada. O Tailwind é compilado localmente, as imagens têm variantes responsivas e a reserva abre o WhatsApp com a mensagem pronta. O site tem versões em **português, inglês, espanhol e francês**. Ainda **não é um site oficial publicado**: faltam confirmar direitos das fotos, preços, detalhes das acomodações, política de privacidade e domínio. Consulte [PENDENCIAS.md](./PENDENCIAS.md).

---

## Índice

- [O que foi preenchido com dados reais](#o-que-foi-preenchido-com-dados-reais)
- [O que ainda não sabemos](#o-que-ainda-não-sabemos)
- [Fotos e direitos de uso](#fotos-e-direitos-de-uso)
- [Como rodar localmente](#como-rodar-localmente)
- [Build e verificação](#build-e-verificação)
- [Internacionalização](#internacionalização)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Stack e dependências](#stack-e-dependências)
- [Seções da página](#seções-da-página)
- [Interações em JavaScript](#interações-em-javascript)
- [Acessibilidade e SEO](#acessibilidade-e-seo)
- [Identidade visual](#identidade-visual)
- [Decisões técnicas](#decisões-técnicas)
- [Documentação](#documentação)
- [Próximos passos](#próximos-passos)

---

## O que foi preenchido com dados reais

Dados extraídos da listagem pública **Pousada MUSA** no Google Maps em **23/10/2026**:

| Campo | Dado usado no site |
|---|---|
| Nome | Pousada MUSA |
| Categoria | Pousada |
| Endereço | Rod. Pref. Casemiro Teixeira, Km 48 — Engenhos, Iguape/SP, 11920-000 |
| Telefone / WhatsApp | (11) 95299-1990 · `+55 11 95299-1990` |
| Coordenadas | `-24.6555191, -47.5202416` |
| Plus Code | `8FVH+QW` |
| Avaliação | 5,0 no Google · 2 avaliações |
| Atributo | Empresa que acolhe a comunidade LGBTQ+ |
| Site oficial | Não informado na listagem |
| Fotos | 6 fotos da pousada + 3 fotos de avaliação |

### Conteúdo baseado nas avaliações e nas fotos

- Suítes confortáveis, camas elogiadas e banheiros novos.
- Jardins, árvores frutíferas e comedouro de aves.
- Espécies já fotografadas na região: **saíra-sete-cores**, **colhereiro** e **tiê-sangue**.
- Área de água natural (piscina natural) com pedras, peixes e vegetação.
- Varanda com vista para o jardim.
- Comida boa e ambiente acolhedor (relatos de hóspedes).
- Depoimentos reais de **Veronica Piccini** e **Gustavo Sarti**, publicados no Google Maps.

### O que foi removido do mockup

Foram removidos por não terem confirmação:

- Preços de diária (R$ 580, R$ 790, R$ 950).
- Nomes e categorias inventadas de suítes (Saíra, Bromélia, Cabana da Mata).
- Área de 42 hectares, 8 chalés e +180 espécies catalogadas.
- Alegações de aquecimento solar e Wi-Fi Starlink.
- Endereço e telefone antigos (Estrada Ecológica da Juréia, Km 8 / (13) 99742-8810).
- Experiências não confirmadas: café da manhã incluso, lounge com fogo de chão, passeios de barco, trilhas privativas.
- Distâncias não verificadas (200 km de São Paulo, 220 km de Curitiba etc.).
- Posicionamento de "montanha" (a localização real é em Iguape, próximo à Mata Atlântica e à Ilha Comprida).

---

## O que ainda não sabemos

Estes dados **não estavam disponíveis** na listagem e não foram inventados:

- Preços, tarifas e o que cada diária inclui.
- Nomes, capacidades e detalhes reais de cada acomodação.
- Horários de check-in e check-out.
- Política de cancelamento e regras para hóspedes.
- Café da manhã ou refeições inclusas.
- E-mail, Instagram, Facebook e site oficial.
- CNPJ / razão social.
- Horário de atendimento.
- Acessibilidade, pet friendly, estacionamento e outras comodidades.
- Domínio próprio e URL canônica.

Enquanto esses dados não forem confirmados, o site usa textos genéricos e direciona valores e disponibilidade para o WhatsApp.

---

## Fotos e direitos de uso

As imagens em `img/` foram baixadas da **listagem pública do Google Maps** (fotos da pousada e de avaliação, set/2026) e otimizadas para WebP. Elas substituíram as fotos de banco de imagens do mockup.

- `img/hero.webp` — entrada da pousada
- `img/pousada.webp` — varanda / área externa
- `img/piscina.webp` — piscina natural
- `img/jardim.webp` — jardins e lago
- `img/aves.webp` — saíra-sete-cores
- `img/colhereiro.webp` — colhereiro
- `img/tie.webp` — tiê-sangue
- `img/og.jpg` — imagem de compartilhamento (1200×630)
- `img/favicon.svg` — favicon

Cada foto de conteúdo também tem variantes `-480.webp` e `-960.webp`, usadas via `srcset`/`sizes`. O arquivo sem sufixo é a versão maior (1200–1400 px), servida para telas grandes.

> **Atenção:** antes de divulgar o site como oficial, confirme a autoria das fotos e a autorização de uso. Fotos de avaliações podem pertencer aos hóspedes que as enviaram. O mesmo vale para os depoimentos: são públicos, mas é recomendável confirmar com os autores e com a pousada.

---

## Como rodar localmente

O site é estático. Os passos de build são compilar o Tailwind e gerar as páginas traduzidas; tanto o CSS (`css/styles.css`) quanto as páginas `/en/`, `/es/` e `/fr/` já estão versionados, então dá para servir a pasta sem instalar nada.

**Com npm (recomendado):**

```bash
cd "/caminho/para/site-musa"
npm install
npm run serve
```

Abra <http://localhost:8000>.

**Sem instalar nada:**

```bash
cd "/caminho/para/site-musa"
python3 -m http.server 8000
```

> Abrir o `index.html` com duplo clique também funciona, mas um servidor local reproduz melhor o comportamento de produção (especialmente o mapa incorporado e os caminhos relativos).

---

## Build e verificação

| Comando | O que faz |
|---|---|
| `npm run build:css` | Compila `src/input.css` em `css/styles.css` minificado |
| `npm run build:i18n` | Gera `en/index.html`, `es/index.html` e `fr/index.html` a partir do `index.html` |
| `npm run watch:css` | Recompila o CSS enquanto você edita |
| `npm run build` | Roda `build:css` e depois `build:i18n` |
| `npm test` | Verifica as 4 páginas: `lang`, `hreflang`, `og:locale`, seletor de idioma, IDs duplicados, âncoras, `aria-controls`, `alt`, `width`/`height` e arquivos referenciados |
| `npm run serve` | Sobe um servidor local em <http://localhost:8000> |

**Sempre que adicionar ou remover classes do Tailwind, rode `npm run build:css`.** **Sempre que alterar textos do `index.html` ou as traduções em `scripts/i18n-data.mjs`, rode `npm run build:i18n`.** O CSS e as páginas geradas precisam ser commitados junto com a alteração.

O `scripts/check-site.mjs` não tem dependências externas e pode rodar em CI. Ele falha se o HTML voltar a carregar o CDN do Tailwind, se alguma imagem/arquivo local deixar de existir ou se uma página traduzida ficar com `lang`, `hreflang`, `og:locale` ou seletor de idioma inconsistentes.

---

## Internacionalização

O site usa **rotas estáticas por idioma**, sem biblioteca de i18n em tempo de execução:

| Rota | Idioma | Arquivo |
|---|---|---|
| `/` | Português (pt-BR) | `index.html` |
| `/en/` | Inglês | `en/index.html` |
| `/es/` | Espanhol | `es/index.html` |
| `/fr/` | Francês | `fr/index.html` |

O `index.html` em português é a **fonte da estrutura**. O `scripts/build-i18n.mjs` lê esse arquivo, troca os blocos de idioma e aplica as traduções de `scripts/i18n-data.mjs` para gerar as três páginas. As páginas geradas são versionadas; **não edite `en/index.html`, `es/index.html` ou `fr/index.html` à mão** — a próxima execução do build sobrescreve o arquivo.

O que é traduzido:

- Título, meta description, Open Graph e textos visíveis.
- Navegação, hero, seções, galeria, avaliações, localização, FAQ e rodapé.
- Formulário de reserva, opções, placeholders, mensagens de validação e aviso de privacidade.
- Conteúdo dos modais (pousada, piscina, jardins, aves e varanda).

Decisões específicas:

- **A mensagem enviada ao WhatsApp continua em português**, porque é lida pela equipe da pousada. O formulário avisa isso em cada idioma. Os valores internos (`value`) dos interesses e a opção de acomodação também permanecem em português; a interface é traduzida.
- **Avaliações** aparecem traduzidas, com o texto original em português dentro de um `<details lang="pt-BR">`.
- **Seletor de idiomas** no cabeçalho desktop e no menu mobile, com `hreflang`, `lang` e `aria-current="page"`.
- **`hreflang` alternates** e **`og:locale`/`og:locale:alternate`** em todas as páginas.

### URLs temporárias

Enquanto o domínio oficial não é definido, as URLs absolutas apontam para o GitHub Pages:

```
https://gmsarti.github.io/site-musa/
https://gmsarti.github.io/site-musa/en/
https://gmsarti.github.io/site-musa/es/
https://gmsarti.github.io/site-musa/fr/
```

Ao registrar o domínio, atualize:

1. O bloco `<!-- i18n:alternates:start -->` do `index.html`.
2. `SITE`, em `scripts/i18n-data.mjs` (usado por `hreflang` e `og:url`).
3. O `og:url` e o `canonical` quando forem adicionados.
4. Rode `npm run build:i18n` e `npm test`.

> As traduções foram feitas para o site e devem ser revisadas por falantes nativos antes da publicação oficial, especialmente os nomes populares das aves e os textos de reserva.

---

## Estrutura do repositório

```
site-musa/
├── index.html              # Página pt-BR; fonte da estrutura e dos textos
├── en/index.html           # Versão em inglês (gerada)
├── es/index.html           # Versão em espanhol (gerada)
├── fr/index.html           # Versão em francês (gerada)
├── js/main.js              # Comportamento compartilhado das 4 páginas
├── src/input.css           # Fonte do Tailwind + estilos customizados
├── css/styles.css          # CSS compilado e minificado (gerado)
├── tailwind.config.js      # Cores musa.* e famílias de fonte
├── package.json            # Scripts de build, teste e servidor
├── scripts/
│   ├── check-site.mjs      # Verificações estáticas das 4 páginas
│   ├── build-i18n.mjs      # Gera as páginas /en/, /es/ e /fr/
│   └── i18n-data.mjs       # Configuração e traduções de cada idioma
├── img/                    # Fotos reais, variantes responsivas, OG image e favicon
├── robots.txt              # Indexação liberada (sitemap pendente do domínio)
├── README.md               # Este documento
├── PENDENCIAS.md           # O que falta fazer, priorizado
└── .gitignore
```

O CSS e o JavaScript são separados do HTML. As páginas traduzidas são geradas a partir do `index.html` e devem ser tratadas como artefatos de build.

---

## Stack e dependências

| Camada | Tecnologia | Observação |
|---|---|---|
| Marcação | HTML5 | Uma página por idioma, `lang` correto em cada uma |
| Estilo | Tailwind CSS 3 compilado | `src/input.css` → `css/styles.css` (~26 KB) |
| Estilo customizado | CSS puro em `@layer` | Cards, acordeão, sombra do hero, skip link, foco visível |
| Comportamento | JavaScript ES6 (vanilla) | Sem framework; `js/main.js` compartilhado |
| i18n | Rotas estáticas + script Node | `/en/`, `/es/`, `/fr/` gerados a partir do `index.html` |
| Tipografia | Google Fonts | Lora (400) + Plus Jakarta Sans (300–600) |
| Imagens | Fotos da listagem do Google Maps | WebP com variantes de 480/960 px e `srcset` |
| Mapa | Google Maps embed | Sem chave de API, via `output=embed` |
| Build | Tailwind CLI 3 + Node | Tailwind é a única dependência de desenvolvimento |
| Versionamento | Git + GitHub | `gmsarti/site-musa` |

Não há bundler, backend nem framework de testes. O `npm test` roda apenas verificações estáticas com Node puro.

---

## Seções da página

As quatro versões têm as mesmas seções e âncoras; mudam apenas o idioma e as traduções.

| Seção | Âncora | Conteúdo |
|---|---|---|
| Cabeçalho fixo | — | Logo SVG, navegação desktop, seletor de idiomas, menu mobile e botão "Reservar" |
| Hero | `#pousada` | Foto da entrada, título, CTAs e nota 5,0 no Google |
| Observação de aves | `#aves` | Foto da saíra, texto e guia de espécies |
| Acomodações | `#acomodacoes` | Bloco pêssego, texto sobre as suítes e CTA para o WhatsApp |
| Experiências | `#experiencias` | 4 cards: piscina natural, jardins, aves e varanda |
| Galeria | `#galeria` | 6 fotos reais com ampliação em modal |
| Avaliações | `#avaliacoes` | Duas avaliações reais do Google + link para a listagem |
| Localização | `#localizacao` | Endereço, Plus Code, telefone, mapa incorporado e rota |
| FAQ | `#faq` | 4 perguntas: localização, aves, reserva e LGBTQ+ friendly |
| Rodapé | `#contato` | Contato, logo, avaliação, CTA de WhatsApp e links |

---

## Interações em JavaScript

| Recurso | Função | Estado |
|---|---|---|
| Abrir/fechar menu mobile | `toggleMobileMenu()` | Funcional; rótulos traduzidos via `data-open-label`/`data-close-label` |
| Acordeão do FAQ | `toggleFaq()` | Funcional (um item aberto por vez) |
| Modais de pousada, piscina, jardins, aves, varanda e galeria | `openInfoModal()`, `openExperienceModal()`, `openPhoto()` e `showModal()` | Funcional; conteúdo em `<template>` |
| Solicitação de reserva pelo WhatsApp | `submitBooking()` | Funcional — monta a mensagem em português e abre `wa.me` |
| Validação de datas e nome | `toLocalISO()`, `formatDateBR()` e mensagens de `booking-i18n` | Funcional e localizada; bloqueia datas passadas e check-out anterior ao check-in |
| Fechar modais com `ESC` | listener de `keydown` | Funcional |
| Fechar modal clicando no fundo | listener nos elementos `[data-modal]` | Funcional |
| Foco preso no modal | listener de `Tab` | Funcional |
| Bloqueio de rolagem do fundo | `refreshScrollLock()` | Funcional |
| Botão flutuante de WhatsApp | link fixo | Funcional |

### Como a reserva funciona

1. A pessoa clica em **Reservar**.
2. Preenche datas, acomodação, número de hóspedes, nome, observações e interesse principal.
3. O site valida as datas e o nome e monta uma mensagem organizada **em português**, para a equipe da pousada.
4. O WhatsApp abre em nova aba com a mensagem pronta para envio. O formulário avisa, em cada idioma, que a solicitação é enviada em português.
5. Nenhum dado é armazenado no site; a conversa acontece no WhatsApp.

Não há pagamento, confirmação automática nem consulta de calendário em tempo real. Valores e disponibilidade são confirmados no atendimento.

---

## Acessibilidade e SEO

### Lighthouse (versão local, viewport de 800 px)

| Categoria | Pontuação |
|---|---|
| Acessibilidade | **100** |
| Boas práticas | **100** |
| SEO | **100** |

Auditoria local após a compilação do Tailwind e as mudanças de acessibilidade: as quatro páginas (`pt-BR`, `en`, `es` e `fr`) passam sem avisos de console e sem falhas nas três categorias. O desempenho mobile ainda precisa de uma auditoria própria.

### O que já está implementado

- `lang` correto em cada página (`pt-BR`, `en`, `es`, `fr`), `<main>` e hierarquia de títulos.
- `hreflang` alternates, `og:locale`/`og:locale:alternate` e `og:url` por idioma.
- Seletor de idiomas com `hreflang`, `lang` e `aria-current="page"` no desktop e no mobile.
- Avaliações traduzidas com o texto original em `<details lang="pt-BR">`.
- `role="dialog"`, `aria-modal="true"` e `aria-labelledby` nos modais.
- Foco preso, retorno de foco e fechamento por `ESC`/clique no fundo.
- `aria-expanded` no menu mobile e no FAQ.
- `aria-label` nos botões de ícone e no botão flutuante.
- `alt` descritivo nas fotos.
- Contraste revisado (Lighthouse 100).
- `scroll-margin-top` para as âncoras não ficarem atrás do header.
- Link "pular para o conteúdo" e `<main id="conteudo" tabindex="-1">`.
- Foco visível global e respeito a `prefers-reduced-motion`.
- `aria-controls` no FAQ e `aria-describedby` no formulário.
- `loading="lazy"`, `width`/`height`, `decoding="async"` e `fetchpriority="high"` no hero.
- `srcset`/`sizes` em todas as imagens de conteúdo e preload do hero.
- Título, meta description, Open Graph, Twitter Card, favicon, imagem OG e `robots.txt`.

### O que ainda falta

- URL canônica definitiva e `hreflang`/`og:url`/`og:image` finais (hoje apontam para o GitHub Pages).
- `sitemap.xml` com as quatro rotas (depende do domínio).
- Revisão das traduções por falantes nativos.
- Teste manual com VoiceOver e navegação só por teclado.
- Rodar Lighthouse mobile com Performance ≥ 90.
- Auto-hospedar as fontes e avaliar AVIF.

---

## Identidade visual

### Cores (tokens Tailwind `musa.*`)

| Token | Hex | Uso |
|---|---|---|
| `musa-bg` | `#F4EFE6` | Fundo principal (creme) |
| `musa-terracotta` | `#A84B2B` | Botões, títulos e rodapé |
| `musa-terracottaDark` | `#8C3B1F` | Hover dos botões |
| `musa-peach` | `#D8916C` | Seção de acomodações |
| `musa-gold` | `#A88E5B` | Ícones e estrelas decorativas |
| `musa-goldDark` | `#7A6338` | Eyebrows e fundo do FAQ |
| `musa-goldLight` | `#D5B878` | Destaque do título no hero |
| `musa-text` | `#4A3F35` | Texto principal |
| `musa-muted` | `#6B6055` | Textos secundários |

Cores adicionais fora do tema: fundo do `body` `#E6DFD3`, borda dos cards `#C8B598` e texto escuro sobre o pêssego `#3A312A`.

### Tipografia

- **Lora** — títulos e logo (`font-serif`)
- **Plus Jakarta Sans** — corpo e navegação (`font-sans`)

### Detalhes de estilo

- `musa-card-frame`: moldura dupla, borda de 1,5 px e elevação no hover.
- `.hero-text-shadow`: sombra para legibilidade sobre a foto.
- `.faq-answer`: transição de `max-height` no acordeão.
- Container central com `max-w-5xl`, sombra e cantos arredondados, simulando uma "folha".

---

## Decisões técnicas

1. **Site estático, sem framework.** Para uma pousada, HTML/CSS/JS resolvem o problema com custo próximo de zero, alta velocidade e menos superfície de manutenção.
2. **Tailwind compilado localmente.** Gera um CSS pequeno e elimina o CDN em produção. O build é o único passo de dependência do projeto.
3. **Interatividade em JavaScript vanilla compartilhado.** Modais, acordeão e galeria são simples e não justificam uma biblioteca.
4. **Reserva via WhatsApp.** Evita backend, banco de dados e custo de motor de reservas. Um motor só se o volume justificar.
5. **Conteúdo centralizado em HTML e em um arquivo de traduções.** Não há CMS; o português fica no `index.html` e as demais línguas em `scripts/i18n-data.mjs`.
6. **Internacionalização por rotas estáticas.** `/en/`, `/es/` e `/fr/` são gerados no build, sem JavaScript de tradução no cliente, sem redirecionamento e com URLs indexáveis.
7. **Fotos locais em WebP com `srcset`.** Reduz dependência externa, evita baixar 1400 px no celular e mantém a possibilidade de trocar por fotos oficiais depois.
8. **Dados não confirmados foram removidos.** É melhor um site menor e verdadeiro do que um site completo e enganoso.

---

## Documentação

- [PENDENCIAS.md](./PENDENCIAS.md) — backlog priorizado (P0, P1, P2), bugs conhecidos e critérios de lançamento.

---

## Próximos passos

1. Confirmar autoria e autorização das fotos e dos depoimentos.
2. Confirmar preços, acomodações, check-in/check-out e regras de reserva.
3. Criar política de privacidade e revisar o aviso de dados no formulário.
4. Revisar as traduções com falantes nativos.
5. Registrar domínio, configurar HTTPS e atualizar `hreflang`, `og:url` e canonical.
6. Rodar Lighthouse mobile e otimizar o que ainda pesar.
7. Configurar Google Search Console e Google Business Profile.

O plano detalhado, com checkboxes e critérios de aceite, está em [PENDENCIAS.md](./PENDENCIAS.md).
