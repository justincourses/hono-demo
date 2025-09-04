import { Hono } from 'hono'

const app = new Hono()

app.get('/', (c) => {
  return c.text('Hello Hono!')
})

app.get("/health", (c) => {
  return c.json({ status: "I am healthy!" });
});

app.get("/client", (c) => {
  const request = c.req;
  const userAgent = request.header("user-agent") || "Unknown";

  return c.json({ browser: userAgent, method: request.method, url: request.url, ip: request.header("cf-connecting-ip") || "Unknown" });
});

export default app
