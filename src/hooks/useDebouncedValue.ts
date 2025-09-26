import { useEffect, useState } from 'react';

export function useDebouncedValue<T>(inputValue: T, delayInMilliseconds = 250) {
  const [debouncedValue, setDebouncedValue] = useState<T>(inputValue);
  useEffect(() => {
    const timeoutId = setTimeout(() => setDebouncedValue(inputValue), delayInMilliseconds);
    return () => clearTimeout(timeoutId);
  }, [inputValue, delayInMilliseconds]);
  return debouncedValue;
}
