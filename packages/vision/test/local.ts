import { Elysia, t } from "elysia";
import vision from "../src";

new Elysia()
  .use(vision())
  .get(
    "/users/:id",
    ({ params }) => {
      return {
        message: `HI ${params.id}`,
      };
    },
    {
      params: t.Object({
        id: t.String(),
      }),
    }
  )
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
  .get("/error", () => {
    throw new Error("Test error");
  })
  .get("/delay", async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));

    return { message: "Hello, world!" };
  })
  .listen(3000, ({ hostname, port }) => {
    console.log(`Server is running on ${hostname}:${port}`);
  });
