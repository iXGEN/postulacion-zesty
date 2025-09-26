import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setTickerQuery, setSortBy, setPnlRange } from '@/features/filters/filtersSlice';
import { useDebouncedValue } from '@/hooks/useDebouncedValue';

import type { RootState } from '@/app/store';
import type { SortBy } from '@/features/filters/filtersSlice';

export function useFiltersBar() {
  const dispatch = useDispatch();
  const tickerQueryFromStore = useSelector((s: RootState) => s.filters.tickerQuery);
  const currentSortBy = useSelector((s: RootState) => s.filters.sortBy);
  const pnlRangeFromStore = useSelector((s: RootState) => s.filters.pnlRange);
  
  const [localTickerQuery, setLocalTickerQuery] = useState(tickerQueryFromStore);
  const [minPnlPercentage, setMinPnlPercentage] = useState(pnlRangeFromStore?.[0]?.toString() ?? '');
  const [maxPnlPercentage, setMaxPnlPercentage] = useState(pnlRangeFromStore?.[1]?.toString() ?? '');

  const debouncedTickerQuery = useDebouncedValue(localTickerQuery, 250);
  const debouncedMinPnlPercentage = useDebouncedValue(minPnlPercentage, 300);
  const debouncedMaxPnlPercentage = useDebouncedValue(maxPnlPercentage, 300);

  const clearPnlRange = () => {
    setMinPnlPercentage('');
    setMaxPnlPercentage('');
    dispatch(setPnlRange(null));
  };

  const handleMinPnlPercentageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === '' || /^-?\d*\.?\d*$/.test(inputValue)) {
      setMinPnlPercentage(inputValue);
    }
  };

  const handleMaxPnlPercentageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const inputValue = event.target.value;
    if (inputValue === '' || /^-?\d*\.?\d*$/.test(inputValue)) {
      setMaxPnlPercentage(inputValue);
    }
  };

  const clearTickerQuery = () => setLocalTickerQuery('');
  
  const handleSortByChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    dispatch(setSortBy(event.target.value as SortBy));
  };

  // Sync local state with store state
  useEffect(() => {
    setMinPnlPercentage(pnlRangeFromStore?.[0]?.toString() ?? '');
    setMaxPnlPercentage(pnlRangeFromStore?.[1]?.toString() ?? '');
  }, [pnlRangeFromStore]);

  useEffect(() => {
    setLocalTickerQuery(tickerQueryFromStore);
  }, [tickerQueryFromStore]);

  // Update store with debounced values
  useEffect(() => {
    dispatch(setTickerQuery(debouncedTickerQuery.trim()));
  }, [debouncedTickerQuery, dispatch]);

  useEffect(() => {
    const minPnlValue = debouncedMinPnlPercentage ? Number(debouncedMinPnlPercentage) : null;
    const maxPnlValue = debouncedMaxPnlPercentage ? Number(debouncedMaxPnlPercentage) : null;

    if (minPnlValue !== null && maxPnlValue !== null && Number.isFinite(minPnlValue) && Number.isFinite(maxPnlValue)) {
      dispatch(setPnlRange([minPnlValue, maxPnlValue]));
    } else if (minPnlValue === null && maxPnlValue === null) {
      dispatch(setPnlRange(null));
    }
  }, [debouncedMinPnlPercentage, debouncedMaxPnlPercentage, dispatch]);

  return {
    localTickerQuery,
    setLocalTickerQuery,
    currentSortBy,
    minPnlPercentage,
    maxPnlPercentage,
    clearTickerQuery,
    handleSortByChange,
    handleMinPnlPercentageChange,
    handleMaxPnlPercentageChange,
    clearPnlRange,
  };
}
