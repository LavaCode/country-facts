//Code starts here
generateInspiration();

//Enable or disable debug mode
const debugMode = false;

//Function -- read data from text field
const textField = document.getElementById("userInput");

//Function get input data
function getInputData() {
    const inputData = document.getElementById("userInput").value;
    if (inputData === "") {
        somethingWentWrong("noData")
    } else {
        getCountryInfo(inputData);
        document.getElementById("userInput").value = "";
    }
}

//parse data if Enter is pressed
textField.addEventListener('keyup', function(event) {
    if (event.keyCode === 13) {
        document.getElementById("searchButton").click();
    }
});

//API functionality - get data
async function getCountryInfo(countryValue) {
    try {
        const country = countryValue; //get input from search 
        const url = `https://restcountries.eu/rest/v2/name/${country}?fullText=true`;
        const response = await axios.get(url);

        const countryData = response.data[0]; //give country data
        const currencyData = countryData.currencies; //give country currency data
        const languageData = countryData.languages; //give country languages

        eraseMessages(); //clear warnings or home-screen messages;

        for (const item of response.data) {
            //visible returns
            returnAllData(item.flag, item.name, item, item, item, currencyData, languageData)

            //debug code -- backstage only 
            if (debugMode) {
                console.log(`All the info!`)
                console.log(countryData)
                console.log(`${item.name} ${helloSubregion(item)}. It has a population of ${checkPopulation(item)}`);
                console.log(`${helloCapital(item)}`)
                console.log(getCurrencies(currencyData)); //import currencies
                console.log(getLanguages(languageData)); //import languages
                console.log(item.flag); //get flag
                console.log(`\nTEST: this is the subregion ${item.subregion} and this is the population ${item.population}\n`)
            }
        }
    } catch (err) {
        // Handle Error Here
        somethingWentWrong(err)
        console.error(err);
    }
}

//Function -- return all info 
function returnAllData(flag, country, subregion, population, city, currencyData, language) {
    //flag
    const flagData = document.getElementById('flagData');
    flagData.setAttribute("src", flag);

    //name
    document.getElementById('countryName').innerHTML = country;

    //descriptive text
    stringDescriptive = `${country} ${helloSubregion(subregion)}. It has a population of ${checkPopulation(population)}.
    <br><br>${helloCapital(city)} and ${getCurrencies(currencyData)}.
    <br><br>${getLanguages(language)}.`;
    document.getElementById('about').innerHTML = stringDescriptive;

}

//Function -- getCurrencies, count type of currencies
function getCurrencies(currencies) {
    let currencyString = ""; //

    for (let index = 0; index < currencies.length; index++) {
        const currency = currencies[index].name;
        if (index === 0) {
            currencyString += `you can pay with ${currency}s`;
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
        return `${(population / 1000000).toFixed(2)} million people`;
    } else {
        return `${(population / 1000).toFixed(3)} people`;
    }
}

//Function -- return random country
async function generateInspiration() {
    const url = `https://restcountries.eu/rest/v2/all`;
    const response = await axios.get(url);
    const data = response.data

    let countryA = Math.floor(Math.random() * data.length);
    let countryB = Math.floor(Math.random() * data.length);

    countryA = data[countryA].name;
    countryB = data[countryB].name;

    document.getElementById('inspiration').innerHTML = `Do you need some inspiration? Try <strong>${countryA}</strong> and <strong>${countryB}</strong>!`;

    if (debugMode) {
        console.log(countryA)
        console.log(countryB)
    }
}

//Function -- feedback errors
function somethingWentWrong(error) {
    if (error === "noData") {
        document.getElementById('alertMessage').innerHTML = 'You did not entered any data to search for. Please try again!';
        alert(`Not on my watch! You have to give data before you can search!`)
    } else {
        document.getElementById('alertMessage').innerHTML = "Is that in space? Please try again searching for a valid country!";
        alert(`Wooowwaaaa where's that? Space?`)
    }
}

function eraseMessages() {
    //clear data from home
    document.getElementById('informativeText').innerHTML = "";
    document.getElementById('alertMessage').innerHTML = "";
}