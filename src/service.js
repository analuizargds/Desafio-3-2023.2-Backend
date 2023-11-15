const PokemonsService = {
    async getPokemon(id) {
        const url = `https://pokeapi.co/api/v2/pokemon/${id}`
        const response = await fetch(url);
        const pokemon = await response.json();
        return pokemon;
    },

    async getLastPokemonId() {
        const url = `https://pokeapi.co/api/v2/pokemon/?offset=0&limit=1292`
        const response = await fetch(url);
        const pokemon = await response.json();
        const data = pokemon.results[pokemon.results.length - 1];
        const id = data.url.split('/').slice(-2, -1)[0];
        return id;
    },
}

export default PokemonsService;