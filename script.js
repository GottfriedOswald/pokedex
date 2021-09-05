async function loadPokemon() {

    let url = 'https://pokeapi.co/api/v2/pokemon/?limit=15&offset=1099';

    // hier werden eine bestimmte Anzahl an Pokemon vom Server geladen 
    let response = await fetch(url);
    // console.log(response);
    let allPokemon = await response.json();
    console.log(allPokemon);

    renderPokemonShortInfo(allPokemon);
}


function getCurrentPokemonUrl(allPokemon, i) {
    return allPokemon['results'][i]['url'];
}

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


        document.getElementById('identity').innerHTML += `
            <div class="shortPokeInfoCard m-3" style="background-color:${bgColorPokeCard}" onclick = "showDetailCard(${i})">
                <p id="pokemon_name" class="shortPokeInfoName">${currentPokemon['name']}</p>
                    <div class="shortPokeInfo">
                    <div class="shortPokeInfoTextFrame">
                        <div class="shortPokeInfoText ${kindOfPokemon}" id="infoKindOfPokemon">${kindOfPokemon}</div>
                        <div class="shortPokeInfoText ${kindOfPokemon}" id="infofeatureOfPokemon">${featureOfPokemon}</div>
                    </div>
                        <img src=${currentPokemon['sprites']['other']['official-artwork']['front_default']} alt="Image of a Pokemon" id="pokemon_img" class="PokemonPicSize">
                    </div>
            </div>
        `;
    }
}