import { useMemo } from "react";

// Maneja la logica de almacenamiento en localstorage
export default function useLocalStorage<T>(key: string) {
  const value = useMemo(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : undefined;
    } catch (error) {
      console.error(error);
      return undefined;
    }
  }, [key]);

  const setValue = (value: T) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(value ?? {}));
    } catch (error) {
      console.error(error);
    }
  };

  return { value, setValue } as const;
}
