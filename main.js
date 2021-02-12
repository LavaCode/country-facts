//Code starts here
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", getCountryInfo);

//API functionality - get data
async function getCountryInfo() {
    const country = "germany"; //get input from search 
    const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    const response = await axios.get(url);

    const countryData = response.data[0]; //give country data
    const currencyData = countryData.currencies; // give country currency data

    try {
        for (const item of response.data) {
            console.log(`${item.name} is situated in ${item.subregion}. It has a population of ${item.population} people.`);
            if (item.capital === "") {
                console.log(`There is no capital city`);
            } else {
                console.log(`The capital is ${item.capital}`);
            }
            console.log(formatCurrencies(currencyData));
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

//Function -- formatCurrencies, count type of currencies
function formatCurrencies(currencies) {
    let currencyString = ""; //

    for (let index = 0; index < currencies.length; index++) {
        const currency = currencies[index].name;
        if (index === 0) {
            currencyString += `You can pay with ${currency}s`;
        } else {
            currencyString += ` and ${currency}s`;
        }
    }
    return currencyString;
}