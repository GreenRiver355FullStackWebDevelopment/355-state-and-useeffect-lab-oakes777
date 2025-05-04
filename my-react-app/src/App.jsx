import { useState, useEffect } from "react";
import Cards from "./components/Cards";
import CardDetail from "./components/CardDetail";
import { Box, Typography, Button } from "@mui/material";

function App() {
  const [pokemonList, setPokemonList] = useState([]);
  const [offset, setOffset] = useState(0);
  const [selectedPokemon, setSelectedPokemon] = useState(null);

  useEffect(() => {
    fetchPokemonList();
  }, [offset]);

  const fetchPokemonList = async () => {
    const res = await fetch(
      `https://pokeapi.co/api/v2/pokemon?limit=20&offset=${offset}`
    );
    const data = await res.json();
    setPokemonList(data.results);
  };

  const fetchPokemonDetail = async (url) => {
    const res = await fetch(url);
    const data = await res.json();
    setSelectedPokemon(data);
  };

  const handleNext = () => setOffset((prev) => prev + 20);
  const handleBack = () => setOffset((prev) => Math.max(prev - 20, 0));

  return (
    <Box sx={{ bgcolor: "red", minHeight: "100vh", width: "auto", py: 4 }}>
      <Typography
        variant="h3"
        align="center"
        color="white"
        fontWeight="bold"
        mb={3}
      >
        Pokémon List
      </Typography>

      <Cards pokemonList={pokemonList} onPokemonClick={fetchPokemonDetail} />

      <Box mt={3} display="flex" justifyContent="center" gap={2}>
        <Button
          variant="contained"
          onClick={handleBack}
          disabled={offset === 0}
          sx={{
            bgcolor: "gray",
            color: "white",
            "&:hover": { bgcolor: "#555" },
          }}
        >
          Back
        </Button>
        <Button
          variant="contained"
          onClick={handleNext}
          sx={{
            bgcolor: "gold",
            color: "black",
            "&:hover": { bgcolor: "#ffd700" },
          }}
        >
          Next
        </Button>
      </Box>

      {selectedPokemon && <CardDetail pokemon={selectedPokemon} />}
    </Box>
  );
}

export default App;
