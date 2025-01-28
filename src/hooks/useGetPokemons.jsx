import { useEffect, useState } from "react";
import { getPokemonCards } from "../api/pokeapi";
import usePokemonContext from "./usePokemonContext";
import { LIMIT_PER_LOAD, MAX_POKEMONS } from "../constants";

function useGetPokemons() {
  const { pokemons, setPokemons } = usePokemonContext();
  const { offset, setOffset } = usePokemonContext();
  const { loadButtonEnabled, setLoadButtonEnabled } = usePokemonContext();
  const [isLoading, setIsLoading] = useState(false);

  async function loadMorePokemon() {
    setIsLoading(true);
    let limit = LIMIT_PER_LOAD;
    setOffset(offset + limit);

    const recordsWithNextPage = offset + limit;

    if (recordsWithNextPage >= MAX_POKEMONS) {
      limit = MAX_POKEMONS - offset;
      setLoadButtonEnabled(false);
    }

    const newPokemons = await getPokemonCards(limit, offset);

    setPokemons((prevPokemons) => {
      // just to prevent any duplication happening
      const lastPokemons = prevPokemons.slice(-LIMIT_PER_LOAD);
      const duplicatePokemons =
        lastPokemons.length === newPokemons.length &&
        lastPokemons.every((obj, index) => obj.id === newPokemons[index].id);
      if (duplicatePokemons) {
        return [...prevPokemons];
      } else {
        return [...prevPokemons, ...newPokemons];
      }
    });
    setIsLoading(false);
  }

  useEffect(() => {
    if (pokemons.length <= 0) {
      loadMorePokemon();
    }
  }, []);

  return { pokemons, isLoading, loadMorePokemon, loadButtonEnabled };
}

export default useGetPokemons;
