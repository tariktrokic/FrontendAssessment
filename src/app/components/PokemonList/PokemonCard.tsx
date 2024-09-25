import React from "react";
import { Pokemon } from "../../types/pokemon";

interface PokemonCardProps {
  pokemon: Pokemon;
}

const PokemonCard: React.FC<PokemonCardProps> = ({ pokemon }) => {
  return (
    <div className="border rounded-lg p-4 shadow-md">
      <h2 className="text-xl font-bold mb-2">{pokemon.name}</h2>
      <p>ID: {pokemon.id}</p>
      <p>Types: {pokemon.types.join(", ")}</p>
    </div>
  );
};

export default PokemonCard;
