import { createSlice } from '@reduxjs/toolkit';

export type Position = { ticker: string; qty: number; avgPrice: number };

export type PortfolioMetrics = {
  totalValue: number;
  totalCost: number;
  totalPnLAbs: number;
  totalPnLPct: number;
  intradayChange: number;
  intradayChangePct: number;
  openValue: number;
};

type PortfolioState = { 
  positions: Position[];
  metrics: PortfolioMetrics;
};

const initialState: PortfolioState = {
  positions: [
    { ticker: 'AAPL', qty: 12, avgPrice: 173.2 },
    { ticker: 'NVDA', qty: 4, avgPrice: 830.1 },
    { ticker: 'TSLA', qty: 8, avgPrice: 210.5 },
    { ticker: 'AMZN', qty: 5, avgPrice: 145.0 },
    { ticker: 'MSFT', qty: 6, avgPrice: 405.0 },
    { ticker: 'COIN', qty: 3, avgPrice: 215.0 },
  ],
  metrics: {
    totalValue: 0,
    totalCost: 0,
    totalPnLAbs: 0,
    totalPnLPct: 0,
    intradayChange: 0,
    intradayChangePct: 0,
    openValue: 0,
  },
};

const portfolioSlice = createSlice({
  name: 'portfolio',
  initialState,
  reducers: {
    updateMetrics: (state, action) => {
      state.metrics = action.payload;
    },
  },
});

export const { updateMetrics } = portfolioSlice.actions;
export default portfolioSlice.reducer;
