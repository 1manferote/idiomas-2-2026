/**
 * Script Unificado - GasServicios
 * Versión completa con todas las funcionalidades
 */

// ============================================
// CONFIGURACION Y DATOS
// ============================================

const navItems = ['afirmativa', 'negativa', 'interrogativa', 'int-negativa'];

const phrases = {
    afirmativa: { eng: "I still feel it is nice to ask for support.", spa: "Todavía siento que es agradable pedir apoyo." },
    negativa: { eng: "I still don't feel nice when I ask for support.", spa: "Todavía no me siento bien cuando pido apoyo." },
    interrogativa: { eng: "Do you still feel nice when you ask for support?", spa: "¿Todavía te sientes bien cuando pides apoyo?" },
    'int-negativa': { eng: "Don't you feel it is nice to ask for support?", spa: "¿No sientes que es agradable pedir apoyo?" }
};

const verbos = [
    { n: "Be", t: "Ser/Estar", ps: "am/is/are", pc: "being", pp: "been", pas: "was/were", pac: "was being", ppe: "had been", fs: "will be", fp: "will have been" },
    { n: "Have", t: "Tener", ps: "have/has", pc: "having", pp: "had", pas: "had", pac: "was having", ppe: "had had", fs: "will have", fp: "will have had" },
    { n: "Do", t: "Hacer", ps: "do/does", pc: "doing", pp: "done", pas: "did", pac: "was doing", ppe: "had done", fs: "will do", fp: "will have done" },
    { n: "Say", t: "Decir", ps: "say/s", pc: "saying", pp: "said", pas: "said", pac: "was saying", ppe: "had said", fs: "will say", fp: "will have said" },
    { n: "Get", t: "Conseguir", ps: "get/s", pc: "getting", pp: "got", pas: "got", pac: "was getting", ppe: "had got", fs: "will get", fp: "will have got" },
    { n: "Make", t: "Hacer", ps: "make/s", pc: "making", pp: "made", pas: "made", pac: "was making", ppe: "had made", fs: "will make", fp: "will have made" },
    { n: "Go", t: "Ir", ps: "go/es", pc: "going", pp: "gone", pas: "went", pac: "was going", ppe: "had gone", fs: "will go", fp: "will have gone" },
    { n: "Know", t: "Saber", ps: "know/s", pc: "knowing", pp: "known", pas: "knew", pac: "was knowing", ppe: "had known", fs: "will know", fp: "will have known" },
    { n: "Take", t: "Tomar", ps: "take/s", pc: "taking", pp: "taken", pas: "took", pac: "was taking", ppe: "had taken", fs: "will take", fp: "will have taken" },
    { n: "See", t: "Ver", ps: "see/s", pc: "seeing", pp: "seen", pas: "saw", pac: "was seeing", ppe: "had seen", fs: "will see", fp: "will have seen" },
    { n: "Come", t: "Venir", ps: "come/s", pc: "coming", pp: "come", pas: "came", pac: "was coming", ppe: "had come", fs: "will come", fp: "will have come" },
    { n: "Think", t: "Pensar", ps: "think/s", pc: "thinking", pp: "thought", pas: "thought", pac: "was thinking", ppe: "had thought", fs: "will think", fp: "will have thought" },
    { n: "Look", t: "Mirar", ps: "look/s", pc: "looking", pp: "looked", pas: "looked", pac: "was looking", ppe: "had looked", fs: "will look", fp: "will have looked" },
    { n: "Want", t: "Querer", ps: "want/s", pc: "wanting", pp: "wanted", pas: "wanted", pac: "was wanting", ppe: "had wanted", fs: "will want", fp: "will have wanted" },
    { n: "Give", t: "Dar", ps: "give/s", pc: "giving", pp: "given", pas: "gave", pac: "was giving", ppe: "had given", fs: "will give", fp: "will have given" },
    { n: "Use", t: "Usar", ps: "use/s", pc: "using", pp: "used", pas: "used", pac: "was using", ppe: "had used", fs: "will use", fp: "will have used" },
    { n: "Find", t: "Encontrar", ps: "find/s", pc: "finding", pp: "found", pas: "found", pac: "was finding", ppe: "had found", fs: "will find", fp: "will have found" },
    { n: "Tell", t: "Contar", ps: "tell/s", pc: "telling", pp: "told", pas: "told", pac: "was telling", ppe: "had told", fs: "will tell", fp: "will have told" },
    { n: "Ask", t: "Preguntar", ps: "ask/s", pc: "asking", pp: "asked", pas: "asked", pac: "was asking", ppe: "had asked", fs: "will ask", fp: "will have asked" },
    { n: "Work", t: "Trabajar", ps: "work/s", pc: "working", pp: "worked", pas: "worked", pac: "was working", ppe: "had worked", fs: "will work", fp: "will have worked" }
];

