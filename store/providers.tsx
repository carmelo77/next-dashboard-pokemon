'use client'

import { useEffect } from 'react'
import { Provider } from 'react-redux'

import { store } from './index'
import { loadFavouritesFromStorage } from './pokemons/favourites-storage'
import { initFavourites } from './pokemons/pokemon-slice'

interface Props {
    children: React.ReactNode
}

export const Providers = ({ children }: Props) => {
    useEffect(() => {
        store.dispatch(initFavourites(loadFavouritesFromStorage()));
    }, []);

    return (
        <Provider store={store}>
            {children}
        </Provider>
    )
}
