import { useState, useEffect } from "react";
import { StockData } from "@/types";
import { StockDataContext } from "@/hooks/useStockData";
import useLocalStorage from "@/hooks/useLocalStorage";

export default function StockDataProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { value, setValue } = useLocalStorage<{ [key: string]: StockData }>(
    "stocks"
  );
  const [stocks, setStocks] = useState<{ [key: string]: StockData }>(value);

  const addStock = (key: string, data: StockData) => {
    setStocks((prevStocks) => ({ ...prevStocks, [key]: data }));
  };

  useEffect(() => {
    setValue(stocks);
  }, [stocks, setValue]);

  return (
    <StockDataContext.Provider value={{ stocks, addStock }}>
      {children}
    </StockDataContext.Provider>
  );
}
