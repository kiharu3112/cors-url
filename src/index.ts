import { Hono } from "hono";
import { cors } from "hono/cors";

const app = new Hono();
app.use("/", cors({ origin: "*" }));

const help = `
  <h1>Help</h1>
  <p>Usage:</p>
  <ul>
    <li>GET /url?url=https://example.com/a.png</li>
  </ul>
`;

app.get("/", (c) => {
  return c.html(help);
});

app.get("/url/", async (c) => {
  const { url } = c.req.query();
  console.log("access url", url);
  const res = await fetch(url);
  console.log("status: ", res.status);
  console.log("headers: ", res.headers);
  return res;
});

export default app;
