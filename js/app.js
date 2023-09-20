const apiUrl = "https://restcountries.com/v3.1/all";

fetch(apiUrl)
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error(`Error: ${response.status}`);
    }
  })
  .then((data) => {
    data.forEach((country) => {
      const container = document.querySelector(".countries-container");
      const template = document.querySelector("#country-template");

      let cloneTemplate = template.content.cloneNode(true);

      cloneTemplate.querySelector(".country-flag").textContent = country.flag;

      cloneTemplate.querySelector(".country-heading").textContent =
        country.name.common;

      cloneTemplate.querySelector(".population").textContent =
        country.population;

      cloneTemplate.querySelector(".region").textContent = country.region;

      cloneTemplate.querySelector(".capital").textContent = country.capital;

      container.appendChild(cloneTemplate);
    });
  })
  .catch((error) => {
    console.error(error);
  });

const darkModeBtn = document.querySelector(".switcher");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
