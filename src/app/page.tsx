import { Suspense } from "react";
import PokemonListWrapper from "@/app/components/PokemonList/PokemonListWrapper";

export default function Home() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Pokémon Epicness</h1>
      <Suspense fallback={<div>Catching &apos;em all...</div>}>
        <PokemonListWrapper />
      </Suspense>
    </div>
  );
}
