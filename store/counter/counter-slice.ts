import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CounterState {
    count: number;
    isReady: boolean;
}

const initialState: CounterState = {
    count: 5,
    isReady: false,
}

const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {

    initCounterState: (state, action: PayloadAction<number>) => {
      if ( state.isReady ) return;

      state.count = action.payload;
      state.isReady = true;
    },

    increment: (state) => { state.count++ },
    decrement: (state) => { state.count-- },
    resetCounter: (state, action: PayloadAction<number>) => {
        if (action.payload < 0) return;
        state.count = action.payload;
    },
  }
});

export const { increment, decrement, resetCounter, initCounterState } = counterSlice.actions;

export default counterSlice.reducer