// Datos para Objetos y Posesivos - ACORDEÓN
const objectPronouns = [
    { en: "She loves <strong>me</strong>.", es: "Ella me ama." },
    { en: "I call <strong>you</strong> every day.", es: "Yo te llamo todos los días." },
    { en: "He doesn't know <strong>her</strong>.", es: "Él no la conoce." },
    { en: "We saw <strong>him</strong> at the park.", es: "Nosotros lo vimos en el parque." },
    { en: "They invited <strong>us</strong> to the party.", es: "Ellos nos invitaron a la fiesta." },
    { en: "Can you help <strong>them</strong>?", es: "¿Puedes ayudarlos?" }
];

const possessivePronouns = [
    { en: "This car is <strong>mine</strong>.", es: "Este coche es mío." },
    { en: "Is this jacket <strong>yours</strong>?", es: "¿Esta chaqueta es tuya?" },
    { en: "That notebook is <strong>his</strong>.", es: "Ese cuaderno es de él." },
    { en: "The blue bag is <strong>hers</strong>.", es: "La bolsa azul es de ella." },
    { en: "The victory is <strong>ours</strong>.", es: "La victoria es nuestra." },
    { en: "Those seats are <strong>theirs</strong>.", es: "Esos asientos son suyos." }
];

const possessiveAdjectives = [
    { en: "<strong>My</strong> name is John.", es: "Mi nombre es John." },
    { en: "Is this <strong>your</strong> book?", es: "¿Es este tu libro?" },
    { en: "<strong>His</strong> car is very fast.", es: "Su coche es muy rápido (de él)." },
    { en: "<strong>Her</strong> house is beautiful.", es: "Su casa es hermosa (de ella)." },
    { en: "<strong>Our</strong> team won the game.", es: "Nuestro equipo ganó el partido." },
    { en: "<strong>Their</strong> company is successful.", es: "Su empresa es exitosa (de ellos)." }
];

const pronounPhrases = [
    { en: "She loves me.", es: "Ella me ama." },
    { en: "I call you every day.", es: "Yo te llamo todos los días." },
    { en: "He doesn't know her.", es: "Él no la conoce." },
    { en: "We saw him at the park.", es: "Nosotros lo vimos en el parque." },
    { en: "They invited us to the party.", es: "Ellos nos invitaron a la fiesta." },
    { en: "Can you help them?", es: "¿Puedes ayudarlos?" }
];

const examples = [
    { t: "Present Simple", e: "I understand the plan.", s: "Entiendo el plan." },
    { t: "Present Continuous", e: "He is leaving now.", s: "Él se está yendo ahora." },
    { t: "Present Perfect", e: "We have tried everything.", s: "Lo hemos intentado todo." },
    { t: "Past Simple", e: "They saw the result.", s: "Vieron el resultado." },
    { t: "Past Continuous", e: "I was working at ten.", s: "Estaba trabajando a las diez." },
    { t: "Past Perfect", e: "She had left before you came.", s: "Ella se había ido antes de que vinieras." },
    { t: "Future Simple", e: "I will call you later.", s: "Te llamaré más tarde." },
    { t: "Future Perfect", e: "I will have finished by June.", s: "Habré terminado para junio." }
];

// ============================================
// VARIABLES GLOBALES
// ============================================

let appSpeed = 0.8;

// ============================================
// GESTION DE TEMA
// ============================================

function initTheme() {
    const saved = localStorage.getItem('theme');
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const theme = saved || (systemPrefersDark ? 'dark' : 'light');
    
    document.documentElement.setAttribute('data-theme', theme);
    updateThemeButton(theme);
}

function toggleTheme() {
    const current = document.documentElement.getAttribute('data-theme');
    const newTheme = current === 'dark' ? 'light' : 'dark';
    
    document.documentElement.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
    updateThemeButton(newTheme);
}

function updateThemeButton(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    
    const icon = btn.querySelector('.theme-icon');
    const text = btn.querySelector('.theme-text');
    
    if (theme === 'dark') {
        if (icon) icon.textContent = '☀️';
        if (text) text.textContent = 'Modo Claro';
    } else {
        if (icon) icon.textContent = '🌙';
        if (text) text.textContent = 'Modo Oscuro';
    }
}

