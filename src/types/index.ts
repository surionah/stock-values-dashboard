// Modelo de datos devueltos por el API de finnhub
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

// Modelo de datos para las opciones del componente Select
export interface SelectOption {
  label: string;
  value: string;
}

// Modelo de datos guardados en el localStorage
export interface StockData {
  alertValue: number;
  lastPrice: number;
}

// Modelo de datos almacenados en el contexto de la app
export interface StockProviderData {
  stocks: { [key: string]: StockData } | undefined;
  symbols: string[];
  addStock: (key: string, data: StockData) => void;
  updateStock: (key: string, lastPrice: number) => void;
}
