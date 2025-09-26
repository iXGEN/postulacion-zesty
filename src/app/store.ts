import { configureStore } from '@reduxjs/toolkit';
import filtersReducer from '../features/filters/filtersSlice';
import portfolioReducer from '../features/portfolio/portfolioSlice';
import { pricesApi } from '../services/pricesApi';

export const store = configureStore({
  reducer: {
    filters: filtersReducer,
    portfolio: portfolioReducer,
    [pricesApi.reducerPath]: pricesApi.reducer,
  },
  middleware: getDefault => getDefault().concat(pricesApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
