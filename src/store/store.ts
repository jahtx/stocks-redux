import { configureStore } from '@reduxjs/toolkit';
import stocksReducer from './stocksSlice';
import { ThunkAction, Action } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    stocks: stocksReducer,
  },
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
