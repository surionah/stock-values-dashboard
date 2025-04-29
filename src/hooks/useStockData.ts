import { createContext, useContext } from "react";
import { StockProviderData } from "@/types";

export const StockDataContext = createContext<StockProviderData>({
  stocks: undefined,
  symbols: [],
  addStock: () => {},
  updateStock: () => {},
});

export function useStockData() {
  return useContext(StockDataContext);
}
