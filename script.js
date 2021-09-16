// window.onscroll = function(ev) {
//     if ((window.innerHeight + window.scrollY) >= document.body.offsetHeight) {};
// }

// globale Variable um diese in anderen Funktionen zu verwenden
// let currentPokemon;
let pokemons = [];
let start = 12;
let offset = 0;
let amountPokemons = 0;

async function loadPokemon() {
    pokemons = [];
    let url = `https://pokeapi.co/api/v2/pokemon/?limit=${start}&offset=${offset}`;

    // hier werden eine bestimmte Anzahl an Pokemon vom Server geladen 
    let response = await fetch(url);
    // console.log(response);
    let allPokemon = await response.json();
    console.log(allPokemon);
    amountPokemons = allPokemon['count'];
    // console.log(amountPokemons);

    renderPokemonShortInfo(allPokemon);
}

function showNextPokemons() {
    offset += 12;
    if (offset > amountPokemons - 10) {
        offset = 0;
    }
    loadPokemon();
}

function showPreviewPokemons() {
    offset -= 12;
    if (offset < 0) {
        offset = 0;
    }
    loadPokemon();
}

// die url eines einzelnen Pokemons ermitteln
function getCurrentPokemonUrl(allPokemon, i) {
    return allPokemon['results'][i]['url'];
}

// hintergrundfarbe der Pokemonarten zuweisen
function backgroundColorPokemonCard(kindOfPokemon) {
    switch (kindOfPokemon) {
        case 'grass':
            return 'rgba(72, 208, 176, 1)';
            break;

        case 'water':
            return 'rgba(40, 220, 252, 1)';
            break;

        case 'fire':
            return '#FB6C6C';
            break;

        case 'bug':
            return '#F7CA6D';
            break;

        case 'normal':
            return '#e3e1dc'
            break;

        case 'electric':
            return '#e2c700';
            break;

        case 'poison':
            return '#f7e9bc';
            break;

        case 'ground':
            return '#b5ad91';
            break;

        case 'fairy':
            return '#e8d1eb';
            break;

        case 'fighting':
            return '#f0b6b6';
            break;

        case 'psychic':
            return '#e8cfe3';
            break;

        case 'rock':
            return '#b5ad91';
            break;

        case 'ghost':
            return '#cfc4cd';
            break;

        case 'ice':
            return '#c5ddde';
            break;

        case 'dragon':
            return '#e8cfcf';
            break;

        case 'dark':
            return '#3d2e34';
            break;

        case 'steel':
            return '#939393';
            break;

        case 'flying':
            return '#74acd8';
            break;

        default:
            return 'rgba(0, 0, 176, 1)';
            break;
    }
}

function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

async function pushPokemonToArray(currentPokemonUrl) {
    let responseCurrentPokemon = await fetch(currentPokemonUrl);
    let currentPokemon = await responseCurrentPokemon.json();
    console.log(currentPokemon);
    //aktuelles Pokemon dem Array hinzufügen
    pokemons.push(currentPokemon);
};



async function renderPokemonShortInfo(allPokemon) {
    document.getElementById('identity').innerHTML = ``;

    for (let i = 0; i < allPokemon['results'].length; i++) {
        let currentPokemonUrl = await getCurrentPokemonUrl(allPokemon, i);

        await pushPokemonToArray(currentPokemonUrl);

        // die Menge von Einträgen in "types" ermitteln da manche Pokemon nur einen Eintrag haben
        let kindOfPokemon;
        let featureOfPokemon;
        if (pokemons[i]['types'].length < 2) {
            kindOfPokemon = pokemons[i]['types'][0]['type']['name'];
            featureOfPokemon = '';
        } else {
            kindOfPokemon = pokemons[i]['types'][0]['type']['name'];
            featureOfPokemon = pokemons[i]['types'][1]['type']['name'];
        }

        let bgColorPokeCard = backgroundColorPokemonCard(kindOfPokemon);

        let PokemonKind = capitalizeFirstLetter(kindOfPokemon);
        let PokemonFeature = capitalizeFirstLetter(featureOfPokemon);
        let PokemonName = capitalizeFirstLetter(pokemons[i]['name']);

        // die Hintergrundfarbe zum hervorheben des 'shortPoketInfoText' wird in CSS-Klassen deklariert. 
        // Die CSS-KLassen haben denselben Namen wie der erste Eintrag von "types" des Pokemon (aus dem API)
        // deswegen kann die Variable als Klassenname in die Classlist eingetragen werden
        document.getElementById('identity').innerHTML += `
            <div class="shortPokeInfoCard m-3" style="background-color:${bgColorPokeCard}" onclick="setDetailCard(${i})">
                <p id="pokemon_name" class="shortPokeInfoName">${PokemonName}</p>
                    <div class="shortPokeInfo">
                        <div class="shortPokeInfoTextFrame">
                            <div class="shortPokeInfoText ${kindOfPokemon}">${PokemonKind}</div>
                            <div class="shortPokeInfoText ${kindOfPokemon}">${PokemonFeature}</div>
                        </div>
                            <img src=${pokemons[i]['sprites']['other']['official-artwork']['front_default']} alt="Image of a Pokemon" class="PokemonPicSize">
                        </div>
                        <p class="shortPokeInfoID">ID #${pokemons[i]['id']}</p>
                    </div>
            </div>
        `;
    }


}

