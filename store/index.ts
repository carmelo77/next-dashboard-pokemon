import { configureStore } from "@reduxjs/toolkit";
import counterReducer from './counter/counter-slice';
import pokemonSlice from './pokemons/pokemon-slice'
import { localStorageMiddleware } from './middlewares/localStorage-middleware';
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export const store = configureStore({
    reducer: {
        counter: counterReducer,
        pokemon: pokemonSlice
    },
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware().concat(localStorageMiddleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;