# JSFiber

JSFiber is a JavaScript web framework designed to be a comprehensive web server utility like Express. It provides routing, middleware, and request handling features, all while being fast and efficient.

> [!CAUTION]
> **This project is under construction** and is not fully tested and expected to be entirely working yet. Please use with caution.

## Installation

To install JSFiber, use npm or the package manager of your choice.

```sh
npm install jsfiber
# or
pnpm add jsfiber
# or
yarn add jsfiber
# or
bun add jsfiber
```

## Usage

### Starting the Server

To start the server, create a new instance of the server and call the `start` method with the desired port number:

```javascript
import { Server } from "jsfiber/server";

const server = new Server({ infoBox: true, enableCORS: true });
server.start(3000);
```

### Port Availability Check

The server includes a feature to check port availability before starting. If the specified port is unavailable, the server will try subsequent ports until it finds an available one. Warnings are logged each time a new port is tried.

### Defining Routes

You can define routes using the `router` instance. Here is an example of defining GET and POST routes:

```javascript
import { Server } from "jsfiber/server";
import { Router } from "jsfiber/router";
import { request, response } from "jsfiber/http";

const server = new Server({ infoBox: true });
const router = new Router();

router.get("/", async (_req, res) => {
  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Hello, World!',
  });
});

router.post("/create", async (req, res) => {
  const reqInstance = request(req);
  const body = await reqInstance.body;
  console.log(`Body: ${body}`);

  const resInstance = response(res);
  resInstance.status(201).json({
    message: 'Resource created',
  });
});
```

### Using Middleware

You can use the middleware router to setup middlewares to handle tasks such as logging, authentication, etc. Here is an example of using a middleware with the middleware router:

```javascript
import { MiddlewareRouter } from "jsfiber/router";

const middleware = new MiddlewareRouter();

middleware.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

### Additional HTTP Methods

JSFiber supports additional HTTP methods such as PUT, DELETE, PATCH, HEAD, and OPTIONS. Here is an example of defining routes for these methods:

```javascript
router.put('/update', async (req, res) => {
  const reqInstance = request(req);
  const body = await reqInstance.body;
  const resInstance = response(res);
  resInstance.json({ message: 'Resource updated', received: body });
});

router.delete('/delete', (req, res) => {
  const resInstance = response(res);
  resInstance.json({ message: 'Resource deleted' });
});

router.patch('/modify', async (req, res) => {
  const reqInstance = request(req);
  const body = await reqInstance.body;
  const resInstance = response(res);
  resInstance.json({ message: 'Resource modified', received: body });
});

router.head('/info', (req, res) => {
  const resInstance = response(res);
  resInstance.text('');
});

router.options('/options', (req, res) => {
  const resInstance = response(res);
  resInstance.json({ message: 'OPTIONS request received' });
});
```

### Cookie Parser

JSFiber includes a built-in cookie parser. You can use it to parse cookies from the request headers. Here is an example:

```javascript
router.get("/cookies", async (req, res) => {
  const reqInstance = request(req);
  const cookies = reqInstance.parseCookies();
  console.log(`Cookies: ${JSON.stringify(cookies)}`);

  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Cookies parsed',
    cookies: cookies
  });
});
```

### CORS Support

JSFiber includes built-in CORS support. You can enable CORS by including the `CorsModule` in the `modules` array in the server options. Here is an example:

```javascript
import { Server } from "jsfiber/server";

const server = new Server({ infoBox: true, enableCORS: true });
server.start(3000);
```

## Full Example

Bellow we provide a complete full example code.

```javascript
import { Server } from "jsfiber/server";
import { Router, MiddlewareRouter } from "jsfiber/router";
import { request, response } from "jsfiber/http";

const server = new Server({ infoBox: true, enableCORS: true });
const router = new Router();
const middleware = new MiddlewareRouter();

middleware.use(async (req, res, next) => {
  console.log(`Middleware: ${req.method} ${req.url}`);
  next();
});

router.get("/", async (_req, res) => {
  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Hello, World!',
  });
});

router.post("/create", async (req, res) => {
  const reqInstance = request(req);
  const body = await reqInstance.body;
  console.log(`Body: ${body}`);

  const resInstance = response(res);
  resInstance.status(201).json({
    message: 'Resource created',
  });
});

router.put("/update", async (req, res) => {
  const reqInstance = request(req);
  const body = await reqInstance.body;
  console.log(`Body: ${body}`);

  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Resource updated',
  });
});

router.delete("/delete", async (_req, res) => {
  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Resource deleted',
  });
});

router.patch("/modify", async (req, res) => {
  const reqInstance = request(req);
  const body = await reqInstance.body;
  console.log(`Body: ${body}`);

  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Resource modified',
  });
});

router.head("/info", async (_req, res) => {
  const resInstance = response(res);
  resInstance.status(200).text('');
});

router.options("/options", async (_req, res) => {
  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Options request received',
  });
});

router.get("/cookies", async (req, res) => {
  const reqInstance = request(req);
  const cookies = reqInstance.parseCookies();
  console.log(`Cookies: ${JSON.stringify(cookies)}`);

  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Cookies parsed',
    cookies: cookies
  });
});

server.setPublicDirectory("public");
server.start(3000);
```

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.
