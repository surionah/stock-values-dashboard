import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { useQuery } from "@tanstack/react-query";

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
  const { data: stocks = [] } = useQuery({
    queryKey: ["get-all-stocks"],
    queryFn: async () => {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}&token=${import.meta.env.VITE_API_KEY}`
      );
      return response.json();
    },
    select: (data) =>
      data.map((item: Stock) => ({
        value: item.symbol,
        label: item.description,
      })),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  function onSubmit(values: z.infer<typeof formSchema>) {
    console.log(values);
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormDescription>
          Select an stock and give an alert value to start watching pricing
          updates.
        </FormDescription>
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
        <Button type="submit">Start watching stock</Button>
      </form>
    </Form>
  );
}
