import type { Middleware } from '@reduxjs/toolkit';

import { saveFavouritesToStorage } from '@/store/pokemons/favourites-storage';
import { togglefavourite } from '@/store/pokemons/pokemon-slice';

export const localStorageMiddleware: Middleware = (storeApi) => (next) => (action) => {
    const result = next(action);

    if (togglefavourite.match(action)) {
        const { pokemon } = storeApi.getState();
        saveFavouritesToStorage(pokemon.favourites);
    }

    return result;
};
