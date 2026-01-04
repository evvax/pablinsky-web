// Like
document.querySelectorAll('.tiktok-ui i.fa-heart').forEach(heart => {
  heart.addEventListener('click', () => {
    heart.classList.toggle('liked');
    heart.classList.add('animated-like');
    setTimeout(() => { heart.classList.remove('animated-like'); }, 300);

    if (heart.classList.contains('liked')) {
      // Añadir glow temporal
      heart.classList.add('glow-temp');
      setTimeout(() => {
        heart.classList.add('no-glow'); // activa la transición
      }, 1500);

      setTimeout(() => {
        heart.classList.remove('glow-temp', 'no-glow');
      }, 2000);
    }
  });
});


// Guardar
document.querySelectorAll('.tiktok-ui i.fa-bookmark').forEach(save => {
  save.addEventListener('click', () => {
    save.classList.toggle('saved');
    save.classList.add('animated-like');
    setTimeout(() => { save.classList.remove('animated-like'); }, 300);

    if (save.classList.contains('saved')) {
      // Añadir glow temporal
      save.classList.add('glow-temp');
      setTimeout(() => {
        save.classList.add('no-glow'); // activa transición
      }, 1500);

      setTimeout(() => {
        save.classList.remove('glow-temp', 'no-glow');
      }, 2000);
    }
  });
});

// Doble-tap para like + corazón grande
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('dblclick', () => {
    const heart = box.querySelector('.tiktok-ui i.fa-heart');
    if (heart) {
      if (heart.classList.contains('liked')) {
        // 👇 Si ya está activo, lo desactiva
        heart.classList.remove('liked', 'glow-temp', 'no-glow');

        // Big heart BLANCO
        const bigHeart = document.createElement('i');
        bigHeart.classList.add('fas', 'fa-heart', 'big-heart');
        bigHeart.style.color = 'rgba(255,255,255,0.9)'; // blanco
        box.appendChild(bigHeart);
        setTimeout(() => bigHeart.remove(), 800);

      } else {
        // 👇 Si no está activo, lo activa
        heart.classList.add('liked', 'animated-like');
        setTimeout(() => heart.classList.remove('animated-like'), 300);

        // Glow temporal
        heart.classList.add('glow-temp');
        setTimeout(() => {
          heart.classList.add('no-glow'); // fade out
        }, 1500);

        setTimeout(() => {
          heart.classList.remove('glow-temp', 'no-glow');
        }, 2000);

        // Big heart ROJO
        const bigHeart = document.createElement('i');
        bigHeart.classList.add('fas', 'fa-heart', 'big-heart');
        bigHeart.style.color = 'rgba(255,0,0,0.9)'; // rojo
        box.appendChild(bigHeart);
        setTimeout(() => bigHeart.remove(), 800);
      }
    }
  });
});


const container = document.getElementById('scroll2');

let targetScroll = 0;
let currentScroll = 0;
let isAnimating = false;

function animateScroll() {
  if (!isAnimating) return;

  currentScroll += (targetScroll - currentScroll) * 0.08;
  container.scrollLeft = currentScroll;

  if (Math.abs(targetScroll - currentScroll) < 0.5) {
    container.scrollLeft = targetScroll;
    isAnimating = false;
    return;
  }

  requestAnimationFrame(animateScroll);
}

window.addEventListener("wheel", (e) => {
  const rect = container.getBoundingClientRect();
  const visibleHeight = Math.min(rect.bottom, window.innerHeight) - Math.max(rect.top, 0);
  const visiblePercentage = visibleHeight / rect.height;

  const maxScrollLeft = container.scrollWidth - container.clientWidth;
  const atStart = container.scrollLeft <= 1;
  const atEnd = container.scrollLeft >= maxScrollLeft - 1;

  const isScrollingDown = e.deltaY > 0;
  const entryThreshold = 1;

  // Engancha horizontal solo al entrar según dirección
  const shouldEngage =
    (isScrollingDown && visiblePercentage >= entryThreshold) ||
    (!isScrollingDown && visiblePercentage >= entryThreshold) ||
    isAnimating;

  if (shouldEngage && !((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd))) {
    e.preventDefault();

    // Actualizar destino solo si todavía estamos dentro del umbral
    if (visiblePercentage >= entryThreshold) {
      targetScroll += e.deltaY * 1.2;
      targetScroll = Math.max(0, Math.min(maxScrollLeft, targetScroll));
    }

    if (!isAnimating) {
      isAnimating = true;
      currentScroll = container.scrollLeft;
      requestAnimationFrame(animateScroll);
    }
  }
  // Si visiblePercentage < 0.6 y no hay animación, el scroll vertical pasa instantáneo
}, { passive: false });
