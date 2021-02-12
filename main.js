//Code starts here
const searchButton = document.getElementById('searchButton');
searchButton.addEventListener("click", getCountryInfo);

// const flagData = document.getElementById('flagData');
// const countryName = document.getElementById('countryName');
// const subregion = document.getElementById('subregion');
// const population = document.getElementById('population');
// const city = document.getElementById('city');
// const currency = document.getElementById('currency');
// const language = document.getElementById('languages')

//API functionality - get data
async function getCountryInfo() {
    const country = "antarctica"; //get input from search 
    const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
    const response = await axios.get(url);

    const countryData = response.data[0]; //give country data
    const currencyData = countryData.currencies; // give country currency data
    const languageData = countryData.languages;

    try {
        for (const item of response.data) {
            //debug code -- backstage only 
            console.log(`${item.name} ${helloSubregion(item)}. It has a population of ${checkPopulation(item)} million people`);
            console.log(getCurrencies(currencyData)); //import currencies
            console.log(getLanguages(languageData)); //import languages
            console.log(item.flag);

            //visible returns


            //test area
            // flagData.setAttribute("src", item.flag);
            // flagData.setAttribute("width=50px;")
            // flagData.setAttribute("height=50px;")
            // document.body.append(flagData);
        }
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
}

//Function -- return all info 
// function returnAllData(flag, country, subregion, population, city, currency, language) {


// }

//Function -- getCurrencies, count type of currencies
function getCurrencies(currencies) {
    let currencyString = ""; //

    for (let index = 0; index < currencies.length; index++) {
        const currency = currencies[index].name;
        if (index === 0) {
            currencyString += `You can pay with ${currency}s`;
        } else if (index === (currencies.length - 1)) {
            currencyString += ` and ${currency}s`;
        } else {
            currencyString += `, ${currency}s`;
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

//Function -- is population high or low?
function checkPopulation(people) {
    const population = people.population;
    if (population > 1000000) {
        return `${(population/1000000).toFixed(2)} million people`;
    } else {
        return `${(population/1000).toFixed(3)} people`;
    }
}