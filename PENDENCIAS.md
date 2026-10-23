# Pendências e Roadmap — Site Musa

Backlog do site da Pousada Musa, priorizado para transformar o protótipo em um site oficial, confiável e publicado.

**Última atualização:** 23/10/2026
**Estado atual:** site preenchido com dados públicos do Google Maps, fotos reais da listagem, galeria, avaliações e reserva via WhatsApp. Tailwind agora é compilado localmente, as imagens têm variantes responsivas e o CSS/JS não dependem mais do CDN. Ainda faltam confirmações de direitos, preços, detalhes das acomodações, política de privacidade e publicação.

> Documentação do que já existe: [README.md](./README.md).

---

## Legenda

| Prioridade | Significado |
|---|---|
| **P0** | Bloqueia o lançamento. Não publicar como oficial sem resolver. |
| **P1** | Qualidade e confiança. Deve entrar antes ou logo após o lançamento. |
| **P2** | Evolução. Faz sentido depois que o site estiver estável. |

Status: `[ ]` pendente · `[x]` concluído · `[~]` em andamento

---

## Resumo

| Frente | Itens | Concluídos | Em andamento |
|---|---|---|---|
| P0 — Bloqueadores | 5 | 1 | 2 |
| P1 — Qualidade | 8 | 1 | 6 |
| P2 — Evolução | 8 | 0 | 1 |
| Bugs conhecidos | 12 (+7 novos) | 12 corrigidos + 1 obsoleto | 1 parcial + 5 abertos |

> **Leitura rápida:** o site já está tecnicamente funcional e com dados reais. O que impede chamá-lo de oficial é a confirmação de direitos das fotos/depoimentos, os dados comerciais (preços, acomodações, regras), a política de privacidade e o domínio.

---

## P0 — Bloqueadores de lançamento

### P0-01 · Validar e substituir todo o conteúdo fictício

O conteúdo inventado do mockup foi removido. O que restou veio da listagem pública do Google Maps, das fotos e das avaliações.

**Já confirmado e aplicado:**

- [x] Nome: Pousada MUSA
- [x] Categoria: Pousada
- [x] Endereço: Rod. Pref. Casemiro Teixeira, Km 48 — Engenhos, Iguape/SP, 11920-000
- [x] Telefone/WhatsApp: (11) 95299-1990
- [x] Coordenadas: `-24.6555191, -47.5202416`
- [x] Plus Code: `8FVH+QW`
- [x] Avaliação: 5,0 no Google (2 avaliações)
- [x] Atributo: empresa que acolhe a comunidade LGBTQ+
- [x] Remoção de preços, suítes, hectares, chalés, espécies, solar, Starlink, endereço/telefone antigos e experiências não confirmadas
- [x] Textos de aves baseados nas fotos e avaliações (saíra-sete-cores, colhereiro, tiê-sangue)
- [x] Revisão de ortografia e tom de voz
- [x] Frase de mockup no rodapé removida

**Ainda falta confirmar com a pousada:**

- [ ] Preços e o que cada diária inclui
- [ ] Nomes, capacidades e detalhes reais de cada acomodação
- [ ] Horários de check-in e check-out
- [ ] Política de cancelamento e regras de hóspedes
- [ ] Café da manhã ou refeições inclusas
- [ ] E-mail, Instagram, Facebook e site oficial
- [ ] CNPJ / razão social
- [ ] Horário de atendimento
- [ ] Acessibilidade, pet friendly, estacionamento e outras comodidades
- [ ] Distâncias oficiais (São Paulo, Curitiba, centro de Iguape etc.)
- [ ] Número correto de acomodações e hóspedes

**Pronto quando:** nenhuma informação do site for inventada ou não confirmada pelo responsável, e os dados comerciais estiverem publicados.

---

### P0-02 · Substituir as fotos por imagens reais

As fotos de banco de imagens foram substituídas por imagens da listagem do Google Maps (6 fotos da pousada + 3 de avaliação), otimizadas localmente.

**Já feito:**

- [x] Baixar as fotos da listagem
- [x] Selecionar as imagens que representam a pousada
- [x] Converter para WebP (hero, pousada, piscina, jardim, aves, colhereiro, tiê)
- [x] Criar `img/og.jpg` (1200×630) para compartilhamento
- [x] Criar `img/favicon.svg`
- [x] Atualizar os `src` do `index.html`
- [x] Escrever `alt` descritivo e específico
- [x] Adicionar `loading="lazy"`, `width`/`height` e `fetchpriority="high"` no hero
- [x] Remover fallbacks do `placehold.co` e dependências do Unsplash
- [x] Criar galeria com 6 fotos e modal de ampliação

