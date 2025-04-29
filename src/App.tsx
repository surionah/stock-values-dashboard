import PWABadge from "./PWABadge";
import AddStockForm from "./components/AddStockForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import StockCardList from "./components/StockCardList";
import StockDataProvider from "./providers/StockDataProvider";
import StocksPricingChart from "./components/StocksPricingChart";
import WebSocketProvider from "./providers/WebSocketProvider";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <StockDataProvider>
        <WebSocketProvider>
          <header className="h-24 p-4 bg-gray-900">
            <StockCardList />
          </header>
          <aside className="w-1/4 h-[calc(100%-6rem)] p-8 pt-64 absolute top-[6rem] left-0 bg-gray-100">
            <AddStockForm />
          </aside>
          <main className="w-3/4 h-[calc(100%-6rem)] absolute left-1/4 px-24 pt-24">
            <StocksPricingChart />
          </main>
          <PWABadge />
        </WebSocketProvider>
      </StockDataProvider>
    </QueryClientProvider>
  );
}

export default App;