// ============================================
// SISTEMA DE PESTAÑAS
// ============================================

function mostrarSeccion(id) {
    document.querySelectorAll('.seccion').forEach((sec) => {
        sec.classList.remove('visible');
        sec.setAttribute('aria-hidden', 'true');
    });

    document.querySelectorAll('.botones button').forEach((btn) => {
        btn.classList.remove('active');
        btn.setAttribute('aria-selected', 'false');
    });

    const target = document.getElementById(id);
    if (target) {
        target.classList.add('visible');
        target.setAttribute('aria-hidden', 'false');
    }

    const btnId = 'btn' + id.charAt(0).toUpperCase() + id.slice(1);
    const activeBtn = document.getElementById(btnId);
    if (activeBtn) {
        activeBtn.classList.add('active');
        activeBtn.setAttribute('aria-selected', 'true');
    }
}

// ============================================
// MENU HAMBURGUESA
// ============================================

function initHamburgerMenu() {
    const hamburgerBtn = document.getElementById('hamburgerBtn');
    const nav = document.querySelector('nav');
    const overlay = document.getElementById('menuOverlay');
    const body = document.body;
    
    if (!hamburgerBtn || !nav || !overlay) return;
    
    function openMenu() {
        nav.classList.add('active');
        hamburgerBtn.classList.add('active');
        overlay.classList.add('active');
        body.style.overflow = 'hidden';
        hamburgerBtn.setAttribute('aria-expanded', 'true');
    }
    
    function closeMenu() {
        nav.classList.remove('active');
        hamburgerBtn.classList.remove('active');
        overlay.classList.remove('active');
        body.style.overflow = '';
        hamburgerBtn.setAttribute('aria-expanded', 'false');
    }
    
    hamburgerBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        if (nav.classList.contains('active')) {
            closeMenu();
        } else {
            openMenu();
        }
    });
    
    overlay.addEventListener('click', closeMenu);
    
    const navLinks = nav.querySelectorAll('a');
    navLinks.forEach((link) => {
        link.addEventListener('click', closeMenu);
    });
    
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && nav.classList.contains('active')) {
            closeMenu();
        }
    });
    
    let resizeTimer;
    window.addEventListener('resize', () => {
        clearTimeout(resizeTimer);
        resizeTimer = setTimeout(() => {
            if (window.innerWidth > 1024 && nav.classList.contains('active')) {
                closeMenu();
            }
        }, 250);
    });
}

// ============================================
// NEWSLETTER
// ============================================

function handleNewsletter(e) {
    e.preventDefault();
    const emailInput = document.getElementById('email');
    if (!emailInput) return;
    
    const email = emailInput.value.trim();
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    if (!regex.test(email)) {
        alert('📧 Por favor, introduce un email válido');
        return;
    }
    
    const btn = e.target.querySelector('button');
    if (!btn) return;
    
    const original = btn.textContent;
    btn.disabled = true;
    btn.textContent = 'Enviando...';
    
    setTimeout(() => {
        alert(`✅ ¡Gracias por suscribirte!\nRecibirás novedades en: ${email}`);
        e.target.reset();
        btn.disabled = false;
        btn.textContent = original;
    }, 800);
}

// ============================================
// RENDERIZADO DE VERBOS
// ============================================

