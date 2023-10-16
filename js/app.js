document.addEventListener("DOMContentLoaded", () => {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);
  const countryParam = urlParams.get("country");

  if (countryParam === null || countryParam.trim() === "") {
    loadAllCountries();
  } else {
    loadASingleCountry(countryParam);
  }
});

function loadASingleCountry(country) {
  const searchRegionWrapper = document.querySelector(".search-region");
  searchRegionWrapper.classList.add("hidden");

  const baseURL = "https://restcountries.com/v3.1/";
  const urlFields = [
    "flag",
    "name",
    "population",
    "region",
    "capital",
    "currencies",
    "subregion",
    "languages",
    "tld",
    "borders",
  ];
  const apiUrl = new URL(`name/${country}`, baseURL);
  apiUrl.searchParams.set("fields", urlFields);

  fetch(apiUrl)
    .then((response) => response.json())
    .then((data) => {
      populateCountry(data);
    })
    .catch((error) => {
      console.error(error);
    });
}

function populateCountry(data) {
  const countryData = data[0];
  const container = document.querySelector(".countries-container");
  const borderCountryTemplate = document.querySelector(
    "#border-country-template"
  );
  const template = document.querySelector("#single-country-template");
  const nativeName = countryData.name.nativeName;
  let languagesArray = [];
  let languagesString = "";
  let currenciesArray = [];
  let currenciesString = "";
  let topLevelDomains = countryData.tld.join(",");
  let nativeNameOfficial = "";

  for (nameItem in nativeName) {
    nativeNameOfficial = nativeName[nameItem].official;
  }

  for (currencyItem in countryData.currencies) {
    currenciesArray.push(countryData.currencies[currencyItem].name);
  }
  currenciesString = currenciesArray.join(",");

  for (languageItem in countryData.languages) {
    languagesArray.push(countryData.languages[languageItem]);
  }
  languagesString = languagesArray.join(",");

  container.innerHTML = "";
  const cloneTemplate = template.content.cloneNode(true);

  cloneTemplate.querySelector(".country-flag").textContent = countryData.flag;
  cloneTemplate.querySelector(".country-heading-title").textContent =
    countryData.name.official;
  cloneTemplate.querySelector(".native-name").textContent = nativeNameOfficial;
  cloneTemplate.querySelector(".population").textContent =
    countryData.population;
  cloneTemplate.querySelector(".sub-region").textContent =
    countryData.subregion;
  cloneTemplate.querySelector(".capital").textContent = countryData.capital;
  cloneTemplate.querySelector(".region").textContent = countryData.region;
  cloneTemplate.querySelector(".top-level-domain").textContent =
    topLevelDomains;
  cloneTemplate.querySelector(".currency").textContent = currenciesString;
  cloneTemplate.querySelector(".languages").textContent = languagesString;
  cloneTemplate.querySelector(".borders-wrap").innerHTML = "";

  countryData.borders.forEach((border) => {
    const cloneBorderCountryTemplate =
      borderCountryTemplate.content.cloneNode(true);
    cloneBorderCountryTemplate.querySelector(".country").textContent = border;

    cloneTemplate
      .querySelector(".borders-wrap")
      .appendChild(cloneBorderCountryTemplate);
  });

  container.appendChild(cloneTemplate);
}

function loadAllCountries() {
  const searchRegionWrapper = document.querySelector(".search-region");
  const searchInput = document.querySelector(".search");
  const regionSelect = document.querySelector(".region");

  searchRegionWrapper.classList.remove("hidden");
  regionSelect.addEventListener("change", regionSelectOnChange);
  searchInput.addEventListener("keyup", searchInputOnKeyUp);

  fetchAllData();
}

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
    // create url for every single country
    const currentUrl = `${window.location.protocol}//${window.location.host}${window.location.pathname}`;
    const countryUrl = new URL(currentUrl);
    countryUrl.searchParams.set("country", country.name.official);
    console.log("countryUrl", countryUrl);

    cloneTemplate
      .querySelector(".country-url")
      .setAttribute("href", countryUrl);
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
