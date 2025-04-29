import { createContext, useEffect } from "react";
import { useStockData } from "@/hooks/useStockData";

const WebSocketContext = createContext({});

export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { symbols, updateStock } = useStockData();

  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_URL}?token=${import.meta.env.VITE_API_KEY}`
    );
    socket.onopen = () => {
      console.log("WebSocket connection opened");
      if (socket.readyState === WebSocket.OPEN) {
        symbols.forEach((symbol) => {
          socket.send(
            JSON.stringify({
              type: "subscribe",
              symbol,
            })
          );
        });
      }
    };

    socket.onmessage = ({ data }) => {
      if (Array.isArray(JSON.parse(data).data)) {
        const newData = JSON.parse(data).data.reduce(
          (
            accum: { [key: string]: number },
            item: { p: number; s: string }
          ) => ({ ...accum, [item.s]: item.p }),
          {}
        );
        Object.entries(newData).forEach(([key, value]) => {
          updateStock(key, value as number);
        });
      }
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
    };

    return () => {
      if (socket.readyState === WebSocket.OPEN) {
        symbols.forEach((symbol) => {
          socket.send(
            JSON.stringify({
              type: "unsubscribe",
              symbol,
            })
          );
        });
        socket.close();
      }
    };
  }, [symbols]);

  return (
    <WebSocketContext.Provider value={{}}>{children}</WebSocketContext.Provider>
  );
}
