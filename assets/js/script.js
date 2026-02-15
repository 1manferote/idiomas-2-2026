// 1. Año dinámico
// Busca el elemento con ID 'currentYear' y escribe el año actual automáticamente
document.getElementById('currentYear').textContent = new Date().getFullYear();
    
// 2. Gestión de tema (con persistencia y detección del sistema)
function initTheme() {
    // Intenta obtener el tema guardado en el navegador del usuario
    const saved = localStorage.getItem('theme');
    // Pregunta al navegador si el sistema operativo del usuario usa modo oscuro
    const systemPrefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    // Prioridad: 1. Guardado anterior, 2. Preferencia del sistema, 3. 'light' por defecto
    const theme = saved || (systemPrefersDark ? 'dark' : 'light');
    
    // Aplica el tema al atributo data-theme de la etiqueta <html>
    document.documentElement.setAttribute('data-theme', theme);
    // Actualiza el dibujo del sol o la luna
    updateThemeIcon(theme);
}

function toggleTheme() {
    // Obtiene el tema que está puesto ahora mismo
    const current = document.documentElement.getAttribute('data-theme');
    // Intercambia: si es oscuro pone claro, y viceversa
    const newTheme = current === 'dark' ? 'light' : 'dark';
    
    // Aplica el nuevo tema a la web
    document.documentElement.setAttribute('data-theme', newTheme);
    // Guarda la elección en el navegador para que no se pierda al recargar
    localStorage.setItem('theme', newTheme);
    // Cambia el sol por la luna o viceversa
    updateThemeIcon(newTheme);
}

function updateThemeIcon(theme) {
    // Busca el icono dentro del botón de cambio de tema
    const icon = document.querySelector('#themeToggle span');
    // Si el tema es oscuro pone el sol (para volver a luz), si es claro pone la luna
    icon.textContent = theme === 'dark' ? '☀️' : '🌙';
}

// 3. Sistema de pestañas (Tabs) robusto y accesible
function mostrarSeccion(id) {
    // Ocultar todas las secciones primero
    document.querySelectorAll('.seccion').forEach(sec => {
        sec.classList.remove('visible');          // Quita la visibilidad visual
        sec.setAttribute('aria-hidden', 'true');  // Indica a lectores de pantalla que está oculta
    });

    // Desactivar todos los botones de la barra de pestañas
    document.querySelectorAll('.botones button').forEach(btn => {
        btn.classList.remove('active');           // Quita el color azul de resaltado
        btn.setAttribute('aria-selected', 'false'); // Indica que no está seleccionado
    });

    // Mostrar la sección específica que el usuario ha pedido
    const target = document.getElementById(id);
    if (target) {
        target.classList.add('visible');          // Activa la clase que la hace aparecer
        target.setAttribute('aria-hidden', 'false'); // Indica que ahora es visible
    }

    // Activar el botón correspondiente (Genera el ID del botón dinámicamente, ej: 'btnNosotros')
    const btnId = `btn${id.charAt(0).toUpperCase()}${id.slice(1)}`;
    const activeBtn = document.getElementById(btnId);
    if (activeBtn) {
        activeBtn.classList.add('active');        // Resalta el botón en azul
        activeBtn.setAttribute('aria-selected', 'true'); // Atributo de accesibilidad
    }

    // Actualizar los enlaces del menú principal (nav)
    document.querySelectorAll('nav a').forEach(link => link.removeAttribute('aria-current'));
    // Busca cuál de los enlaces del menú coincide con la sección abierta
    const currentLink = [...document.querySelectorAll('nav a')].find(link => 
        link.getAttribute('onclick')?.includes(`'${id}'`)
    );
    // Si encuentra el enlace, le marca como la página actual para accesibilidad
    if (currentLink) currentLink.setAttribute('aria-current', 'page');
}

// 4. Validación de newsletter mejorada (Seguridad básica)
function handleNewsletter(e) {
    e.preventDefault(); // Evita que la página se recargue al pulsar el botón
    const email = document.getElementById('email').value.trim(); // Obtiene el email y quita espacios
    // Expresión regular para comprobar que el email tiene un formato válido (algo@algo.com)
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    
    // Si el formato no es válido, lanza un aviso y para el proceso
    if (!regex.test(email)) {
        alert('📧 Por favor, introduce un email válido');
        return;
    }
    
    // Si es válido, simula el envío
    const btn = e.target.querySelector('button');
    const original = btn.textContent;             // Guarda el texto original del botón
    btn.disabled = true;                          // Desactiva el botón para evitar múltiples clics
    btn.textContent = 'Enviando...';              // Feedback visual al usuario
    
    // Simula una espera de servidor de 0.8 segundos
    setTimeout(() => {
        alert(`✅ ¡Gracias por suscribirte!\nRecibirás novedades en: ${email}`);
        e.target.reset();                         // Borra el formulario
        btn.disabled = false;                     // Reactiva el botón
        btn.textContent = original;               // Devuelve el texto original
    }, 800);
}

// 5. Inicialización de la página
// Espera a que todo el HTML esté cargado antes de ejecutar la lógica
document.addEventListener('DOMContentLoaded', () => {
    // Configura el tema inicial (Claro/Oscuro)
    initTheme();
    // Añade el "escuchador" al botón para que cambie el tema al hacer clic
    document.getElementById('themeToggle').addEventListener('click', toggleTheme);
    
    // Abre la sección "Nosotros" por defecto al entrar a la web
    mostrarSeccion('nosotros');
    
    // Conecta la validación al formulario de suscripción
    document.getElementById('newsletterForm').addEventListener('submit', handleNewsletter);
    
    // Añade funcionalidad a todos los botones de las tarjetas
    document.querySelectorAll('.tarjeta button').forEach(btn => {
        btn.addEventListener('click', e => {
            // Busca el título H3 más cercano dentro de la tarjeta pulsada
            const title = e.currentTarget.closest('.tarjeta').querySelector('h3').textContent;
            // Lanza un aviso personalizado con el nombre del curso/servicio
            alert(`ℹ️ Próximamente: información detallada sobre "${title}"`);
        });
    });
    
    // Accesibilidad: Navegación por teclado en las pestañas (flechas izquierda/derecha)
    document.querySelectorAll('.botones button').forEach((btn, i, all) => {
        btn.addEventListener('keydown', e => {
            if (e.key === 'ArrowRight') {
                // Si pulsa flecha derecha, salta al siguiente botón
                all[(i + 1) % all.length].focus();
            } else if (e.key === 'ArrowLeft') {
                // Si pulsa izquierda, vuelve al anterior
                all[(i - 1 + all.length) % all.length].focus();
            }
        });
    });
});