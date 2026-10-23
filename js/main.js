// Comportamento compartilhado do site da Pousada Musa.
// Carregado com defer em todas as páginas de idioma.

const WHATSAPP_NUMBER = '5511952991990';
const WHATSAPP_BASE = 'https://wa.me/' + WHATSAPP_NUMBER;
let lastFocusedElement = null;

// Datas padrão e formatação
function toLocalISO(date) {
    const y = date.getFullYear();
    const m = String(date.getMonth() + 1).padStart(2, '0');
    const d = String(date.getDate()).padStart(2, '0');
    return `${y}-${m}-${d}`;
}

function formatDateBR(iso) {
    if (!iso) return '';
    const parts = iso.split('-');
    return `${parts[2]}/${parts[1]}/${parts[0]}`;
}

document.addEventListener('DOMContentLoaded', () => {
    const checkIn = document.getElementById('checkIn');
    const checkOut = document.getElementById('checkOut');
    if (!checkIn || !checkOut) return;

    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    const afterTomorrow = new Date(today);
    afterTomorrow.setDate(today.getDate() + 3);

    checkIn.min = toLocalISO(today);
    checkIn.value = toLocalISO(tomorrow);
    checkOut.min = toLocalISO(tomorrow);
    checkOut.value = toLocalISO(afterTomorrow);

    checkIn.addEventListener('change', () => {
        if (!checkIn.value) return;
        const nextDay = new Date(checkIn.value + 'T12:00:00');
        nextDay.setDate(nextDay.getDate() + 1);
        const minCheckout = toLocalISO(nextDay);
        checkOut.min = minCheckout;
        if (!checkOut.value || checkOut.value <= checkIn.value) {
            checkOut.value = minCheckout;
        }
    });
});

// Traduções de interface da reserva (definidas em cada página)
function getBookingI18n() {
    const element = document.getElementById('booking-i18n');
    if (!element) return {};
    try {
        return JSON.parse(element.textContent);
    } catch (error) {
        return {};
    }
}

// Menu mobile
function toggleMobileMenu() {
    const menu = document.getElementById('mobileMenu');
    const openIcon = document.getElementById('menuIconOpen');
    const closeIcon = document.getElementById('menuIconClose');
    const button = document.getElementById('mobileMenuBtn');
    if (!menu || !button) return;

    const willOpen = menu.classList.contains('hidden');
    menu.classList.toggle('hidden');
    if (openIcon) openIcon.classList.toggle('hidden');
    if (closeIcon) closeIcon.classList.toggle('hidden');
    button.setAttribute('aria-expanded', willOpen ? 'true' : 'false');
    button.setAttribute(
        'aria-label',
        willOpen
            ? (button.dataset.closeLabel || 'Fechar menu')
            : (button.dataset.openLabel || 'Abrir menu')
    );
}

// Acordeão do FAQ
function toggleFaq(button) {
    const item = button.parentElement;
    const wasActive = item.classList.contains('active');

    document.querySelectorAll('.faq-item').forEach((el) => {
        el.classList.remove('active');
        const btn = el.querySelector('button');
        if (btn) btn.setAttribute('aria-expanded', 'false');
    });

    if (!wasActive) {
        item.classList.add('active');
        button.setAttribute('aria-expanded', 'true');
    }
}

// Controle de modais
function refreshScrollLock() {
    const hasOpenModal = !!document.querySelector('.modal-open');
    document.body.classList.toggle('overflow-hidden', hasOpenModal);
}

function openModal(id) {
    const modal = document.getElementById(id);
    if (!modal) return;
    lastFocusedElement = document.activeElement;
    modal.classList.remove('hidden');
    modal.classList.add('flex', 'modal-open');
    modal.setAttribute('aria-hidden', 'false');
    refreshScrollLock();

    const focusTarget = modal.querySelector('[data-autofocus]') || modal.querySelector('button, input, select, textarea, a[href]');
    if (focusTarget) {
        window.setTimeout(() => focusTarget.focus(), 50);
    }
}

function closeModal(id) {
    const modal = document.getElementById(id);
    if (!modal || !modal.classList.contains('modal-open')) return;
    modal.classList.add('hidden');
    modal.classList.remove('flex', 'modal-open');
    modal.setAttribute('aria-hidden', 'true');
    refreshScrollLock();

    if (lastFocusedElement && typeof lastFocusedElement.focus === 'function') {
        lastFocusedElement.focus();
    }
    lastFocusedElement = null;
}