**Ainda falta:**

- [ ] Confirmar a autoria das fotos e a autorização de uso
- [ ] Confirmar autorização das fotos enviadas por hóspedes (avaliações)
- [ ] Fotografar interiores das acomodações, café da manhã e áreas comuns
- [ ] Gerar versões em múltiplos tamanhos (480, 960, 1600 px) ou `srcset`
- [ ] Avaliar AVIF além de WebP
- [ ] Substituir a foto do hero por uma imagem oficial, se houver
- [ ] Atualizar a imagem OG quando o domínio existir (URL absoluta)

**Pronto quando:** todas as imagens forem próprias ou autorizadas, com `alt`, peso adequado e URL absoluta na OG.

---

### P0-03 · Fazer a reserva funcionar de verdade

**Status:** concluído para WhatsApp. A reserva abre o aplicativo com a mensagem pronta; não há backend nem armazenamento no site.

**Já feito:**

- [x] Escolher WhatsApp como canal inicial
- [x] Montar a mensagem com nome, datas, acomodação, hóspedes, interesses e observações
- [x] Abrir `https://wa.me/5511952991990?text=...` com `encodeURIComponent`
- [x] Adicionar `name` em todos os campos
- [x] Remover a mensagem falsa de "sucesso"
- [x] Bloquear datas passadas (`min` no check-in)
- [x] Garantir check-out depois do check-in
- [x] Atualizar o `min` do check-out quando o check-in muda
- [x] Adicionar botão flutuante de WhatsApp
- [x] Adicionar fallback caso o pop-up seja bloqueado
- [x] Testar o fluxo no navegador e conferir a URL gerada

**Ainda falta:**

- [ ] Testar em celular real (iPhone e Android)
- [ ] Definir quem responde e em quanto tempo
- [ ] Definir se haverá confirmação automática
- [ ] Limitar hóspedes conforme a capacidade real de cada acomodação
- [ ] Não prometer disponibilidade sem checar o calendário real
- [ ] Avaliar motor de reservas se o volume justificar

**Pronto quando:** uma solicitação de teste chegar ao WhatsApp da pousada com todos os dados corretos, no desktop e no celular.

---

### P0-04 · Conformidade legal e LGPD

- [ ] Definir responsável pelo tratamento dos dados
- [ ] Criar política de privacidade (dados coletados, finalidade, retenção, contato)
- [ ] Criar aviso de cookies, se houver analytics
- [ ] Adicionar checkbox de consentimento no formulário, se dados forem armazenados
- [ ] Evitar coletar dados desnecessários (só o necessário para a reserva)
- [ ] Publicar política de cancelamento e regras da pousada
- [ ] Exibir CNPJ/razão social no rodapé, se aplicável
- [ ] Confirmar direitos de uso das fotos
- [ ] Confirmar direitos de uso dos depoimentos
- [ ] Não usar prêmios ou certificações sem comprovação
- [ ] Revisar o mapa incorporado do Google (cookies de terceiros)

> O formulário atual não armazena dados: ele apenas monta uma mensagem e abre o WhatsApp. Ainda assim, a política de privacidade é necessária porque o site usa Google Fonts, Google Maps e WhatsApp.

**Pronto quando:** o site tiver política de privacidade acessível e o fluxo de reserva explicar o uso dos dados.

---

### P0-05 · Publicar e configurar o domínio

- [ ] Escolher hospedagem estática: Netlify, Cloudflare Pages, Vercel ou GitHub Pages
- [ ] Fazer o primeiro deploy (Netlify Drop é o caminho mais rápido)
- [ ] Registrar o domínio (ex.: `pousadamusa.com.br` no Registro.br)
- [ ] Configurar DNS conforme a hospedagem
- [ ] Confirmar HTTPS e redirecionamento de `www`
- [ ] Configurar deploy automático a partir do GitHub
- [ ] Testar o site publicado em celular e desktop
- [ ] Enviar uma reserva de teste em produção
- [ ] Configurar página 404
- [ ] Atualizar `og:url`, `og:image` absoluta e URL canônica

