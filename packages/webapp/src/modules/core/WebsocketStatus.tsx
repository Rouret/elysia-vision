import { socket } from "#/lib/socket";
import { useEffect, useState } from "react";

type WebsocketStatus = "open" | "closed" | "error" | "connecting";

export const WebsocketStatus = () => {
  const [status, setStatus] = useState<WebsocketStatus>(() => {
    // Initialisation basée sur l'état actuel du socket
    if (socket.readyState === WebSocket.OPEN) return "open";
    if (socket.readyState === WebSocket.CLOSED) return "closed";
    return "connecting";
  });

  useEffect(() => {
    const onOpen = () => setStatus("open");
    const onClose = () => setStatus("closed");
    const onError = () => setStatus("error");

    socket.addEventListener("open", onOpen);
    socket.addEventListener("close", onClose);
    socket.addEventListener("error", onError);

    return () => {
      socket.removeEventListener("open", onOpen);
      socket.removeEventListener("close", onClose);
      socket.removeEventListener("error", onError);
    };
  }, []);

  const statusConfig = {
    open: { badge: "badge-success", text: "Connected" },
    closed: { badge: "badge-warning", text: "Disconnected" },
    error: { badge: "badge-error", text: "Connection Error" },
    connecting: { badge: "badge-warning", text: "Connecting..." },
  };

  const config = statusConfig[status];

  return (
    <div className="flex items-center gap-2 pr-2">
      <div className={`badge ${config.badge} badge-xs rounded-full`} />
      <p className="text-xs">{config.text}</p>
    </div>
  );
};
