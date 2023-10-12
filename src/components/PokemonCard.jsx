import "./PokemonCard.css";
import { useEffect, useState } from "react";
import axios from "axios";

function PokemonCard({ pokemonData }) {
  const name = "Pikachu";
  const imageUrl =
    "https://i.postimg.cc/qRd6QFxg/385094558-18393011818009106-4317171623600290976-n.jpg";
  const type = "Electric";
  const stats = {
    HP: 35,
    Defense: 30,
    "Sp. Atk": 50,
    "Sp. Def": 40,
    Speed: 90,
  };
  const level = "50";

  const [pokemonImg, setpokemonImg] = useState("");

  useEffect(() => {
    const getPokemonImg = async () => {
      const response = await axios.get(
        `https://pokeapi.co/api/v2/pokemon/${pokemonData.name.english.toLowerCase()}`
      );
      if (response.data) {
        setpokemonImg(response.data.sprites.front_default);
      }
    };
    getPokemonImg();
  }, [pokemonData]);

  return (
    <div className="pokemon-card">
      <div className="pokemon-details">
        <div className="pokemon-name">
          {pokemonData.name.english}
          <div className={`pokemon-type ${type.toLowerCase()}`}>
            {pokemonData.type[0]}
          </div>
        </div>
      </div>
      <div className="pokemon-image-container">
        <img
          src={pokemonImg}
          alt={pokemonData.name.english}
          className="pokemon-image"
          width={300}
          height={300}
        />
      </div>

      <div className="pokemon-details">
        <div className="pokemon-level">Lv. {level}</div>
        <div className="pokemon-stats">
          <div className="pokemon-stat">
            <div className="stat-label">HP</div>
            <div className="stat-value">{pokemonData.base.HP}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Defense</div>
            <div className="stat-value">{pokemonData.base.Defense}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Sp. Atk</div>
            <div className="stat-value">{pokemonData.base["Sp. Attack"]}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Sp. Def</div>
            <div className="stat-value">{pokemonData.base["Sp. Defense"]}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Speed</div>
            <div className="stat-value">{pokemonData.base.Speed}</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default PokemonCard;
