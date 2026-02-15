/* =========================================================
   1. DATOS UNIFICADOS (MODELOS DE DATOS)
   ========================================================= */
// Array de objetos para los ejercicios de pronombres. 
// Usamos HTML en 'en' para resaltar visualmente la palabra clave.
const pronounPhrases = [
    { en: "She loves <span class='highlight'>me</span>.", es: "Ella me ama." },
    { en: "I call <span class='highlight'>you</span> every day.", es: "Yo te llamo todos los días." },
    { en: "He doesn't know <span class='highlight'>her</span>.", es: "Él no la conoce." },
    { en: "We saw <span class='highlight'>him</span> at the park.", es: "Nosotros lo vimos en el parque." },
    { en: "They invited <span class='highlight'>us</span> to the party.", es: "Ellos nos invitaron a la fiesta." },
    { en: "Can you help <span class='highlight'>them</span>?", es: "¿Puedes ayudarlos?" },
    { en: "Our clients trust <span class='highlight'>us</span> for gas services.", es: "Nuestros clientes confían en nosotros." },
    { en: "We provide <span class='highlight'>them</span> with maintenance.", es: "Nosotros les brindamos mantenimiento." },
    { en: "This car is <span class='highlight'>mine</span>.", es: "Este coche es mío." },
    { en: "Is this jacket <span class='highlight'>yours</span>?", es: "¿Esta chaqueta es tuya?" },
    { en: "That notebook is <span class='highlight'>his</span>.", es: "Ese cuaderno es de él." },
    { en: "The blue bag is <span class='highlight'>hers</span>.", es: "La bolsa azul es de ella." },
    { en: "The victory is <span class='highlight'>ours</span>.", es: "La victoria es nuestra." },
    { en: "Those seats are <span class='highlight'>theirs</span>.", es: "Esos asientos son suyos." },
    { en: "This safety certification is <span class='highlight'>ours</span>.", es: "Esta certificación de seguridad es nuestra." },
    { en: "The responsibility for the project is <span class='highlight'>theirs</span>.", es: "La responsabilidad del proyecto es de ellos." },
    { en: "The company protects <span class='highlight'>it</span> (the facility).", es: "La empresa la protege (la instalación)." },
    { en: "You can contact <span class='highlight'>him</span> for emergency repairs.", es: "Puedes contactarlo a él para reparaciones de emergencia." },
    { en: "The decision to install the system was <span class='highlight'>hers</span>.", es: "La decisión de instalar el sistema fue de ella." }
];

// Array de objetos para frases de práctica general
const techPhrases = [
    { en: "You write a book.", es: "Tú escribes un libro." },
    { en: "My father doesn´t work with my mother.", es: "Mi padre no trabaja con mi madre." },
    { en: "We dance reggaeton and salsa with our friends.", es: "Nosotros bailamos reggaetón y salsa con nuestros amigos." }
];

/* =========================================================
   2. CONFIGURACIÓN INICIAL DE AUDIO
   ========================================================= */
// Acceso a la API de síntesis de voz del navegador
const synth = window.speechSynthesis;
// Referencia al control deslizante (input range) para la velocidad
const speedInput = document.getElementById('speedRange');
// Referencia al texto que muestra el valor numérico de la velocidad
const speedVal = document.getElementById('v-val');

/* =========================================================
   3. FUNCIÓN DE RENDERIZADO (DIBUJAR EN HTML)
   ========================================================= */
/**
 * @param {Array} data - El array de frases a dibujar
 * @param {string} containerId - El ID del elemento HTML donde se insertarán
 */
