import PWABadge from "./PWABadge.tsx";
import AddStockForm from "./components/AddStockForm";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <header className="h-32"></header>
      <aside className="w-1/4 h-full rounded-2xl p-8 pt-32">
        <AddStockForm />
      </aside>
      <main></main>
      <PWABadge />
    </QueryClientProvider>
  );
}

export default App;
