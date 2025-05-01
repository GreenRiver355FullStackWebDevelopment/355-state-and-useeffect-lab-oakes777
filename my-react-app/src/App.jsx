import { useState, useEffect } from "react";
import "./App.css";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetch(`https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`)
      .then((res) => res.json())
      .then((data) => setPokemonList(data.results));
  }, [offset]);

  const fetchPokemonDetail = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  return (
    <div className="App">
      <h1>Pokemon List</h1>
      <ul>
        {pokemonList.map((pokemon)=> (
          <li key={pokemon.name} onClick={()=>fetchPokemonDetail(pokemon.url)}>
            {pokemon.name}
          </li>
        ))}
      </ul>

      <button onClick={()=> setOffset((prev)=>Math.max(prev-20, 0))} disabled={offset===0}>
        Back
      </button>
      <button onClick={()=>setOffset((prev)=>prev+20)}>Next</button>

      {selectedPokemon&&(
        <div>
          <h2>{selectedPokemon.name}</h2>
          <img src={selectedPokemon.sprites.front_default} alt={selectedPokemon.name} />
          <p>Height: {selectedPokemon.height}</p>
          <p>Weight: {selectedPokemon.weight}</p>
        </div>
      )}
      </div>
  );
}

export default App;