**Pronto quando:** o site estiver acessível por um domínio próprio, com HTTPS e reserva testada.

---

## P1 — Qualidade e confiança

### P1-01 · Compilar o Tailwind para produção

**Status: concluído.** O CDN `cdn.tailwindcss.com` foi removido. O site usa um CSS de ~26 KB gerado localmente, com apenas as classes usadas.

- [x] Criar `package.json` e instalar `tailwindcss@3`
- [x] Criar `tailwind.config.js` com as cores `musa.*` e as fontes
- [x] Criar `src/input.css` com as diretivas `@tailwind`
- [x] Mover os estilos customizados para o CSS de entrada
- [x] Gerar `css/styles.css` minificado
- [x] Trocar o script do CDN por `<link rel="stylesheet">`
- [x] Remover o `<script>tailwind.config = ...</script>` inline
- [x] Adicionar script de build no `package.json`
- [x] Repetir o build a cada alteração de classe

**Comandos:**

```bash
npm install        # instala o Tailwind (só na primeira vez)
npm run build:css  # gera css/styles.css minificado
npm run watch:css  # regenera enquanto edita
npm test           # verifica HTML, IDs, imagens e arquivos locais
```

O `css/styles.css` é gerado e versionado no repositório para permitir deploy estático sem etapa de build.

**Pronto quando:** o site não carregar mais o CDN e o CSS gerado tiver apenas as classes usadas. ✅

---

### P1-02 · SEO on-page

**Já feito:**

- [x] `<title>` descritivo
- [x] `<meta name="description">`
- [x] Open Graph (`og:title`, `og:description`, `og:image`, `og:type`, `og:locale`)
- [x] Twitter Card
- [x] Favicon SVG
- [x] Hierarquia de títulos (um `h1`, `h2` por seção)
- [x] Texto real nos links
- [x] Conteúdo cobre "pousada em Iguape", "observação de aves" e "Mata Atlântica"
- [x] `alt` descritivo nas imagens
- [x] `og:site_name` e `og:image:alt`
- [x] Criar `robots.txt` (permitindo indexação)

**Ainda falta:**

- [ ] Definir URL canônica
- [ ] Adicionar `og:url`
- [ ] Usar URL absoluta em `og:image`
- [ ] Criar `sitemap.xml` — depende da URL definitiva do domínio
- [ ] Cadastrar no Google Search Console
- [ ] Criar/atualizar o Google Business Profile
- [ ] Revisar o SEO depois do domínio definido

**Pronto quando:** o site tiver título, descrição, imagem social absoluta, favicon, canonical, sitemap e Search Console verificados.

---

### P1-03 · Desempenho

**Já feito:**

- [x] Converter imagens para WebP
- [x] Adicionar `loading="lazy"` nas imagens abaixo da primeira dobra
- [x] Adicionar `width`/`height` para reduzir layout shift
- [x] Servir o hero com `fetchpriority="high"` e sem lazy
- [x] Remover dependências externas de imagem (Unsplash/placehold)
- [x] Criar imagem OG otimizada
- [x] Compilar o Tailwind e remover o CDN (P1-01)
- [x] Gerar variantes de 480 e 960 px com `srcset`/`sizes` em todas as imagens de conteúdo
- [x] Pré-carregar o hero responsivo (`rel="preload"` + `imagesrcset`)
- [x] Limitar os pesos das fontes (Lora 400; Plus Jakarta Sans 300–400–500–600)
- [x] Remover o carregamento da imagem do modal na primeira dobra (usa variante menor + lazy)
- [x] Adicionar `decoding="async"` nas imagens

**Ainda falta:**

- [ ] Auto-hospedar as fontes (hoje vêm do Google Fonts)
- [ ] Avaliar AVIF
- [ ] Rodar Lighthouse no celular e buscar ≥ 90 em Performance
- [ ] Revisar o peso total da página (as imagens originais de 1200–1400 px continuam disponíveis para telas grandes)

**Pronto quando:** Lighthouse mobile com Performance ≥ 90 e sem avisos críticos.

---

### P1-04 · Acessibilidade

**Já feito:**

