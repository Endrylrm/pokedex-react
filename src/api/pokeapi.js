import { POKEAPI_URL } from "../constants";
import { PokemonCardData } from "../models/PokemonCardData";
import { PokemonData } from "../models/PokemonData";

async function getPokemonCards(newLimit, newOffset) {
  const url = `${POKEAPI_URL}/pokemon?limit=${newLimit}&offset=${newOffset}`;

  const response = await fetch(url);
  const json = await response.json();
  const pokemonsData = json.results;
  const detailRequests = pokemonsData.map(getPokemonCardData);
  const pokemonsDetails = await Promise.all(detailRequests);
  return pokemonsDetails;
}

async function getPokemonCardData(pokemon) {
  const response = await fetch(pokemon.url);
  const pokemonCardData = await response.json();

  const pokemonTypes = pokemonCardData.types.map(
    (typeSlot) => typeSlot.type.name
  );
  const [pokemonMainType] = pokemonTypes;

  const pokemonCard = new PokemonCardData(
    pokemonCardData.id,
    pokemonCardData.name,
    pokemonMainType,
    pokemonTypes,
    pokemonCardData.sprites.other.dream_world.front_default
  );

  return pokemonCard;
}

async function getPokemonData(id) {
  const url = `${POKEAPI_URL}/pokemon/${id}`;
  const response = await fetch(url);
  const pokemonStats = await response.json();
  const pokemonSpecies = await getPokemonSpecies(id);

  const pokemonTypes = pokemonStats.types.map((typeSlot) => typeSlot.type.name);
  const [pokemonMainType] = pokemonTypes;

  const stats = pokemonStats.stats.map((stat) => stat.base_stat);

  const flavorTexts = pokemonSpecies.flavor_text_entries
    .filter((data) => data.language.url === `${POKEAPI_URL}/language/9/`)
    .map((text) => text.flavor_text);

  const pokemon = new PokemonData(
    pokemonStats.id,
    pokemonStats.name,
    pokemonMainType,
    pokemonTypes,
    pokemonStats.sprites.other.showdown.front_default,
    pokemonStats.sprites.other.showdown.front_shiny,
    stats,
    flavorTexts
  );

  return pokemon;
}

async function getPokemonSpecies(id) {
  const url = `${POKEAPI_URL}/pokemon-species/${id}`;
  const response = await fetch(url);
  const pokemonSpecies = await response.json();
  return pokemonSpecies;
}

export { getPokemonCards, getPokemonData };
