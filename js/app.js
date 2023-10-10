document.addEventListener("DOMContentLoaded", () => {
  const searchInput = document.querySelector(".search");
  const regionSelect = document.querySelector(".region");

  regionSelect.addEventListener("change", regionSelectOnChange);
  searchInput.addEventListener("keyup", searchInputOnKeyUp);

  fetchAllData();
});

function fetchData(apiUrl) {
  fetch(apiUrl)
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Error: ${response.status}`);
      }
    })
    .then((data) => {
      populateCountries(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function populateCountries(data) {
  const container = document.querySelector(".countries-container");
  const template = document.querySelector("#country-template");

  container.innerHTML = "";

  data.forEach((country) => {
    const cloneTemplate = template.content.cloneNode(true);
    cloneTemplate.querySelector(".country-flag").textContent = country.flag;
    cloneTemplate.querySelector(".country-heading").textContent =
      country.name.common;
    cloneTemplate.querySelector(".population").textContent = country.population;
    cloneTemplate.querySelector(".region").textContent = country.region;
    cloneTemplate.querySelector(".capital").textContent = country.capital;

    container.appendChild(cloneTemplate);
  });
}

function searchInputOnKeyUp(event) {
  const baseURL = "https://restcountries.com/v3.1/";
  const urlFields = ["flag", "name", "population", "region", "capital"];

  let searchedCountry = event.target.value;
  if (searchedCountry == "") {
    fetchAllData();
    return false;
  }
  const apiUrl = new URL(`name/${searchedCountry}`, baseURL);
  apiUrl.searchParams.set("fields", urlFields);

  fetchData(apiUrl);
}

function regionSelectOnChange(event) {
  const baseURL = "https://restcountries.com/v3.1/";
  const urlFields = ["flag", "name", "population", "region", "capital"];

  let selectedRegion = event.target.value;
  if (selectedRegion == "All") {
    fetchAllData();
    return false;
  }
  const apiUrl = new URL(`region/${selectedRegion}`, baseURL);
  apiUrl.searchParams.set("fields", urlFields);

  fetchData(apiUrl);
}

function fetchAllData() {
  const baseURL = "https://restcountries.com/v3.1/";
  const urlFields = ["flag", "name", "population", "region", "capital"];
  const apiUrl = new URL("all", baseURL);
  apiUrl.searchParams.set("fields", urlFields);

  fetchData(apiUrl);
}
