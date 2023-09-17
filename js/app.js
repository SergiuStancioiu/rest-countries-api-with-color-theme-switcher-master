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
      console.log(`Country Name: ${country.name.common}`);
      console.log(`Capital: ${country.capital}`);
      console.log(`Population: ${country.population}`);
      console.log(`Region: ${country.region}`);
      console.log("---");
    });
  })
  .catch((error) => {
    console.error(error);
  });

const darkModeBtn = document.querySelector(".switcher");

darkModeBtn.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");
});
