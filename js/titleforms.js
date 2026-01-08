const titleElement = document.getElementById('form-title');
const titles = ['REGISTRO MERCH', 'FILTRO GRATIS'];
let index = 0;

// Optional: if element does not exist, make a warning & not execute
if (!titleElement) {
  console.error("No se encontró el elemento #form-title");
} else {
  // Make sure the initial text matchs
  titleElement.textContent = titles[index];

  setInterval(() => {
    index = (index + 1) % titles.length;
    titleElement.textContent = titles[index];
  }, 3000);
}
