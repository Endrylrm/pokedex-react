import { useContext } from "react";
import { PokemonContext } from "../contexts/PokemonContext";

const usePokemonContext = () => {
  const context = useContext(PokemonContext);
  if (context === undefined) {
    throw new Error("Váriavel / Objeto não encontrado!!!");
  }
  return context;
};

export default usePokemonContext;
