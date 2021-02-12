console.log('Hi!'); //
console.log(axios); //

const searchButton = document.getElementById('searchButton');
console.log(searchButton); //

async function getCountryInfo() {
    const country = "belgie"; //get input from search -- besides, test lower characters only
    const response = await axios.get(`https://restcountries.eu/rest/v2/name/${country}?fullText=true`);
    try {
        console.log(response.data); // werkt
        for (const item of response.data) {
            console.log(`${item.name} is situated in ${item.subregion}. It has a population of ${item.population} people.`);
            console.log(`The capital is ${item.capital}`);
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

searchButton.addEventListener("click", getCountryInfo);