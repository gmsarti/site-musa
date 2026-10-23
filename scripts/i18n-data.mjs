// Traduções e configuração das páginas de idioma.
// A página em português (index.html) é a fonte da estrutura.
// Execute "npm run build:i18n" após alterar textos ou traduções.

const SITE = 'https://gmsarti.github.io/site-musa';

const LANGUAGE_LINKS = {
    'pt-BR': '../',
    en: '../en/',
    es: '../es/',
    fr: '../fr/'
};

const LANGUAGE_NAMES = {
    'pt-BR': 'Português',
    en: 'English',
    es: 'Español',
    fr: 'Français'
};

const LANGUAGE_CODES = {
    'pt-BR': 'PT',
    en: 'EN',
    es: 'ES',
    fr: 'FR'
};

function switcherItems(currentLang) {
    return ['pt-BR', 'en', 'es', 'fr'].map((lang) => {
        const code = LANGUAGE_CODES[lang];
        const name = LANGUAGE_NAMES[lang];
        if (lang === currentLang) {
            return `<span class="px-1.5 py-1 text-musa-terracotta" aria-current="page" aria-label="${name}" lang="${lang}">${code}</span>`;
        }
        return `<a href="${LANGUAGE_LINKS[lang]}" hreflang="${lang}" lang="${lang}" aria-label="${name}" class="px-1.5 py-1 hover:text-musa-terracotta transition-colors">${code}</a>`;
    });
}

function switcherItemsMobile(currentLang) {
    return ['pt-BR', 'en', 'es', 'fr'].map((lang) => {
        const code = LANGUAGE_CODES[lang];
        const name = LANGUAGE_NAMES[lang];
        if (lang === currentLang) {
            return `<span class="py-1.5 text-musa-terracotta" aria-current="page" aria-label="${name}" lang="${lang}">${code}</span>`;
        }
        return `<a href="${LANGUAGE_LINKS[lang]}" hreflang="${lang}" lang="${lang}" aria-label="${name}" class="py-1.5 hover:text-musa-terracotta">${code}</a>`;
    });
}

export function buildSwitcher(lang, label, mobile = false) {
    const items = mobile ? switcherItemsMobile(lang) : switcherItems(lang);
    const separator = mobile ? '' : '\n                        <span class="text-stone-400" aria-hidden="true">/</span>\n                        ';
    const content = items.join(separator);
    if (mobile) {
        return `<div class="flex items-center gap-3 pt-2 text-xs font-semibold uppercase tracking-wider text-musa-muted border-t border-stone-200">
                    ${content}
                </div>`;
    }
    return `<nav class="hidden items-center gap-1 text-[11px] font-semibold uppercase tracking-wider text-musa-muted" aria-label="${label}">
                        ${content}
                    </nav>`;
}

export function buildAlternates() {
    return [
        `<link rel="alternate" hreflang="pt-BR" href="${SITE}/">`,
        `<link rel="alternate" hreflang="en" href="${SITE}/en/">`,
        `<link rel="alternate" hreflang="es" href="${SITE}/es/">`,
        `<link rel="alternate" hreflang="fr" href="${SITE}/fr/">`,
        `<link rel="alternate" hreflang="x-default" href="${SITE}/">`
    ].join('\n    ');
}

export function buildOgLocale(lang, locale, alternates, url) {
    const lines = [
        `<meta property="og:locale" content="${locale}">`,
        ...alternates.map((alt) => `<meta property="og:locale:alternate" content="${alt}">`),
        `<meta property="og:url" content="${url}">`
    ];
    return lines.join('\n    ');
}

