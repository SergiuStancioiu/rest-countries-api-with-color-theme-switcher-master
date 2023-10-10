function enableDarkMode() {
  const darkModeBtn = document.querySelector(".switcher");

  darkModeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
  });
}

enableDarkMode();
