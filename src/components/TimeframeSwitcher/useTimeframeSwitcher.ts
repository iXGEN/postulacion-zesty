import { useDispatch, useSelector } from 'react-redux';
import { setTimeframe } from '@/features/filters/filtersSlice';

import type { RootState } from '@/app/store';
import type { Timeframe } from '@/features/filters/filtersSlice';

export const timeframeOptions: { key: Timeframe; label: string }[] = [
  { key: 'today', label: 'Hoy' },
  { key: '1w', label: '1W' },
  { key: '1m', label: '1M' },
  { key: '2m', label: '2M' },
];

export function useTimeframeSwitcher() {
  const dispatch = useDispatch();
  const selectedTimeframe = useSelector((state: RootState) => state.filters.timeframe);

  const handleTimeframeSelection = (newTimeframe: Timeframe) => {
    dispatch(setTimeframe(newTimeframe));
  };

  return {
    currentTimeframe: selectedTimeframe,
    handleTimeframeChange: handleTimeframeSelection,
    options: timeframeOptions,
  };
}
