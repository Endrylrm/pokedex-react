import { useEffect, useState } from "react";
import { getPokemonData } from "../api/pokeapi";

function useGetPokemon(pid) {
  const [isLoading, setIsLoading] = useState(false);
  const [pokemon, setPokemon] = useState({});

  async function loadPokemon(id) {
    setIsLoading(true);
    const data = await getPokemonData(id);
    setPokemon(data);
    setIsLoading(false);
  }

  useEffect(() => {
    loadPokemon(pid);
  }, [pid]);

  return { pokemon, isLoading };
}

export default useGetPokemon;
