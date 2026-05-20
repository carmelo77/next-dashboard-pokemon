import Image from "next/image"
import { notFound } from "next/navigation"

import { Pokemon } from "@/components/pokemons"

interface Props {
    params: Promise<{ name: string }>
}

// En build time
export async function generateStaticParams() {
    const response = await fetch('https://pokeapi.co/api/v2/pokemon?limit=151', {
        cache: 'force-cache'
    })
    const data = await response.json()
    return data.results.map((pokemon: { name: string }) => ({ name: pokemon.name }))
}

const getPokemonByName = async (name: string): Promise<Pokemon> => {
    const response = await fetch(`https://pokeapi.co/api/v2/pokemon/${name}`, {
        cache: 'force-cache'
    })

    if (!response.ok) {
        notFound()
    }

    return response.json()
}

export async function generateMetadata({ params }: Props) {

    const { name } = await params;
    const pokemon = await getPokemonByName(name);
    return {
        title: `# ${pokemon.id} - ${pokemon.name}`,
        description: `Pokemon ${pokemon.name} page`
    }
}

export default async function PokemonPage({ params }: Props) {

    const { name } = await params;
    const pokemon = await getPokemonByName(name);

    const typeColors: Record<string, string> = {
        fire: 'bg-orange-500', water: 'bg-blue-500', grass: 'bg-green-500',
        electric: 'bg-yellow-400', psychic: 'bg-pink-500', ice: 'bg-cyan-400',
        dragon: 'bg-indigo-600', dark: 'bg-gray-800', fairy: 'bg-rose-400',
        normal: 'bg-gray-400', fighting: 'bg-red-600', flying: 'bg-sky-400',
        poison: 'bg-purple-500', ground: 'bg-amber-600', rock: 'bg-stone-500',
        bug: 'bg-lime-500', ghost: 'bg-violet-700', steel: 'bg-slate-400',
    };

    const mainType = pokemon.types[0]?.type.name ?? 'normal';
    const badgeColor = typeColors[mainType] ?? 'bg-gray-400';

    return (
        <div className="flex mt-5 items-center text-slate-800">
            <div className="relative flex flex-col items-center rounded-[20px] w-full max-w-[800px] mx-auto bg-white bg-clip-border shadow-2xl p-8 mb-10">

                {/* ── Hero Section ── */}
                <div className="mt-2 mb-8 w-full flex flex-col items-center">
                    <p className="text-sm font-semibold text-slate-400 uppercase tracking-widest mb-1">
                        #{String(pokemon.id).padStart(3, '0')}
                    </p>
                    <h1 className="text-5xl font-black text-slate-800 capitalize mb-6">
                        {pokemon.name}
                    </h1>

                    <div className="flex flex-col justify-center items-center">
                        <Image
                            src={pokemon.sprites.other?.dream_world.front_default ?? pokemon.sprites.front_default}
                            width={200}
                            height={200}
                            alt={`Imagen del pokemon ${pokemon.name}`}
                            className="mb-6 drop-shadow-xl"
                        />

                        {/* type badges */}
                        <div className="flex flex-wrap gap-2 justify-center">
                            {pokemon.types.map(t => (
                                <span
                                    key={t.slot}
                                    className={`${typeColors[t.type.name] ?? 'bg-gray-400'} text-white text-sm font-bold uppercase px-4 py-1.5 rounded-full shadow-sm`}
                                >
                                    {t.type.name}
                                </span>
                            ))}
                        </div>

                        {/* quick stats */}
                        <div className="flex mt-4 gap-4 justify-center text-sm bg-slate-300 w-full border p-4 rounded-3xl">
                            <div className="text-center">
                                <p className="text-slate-500 uppercase text-xs font-semibold mb-1">Altura</p>
                                <p className="font-bold text-slate-800 text-lg">{pokemon.height / 10} m</p>
                            </div>
                            <div className="w-px bg-slate-200"></div>
                            <div className="text-center">
                                <p className="text-slate-500 uppercase text-xs font-semibold mb-1">Peso</p>
                                <p className="font-bold text-slate-800 text-lg">{pokemon.weight / 10} kg</p>
                            </div>
                            <div className="w-px bg-slate-200"></div>
                            <div className="text-center">
                                <p className="text-slate-500 uppercase text-xs font-semibold mb-1">Exp. Base</p>
                                <p className="font-bold text-slate-800 text-lg">{pokemon.base_experience}</p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Details Grid ── */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full mt-4">

                    {/* Stats Card */}
                    <div className="md:col-span-2 flex flex-col items-start justify-center rounded-3xl bg-slate-50 px-6 py-6 shadow-md border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-5">Estadísticas base</h2>
                        <div className="space-y-4 w-full">
                            {pokemon.stats.map(stat => (
                                <div key={stat.stat.name} className="flex items-center gap-4">
                                    <span className="w-32 text-sm font-semibold text-slate-500 uppercase shrink-0">
                                        {stat.stat.name.replace('-', ' ')}
                                    </span>
                                    <span className="w-8 text-base font-bold text-slate-800 text-right shrink-0">
                                        {stat.base_stat}
                                    </span>
                                    <div className="flex-1 bg-slate-200 rounded-full h-3 overflow-hidden">
                                        <div
                                            className={`h-full rounded-full ${badgeColor}`}
                                            style={{ width: `${Math.min((stat.base_stat / 255) * 100, 100)}%` }}
                                        />
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Regular Sprites */}
                    <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-50 px-6 py-6 shadow-md border border-slate-100">
                        <p className="text-base font-bold text-slate-800 mb-4">Regular Sprites</p>
                        <div className="flex justify-center gap-6">
                            <Image src={pokemon.sprites.front_default} width={100} height={100} alt={`sprite front ${pokemon.name}`} className="drop-shadow-md" />
                            <Image src={pokemon.sprites.back_default} width={100} height={100} alt={`sprite back ${pokemon.name}`} className="drop-shadow-md" />
                        </div>
                    </div>

                    {/* Shiny Sprites */}
                    <div className="flex flex-col items-center justify-center rounded-3xl bg-slate-50 px-6 py-6 shadow-md border border-slate-100">
                        <p className="text-base font-bold text-slate-800 mb-4">Shiny Sprites ✨</p>
                        <div className="flex justify-center gap-6">
                            <Image src={pokemon.sprites.front_shiny} width={100} height={100} alt={`shiny front ${pokemon.name}`} className="drop-shadow-md" />
                            <Image src={pokemon.sprites.back_shiny} width={100} height={100} alt={`shiny back ${pokemon.name}`} className="drop-shadow-md" />
                        </div>
                    </div>

                    {/* Moves Card */}
                    <div className="md:col-span-2 flex flex-col justify-center rounded-3xl bg-slate-50 px-6 py-6 shadow-md border border-slate-100">
                        <h2 className="text-xl font-bold text-slate-800 mb-5">
                            Movimientos <span className="text-sm font-normal text-slate-500">({pokemon.moves.length})</span>
                        </h2>
                        <div className="flex flex-wrap gap-2 max-h-48 overflow-y-auto pr-2 custom-scrollbar">
                            {pokemon.moves.map(move => (
                                <span
                                    key={move.move.name}
                                    className="bg-white border border-slate-200 text-slate-700 text-sm font-medium capitalize px-4 py-2 rounded-full shadow-sm"
                                >
                                    {move.move.name}
                                </span>
                            ))}
                        </div>
                    </div>

                </div>
            </div>
        </div>
    );
}