function renderContentModal({ tag, title, src, alt, content }) {
    const tagElement = document.getElementById('modalTag');
    const titleElement = document.getElementById('modalTitle');
    const imgElement = document.getElementById('modalImg');
    const bodyElement = document.getElementById('modalBody');
    if (!tagElement || !titleElement || !imgElement || !bodyElement) return;

    tagElement.textContent = tag || '';
    titleElement.textContent = title || '';
    imgElement.src = src || '';
    imgElement.alt = alt || title || '';
    bodyElement.replaceChildren();

    if (typeof content === 'string') {
        bodyElement.innerHTML = content;
    } else if (content) {
        bodyElement.append(content);
    }

    openModal('contentModal');
}

function showModal(key) {
    const template = document.getElementById('modal-' + key);
    if (!template) return;

    renderContentModal({
        tag: template.dataset.tag,
        title: template.dataset.title,
        src: template.dataset.img,
        alt: template.dataset.alt,
        content: template.innerHTML
    });
}

function closeContentModal() {
    closeModal('contentModal');
}

function openBookingModal() {
    openModal('bookingModal');
}

function closeBookingModal() {
    closeModal('bookingModal');
}

function openExperienceModal(key) {
    showModal(key);
}

function openInfoModal(key) {
    showModal(key);
}

function openPhoto(button) {
    const img = button.querySelector('img');
    if (!img) return;

    const text = document.createElement('p');
    text.textContent = button.dataset.text || '';

    renderContentModal({
        tag: button.dataset.tag || '',
        title: button.dataset.title || img.alt,
        src: img.getAttribute('src'),
        alt: img.alt,
        content: text
    });
}

// Reserva via WhatsApp.
// A mensagem é sempre em português, pois é lida pela equipe da pousada.
function submitBooking(event) {
    event.preventDefault();

    const i18n = getBookingI18n();
    const checkIn = document.getElementById('checkIn').value;
    const checkOut = document.getElementById('checkOut').value;
    const name = document.getElementById('guestName').value.trim();

    if (!checkIn || !checkOut || checkOut <= checkIn) {
        window.alert(i18n.invalidDates || 'Confira as datas: o check-out precisa ser depois do check-in.');
        return;
    }

    if (!name) {
        window.alert(i18n.missingName || 'Por favor, informe seu nome.');
        return;
    }

    const guestsValue = document.getElementById('guestsSelect').value;
    const guests = guestsValue === '6+'
        ? '6 ou mais'
        : `${guestsValue} ${guestsValue === '1' ? 'pessoa' : 'pessoas'}`;

    const accommodationOption = document.getElementById('accommodationSelect').selectedOptions[0];
    const accommodation = accommodationOption.dataset.pt || accommodationOption.text;
    const notes = document.getElementById('guestNotes').value.trim();
    const interests = Array.from(document.querySelectorAll('input[name="interesse"]:checked')).map((input) => input.value);

    const lines = [
        'Olá! Gostaria de consultar disponibilidade na Pousada Musa.',
        `Nome: ${name}`,
        `Check-in: ${formatDateBR(checkIn)}`,
        `Check-out: ${formatDateBR(checkOut)}`,
        `Hóspedes: ${guests}`,
        `Acomodação: ${accommodation}`,
        interests.length ? `Interesses: ${interests.join(', ')}` : '',
        notes ? `Observações: ${notes}` : ''
    ].filter(Boolean);

    const url = `${WHATSAPP_BASE}?text=${encodeURIComponent(lines.join('\n'))}`;
    const opened = window.open(url, '_blank');

    if (!opened) {
        window.location.href = url;
    } else {
        closeBookingModal();
    }
}

// Fechar com ESC, clique no fundo e foco preso no modal
document.querySelectorAll('[data-modal]').forEach((modal) => {
    modal.addEventListener('click', (event) => {
        if (event.target === modal) {
            closeModal(modal.id);
        }
    });
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') {
        closeContentModal();
        closeBookingModal();
    }

    if (event.key !== 'Tab') return;

    const openModalElement = document.querySelector('.modal-open');
    if (!openModalElement) return;

    const focusables = Array.from(openModalElement.querySelectorAll(
        'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])'
    )).filter((el) => el.offsetParent !== null);

    if (!focusables.length) return;

    const first = focusables[0];
    const last = focusables[focusables.length - 1];

    if (event.shiftKey && document.activeElement === first) {
        event.preventDefault();
        last.focus();
    } else if (!event.shiftKey && document.activeElement === last) {
        event.preventDefault();
        first.focus();
    }
});
