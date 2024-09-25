"use client";

import React, { useState, useEffect, useCallback } from "react";
import { debounce } from "lodash";
import { Pokemon } from "@/app/types/pokemon";
import {
  getPokemonTypeCounts,
  getPokemonTypeDistribution,
} from "@/app/services/pokemon";
import { Input } from "@/components/ui/input";
import PokemonCard from "./PokemonCard";
import PokemonTypeChart from "./PokemonTypeChart";
import PokemonTypeDistributionChart from "./PokemonTypeDistributionChart";

interface PokemonListProps {
  initialPokemonList: Pokemon[];
}

const PokemonList: React.FC<PokemonListProps> = ({ initialPokemonList }) => {
  const [filteredPokemonList, setFilteredPokemonList] =
    useState(initialPokemonList);
  const [typeCount, setTypeCount] = useState(
    getPokemonTypeCounts(initialPokemonList)
  );
  const [typeDistribution, setTypeDistribution] = useState(
    getPokemonTypeDistribution(initialPokemonList)
  );
  const [searchTerm, setSearchTerm] = useState("");

  const debouncedSearch = debounce((searchTerm: string) => {
    const filtered = initialPokemonList.filter((pokemon) =>
      pokemon.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredPokemonList(filtered);
    setTypeCount(getPokemonTypeCounts(filtered));
    setTypeDistribution(getPokemonTypeDistribution(filtered));
  }, 300);

  useEffect(() => {
    debouncedSearch(searchTerm);
    return () => {
      debouncedSearch.cancel();
    };
  }, [searchTerm, initialPokemonList, debouncedSearch]);

  const handleSearchChange = useCallback(
    (event: React.ChangeEvent<HTMLInputElement>) => {
      setSearchTerm(event.target.value);
    },
    []
  );

  return (
    <>
      <Input
        type="text"
        placeholder="Search Pokémon..."
        value={searchTerm}
        onChange={handleSearchChange}
        className="bg-gray-700 text-white rounded mb-8"
      />

      {filteredPokemonList.length > 0 ? (
        <>
          <PokemonTypeChart typeCount={typeCount} />
          <PokemonTypeDistributionChart typeDistribution={typeDistribution} />
          <h2 className="text-2xl font-bold my-8">Pokémon List</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {filteredPokemonList.map((pokemon) => (
              <PokemonCard key={pokemon.id} pokemon={pokemon} />
            ))}
          </div>
        </>
      ) : (
        <p>No Pokémon found</p>
      )}
    </>
  );
};

export default PokemonList;
