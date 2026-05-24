'use client'

import { useAppSelector } from "@/store";
import { useHasMounted } from "@/hooks/useHasMounted";
import { PokemonGrid } from "./PokemonGrid";
import { IoHeartOutline } from "react-icons/io5";

export const PokemonFavourites = () => {
    const hasMounted = useHasMounted();
    const favourites = useAppSelector(state => state.pokemon.favourites);

    if (!hasMounted || favourites.length === 0) {
        return <NoFavourites />;
    }

    return <PokemonGrid pokemons={favourites} />;
}

export const NoFavourites = () => {
    return (
        <div className="flex flex-col min-h-[50vh] items-center justify-center mt-12 gap-4">
            <IoHeartOutline size={100} className="text-red-500" />
            <p className="text-xl font-semibold text-gray-700">No hay favoritos</p>
            <p className="text-sm text-gray-500">Marca pokemons con el corazón en la lista</p>
        </div>
    )
}
