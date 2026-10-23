#!/usr/bin/env node
/**
 * Verificações estáticas do site (sem dependências externas).
 * Roda com: npm test
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const SITE = 'https://gmsarti.github.io/site-musa';
const errors = [];

const alternates = {
    'pt-BR': `${SITE}/`,
    en: `${SITE}/en/`,
    es: `${SITE}/es/`,
    fr: `${SITE}/fr/`
};

const pages = [
    { file: 'index.html', lang: 'pt-BR', locale: 'pt_BR', url: `${SITE}/`, current: 'Português' },
    { file: 'en/index.html', lang: 'en', locale: 'en_US', url: `${SITE}/en/`, current: 'English' },
    { file: 'es/index.html', lang: 'es', locale: 'es_ES', url: `${SITE}/es/`, current: 'Español' },
    { file: 'fr/index.html', lang: 'fr', locale: 'fr_FR', url: `${SITE}/fr/`, current: 'Français' }
];

function attr(tag, name) {
    const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i'));
    return match ? match[1] : null;
}

function resolveRef(pageDir, ref) {
    const clean = ref.split(/[?#]/)[0];
    if (!clean) return null;
    if (/^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\$\{)/i.test(clean)) return null;
    return resolve(root, pageDir, clean);
}

let totalImages = 0;
let totalIds = 0;
let totalRefs = 0;

for (const page of pages) {
    const file = resolve(root, page.file);
    if (!existsSync(file)) {
        errors.push(`${page.file}: arquivo não existe`);
        continue;
    }

    const html = readFileSync(file, 'utf8');
    const pageDir = dirname(page.file);
    const prefix = `${page.file}: `;

    // Metadados essenciais
    const htmlLang = html.match(/<html[^>]*\blang="([^"]+)"/i)?.[1];
    if (htmlLang !== page.lang) {
        errors.push(`${prefix}o elemento <html> deveria declarar lang="${page.lang}" (encontrado: ${htmlLang ?? 'nenhum'})`);
    }
    if (!/<title>[^<]+<\/title>/.test(html)) {
        errors.push(`${prefix}falta um <title> preenchido`);
    }
    if (!/<meta name="description" content="[^"]+"/.test(html)) {
        errors.push(`${prefix}falta a meta description`);
    }
    if (!/<meta property="og:image" content="[^"]+"/.test(html)) {
        errors.push(`${prefix}falta a imagem Open Graph (og:image)`);
    }
    if (/cdn\.tailwindcss\.com/.test(html)) {
        errors.push(`${prefix}o HTML ainda carrega o Tailwind via CDN`);
    }

    // Open Graph e idioma
    const ogLocale = html.match(/<meta property="og:locale" content="([^"]+)"/)?.[1];
    if (ogLocale !== page.locale) {
        errors.push(`${prefix}og:locale deveria ser "${page.locale}" (encontrado: ${ogLocale ?? 'nenhum'})`);
    }
    const ogUrl = html.match(/<meta property="og:url" content="([^"]+)"/)?.[1];
    if (ogUrl !== page.url) {
        errors.push(`${prefix}og:url deveria ser "${page.url}" (encontrado: ${ogUrl ?? 'nenhum'})`);
    }
    const ogAlternates = [...html.matchAll(/<meta property="og:locale:alternate" content="([^"]+)"/g)].length;
    if (ogAlternates !== 3) {
        errors.push(`${prefix}esperados 3 og:locale:alternate (encontrados: ${ogAlternates})`);
    }
    const ogImage = html.match(/<meta property="og:image" content="([^"]+)"/)?.[1];
    if (ogImage && ogImage.startsWith(`${SITE}/`)) {
        const rel = ogImage.slice(SITE.length + 1);
        if (!existsSync(resolve(root, rel))) {
            errors.push(`${prefix}og:image não existe: ${rel}`);
        }
    }

    // hreflang e seletor de idioma
    const hrefLangs = new Map();
    for (const match of html.matchAll(/<link rel="alternate" hreflang="([^"]+)" href="([^"]+)">/g)) {
        hrefLangs.set(match[1], match[2]);
    }
    for (const [code, url] of Object.entries({ ...alternates, 'x-default': alternates['pt-BR'] })) {
        if (hrefLangs.get(code) !== url) {
            errors.push(`${prefix}hreflang "${code}" deveria apontar para "${url}"`);
        }
    }
    const currentCount = (html.match(/aria-current="page"/g) ?? []).length;
    if (currentCount < 2) {
        errors.push(`${prefix}seletor de idioma incompleto (aria-current="page" ${currentCount}x)`);
    }
    for (const name of ['Português', 'English', 'Español', 'Français']) {
        const count = (html.match(new RegExp(`aria-label="${name}"`, 'g')) ?? []).length;
        if (count < 2) {
            errors.push(`${prefix}seletor de idioma incompleto: ${name} (${count}x)`);
        }
    }
    const currentRe = new RegExp(
        `<span[^>]*aria-current="page"[^>]*aria-label="${page.current}"|<span[^>]*aria-label="${page.current}"[^>]*aria-current="page"`
    );
    if (!currentRe.test(html)) {
        errors.push(`${prefix}idioma atual não está marcado no seletor: ${page.current}`);
    }

    // IDs únicos
    const idCounts = new Map();
    for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
        const id = match[1];
        idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
    }
    for (const [id, count] of idCounts) {
        if (count > 1) errors.push(`${prefix}id duplicado: "${id}" (${count}x)`);
    }
    totalIds += idCounts.size;

    // Âncoras internas e aria-controls precisam apontar para IDs existentes
    for (const match of html.matchAll(/href="#([^"]+)"/g)) {
        const target = decodeURIComponent(match[1]);
        if (!idCounts.has(target)) errors.push(`${prefix}âncora sem destino: #${target}`);
    }
    for (const match of html.matchAll(/\baria-controls="([^"]+)"/g)) {
        for (const id of match[1].split(/\s+/)) {
            if (id && !idCounts.has(id)) errors.push(`${prefix}aria-controls sem destino: ${id}`);
        }
    }

    // Imagens: alt obrigatório e dimensões para evitar layout shift
    const images = [...html.matchAll(/<img\b[^>]*>/gs)].map((match) => match[0]);
    for (const tag of images) {
        const label = attr(tag, 'src') || '(sem src)';
        if (attr(tag, 'alt') === null) errors.push(`${prefix}imagem sem alt: ${label}`);
        if (!attr(tag, 'width') || !attr(tag, 'height')) {
            errors.push(`${prefix}imagem sem width/height: ${label}`);
        }
    }
    totalImages += images.length;

    // Arquivos locais referenciados (src, href, srcset, data-img, imagesrcset e og:image)
    const assetRefs = new Set();
    for (const match of html.matchAll(/\b(?:src|href|data-img)="([^"]+)"/g)) assetRefs.add(match[1]);
    for (const match of html.matchAll(/content="((?:\.\.\/)?img\/[^"]+)"/g)) assetRefs.add(match[1]);
    for (const match of html.matchAll(/(?:srcset|imagesrcset)="([^"]+)"/g)) {
        for (const candidate of match[1].split(',')) {
            assetRefs.add(candidate.trim().split(/\s+/)[0]);
        }
    }

    for (const ref of assetRefs) {
        const path = resolveRef(pageDir, ref);
        if (path && !existsSync(path)) {
            errors.push(`${prefix}arquivo referenciado não existe: ${ref}`);
        }
    }
    totalRefs += assetRefs.size;
}

// CSS compilado do Tailwind e JavaScript compartilhado
if (!existsSync(resolve(root, 'css/styles.css'))) {
    errors.push('css/styles.css não existe; rode "npm run build:css"');
}
if (!existsSync(resolve(root, 'js/main.js'))) {
    errors.push('js/main.js não existe');
}

if (errors.length) {
    console.error(`✗ ${errors.length} problema(s) encontrado(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
}

console.log(
    `✓ ${pages.length} páginas válidas: ${totalImages} imagens com alt/dimensões, ` +
    `${totalIds} IDs únicos e ${totalRefs} referências de arquivos conferidas.`
);
