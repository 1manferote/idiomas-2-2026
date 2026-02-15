// --- CONFIGURACIÓN DE DATOS INICIALES ---

// Lista de categorías para los botones de navegación superior
const navItems = ['afirmativa', 'negativa', 'interrogativa', 'int-negativa'];

// Diccionario de frases que cambian según el tipo de oración seleccionada
const phrases = {
    afirmativa: { eng: "I still feel it is nice to ask for support.", spa: "Todavía siento que es agradable pedir apoyo." },
    negativa: { eng: "I still don't feel nice when I ask for support.", spa: "Todavía no me siento bien cuando pido apoyo." },
    interrogativa: { eng: "Do you still feel nice when you ask for support?", spa: "¿Todavía te sientes bien cuando pides apoyo?" },
    'int-negativa': { eng: "Don't you feel it is nice to ask for support?", spa: "¿No sientes que es agradable pedir apoyo?" }
};

// Matriz de objetos que contiene la conjugación completa de los verbos más usados
const verbos = [
    { n: "Be", t: "Ser/Estar", ps: "am/is/are", pc: "being", pp: "been", pas: "was/were", pac: "was being", ppe: "had been", fs: "will be", fp: "will have been" },
    { n: "Have", t: "Tener", ps: "have/has", pc: "having", pp: "had", pas: "had", pac: "was having", ppe: "had had", fs: "will have", fp: "will have had" },
    // ... (resto de verbos definidos en la estructura)
];

// Variable global para controlar la velocidad de la voz (0.8 es una velocidad pausada ideal para aprender)
let speed = 0.8;

// --- FUNCIONES DE INICIALIZACIÓN Y RENDERIZADO ---

/**
 * Función principal que se ejecuta al cargar la página.
 * Configura la navegación, renderiza los verbos y carga ejemplos gramaticales.
 */
function init() {
    // 1. Generar botones de navegación: recorre 'navItems' y crea el HTML para cada botón
    const nav = document.getElementById('nav-bar');
    nav.innerHTML = navItems.map(item => `<button onclick="update('${item}')" id="btn-${item}">${item.toUpperCase()}</button>`).join('');
    
    // 2. Dibujar la lista de verbos en pantalla
    renderVerbs();
    
    // 3. Definir y mostrar la caja de ejemplos de tiempos verbales
    const examples = [
        { t: "Present Simple", e: "I understand the plan.", s: "Entiendo el plan." },
        { t: "Present Continuous", e: "He is leaving now.", s: "Él se está yendo ahora." },
        // ... (resto de ejemplos)
    ];
    
    // Inserta los ejemplos en el contenedor correspondiente usando plantillas literales (backticks)
    document.getElementById('examples-box').innerHTML += examples.map(ex => `
    <div>
    <strong>${ex.t}:</strong> ${ex.e} <br> <small>(${ex.s})</small>
    </div>
    `).join('');

    // Iniciar la aplicación mostrando la frase afirmativa por defecto
    update('afirmativa');
}

/**
 * Crea las tarjetas de verbos. Genera una tabla HTML por cada verbo en la lista.
 */
function renderVerbs() {
    document.getElementById('verb-container').innerHTML = verbos.map(v => `
    <div class="verb-card">
    <h3>${v.n} <small>(${v.t})</small></h3>
    <table>
    <tr><td class="t-label">Present Simple</td><td>${v.ps}</td></tr>
    <tr><td class="t-label">Present Cont.</td><td>am/is ${v.pc}</td></tr>
    <tr><td class="t-label">Present Perfect</td><td>have/has ${v.pp}</td></tr>
    <tr><td class="t-label">Past Simple</td><td>${v.pas}</td></tr>
    <tr><td class="t-label">Past Cont.</td><td>was/were ${v.pc}</td></tr>
    <tr><td class="t-label">Past Perfect</td><td>had ${v.pp}</td></tr>
    <tr><td class="t-label">Future Simple</td><td>${v.fs}</td></tr>
    <tr><td class="t-label">Future Perfect</td><td>${v.fp}</td></tr>
    </table>
    </div>
    `).join('');
}

// --- FUNCIONES DE INTERACCIÓN ---

/**
 * Cambia la frase mostrada y resalta el botón activo.
 * @param {string} type - Tipo de oración (afirmativa, negativa, etc.)
 */
function update(type) {
    // Quita la clase 'active' de todos los botones para resetear el diseño
    document.querySelectorAll('#nav-bar button').forEach(b => b.classList.remove('active'));
    // Añade la clase 'active' solo al botón pulsado
    document.getElementById('btn-' + type).classList.add('active');
    
    // Busca la frase correspondiente en el diccionario
    const item = phrases[type];
    // Actualiza el HTML de la pantalla central con la frase y el botón de audio
    document.getElementById('phrase-display').innerHTML = `
    <div class="phrase-card">
    <h2 id="tts-text">${item.eng}</h2>
    <p>${item.spa}</p>
    <button onclick="play()">🔊 ESCUCHAR AUDIO</button>
    </div>
    `;
}

/**
 * Motor de Voz (Text-To-Speech). 
 * Utiliza la API nativa del navegador para leer el texto en inglés.
 */
function play() {
    // Cancela cualquier audio que se esté reproduciendo actualmente para evitar solapamientos
    window.speechSynthesis.cancel();
    
    // Crea una nueva instancia de mensaje con el texto del elemento 'tts-text'
    const msg = new SpeechSynthesisUtterance(document.getElementById('tts-text').innerText);
    
    msg.lang = 'en-US'; // Establece el idioma en inglés de Estados Unidos
    msg.rate = speed;   // Establece la velocidad configurada por el usuario
    
    // Ejecuta la reproducción de voz
    window.speechSynthesis.speak(msg);
}

/**
 * Actualiza la velocidad del audio según el valor del input range.
 */
function changeSpeed(val) {
    speed = val; // Actualiza la variable de velocidad
    document.getElementById('v-val').innerText = val; // Muestra el número en pantalla
}

/**
 * Buscador de verbos en tiempo real.
 */
function filter() {
    // Obtiene el texto de búsqueda en minúsculas
    const q = document.getElementById('search').value.toLowerCase();
    
    // Recorre todas las tarjetas de verbos creadas
    document.querySelectorAll('.verb-card').forEach(c => {
        // Si el contenido de la tarjeta incluye el texto buscado, la muestra; si no, la oculta
        c.style.display = c.innerText.toLowerCase().includes(q) ? "block" : "none";
    });
}

/**
 * Selector de tema (Claro / Oscuro).
 * Modifica el atributo 'data-theme' en el body para que el CSS cambie los colores.
 */
function toggleTheme() {
    const b = document.body;
    // Intercambia el valor entre 'dark' y 'light'
    b.setAttribute('data-theme', b.getAttribute('data-theme') === 'dark' ? 'light' : 'dark');
}

// Vincula la función de inicio al evento de carga total de la ventana
window.onload = init;