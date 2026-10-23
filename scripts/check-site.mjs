#!/usr/bin/env node
/**
 * Verificações estáticas do site (sem dependências externas).
 * Roda com: npm test
 */
import { existsSync, readFileSync } from 'node:fs';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const root = resolve(dirname(fileURLToPath(import.meta.url)), '..');
const html = readFileSync(resolve(root, 'index.html'), 'utf8');
const errors = [];

function attr(tag, name) {
    const match = tag.match(new RegExp(`\\b${name}\\s*=\\s*"([^"]*)"`, 'i'));
    return match ? match[1] : null;
}

// Metadados essenciais
if (!/<html[^>]*\blang="pt-BR"/.test(html)) {
    errors.push('o elemento <html> não declara lang="pt-BR"');
}
if (!/<title>[^<]+<\/title>/.test(html)) {
    errors.push('falta um <title> preenchido');
}
if (!/<meta name="description" content="[^"]+"/.test(html)) {
    errors.push('falta a meta description');
}
if (!/<meta property="og:image" content="[^"]+"/.test(html)) {
    errors.push('falta a imagem Open Graph (og:image)');
}
if (/cdn\.tailwindcss\.com/.test(html)) {
    errors.push('o HTML ainda carrega o Tailwind via CDN');
}

// IDs únicos
const idCounts = new Map();
for (const match of html.matchAll(/\bid="([^"]+)"/g)) {
    const id = match[1];
    idCounts.set(id, (idCounts.get(id) ?? 0) + 1);
}
for (const [id, count] of idCounts) {
    if (count > 1) errors.push(`id duplicado: "${id}" (${count}x)`);
}

// Âncoras internas e aria-controls precisam apontar para IDs existentes
for (const match of html.matchAll(/href="#([^"]+)"/g)) {
    const target = decodeURIComponent(match[1]);
    if (!idCounts.has(target)) errors.push(`âncora sem destino: #${target}`);
}
for (const match of html.matchAll(/\baria-controls="([^"]+)"/g)) {
    for (const id of match[1].split(/\s+/)) {
        if (id && !idCounts.has(id)) errors.push(`aria-controls sem destino: ${id}`);
    }
}

// Imagens: alt obrigatório e dimensões para evitar layout shift
const images = [...html.matchAll(/<img\b[^>]*>/gs)].map((match) => match[0]);
for (const tag of images) {
    const label = attr(tag, 'src') || '(sem src)';
    if (attr(tag, 'alt') === null) errors.push(`imagem sem alt: ${label}`);
    if (!attr(tag, 'width') || !attr(tag, 'height')) {
        errors.push(`imagem sem width/height: ${label}`);
    }
}

// Arquivos locais referenciados (src, href, srcset, og:image e imagens no JS)
const assetRefs = new Set();
for (const match of html.matchAll(/\b(?:src|href)="([^"]+)"/g)) assetRefs.add(match[1]);
for (const match of html.matchAll(/content="(img\/[^"]+)"/g)) assetRefs.add(match[1]);
for (const match of html.matchAll(/'(img\/[^']+)'/g)) assetRefs.add(match[1]);
for (const match of html.matchAll(/srcset="([^"]+)"/g)) {
    for (const candidate of match[1].split(',')) {
        assetRefs.add(candidate.trim().split(/\s+/)[0]);
    }
}

for (const ref of assetRefs) {
    if (!ref || /^(?:[a-z][a-z0-9+.-]*:|\/\/|#|\$\{)/i.test(ref)) continue;
    const path = ref.split(/[?#]/)[0];
    if (path && !existsSync(resolve(root, path))) {
        errors.push(`arquivo referenciado não existe: ${ref}`);
    }
}

// CSS compilado do Tailwind
if (!existsSync(resolve(root, 'css/styles.css'))) {
    errors.push('css/styles.css não existe; rode "npm run build:css"');
}

if (errors.length) {
    console.error(`✗ ${errors.length} problema(s) encontrado(s):`);
    for (const error of errors) console.error(`  - ${error}`);
    process.exit(1);
}

const assets = assetRefs.size;
console.log(`✓ HTML válido: ${images.length} imagens com alt/dimensões, ${idCounts.size} IDs únicos e ${assets} referências de arquivos conferidas.`);
