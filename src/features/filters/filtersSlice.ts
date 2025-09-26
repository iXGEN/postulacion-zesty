import { createSlice, PayloadAction } from '@reduxjs/toolkit';

export type SortBy = 'pnlPct' | 'weight' | 'price';
export type Timeframe = 'today' | '1w' | '1m' | '2m';

type FiltersState = {
  tickerQuery: string;
  pnlRange: [number, number] | null;
  sortBy: SortBy;
  timeframe: Timeframe;
};

const initialState: FiltersState = {
  tickerQuery: '',
  pnlRange: null,
  sortBy: 'pnlPct',
  timeframe: '1m',
};

const filtersSlice = createSlice({
  name: 'filters',
  initialState,
  reducers: {
    setTickerQuery: (s, a: PayloadAction<string>) => {
      s.tickerQuery = a.payload;
    },
    setPnlRange: (s, a: PayloadAction<[number, number] | null>) => {
      s.pnlRange = a.payload;
    },
    setSortBy: (s, a: PayloadAction<SortBy>) => {
      s.sortBy = a.payload;
    },
    setTimeframe: (s, a: PayloadAction<Timeframe>) => {
      s.timeframe = a.payload;
    },
    resetFilters: () => initialState,
  },
});

export const {
  setTickerQuery,
  setPnlRange,
  setSortBy,
  setTimeframe,
  resetFilters,
} = filtersSlice.actions;
export default filtersSlice.reducer;
