import "./PokemonCard.css";

function PokemonCard() {
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

  // Array von möglichen Attacken für Pikachu
  const possibleAttacks = [
    "Thunderbolt",
    "Quick Attack",
    "Thunder Wave",
    "Iron Tail",
    "Electro Ball",
  ];

  // Zufällig 4 Attacken auswählen
  const selectedAttacks = getRandomAttacks(possibleAttacks, 4);

  // Funktion, um zufällige Attacken auszuwählen
  function getRandomAttacks(attacks, count) {
    const shuffledAttacks = [...attacks];
    for (let i = shuffledAttacks.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [shuffledAttacks[i], shuffledAttacks[j]] = [
        shuffledAttacks[j],
        shuffledAttacks[i],
      ];
    }
    return shuffledAttacks.slice(0, count);
  }

  return (
    <div className="pokemon-card">
      <div className="pokemon-details">
        <div className="pokemon-name">
          {name}
          <div className={`pokemon-type ${type.toLowerCase()}`}>{type}</div>
        </div>
      </div>
      <div className="pokemon-image-container">
        <img src={imageUrl} alt={name} className="pokemon-image" />
      </div>

      <div className="pokemon-details">
        <div className="pokemon-level">Lv. {level}</div>
        <div className="pokemon-stats">
          <div className="pokemon-stat">
            <div className="stat-label">HP</div>
            <div className="stat-value">{stats.HP}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Defense</div>
            <div className="stat-value">{stats.Defense}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Sp. Atk</div>
            <div className="stat-value">{stats["Sp. Atk"]}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Sp. Def</div>
            <div className="stat-value">{stats["Sp. Def"]}</div>
          </div>
          <div className="pokemon-stat">
            <div className="stat-label">Speed</div>
            <div className="stat-value">{stats.Speed}</div>
          </div>
        </div>
      </div>
      <div className="pokemon-attacks">
        {selectedAttacks.map((attack, index) => (
          <div key={index} className="attack">
            {attack}
          </div>
        ))}
      </div>
    </div>
  );
}

export default PokemonCard;
