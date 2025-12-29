import type { HTTPHeaders } from "elysia";
import { HEADERS_TO_REMOVE } from "./constants";

export const sanitizeHeaders = (
  headers: HTTPHeaders
): Record<string, string | number> => {
  return Object.fromEntries(
    Object.entries(headers)
      .filter(([key]) => !HEADERS_TO_REMOVE.includes(key))
      .map(([key, value]) => [
        key,
        Array.isArray(value) ? value.join(", ") : value,
      ])
  );
};
