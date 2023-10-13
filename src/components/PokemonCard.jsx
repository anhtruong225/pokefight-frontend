import "./PokemonCard.css";
import { useEffect, useState } from "react";
import axios from "axios";

function PokemonCard({
  pokemonData,
  showCard,
  skip,
  showStats,
  onClick,
  winner,
  chosen,
}) {
  const [pokemonImg, setPokemonImg] = useState("");
  const [isWinner, setIsWinner] = useState(null);

  useEffect(() => {
    const getPokemonImg = async () => {
      try {
        const response = await axios.get(
          `https://pokeapi.co/api/v2/pokemon/${pokemonData.name
            .toLowerCase()
            .replace(/\s+/g, "-")}`
        );
        if (response.data) {
          setPokemonImg(response.data.sprites.front_default);
        }
      } catch (error) {
        console.log(error);
        skip();
      }
    };

    const determineIfWinner = () => {
      if (winner !== null && chosen !== null) {
        setIsWinner(chosen === pokemonData.id ? winner === chosen : null);
      } else {
        setIsWinner(null);
      }
    };

    getPokemonImg();
    determineIfWinner();
  }, [pokemonData, winner, chosen, skip]);

  const handleOnClick = () => {
    onClick(pokemonData.id);
  };

  return (
    <div
      className={`pokemon-card ${
        showCard && winner === null && "pokemon-card--hover"
      }  ${showCard && isWinner && "pokemon-card--winner"} ${
        showCard && isWinner === false && "pokemon-card--loser"
      }`}
      onClick={handleOnClick}
    >
      {showCard && (
        <>
          <div className="pokemon-details">
            <div className="pokemon-name">
              {pokemonData.name}
              <div className={`pokemon-type`}>{pokemonData.type}</div>
            </div>
          </div>
          <div className="pokemon-image-container">
            <img
              src={pokemonImg}
              alt={pokemonData.name}
              className="pokemon-image"
              width={300}
              height={300}
            />
          </div>
          <div className="pokemon-details">
            {/* <div className="pokemon-level">Lv. {level}</div> */}
            <div className="pokemon-power">
              <div className="stat-label">Power</div>
              {showStats ? (
                <div className="stat-value">{pokemonData.power}</div>
              ) : (
                <div className="stat-hidden">Hidden</div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default PokemonCard;
