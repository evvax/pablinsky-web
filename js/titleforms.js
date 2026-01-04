const titleElement = document.getElementById('form-title');
const titles = ['REGISTRO MERCH', 'FILTRO GRATIS'];
let index = 0;

// opcional: si el elemento no existe, lo avisamos y no ejecutamos el intervalo
if (!titleElement) {
  console.error("No se encontró el elemento #form-title");
} else {
  // asegurar que el texto inicial coincide
  titleElement.textContent = titles[index];

  setInterval(() => {
    index = (index + 1) % titles.length;
    titleElement.textContent = titles[index];
  }, 3000);
}
