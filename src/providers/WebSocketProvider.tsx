import { createContext, useEffect } from "react";
import { useStockData } from "@/hooks/useStockData";

const WebSocketContext = createContext({});

// Maneja la logica de conexión y desconexión del websocket
export default function WebSocketProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const { symbols, updateStock } = useStockData();

  // Se conecta al websocket cada vez que se agrega un nuevo símbolo
  useEffect(() => {
    const socket = new WebSocket(
      `${import.meta.env.VITE_WS_URL}?token=${import.meta.env.VITE_API_KEY}`
    );
    socket.onopen = () => {
      console.log("WebSocket connection opened");
      // Se valida el estado del socket antes de enviar el mensaje
      if (socket.readyState === WebSocket.OPEN) {
        // Se suscribe a cada uno de los simbolos guardados
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
      // Se verifica que el mensaje recibido sea un array
      // y se reduce a un objeto con el símbolo como clave y el precio como valor
      if (Array.isArray(JSON.parse(data).data)) {
        const newData = JSON.parse(data).data.reduce(
          (
            accum: { [key: string]: number },
            item: { p: number; s: string }
          ) => ({ ...accum, [item.s]: item.p }),
          {}
        );
        // Se actualiza el precio de cada símbolo en el contexto
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

    // Se dessuscribe de los símbolos al cerrar el socket
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