function setDetailCard(index) {

    document.getElementById('detailCardArea').innerHTML = ``;

    // die Menge von Einträgen in "types" ermitteln da manche Pokemon nur einen Eintrag haben
    let kindOfPokemon;
    let featureOfPokemon;
    if (pokemons[index]['types'].length < 2) {
        kindOfPokemon = pokemons[index]['types'][0]['type']['name'];
        featureOfPokemon = '';
    } else {
        kindOfPokemon = pokemons[index]['types'][0]['type']['name'];
        featureOfPokemon = pokemons[index]['types'][1]['type']['name'];
    }

    let bgColorPokeCard = backgroundColorPokemonCard(kindOfPokemon);

    let ability1;
    let ability2;
    if (pokemons[index]['abilities'].length < 2) {
        ability1 = capitalizeFirstLetter(pokemons[index]['abilities'][0]['ability']['name']);
        ability2 = '';
    } else {
        ability1 = capitalizeFirstLetter(pokemons[index]['abilities'][0]['ability']['name']);
        ability2 = capitalizeFirstLetter(pokemons[index]['abilities'][1]['ability']['name']);
    }
    let PokemonName = capitalizeFirstLetter(pokemons[index]['name']);
    let PokemonKind = capitalizeFirstLetter(kindOfPokemon);
    let PokemonFeature = capitalizeFirstLetter(featureOfPokemon);
    let weight = pokemons[index]['weight'];
    let height = pokemons[index]['height'];

    document.getElementById('detailCardArea').innerHTML = `
    <div class="detailCardFrame d-none" id="detailCardFrame" onclick="showShortInfoPokemonCards()">
        <div class="detailCard" style="background-color:${bgColorPokeCard}">
            <div class="detailCardHeader">
                <p id="detailCardPokemonName">${PokemonName}</p>
                <div class="detailCardPokemonInfo">
                    <div class="shortPokeInfoText ${kindOfPokemon}">${PokemonKind}</div>
                    <div class="shortPokeInfoText ${kindOfPokemon}">${PokemonFeature}</div>
                </div>
            </div>

            <div class="detailCardPic">
                <img src='${pokemons[index]['sprites']['other']['official-artwork']['front_default']}' alt="Image of a Pokemon" id="pokemon_img" class="PokemonDetailPic">
            </div>
        </div>
        <div class="detailCardInfo">
        
            <div class="flex-center-middle">
                <img src='${pokemons[index]['sprites']['front_shiny']}' alt= "Image of a Pokemon" class="PokemonDetailInfoSmallPic">
                <img src='${pokemons[index]['sprites']['other']['dream_world']['front_default']}' alt= "Image of a Pokemon" class="PokemonDetailInfoPic">
                <img src='${pokemons[index]['sprites']['back_shiny']}' alt= "Image of a Pokemon" class="PokemonDetailInfoSmallPic">
            </div>

            <div class="flex-row">
                <div>
                    <table class="mdl-data-table mdl-js-data-table mdl-data-table--selectable mdl-shadow--2dp">
                        <thead>
                            <tr>
                                <td class="mdl-data-table__cell--non-numeric">Type:</td>
                                <td>${PokemonKind}</td>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td class="mdl-data-table__cell--non-numeric">Height:</td>
                                <td>${height} m</td>
                            </tr>
                            <tr>
                                <td class="mdl-data-table__cell--non-numeric">Weight:</td>
                                <td>${weight} KG</td>
                            </tr>
                            <tr>
                                <td class="mdl-data-table__cell--non-numeric">Abilities:</td>
                                <td>${ability1}</td>
                            </tr>
                            <tr>
                                <td class="mdl-data-table__cell--non-numeric"></td>
                                <td>${ability2}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

        </div>
    </div>
`;

    showDetailCard();
}

function showDetailCard() {
    document.getElementById('detailCardArea').style = "position:absolute";
    document.getElementById('detailCardFrame').classList.remove('d-none');
    document.getElementById('identity').classList.add('d-none');
    document.getElementById('button-section').classList.add('d-none');
}

function showShortInfoPokemonCards() {
    document.getElementById('detailCardArea').style = "position:fixed";
    document.getElementById('detailCardFrame').classList.add('d-none');
    document.getElementById('identity').classList.remove('d-none');
    document.getElementById('button-section').classList.remove('d-none');
}