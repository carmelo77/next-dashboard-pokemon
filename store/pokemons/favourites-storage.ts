import type { SimplePokemon } from '@/components/pokemons';
import { FAVOURITES_POKEMONS_STORAGE_KEY } from '@/store/constants/local-storage-keys';

export function loadFavouritesFromStorage(): SimplePokemon[] {
    if (typeof window === 'undefined') {
        return [];
    }

    return JSON.parse(
        localStorage.getItem(FAVOURITES_POKEMONS_STORAGE_KEY) ?? '[]'
    ) as SimplePokemon[];
}

export function saveFavouritesToStorage(favourites: SimplePokemon[]): void {
    if (typeof window === 'undefined') {
        return;
    }

    localStorage.setItem(
        FAVOURITES_POKEMONS_STORAGE_KEY,
        JSON.stringify(favourites)
    );
}
