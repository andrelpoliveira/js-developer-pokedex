const pokemonList = document.getElementById('pokemonList')
const loadMoreButton = document.getElementById('loadMoreButton')
const limit = 10
let offset = 0


const maxRecords = 151
//Informações do Pokemon
let pokeOrder = 0
let pokeName = null

//Consome API
//Método utilizando promessa com tratamento de erros
//Método reduzido utilizando arrow function
function loadPokemonItem(offset, limit){
    
    //Função para paginação e conversão para HTML
    pokeApi.getPokemons(offset, limit).then((pokemons = []) => {
        //Simplificando o for com map 
        const newHtml = pokemons.map((pokemon) =>
        `
            <li class="pokemon ${pokemon.type}">
                <span class="number">#${pokemon.order}</span>
                <span class="name">${pokemon.name}</span>
                    
                <div class="detail">
                    <ol class="types">
                        ${pokemon.types.map((type) => `<li class="type ${type}">${type}</li>`).join('')}
                    </ol>

                    <img src="${pokemon.photo}" alt="${pokemon.name}">
                </div>
                <div id="${pokemon.order}" class="abilities" style="display: none;">
                    <h3>About</h3>
                    
                    <ul class="abilitiespokemon">
                        <li class="abilitieslist"><span class="titleList">Height: </span> <span class="infoList">${pokemon.height}</span></li>
                    </ul>
                    <ul class="abilitiespokemon">
                        <li class="abilitieslist"><span class="titleList">Weight: </span> <span class="infoList">${pokemon.weight}</span></li>
                    </ul>
                    <ul class="abilitiespokemon">
                        <li class="abilitieslist"><span class="titleList">Abilities: </span> <span class="infoList">${pokemon.abilities[0]}, ${pokemon.abilities[1]}</span></li>
                    </ul>
                   
                </div>
                <button onClick="openAbilities(this.value)" type="button" class="${pokemon.type}" value="${pokemon.order}">Info</button>
            </li>
        `).join('') 

        pokemonList.innerHTML += newHtml
    })
}

loadPokemonItem(offset, limit)
//Paginação do Pokedex - Limite de 20 por página
loadMoreButton.addEventListener('click', () => {
    offset += limit

    const qtdRecordsNextPage = offset + limit 

    if(qtdRecordsNextPage >= maxRecords){
        const newLimit = maxRecords - offset
        loadPokemonItem(offset, newLimit)

        loadMoreButton.parentElement.removeChild(loadMoreButton)
    }
    else{
        loadPokemonItem(offset, limit)
    }
})

function openAbilities(abilityDisplay){
    var display = document.getElementById(abilityDisplay).style.display;
    if(display == "none")
        document.getElementById(abilityDisplay).style.display = 'block';
    else
        document.getElementById(abilityDisplay).style.display = 'none';
}


    
