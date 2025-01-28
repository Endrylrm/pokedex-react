import "./Details.css";
import "./Colors.css";
import { useParams } from "react-router";
import PokemonDetails from "../components/PokemonDetails";
import useGetPokemon from "../hooks/useGetPokemon";

function Details() {
  const { pid } = useParams();
  const { pokemon, isLoading } = useGetPokemon(pid);

  if (isLoading) {
    return (
      <div className="loading">
        <div className="loading-spinner"></div>
      </div>
    );
  }

  if (Object.keys(pokemon).length === 0) {
    return;
  }

  return (
    <section className="content">
      <div id="pokemon-detail">
        <PokemonDetails pokemon={pokemon} />
      </div>
    </section>
  );
}

export default Details;
