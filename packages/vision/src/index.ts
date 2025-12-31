import { Elysia } from "elysia";
import {
  VISION_CALL_EVENT_NAME,
  VISION_PATHS,
  VISION_REQUEST_ID_HEADER,
} from "./constants";
import type {
  _INTERNAL_VisionWebSocketPayload,
  ElysiaVisionConfig,
  VisionCall,
  VisionRequest,
  VisionResponse,
} from "./types";
import { sanitizeHeaders } from "./utils";

const vision = (config: ElysiaVisionConfig = {}) => {
  //TODO: tree shake this
  if (process.env.NODE_ENV === "production" || !config.enabled) {
    return new Elysia({
      name: "elysia-vision",
    });
  }

  const clients = new Set<any>();
  const calls: Map<string, VisionCall> = new Map();

  const emit = <T>(eventName: string, data: T) => {
    const payload: _INTERNAL_VisionWebSocketPayload<T> = {
      event: eventName,
      payload: data,
    };
    for (const ws of clients) {
      try {
        ws.send(payload);
      } catch {}
    }
  };

  const app = new Elysia({
    name: "elysia-vision",
  })
    .onRequest(async ({ request, set }) => {
      // To avoid "ERR_BODY_ALREADY_USED"
      const clonedRequest = request.clone();

      const url = new URL(clonedRequest.url);

      // Ignore /vision/* from webapp
      if (VISION_PATHS.some((path) => url.pathname.startsWith(path))) {
        return;
      }
      const visionRequestId = Bun.randomUUIDv7();

      set.headers[VISION_REQUEST_ID_HEADER] = visionRequestId;

      const visionRequest: VisionRequest = {
        method: clonedRequest.method,
        path: url.pathname + url.search,
        timestamp: Date.now(),
        body: clonedRequest.body
          ? JSON.stringify(await clonedRequest.body.json())
          : null,
        headers: request.headers.toJSON(),
      };

      const visionCall: VisionCall = {
        request: visionRequest,
        response: null,
        id: visionRequestId,
      };
      calls.set(visionRequestId, visionCall);
      emit(VISION_CALL_EVENT_NAME, visionCall);
    })
    .onAfterResponse(({ responseValue, set }) => {
      const visionRequestId = set.headers[VISION_REQUEST_ID_HEADER] as
        | string
        | undefined;

      if (!visionRequestId || visionRequestId === "") return;

      const visionResponse: VisionResponse = {
        body: responseValue ? JSON.stringify(responseValue) : null,
        status: set.status as unknown as number,
        timestamp: Date.now(),
        headers: sanitizeHeaders(set.headers),
      };

      const call = calls.get(visionRequestId);
      if (!call) return;
      call.response = visionResponse;
      calls.set(visionRequestId, call);
      emit(VISION_CALL_EVENT_NAME, call);
    })
    .ws("/vision", {
      open: (ws) => {
        clients.add(ws);
      },
      close: (ws) => {
        clients.delete(ws);
      },
    })
    .as("global");

  return app;
};

export default vision;
