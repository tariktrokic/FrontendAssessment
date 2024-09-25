import React from "react";
import { getPokemonList } from "@/app/services/pokemon";
import PokemonList from "./PokemonList";

const PokemonListWrapper: React.FC = async () => {
  const pokemonList = await getPokemonList({ limit: 151 });

  if (!pokemonList) {
    return <div>Something went wrong. Try again later to catch em all!</div>;
  }

  return <PokemonList initialPokemonList={pokemonList} />;
};

export default PokemonListWrapper;
