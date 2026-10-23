# Pousada Musa — Site Institucional

Site de uma página (_one-page_) para a **Pousada Musa**, em Engenhos, Iguape/SP. O projeto reúne apresentação da pousada, acomodações, observação de aves, experiências, galeria, avaliações, localização, FAQ e um fluxo de solicitação de reserva pelo WhatsApp.

> **Status:** site preenchido com os dados públicos da listagem do Google Maps e com fotos reais da pousada. A reserva já abre o WhatsApp com a mensagem pronta. Ainda **não é um site oficial publicado**: faltam confirmar direitos das fotos, preços, detalhes das acomodações, política de privacidade e domínio. Consulte [PENDENCIAS.md](./PENDENCIAS.md).

---

## Índice

- [O que foi preenchido com dados reais](#o-que-foi-preenchido-com-dados-reais)
- [O que ainda não sabemos](#o-que-ainda-não-sabemos)
- [Fotos e direitos de uso](#fotos-e-direitos-de-uso)
- [Como rodar localmente](#como-rodar-localmente)
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

> **Atenção:** antes de divulgar o site como oficial, confirme a autoria das fotos e a autorização de uso. Fotos de avaliações podem pertencer aos hóspedes que as enviaram. O mesmo vale para os depoimentos: são públicos, mas é recomendável confirmar com os autores e com a pousada.

---

## Como rodar localmente

Não há instalação, build ou dependências de projeto. Basta servir a pasta como arquivos estáticos.

**Opção 1 — Python (já incluso no macOS):**

```bash
cd "/caminho/para/site-musa"
python3 -m http.server 8000
```

Abra <http://localhost:8000>.

**Opção 2 — Node:**

```bash
npx serve .
```

> Abrir o `index.html` com duplo clique também funciona, mas um servidor local reproduz melhor o comportamento de produção (especialmente o mapa incorporado).

---

## Estrutura do repositório

```
site-musa/
├── index.html      # Site completo: HTML + CSS customizado + JavaScript
├── img/            # Fotos reais otimizadas, OG image e favicon
├── README.md       # Este documento
├── PENDENCIAS.md   # O que falta fazer, priorizado
└── .gitignore
```

O CSS e o JavaScript ainda estão embutidos no `index.html`. A separação em `css/` e `js/` está prevista em [PENDENCIAS.md](./PENDENCIAS.md), mas não é necessária para o primeiro deploy.

---

## Stack e dependências

| Camada | Tecnologia | Observação |
|---|---|---|
| Marcação | HTML5 | Página única, `lang="pt-BR"` |
| Estilo | Tailwind CSS 3 via CDN | `https://cdn.tailwindcss.com` — **apenas desenvolvimento** |
| Estilo customizado | CSS puro | Cards, acordeão, sombra do hero, `scroll-margin` |
| Comportamento | JavaScript ES6 (vanilla) | Sem framework, sem build |
| Tipografia | Google Fonts | Lora (serifada) + Plus Jakarta Sans (sans) |
| Imagens | Fotos da listagem do Google Maps | Otimizadas localmente em WebP/JPEG |
| Mapa | Google Maps embed | Sem chave de API, via `output=embed` |
| Versionamento | Git + GitHub | `gmsarti/site-musa` |

Não há `package.json`, bundler, testes automatizados nem backend.

---

## Seções da página

| Seção | Âncora | Conteúdo |
|---|---|---|
| Cabeçalho fixo | — | Logo SVG, navegação desktop, menu mobile e botão "Reservar" |
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
| Abrir/fechar menu mobile | `toggleMobileMenu()` | Funcional |
| Acordeão do FAQ | `toggleFaq()` | Funcional (um item aberto por vez) |
| Modais de experiências, aves, pousada, localização e galeria | `modalDatabase`, `galleryDatabase`, `showModalData()` | Funcional |
| Solicitação de reserva pelo WhatsApp | `submitBooking()` | Funcional — monta a mensagem e abre `wa.me` |
| Validação de datas | `toLocalISO()`, `formatDateBR()` e listeners | Funcional — bloqueia datas passadas e check-out anterior ao check-in |
| Fechar modais com `ESC` | listener de `keydown` | Funcional |
| Fechar modal clicando no fundo | listener nos elementos `[data-modal]` | Funcional |
| Foco preso no modal | listener de `Tab` | Funcional |
| Bloqueio de rolagem do fundo | `refreshScrollLock()` | Funcional |
| Botão flutuante de WhatsApp | link fixo | Funcional |

### Como a reserva funciona

1. A pessoa clica em **Reservar**.
2. Preenche datas, acomodação, número de hóspedes, nome, observações e interesse principal.
3. O site valida as datas e monta uma mensagem organizada.
4. O WhatsApp abre em nova aba com a mensagem pronta para envio.
5. Nenhum dado é armazenado no site; a conversa acontece no WhatsApp.

Não há pagamento, confirmação automática nem consulta de calendário em tempo real. Valores e disponibilidade são confirmados no atendimento.

---

## Acessibilidade e SEO

### Lighthouse (versão local, desktop)

| Categoria | Pontuação |
|---|---|
| Acessibilidade | **100** |
| Boas práticas | **100** |
| SEO | **100** |

O único aviso de console é esperado: `cdn.tailwindcss.com should not be used in production`.

### O que já está implementado

- `lang="pt-BR"`, `<main>` e hierarquia de títulos.
- `role="dialog"`, `aria-modal="true"` e `aria-labelledby` nos modais.
- Foco preso, retorno de foco e fechamento por `ESC`/clique no fundo.
- `aria-expanded` no menu mobile e no FAQ.
- `aria-label` nos botões de ícone e no botão flutuante.
- `alt` descritivo nas fotos.
- Contraste revisado (Lighthouse 100).
- `scroll-margin-top` para as âncoras não ficarem atrás do header.
- `loading="lazy"`, `width`/`height` e `fetchpriority="high"` no hero.
- Título, meta description, Open Graph, Twitter Card, favicon e imagem OG.

### O que ainda falta

- URL canônica e `og:url` absoluto (dependem do domínio).
- `robots.txt` e `sitemap.xml`.
- Teste manual com VoiceOver e navegação só por teclado.
- Link "pular para o conteúdo".
- Compilar o Tailwind para remover o CDN.
- Rodar Lighthouse mobile com Performance ≥ 90.

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
2. **Tailwind via CDN no protótipo.** Permite iterar sem build. Deve ser trocado pela versão compilada antes de produção.
3. **Interatividade no próprio HTML.** Modais, acordeão e galeria são simples e não justificam uma biblioteca.
4. **Reserva via WhatsApp.** Evita backend, banco de dados e custo de motor de reservas. Um motor só se o volume justificar.
5. **Conteúdo centralizado em HTML.** Não há CMS; alterações de texto são feitas direto no arquivo.
6. **Fotos locais em WebP.** Reduz dependência externa e melhora o carregamento, mantendo a possibilidade de trocar por fotos oficiais depois.
7. **Dados não confirmados foram removidos.** É melhor um site menor e verdadeiro do que um site completo e enganoso.

---

## Documentação

- [PENDENCIAS.md](./PENDENCIAS.md) — backlog priorizado (P0, P1, P2), bugs conhecidos e critérios de lançamento.

---

## Próximos passos

1. Confirmar autoria e autorização das fotos e dos depoimentos.
2. Confirmar preços, acomodações, check-in/check-out e regras de reserva.
3. Criar política de privacidade e revisar o aviso de dados no formulário.
4. Publicar em uma hospedagem estática (Netlify, Cloudflare Pages ou Vercel).
5. Registrar domínio, configurar HTTPS e atualizar `og:url`/canonical.
6. Compilar o Tailwind e rodar Lighthouse mobile.
7. Configurar Google Search Console e Google Business Profile.

O plano detalhado, com checkboxes e critérios de aceite, está em [PENDENCIAS.md](./PENDENCIAS.md).
