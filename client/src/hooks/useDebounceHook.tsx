import { useEffect, useState } from "react";

export const useDebounceHook = <T,>({ value, delay }: { value: T; delay: number }) => {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    const timeout = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    return () => {
      clearTimeout(timeout);
    };
  }, [value]);

  return { debouncedValue };
};
