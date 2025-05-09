import StockCard from "./StockCard";
import { useStockData } from "@/hooks/useStockData";

// Componente que renderiza una lista de tarjetas de stocks
export default function StockCardList() {
  const { stocks } = useStockData();

  return (
    <div className="flex flex-row flex-nowrap gap-4 items-center overflow-auto">
      {Object.entries(stocks || {}).map(([key, value]) => (
        <StockCard key={key} stock={{ symbol: key, ...value }} />
      ))}
    </div>
  );
}
