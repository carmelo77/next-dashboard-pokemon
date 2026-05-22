'use client'

import { useEffect, useState } from 'react'

import { useAppDispatch, useAppSelector } from '@/store';
import { decrement, increment, initCounterState, resetCounter } from '@/store/counter/counter-slice';

interface Props {
    initialValue?: number;
}

export interface CounterResponse {
    method: string;
    count: number;
}

async function getAPiCounter(): Promise<CounterResponse> {
    try {
        const response = await fetch('/api/counter');

        if (!response.ok) {
            throw new Error(`Error HTTP: ${response.status}`);
        }

        return await response.json();
    } catch (error) {
        console.error('Error al obtener el contador:', error);
        throw error;
    }
}

export const CartCounter = ({ initialValue = 0 }: Props) => {

   const count = useAppSelector(state => state.counter.count);
   const dispatch = useAppDispatch();

    //const [count, setCount] = useState(initialValue);

    // useEffect(() => {
    //     dispatch(initCounterState(initialValue));
    // }, [dispatch, initialValue])

    useEffect(() => {
      const fetchCounter = async () => {
        try {
          const res = await getAPiCounter();
          dispatch(initCounterState(res.count));
        } catch {
          dispatch(initCounterState(initialValue));
        }
      };

      fetchCounter();
    }, [dispatch])
    

    return (
        <>
            <span className="text-9xl">{count}</span>
            <div className="flex">
                <button
                    className="flex items-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px] mr-2"
                    onClick={() => dispatch(increment())}
                >
                    +1
                </button>

                <button
                    className="flex items-center p-2 rounded-xl bg-gray-900 text-white hover:bg-gray-600 transition-all w-[100px]"
                    onClick={() => dispatch(decrement())}
                >
                    -1
                </button>
            </div>
        </>
    )
}
