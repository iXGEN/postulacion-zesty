import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useStreamPricesQuery } from '@/services/pricesApi';

import type { RootState } from '@/app/store';

export type PositionRow = {
  ticker: string;
  qty: number;
  avgPrice: number;
  price: number;
  value: number;
  pnlAbs: number;
  pnlPct: number;
  weight: number;
};

export function usePositionsTable() {
  const portfolioPositions = useSelector((state: RootState) => state.portfolio.positions);
  const tickerSearchQuery = useSelector((state: RootState) => state.filters.tickerQuery);
  const currentSortBy = useSelector((state: RootState) => state.filters.sortBy);
  const pnlPercentageRange = useSelector((state: RootState) => state.filters.pnlRange);
  const { data: priceData } = useStreamPricesQuery();

  const positionRows: PositionRow[] = useMemo(() => {
    const currentPrices = priceData?.last ?? {};
    const historicalData = priceData?.history ?? {};

    const positionsWithCalculations = portfolioPositions.map(position => {
      const lastClosePrice = historicalData[position.ticker]?.[historicalData[position.ticker].length - 1]?.close;
      const currentMarketPrice = currentPrices[position.ticker] ?? lastClosePrice ?? position.avgPrice;
      const positionValue = currentMarketPrice * position.qty;
      const profitLossAbsolute = (currentMarketPrice - position.avgPrice) * position.qty;
      const profitLossPercentage = position.avgPrice > 0 ? (currentMarketPrice / position.avgPrice - 1) * 100 : 0;
      return { 
        ...position, 
        price: currentMarketPrice, 
        value: positionValue, 
        pnlAbs: profitLossAbsolute, 
        pnlPct: profitLossPercentage, 
        weight: 0 
      };
    });

    const portfolioTotalValue = positionsWithCalculations.reduce((accumulator, row) => accumulator + row.value, 0);
    const positionsWithWeights = positionsWithCalculations.map(row => ({ 
      ...row, 
      weight: portfolioTotalValue ? (row.value / portfolioTotalValue) * 100 : 0 
    }));

    // Filter by ticker
    const normalizedTickerQuery = (tickerSearchQuery || '').trim().toLowerCase();
    let filteredPositions = normalizedTickerQuery 
      ? positionsWithWeights.filter(row => row.ticker.toLowerCase().includes(normalizedTickerQuery)) 
      : positionsWithWeights;

    // Filter by P&L percentage range
    if (pnlPercentageRange) {
      const [minPnlPercentage, maxPnlPercentage] = pnlPercentageRange;
      filteredPositions = filteredPositions.filter(row => 
        row.pnlPct >= minPnlPercentage && row.pnlPct <= maxPnlPercentage
      );
    }

    // Sort in descending order
    const sortedPositions = [...filteredPositions].sort((positionA, positionB) => {
      if (currentSortBy === 'pnlPct') return positionB.pnlPct - positionA.pnlPct || positionA.ticker.localeCompare(positionB.ticker);
      if (currentSortBy === 'weight') return positionB.weight - positionA.weight || positionA.ticker.localeCompare(positionB.ticker);
      if (currentSortBy === 'price') return positionB.price - positionA.price || positionA.ticker.localeCompare(positionB.ticker);
      return positionA.ticker.localeCompare(positionB.ticker);
    });

    return sortedPositions;
  }, [portfolioPositions, priceData?.last, priceData?.history, tickerSearchQuery, pnlPercentageRange, currentSortBy]);

  return {
    rows: positionRows,
    tickerQuery: tickerSearchQuery,
  };
}
