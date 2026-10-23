# Pousada Musa — Site Institucional

Site de uma página (_one-page_) para a **Pousada Musa**, refúgio na Mata Atlântica em Iguape/SP. O projeto reúne apresentação da pousada, suítes, observação de aves, experiências, FAQ e um fluxo de pré-reserva.

> **Status:** protótipo visual funcional. O layout e as interações estão prontos; conteúdo real, integração de reservas, SEO e publicação ainda estão pendentes. Consulte [PENDENCIAS.md](./PENDENCIAS.md).

---

## Índice

- [Aviso importante](#aviso-importante)
- [Como rodar localmente](#como-rodar-localmente)
- [Estrutura do repositório](#estrutura-do-repositório)
- [Stack e dependências](#stack-e-dependências)
- [O que já está implementado](#o-que-já-está-implementado)
- [Identidade visual](#identidade-visual)
- [Conteúdo de exemplo](#conteúdo-de-exemplo-validar)
- [Decisões técnicas](#decisões-técnicas)
- [Documentação](#documentação)
- [Próximos passos](#próximos-passos)

---

## Aviso importante

Este repositório contém um **protótipo visual**. Antes de publicar:

1. **Os dados são fictícios.** Preços, endereço, telefone, quantidades (hectares, chalés, espécies) e comodidades foram inventados no mockup e precisam ser confirmados.
2. **A reserva não envia dados.** A função `submitBooking()` apenas exibe uma mensagem de sucesso no navegador. Nenhuma informação chega a um e-mail, WhatsApp ou banco de dados.
3. **As fotos são de banco de imagens.** Todas vêm do Unsplash e devem ser substituídas por fotos próprias da pousada.

Detalhes e checklist completo em [PENDENCIAS.md](./PENDENCIAS.md).

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

> Abrir o `index.html` com duplo clique também funciona, mas um servidor local reproduz melhor o comportamento de produção.

---

## Estrutura do repositório

```
site-musa/
├── index.html      # Site completo: HTML + CSS customizado + JavaScript
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
| Estilo customizado | CSS puro | Cards, acordeão, sombra do hero |
| Comportamento | JavaScript ES6 (vanilla) | Sem framework, sem build |
| Tipografia | Google Fonts | Lora (serifada) + Plus Jakarta Sans (sans) |
| Imagens | Unsplash + placehold.co | Placeholders, não são fotos da pousada |
| Versionamento | Git + GitHub | `gmsarti/site-musa` |

Não há `package.json`, bundler, testes automatizados nem backend.

---

## O que já está implementado

### Seções da página

| Seção | Âncora | Conteúdo |
|---|---|---|
| Cabeçalho fixo | — | Logo SVG (círculos concêntricos), navegação desktop e menu mobile |
| Hero | `#pousada` | Imagem de fundo, título, CTAs "Reservar Estadia" e "Conhecer História" |
| Observação de aves | `#aves` | Foto, texto, ícones e abertura do guia de espécies |
| Suítes | `#acomodacoes` | Bloco terracota, seletor de 3 acomodações e foto |
| Experiências | `#experiencias` | 3 cards verticais + 2 cards horizontais |
| FAQ | — | Acordeão com 3 perguntas |
| Rodapé | `#contato` | Contato, logo, mapa ilustrado do Brasil e links |

### Interações em JavaScript

| Recurso | Função | Estado |
|---|---|---|
| Abrir/fechar menu mobile | `toggleMobileMenu()` | Funcional |
| Acordeão do FAQ | `toggleFaq()` | Funcional (um item aberto por vez) |
| Modais de experiências, suítes, aves e informações | `modalDatabase`, `suitesDatabase`, `showModalData()` | Funcional |
| Cálculo de diárias no formulário | `calculateEstimate()` | Funcional, com regras limitadas |
| Fechar modais com `ESC` | listener de `keydown` | Funcional |
| Fechar modal clicando no fundo | — | **Não implementado** (o comentário no código sugere que sim) |
| Envio da reserva | `submitBooking()` | **Simulado** — só mostra mensagem de sucesso |

### Acessibilidade já presente

- `alt` descritivo na maioria das imagens
- `aria-label` no botão do menu mobile
- Navegação por âncoras e `scroll-smooth`
- Botões com foco visível do Tailwind

Ainda faltam foco preso nos modais, `aria-modal`, bloqueio de rolagem do fundo e revisão de contraste — ver pendências.

---

## Identidade visual

### Cores (tokens Tailwind `musa.*`)

| Token | Hex | Uso |
|---|---|---|
| `musa-bg` | `#F4EFE6` | Fundo principal (creme) |
| `musa-terracotta` | `#A84B2B` | Botões, títulos e rodapé |
| `musa-terracottaDark` | `#8C3B1F` | Hover dos botões |
| `musa-peach` | `#D8916C` | Seção de suítes |
| `musa-gold` | `#A88E5B` | FAQ e ícones |
| `musa-goldLight` | `#D5B878` | Destaque do título no hero |
| `musa-text` | `#4A3F35` | Texto principal |
| `musa-muted` | `#7A6F64` | Textos secundários |

Cores adicionais fora do tema: fundo do `body` `#E6DFD3` e borda dos cards `#C8B598`.

### Tipografia

- **Lora** — títulos e logo (`font-serif`)
- **Plus Jakarta Sans** — corpo e navegação (`font-sans`)

### Detalhes de estilo

- `musa-card-frame`: moldura dupla, borda de 1,5 px e elevação no hover
- `.hero-text-shadow`: sombra para legibilidade sobre a foto
- `.faq-answer`: transição de `max-height` no acordeão
- Container central com `max-w-5xl`, sombra e cantos arredondados, simulando uma "folha"

---

## Conteúdo de exemplo (validar)

> Tudo abaixo foi criado para o mockup e **não deve ser publicado sem confirmação**.

### Suítes

| Chave | Nome | Área | Capacidade | Diária | Destaque |
|---|---|---|---|---|---|
| `saira` | Suíte Saíra | 38 m² | Casal | R$ 580 | Vista para a copa das árvores |
| `bromelia` | Chalé Bromélia | 52 m² | Casal | R$ 790 | Banheira de imersão e lareira |
| `mata` | Cabana da Mata | 68 m² | Até 4 | R$ 950 | Mezanino e deck suspenso |

### Experiências

| Chave | Nome |
|---|---|
| `piscina` | Piscina natural de água corrente |
| `cafe` | Café da manhã na varanda |
| `lounge` | Lounge ao ar livre e fogo de chão |
| `barco` | Passeios de barco e pesca no Lagamar |
| `trilhas` | Trilhas privativas na Mata Atlântica |

### Aves citadas no guia

- Saíra-sete-cores (_Tangara seledon_)
- Tucano-de-bico-preto (_Ramphastos vitellinus_)
- Rabo-branco-de-garganta-rajada
- Papagaio-de-cara-roxa (_Amazona brasiliensis_)

### Contato exibido no rodapé

- Estrada Ecológica da Juréia, Km 8 — Iguape/SP
- WhatsApp: (13) 99742-8810
- © 2026

### Afirmações que precisam de comprovação

- "42 hectares de reserva particular"
- "Apenas 8 chalés"
- "+180 espécies catalogadas"
- "100% do aquecimento é solar"
- "Wi-Fi Starlink nas áreas comuns"
- Distâncias: 200 km de São Paulo, 220 km de Curitiba, 15 min do centro histórico

---

## Decisões técnicas

1. **Site estático, sem framework.** Para uma pousada, HTML/CSS/JS resolvem o problema com custo próximo de zero, alta velocidade e menos superfície de manutenção.
2. **Tailwind via CDN no protótipo.** Permite iterar sem build. Deve ser trocado pela versão compilada antes de produção.
3. **Interatividade no próprio HTML.** Modais e acordeão são simples e não justificam uma biblioteca.
4. **Reserva via WhatsApp/formulário como primeira integração.** Evita backend e banco de dados; um motor de reservas só se o volume justificar.
5. **Conteúdo centralizado em HTML.** Não há CMS; alterações de texto são feitas direto no arquivo.

---

## Documentação

- [PENDENCIAS.md](./PENDENCIAS.md) — backlog priorizado (P0, P1, P2), bugs conhecidos e critérios de lançamento.

---

## Próximos passos

1. Validar e substituir o conteúdo fictício.
2. Trocar as fotos por imagens reais e otimizadas.
3. Fazer o formulário de reserva enviar de verdade (WhatsApp ou e-mail).
4. Publicar em uma hospedagem estática (Netlify, Cloudflare Pages ou Vercel).
5. Configurar domínio, SEO básico e analytics.

O plano detalhado, com checkboxes e critérios de aceite, está em [PENDENCIAS.md](./PENDENCIAS.md).
