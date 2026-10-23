#!/usr/bin/env node
/**
 * Gera as páginas /en/, /es/ e /fr/ a partir de index.html.
 * A página em português continua sendo a fonte da estrutura e dos textos.
 * Rode com: npm run build:i18n
 */
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildAlternates, buildOgLocale, buildSwitcher, languages } from './i18n-data.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const source = readFileSync(resolve(root, 'index.html'), 'utf8');
const warnings = [];

function replaceBlock(html, startMarker, endMarker, content) {
    const pattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
    if (!pattern.test(html)) {
        warnings.push(`bloco não encontrado: ${startMarker}`);
        return html;
    }
    return html.replace(pattern, `${startMarker}\n    ${content}\n    ${endMarker}`);
}

function applyReplacements(html, lang, replacements) {
    for (const [find, replace] of replacements) {
        if (find instanceof RegExp) {
            const before = html;
            html = html.replace(find, replace);
            if (html === before) warnings.push(`[${lang}] regex sem efeito: ${find}`);
            continue;
        }

        if (!html.includes(find)) {
            warnings.push(`[${lang}] trecho não encontrado: ${JSON.stringify(find.slice(0, 90))}`);
            continue;
        }
        html = html.split(find).join(replace);
    }
    return html;
}

for (const [code, config] of Object.entries(languages)) {
    let html = source;

    // Idioma do documento
    html = html.replace('<html lang="pt-BR"', `<html lang="${config.lang}"`);

    // Metadados
    html = html.replace(
        '<title>Pousada MUSA | Hospedagem e observação de aves em Iguape/SP</title>',
        `<title>${config.title}</title>`
    );
    html = html.replace(
        '<meta name="description" content="Pousada em Iguape/SP, cercada pela Mata Atlântica. Suítes confortáveis, jardins, piscina natural e observação de aves. Fale com a gente pelo WhatsApp.">',
        `<meta name="description" content="${config.description}">`
    );
    html = html.replace(
        '<meta property="og:title" content="Pousada MUSA | Iguape/SP">',
        `<meta property="og:title" content="${config.ogTitle}">`
    );
    html = html.replace(
        '<meta property="og:description" content="Refúgio na Mata Atlântica com suítes confortáveis, jardins, piscina natural e observação de aves.">',
        `<meta property="og:description" content="${config.ogDescription}">`
    );
    html = html.replace(
        '<meta property="og:image:alt" content="Entrada da Pousada Musa, em Iguape/SP">',
        `<meta property="og:image:alt" content="${config.ogImageAlt}">`
    );

    // Blocos de idioma
    html = replaceBlock(html, '<!-- i18n:alternates:start -->', '<!-- i18n:alternates:end -->', buildAlternates());
    html = replaceBlock(html, '<!-- i18n:og-locale:start -->', '<!-- i18n:og-locale:end -->', buildOgLocale(config.lang, config.ogLocale, config.ogAlternates, config.url));
    html = replaceBlock(html, '<!-- i18n:switcher-desktop:start -->', '<!-- i18n:switcher-desktop:end -->', buildSwitcher(config.lang, config.switcherLabel));
    html = replaceBlock(html, '<!-- i18n:switcher-mobile:start -->', '<!-- i18n:switcher-mobile:end -->', buildSwitcher(config.lang, config.switcherLabel, true));

    // Caminhos relativos para as subpastas
    if (config.lang !== 'pt-BR') {
        html = html.replace(/(?<![\w/])img\//g, '../img/');
        html = html.replace('href="css/styles.css"', 'href="../css/styles.css"');
        html = html.replace('src="js/main.js"', 'src="../js/main.js"');
    }

    // Textos de interface da reserva
    html = html.replace(
        /<script type="application\/json" id="booking-i18n">[\s\S]*?<\/script>/,
        `<script type="application/json" id="booking-i18n">\n${JSON.stringify(config.booking, null, 4)}\n    </script>`
    );

    // Traduções
    html = applyReplacements(html, code, config.replacements);

    const output = resolve(root, code, 'index.html');
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, html);
    console.log(`✓ ${code}/index.html`);
}

if (warnings.length) {
    console.warn(`\n${warnings.length} aviso(s):`);
    for (const warning of warnings) console.warn(`  - ${warning}`);
}
