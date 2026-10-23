#!/usr/bin/env node
/**
 * Gera as páginas /en/, /es/ e /fr/ a partir de index.html.
 * A página em português continua sendo a fonte da estrutura e dos textos.
 * Rode com: npm run build:i18n
 */
import { createHash } from 'node:crypto';
import { mkdirSync, readFileSync, writeFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { buildAlternates, buildOgLocale, buildSwitcher, languages } from './i18n-data.mjs';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const warnings = [];

// Versão do CSS/JS no link (?v=hash): muda quando o conteúdo muda e o navegador não usa o cache antigo
const assetVersion = createHash('sha256')
    .update(readFileSync(resolve(root, 'css/styles.css')))
    .update(readFileSync(resolve(root, 'js/main.js')))
    .digest('hex')
    .slice(0, 8);
const original = readFileSync(resolve(root, 'index.html'), 'utf8');
const source = original.replace(/(css\/styles\.css|js\/main\.js)(?:\?v=\w+)?"/g, `$1?v=${assetVersion}"`);

function replaceBlock(html, startMarker, endMarker, content) {
    const pattern = new RegExp(`${startMarker}[\\s\\S]*?${endMarker}`);
    if (!pattern.test(html)) {
        warnings.push(`bloco não encontrado: ${startMarker}`);
        return html;
    }
    return html.replace(pattern, `${startMarker}\n    ${content}\n    ${endMarker}`);
}

function replaceExact(html, lang, find, replace) {
    if (!html.includes(find)) {
        warnings.push(`[${lang}] trecho não encontrado: ${JSON.stringify(find.slice(0, 90))}`);
        return html;
    }
    return html.replace(find, replace);
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

const outputs = [];

for (const [code, config] of Object.entries(languages)) {
    let html = source;

    // Idioma do documento
    html = replaceExact(html, code, '<html lang="pt-BR"', `<html lang="${config.lang}"`);

    // Metadados
    html = replaceExact(html, code,
        '<title>Pousada MUSA | Hospedagem e observação de aves em Iguape/SP</title>',
        `<title>${config.title}</title>`
    );
    html = replaceExact(html, code,
        '<meta name="description" content="Pousada em Iguape/SP, cercada pela Mata Atlântica. Suítes confortáveis, jardins, piscina natural e observação de aves. Fale com a gente pelo WhatsApp.">',
        `<meta name="description" content="${config.description}">`
    );
    html = replaceExact(html, code,
        '<meta property="og:title" content="Pousada MUSA | Iguape/SP">',
        `<meta property="og:title" content="${config.ogTitle}">`
    );
    html = replaceExact(html, code,
        '<meta property="og:description" content="Refúgio na Mata Atlântica com suítes confortáveis, jardins, piscina natural e observação de aves.">',
        `<meta property="og:description" content="${config.ogDescription}">`
    );
    html = replaceExact(html, code,
        '<meta property="og:image:alt" content="Entrada da Pousada Musa, em Iguape/SP">',
        `<meta property="og:image:alt" content="${config.ogImageAlt}">`
    );

    // Blocos de idioma
    html = replaceBlock(html, '<!-- i18n:alternates:start -->', '<!-- i18n:alternates:end -->', buildAlternates());
    html = replaceBlock(html, '<!-- i18n:og-locale:start -->', '<!-- i18n:og-locale:end -->', buildOgLocale(config.lang, config.ogLocale, config.ogAlternates, config.url));
    html = replaceBlock(html, '<!-- i18n:switcher:start -->', '<!-- i18n:switcher:end -->', buildSwitcher(config.lang));

    // Caminhos relativos para as subpastas
    if (config.lang !== 'pt-BR') {
        html = html.replace(/(?<![\w/])img\//g, '../img/');
        html = replaceExact(html, code, 'href="css/styles.css', 'href="../css/styles.css');
        html = replaceExact(html, code, 'src="js/main.js', 'src="../js/main.js');
    }

    // Textos de interface da reserva
    html = html.replace(
        /<script type="application\/json" id="booking-i18n">[\s\S]*?<\/script>/,
        `<script type="application/json" id="booking-i18n">\n${JSON.stringify(config.booking, null, 4)}\n    </script>`
    );

    // Traduções
    html = applyReplacements(html, code, config.replacements);

    outputs.push({ code, html });
}

// Com qualquer aviso, nenhuma página é gravada e o build falha
if (warnings.length) {
    console.error(`✗ ${warnings.length} aviso(s); nenhuma página foi gravada:`);
    for (const warning of warnings) console.error(`  - ${warning}`);
    process.exit(1);
}

if (source !== original) {
    writeFileSync(resolve(root, 'index.html'), source);
    console.log('✓ index.html (versão dos assets)');
}

for (const { code, html } of outputs) {
    const output = resolve(root, code, 'index.html');
    mkdirSync(dirname(output), { recursive: true });
    writeFileSync(output, html);
    console.log(`✓ ${code}/index.html`);
}
