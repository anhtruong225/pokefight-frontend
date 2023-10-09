import React from "react";
import { useEffect, useState } from "react";
import axios from "axios";

function PokemonCard() {
  const [cards, setCards] = useState([]);

  return (
    <div>
      <div className="card-container"></div>
    </div>
  );
}

export default PokemonCard;
