import Image from "next/image";
import { cacheTag, revalidateTag } from "next/cache";

import { PokemonFavourites, PokemonGrid, PokemonResponse, SimplePokemon } from "@/components/pokemons";

export const metadata = {
    title: 'Favoritos',
    description: 'Pokemon favoritos'
}

export default async function FavouritesPage() {

    return (
        <div className="flex flex-col">
            <span className="text-5xl my-2">Pokemons favoritos <small className="text-blue-500">Global state</small></span>
            <div className="flex flex-wrap gap-10 items-center justify-center">
                <PokemonFavourites />
            </div>
        </div>
    )
}