- [x] `role="dialog"` e `aria-modal="true"` nos modais
- [x] Foco preso dentro do modal enquanto aberto
- [x] Devolver o foco ao botão que abriu o modal
- [x] Bloquear a rolagem do `body` com modal aberto
- [x] `aria-expanded` nos botões de menu e FAQ
- [x] Navegação completa por teclado nos componentes principais
- [x] Contraste revisado (Lighthouse 100)
- [x] `alt` descritivo nas fotos
- [x] `<main>` e hierarquia de títulos
- [x] Fechar com `ESC` e clique no fundo
- [x] Link "pular para o conteúdo" (`#conteudo`)
- [x] Foco visível global em links, botões, campos e elementos com `tabindex`
- [x] `aria-controls` no FAQ, ligando cada pergunta à resposta
- [x] `aria-describedby` no formulário, apontando para o aviso de privacidade
- [x] Respeitar `prefers-reduced-motion`
- [x] Revisar imagens decorativas (placeholders com `alt=""`; ícones com `aria-hidden="true"`)
- [x] Corrigir o fechamento de modal já fechado, que podia roubar o foco

**Ainda falta:**

- [ ] Testar com VoiceOver
- [ ] Testar navegação só por teclado em todos os fluxos (o ambiente automatizado não reproduz foco de janela)
- [ ] Revisar contraste em estados de hover

**Pronto quando:** Lighthouse Accessibility ≥ 95 (já em 100) e o site for navegável só com teclado e leitor de tela.

---

### P1-05 · Corrigir bugs conhecidos

