import { Metadata } from "next";

import { CartCounter } from "@/components/shopping-cart";



export const metadata: Metadata = {
    title: 'Shopping Cart Counter',
    description: 'Un simple contador',
}
export default function CounterPage() {
    return (
        <div className="flex flex-col items-center justify-center w-full h-full">
            <span>Productos en el carrito</span>

            <CartCounter initialValue={10} />

        </div>
    )
}
