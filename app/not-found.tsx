import Link from 'next/link'
import { Sidebar } from '@/components/sidebar/Sidebar'

export default function NotFoundPage() {
    return (
        <div className="flex h-screen w-screen overflow-hidden bg-slate-100">
            <Sidebar />

            <div className="flex-1 flex items-center justify-center p-16">
                <div className="bg-white rounded-3xl shadow-xl p-14 flex flex-col items-center text-center max-w-xl w-full">

                    {/* Number */}
                    <span className="text-9xl font-black text-slate-600 leading-none">404</span>

                    {/* Divider */}
                    <div className="w-16 h-1 bg-slate-600 rounded-full my-6" />

                    {/* Title */}
                    <h1 className="text-3xl font-bold text-black mb-3">
                        Página no encontrada
                    </h1>

                    {/* Description */}
                    <p className="text-slate-500 text-base mb-10 max-w-sm leading-relaxed">
                        El Pokémon o la página que estás buscando no existe, fue eliminada o la URL es incorrecta.
                    </p>

                    {/* Button */}
                    <Link
                        href="/dashboard/pokemons"
                        className="bg-slate-600 text-white font-semibold px-12 p-4 rounded-2xl shadow-lg hover:bg-indigo-700 hover:-translate-y-0.5 hover:shadow-xl transition-all duration-150"
                    >
                        ← Volver al listado de pokemons
                    </Link>

                </div>
            </div>
        </div>
    )
}