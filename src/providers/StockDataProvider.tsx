import { useState, useEffect } from "react";
import { StockData } from "@/types";
import { StockDataContext } from "@/hooks/useStockData";
import useLocalStorage from "@/hooks/useLocalStorage";

// Maneja el estado de los stocks guardados en la app
export default function StockDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, setValue } = useLocalStorage<{ [key: string]: StockData }>(
    "stocks"
  );
  const [stocks, setStocks] = useState<{ [key: string]: StockData }>(value);
  const [watchedSymbols, setWatchedSymbols] = useState<string[]>(
    Object.keys(value ?? {})
  );

  // Agrega un nuevo stock al estado
  const addStock = (key: string, data: StockData) => {
    setStocks((prevStocks) => ({ ...prevStocks, [key]: data }));
    setWatchedSymbols((prevSymbols) => [...prevSymbols, key]);
  };

  // Actualiza el precio de un stock en el estado
  const updateStock = (key: string, lastPrice: number) => {
    setStocks((prevStocks) => ({
      ...prevStocks,
      [key]: { ...prevStocks[key], lastPrice },
    }));
  };

  useEffect(() => {
    setValue(stocks);
  }, [stocks, setValue]);

  return (
    <StockDataContext.Provider
      value={{ stocks, symbols: watchedSymbols, addStock, updateStock }}
    >
      {children}
    </StockDataContext.Provider>
  );
}
