export type WSVisionRequest = {
  method: string;
  path: string;
  timestamp: number;
  body: string | null;
  headers: Record<string, string | number>;
};

export type WSVisionResponse = {
  timestamp: number;
  body: string | null;
  status: number;
  headers: Record<string, string | number>;
};

export type WSVisionCall = {
  request: WSVisionRequest;
  response: WSVisionResponse | null;
  id: string;
};

export type WSVisionPayload<T> = {
  event: string;
  payload: T;
};

export const VISION_CALL_EVENT_NAME = "vision-call";

export type VisionRequest = WSVisionRequest;

export type VisionResponse = WSVisionResponse;
export type VisionCall = WSVisionCall & {
  duration: number | null;
};
