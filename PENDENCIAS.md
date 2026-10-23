# Pendências e Roadmap — Site Musa

Backlog do site da Pousada Musa, priorizado para tirar o protótipo do papel e colocar uma versão confiável no ar.

**Última atualização:** 23/10/2026
**Estado atual:** protótipo visual estático funcional, com conteúdo fictício e reserva simulada.

> Documentação do que já existe: [README.md](./README.md).

---

## Legenda

| Prioridade | Significado |
|---|---|
| **P0** | Bloqueia o lançamento. Não publicar sem resolver. |
| **P1** | Qualidade e confiança. Deve entrar antes ou logo após o lançamento. |
| **P2** | Evolução. Faz sentido depois que o site estiver estável. |

Status: `[ ]` pendente · `[x]` concluído · `[~]` em andamento

---

## Resumo

| Frente | Itens | Concluídos |
|---|---|---|
| P0 — Bloqueadores | 5 | 0 |
| P1 — Qualidade | 8 | 0 |
| P2 — Evolução | 8 | 0 |
| Bugs conhecidos | 12 | 0 |

---

## P0 — Bloqueadores de lançamento

### P0-01 · Validar e substituir todo o conteúdo fictício

Tudo no site foi criado para um mockup. Publicar sem validação significa anunciar preços e características erradas.

- [ ] Confirmar se a pousada é real e se o site é oficial
- [ ] Endereço completo e confirmado (hoje: "Estrada Ecológica da Juréia, Km 8")
- [ ] Telefone/WhatsApp oficial (hoje: "(13) 99742-8810")
- [ ] E-mail, Instagram e demais redes
- [ ] Preços e o que cada diária inclui
  - [ ] Suíte Saíra: R$ 580
  - [ ] Chalé Bromélia: R$ 790
  - [ ] Cabana da Mata: R$ 950
- [ ] Capacidade real de cada acomodação
- [ ] Número de chalés, área da reserva e demais números institucionais
- [ ] Revisar todas as afirmações que exigem comprovação:
  - [ ] "42 hectares de reserva particular"
  - [ ] "Apenas 8 chalés"
  - [ ] "+180 espécies catalogadas"
  - [ ] "100% do aquecimento é solar"
  - [ ] "Wi-Fi Starlink"
  - [ ] Distâncias (200 km de SP, 220 km de Curitiba, 15 min do centro)
- [ ] Revisar textos do FAQ (acesso pela estrada de terra, itens inclusos etc.)
- [ ] Corrigir a frase de mockup no rodapé: "Hospedagem estática leve e rápida"
- [ ] Definir política de cancelamento, check-in/check-out e regras de hóspedes
- [ ] Revisar ortografia e tom de voz

**Pronto quando:** nenhuma informação do site for inventada ou não confirmada pelo responsável.

---

### P0-02 · Substituir as fotos por imagens reais

Hoje há 19 referências a imagens externas do Unsplash e fallbacks do placehold.co.

