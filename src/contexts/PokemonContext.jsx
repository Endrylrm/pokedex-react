import { createContext, useState, useContext } from "react";

const PokemonContext = createContext();

function PokemonProvider({ children }) {
  const [pokemons, setPokemons] = useState([]);
  const [offset, setOffset] = useState(0);
  const [loadButtonEnabled, setLoadButtonEnabled] = useState(true);

  return (
    <PokemonContext.Provider
      value={{
        pokemons,
        setPokemons,
        offset,
        setOffset,
        loadButtonEnabled,
        setLoadButtonEnabled,
      }}
    >
      {children}
    </PokemonContext.Provider>
  );
}

export { PokemonContext, PokemonProvider };
