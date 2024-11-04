import { assertEquals } from "@std/assert";
import server from "./main.ts";

Deno.test(async function serverFetch() {
  const req = new Request("https://deno.land");
  const res = await server.fetch(req);
  assertEquals(await res.text(), "Home page");
});

Deno.test(async function serverFetchNotFound() {
  const req = new Request("https://deno.land/404");
  const res = await server.fetch(req);
  assertEquals(res.status, 404);
});

Deno.test(async function serverFetchUsers() {
  const req = new Request("https://deno.land/users/123");
  const res = await server.fetch(req);
  assertEquals(await res.text(), "123");
});

Deno.test(async function serverFetchStatic() {
  const req = new Request("https://deno.land/static/hello.js");
  const res = await server.fetch(req);
  assertEquals(await res.text(), 'console.log("Hello, world!");\n');
  assertEquals(res.headers.get("content-type"), "text/javascript; charset=UTF-8");
});
