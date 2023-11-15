import PokemonsService from './service.js'

function changeImage(id, url) {
  document.getElementById(id).src = url;
}

function changeText(id, text) {
  document.getElementById(id).innerText = text;
}

let id = 1;

async function updatePokemon() {
  const currentPokemon = await PokemonsService.getPokemon(id);
  changeText("name", currentPokemon.name);
  changeImage("img_sprite_front_default", currentPokemon.sprites.front_default);
}

updatePokemon();

async function currentPokemon() {
  const currentPokemon = await PokemonsService.getPokemon(id);
  return currentPokemon;
}

function checkImg(url) {
  if(url == null)
    changeImage("img_sprite_front_default", "../assets/missingno.png");
  else
    changeImage("img_sprite_front_default", url);
}

async function previousPokemon() {
  const pokemon = await currentPokemon();
  if(pokemon.id === 1) {
    const lastId = await PokemonsService.getLastPokemonId();
    const previousPokemon = await PokemonsService.getPokemon(lastId);
    id = previousPokemon.id; 
    checkImg(previousPokemon.sprites.front_default)
    changeText("name", previousPokemon.name);
    return;
  }
  id = pokemon.id - 1;
  const previousPokemon = await PokemonsService.getPokemon(id);
  changeText("name", previousPokemon.name);
  checkImg(previousPokemon.sprites.front_default)
}

async function nextPokemon() {
  const pokemon = await currentPokemon();
  const lastId = await PokemonsService.getLastPokemonId();
  if(pokemon.id == lastId) {
    id = 1;
    const nextPokemon = await PokemonsService.getPokemon(id);
    checkImg(nextPokemon.sprites.front_default);
    changeText("name", nextPokemon.name);
    return;
  }
  id = pokemon.id + 1;
  const nextPokemon = await PokemonsService.getPokemon(id);
  changeText("name", nextPokemon.name);
  checkImg(nextPokemon.sprites.front_default)
}

window.previousPokemon = previousPokemon;
window.nextPokemon = nextPokemon;
window.currentPokemon = currentPokemon;