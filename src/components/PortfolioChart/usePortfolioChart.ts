import { useMemo } from 'react';
import { useSelector } from 'react-redux';
import { useStreamPricesQuery } from '@/services/pricesApi';

import type { RootState } from '@/app/store';

export type Point = { x: string; value: number };

export function usePortfolioChart() {
  const { data: priceData } = useStreamPricesQuery();
  const portfolioPositions = useSelector((state: RootState) => state.portfolio.positions);
  const selectedTimeframe = useSelector((state: RootState) => state.filters.timeframe);

  const chartDataSeries: Point[] = useMemo(() => {
    const historicalData = priceData?.history ?? {};
    const currentPrices = priceData?.last ?? {};

    const calculatePortfolioValueAtIndex = (dataIndex: number) => {
      let portfolioTotalValue = 0;
      for (const position of portfolioPositions) {
        const tickerHistoricalData = historicalData[position.ticker];
        const closePrice = tickerHistoricalData?.[dataIndex]?.close ?? position.avgPrice;
        portfolioTotalValue += closePrice * position.qty;
      }
      return portfolioTotalValue;
    };

    const referenceTicker = portfolioPositions[0]?.ticker;
    const referenceTickerData = referenceTicker ? (historicalData[referenceTicker] ?? []) : [];
    const dataLength = referenceTickerData.length;

    if (!dataLength) return [];

    let startIndex = 0;
    if (selectedTimeframe === '1w') startIndex = Math.max(0, dataLength - 7);
    if (selectedTimeframe === '1m') startIndex = Math.max(0, dataLength - 30);
    if (selectedTimeframe === '2m') startIndex = Math.max(0, dataLength - 60);

    if (selectedTimeframe !== 'today') {
      const historicalPoints: Point[] = [];
      for (let dataIndex = startIndex; dataIndex < dataLength; dataIndex++) {
        const dateString = referenceTickerData[dataIndex].date;
        historicalPoints.push({ 
          x: dateString.slice(5), 
          value: calculatePortfolioValueAtIndex(dataIndex) 
        });
      }
      return historicalPoints;
    }

    const lastDataIndex = dataLength - 1;
    const marketOpenValue = calculatePortfolioValueAtIndex(lastDataIndex);
    let currentMarketValue = 0;
    for (const position of portfolioPositions) {
      const lastClosePrice = historicalData[position.ticker]?.[lastDataIndex]?.close ?? position.avgPrice;
      const currentMarketPrice = currentPrices[position.ticker] ?? lastClosePrice;
      currentMarketValue += currentMarketPrice * position.qty;
    }
    const todayDateLabel = referenceTickerData[lastDataIndex].date.slice(5);
    return [
      { x: todayDateLabel + ' 09:30', value: marketOpenValue },
      { x: todayDateLabel + ' Ahora', value: currentMarketValue },
    ];
  }, [priceData?.history, priceData?.last, portfolioPositions, selectedTimeframe]);

  return {
    series: chartDataSeries,
    timeframe: selectedTimeframe,
  };
}
