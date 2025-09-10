import { Hono } from 'hono'

const app = new Hono({ strict: false }).basePath("/api");

// Root endpoint
app.get('/', (c) => {
  return c.html('<h1>Hello Hono!</h1>')
})

// About endpoint
app.get('/about', (c) => {
  return c.redirect('https://justincourse.com/about')
})

// Health check endpoint
app.get("/health", (c) => {
  return c.json({ status: "I am healthy!" });
});

// CRUD endpoints
app.all("/all", (c) => c.text("It's a request to /all"));
app.get("/crud", (c) => c.text("It's a GET request to /crud"));
app.put("/crud", (c) => c.text("It's a PUT request to /crud"));
app.delete("/crud", (c) => c.text("It's a DELETE request to /crud"));
app.post("/crud", async (c) => {
  const body = await c.req.json();

  const { abc } = body || {};

  return c.json({ body, abc });
});

// Dynamic endpoint
app.get("/dynamic/:name", async (c) => {
  const name = c.req.param("name");
  return c.text(`GET a ${name}`);
});

app.get("/dynamic/posts/:id/comment/:comment_id", async (c) => {
  const { id, comment_id } = c.req.param();
  const { q, n } = c.req.query();
  const tags = c.req.queries('tags');

  const result = `GET a post ${id} and comment ${comment_id}`;

  return c.json({ id, comment_id, result, q, n, tags });
});

// Health check endpoint
app.get("/health", (c) => c.text("It's a GET request to /health"));

// Client endpoint
app.get("/client", (c) => {
  const request = c.req;
  const userAgent = request.header("user-agent") || "Unknown";

  return c.json({
    message: "It's a GET request to /client",
    userAgent,
    method: request.method,
    url: request.url,
    ip: request.header("cf-connecting-ip") || "Unknown"
  });
});

// Not found endpoint
app.notFound((c) => {
  return c.text("This endpoint is not found", 404);
});

// Error endpoint
app.onError((err, c) => {
  return c.text("Custom Error Message", 500);
});

export default app
