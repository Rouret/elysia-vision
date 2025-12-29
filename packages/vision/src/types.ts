export type _INTERNAL_VisionWebSocketPayload<T> = {
  event: string;
  payload: T;
};

export type VisionRequest = {
  method: string;
  path: string;
  timestamp: number;
  body: string | null;
  headers: Record<string, string | number>;
};

export type VisionResponse = {
  timestamp: number;
  body: string | null;
  status: number;
  headers: Record<string, string | number>;
};

export type VisionCall = {
  id: string;
  request: VisionRequest;
  response: VisionResponse | null;
};

export type ElysiaVisionConfig = {
  /**
   * @default true
   * false in production
   */
  enabled?: boolean;
};