Ver tabela de [bugs](#bugs-conhecidos) abaixo.

**Pronto quando:** nenhum bug de severidade alta ou média permanecer aberto.

---

### P1-06 · Contato e redes sociais

**Já feito:**

- [x] Telefone como link `tel:`
- [x] WhatsApp como link `https://wa.me/...`
- [x] Mapa real incorporado (Google Maps)
- [x] Link para rota
- [x] Rodapé revisado com endereço, telefone, WhatsApp e avaliação
- [x] Botão flutuante de WhatsApp

**Ainda falta:**

- [ ] Adicionar e-mail com `mailto:` (se houver)
- [ ] Adicionar Instagram e outras redes reais
- [ ] Adicionar horário de atendimento
- [ ] Confirmar o número oficial e o formato ideal de exibição

**Pronto quando:** todos os contatos forem clicáveis e levarem aos canais corretos.

---

### P1-07 · Analytics e medição

- [ ] Escolher ferramenta (Plausible, Cloudflare Analytics ou GA4)
- [ ] Instalar com o mínimo de cookies possível
- [ ] Medir cliques em "Reservar", abertura do modal e envio do formulário
- [ ] Configurar evento de conversão
- [ ] Adequar o aviso de cookies/privacidade
- [ ] Definir uma métrica principal (ex.: solicitações de reserva por mês)

**Pronto quando:** for possível ver quantas pessoas chegam e quantas iniciam uma reserva.

---

### P1-08 · Testes em dispositivos e navegadores

- [ ] iPhone (Safari) e Android (Chrome)
- [ ] Larguras 360, 390, 768, 1024 e 1440 px
- [ ] Safari, Chrome, Firefox e Edge
- [ ] Modais, menu mobile, FAQ e galeria
- [ ] Navegação por teclado
- [ ] Teste de formulário com dados inválidos
- [ ] Teste com internet lenta (3G simulado)
- [ ] Teste do mapa incorporado e do botão de rota
- [ ] Teste do link do WhatsApp no celular

**Pronto quando:** não houver quebra visual ou erro funcional nos cenários acima.

---

## P2 — Evolução

### P2-01 · Separar CSS e JavaScript

- [ ] Extrair o `<style>` para `css/styles.css` ou `src/input.css`
- [ ] Extrair o `<script>` para `js/main.js`
- [ ] Separar os dados de modais em `js/data.js`
- [ ] Revisar se o build do Tailwind cobre os arquivos JS
- [ ] Adicionar lint/formatador (ESLint + Prettier), se o projeto crescer

### P2-02 · Dados estruturados (Schema.org)

- [ ] Adicionar JSON-LD de `LodgingBusiness`
- [ ] Incluir endereço, telefone, fotos e comodidades
- [ ] Adicionar `FAQPage` para o acordeão
- [ ] Validar no Rich Results Test

### P2-03 · Google Business Profile

- [ ] Criar/reivindicar o perfil
- [ ] Adicionar fotos, horários, serviços e link do site
- [ ] Definir estratégia de avaliações
- [ ] Manter informações sincronizadas com o site

### P2-04 · Internacionalização

- [ ] Decidir se haverá versão em inglês e/ou espanhol
- [ ] Estruturar rotas (`/en/`, `/es/`) ou seletor de idioma
- [ ] Traduzir conteúdo e metadados
- [ ] Adicionar `hreflang`

### P2-05 · Conteúdo e blog

- [ ] Criar página de guia de aves
- [ ] Publicar conteúdo sobre Iguape, trilhas e Lagamar
- [ ] Definir calendário editorial
- [ ] Avaliar um CMS (Decap, Sanity) se o volume crescer

### P2-06 · Motor de reservas e disponibilidade

- [ ] Avaliar volume de reservas antes de contratar
- [ ] Integrar calendário real de disponibilidade
- [ ] Integrar pagamento, se necessário
- [ ] Sincronizar com OTAs (Booking, Airbnb), se aplicável

### P2-07 · CI/CD e monitoramento

- [ ] Deploy automático a partir do `main`
- [ ] Preview deploy por pull request
- [ ] Monitoramento de disponibilidade (UptimeRobot)
- [ ] Alertas de erro
- [ ] Backup do conteúdo e das imagens

### P2-08 · Galeria e prova social

- [x] Galeria de fotos reais
- [x] Depoimentos verificáveis de hóspedes (Google Maps)
- [ ] Integração com Instagram (com cuidado para não pesar a página)
- [ ] Vídeo curto do refúgio

---

## Bugs conhecidos

| ID | Descrição | Onde | Severidade | Status | Correção sugerida |
|---|---|---|---|---|---|
| B-01 | Envio da reserva era simulado | `submitBooking()` | Alta | **Corrigido** | Agora abre o WhatsApp com a mensagem pronta |
| B-02 | Campos do formulário tinham `id`, mas não `name` | Modal de reserva | Alta | **Corrigido** | `name` adicionado em todos os campos |
| B-03 | Datas passadas e check-out anterior ao check-in eram aceitos | `checkIn`, `checkOut` | Alta | **Corrigido** | `min`, validação no `change` e no submit |
| B-04 | Datas padrão usavam `toISOString()` e podiam adiantar um dia | `DOMContentLoaded` | Média | **Corrigido** | Formatação local com `getFullYear`, `getMonth`, `getDate` |
| B-05 | Comentário dizia que fechava ao clicar fora, mas só ESC funcionava | Modais | Média | **Corrigido** | Listener de clique no backdrop |
| B-06 | `max-height: 320px` podia cortar respostas longas do FAQ | `.faq-answer` | Média | **Corrigido** | Limite aumentado para 620px |
| B-07 | `img#modalImg` iniciava com `src=""` | Modal de conteúdo | Baixa | **Corrigido** | `src` inicial com imagem local |
| B-08 | Âncoras podiam ficar escondidas atrás do header fixo | Todas as seções | Média | **Corrigido** | `scroll-margin-top` via CSS |
| B-09 | Preços duplicados e total não recalculado | Modal de reserva | Média | **Obsoleto** | Preços removidos; valores são confirmados no WhatsApp |
| B-10 | Modais sem foco preso, `aria-modal` ou bloqueio de scroll | Modais | Média | **Corrigido** | `aria-modal`, foco preso, retorno de foco e scroll lock |
| B-11 | Contatos do rodapé não eram clicáveis | Rodapé | Média | **Corrigido** | `tel:` e `wa.me` |
| B-12 | Sem meta description, Open Graph, favicon, sitemap ou robots | `<head>` | Média | **Parcial** | Meta/OG/favicon/robots feitos; sitemap pendente do domínio |
| B-13 | Fotos vêm do Google Maps; autoria e autorização não confirmadas | `img/` | **Alta** | **Aberto** | Confirmar com a pousada e os autores das fotos |
| B-14 | Depoimentos do Google são públicos, mas a autorização de uso não foi confirmada | Seção de avaliações | Média | **Aberto** | Confirmar com os autores e com a pousada |
| B-15 | Preços, suítes, check-in/out e regras ainda são desconhecidos | Conteúdo | Média | **Aberto** | Levantar dados com a pousada (P0-01) |
| B-16 | `og:image` é relativa e não há canonical/`og:url` | `<head>` | Média | **Aberto** | Resolver após definir o domínio |
| B-17 | Mapa incorporado pode definir cookies do Google | Seção de localização | Média | **Aberto** | Aviso de cookies/privacidade (P0-04) |
| B-18 | Tailwind via CDN gerava aviso de produção | `<head>` | Baixa | **Corrigido** | CSS compilado em `css/styles.css` e carregado por `<link>` |
| B-19 | `closeModal()` devolvia o foco mesmo quando o modal já estava fechado (ESC sem modal aberto roubava o foco) | `closeModal()` | Baixa | **Corrigido** | Retorno antecipado se o modal não estiver aberto; foco resetado após fechar |

---

## Decisões pendentes

Antes de executar o restante do backlog, é preciso definir:

1. **Quem é o responsável oficial pelo site e pela pousada?** Isso define quem aprova textos, fotos e preços.
2. **As fotos e os depoimentos podem ser publicados?** Sem essa confirmação, o site não deve ser divulgado como oficial.
3. **Quais são os preços, acomodações, check-in/check-out e regras?** Sem isso, o site continua genérico.
4. **Qual será o canal oficial de reservas?** WhatsApp é o atual; um motor de reservas só se o volume justificar.
5. **Qual domínio será usado?** Necessário para canonical, `og:url`, e-mail e publicação.
6. **O site continuará como one-page ou terá páginas separadas?** Recomendação: manter one-page até haver conteúdo suficiente para um blog.
7. **Haverá analytics?** Define a necessidade de aviso de cookies.

---

## Ordem sugerida

### Sprint 0 — Base confiável (concluído)

- [x] Preencher o site com dados públicos do Google Maps
- [x] Remover conteúdo fictício
- [x] Substituir fotos de banco de imagens por fotos reais da listagem
- [x] Criar galeria, avaliações e localização
- [x] Integrar reserva via WhatsApp
- [x] Corrigir bugs de data, modal, foco e contato
- [x] Adicionar meta description, Open Graph, favicon e imagem OG
- [x] Atingir Lighthouse 100 em acessibilidade, boas práticas e SEO

### Sprint 1 — Tornar oficial (próximo)

- [ ] Confirmar direitos das fotos e depoimentos
- [ ] Levantar preços, acomodações, check-in/out e regras
- [ ] Criar política de privacidade
- [ ] Confirmar e-mail, Instagram e horário de atendimento
- [ ] Testar o fluxo de reserva no celular
- [ ] Publicar em uma hospedagem estática para teste

### Sprint 2 — Lançar oficialmente

- [ ] Registrar domínio e configurar DNS/HTTPS
- [ ] Atualizar canonical, `og:url` e `og:image` absoluta
- [x] Compilar o Tailwind
- [ ] Rodar Lighthouse mobile e otimizar performance
- [ ] Criar `robots.txt` e `sitemap.xml`
- [ ] Configurar Google Search Console e Google Business Profile
- [ ] Testes finais em dispositivos e navegadores

### Sprint 3 — Evoluir

- [ ] Analytics
- [ ] Schema.org (`LodgingBusiness` e `FAQPage`)
- [ ] Conteúdo/blog sobre aves e Iguape
- [ ] Motor de reservas, se necessário
- [ ] Integração com Instagram e vídeo curto

---

## Critérios de lançamento (Definition of Done)

O site só deve ser divulgado como oficial quando:

- [ ] Nenhum dado fictício ou não comprovado permanecer
- [ ] Todas as fotos forem próprias ou autorizadas
- [ ] Os depoimentos tiverem autorização de uso
- [ ] Preços, acomodações, check-in/out e regras estiverem publicados
- [ ] Uma reserva de teste chegar ao WhatsApp com todos os dados
- [ ] Política de privacidade estiver publicada
- [ ] Domínio próprio com HTTPS estiver ativo
- [ ] `robots.txt`, `sitemap.xml` e canonical estiverem configurados
- [ ] Lighthouse mobile ≥ 90 em Performance, Acessibilidade e SEO
- [ ] Site funcionar em iPhone, Android, Safari e Chrome
- [ ] Contatos e redes sociais estiverem corretos e clicáveis
- [ ] Google Search Console e Google Business Profile estiverem configurados
- [ ] Responsável souber atualizar textos, fotos e preços sem ajuda técnica
