export interface Stock {
  currency: string;
  description: string;
  displaySymbol: string;
  figi: string;
  isin: string | null;
  mic: string;
  shareClassFIGI: string;
  symbol: string;
  symbol2: string;
  type: string;
}

export interface SelectOption {
  label: string;
  value: string;
}

export interface StockData {
  alertValue: string;
  lastPrice?: number;
}

export interface StockProviderData {
  stocks: { [key: string]: StockData } | undefined;
  addStock: (key: string, data: StockData) => void;
}
