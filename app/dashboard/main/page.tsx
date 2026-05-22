import { IoCafeOutline } from "react-icons/io5"
;
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
                <SimpleWidget
                    title="Contador"
                    subtitle="Contador agregado"
                    label="Contador"
                    icon={<IoCafeOutline size={50} className="text-blue-500" />}
                    href="/dashboard/counter"
                />
            </div>
        </div>
    )
}