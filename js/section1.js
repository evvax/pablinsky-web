// Like icon
document.querySelectorAll('.tiktok-ui i.fa-heart').forEach(heart => {
  heart.addEventListener('click', () => {
    heart.classList.toggle('liked');
    heart.classList.add('animated-like');
    setTimeout(() => { heart.classList.remove('animated-like'); }, 300);

    if (heart.classList.contains('liked')) {
      // Add temp glow
      heart.classList.add('glow-temp');
      setTimeout(() => {
        heart.classList.add('no-glow'); // activate transition
      }, 1500);

      setTimeout(() => {
        heart.classList.remove('glow-temp', 'no-glow');
      }, 2000);
    }
  });
});


// Save icon
document.querySelectorAll('.tiktok-ui i.fa-bookmark').forEach(save => {
  save.addEventListener('click', () => {
    save.classList.toggle('saved');
    save.classList.add('animated-like');
    setTimeout(() => { save.classList.remove('animated-like'); }, 300);

    if (save.classList.contains('saved')) {
      // Add temp glow
      save.classList.add('glow-temp');
      setTimeout(() => {
        save.classList.add('no-glow'); // activate transition
      }, 1500);

      setTimeout(() => {
        save.classList.remove('glow-temp', 'no-glow');
      }, 2000);
    }
  });
});

// Doble-tap like & heart
document.querySelectorAll('.box').forEach(box => {
  box.addEventListener('dblclick', () => {
    const heart = box.querySelector('.tiktok-ui i.fa-heart');
    if (heart) {
      if (heart.classList.contains('liked')) {
        // If it's open, will disable it
        heart.classList.remove('liked', 'glow-temp', 'no-glow');

        // Big heart white
        const bigHeart = document.createElement('i');
        bigHeart.classList.add('fas', 'fa-heart', 'big-heart');
        bigHeart.style.color = 'rgba(255,255,255,0.9)'; // white
        box.appendChild(bigHeart);
        setTimeout(() => bigHeart.remove(), 800);

      } else {
        // If not active, will be activate
        heart.classList.add('liked', 'animated-like');
        setTimeout(() => heart.classList.remove('animated-like'), 300);

        // Temp glow
        heart.classList.add('glow-temp');
        setTimeout(() => {
          heart.classList.add('no-glow'); // fade out
        }, 1500);

        setTimeout(() => {
          heart.classList.remove('glow-temp', 'no-glow');
        }, 2000);

        // Big heart red
        const bigHeart = document.createElement('i');
        bigHeart.classList.add('fas', 'fa-heart', 'big-heart');
        bigHeart.style.color = 'rgba(255,0,0,0.9)'; // red
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

  // Horizontal engage only to enter based in direction
  const shouldEngage =
    (isScrollingDown && visiblePercentage >= entryThreshold) ||
    (!isScrollingDown && visiblePercentage >= entryThreshold) ||
    isAnimating;

  if (shouldEngage && !((e.deltaY < 0 && atStart) || (e.deltaY > 0 && atEnd))) {
    e.preventDefault();

    // Update traget if we're not into the percentage
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
  // If visiblePercentage < 0.6 & no animation, scroll will be inst
}, { passive: false });
