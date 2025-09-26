import { useMemo, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useStreamPricesQuery } from '@/services/pricesApi';
import { updateMetrics } from '@/features/portfolio/portfolioSlice';

import type { RootState } from '@/app/store';
import type { PortfolioMetrics } from '@/features/portfolio/portfolioSlice';

export function usePortfolioDashboard() {
  const dispatch = useDispatch();
  const portfolioPositions = useSelector((state: RootState) => state.portfolio.positions);
  const { data: priceData, isLoading: isPriceDataLoading, isError: isPriceDataError } = useStreamPricesQuery();

  const portfolioMetrics: PortfolioMetrics = useMemo(() => {
    const currentPrices = priceData?.last ?? {};
    const historicalData = priceData?.history ?? {};

    let portfolioTotalValue = 0;
    let portfolioTotalCost = 0;
    let portfolioOpenValue = 0;

    portfolioPositions.forEach(position => {
      const { ticker, qty, avgPrice } = position;
      
      // Current price (live or last close)
      const lastClosePrice = historicalData[ticker]?.[historicalData[ticker].length - 1]?.close;
      const currentMarketPrice = currentPrices[ticker] ?? lastClosePrice ?? avgPrice;
      
      // Open price (previous close)
      const marketOpenPrice = lastClosePrice ?? avgPrice;
      
      // Calculate values
      const positionCurrentValue = currentMarketPrice * qty;
      const positionCostBasis = avgPrice * qty;
      const positionOpenValue = marketOpenPrice * qty;
      
      portfolioTotalValue += positionCurrentValue;
      portfolioTotalCost += positionCostBasis;
      portfolioOpenValue += positionOpenValue;
    });

    // Calculate P&L
    const totalProfitLossAbsolute = portfolioTotalValue - portfolioTotalCost;
    const totalProfitLossPercentage = portfolioTotalCost > 0 ? (totalProfitLossAbsolute / portfolioTotalCost) * 100 : 0;

    // Calculate intraday change
    const intradayValueChange = portfolioTotalValue - portfolioOpenValue;
    const intradayPercentageChange = portfolioOpenValue > 0 ? (intradayValueChange / portfolioOpenValue) * 100 : 0;

    return {
      totalValue: portfolioTotalValue,
      totalCost: portfolioTotalCost,
      totalPnLAbs: totalProfitLossAbsolute,
      totalPnLPct: totalProfitLossPercentage,
      intradayChange: intradayValueChange,
      intradayChangePct: intradayPercentageChange,
      openValue: portfolioOpenValue,
    };
  }, [portfolioPositions, priceData?.last, priceData?.history]);

  // Update metrics in store whenever they change
  useEffect(() => {
    dispatch(updateMetrics(portfolioMetrics));
  }, [portfolioMetrics, dispatch]);

  return {
    metrics: portfolioMetrics,
    isLoading: isPriceDataLoading || !priceData,
    isConnected: priceData?.connected ?? false,
    isError: isPriceDataError || !!priceData?.error,
    error: priceData?.error,
    reconnectAttempts: priceData?.reconnectAttempts ?? 0,
  };
}
