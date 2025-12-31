import { describe, expect, it } from "bun:test";
import Elysia, { t } from "elysia";
import vision from "../src";

import type { VisionCall } from "../src/types";

describe("Request", () => {
  it("send request and response to the client", async () => {
    const app = new Elysia()
      .use(vision())
      .post(
        "/users",
        ({ body, set }) => {
          set.status = 201;
          return {
            message: `HI ${body.name}`,
          };
        },
        {
          body: t.Object({
            name: t.String(),
          }),
        }
      )
      .listen(3000);

    const socket = new WebSocket(`ws://localhost:3000/vision`);

    socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data).payload as VisionCall;
      if (!message.response) return;
      // Request
      expect(message.request.body).toEqual(JSON.stringify({ name: "John" }));
      expect(message.request.headers["content-type"]).toEqual(
        "application/json"
      );
      expect(message.request.method).toEqual("POST");
      expect(message.request.path).toEqual("/users");

      // Response
      expect(message.response?.body).toEqual(
        JSON.stringify({ message: "HI John" })
      );
      expect(message.response?.headers["content-type"]).toEqual(
        "application/json"
      );
      expect(message.response?.status).toEqual(201);
    });

    socket.onopen = async () => {
      await fetch("http://localhost:3000/users", {
        headers: {
          "Content-Type": "application/json",
        },
        method: "POST",
        body: JSON.stringify({ name: "John" }),
      });
    };
  });
});
