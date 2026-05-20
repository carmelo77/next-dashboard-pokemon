import { SimpleWidget } from "@/components";

export const metadata = {
    title: 'Admin Dashboard',
    description: 'Dashboard',
}

export default function MainPage() {
    return (
        <div>
            <h1 className="mt-12 text-3xl font-semibold">Dashboard</h1>
            <span className="text-xl mt-4">Información general</span>

            <div className="flex flex-wrap p-2 items-center justify-center">
                <SimpleWidget />
            </div>
        </div>
    )
}