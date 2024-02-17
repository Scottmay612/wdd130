const url = "https://pokeapi.co/api/v2/pokemon/ditto";
const urlList = "https://pokeapi.co/api/v2/pokemon";
let results = null;
let searchHistory = []

async function getPokemonInfo() {
    const response = await fetch(urlList)

    if (response.ok) {
        const data = await response.json()
        console.log(data)
    }
}


document.getElementById("compareButton").addEventListener('click', comparePokemon);

async function comparePokemon() {
    const pokemon1 = document.getElementById( "pokemon1").value.toLowerCase();
    const pokemon2 = document.getElementById("pokemon2").value.toLowerCase();
    
    
    let url1 = makeURL(pokemon1)
    let url2 = makeURL(pokemon2) 
    
    // Data for pokemon 1.
    let pokemon1Data = await getData(url1)
    let furtherInfo1 = await getData(pokemon1Data.species.url)
    
    // Data for pokemon 2.
    let pokemon2Data = await getData(url2)
    let furtherInfo2 = await getData(pokemon2Data.species.url)
    
    document.getElementById("results1").innerHTML = createHTML(pokemon1Data, furtherInfo1)
    document.getElementById("results2").innerHTML = createHTML(pokemon2Data, furtherInfo2)
    
    updateSearchHistory(pokemon1, pokemon2);
}

function searchHistoryHTML () {
    let searchHistoryList = "<ol>"
    searchHistory.forEach(element => {
        searchHistoryList += `<li>${element.charAt(0).toUpperCase() + element.slice(1)}</li>`
    });
    searchHistoryList += "</ul>"
    let searchHistoryHTML = `<h2>Search History</h2>${searchHistoryList}`
    return searchHistoryHTML;
}
async function updateSearchHistory(name1, name2) {
    searchHistory.push(name1)
    searchHistory.push(name2)
    
    let searchHTML = await searchHistoryHTML()
    console.log(searchHTML)
    document.getElementById("searchHistory").innerHTML = searchHTML
}

function createHTML (jsonData, furtherData) {
    
    const name = jsonData.name
    const picture = jsonData.sprites.front_default
    const isLegendary = furtherData.is_legendary
    const growthRate = furtherData.growth_rate.name
    const type = jsonData.types[0].type.name
    const habitat = furtherData.habitat.name
    const captureRate = furtherData.capture_rate
    const weight = jsonData.weight
    const height = jsonData.height
    
    let detailsList = "<ul>"
    detailsList += `<li>Name: ${name.charAt(0).toUpperCase() + name.slice(1)}</li>`;
    detailsList += `<li>Type: ${type}</li>`
    detailsList += `<li>Habitat: ${habitat}</li>`
    detailsList += `<li>Legendary Status: ${isLegendary}</li>`
    detailsList += `<li>Capture Rate: ${captureRate}</li>`
    detailsList += `<li>Growth Rate: ${growthRate}</li>`
    detailsList += `<li>Weight: ${weight}</li>`
    detailsList += `<li>Height: ${height}</li>`


    detailsList += "</ul>"
    let html = `<h2>${name.charAt(0).toUpperCase() + name.slice(1)}</h2><img src="${picture}"${detailsList}`
  return html
}

async function getData(url) {
    let response = await fetch(url)
    let jsonData = await response.json()
    return jsonData
}

function makeURL(name) {
    let  url = `${urlList}/${name}`
    return url
} 



