import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);
  //fetch 20 pokemon when offset changes
  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, [offset]);
  //fetch details for clicked name
  const fetchPokemonDetail = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSelectedPokemon(data);
  };
  //handle next button
  const handleNext = () => {
    setOffset((prev) => prev + 20);
  };
  //handle back button
  const handleBack = () => {
    setOffset((prev) => Math.max(prev - 20, 0));
  };

  return (
    <div className="App">
      <h1>Pokemon List</h1>
      {/* black box around grid */}
      <div className="pokemon-grid-container">
        <div className="pokemon-grid">
          {pokemonList.map((pokemon) => (
            <div
              key={pokemon.name}
              className={`pokemon-box ${
                selectedPokemon?.name === pokemon.name ? "selected" : ""
              }`}
              onClick={() => fetchPokemonDetail(pokemon.url)}
            >
              {pokemon.name}
            </div>
          ))}
        </div>
      </div>
      {/* buttons */}
      <div className="button-container">
        <button onClick={handleBack} disabled={offset === 0}>
          Back
        </button>
        <button onClick={handleNext}>Next</button>
      </div>
      {/* selected pokemon details */}
      {selectedPokemon && (
        <div className="pokemon-detail">
          <h2>{selectedPokemon.name}</h2>
          <img
            src={selectedPokemon.sprites.front_default}
            alt={selectedPokemon.name}
          />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
          <p>
            Type: {selectedPokemon.types.map((t) => t.type.name).join(", ")}
          </p>
        </div>
      )}
    </div>
  );
}

export default App;
