import PWABadge from "./PWABadge.tsx";
import AddStockForm from "./components/AddStockForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StockCardList from "./components/StockCardList";
import StockDataProvider from "./providers/StockDataProvider.tsx";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StockDataProvider>
        <header className="h-24 p-4">
          <StockCardList />
        </header>
        <aside className="w-1/4 h-full rounded-2xl p-8 pt-32">
          <AddStockForm />
        </aside>
        <main></main>
        <PWABadge />
      </StockDataProvider>
    </QueryClientProvider>
  );
}

export default App;
