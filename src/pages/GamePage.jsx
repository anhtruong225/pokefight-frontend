import "./GamePage.css";
import { useState, useEffect } from "react";
import axios from "axios";
import PokemonCard from "../components/PokemonCard.jsx";

const GamePage = () => {
  const baseUrl = "https://pokefight-backend-oyak.onrender.com";

  const [pokemon, setPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState([]);
  const [showCard, setShowCard] = useState(true);
  const [showStats, setShowStats] = useState(false);
  const [winner, setWinner] = useState(null);
  const [chosen, setChosen] = useState(null);
  const [score, setScore] = useState(0);

  useEffect(() => {
    const getAllPokemon = async () => {
      try {
        const response = await axios.get(`${baseUrl}/pokemon`);
        if (response.data.length) {
          setPokemon(response.data);

          const randomIndices = getRandomIndices(response.data.length, 2);
          const randomPokemonList = randomIndices.map(
            (index) => response.data[index]
          );
          const updatedRandomPokemonList = randomPokemonList.map((pokemon) => {
            return {
              id: pokemon.id,
              name: pokemon.name.english,
              type: pokemon.type[0],
              power: calcPokemonPower(pokemon.base),
            };
          });
          setRandomPokemon(updatedRandomPokemonList);
        }
      } catch (error) {
        console.log(error);
      }
    };
    getAllPokemon();
  }, []);

  const calcPokemonPower = (base) => {
    return (
      base.HP +
      base.Attack +
      base.Defense +
      base["Sp. Attack"] +
      base["Sp. Defense"] +
      base.Speed
    );
  };

  // Helper function to generate random indices
  const getRandomIndices = (max, count) => {
    if (max < count) {
      throw new Error(
        "Cannot get more random indices than the length of the array."
      );
    }
    const indices = [];
    while (indices.length < count) {
      const randomIndex = Math.floor(Math.random() * max);
      if (!indices.includes(randomIndex)) {
        indices.push(randomIndex);
      }
    }
    return indices;
  };

  const handleNewPokemon = () => {
    const randomIndices = getRandomIndices(pokemon.length, 2);
    const randomPokemonList = randomIndices.map((index) => pokemon[index]);
    const updatedRandomPokemonList = randomPokemonList.map((pokemon) => {
      return {
        id: pokemon.id,
        name: pokemon.name.english,
        type: pokemon.type[0],
        power: calcPokemonPower(pokemon.base),
      };
    });
    setRandomPokemon(updatedRandomPokemonList);
    setShowCard(false);
    setShowStats(false);
    setWinner(null);
    setChosen(null);
    setTimeout(() => {
      setShowCard(true);
    }, 1000);
  };

  const handleChoosePokemon = (chosenPokemonId) => {
    if (randomPokemon.length !== 2) {
      console.error("There should be exactly two Pokémon to choose from.");
      return;
    }
    if (winner || chosen) {
      return;
    }
    setChosen(chosenPokemonId);
    console.log(chosenPokemonId);
    const powerLeft = randomPokemon[0].power;
    const powerRight = randomPokemon[1].power;

    if (powerLeft > powerRight) {
      setWinner(randomPokemon[0].id);
      setScore((prevScore) =>
        chosenPokemonId === randomPokemon[0].id ? prevScore + 1 : 0
      );
    } else if (powerLeft < powerRight) {
      setWinner(randomPokemon[1].id);
      setScore((prevScore) =>
        chosenPokemonId === randomPokemon[1].id ? prevScore + 1 : 0
      );
    } else {
      setWinner(null);
    }

    setShowStats(true);
    setTimeout(() => {
      handleNewPokemon();
    }, 2000);
  };

  return (
    <div className="game">
      <h1 className="score">Score: {score} </h1>
      {randomPokemon.length && (
        <div className="versus-container">
          <div className="pokemon-left">
            <PokemonCard
              onClick={handleChoosePokemon}
              pokemonData={randomPokemon[0]}
              skip={handleNewPokemon}
              showCard={showCard}
              showStats={showStats}
              winner={winner}
              chosen={chosen}
            />
          </div>
          <h2 className="versus-text">VS</h2>
          <div className="pokemon-right">
            <PokemonCard
              onClick={handleChoosePokemon}
              pokemonData={randomPokemon[1]}
              skip={handleNewPokemon}
              showCard={showCard}
              showStats={showStats}
              winner={winner}
              chosen={chosen}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default GamePage;