function renderPhrases(data, containerId) {
    const container = document.getElementById(containerId);
    if (!container) return; // Si el ID no existe en el HTML, cancelamos la función
    
    container.innerHTML = ''; // Limpiamos el contenido previo para evitar duplicados

    data.forEach(item => {
        const card = document.createElement('div'); // Creamos un contenedor div
        card.className = 'pronoun-card'; // Le asignamos la clase CSS para el diseño de tarjeta
        
        // CORRECCIÓN: Para el lector de voz, eliminamos etiquetas HTML (<span>) 
        // y escapamos comillas para evitar errores en el atributo 'onclick'
        const cleanText = item.en.replace(/<[^>]*>?/gm, '').replace(/'/g, "&apos;");
        
        // Insertamos la estructura interna de la tarjeta
        card.innerHTML = `
            <div>
                <p class="en-text">${item.en}</p> 
                <p class="es-text">${item.es}</p>
            </div>
            <button class="btn-audio" onclick="playText('${cleanText}')">▶️ Escuchar</button>
        `;
        container.appendChild(card); // Añadimos la tarjeta al contenedor principal
    });
}

/* =========================================================
   4. FUNCIÓN DE AUDIO (VOZ)
   ========================================================= */
/**
 * @param {string} text - El texto que el navegador debe leer
 */
function playText(text) {
    synth.cancel(); // Cancelamos cualquier audio en curso para que no se amontonen
    const utterance = new SpeechSynthesisUtterance(text); // Creamos la instancia de "emisión de voz"
    utterance.lang = 'en-US'; // Configuramos el idioma como Inglés de Estados Unidos
    
    // Obtenemos la velocidad del input range. Si no existe, usamos 0.8 por defecto
    utterance.rate = (speedInput) ? parseFloat(speedInput.value) : 0.8;
    
    synth.speak(utterance); // El navegador comienza a hablar
}

/* =========================================================
   5. NAVEGACIÓN ENTRE SECCIONES (TABS)
   ========================================================= */
/**
 * @param {string} id - El ID de la sección que queremos mostrar
 */
function mostrarSeccion(id) {
    // Ocultamos todas las secciones quitando la clase 'visible'
    document.querySelectorAll('.seccion').forEach(s => s.classList.remove('visible'));
    
    // Buscamos la sección destino y le añadimos la clase 'visible' (CSS controlará la opacidad)
    const target = document.getElementById(id);
    if (target) target.classList.add('visible');

    // Manejo de los botones: quitamos 'active' de todos los botones superiores
    document.querySelectorAll('.botones button').forEach(b => b.classList.remove('active'));
    
    // Creamos dinámicamente el ID del botón (ej: 'btn' + 'Nosotros' = 'btnNosotros')
    const activeBtn = document.getElementById('btn' + id.charAt(0).toUpperCase() + id.slice(1));
    if (activeBtn) activeBtn.classList.add('active'); // Marcamos el botón como activo visualmente
}

/* =========================================================
   6. FUNCIÓN DE CAMBIO DE TEMA OSCURO/CLARO
   ========================================================= */
function toggleTheme() {
    const html = document.documentElement;
    const currentTheme = html.getAttribute('data-theme');
    const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
    
    html.setAttribute('data-theme', newTheme);
    localStorage.setItem('theme', newTheme);
}

/* =========================================================
   7. INICIALIZACIÓN (CUANDO CARGA EL DOCUMENTO)
   ========================================================= */
document.addEventListener('DOMContentLoaded', () => {
    /* --- CAMBIO DE TEMA: Restaurar preferencia guardada --- */
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
        document.documentElement.setAttribute('data-theme', savedTheme);
    } else {
        // Si no hay preferencia guardada, detectar preferencia del sistema
        const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (prefersDark) {
            document.documentElement.setAttribute('data-theme', 'dark');
        }
    }
    
    /* --- CAMBIO DE TEMA: Evento del botón toggle --- */
    const themeToggle = document.querySelector('.theme-toggle');
    if (themeToggle) {
        themeToggle.addEventListener('click', toggleTheme);
    }

    /* --- RENDERIZADO DE CONTENIDO --- */
    // Renderiza los pronombres en su contenedor
    renderPhrases(pronounPhrases, 'pronoun-container');
    
    // Renderiza las frases técnicas en 'tech-container'
    renderPhrases(techPhrases, 'tech-container');
    
    /* --- SLIDER DE VELOCIDAD DE AUDIO --- */
    if (speedInput && speedVal) {
        // Sincronizar valor inicial
        speedVal.innerText = speedInput.value;
        
        // Actualizar valor al mover el slider
        speedInput.oninput = () => {
            speedVal.innerText = speedInput.value;
        };
    }

    /* --- COPYRIGHT --- */
    const yearSpan = document.getElementById('currentYear');
    if (yearSpan) yearSpan.textContent = new Date().getFullYear();
});

