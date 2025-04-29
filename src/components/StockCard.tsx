import { cn } from "@/lib/utils";

function calculateChangePercent(
  initialValue: number,
  newValue: number
): number {
  const changePercent = ((newValue - initialValue) / initialValue) * 100;
  return changePercent;
}

interface StockCardProps {
  stock: {
    symbol: string;
    lastPrice: number;
    alertValue: number;
  };
}

export default function StockCard({
  stock: { symbol, alertValue, lastPrice },
}: StockCardProps) {
  return (
    <div className="bg-gray-900 min-w-[16rem] h-[4rem] border-r-2 border-gray-400 pl-2 pr-4">
      <div className="flex flex-row justify-between text-gray-200">
        <p>{symbol}</p>
        <p>{lastPrice}</p>
      </div>
      <div className="text-center mt-2 text-2xl">
        <p
          className={cn(
            "text-gray-200",
            calculateChangePercent(alertValue, lastPrice) < 0
              ? "text-red-500"
              : "text-green-500"
          )}
        >{`${
          lastPrice
            ? `${calculateChangePercent(alertValue, lastPrice).toFixed(2)}%`
            : "-- --"
        }`}</p>
      </div>
    </div>
  );
}
