export interface Pokemon {
  id: number;
  name: string;
  types: string[];
}

export interface PokemonListResponse {
  count: number;
  next: string | null;
  previous: string | null;
  results: { name: string; url: string }[];
}

export interface PokemonDetails {
  id: number;
  types: { type: { name: string } }[];
}

export type PokemonTypeDistribution = {
  single: number;
  dual: number;
};