- [ ] Fotografar (ou contratar fotógrafo) quartos, café da manhã, áreas comuns, trilhas e aves
- [ ] Obter autorização de uso das imagens, especialmente se houver pessoas identificáveis
- [ ] Comprimir para WebP/AVIF com [Squoosh](https://squoosh.app) ou similar
- [ ] Gerar versões em múltiplos tamanhos (ex.: 480, 960, 1600 px)
- [ ] Salvar em `img/` e atualizar os `src` do `index.html`
- [ ] Escrever `alt` descritivo e específico para cada foto
- [ ] Remover os fallbacks `placehold.co` depois que as imagens locais estiverem estáveis
- [ ] Definir uma imagem para compartilhamento (Open Graph, 1200×630)

**Pronto quando:** nenhuma imagem depender de Unsplash e todas tiverem `alt` e peso adequado.

---

### P0-03 · Fazer a reserva funcionar de verdade

**Problema:** `submitBooking()` só remove o `hidden` da caixa de sucesso. Nenhum dado é enviado. Além disso, os campos têm `id` mas não têm `name`, então um backend de formulário não receberia os valores.

**Decisões necessárias:**

- [ ] Escolher o canal: WhatsApp, e-mail (Formspree/Netlify Forms) ou motor de reservas
- [ ] Definir quem responde e em quanto tempo
- [ ] Definir se haverá confirmação automática

**Se a escolha for WhatsApp (recomendado para começar):**

- [ ] Montar a mensagem com nome, datas, acomodação e hóspedes
- [ ] Abrir `https://wa.me/55DDDNUMERO?text=...` com `encodeURIComponent`
- [ ] Testar no celular e no desktop, incluindo bloqueador de pop-up
- [ ] Remover a mensagem de "sucesso" que promete envio inexistente
- [ ] Considerar um botão flutuante de WhatsApp no site

**Se a escolha for formulário por e-mail:**

- [ ] Adicionar `name` em todos os campos
- [ ] Configurar o serviço (Formspree, Netlify Forms, Basin)
- [ ] Configurar destinatário, assunto e resposta automática
- [ ] Adicionar proteção anti-spam (honeypot ou captcha)
- [ ] Criar página/estado de sucesso real

**Se a escolha for motor de reservas:**

- [ ] Escolher fornecedor (Beds24, Little Hotelier, Booking.com etc.)
- [ ] Trocar o botão por link para o motor
- [ ] Manter o formulário atual apenas como contato, se fizer sentido

**Validações obrigatórias:**

- [ ] Bloquear datas passadas (`min` no check-in)
- [ ] Garantir check-out depois do check-in
- [ ] Limitar hóspedes conforme a capacidade da acomodação
- [ ] Recalcular o total quando qualquer campo mudar
- [ ] Não prometer disponibilidade sem checar o calendário real

**Pronto quando:** uma solicitação de teste chegar de fato ao canal escolhido, com todos os dados corretos.

---

### P0-04 · Conformidade legal e LGPD

- [ ] Definir responsável pelo tratamento dos dados
- [ ] Criar política de privacidade (dados coletados, finalidade, retenção, contato)
- [ ] Criar aviso de cookies, se houver analytics
- [ ] Adicionar checkbox de consentimento no formulário, se dados forem armazenados
- [ ] Evitar coletar dados desnecessários (só o necessário para a reserva)
- [ ] Publicar política de cancelamento e regras da pousada
- [ ] Exibir CNPJ/razão social no rodapé, se aplicável
- [ ] Verificar direitos de uso das fotos e depoimentos
- [ ] Não usar depoimentos, prêmios ou certificações sem comprovação

**Pronto quando:** o site tiver política de privacidade acessível e o fluxo de reserva explicar o uso dos dados.

---

### P0-05 · Publicar e configurar o domínio

- [ ] Escolher hospedagem estática: Netlify, Cloudflare Pages, Vercel ou GitHub Pages
- [ ] Fazer o primeiro deploy (Netlify Drop é o caminho mais rápido)
- [ ] Registrar o domínio (ex.: `pousadamusa.com.br` no Registro.br)
- [ ] Configurar DNS conforme a hospedagem
- [ ] Confirmar HTTPS e redirecionamento de `www`
- [ ] Configurar deploy automático a partir do GitHub (opcional no início)
- [ ] Testar o site publicado em celular e desktop
- [ ] Enviar uma reserva de teste em produção
- [ ] Configurar página 404

**Pronto quando:** o site estiver acessível por um domínio próprio, com HTTPS e reserva testada.

---

## P1 — Qualidade e confiança

### P1-01 · Compilar o Tailwind para produção

O CDN `cdn.tailwindcss.com` não deve ser usado em produção: gera CSS em runtime, pesa mais e atrasa a renderização.

- [ ] Criar `package.json` e instalar `tailwindcss@3`
- [ ] Criar `tailwind.config.js` com as cores `musa.*` e as fontes
- [ ] Criar `src/input.css` com as diretivas `@tailwind`
- [ ] Mover os estilos customizados para o CSS de entrada
- [ ] Gerar `css/styles.css` minificado
- [ ] Trocar o script do CDN por `<link rel="stylesheet">`
- [ ] Remover o `<script>tailwind.config = ...</script>` inline
- [ ] Adicionar script de build no `package.json`
- [ ] Repetir o build a cada alteração de classe

**Pronto quando:** o site não carregar mais o CDN e o CSS gerado tiver apenas as classes usadas.

---

### P1-02 · SEO on-page

- [ ] Adicionar `<meta name="description">` com texto real e persuasivo
- [ ] Adicionar Open Graph (`og:title`, `og:description`, `og:image`, `og:url`, `og:type`)
- [ ] Adicionar Twitter Card
- [ ] Criar favicon e ícones para iOS/Android
- [ ] Definir URL canônica
- [ ] Criar `robots.txt`
- [ ] Criar `sitemap.xml`
- [ ] Revisar hierarquia de títulos (um `h1`, `h2` por seção)
- [ ] Usar texto real nos links (evitar "clique aqui")
- [ ] Verificar se o conteúdo cobre as buscas relevantes: "pousada em Iguape", "observação de aves", "Mata Atlântica"
- [ ] Cadastrar no Google Search Console
- [ ] Criar/atualizar o Google Business Profile

**Pronto quando:** o site tiver título, descrição, imagem social, favicon, sitemap e Search Console verificados.

---

### P1-03 · Desempenho

- [ ] Converter imagens para WebP/AVIF
- [ ] Adicionar `loading="lazy"` nas imagens abaixo da primeira dobra
- [ ] Adicionar `width`/`height` ou `aspect-ratio` para evitar layout shift
- [ ] Servir a imagem do hero com prioridade (`fetchpriority="high"`) e sem lazy
- [ ] Auto-hospedar as fontes ou limitar os pesos carregados
- [ ] Remover dependências externas desnecessárias
- [ ] Rodar Lighthouse no celular e buscar ≥ 90 em Performance

**Pronto quando:** Lighthouse mobile com Performance ≥ 90 e sem avisos críticos.

---

### P1-04 · Acessibilidade

- [ ] Adicionar `role="dialog"` e `aria-modal="true"` nos modais
- [ ] Prender o foco dentro do modal enquanto aberto
- [ ] Devolver o foco ao botão que abriu o modal
- [ ] Bloquear a rolagem do `body` com modal aberto
- [ ] Adicionar `aria-expanded` nos botões de menu e FAQ
- [ ] Garantir navegação completa por teclado
- [ ] Revisar contraste de textos sobre imagens e sobre o pêssego
- [ ] Adicionar link "pular para o conteúdo"
- [ ] Revisar `alt` de imagens decorativas (usar `alt=""`)
- [ ] Testar com VoiceOver

**Pronto quando:** Lighthouse Accessibility ≥ 95 e o site for navegável só com teclado.

---

### P1-05 · Corrigir bugs conhecidos

Ver tabela de [bugs](#bugs-conhecidos) abaixo.

**Pronto quando:** nenhum bug de severidade alta ou média permanecer aberto.

---

### P1-06 · Contato e redes sociais

- [ ] Transformar o telefone em link `tel:`
- [ ] Transformar o WhatsApp em link `https://wa.me/...`
- [ ] Adicionar e-mail com `mailto:`
- [ ] Adicionar Instagram e outras redes reais
- [ ] Incorporar mapa real (Google Maps) ou link para rota
- [ ] Adicionar horário de atendimento
- [ ] Revisar o rodapé inteiro

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
- [ ] Modais, menu mobile, FAQ e cálculo de diárias
- [ ] Navegação por teclado
- [ ] Teste de formulário com dados inválidos
- [ ] Teste com internet lenta (3G simulado)

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
- [ ] Incluir endereço, telefone, faixa de preço, fotos e comodidades
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

- [ ] Galeria de fotos reais
- [ ] Depoimentos verificáveis de hóspedes
- [ ] Integração com Instagram (com cuidado para não pesar a página)
- [ ] Vídeo curto do refúgio

---

## Bugs conhecidos

| ID | Descrição | Onde | Severidade | Correção sugerida |
|---|---|---|---|---|
| B-01 | Envio da reserva é simulado; nenhum dado sai do navegador | `submitBooking()` | **Alta** | Implementar WhatsApp/formulário/motor (P0-03) |
| B-02 | Campos do formulário têm `id`, mas não `name` | Modal de reserva | **Alta** | Adicionar `name` em todos os campos |
| B-03 | Datas passadas e check-out anterior ao check-in são aceitos | `checkIn`, `checkOut`, `calculateEstimate()` | **Alta** | Usar `min`, validar no `change` e no submit |
| B-04 | Datas padrão usam `toISOString()` e podem adiantar um dia no fuso do Brasil após ~21h | Listener de `DOMContentLoaded` | Média | Formatar data local (`getFullYear`, `getMonth`, `getDate`) |
| B-05 | Comentário diz que fecha ao clicar fora, mas só ESC funciona | `contentModal`, `bookingModal` | Média | Adicionar listener de clique no backdrop |
| B-06 | `max-height: 320px` pode cortar respostas longas do FAQ no celular | `.faq-answer` | Média | Aumentar o limite ou calcular a altura real |
| B-07 | `img#modalImg` inicia com `src=""` | Modal de conteúdo | Baixa | Remover o `src` inicial ou usar placeholder |
| B-08 | Âncoras podem ficar escondidas atrás do header fixo | Todas as seções | Média | Adicionar `scroll-mt-24` ou equivalente |
| B-09 | Preços duplicados no `<select>` e nos textos dos modais; nº de hóspedes não afeta o total | Modal de reserva | Média | Centralizar tarifas em um único objeto |
| B-10 | Modais sem foco preso, `aria-modal` ou bloqueio de scroll | Todos os modais | Média | Implementar padrão de diálogo acessível |
| B-11 | Contatos do rodapé não são clicáveis | Rodapé | Média | Usar `tel:`, `mailto:` e `wa.me` |
| B-12 | Sem `meta description`, Open Graph, favicon, sitemap ou `robots.txt` | `<head>` | Média | Resolver em P1-02 |

---

## Decisões pendentes

Antes de executar o backlog, é preciso definir:

1. **A pousada é real ou o site é um estudo/portfólio?** Isso muda o nível de rigor legal e de conteúdo.
2. **Qual será o canal oficial de reservas?** WhatsApp, e-mail ou motor de reservas.
3. **Quem fornece fotos, textos e preços?** Sem isso, P0-01 e P0-02 ficam bloqueados.
4. **Qual domínio será usado?** Necessário para SEO, e-mail e publicação.
5. **O site continuará como one-page ou terá páginas separadas?** Recomendação: manter one-page até haver conteúdo suficiente para um blog.
6. **Haverá analytics?** Define a necessidade de aviso de cookies.

---

## Ordem sugerida

### Sprint 0 — Colocar no ar para teste (1 dia)

- [ ] Deploy no Netlify Drop ou Cloudflare Pages
- [ ] Testar no celular
- [ ] Corrigir bugs B-03, B-05 e B-08
- [ ] Adicionar `meta description` e favicon provisórios

### Sprint 1 — Tornar confiável (1 semana)

- [ ] P0-01: validar conteúdo
- [ ] P0-03: integrar reserva por WhatsApp
- [ ] P0-02: primeiras fotos reais
- [ ] P0-04: política de privacidade
- [ ] P1-06: contatos clicáveis

### Sprint 2 — Lançar oficialmente (1 semana)

- [ ] Domínio e DNS
- [ ] P1-01: build do Tailwind
- [ ] P1-02: SEO completo
- [ ] P1-03 e P1-04: performance e acessibilidade
- [ ] P1-08: testes finais

### Sprint 3 — Evoluir

- [ ] P1-07: analytics
- [ ] P2-02 e P2-03: schema e Google Business Profile
- [ ] P2-05: conteúdo
- [ ] P2-06: motor de reservas, se necessário

---

## Critérios de lançamento (Definition of Done)

O site só deve ser divulgado como oficial quando:

- [ ] Nenhum dado fictício ou não comprovado permanecer
- [ ] Todas as fotos forem próprias e autorizadas
- [ ] Uma reserva de teste chegar ao canal oficial com todos os dados
- [ ] Política de privacidade estiver publicada
- [ ] Domínio próprio com HTTPS estiver ativo
- [ ] Lighthouse mobile ≥ 90 em Performance, Acessibilidade e SEO
- [ ] Site funcionar em iPhone, Android, Safari e Chrome
- [ ] Contatos e redes sociais estiverem corretos e clicáveis
- [ ] Google Search Console e Google Business Profile estiverem configurados
- [ ] Responsável souber atualizar textos, fotos e preços sem ajuda técnica
