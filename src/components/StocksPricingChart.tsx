import { useMemo } from "react";
import { Bar, BarChart, XAxis } from "recharts";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  ChartLegend,
  ChartLegendContent,
} from "@/components/ui/chart";
import { useStockData } from "@/hooks/useStockData";

const chartConfig = {
  alertValue: {
    label: "Alert value",
  },
  lastPrice: {
    label: "Latest price",
  },
} satisfies ChartConfig;

export default function StocksPricingChart() {
  const { stocks } = useStockData();

  const memoizedStocks = useMemo(
    () =>
      Object.entries(stocks ?? {}).map(([key, { alertValue, lastPrice }]) => ({
        stock: key,
        alertValue: parseInt(alertValue.toFixed()),
        lastPrice: parseInt(lastPrice.toFixed()),
      })),
    [stocks]
  );

  return (
    <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
      <BarChart accessibilityLayer data={memoizedStocks}>
        <XAxis
          dataKey="stock"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip content={<ChartTooltipContent />} />
        <ChartLegend content={<ChartLegendContent />} />
        <Bar dataKey="alertValue" fill="var(--chart-1)" radius={4} />
        <Bar dataKey="lastPrice" fill="var(--chart-2)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
