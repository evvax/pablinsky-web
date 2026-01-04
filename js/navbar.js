// Seleccionamos todos los dots y todas las secciones
const dots = document.querySelectorAll('.navbar-flotante a.dot');
const sections = document.querySelectorAll('section');

// Función para mostrar solo una sección
function showSection(sectionId) {
  sections.forEach(sec => sec.classList.add('section-hidden'));

  const target = document.getElementById(sectionId);
  if (!target) return;

  target.classList.remove('section-hidden');

  // Restaurar display según el tamaño de pantalla
  if (window.innerWidth >= 1024) {
    target.style.display = 'flex'; // desktop → flex
  } else {
    target.style.display = 'block'; // móvil → vertical
  }
}

// Inicial: mostrar solo section1
showSection('section1');

// Inicial: activar el primer dot
dots.forEach((dot, i) => {
  dot.classList.toggle('active', i === 0);
});

// Evento click en cada dot
dots.forEach(dot => {
  dot.addEventListener('click', e => {
    e.preventDefault();
    const targetId = dot.getAttribute('data-section');
    showSection(targetId);

    // Actualizar clases active
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

// Opcional: actualizar display al redimensionar la ventana
window.addEventListener('resize', () => {
  sections.forEach(sec => {
    if (!sec.classList.contains('section-hidden')) {
      if (window.innerWidth >= 1024) sec.style.display = 'flex';
      else sec.style.display = 'block';
    }
  });
});
