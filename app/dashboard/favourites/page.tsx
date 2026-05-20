import Image from "next/image";
import { cacheTag, revalidateTag } from "next/cache";

import { PokemonGrid, PokemonResponse, SimplePokemon } from "@/components/pokemons";

export default async function FavouritesPage() {
    return (
        <div className="flex flex-col">
            <span className="text-5xl my-2">Pokemons favoritos <small className="text-blue-500">Global state</small></span>
            <div className="flex flex-wrap gap-10 items-center justify-center">
                <PokemonGrid pokemons={[]} />
            </div>
        </div>
    )
}