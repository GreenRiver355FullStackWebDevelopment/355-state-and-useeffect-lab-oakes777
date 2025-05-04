import { Paper, Box } from "@mui/material";

const Cards = ({ pokemonList, onPokemonClick }) => {
  return (
    <Box
      sx={{
        backgroundColor: "#000",
        borderRadius: 2,
        p: 2,
        mx: "auto",
        width: "100%",
        maxWidth: 800,
        display: "grid",
        gridTemplateColumns: "repeat(4, minmax(40px, 1fr))",
        gridTemplateRows: "repeat(5, 50px)",
        gap: 1,
      }}
    >
      {pokemonList.map((p, index) => (
        <Paper
          key={index}
          sx={{
            textAlign: "center",
            bgcolor: "#333",
            color: "white",
            fontWeight: "bold",
            cursor: "pointer",
            textTransform: "capitalize",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            "&:hover": { bgcolor: "#555" },
          }}
          onClick={() => onPokemonClick(p.url)}
        >
          {p.name}
        </Paper>
      ))}
    </Box>
  );
};

export default Cards;
