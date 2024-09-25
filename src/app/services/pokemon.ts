import axios from "axios";
import {
  Pokemon,
  PokemonListResponse,
  PokemonDetails,
  PokemonTypeDistribution,
} from "../types/pokemon";
import { URLS } from "../constants/urls";

type GetPokemonListParams = {
  limit: number;
};

export async function getPokemonList({
  limit,
}: GetPokemonListParams): Promise<Pokemon[]> {
  try {
    const { data: pokemonListData } = await axios.get<PokemonListResponse>(
      `${URLS.POKEMON_API_BASE_URL}/pokemon?limit=${limit}`
    );

    const pokemonListWithDetails = await Promise.all(
      pokemonListData.results.map(async (pokemon) => {
        try {
          const { data: pokemonDetails } = await axios.get<PokemonDetails>(
            pokemon.url
          );
          return {
            id: pokemonDetails.id,
            name: pokemon.name,
            types: pokemonDetails.types.map((type) => type.type.name),
          };
        } catch (error) {
          console.error(`Error fetching details for ${pokemon.name}:`, error);
          return null;
        }
      })
    );

    return pokemonListWithDetails.filter((pokemon) => pokemon !== null);
  } catch (error) {
    console.error("Error fetching Pokemon list:", error);
    return [];
  }
}

export function getPokemonTypeCounts(
  pokemonList: Pokemon[]
): Record<string, number> {
  const typeCount: Record<string, number> = {};

  pokemonList.forEach((pokemon) => {
    pokemon.types.forEach((type) => {
      if (typeCount[type]) {
        typeCount[type]++;
      } else {
        typeCount[type] = 1;
      }
    });
  });

  return typeCount;
}

export function getPokemonTypeDistribution(
  pokemonList: Pokemon[]
): PokemonTypeDistribution {
  let singleTypeCount = 0;
  let dualTypeCount = 0;

  pokemonList.forEach((pokemon) => {
    if (pokemon.types.length === 1) {
      singleTypeCount++;
    } else {
      dualTypeCount++;
    }
  });

  return {
    single: singleTypeCount,
    dual: dualTypeCount,
  };
}
