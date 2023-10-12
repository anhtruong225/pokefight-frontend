import React from "react";
import Navbar from "../components/Navbar";
import PokemonLogo from "../assets/pokemonlogo.png";
import Pokemon5 from "../assets/pokemon5.png";
import Pokemon2 from "../assets/pokemon2.png";
import PokemonBall from "../assets/pokeball.png";
import Pokemon1 from "../assets/charizard-min.png";

function HomePage() {
  return (
    <div>
      <div id="logo-area">
        <img
          src={PokemonLogo}
          alt="pokemon logo"
          style={{ height: 160, width: 330 }}
        />
      </div>
      <div className="row">
        <div className="col-xl-2"></div>
        <div className="col-xl-3 text-center" id="character-1">
          <img
            src={Pokemon2}
            alt="pokemon character 1"
            style={{ height: 440, width: 440 }}
          />
        </div>
        <div className="col-xl-2 text-center" id="pokeball-area">
          <img
            src={PokemonBall}
            alt="pokemon ball"
            style={{ height: 150, width: 120 }}
          />
          <button>Play Now</button>
        </div>
        <div className="col-xl-3 text-center" id="character-2">
          <img
            src={Pokemon5}
            alt="pokemon character 2"
            style={{ height: 400, width: 400 }}
          />
        </div>
        <div className="col-xl-1"></div>
      </div>
    </div>
  );
}
export default HomePage;
