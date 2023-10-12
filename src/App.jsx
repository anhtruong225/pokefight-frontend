import React from "react";
import HomePage from "./pages/HomePage";
import GamePage from "./pages/GamePage";
import Navbar from "./components/Navbar";
import PokemonCard from "./components/PokemonCard";


function App() {
  return (
    <div>
      <HomePage />
      <PokemonCard />
    </div>
  );
}

export default App;
