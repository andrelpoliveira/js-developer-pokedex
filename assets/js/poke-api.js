
const pokeApi = {}
//Função para consumo da API
pokeApi.getPokemons = (offset = 0, limit = 10) => {
    //Variáveis globais
    const url=`https://pokeapi.co/api/v2/pokemon?offset=${offset}&limit=${limit}`
    return fetch(url)
        .then((response) => response.json())
        .then((jsonBody) => jsonBody.results)
        .then((pokemons) => pokemons.map(pokeApi.getPokemonDetail))
        .then((detailRequests) => Promise.all(detailRequests))
        .then((pokemonDetails) => pokemonDetails)
        .catch((error) => console.error(error))
}
//Requisição dos detalhes dos pokemons
pokeApi.getPokemonDetail = (pokemon) => {
    return fetch(pokemon.url)
    .then((response) => response.json())
    .then(convertPokeApiDetailToPokemon)
}
//Conversão do PokeApi para modelo próprio
function convertPokeApiDetailToPokemon(pokeDetail){
    const pokemon = new Pokemon()
    pokemon.name = pokeDetail.name
    pokemon.order = pokeDetail.id

    const types = pokeDetail.types.map((typeSlot) => typeSlot.type.name)
    const [type] = types

    pokemon.types = types
    pokemon.type = type

    pokemon.photo = pokeDetail.sprites.other.dream_world.front_default

    const abilities = pokeDetail.abilities.map((abilitySlot) => abilitySlot.ability.name)
    const [ability] = abilities

    pokemon.abilities = abilities
    pokemon.ability = ability

    pokemon.height = pokeDetail.height
    pokemon.weight = pokeDetail.weight

    return pokemon
}
