'use client'

import Link from "next/link";
import Image from "next/image";
import { IoHeart, IoHeartOutline } from "react-icons/io5";

import { useHasMounted } from "@/hooks/useHasMounted";
import { useAppDispatch, useAppSelector } from "@/store";
import { SimplePokemon } from "../interfaces/simple-pokemon";
import { togglefavourite } from "@/store/pokemons/pokemon-slice";

interface Props {
    pokemon: SimplePokemon
}

export const PokemonCard = ({ pokemon }: Props) => {
    const { id, name } = pokemon;
    const dispatch = useAppDispatch();
    const hasMounted = useHasMounted();

    const isFavourite = useAppSelector(state =>
        state.pokemon.favourites.some(item => item.id === id)
    );

    const showAsFavourite = hasMounted && isFavourite;

    const togglePokemon = () => {
        dispatch( togglefavourite(pokemon) )
    }

    return (
        <div className="mx-auto right-0 mt-2 w-60">
            <div className="flex flex-col bg-white rounded overflow-hidden shadow-lg">
                <div className="flex flex-col items-center justify-center text-center p-6 bg-gray-800 border-b">
                    <Image
                        src={`https://raw.githubusercontent.com/PokeAPI/sprites/master/sprites/pokemon/other/dream-world/${id}.svg`}
                        alt={name}
                        width={100}
                        height={100}
                        priority={false}
                    />
                    <p className="pt-2 text-lg font-semibold text-gray-50 capitalize">{name}</p>
                    <div className="mt-5">
                        <div
                            className="border rounded-full py-2 px-4 text-xs font-semibold text-gray-100"
                        >
                            Mas info
                        </div>
                    </div>
                </div>
                <div>
                    <div
                        onClick={togglePokemon}
                        className="px-4 py-2 hover:bg-gray-100 flex items-center cursor-pointer"
                    >
                        <div className="text-green-600">
                            {showAsFavourite ? (
                                <IoHeart className="text-red-600" />
                            ) : (
                                <IoHeartOutline className="text-red-600" />
                            )}
                        </div>
                        <div className="pl-3">
                            <p className="text-sm font-medium text-gray-800 leading-none">
                                {
                                    showAsFavourite ? (
                                        <span>Es favorito</span>
                                    ) : (
                                        <span>No es favorito</span>
                                    )
                                }
                            </p>
                        </div>
                        <p className="text-sm text-gray-500">Click para cambiar</p>
                    </div>
                </div>
            </div>
        </div>
    )
}
