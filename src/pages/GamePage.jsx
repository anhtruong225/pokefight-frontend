import { useState, useEffect } from "react";
import axios from "axios";

const PokemonDetails = () => {
  const baseUrl = "https://pokefight-backend-oyak.onrender.com";

  const [pokemon, setPokemon] = useState([]);
  const [randomPokemon, setRandomPokemon] = useState([]);

  useEffect(() => {
    getAllPokemon();
  }, []);

  const getAllPokemon = async () => {
    try {
      const response = await axios.get(`${baseUrl}/pokemon`);
      if (response.data.length) {
        setPokemon(response.data);

        // Ensure the two random Pokemon are different
        const randomIndices = getRandomIndices(response.data.length, 2);
        const randomPokemonList = randomIndices.map(
          (index) => response.data[index]
        );
        setRandomPokemon(randomPokemonList);
      }
    } catch (error) {
      console.log(error);
    }
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
    console.log(randomPokemonList);
    setRandomPokemon(randomPokemonList);
  };

  return (
    <div>
      PokemonDetails
      <button
        onClick={() => {
          console.log(pokemon);
        }}
      >
        Test Pokemon Data
      </button>
      <button onClick={handleNewPokemon}>Generate two new Pokemon</button>
    </div>
  );
};

export default PokemonDetails;