export const languages = {
    en: {
        lang: 'en',
        title: 'Pousada Musa | Lodging and birdwatching in Iguape, Brazil',
        description: 'An inn in Iguape, São Paulo, surrounded by the Atlantic Forest. Comfortable rooms, gardens, a natural pool and birdwatching. Chat with us on WhatsApp.',
        ogTitle: 'Pousada Musa | Iguape, Brazil',
        ogDescription: 'A refuge in the Atlantic Forest with comfortable rooms, gardens, a natural pool and birdwatching.',
        ogImageAlt: 'Entrance to Pousada Musa, in Iguape, Brazil',
        ogLocale: 'en_US',
        ogAlternates: ['pt_BR', 'es_ES', 'fr_FR'],
        url: `${SITE}/en/`,
        switcherLabel: 'Language',
        booking: {
            invalidDates: 'Please check the dates: check-out must be after check-in.',
            missingName: 'Please enter your name.'
        },
        replacements: [
            // Navegação e hero
            [`>Pular para o conteúdo</a>`, `>Skip to content</a>`],
            [`aria-label="Pousada Musa — início"`, `aria-label="Pousada Musa — home"`],
            [`aria-label="Navegação principal"`, `aria-label="Main navigation"`],
            [`>A Pousada<`, `>The Inn<`],
            [`>Acomodações<`, `>Rooms<`],
            [`>Observação de Aves<`, `>Birdwatching<`],
            [`>Experiências<`, `>Experiences<`],
            [`>Localização<`, `>Location<`],
            [`>Contato<`, `>Contact<`],
            [`"Abrir menu"`, `"Open menu"`],
            [`"Fechar menu"`, `"Close menu"`],
            [/(>\s*)Reservar(\s*<\/button>)/g, `$1Book$2`],
            [/(>\s*)Reservar Estadia(\s*<\/button>)/g, `$1Book Your Stay$2`],
            [`>Reservar Estadia<`, `>Book Your Stay<`],
            [/(>\s*)Conhecer a Pousada(\s*<\/button>)/g, `$1Discover the Inn$2`],
            [/(>\s*)Falar no WhatsApp(\s*<\/a>)/g, `$1Chat on WhatsApp$2`],
            [/(>\s*)Traçar rota(\s*<\/a>)/g, `$1Get directions$2`],
            [/(>\s*)Consultar datas(\s*<\/button>)/g, `$1Check dates$2`],
            [/(>\s*)Reservar pelo WhatsApp(\s*<\/(?:a|button)>)/g, `$1Book via WhatsApp$2`],
            [/(>\s*)Enviar pelo WhatsApp(\s*<\/button>)/g, `$1Send via WhatsApp$2`],
            [`Iguape • Mata Atlântica`, `Iguape • Atlantic Forest`],
            [`Refúgio na Mata Atlântica &amp; Observação de Aves`, `A refuge in the Atlantic Forest &amp; birdwatching`],
            [`5,0 no Google · 2 avaliações`, `5.0 on Google · 2 reviews`],
            [`5,0 no Google`, `5.0 on Google`],
            [`alt="Entrada da Pousada Musa, com portal de madeira, caminho e vegetação da Mata Atlântica"`, `alt="Entrance to Pousada Musa, with a wooden gate, path and Atlantic Forest vegetation"`],

            // Observação de aves
            [`alt="Saíra-sete-cores pousada em um galho, com bromélia ao fundo"`, `alt="Seven-colored Tanager perched on a branch, with a bromeliad in the background"`],
            [`Aves da Mata Atlântica • Clique para conhecer`, `Atlantic Forest birds • Click to learn more`],
            [`Observação<br>de Aves`, `Birdwatching`],
            [`Cercada por árvores frutíferas e pela Mata Atlântica, a Musa tem um comedouro movimentado e jardins que atraem aves ao longo do dia. Saíras, colhereiros e tiês-sangue já foram fotografados na região.`, `Surrounded by fruit trees and the Atlantic Forest, Musa has a busy feeder and gardens that attract birds throughout the day. Seven-colored Tanagers, Roseate Spoonbills and Brazilian Tanagers have already been photographed in the area.`],
            [`>Conhecer as aves<`, `>Discover the birds<`],
            [`title="Ver aves" aria-label="Ver aves"`, `title="See the birds" aria-label="See the birds"`],
            [`title="Dicas de observação" aria-label="Dicas de observação"`, `title="Birdwatching tips" aria-label="Birdwatching tips"`],

            // Suítes
            [`Aconchego na Mata`, `Comfort in the Forest`],
            [`Nossas Suítes`, `Our Rooms`],
            [`Suítes confortáveis, com camas elogiadas por quem já se hospedou e banheiros novos. Um lugar para desacelerar, ouvir os pássaros e dormir bem.`, `Comfortable rooms with beds praised by past guests and new bathrooms. A place to slow down, listen to the birds and sleep well.`],
            [`Os valores, a disponibilidade e os detalhes de cada acomodação são confirmados diretamente pelo WhatsApp.`, `Rates, availability and the details of each room are confirmed directly via WhatsApp.`],
            [`>Consultar disponibilidade<`, `>Check availability<`],
            [`alt="Área externa da Pousada Musa, com varanda, jardim e vegetação"`, `alt="Pousada Musa's outdoor area, with a veranda, garden and vegetation"`],
            [`Fale com a gente →`, `Talk to us →`],

            // Experiências
            [`Vivências na Musa`, `Experiences at Musa`],
            [`Clique em cada experiência para ver detalhes e fotos.`, `Click each experience to see details and photos.`],
            [`Piscina Natural`, `Natural Pool`],
            [`Água natural e jardins • Ver mais`, `Natural water and gardens • See more`],
            [`alt="Piscina natural da Pousada Musa, com pedras, plantas e água corrente"`, `alt="Natural pool at Pousada Musa, with rocks, plants and flowing water"`],
            [`Jardins &amp; Árvores Frutíferas`, `Gardens &amp; Fruit Trees`],
            [`Mata Atlântica ao redor • Ver mais`, `Atlantic Forest all around • See more`],
            [`alt="Jardins da Pousada Musa, com lago, plantas tropicais e árvores"`, `alt="Gardens at Pousada Musa, with a lake, tropical plants and trees"`],
            [`Comedouro e espécies da mata • Ver mais`, `Feeder and forest species • See more`],
            [`alt="Saíra-sete-cores em galho na Pousada Musa"`, `alt="Seven-colored Tanager on a branch at Pousada Musa"`],
            [`Varanda &amp; Descanso`, `Veranda &amp; Rest`],
            [`O ritmo da floresta • Ver mais`, `The rhythm of the forest • See more`],
            [`alt="Varanda da Pousada Musa com vista para o jardim"`, `alt="Veranda at Pousada Musa with garden views"`],

            // Galeria
            [`Fotos reais`, `Real photos`],
            [`A Musa em imagens`, `Musa in pictures`],
            [`Clique em uma foto para ampliar.`, `Click a photo to enlarge.`],
            [`data-tag="Galeria"`, `data-tag="Gallery"`],
            [`data-title="Entrada da Musa" data-text="O portal de madeira e o caminho de entrada, cercados pela vegetação."`, `data-title="Musa entrance" data-text="The wooden gate and the entrance path, surrounded by vegetation."`],
            [`alt="Entrada da Pousada Musa"`, `alt="Entrance to Pousada Musa"`],
            [`>Entrada</span>`, `>Entrance</span>`],
            [`data-title="Varanda e jardim" data-text="A área externa da pousada, com varanda e vista para o jardim."`, `data-title="Veranda and garden" data-text="The inn's outdoor area, with a veranda and garden views."`],
            [`alt="Varanda e jardim da Pousada Musa"`, `alt="Veranda and garden at Pousada Musa"`],
            [`>Varanda</span>`, `>Veranda</span>`],
            [`data-title="Piscina natural" data-text="Água natural, pedras e vegetação ao redor."`, `data-title="Natural pool" data-text="Natural water, rocks and vegetation all around."`],
            [`alt="Piscina natural da Pousada Musa"`, `alt="Natural pool at Pousada Musa"`],
            [`>Piscina natural</span>`, `>Natural pool</span>`],
            [`data-title="Jardins e lago" data-text="Jardins, árvores frutíferas e o lago da pousada."`, `data-title="Gardens and lake" data-text="Gardens, fruit trees and the inn's lake."`],
            [`alt="Jardins e lago da Pousada Musa"`, `alt="Gardens and lake at Pousada Musa"`],
            [`>Jardins</span>`, `>Gardens</span>`],
            [`data-title="Saíra-sete-cores" data-text="Uma das espécies já fotografadas nos jardins da Musa."`, `data-title="Seven-colored Tanager" data-text="One of the species already photographed in Musa's gardens."`],
            [`alt="Saíra-sete-cores na Pousada Musa"`, `alt="Seven-colored Tanager at Pousada Musa"`],
            [`>Saíra-sete-cores</span>`, `>Seven-colored Tanager</span>`],
            [`data-title="Colhereiro" data-text="Ave registrada na região, em meio à Mata Atlântica."`, `data-title="Roseate Spoonbill" data-text="A bird recorded in the region, amid the Atlantic Forest."`],
            [`alt="Colhereiro em galho na região da Pousada Musa"`, `alt="Roseate Spoonbill on a branch in the Pousada Musa region"`],
            [`>Colhereiro</span>`, `>Roseate Spoonbill</span>`],

            // Avaliações
            [`Quem já se hospedou`, `Past guests`],
            [`O que dizem os hóspedes`, `What guests say`],
            [`aria-label="5 de 5 estrelas"`, `aria-label="5 out of 5 stars"`],
            [`“As suítes são ótimas, camas confortáveis, banheiro novo. Muitas árvores de frutas que atraem diversos pássaros lindos de ficar observando.”`, `“The rooms are great, the beds comfortable, the bathroom new. Lots of fruit trees that attract many beautiful birds to watch.”
                        <span class="block mt-2 text-[11px] text-musa-muted">Translated from Portuguese.</span>
                        <details class="mt-2 text-[11px] text-musa-muted">
                            <summary class="cursor-pointer">Original review (Portuguese)</summary>
                            <p lang="pt-BR" class="mt-1">“As suítes são ótimas, camas confortáveis, banheiro novo. Muitas árvores de frutas que atraem diversos pássaros lindos de ficar observando.”</p>
                        </details>`],
            [`“Pousada agradável e acolhedora. Comida boa. Eu fotografo pássaros e o lugar é ótimo pra isso. Comedouro bem movimentado com aves da Mata Atlântica.”`, `“A pleasant, welcoming inn. Good food. I photograph birds and the place is great for that. A very busy feeder with Atlantic Forest birds.”
                        <span class="block mt-2 text-[11px] text-musa-muted">Translated from Portuguese.</span>
                        <details class="mt-2 text-[11px] text-musa-muted">
                            <summary class="cursor-pointer">Original review (Portuguese)</summary>
                            <p lang="pt-BR" class="mt-1">“Pousada agradável e acolhedora. Comida boa. Eu fotografo pássaros e o lugar é ótimo pra isso. Comedouro bem movimentado com aves da Mata Atlântica.”</p>
                        </details>`],
            [`Depoimentos publicados no Google Maps.`, `Reviews published on Google Maps.`],
            [`>Ver no Google<`, `>See on Google<`],

            // Localização
            [`Como chegar`, `How to get here`],
            [`Onde estamos`, `Where we are`],
            [`>Endereço<`, `>Address<`],
            [`WhatsApp da pousada`, `Inn's WhatsApp`],
            [`title="Mapa da Pousada Musa em Iguape/SP"`, `title="Map of Pousada Musa in Iguape, Brazil"`],
            [`Mapa do Google. Toque em “Traçar rota” para abrir no aplicativo.`, `Google map. Tap “Get directions” to open it in the app.`],

            // FAQ
            [`Onde fica a Pousada Musa?`, `Where is Pousada Musa located?`],
            [`Estamos na <strong>Rodovia Prefeito Casemiro Teixeira, Km 48, Engenhos, Iguape/SP</strong> (CEP 11920-000), no litoral sul de São Paulo. O Plus Code é <strong>8FVH+QW</strong>. Use o botão “Traçar rota” acima para abrir o caminho no Google Maps.`, `We are on <strong>Rodovia Prefeito Casemiro Teixeira, Km 48, Engenhos, Iguape/SP</strong> (ZIP 11920-000), on the southern coast of São Paulo. The Plus Code is <strong>8FVH+QW</strong>. Use the “Get directions” button above to open the route in Google Maps.`],
            [`Como funciona a observação de aves?`, `How does birdwatching work?`],
            [`A pousada fica cercada por Mata Atlântica e árvores frutíferas, com um comedouro movimentado. Saíra-sete-cores, colhereiro e tiê-sangue já foram fotografados na pousada e na região. As primeiras horas do dia costumam ser as melhores para observar. Leve câmera ou binóculo.`, `The inn is surrounded by Atlantic Forest and fruit trees, with a busy feeder. Seven-colored Tanagers, Roseate Spoonbills and Brazilian Tanagers have already been photographed at the inn and in the area. The early hours of the day are usually best for watching. Bring a camera or binoculars.`],
            [`Como faço para reservar?`, `How do I book?`],
            [`Clique em “Reservar” e preencha datas, número de hóspedes e seu nome. O site abre o WhatsApp com a mensagem pronta. Valores, disponibilidade e detalhes da acomodação são confirmados no atendimento. Não há pagamento pelo site.`, `Click “Book” and fill in the dates, number of guests and your name. The site opens WhatsApp with the message ready to send. Rates, availability and room details are confirmed in the chat. There is no payment on the site.`],
            [`A pousada é LGBTQ+ friendly?`, `Is the inn LGBTQ+ friendly?`],
            [`Sim. A Pousada Musa é uma empresa que acolhe a comunidade LGBTQ+, conforme informado na listagem do Google.`, `Yes. Pousada Musa is a business that welcomes the LGBTQ+ community, as stated in its Google listing.`],

            // Rodapé
            [`Atendimento direto com a pousada, sem taxas de intermediários.`, `Direct booking with the inn, with no middleman fees.`],
            [`>Reservas<`, `>Bookings<`],
            [`Empresa que acolhe a comunidade LGBTQ+.`, `A business that welcomes the LGBTQ+ community.`],
            [`© 2026 Pousada Musa · Iguape/SP · Fotos: Pousada MUSA / Google Maps`, `© 2026 Pousada Musa · Iguape, Brazil · Photos: Pousada MUSA / Google Maps`],

            // Modais
            [`aria-label="Fechar"`, `aria-label="Close"`],
            [`<span id="modalTag" class="text-[11px] uppercase tracking-widest bg-musa-terracotta text-white px-3 py-1 rounded-full">Pousada</span>`, `<span id="modalTag" class="text-[11px] uppercase tracking-widest bg-musa-terracotta text-white px-3 py-1 rounded-full">Inn</span>`],
            [`<h3 id="modalTitle" class="font-serif text-2xl sm:text-3xl text-white mt-2">Sobre a Pousada Musa</h3>`, `<h3 id="modalTitle" class="font-serif text-2xl sm:text-3xl text-white mt-2">About Pousada Musa</h3>`],
            [`← Voltar ao site`, `← Back to site`],
            [`Atendimento direto pelo WhatsApp`, `Direct booking via WhatsApp`],
            [`Preferência de acomodação`, `Room preference`],
            [`data-pt="Opção para casal">Opção para casal</option>`, `data-pt="Opção para casal">Couple option</option>`],
            [`data-pt="Opção para família">Opção para família</option>`, `data-pt="Opção para família">Family option</option>`],
            [`data-pt="A combinar / quero sugestão">A combinar / quero sugestão</option>`, `data-pt="A combinar / quero sugestão">Not sure / suggest an option</option>`],
            [`>Hóspedes<`, `>Guests<`],
            [`>1 pessoa</option>`, `>1 person</option>`],
            [`>2 pessoas</option>`, `>2 people</option>`],
            [`>3 pessoas</option>`, `>3 people</option>`],
            [`>4 pessoas</option>`, `>4 people</option>`],
            [`>5 pessoas</option>`, `>5 people</option>`],
            [`>6 ou mais</option>`, `>6 or more</option>`],
            [`Seu nome`, `Your name`],
            [`placeholder="Ex: Helena Costa"`, `placeholder="E.g. Helena Costa"`],
            [`>Observações <span class="normal-case font-normal text-musa-muted">(opcional)</span>`, `>Notes <span class="normal-case font-normal text-musa-muted">(optional)</span>`],
            [`placeholder="Ex: quero observar aves, datas flexíveis, crianças..."`, `placeholder="E.g. birdwatching, flexible dates, children..."`],
            [`Interesse principal`, `Main interest`],
            [`> Observação de aves`, `> Birdwatching`],
            [`> Descanso`, `> Rest`],
            [`> Natureza`, `> Nature`],
            [`Ao enviar, o WhatsApp abre com a mensagem pronta. Valores e disponibilidade são confirmados no atendimento. Nenhum dado é armazenado neste site.`, `When you submit, WhatsApp opens with the message ready to send. Rates and availability are confirmed in the chat. No data is stored on this website.`],
            [`A solicitação é enviada em português para a equipe da pousada.`, `Your request is sent in Portuguese to the inn's team.`],
            [`>Cancelar<`, `>Cancel<`],
            [`aria-label="Falar com a Pousada Musa no WhatsApp"`, `aria-label="Chat with Pousada Musa on WhatsApp"`],

            // Templates dos modais
            [`data-tag="Nossa essência"`, `data-tag="Our essence"`],
            [`data-title="Sobre a Pousada Musa"`, `data-title="About Pousada Musa"`],
            [`A Pousada Musa fica em Engenhos, Iguape, no litoral sul de São Paulo, cercada pela Mata Atlântica. É um lugar de ritmo lento, jardins, árvores frutíferas e muito canto de pássaro.`, `Pousada Musa is in Engenhos, Iguape, on the southern coast of São Paulo, surrounded by the Atlantic Forest. It is a place with a slow rhythm, gardens, fruit trees and plenty of birdsong.`],
            [`As suítes são confortáveis, com camas elogiadas por quem já se hospedou e banheiros novos. A proposta é simples: descansar bem, comer bem e aproveitar a natureza ao redor.`, `The rooms are comfortable, with beds praised by past guests and new bathrooms. The idea is simple: rest well, eat well and enjoy the nature around you.`],
            [`✓ Suítes confortáveis`, `✓ Comfortable rooms`],
            [`✓ Jardins e árvores frutíferas`, `✓ Gardens and fruit trees`],
            [`✓ Observação de aves`, `✓ Birdwatching`],
            [`✓ Ambiente acolhedor e LGBTQ+ friendly`, `✓ Welcoming, LGBTQ+ friendly environment`],
            [`Valores e disponibilidade são confirmados pelo WhatsApp.`, `Rates and availability are confirmed via WhatsApp.`],
            [`data-tag="Bem-estar &amp; natureza"`, `data-tag="Wellness &amp; nature"`],
            [`Uma área de água natural cercada por pedras, jardins e vegetação, com peixes e som de água corrente. Um dos cantos mais tranquilos da pousada.`, `A natural water area surrounded by rocks, gardens and vegetation, with fish and the sound of flowing water. One of the quietest corners of the inn.`],
            [`<strong>Ambiente:</strong> ao ar livre, junto ao jardim`, `<strong>Setting:</strong> outdoors, next to the garden`],
            [`<strong>Destaque:</strong> água natural e contato com a mata`, `<strong>Highlight:</strong> natural water and a connection with the forest`],
            [`Combine o banho com uma volta pelos jardins e uma sessão de observação de aves.`, `Combine a swim with a walk through the gardens and a birdwatching session.`],
            [`data-tag="Natureza ao redor"`, `data-tag="Nature all around"`],
            [`Os jardins e as árvores frutíferas atraem aves ao longo do dia. Saíras e outras espécies da Mata Atlântica circulam por aqui; colhereiros já foram registrados na região.`, `The gardens and fruit trees attract birds throughout the day. Tanagers and other Atlantic Forest species move through here; Roseate Spoonbills have already been recorded in the area.`],
            [`Reserve um tempo para caminhar sem pressa, sentar à sombra e observar.`, `Take time to walk without rushing, sit in the shade and observe.`],
            [`data-tag="Guia de observação"`, `data-tag="Birdwatching guide"`],
            [`data-title="Aves da Mata Atlântica"`, `data-title="Atlantic Forest Birds"`],
            [`Cercada por Mata Atlântica e árvores frutíferas, a Musa tem um comedouro movimentado e jardins que atraem aves durante o dia. Estas são algumas espécies já fotografadas na pousada e na região:`, `Surrounded by the Atlantic Forest and fruit trees, Musa has a busy feeder and gardens that attract birds during the day. These are some of the species already photographed at the inn and in the area:`],
            [`alt="Saíra-sete-cores"`, `alt="Seven-colored Tanager"`],
            [`Comedouro &amp; jardim`, `Feeder &amp; garden`],
            [`>Saíra-sete-cores<`, `>Seven-colored Tanager<`],
            [`Ave colorida da Mata Atlântica, vista nos jardins e no comedouro.`, `A colorful Atlantic Forest bird, seen in the gardens and at the feeder.`],
            [`alt="Colhereiro"`, `alt="Roseate Spoonbill"`],
            [`Área alagada &amp; entorno`, `Wetlands &amp; surroundings`],
            [`>Colhereiro<`, `>Roseate Spoonbill<`],
            [`Ave rosada de bico achatado, registrada na região da pousada.`, `A pink bird with a flat bill, recorded in the area around the inn.`],
            [`alt="Tiê-sangue"`, `alt="Brazilian Tanager"`],
            [`>Tiê-sangue<`, `>Brazilian Tanager<`],
            [`Pássaro vermelho vibrante da Mata Atlântica, fotografado na pousada.`, `A vibrant red Atlantic Forest bird, photographed at the inn.`],
            [`Dica: as primeiras horas do dia costumam ser as melhores para observar e fotografar. Leve câmera ou binóculo.`, `Tip: the early hours of the day are usually best for watching and photographing. Bring a camera or binoculars.`],
            [`data-tag="Descanso"`, `data-tag="Rest"`],
            [`data-title="Varanda &amp; Jardins"`, `data-title="Veranda &amp; Gardens"`],
            [`A varanda da casa é um convite a desacelerar: sombra, vista para o jardim e o som dos pássaros ao fundo.`, `The veranda is an invitation to slow down: shade, garden views and birdsong in the background.`],
            [`Um bom lugar para ler, conversar ou simplesmente não fazer nada.`, `A good place to read, talk or simply do nothing.`]
        ]
    },
    es: {
        lang: 'es',
        title: 'Pousada Musa | Alojamiento y observación de aves en Iguape, Brasil',
        description: 'Una posada en Iguape, São Paulo, rodeada por la Mata Atlántica. Habitaciones cómodas, jardines, piscina natural y observación de aves. Habla con nosotros por WhatsApp.',
        ogTitle: 'Pousada Musa | Iguape, Brasil',
        ogDescription: 'Un refugio en la Mata Atlántica con habitaciones cómodas, jardines, piscina natural y observación de aves.',
        ogImageAlt: 'Entrada de la Pousada Musa, en Iguape, Brasil',
        ogLocale: 'es_ES',
        ogAlternates: ['pt_BR', 'en_US', 'fr_FR'],
        url: `${SITE}/es/`,
        switcherLabel: 'Idioma',
        booking: {
            invalidDates: 'Revisa las fechas: la salida debe ser posterior a la llegada.',
            missingName: 'Por favor, indica tu nombre.'
        },
        replacements: [
            // Navegación y hero
            [`>Pular para o conteúdo</a>`, `>Saltar al contenido</a>`],
            [`aria-label="Pousada Musa — início"`, `aria-label="Pousada Musa — inicio"`],
            [`aria-label="Navegação principal"`, `aria-label="Navegación principal"`],
            [`>A Pousada<`, `>La Posada<`],
            [`>Acomodações<`, `>Alojamientos<`],
            [`>Observação de Aves<`, `>Observación de aves<`],
            [`>Experiências<`, `>Experiencias<`],
            [`>Localização<`, `>Ubicación<`],
            [`>Contato<`, `>Contacto<`],
            [`"Abrir menu"`, `"Abrir menú"`],
            [`"Fechar menu"`, `"Cerrar menú"`],
            [/(>\s*)Reservar Estadia(\s*<\/button>)/g, `$1Reservar estancia$2`],
            [`>Reservar Estadia<`, `>Reservar estancia<`],
            [/(>\s*)Conhecer a Pousada(\s*<\/button>)/g, `$1Conocer la posada$2`],
            [/(>\s*)Falar no WhatsApp(\s*<\/a>)/g, `$1Hablar por WhatsApp$2`],
            [`Refúgio na Mata Atlântica &amp; Observação de Aves`, `Refugio en la Mata Atlántica y observación de aves`],
            [`5,0 no Google · 2 avaliações`, `5,0 en Google · 2 opiniones`],
            [`5,0 no Google`, `5,0 en Google`],
            [`alt="Entrada da Pousada Musa, com portal de madeira, caminho e vegetação da Mata Atlântica"`, `alt="Entrada de la Pousada Musa, con portal de madera, camino y vegetación de la Mata Atlántica"`],

            // Observación de aves
            [`alt="Saíra-sete-cores pousada em um galho, com bromélia ao fundo"`, `alt="Tangara sietecolores posada en una rama, con una bromelia al fondo"`],
            [`Aves da Mata Atlântica • Clique para conhecer`, `Aves de la Mata Atlántica • Haz clic para conocer`],
            [`Observação<br>de Aves`, `Observación<br>de aves`],
            [`Cercada por árvores frutíferas e pela Mata Atlântica, a Musa tem um comedouro movimentado e jardins que atraem aves ao longo do dia. Saíras, colhereiros e tiês-sangue já foram fotografados na região.`, `Rodeada de árboles frutales y de la Mata Atlántica, la Musa tiene un comedero muy concurrido y jardines que atraen aves a lo largo del día. Tangaras sietecolores, espátulas rosadas y tangaras brasileñas ya han sido fotografiadas en la zona.`],
            [`>Conhecer as aves<`, `>Conocer las aves<`],
            [`title="Dicas de observação" aria-label="Dicas de observação"`, `title="Consejos de observación" aria-label="Consejos de observación"`],

            // Habitaciones
            [`Aconchego na Mata`, `Conforto en la Mata`],
            [`Nossas Suítes`, `Nuestras habitaciones`],
            [`Suítes confortáveis, com camas elogiadas por quem já se hospedou e banheiros novos. Um lugar para desacelerar, ouvir os pássaros e dormir bem.`, `Habitaciones cómodas, con camas elogiadas por quienes ya se han alojado y baños nuevos. Un lugar para bajar el ritmo, escuchar a los pájaros y dormir bien.`],
            [`Os valores, a disponibilidade e os detalhes de cada acomodação são confirmados diretamente pelo WhatsApp.`, `Las tarifas, la disponibilidad y los detalles de cada alojamiento se confirman directamente por WhatsApp.`],
            [`>Consultar disponibilidade<`, `>Consultar disponibilidad<`],
            [`alt="Área externa da Pousada Musa, com varanda, jardim e vegetação"`, `alt="Área exterior de la Pousada Musa, con porche, jardín y vegetación"`],
            [`Fale com a gente →`, `Habla con nosotros →`],

            // Experiencias
            [`Vivências na Musa`, `Experiencias en la Musa`],
            [`Clique em cada experiência para ver detalhes e fotos.`, `Haz clic en cada experiencia para ver detalles y fotos.`],
            [`Piscina Natural`, `Piscina natural`],
            [`Água natural e jardins • Ver mais`, `Agua natural y jardines • Ver más`],
            [`alt="Piscina natural da Pousada Musa, com pedras, plantas e água corrente"`, `alt="Piscina natural de la Pousada Musa, con piedras, plantas y agua corriente"`],
            [`Jardins &amp; Árvores Frutíferas`, `Jardines y árboles frutales`],
            [`Mata Atlântica ao redor • Ver mais`, `Mata Atlántica alrededor • Ver más`],
            [`alt="Jardins da Pousada Musa, com lago, plantas tropicais e árvores"`, `alt="Jardines de la Pousada Musa, con lago, plantas tropicales y árboles"`],
            [`Comedouro e espécies da mata • Ver mais`, `Comedero y especies de la mata • Ver más`],
            [`alt="Saíra-sete-cores em galho na Pousada Musa"`, `alt="Tangara sietecolores en una rama en la Pousada Musa"`],
            [`Varanda &amp; Descanso`, `Porche y descanso`],
            [`O ritmo da floresta • Ver mais`, `El ritmo de la selva • Ver más`],
            [`alt="Varanda da Pousada Musa com vista para o jardim"`, `alt="Porche de la Pousada Musa con vista al jardín"`],

            // Galería
            [`Fotos reais`, `Fotos reales`],
            [`A Musa em imagens`, `La Musa en imágenes`],
            [`Clique em uma foto para ampliar.`, `Haz clic en una foto para ampliarla.`],
            [`data-tag="Galeria"`, `data-tag="Galería"`],
            [`data-title="Entrada da Musa" data-text="O portal de madeira e o caminho de entrada, cercados pela vegetação."`, `data-title="Entrada de la Musa" data-text="El portal de madera y el camino de entrada, rodeados de vegetación."`],
            [`alt="Entrada da Pousada Musa"`, `alt="Entrada de la Pousada Musa"`],
            [`data-title="Varanda e jardim" data-text="A área externa da pousada, com varanda e vista para o jardim."`, `data-title="Porche y jardín" data-text="La zona exterior de la posada, con porche y vista al jardín."`],
            [`alt="Varanda e jardim da Pousada Musa"`, `alt="Porche y jardín de la Pousada Musa"`],
            [`>Varanda</span>`, `>Porche</span>`],
            [`data-title="Piscina natural" data-text="Água natural, pedras e vegetação ao redor."`, `data-title="Piscina natural" data-text="Agua natural, piedras y vegetación alrededor."`],
            [`alt="Piscina natural da Pousada Musa"`, `alt="Piscina natural de la Pousada Musa"`],
            [`data-title="Jardins e lago" data-text="Jardins, árvores frutíferas e o lago da pousada."`, `data-title="Jardines y lago" data-text="Jardines, árboles frutales y el lago de la posada."`],
            [`alt="Jardins e lago da Pousada Musa"`, `alt="Jardines y lago de la Pousada Musa"`],
            [`>Jardins</span>`, `>Jardines</span>`],
            [`data-title="Saíra-sete-cores" data-text="Uma das espécies já fotografadas nos jardins da Musa."`, `data-title="Tangara sietecolores" data-text="Una de las especies ya fotografiadas en los jardines de la Musa."`],
            [`alt="Saíra-sete-cores na Pousada Musa"`, `alt="Tangara sietecolores en la Pousada Musa"`],
            [`>Saíra-sete-cores</span>`, `>Tangara sietecolores</span>`],
            [`data-title="Colhereiro" data-text="Ave registrada na região, em meio à Mata Atlântica."`, `data-title="Espátula rosada" data-text="Ave registrada en la región, en medio de la Mata Atlántica."`],
            [`alt="Colhereiro em galho na região da Pousada Musa"`, `alt="Espátula rosada en una rama en la región de la Pousada Musa"`],
            [`>Colhereiro</span>`, `>Espátula rosada</span>`],

            // Opiniones
            [`Quem já se hospedou`, `Quienes ya se alojaron`],
            [`O que dizem os hóspedes`, `Lo que dicen los huéspedes`],
            [`aria-label="5 de 5 estrelas"`, `aria-label="5 de 5 estrellas"`],
            [`“As suítes são ótimas, camas confortáveis, banheiro novo. Muitas árvores de frutas que atraem diversos pássaros lindos de ficar observando.”`, `“Las habitaciones son excelentes, las camas cómodas y el baño nuevo. Muchos árboles frutales que atraen a diversos pájaros hermosos para observar.”
                        <span class="block mt-2 text-[11px] text-musa-muted">Traducido del portugués.</span>
                        <details class="mt-2 text-[11px] text-musa-muted">
                            <summary class="cursor-pointer">Reseña original (portugués)</summary>
                            <p lang="pt-BR" class="mt-1">“As suítes são ótimas, camas confortáveis, banheiro novo. Muitas árvores de frutas que atraem diversos pássaros lindos de ficar observando.”</p>
                        </details>`],
            [`“Pousada agradável e acolhedora. Comida boa. Eu fotografo pássaros e o lugar é ótimo pra isso. Comedouro bem movimentado com aves da Mata Atlântica.”`, `“Una posada agradable y acogedora. Buena comida. Yo fotografío aves y el lugar es excelente para eso. Un comedero muy concurrido con aves de la Mata Atlántica.”
                        <span class="block mt-2 text-[11px] text-musa-muted">Traducido del portugués.</span>
                        <details class="mt-2 text-[11px] text-musa-muted">
                            <summary class="cursor-pointer">Reseña original (portugués)</summary>
                            <p lang="pt-BR" class="mt-1">“Pousada agradável e acolhedora. Comida boa. Eu fotografo pássaros e o lugar é ótimo pra isso. Comedouro bem movimentado com aves da Mata Atlântica.”</p>
                        </details>`],
            [`Depoimentos publicados no Google Maps.`, `Opiniones publicadas en Google Maps.`],
            [`>Ver no Google<`, `>Ver en Google<`],

            // Ubicación
            [`Como chegar`, `Cómo llegar`],
            [`Onde estamos`, `Dónde estamos`],
            [`>Endereço<`, `>Dirección<`],
            [`WhatsApp da pousada`, `WhatsApp de la posada`],
            [/(>\s*)Traçar rota(\s*<\/a>)/g, `$1Cómo llegar$2`],
            [/(>\s*)Consultar datas(\s*<\/button>)/g, `$1Consultar fechas$2`],
            [`title="Mapa da Pousada Musa em Iguape/SP"`, `title="Mapa de la Pousada Musa en Iguape, Brasil"`],
            [`Mapa do Google. Toque em “Traçar rota” para abrir no aplicativo.`, `Mapa de Google. Toca en “Cómo llegar” para abrirlo en la aplicación.`],

            // Preguntas frecuentes
            [`Onde fica a Pousada Musa?`, `¿Dónde está la Pousada Musa?`],
            [`Estamos na <strong>Rodovia Prefeito Casemiro Teixeira, Km 48, Engenhos, Iguape/SP</strong> (CEP 11920-000), no litoral sul de São Paulo. O Plus Code é <strong>8FVH+QW</strong>. Use o botão “Traçar rota” acima para abrir o caminho no Google Maps.`, `Estamos en la <strong>Rodovia Prefeito Casemiro Teixeira, Km 48, Engenhos, Iguape/SP</strong> (CEP 11920-000), en el litoral sur de São Paulo. El Plus Code es <strong>8FVH+QW</strong>. Usa el botón “Cómo llegar” de arriba para abrir la ruta en Google Maps.`],
            [`Como funciona a observação de aves?`, `¿Cómo funciona la observación de aves?`],
            [`A pousada fica cercada por Mata Atlântica e árvores frutíferas, com um comedouro movimentado. Saíra-sete-cores, colhereiro e tiê-sangue já foram fotografados na pousada e na região. As primeiras horas do dia costumam ser as melhores para observar. Leve câmera ou binóculo.`, `La posada está rodeada de Mata Atlántica y árboles frutales, con un comedero muy concurrido. Tangaras sietecolores, espátulas rosadas y tangaras brasileñas ya han sido fotografiadas en la posada y en la zona. Las primeras horas del día suelen ser las mejores para observar. Lleva cámara o binoculares.`],
            [`Como faço para reservar?`, `¿Cómo puedo reservar?`],
            [`Clique em “Reservar” e preencha datas, número de hóspedes e seu nome. O site abre o WhatsApp com a mensagem pronta. Valores, disponibilidade e detalhes da acomodação são confirmados no atendimento. Não há pagamento pelo site.`, `Haz clic en “Reservar” y completa las fechas, el número de huéspedes y tu nombre. El sitio abre WhatsApp con el mensaje listo. Las tarifas, la disponibilidad y los detalles del alojamiento se confirman en la atención. No hay pago por el sitio.`],
            [`A pousada é LGBTQ+ friendly?`, `¿La posada es LGBTQ+ friendly?`],
            [`Sim. A Pousada Musa é uma empresa que acolhe a comunidade LGBTQ+, conforme informado na listagem do Google.`, `Sí. La Pousada Musa es una empresa que acoge a la comunidad LGBTQ+, según se indica en su ficha de Google.`],

            // Pie de página
            [`Atendimento direto com a pousada, sem taxas de intermediários.`, `Atención directa con la posada, sin comisiones de intermediarios.`],
            [/(>\s*)Reservar pelo WhatsApp(\s*<\/(?:a|button)>)/g, `$1Reservar por WhatsApp$2`],
            [`Empresa que acolhe a comunidade LGBTQ+.`, `Una empresa que acoge a la comunidad LGBTQ+.`],
            [`© 2026 Pousada Musa · Iguape/SP · Fotos: Pousada MUSA / Google Maps`, `© 2026 Pousada Musa · Iguape, Brasil · Fotos: Pousada MUSA / Google Maps`],

            // Modales
            [`aria-label="Fechar"`, `aria-label="Cerrar"`],
            [`<span id="modalTag" class="text-[11px] uppercase tracking-widest bg-musa-terracotta text-white px-3 py-1 rounded-full">Pousada</span>`, `<span id="modalTag" class="text-[11px] uppercase tracking-widest bg-musa-terracotta text-white px-3 py-1 rounded-full">Posada</span>`],
            [`<h3 id="modalTitle" class="font-serif text-2xl sm:text-3xl text-white mt-2">Sobre a Pousada Musa</h3>`, `<h3 id="modalTitle" class="font-serif text-2xl sm:text-3xl text-white mt-2">Sobre la Pousada Musa</h3>`],
            [`← Voltar ao site`, `← Volver al sitio`],
            [`Atendimento direto pelo WhatsApp`, `Atención directa por WhatsApp`],
            [`Preferência de acomodação`, `Preferencia de alojamiento`],
            [`data-pt="Opção para casal">Opção para casal</option>`, `data-pt="Opção para casal">Opción para pareja</option>`],
            [`data-pt="Opção para família">Opção para família</option>`, `data-pt="Opção para família">Opción para familia</option>`],
            [`data-pt="A combinar / quero sugestão">A combinar / quero sugestão</option>`, `data-pt="A combinar / quero sugestão">A convenir / quiero una sugerencia</option>`],
            [`>Hóspedes<`, `>Huéspedes<`],
            [`>1 pessoa</option>`, `>1 persona</option>`],
            [`>2 pessoas</option>`, `>2 personas</option>`],
            [`>3 pessoas</option>`, `>3 personas</option>`],
            [`>4 pessoas</option>`, `>4 personas</option>`],
            [`>5 pessoas</option>`, `>5 personas</option>`],
            [`>6 ou mais</option>`, `>6 o más</option>`],
            [`Seu nome`, `Tu nombre`],
            [`placeholder="Ex: Helena Costa"`, `placeholder="Ej.: Helena Costa"`],
            [`>Observações <span class="normal-case font-normal text-musa-muted">(opcional)</span>`, `>Observaciones <span class="normal-case font-normal text-musa-muted">(opcional)</span>`],
            [`placeholder="Ex: quero observar aves, datas flexíveis, crianças..."`, `placeholder="Ej.: quiero observar aves, fechas flexibles, niños..."`],
            [`Interesse principal`, `Interés principal`],
            [`> Observação de aves`, `> Observación de aves`],
            [`> Natureza`, `> Naturaleza`],
            [`Ao enviar, o WhatsApp abre com a mensagem pronta. Valores e disponibilidade são confirmados no atendimento. Nenhum dado é armazenado neste site.`, `Al enviar, WhatsApp se abre con el mensaje listo. Las tarifas y la disponibilidad se confirman en la atención. No se almacena ningún dato en este sitio.`],
            [`A solicitação é enviada em português para a equipe da pousada.`, `La solicitud se envía en portugués al equipo de la posada.`],
            [/(>\s*)Enviar pelo WhatsApp(\s*<\/button>)/g, `$1Enviar por WhatsApp$2`],
            [`aria-label="Falar com a Pousada Musa no WhatsApp"`, `aria-label="Hablar con la Pousada Musa por WhatsApp"`],

            // Plantillas de los modales
            [`data-tag="Nossa essência"`, `data-tag="Nuestra esencia"`],
            [`data-title="Sobre a Pousada Musa"`, `data-title="Sobre la Pousada Musa"`],
            [`A Pousada Musa fica em Engenhos, Iguape, no litoral sul de São Paulo, cercada pela Mata Atlântica. É um lugar de ritmo lento, jardins, árvores frutíferas e muito canto de pássaro.`, `La Pousada Musa está en Engenhos, Iguape, en el litoral sur de São Paulo, rodeada por la Mata Atlántica. Es un lugar de ritmo lento, jardines, árboles frutales y mucho canto de pájaros.`],
            [`As suítes são confortáveis, com camas elogiadas por quem já se hospedou e banheiros novos. A proposta é simples: descansar bem, comer bem e aproveitar a natureza ao redor.`, `Las habitaciones son cómodas, con camas elogiadas por quienes ya se han alojado y baños nuevos. La propuesta es simple: descansar bien, comer bien y disfrutar de la naturaleza alrededor.`],
            [`✓ Suítes confortáveis`, `✓ Habitaciones cómodas`],
            [`✓ Jardins e árvores frutíferas`, `✓ Jardines y árboles frutales`],
            [`✓ Observação de aves`, `✓ Observación de aves`],
            [`✓ Ambiente acolhedor e LGBTQ+ friendly`, `✓ Ambiente acogedor y LGBTQ+ friendly`],
            [`Valores e disponibilidade são confirmados pelo WhatsApp.`, `Las tarifas y la disponibilidad se confirman por WhatsApp.`],
            [`data-tag="Bem-estar &amp; natureza"`, `data-tag="Bienestar y naturaleza"`],
            [`Uma área de água natural cercada por pedras, jardins e vegetação, com peixes e som de água corrente. Um dos cantos mais tranquilos da pousada.`, `Una zona de agua natural rodeada de piedras, jardines y vegetación, con peces y sonido de agua corriente. Uno de los rincones más tranquilos de la posada.`],
            [`<strong>Ambiente:</strong> ao ar livre, junto ao jardim`, `<strong>Ambiente:</strong> al aire libre, junto al jardín`],
            [`<strong>Destaque:</strong> água natural e contato com a mata`, `<strong>Destaque:</strong> agua natural y contacto con la mata`],
            [`Combine o banho com uma volta pelos jardins e uma sessão de observação de aves.`, `Combina el baño con un paseo por los jardines y una sesión de observación de aves.`],
            [`data-tag="Natureza ao redor"`, `data-tag="Naturaleza alrededor"`],
            [`Os jardins e as árvores frutíferas atraem aves ao longo do dia. Saíras e outras espécies da Mata Atlântica circulam por aqui; colhereiros já foram registrados na região.`, `Los jardines y los árboles frutales atraen aves a lo largo del día. Tangaras y otras especies de la Mata Atlántica circulan por aquí; ya se han registrado espátulas rosadas en la zona.`],
            [`Reserve um tempo para caminhar sem pressa, sentar à sombra e observar.`, `Reserva un tiempo para caminar sin prisa, sentarte a la sombra y observar.`],
            [`data-tag="Guia de observação"`, `data-tag="Guía de observación"`],
            [`data-title="Aves da Mata Atlântica"`, `data-title="Aves de la Mata Atlántica"`],
            [`Cercada por Mata Atlântica e árvores frutíferas, a Musa tem um comedouro movimentado e jardins que atraem aves durante o dia. Estas são algumas espécies já fotografadas na pousada e na região:`, `Rodeada por la Mata Atlántica y árboles frutales, la Musa tiene un comedero muy concurrido y jardines que atraen aves durante el día. Estas son algunas de las especies ya fotografiadas en la posada y en la zona:`],
            [`alt="Saíra-sete-cores"`, `alt="Tangara sietecolores"`],
            [`Comedouro &amp; jardim`, `Comedero y jardín`],
            [`>Saíra-sete-cores<`, `>Tangara sietecolores<`],
            [`Ave colorida da Mata Atlântica, vista nos jardins e no comedouro.`, `Ave colorida de la Mata Atlántica, vista en los jardines y en el comedero.`],
            [`alt="Colhereiro"`, `alt="Espátula rosada"`],
            [`Área alagada &amp; entorno`, `Zona inundada y alrededores`],
            [`>Colhereiro<`, `>Espátula rosada<`],
            [`Ave rosada de bico achatado, registrada na região da pousada.`, `Ave rosada de pico aplanado, registrada en la zona de la posada.`],
            [`alt="Tiê-sangue"`, `alt="Tangara brasileña"`],
            [`>Tiê-sangue<`, `>Tangara brasileña<`],
            [`Pássaro vermelho vibrante da Mata Atlântica, fotografado na pousada.`, `Pájaro rojo vibrante de la Mata Atlántica, fotografiado en la posada.`],
            [`Dica: as primeiras horas do dia costumam ser as melhores para observar e fotografar. Leve câmera ou binóculo.`, `Consejo: las primeras horas del día suelen ser las mejores para observar y fotografiar. Lleva cámara o binoculares.`],
            [`data-title="Varanda &amp; Jardins"`, `data-title="Porche y jardines"`],
            [`A varanda da casa é um convite a desacelerar: sombra, vista para o jardim e o som dos pássaros ao fundo.`, `El porche de la casa es una invitación a bajar el ritmo: sombra, vista al jardín y el sonido de los pájaros de fondo.`],
            [`Um bom lugar para ler, conversar ou simplesmente não fazer nada.`, `Un buen lugar para leer, conversar o simplemente no hacer nada.`]
        ]
    },
    fr: {
        lang: 'fr',
        title: 'Pousada Musa | Hébergement et observation des oiseaux à Iguape, Brésil',
        description: 'Une pousada à Iguape, São Paulo, entourée par la forêt atlantique. Chambres confortables, jardins, piscine naturelle et observation des oiseaux. Écrivez-nous sur WhatsApp.',
        ogTitle: 'Pousada Musa | Iguape, Brésil',
        ogDescription: 'Un refuge dans la forêt atlantique avec des chambres confortables, des jardins, une piscine naturelle et l\'observation des oiseaux.',
        ogImageAlt: 'Entrée de la Pousada Musa, à Iguape, au Brésil',
        ogLocale: 'fr_FR',
        ogAlternates: ['pt_BR', 'en_US', 'es_ES'],
        url: `${SITE}/fr/`,
        switcherLabel: 'Langue',
        booking: {
            invalidDates: 'Vérifiez les dates : le départ doit être après l\'arrivée.',
            missingName: 'Veuillez indiquer votre nom.'
        },
        replacements: [
            // Navigation et hero
            [`>Pular para o conteúdo</a>`, `>Aller au contenu</a>`],
            [`aria-label="Pousada Musa — início"`, `aria-label="Pousada Musa — accueil"`],
            [`aria-label="Navegação principal"`, `aria-label="Navigation principale"`],
            [`>A Pousada<`, `>La Pousada<`],
            [`>Acomodações<`, `>Chambres<`],
            [`>Observação de Aves<`, `>Observation des oiseaux<`],
            [`>Experiências<`, `>Expériences<`],
            [`>Localização<`, `>Localisation<`],
            [`>Contato<`, `>Contact<`],
            [`"Abrir menu"`, `"Ouvrir le menu"`],
            [`"Fechar menu"`, `"Fermer le menu"`],
            [/(>\s*)Reservar(\s*<\/button>)/g, `$1Réserver$2`],
            [/(>\s*)Reservar Estadia(\s*<\/button>)/g, `$1Réserver votre séjour$2`],
            [`>Reservar Estadia<`, `>Réserver votre séjour<`],
            [/(>\s*)Conhecer a Pousada(\s*<\/button>)/g, `$1Découvrir la pousada$2`],
            [/(>\s*)Falar no WhatsApp(\s*<\/a>)/g, `$1Discuter sur WhatsApp$2`],
            [`Refúgio na Mata Atlântica &amp; Observação de Aves`, `Refuge dans la forêt atlantique et observation des oiseaux`],
            [`5,0 no Google · 2 avaliações`, `5,0 sur Google · 2 avis`],
            [`5,0 no Google`, `5,0 sur Google`],
            [`alt="Entrada da Pousada Musa, com portal de madeira, caminho e vegetação da Mata Atlântica"`, `alt="Entrée de la Pousada Musa, avec un portail en bois, un chemin et la végétation de la forêt atlantique"`],

            // Observation des oiseaux
            [`alt="Saíra-sete-cores pousada em um galho, com bromélia ao fundo"`, `alt="Tangara fastueux perché sur une branche, avec une broméliace en arrière-plan"`],
            [`Aves da Mata Atlântica • Clique para conhecer`, `Oiseaux de la forêt atlantique • Cliquez pour en savoir plus`],
            [`Observação<br>de Aves`, `Observation<br>des oiseaux`],
            [`Cercada por árvores frutíferas e pela Mata Atlântica, a Musa tem um comedouro movimentado e jardins que atraem aves ao longo do dia. Saíras, colhereiros e tiês-sangue já foram fotografados na região.`, `Entourée d'arbres fruitiers et de la forêt atlantique, la Musa dispose d'une mangeoire très fréquentée et de jardins qui attirent les oiseaux tout au long de la journée. Des tangaras fastueux, des spatules rosées et des tangaras du Brésil y ont déjà été photographiés.`],
            [`>Conhecer as aves<`, `>Découvrir les oiseaux<`],
            [`title="Dicas de observação" aria-label="Dicas de observação"`, `title="Conseils d'observation" aria-label="Conseils d'observation"`],

            // Chambres
            [`Aconchego na Mata`, `Confort dans la forêt`],
            [`Nossas Suítes`, `Nos chambres`],
            [`Suítes confortáveis, com camas elogiadas por quem já se hospedou e banheiros novos. Um lugar para desacelerar, ouvir os pássaros e dormir bem.`, `Des chambres confortables, avec des lits salués par les anciens voyageurs et des salles de bain neuves. Un endroit pour ralentir, écouter les oiseaux et bien dormir.`],
            [`Os valores, a disponibilidade e os detalhes de cada acomodação são confirmados diretamente pelo WhatsApp.`, `Les tarifs, la disponibilité et les détails de chaque chambre sont confirmés directement sur WhatsApp.`],
            [`>Consultar disponibilidade<`, `>Vérifier les disponibilités<`],
            [`alt="Área externa da Pousada Musa, com varanda, jardim e vegetação"`, `alt="Espace extérieur de la Pousada Musa, avec véranda, jardin et végétation"`],
            [`Fale com a gente →`, `Parlez-nous →`],

            // Expériences
            [`Vivências na Musa`, `Expériences à la Musa`],
            [`Clique em cada experiência para ver detalhes e fotos.`, `Cliquez sur chaque expérience pour voir les détails et les photos.`],
            [`Piscina Natural`, `Piscine naturelle`],
            [`Água natural e jardins • Ver mais`, `Eau naturelle et jardins • En savoir plus`],
            [`alt="Piscina natural da Pousada Musa, com pedras, plantas e água corrente"`, `alt="Piscine naturelle de la Pousada Musa, avec des rochers, des plantes et de l'eau courante"`],
            [`Jardins &amp; Árvores Frutíferas`, `Jardins et arbres fruitiers`],
            [`Mata Atlântica ao redor • Ver mais`, `Forêt atlantique tout autour • En savoir plus`],
            [`alt="Jardins da Pousada Musa, com lago, plantas tropicais e árvores"`, `alt="Jardins de la Pousada Musa, avec un lac, des plantes tropicales et des arbres"`],
            [`Comedouro e espécies da mata • Ver mais`, `Mangeoire et espèces de la forêt • En savoir plus`],
            [`alt="Saíra-sete-cores em galho na Pousada Musa"`, `alt="Tangara fastueux sur une branche à la Pousada Musa"`],
            [`Varanda &amp; Descanso`, `Véranda et repos`],
            [`O ritmo da floresta • Ver mais`, `Le rythme de la forêt • En savoir plus`],
            [`alt="Varanda da Pousada Musa com vista para o jardim"`, `alt="Véranda de la Pousada Musa avec vue sur le jardin"`],

            // Galerie
            [`Fotos reais`, `Photos réelles`],
            [`A Musa em imagens`, `La Musa en images`],
            [`Clique em uma foto para ampliar.`, `Cliquez sur une photo pour l'agrandir.`],
            [`data-tag="Galeria"`, `data-tag="Galerie"`],
            [`data-title="Entrada da Musa" data-text="O portal de madeira e o caminho de entrada, cercados pela vegetação."`, `data-title="Entrée de la Musa" data-text="Le portail en bois et le chemin d'entrée, entourés de végétation."`],
            [`alt="Entrada da Pousada Musa"`, `alt="Entrée de la Pousada Musa"`],
            [`>Entrada</span>`, `>Entrée</span>`],
            [`data-title="Varanda e jardim" data-text="A área externa da pousada, com varanda e vista para o jardim."`, `data-title="Véranda et jardin" data-text="L'espace extérieur de la pousada, avec véranda et vue sur le jardin."`],
            [`alt="Varanda e jardim da Pousada Musa"`, `alt="Véranda et jardin de la Pousada Musa"`],
            [`>Varanda</span>`, `>Véranda</span>`],
            [`data-title="Piscina natural" data-text="Água natural, pedras e vegetação ao redor."`, `data-title="Piscine naturelle" data-text="Eau naturelle, rochers et végétation tout autour."`],
            [`alt="Piscina natural da Pousada Musa"`, `alt="Piscine naturelle de la Pousada Musa"`],
            [`>Piscina natural</span>`, `>Piscine naturelle</span>`],
            [`data-title="Jardins e lago" data-text="Jardins, árvores frutíferas e o lago da pousada."`, `data-title="Jardins et lac" data-text="Jardins, arbres fruitiers et le lac de la pousada."`],
            [`alt="Jardins e lago da Pousada Musa"`, `alt="Jardins et lac de la Pousada Musa"`],
            [`data-title="Saíra-sete-cores" data-text="Uma das espécies já fotografadas nos jardins da Musa."`, `data-title="Tangara fastueux" data-text="L'une des espèces déjà photographiées dans les jardins de la Musa."`],
            [`alt="Saíra-sete-cores na Pousada Musa"`, `alt="Tangara fastueux à la Pousada Musa"`],
            [`>Saíra-sete-cores</span>`, `>Tangara fastueux</span>`],
            [`data-title="Colhereiro" data-text="Ave registrada na região, em meio à Mata Atlântica."`, `data-title="Spatule rosée" data-text="Un oiseau observé dans la région, au cœur de la forêt atlantique."`],
            [`alt="Colhereiro em galho na região da Pousada Musa"`, `alt="Spatule rosée sur une branche dans la région de la Pousada Musa"`],
            [`>Colhereiro</span>`, `>Spatule rosée</span>`],

            // Avis
            [`Quem já se hospedou`, `Anciens voyageurs`],
            [`O que dizem os hóspedes`, `Ce que disent les voyageurs`],
            [`aria-label="5 de 5 estrelas"`, `aria-label="5 étoiles sur 5"`],
            [`“As suítes são ótimas, camas confortáveis, banheiro novo. Muitas árvores de frutas que atraem diversos pássaros lindos de ficar observando.”`, `“Les chambres sont excellentes, les lits confortables, la salle de bain neuve. De nombreux arbres fruitiers attirent quantité d'oiseaux magnifiques à observer.”
                        <span class="block mt-2 text-[11px] text-musa-muted">Traduit du portugais.</span>
                        <details class="mt-2 text-[11px] text-musa-muted">
                            <summary class="cursor-pointer">Avis original (portugais)</summary>
                            <p lang="pt-BR" class="mt-1">“As suítes são ótimas, camas confortáveis, banheiro novo. Muitas árvores de frutas que atraem diversos pássaros lindos de ficar observando.”</p>
                        </details>`],
            [`“Pousada agradável e acolhedora. Comida boa. Eu fotografo pássaros e o lugar é ótimo pra isso. Comedouro bem movimentado com aves da Mata Atlântica.”`, `“Une pousada agréable et accueillante. Bonne cuisine. Je photographie les oiseaux et l'endroit est parfait pour cela. Une mangeoire très animée avec des oiseaux de la forêt atlantique.”
                        <span class="block mt-2 text-[11px] text-musa-muted">Traduit du portugais.</span>
                        <details class="mt-2 text-[11px] text-musa-muted">
                            <summary class="cursor-pointer">Avis original (portugais)</summary>
                            <p lang="pt-BR" class="mt-1">“Pousada agradável e acolhedora. Comida boa. Eu fotografo pássaros e o lugar é ótimo pra isso. Comedouro bem movimentado com aves da Mata Atlântica.”</p>
                        </details>`],
            [`Depoimentos publicados no Google Maps.`, `Avis publiés sur Google Maps.`],
            [`>Ver no Google<`, `>Voir sur Google<`],

            // Localisation
            [`Como chegar`, `Comment venir`],
            [`Onde estamos`, `Où nous sommes`],
            [`>Endereço<`, `>Adresse<`],
            [`WhatsApp da pousada`, `WhatsApp de la pousada`],
            [/(>\s*)Traçar rota(\s*<\/a>)/g, `$1Itinéraire$2`],
            [/(>\s*)Consultar datas(\s*<\/button>)/g, `$1Vérifier les dates$2`],
            [`title="Mapa da Pousada Musa em Iguape/SP"`, `title="Carte de la Pousada Musa à Iguape, au Brésil"`],
            [`Mapa do Google. Toque em “Traçar rota” para abrir no aplicativo.`, `Carte Google. Touchez « Itinéraire » pour l'ouvrir dans l'application.`],

            // Questions fréquentes
            [`Onde fica a Pousada Musa?`, `Où se trouve la Pousada Musa ?`],
            [`Estamos na <strong>Rodovia Prefeito Casemiro Teixeira, Km 48, Engenhos, Iguape/SP</strong> (CEP 11920-000), no litoral sul de São Paulo. O Plus Code é <strong>8FVH+QW</strong>. Use o botão “Traçar rota” acima para abrir o caminho no Google Maps.`, `Nous sommes sur la <strong>Rodovia Prefeito Casemiro Teixeira, Km 48, Engenhos, Iguape/SP</strong> (CEP 11920-000), sur la côte sud de São Paulo. Le Plus Code est <strong>8FVH+QW</strong>. Utilisez le bouton « Itinéraire » ci-dessus pour ouvrir l'itinéraire dans Google Maps.`],
            [`Como funciona a observação de aves?`, `Comment fonctionne l'observation des oiseaux ?`],
            [`A pousada fica cercada por Mata Atlântica e árvores frutíferas, com um comedouro movimentado. Saíra-sete-cores, colhereiro e tiê-sangue já foram fotografados na pousada e na região. As primeiras horas do dia costumam ser as melhores para observar. Leve câmera ou binóculo.`, `La pousada est entourée de forêt atlantique et d'arbres fruitiers, avec une mangeoire très fréquentée. Des tangaras fastueux, des spatules rosées et des tangaras du Brésil y ont déjà été photographiés, à la pousada et dans la région. Les premières heures de la journée sont généralement les meilleures pour observer. Apportez un appareil photo ou des jumelles.`],
            [`Como faço para reservar?`, `Comment réserver ?`],
            [`Clique em “Reservar” e preencha datas, número de hóspedes e seu nome. O site abre o WhatsApp com a mensagem pronta. Valores, disponibilidade e detalhes da acomodação são confirmados no atendimento. Não há pagamento pelo site.`, `Cliquez sur « Réserver » et indiquez les dates, le nombre de voyageurs et votre nom. Le site ouvre WhatsApp avec le message prêt. Les tarifs, la disponibilité et les détails de la chambre sont confirmés lors de l'échange. Il n'y a pas de paiement sur le site.`],
            [`A pousada é LGBTQ+ friendly?`, `La pousada est-elle LGBTQ+ friendly ?`],
            [`Sim. A Pousada Musa é uma empresa que acolhe a comunidade LGBTQ+, conforme informado na listagem do Google.`, `Oui. La Pousada Musa est une entreprise qui accueille la communauté LGBTQ+, comme indiqué sur sa fiche Google.`],

            // Pied de page
            [`Atendimento direto com a pousada, sem taxas de intermediários.`, `Réservation directe avec la pousada, sans frais d'intermédiaires.`],
            [/(>\s*)Reservar pelo WhatsApp(\s*<\/(?:a|button)>)/g, `$1Réserver via WhatsApp$2`],
            [`>Reservas<`, `>Réservations<`],
            [`Empresa que acolhe a comunidade LGBTQ+.`, `Une entreprise qui accueille la communauté LGBTQ+.`],
            [`© 2026 Pousada Musa · Iguape/SP · Fotos: Pousada MUSA / Google Maps`, `© 2026 Pousada Musa · Iguape, Brésil · Photos : Pousada MUSA / Google Maps`],

            // Modales
            [`aria-label="Fechar"`, `aria-label="Fermer"`],
            [`<h3 id="modalTitle" class="font-serif text-2xl sm:text-3xl text-white mt-2">Sobre a Pousada Musa</h3>`, `<h3 id="modalTitle" class="font-serif text-2xl sm:text-3xl text-white mt-2">À propos de la Pousada Musa</h3>`],
            [`← Voltar ao site`, `← Retour au site`],
            [`Atendimento direto pelo WhatsApp`, `Réservation directe via WhatsApp`],
            [`Preferência de acomodação`, `Préférence de chambre`],
            [`data-pt="Opção para casal">Opção para casal</option>`, `data-pt="Opção para casal">Option pour deux</option>`],
            [`data-pt="Opção para família">Opção para família</option>`, `data-pt="Opção para família">Option familiale</option>`],
            [`data-pt="A combinar / quero sugestão">A combinar / quero sugestão</option>`, `data-pt="A combinar / quero sugestão">À définir / je souhaite une suggestion</option>`],
            [`>Hóspedes<`, `>Voyageurs<`],
            [`>1 pessoa</option>`, `>1 personne</option>`],
            [`>2 pessoas</option>`, `>2 personnes</option>`],
            [`>3 pessoas</option>`, `>3 personnes</option>`],
            [`>4 pessoas</option>`, `>4 personnes</option>`],
            [`>5 pessoas</option>`, `>5 personnes</option>`],
            [`>6 ou mais</option>`, `>6 ou plus</option>`],
            [`Seu nome`, `Votre nom`],
            [`placeholder="Ex: Helena Costa"`, `placeholder="Ex. : Helena Costa"`],
            [`>Observações <span class="normal-case font-normal text-musa-muted">(opcional)</span>`, `>Remarques <span class="normal-case font-normal text-musa-muted">(facultatif)</span>`],
            [`placeholder="Ex: quero observar aves, datas flexíveis, crianças..."`, `placeholder="Ex. : observer les oiseaux, dates flexibles, enfants..."`],
            [`Interesse principal`, `Intérêt principal`],
            [`> Observação de aves`, `> Observation des oiseaux`],
            [`> Descanso`, `> Repos`],
            [`> Natureza`, `> Nature`],
            [`Ao enviar, o WhatsApp abre com a mensagem pronta. Valores e disponibilidade são confirmados no atendimento. Nenhum dado é armazenado neste site.`, `En envoyant, WhatsApp s'ouvre avec le message prêt. Les tarifs et la disponibilité sont confirmés lors de l'échange. Aucune donnée n'est stockée sur ce site.`],
            [`A solicitação é enviada em português para a equipe da pousada.`, `La demande est envoyée en portugais à l'équipe de la pousada.`],
            [`>Cancelar<`, `>Annuler<`],
            [/(>\s*)Enviar pelo WhatsApp(\s*<\/button>)/g, `$1Envoyer via WhatsApp$2`],
            [`aria-label="Falar com a Pousada Musa no WhatsApp"`, `aria-label="Discuter avec la Pousada Musa sur WhatsApp"`],

            // Modèles des modales
            [`data-tag="Nossa essência"`, `data-tag="Notre essence"`],
            [`data-title="Sobre a Pousada Musa"`, `data-title="À propos de la Pousada Musa"`],
            [`A Pousada Musa fica em Engenhos, Iguape, no litoral sul de São Paulo, cercada pela Mata Atlântica. É um lugar de ritmo lento, jardins, árvores frutíferas e muito canto de pássaro.`, `La Pousada Musa se trouve à Engenhos, Iguape, sur la côte sud de São Paulo, entourée par la forêt atlantique. C'est un lieu au rythme lent, avec des jardins, des arbres fruitiers et beaucoup de chants d'oiseaux.`],
            [`As suítes são confortáveis, com camas elogiadas por quem já se hospedou e banheiros novos. A proposta é simples: descansar bem, comer bem e aproveitar a natureza ao redor.`, `Les chambres sont confortables, avec des lits salués par les anciens voyageurs et des salles de bain neuves. Le principe est simple : bien se reposer, bien manger et profiter de la nature autour.`],
            [`✓ Suítes confortáveis`, `✓ Chambres confortables`],
            [`✓ Jardins e árvores frutíferas`, `✓ Jardins et arbres fruitiers`],
            [`✓ Observação de aves`, `✓ Observation des oiseaux`],
            [`✓ Ambiente acolhedor e LGBTQ+ friendly`, `✓ Cadre accueillant et LGBTQ+ friendly`],
            [`Valores e disponibilidade são confirmados pelo WhatsApp.`, `Les tarifs et la disponibilité sont confirmés sur WhatsApp.`],
            [`data-tag="Bem-estar &amp; natureza"`, `data-tag="Bien-être et nature"`],
            [`Uma área de água natural cercada por pedras, jardins e vegetação, com peixes e som de água corrente. Um dos cantos mais tranquilos da pousada.`, `Un espace d'eau naturelle entouré de rochers, de jardins et de végétation, avec des poissons et le bruit de l'eau qui coule. L'un des coins les plus tranquilles de la pousada.`],
            [`<strong>Ambiente:</strong> ao ar livre, junto ao jardim`, `<strong>Cadre :</strong> en plein air, près du jardin`],
            [`<strong>Destaque:</strong> água natural e contato com a mata`, `<strong>Point fort :</strong> eau naturelle et contact avec la forêt`],
            [`Combine o banho com uma volta pelos jardins e uma sessão de observação de aves.`, `Combinez la baignade avec une promenade dans les jardins et une séance d'observation des oiseaux.`],
            [`data-tag="Natureza ao redor"`, `data-tag="La nature tout autour"`],
            [`Os jardins e as árvores frutíferas atraem aves ao longo do dia. Saíras e outras espécies da Mata Atlântica circulam por aqui; colhereiros já foram registrados na região.`, `Les jardins et les arbres fruitiers attirent les oiseaux tout au long de la journée. Des tangaras et d'autres espèces de la forêt atlantique circulent ici ; des spatules rosées ont déjà été observées dans la région.`],
            [`Reserve um tempo para caminhar sem pressa, sentar à sombra e observar.`, `Prenez le temps de marcher sans vous presser, de vous asseoir à l'ombre et d'observer.`],
            [`data-tag="Guia de observação"`, `data-tag="Guide d'observation"`],
            [`data-title="Aves da Mata Atlântica"`, `data-title="Oiseaux de la forêt atlantique"`],
            [`Cercada por Mata Atlântica e árvores frutíferas, a Musa tem um comedouro movimentado e jardins que atraem aves durante o dia. Estas são algumas espécies já fotografadas na pousada e na região:`, `Entourée par la forêt atlantique et des arbres fruitiers, la Musa dispose d'une mangeoire très fréquentée et de jardins qui attirent les oiseaux pendant la journée. Voici quelques espèces déjà photographiées à la pousada et dans la région :`],
            [`alt="Saíra-sete-cores"`, `alt="Tangara fastueux"`],
            [`Comedouro &amp; jardim`, `Mangeoire et jardin`],
            [`>Saíra-sete-cores<`, `>Tangara fastueux<`],
            [`Ave colorida da Mata Atlântica, vista nos jardins e no comedouro.`, `Un oiseau coloré de la forêt atlantique, observé dans les jardins et à la mangeoire.`],
            [`alt="Colhereiro"`, `alt="Spatule rosée"`],
            [`Área alagada &amp; entorno`, `Zones humides et alentours`],
            [`>Colhereiro<`, `>Spatule rosée<`],
            [`Ave rosada de bico achatado, registrada na região da pousada.`, `Un oiseau rose au bec aplati, observé dans la région de la pousada.`],
            [`alt="Tiê-sangue"`, `alt="Tangara du Brésil"`],
            [`>Tiê-sangue<`, `>Tangara du Brésil<`],
            [`Pássaro vermelho vibrante da Mata Atlântica, fotografado na pousada.`, `Un oiseau rouge vif de la forêt atlantique, photographié à la pousada.`],
            [`Dica: as primeiras horas do dia costumam ser as melhores para observar e fotografar. Leve câmera ou binóculo.`, `Conseil : les premières heures de la journée sont généralement les meilleures pour observer et photographier. Apportez un appareil photo ou des jumelles.`],
            [`data-tag="Descanso"`, `data-tag="Repos"`],
            [`data-title="Varanda &amp; Jardins"`, `data-title="Véranda et jardins"`],
            [`A varanda da casa é um convite a desacelerar: sombra, vista para o jardim e o som dos pássaros ao fundo.`, `La véranda de la maison invite à ralentir : de l'ombre, une vue sur le jardin et le chant des oiseaux en fond sonore.`],
            [`Um bom lugar para ler, conversar ou simplesmente não fazer nada.`, `Un bon endroit pour lire, discuter ou simplement ne rien faire.`]
        ]
    }
};