function escapeHtml(text) {
    const map = {
        '&': '&amp;',
        '<': '&lt;',
        '>': '&gt;',
        '"': '&quot;',
        "'": '&#039;'
    };
    return String(text).replace(/[&<>"']/g, (m) => map[m]);
}

function renderVerbs() {
    const container = document.getElementById('verb-container');
    if (!container) return;
    
    let html = '';
    for (let i = 0; i < verbos.length; i++) {
        const v = verbos[i];
        html += `<div class="verb-card">
            <h3>${escapeHtml(v.n)} <small>(${escapeHtml(v.t)})</small></h3>
            <table>
                <tr><td class="t-label">Present Simple</td><td>${escapeHtml(v.ps)}</td></tr>
                <tr><td class="t-label">Present Cont.</td><td>am/is ${escapeHtml(v.pc)}</td></tr>
                <tr><td class="t-label">Present Perfect</td><td>have/has ${escapeHtml(v.pp)}</td></tr>
                <tr><td class="t-label">Past Simple</td><td>${escapeHtml(v.pas)}</td></tr>
                <tr><td class="t-label">Past Cont.</td><td>was/were ${escapeHtml(v.pc)}</td></tr>
                <tr><td class="t-label">Past Perfect</td><td>had ${escapeHtml(v.pp)}</td></tr>
                <tr><td class="t-label">Future Simple</td><td>${escapeHtml(v.fs)}</td></tr>
                <tr><td class="t-label">Future Perfect</td><td>${escapeHtml(v.fp)}</td></tr>
            </table>
        </div>`;
    }
    container.innerHTML = html;
}

// ============================================
// TEXT-TO-SPEECH
// ============================================

function playText(text) {
    if (!window.speechSynthesis) {
        alert('Tu navegador no soporta reproducción de voz');
        return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    
    const speedInput = document.getElementById('speedRange');
    utterance.rate = speedInput ? parseFloat(speedInput.value) : appSpeed;
    
    window.speechSynthesis.speak(utterance);
}

function play() {
    const textEl = document.getElementById('tts-text');
    if (!textEl || !window.speechSynthesis) return;
    
    window.speechSynthesis.cancel();
    const msg = new SpeechSynthesisUtterance(textEl.innerText);
    msg.lang = 'en-US';
    msg.rate = appSpeed;
    window.speechSynthesis.speak(msg);
}

function changeSpeed(val) {
    appSpeed = parseFloat(val);
    const display = document.getElementById('v-val');
    if (display) display.innerText = appSpeed;
}

// ============================================
// FILTRADO DE VERBOS
// ============================================

function filterVerbs() {
    const searchInput = document.getElementById('search');
    if (!searchInput) return;
    
    const query = searchInput.value.toLowerCase();
    const cards = document.querySelectorAll('.verb-card');
    
    cards.forEach((card) => {
        card.style.display = card.innerText.toLowerCase().includes(query) ? 'block' : 'none';
    });
}

// ============================================
// ACTUALIZACION DE FRASES
// ============================================

function update(type) {
    const buttons = document.querySelectorAll('#nav-bar button');
    buttons.forEach((btn) => {
        btn.classList.remove('active');
    });
    
    const activeBtn = document.getElementById('btn-' + type);
    if (activeBtn) activeBtn.classList.add('active');
    
    const item = phrases[type];
    const display = document.getElementById('phrase-display');
    if (!display || !item) return;
    
    display.innerHTML = `<div class="phrase-card">
        <h2 id="tts-text">${escapeHtml(item.eng)}</h2>
        <p>${escapeHtml(item.spa)}</p>
        <button onclick="play()">🔊 ESCUCHAR AUDIO</button>
    </div>`;
}

// ============================================
// INICIALIZACION DE NAVEGACION DINAMICA
// ============================================

function initNavBar() {
    const nav = document.getElementById('nav-bar');
    if (!nav) return;
    
    let html = '';
    for (let i = 0; i < navItems.length; i++) {
        const item = navItems[i];
        html += `<button onclick="update('${item}')" id="btn-${item}">${item.toUpperCase()}</button>`;
    }
    nav.innerHTML = html;
}

function initExamples() {
    const container = document.getElementById('examples-box');
    if (!container) return;
    
    let html = '';
    for (let i = 0; i < examples.length; i++) {
        const ex = examples[i];
        html += `<div>
            <strong>${escapeHtml(ex.t)}:</strong> ${escapeHtml(ex.e)}<br>
            <small>(${escapeHtml(ex.s)})</small>
        </div>`;
    }
    container.innerHTML = html;
}

// ============================================
// SECCIÓN DE PRONOMBRES - ACORDEÓN
// ============================================

function renderPhraseGrid(containerId, phrasesData) {
    const container = document.getElementById(containerId);
    if (!container) return;
    
    const gridDiv = container.querySelector('.phrase-grid');
    if (!gridDiv) return;
    
    gridDiv.innerHTML = '';
    
    phrasesData.forEach((phrase) => {
        const phraseItem = document.createElement('div');
        phraseItem.className = 'phrase-item';
        const cleanText = phrase.en.replace(/<[^>]*>?/gm, '');
        phraseItem.setAttribute('data-audio', cleanText);
        
        phraseItem.innerHTML = `
            <div class="phrase-english">
                ${phrase.en}
            </div>
            <div class="phrase-spanish">📖 ${phrase.es}</div>
            <button class="phrase-audio-btn" onclick="playPhraseText('${escapeHtml(cleanText)}')">
                🔊 Escuchar pronunciación
            </button>
        `;
        
        phraseItem.addEventListener('click', (e) => {
            if (!e.target.classList.contains('phrase-audio-btn')) {
                const text = phraseItem.getAttribute('data-audio');
                playPhraseText(text);
            }
        });
        
        gridDiv.appendChild(phraseItem);
    });
}

function playPhraseText(text) {
    if (!window.speechSynthesis) {
        alert('Tu navegador no soporta reproducción de voz');
        return;
    }
    
    window.speechSynthesis.cancel();
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = 'en-US';
    utterance.rate = appSpeed;
    window.speechSynthesis.speak(utterance);
}

function initAccordion() {
    const accordionHeaders = document.querySelectorAll('.accordion-header');
    
    accordionHeaders.forEach(header => {
        header.addEventListener('click', () => {
            const category = header.parentElement;
            const isActive = category.classList.contains('active');
            
            document.querySelectorAll('.accordion-category').forEach(item => {
                item.classList.remove('active');
            });
            
            if (!isActive) {
                category.classList.add('active');
            }
        });
    });
    
    const firstCategory = document.querySelector('.accordion-category');
    if (firstCategory) {
        firstCategory.classList.add('active');
    }
}

function initPronounsSection() {
    renderPhraseGrid('object-pronouns', objectPronouns);
    renderPhraseGrid('possessive-pronouns', possessivePronouns);
    renderPhraseGrid('possessive-adjectives', possessiveAdjectives);
    initAccordion();
}

// ============================================
// TARJETAS Y KEYBOARD
// ============================================

function initTarjetas() {
    const tarjetaButtons = document.querySelectorAll('.tarjeta button');
    tarjetaButtons.forEach((btn) => {
        btn.addEventListener('click', (e) => {
            const tarjeta = e.currentTarget.closest('.tarjeta');
            if (tarjeta) {
                const title = tarjeta.querySelector('h3');
                if (title) {
                    alert(`ℹ️ Próximamente: información detallada sobre "${title.textContent}"`);
                }
            }
        });
    });
}

function initKeyboardNavigation() {
    const tabButtons = document.querySelectorAll('.botones button');
    tabButtons.forEach((btn, index) => {
        btn.addEventListener('keydown', (e) => {
            if (e.key === 'ArrowRight') {
                const nextIndex = (index + 1) % tabButtons.length;
                tabButtons[nextIndex].focus();
            } else if (e.key === 'ArrowLeft') {
                const prevIndex = (index - 1 + tabButtons.length) % tabButtons.length;
                tabButtons[prevIndex].focus();
            }
        });
    });
}

// ============================================
// INICIALIZACION PRINCIPAL
// ============================================

function init() {
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
    
    initTheme();
    initNavBar();
    initExamples();
    renderVerbs();
    
    const speedInput = document.getElementById('speedRange');
    const speedVal = document.getElementById('v-val');
    if (speedInput && speedVal) {
        speedInput.value = appSpeed;
        speedVal.innerText = appSpeed;
        speedInput.addEventListener('input', function() {
            appSpeed = parseFloat(this.value);
            speedVal.innerText = appSpeed;
        });
    }
    
    update('afirmativa');
}

// ============================================
// EVENTOS DOMContentLoaded
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    init();
    
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle) themeToggle.addEventListener('click', toggleTheme);
    
    initHamburgerMenu();
    mostrarSeccion('nosotros');
    
    const newsletterForm = document.getElementById('newsletterForm');
    if (newsletterForm) newsletterForm.addEventListener('submit', handleNewsletter);
    
    initTarjetas();
    initKeyboardNavigation();
    
    const pronounContainer = document.getElementById('pronoun-container');
    if (pronounContainer) {
        renderPhraseGrid('pronoun-container', pronounPhrases);
    }
    
    const searchInput = document.getElementById('search');
    if (searchInput) searchInput.addEventListener('input', filterVerbs);
    
    if (document.querySelector('.pronouns-section')) {
        initPronounsSection();
    }
});

// ============================================
// FUNCIONES GLOBALES
// ============================================
window.mostrarSeccion = mostrarSeccion;
window.toggleTheme = toggleTheme;
window.update = update;
window.play = play;
window.changeSpeed = changeSpeed;
window.filterVerbs = filterVerbs;
window.playPhraseText = playPhraseText;
