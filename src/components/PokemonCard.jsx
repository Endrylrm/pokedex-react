import { useNavigate } from "react-router";

function PokemonCard({ pokemon }) {
  let navigate = useNavigate();

  return (
    <li
      onClick={() => navigate(`/pokemon/${pokemon.id}`)}
      className={`pokemon ${pokemon.mainType}`}
    >
      <span className="id">#{pokemon.id}</span>
      <span className="name">{pokemon.name}</span>
      <div className="detail">
        <ol className="types">
          {pokemon.types.map((type, index) => (
            <li key={index} className={`type ${type}`}>
              {type}
            </li>
          ))}
        </ol>
        <img src={pokemon.image} alt={pokemon.name} />
      </div>
    </li>
  );
}

export default PokemonCard;
