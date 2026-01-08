// Selecting every dots and sections
const dots = document.querySelectorAll('.navbar-flotante a.dot');
const sections = document.querySelectorAll('section');

// Function to show only one section
function showSection(sectionId) {
  sections.forEach(sec => sec.classList.add('section-hidden'));

  const target = document.getElementById(sectionId);
  if (!target) return;

  target.classList.remove('section-hidden');

  // Restore display based on screensize
  if (window.innerWidth >= 1024) {
    target.style.display = 'flex'; // desktop → flex
  } else {
    target.style.display = 'block'; // mobile → vertical
  }
}

// Fist: only show section one
showSection('section1');

// First: activate first dot
dots.forEach((dot, i) => {
  dot.classList.toggle('active', i === 0);
});

// Click event on every dot
dots.forEach(dot => {
  dot.addEventListener('click', e => {
    e.preventDefault();
    const targetId = dot.getAttribute('data-section');
    showSection(targetId);

    // Update active classes
    dots.forEach(d => d.classList.remove('active'));
    dot.classList.add('active');
  });
});

// Optional: update display when resizing window
window.addEventListener('resize', () => {
  sections.forEach(sec => {
    if (!sec.classList.contains('section-hidden')) {
      if (window.innerWidth >= 1024) sec.style.display = 'flex';
      else sec.style.display = 'block';
    }
  });
});
