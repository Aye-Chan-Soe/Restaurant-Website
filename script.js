document.addEventListener("DOMContentLoaded", function () {
  const toggleDarkModeBtn = document.getElementById("toggleDarkMode");
  const body = document.body;

  toggleDarkModeBtn.addEventListener("click", function () {
    body.classList.toggle("dark-mode");

    // Toggle between moon and sun icons
    const moonIcon = document.querySelector(".bi-moon-stars-fill");
    const sunIcon = document.querySelector(".bi-sun");
    const cartIcon = document.querySelector(".bi-cart");
    const personIcon = document.querySelector(".bi-person");

    if (body.classList.contains("dark-mode")) {
      // Dark mode is active, show sun icon
      moonIcon.style.display = "none";
      sunIcon.style.display = "inline";
      sunIcon.style.color = "#fff";
      cartIcon.style.color = "#fff";
      personIcon.style.color = "#fff";
    } else {
      // Dark mode is not active, show moon icon
      moonIcon.style.display = "inline";
      sunIcon.style.display = "none";
      cartIcon.style.color = "#000";
      personIcon.style.color = "#000";
    }
  });
});
