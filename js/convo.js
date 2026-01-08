document.addEventListener("DOMContentLoaded", () => {
  const customSelects = document.querySelectorAll(".custom-select");

  customSelects.forEach((select) => {
    const selected = select.querySelector(".selected");
    const optionsContainer = select.querySelector(".options");
    const hiddenInput = select.nextElementSibling; // tu input hidden

    // Open/close dropdown
    selected.addEventListener("click", () => {
      optionsContainer.style.display = optionsContainer.style.display === "flex" ? "none" : "flex";
      optionsContainer.style.flexDirection = "column";
    });

    // Select an option
    optionsContainer.querySelectorAll("div").forEach((option) => {
      option.addEventListener("click", () => {
        selected.textContent = option.textContent;
        hiddenInput.value = option.dataset.value;
        optionsContainer.style.display = "none";
      });
    });

    // Close dropdown if you click outside
    document.addEventListener("click", (e) => {
      if (!select.contains(e.target)) {
        optionsContainer.style.display = "none";
      }
    });
  });
});
