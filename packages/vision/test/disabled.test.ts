import { describe, expect, it } from "bun:test";
import Elysia from "elysia";
import vision from "../src";

describe("Disabled", () => {
  it("Disabled when enabled is false", async () => {
    const app = new Elysia()
      .use(vision({ enabled: false }))
      .get("/", () => "HI")
      .listen(3000);

    const socket = new WebSocket(`ws://localhost:3000/vision`);

    socket.addEventListener("error", (event) => {
      expect(socket.readyState).toBe(WebSocket.CLOSED);
    });
  });
  it("Disabled in production", async () => {
    const prev = process.env.NODE_ENV;
    process.env.NODE_ENV = "production";
    const app = new Elysia()
      .use(vision())
      .get("/", () => "HI")
      .listen(3000);

    const socket = new WebSocket(`ws://localhost:3000/vision`);

    socket.addEventListener("error", (event) => {
      expect(socket.readyState).toBe(WebSocket.CLOSED);
    });
    process.env.NODE_ENV = prev;
  });
});

describe("Enabled", () => {
  it("Enabled by default", async () => {
    const app = new Elysia()
      .use(vision())
      .get("/", () => "HI")
      .listen(3000);

    const socket = new WebSocket(`ws://localhost:3000/vision`);

    socket.addEventListener("open", (event) => {
      expect(socket.readyState).toBe(WebSocket.OPEN);
    });
  });
  it("Enabled when enabled is true", async () => {
    const app = new Elysia()
      .use(vision({ enabled: true }))
      .get("/", () => "HI")
      .listen(3000);

    const socket = new WebSocket(`ws://localhost:3000/vision`);

    socket.addEventListener("open", (event) => {
      expect(socket.readyState).toBe(WebSocket.OPEN);
    });
  });
});
