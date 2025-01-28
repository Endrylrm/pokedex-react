import "./Pokedex.css";
import "./Colors.css";
import { useState } from "react";
import PokemonCard from "../components/PokemonCard";
import useGetPokemons from "../hooks/useGetPokemons";

function Pokedex() {
  const { pokemons, isLoading, loadMorePokemon, loadButtonEnabled } =
    useGetPokemons();
  const [filteredPokemons, setFilteredPokemons] = useState([]);

  function handleSearch(event) {
    const value = event.target.value.toLowerCase().trim();
    setFilteredPokemons(filterPokemon(value));
  }

  function filterPokemon(value) {
    let newList = pokemons.filter((pokemon) => {
      let [type] = pokemon.types.filter((type) => type.includes(value));
      if (pokemon.id === Number(value)) return true;
      if (pokemon.name.includes(value)) return true;
      if (pokemon.mainType.includes(value)) return true;
      if (type) return true;
      return false;
    });
    return value === "" ? [] : newList;
  }

  return (
    <section className="content">
      <div id="pokedex-content">
        <h1 className="title">Pokedex</h1>
        <div className="search">
          <label htmlFor="search" className="search-label">
            Search Pokemon/Type/ID:
          </label>
          <input
            type="text"
            name="search"
            id="search-bar"
            onChange={handleSearch}
          />
        </div>
        <ol id="pokemons">
          {filteredPokemons.length > 0
            ? filteredPokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
              ))
            : pokemons.map((pokemon, index) => (
                <PokemonCard key={index} pokemon={pokemon} />
              ))}
        </ol>
        <div className="pagination">
          <button
            className={loadButtonEnabled ? "" : "hidden"}
            onClick={loadMorePokemon}
            id="loadMore"
            type="button"
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      </div>
    </section>
  );
}

export default Pokedex;
