// globale Variable um diese in anderen Funktionen zu verwenden
// let currentPokemon;
let pokemons = [];

async function loadPokemon() {

    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=12&offset=0';

    // hier werden eine bestimmte Anzahl an Pokemon vom Server geladen 
    let response = await fetch(url);
    // console.log(response);
    let allPokemon = await response.json();
    console.log(allPokemon);

    renderPokemonShortInfo(allPokemon);
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




async function renderPokemonShortInfo(allPokemon) {
    document.getElementById('identity').innerHTML = ``;

    for (let i = 0; i < allPokemon['results'].length; i++) {
        let currentPokemonUrl = await getCurrentPokemonUrl(allPokemon, i);

        let responseCurrentPokemon = await fetch(currentPokemonUrl);
        let currentPokemon = await responseCurrentPokemon.json();
        console.log(currentPokemon);
        //aktuelles Pokemon dem Array hinzufügen
        pokemons.push(currentPokemon);

        // die Menge von Einträgen in "types" ermitteln da manche Pokemon nur einen Eintrag haben
        let kindOfPokemon;
        let featureOfPokemon;
        if (currentPokemon['types'].length < 2) {
            kindOfPokemon = currentPokemon['types'][0]['type']['name'];
            featureOfPokemon = '';
        } else {
            kindOfPokemon = currentPokemon['types'][0]['type']['name'];
            featureOfPokemon = currentPokemon['types'][1]['type']['name'];
        }

        let bgColorPokeCard = backgroundColorPokemonCard(kindOfPokemon);

        // die Hintergrundfarbe zum hervorheben des 'shortPoketInfoText' wird in CSS-Klassen deklariert. 
        // Die CSS-KLassen haben denselben Namen wie der erste Eintrag von "types" des Pokemon (aus dem API)
        // deswegen kann die Variable als Klassenname in die Classlist eingetragen werden
        document.getElementById('identity').innerHTML += `
            <div class="shortPokeInfoCard m-3" style="background-color:${bgColorPokeCard}" onclick="setDetailCard(${i})">
                <p id="pokemon_name" class="shortPokeInfoName">${currentPokemon['name']}</p>
                    <div class="shortPokeInfo">
                        <div class="shortPokeInfoTextFrame">
                            <div class="shortPokeInfoText ${kindOfPokemon}" id="infoKindOfPokemon">${kindOfPokemon}</div>
                            <div class="shortPokeInfoText ${kindOfPokemon}" id="infofeatureOfPokemon">${featureOfPokemon}</div>
                        </div>
                            <img src=${currentPokemon['sprites']['other']['official-artwork']['front_default']} alt="Image of a Pokemon" class="PokemonPicSize">
                        </div>
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

    document.getElementById('detailCardArea').innerHTML = `
    <div class="detailCardFrame d-none" id="detailCardFrame" onclick="showShortInfoPokemonCards()">
        <div class="detailCard" style="background-color:${bgColorPokeCard}">
            <div class="detailCardHeader">
                <p id="detailCardPokemonName">${pokemons[index]['name']}</p>
                <div class="detailCardPokemonInfo">
                    <div class="shortPokeInfoText ${kindOfPokemon}">${kindOfPokemon}</div>
                    <div class="shortPokeInfoText ${kindOfPokemon}">${featureOfPokemon}</div>
                </div>
            </div>

            <div class="detailCardPic">
                <img src='${pokemons[index]['sprites']['other']['official-artwork']['front_default']}' alt="Image of a Pokemon" id="pokemon_img" class="PokemonDetailPic">
            </div>
        </div>
        <div class="detailCardInfo">
        
        test
        
        
        </div>
    </div>
`;

    showDetailCard();
}

function showDetailCard() {
    document.getElementById('detailCardFrame').classList.remove('d-none');
    document.getElementById('identity').classList.add('d-none');
}

function showShortInfoPokemonCards() {
    document.getElementById('detailCardFrame').classList.add('d-none');
    document.getElementById('identity').classList.remove('d-none');
}