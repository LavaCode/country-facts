//Code starts here
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", getCountryInfo);

//API functionality - get data
async function getCountryInfo() {
    const country = "belgie"; //get input from search 
    const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    const response = await axios.get(url);

    const countryData = response.data[0]; //give country data
    const currencyData = countryData.currencies; // give country currency data
    const languageData = countryData.languages;
    console.log(languageData)

    try {
        for (const item of response.data) {
            console.log(`${item.name} ${helloSubregion(item)}. It has a population of ${item.population} people.`);
            console.log(helloCapital(item))
            console.log(getCurrencies(currencyData)); //import currencies
            console.log(getLanguages(languageData)); //import languages
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

//Function -- getCurrencies, count type of currencies
function getCurrencies(currencies) {
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

//Function -- get languages
function getLanguages(languages) {
    let languageString = ""; //

    for (let index = 0; index < languages.length; index++) {
        const language = languages[index].name;
        if (index === 0) {
            languageString += `They speak ${language}`;
            //eerste taal
        } else if (index === (languages.length - 1)) {
            languageString += ` and ${language}`;
            //laatste taal
        } else {
            languageString += `, ${language}`;
            //daartussen
        }
    }
    return languageString;
}

//Function -- is there a capital? 
function helloCapital(item) {
    const capital = item.capital;
    if (capital === "") {
        return `There is no capital city`;
    } else {
        return `The capital is ${capital}`;
    }
}

//Function -- is there a subregion? 
function helloSubregion(item) {
    const subregion = item.subregion;
    if (subregion === "") {
        return `is the country you will get info from`;
    } else {
        return `is situated in ${subregion}`;
    }
}