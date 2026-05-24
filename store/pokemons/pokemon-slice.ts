import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import type { SimplePokemon } from '@/components/pokemons';

interface favouritesState {
    favourites: SimplePokemon[];
    isHydrated: boolean;
}

const initialState: favouritesState = {
    favourites: [],
    isHydrated: false,
};

const pokemonSlice = createSlice({
  name: 'pokemons',
  initialState,
  reducers: {

    initFavourites: (state, action: PayloadAction<SimplePokemon[]>) => {
      if (state.isHydrated) return;

      state.favourites = action.payload;
      state.isHydrated = true;
    },

    togglefavourite: (state, action: PayloadAction<SimplePokemon>) => {
      const { id } = action.payload;
      const index = state.favourites.findIndex(item => item.id === id);

      if (index !== -1) {
        state.favourites.splice(index, 1);
        return;
      }

      state.favourites.push(action.payload)
    }
  }
});

export const { initFavourites, togglefavourite } = pokemonSlice.actions;

export default pokemonSlice.reducer