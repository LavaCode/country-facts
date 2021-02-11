console.log('Hi!'); //
console.log(axios); //

const searchButton = document.getElementById('searchButton');
console.log(searchButton); //

async function getCountryInfo() {
    const country = "België";
    const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    console.log(`Get country here ${country}`); //
}

searchButton.addEventListener("click", getCountryInfo);