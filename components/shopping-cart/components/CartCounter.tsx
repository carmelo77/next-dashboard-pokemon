'use client'

import { useState } from 'react'

interface Props {
    initialValue?: number;
}

export const CartCounter = ({ initialValue = 0 }: Props) => {

    const [count, setCount] = useState(initialValue);

    return (
        <>
            <span className="text-9xl">{count}</span>
            <div className="flex">
                <button
                    className="flex items-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
                    onClick={() => setCount(count + 1)}
                >
                    +1
                </button>

                <button
                    className="flex items-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
                    onClick={() => setCount(count - 1)}
                >
                    -1
                </button>
            </div>
        </>
    )
}
