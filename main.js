console.log('Hi!'); //
console.log(axios); //

const searchButton = document.getElementById('searchButton');
console.log(searchButton); //

async function getCountryInfo() {
    const country = "België";
    const url = "https://restcountries.eu/#api-endpoints-language"
    console.log(`Get country here`); //
}

searchButton.addEventListener("click", getCountryInfo);