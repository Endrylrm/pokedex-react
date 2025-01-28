import { Link } from "react-router";
import LeftArrow from "../assets/left-arrow.svg";
import RightArrow from "../assets/right-arrow.svg";
import ReturnArrow from "../assets/return-arrow.svg";
import { MAX_POKEMONS } from "../constants";

function PokemonDetails({ pokemon }) {
  function nextPokemon(id) {
    if (id <= 0) {
      id = MAX_POKEMONS;
    }
    if (id > MAX_POKEMONS) {
      id = 1;
    }
    return id;
  }

  return (
    <>
      <div className={`pokemon-header ${pokemon.mainType}`}>
        <div className="pokemon-buttons">
          <Link to="/" id="return-to-pokemon-list">
            <img src={ReturnArrow} alt="return button" />
          </Link>
        </div>
        <div className="pokemon-title">
          <span className="name">{pokemon.name}</span>
          <span className="id">#{pokemon.id}</span>
        </div>
        <div className="pokemon-types">
          <ol className="types">
            {pokemon.types.map((type, index) => (
              <li key={index} className={`type ${type}`}>
                {type}
              </li>
            ))}
          </ol>
        </div>
        <div className="pokemon-images">
          <Link
            to={`/pokemon/${nextPokemon(pokemon.id - 1)}`}
            className="arrow-button left-button"
          >
            <img src={LeftArrow} alt="back button" />
          </Link>
          <img src={pokemon.image} alt={pokemon.name} />
          <img src={pokemon.shinyImage} alt={`Shiny ${pokemon.name}`} />
          <Link
            to={`/pokemon/${nextPokemon(pokemon.id + 1)}`}
            className="arrow-button right-button"
          >
            <img src={RightArrow} alt="next button" />
          </Link>
        </div>

        <div className="pokemon-images">
          <span className="name">Common {pokemon.name}</span>
          <span className="name">Shiny {pokemon.name}</span>
        </div>
      </div>
      <div className="pokemon-stats">
        <h1 className="details-title">Flavor Text</h1>
        <p className="flavor-text">{pokemon.getRandomFlavorText()}</p>
        <h1 className="details-title">Base Stats</h1>
        {pokemon.stats.map((stat, index) => (
          <div key={index} className="stats">
            <span className="stats-label">
              {
                [
                  "HP",
                  "Attack",
                  "Defense",
                  "Sp. Attack",
                  "Sp. Defense",
                  "Speed",
                ][index]
              }
              :
            </span>
            <span className="stats-value">{stat}</span>
            <progress
              className={`stats-bar bar-${pokemon.mainType}`}
              value={stat}
              max="100"
            />
          </div>
        ))}
      </div>
      <div className="stats">
        <span className="stats-label">Total:</span>
        <span className="stats-value">{pokemon.getTotalPoints()}</span>
        <progress
          className={`stats-bar bar-${pokemon.mainType}`}
          value={pokemon.getTotalPoints()}
          max="600"
        />
      </div>
    </>
  );
}

export default PokemonDetails;
