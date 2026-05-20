import Image from "next/image";
import { cacheTag, revalidateTag } from "next/cache";

import { PokemonGrid, PokemonResponse, SimplePokemon } from "@/components/pokemons";



const getPokemons = async (limit = 20, offset = 0): Promise<SimplePokemon[]> => {
    try {
        const res = await fetch(`https://pokeapi.co/api/v2/pokemon?limit=${limit}&offset=${offset}`);
        const data: PokemonResponse = await res.json();

        return data.results.map(pokemon => ({
            id: pokemon.url.split('/').at(-2)!,
            name: pokemon.name
        }));
    } catch (error) {
        console.error('Error fetching pokemons:', error);
        return [];
    }
}

export default async function PokemonsPage() {
    // 'use cache';

    // cacheTag('pokemon-list');
    // revalidateTag('pokemon-list', 'max');

    const pokemons = await getPokemons(151);

    return (
        <div className="flex flex-col">
            <span className="text-5xl my-2">Listado de pokemons <small className="text-blue-500">estático</small></span>
            <div className="flex flex-wrap gap-10 items-center justify-center">
                <PokemonGrid pokemons={pokemons} />
            </div>
        </div>
    )
}