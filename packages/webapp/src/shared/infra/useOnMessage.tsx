import { socket } from "#/lib/socket";
import type { WSVisionPayload } from "#/modules/request/infra/request.types";
import { useEffect } from "react";

export const useOnMessage = <T,>(
  eventName: string,
  handler: (payload: WSVisionPayload<T>["payload"]) => void
) => {
  useEffect(() => {
    const onMessage = (event: MessageEvent) => {
      try {
        const data = JSON.parse(event.data) as WSVisionPayload<T>;

        if (data.event === eventName) {
          handler(data.payload);
        }
      } catch (e: unknown) {
        console.warn("Invalid WS message", event.data, e);
      }
    };

    socket.addEventListener("message", onMessage);

    return () => {
      socket.removeEventListener("message", onMessage);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
