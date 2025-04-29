import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "./ui/skeleton";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormDescription,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import VirtualizedSelect from "./VirtualizedSelect";
import { Stock } from "@/types";
import { useStockData } from "@/hooks/useStockData";

const formSchema = z.object({
  alertValue: z
    .string({
      required_error: "Alert value is required",
    })
    .refine(
      (value) =>
        !isNaN(parseFloat(value)) && parseFloat(value).toString() === value,
      {
        message: "Must be a valid float value",
      }
    ),
  stock: z.string({
    required_error: "Stock is required",
  }),
});

export default function AddStockForm() {
  const { data: stocks = [], isLoading: loadingStocks } = useQuery({
    queryKey: ["get-all-stocks"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}&token=${import.meta.env.VITE_API_KEY}`
      );
      return response.json();
    },
    select: ({ result }) => {
      return result.map((item: Stock) => ({
        value: item.symbol,
        label: item.description,
      }));
    },
  });

  const { stocks: storedStocks, addStock } = useStockData();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit({ stock, alertValue }: z.infer<typeof formSchema>) {
    const existentStock = storedStocks?.[stock];
    if (existentStock) {
      return;
    }
    addStock(stock, { alertValue: parseFloat(alertValue), lastPrice: 0 });
    form.reset();
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormDescription>
          Select an stock and give an alert value to start watching pricing
          updates.
        </FormDescription>
        {loadingStocks ? (
          <Skeleton className="w-full h-[2rem] bg-gray-300" />
        ) : (
          <FormField
            control={form.control}
            name="stock"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Stock</FormLabel>
                <FormControl>
                  <VirtualizedSelect options={stocks} formField={field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        {loadingStocks ? (
          <Skeleton className="w-full h-[2rem] bg-gray-300" />
        ) : (
          <FormField
            control={form.control}
            name="alertValue"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Alert value</FormLabel>
                <FormControl>
                  <Input
                    placeholder="Enter an alert value"
                    {...field}
                    value={field.value ?? ""}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit" disabled={loadingStocks}>
          Start watching stock
        </Button>
      </form>
    </Form>
  );
}
