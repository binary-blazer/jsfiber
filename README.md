# JSFiber

JSFiber is a next-generation JavaScript web framework designed to be a comprehensive web server utility like Express. It provides routing, middleware, and request handling features, all while being fast and efficient.

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

const server = new Server({ infoBox: true });
server.start(3000);
```

### Port Availability Check

The server now includes a feature to check port availability before starting. If the specified port is unavailable, the server will try subsequent ports until it finds an available one. Warnings are logged each time a new port is tried.

### Defining Routes

You can define routes using the `router` instance. Here is an example of defining GET and POST routes:

```javascript
import { Server } from "jsfiber/server";
import { Router } from "jsfiber/router";
import { 
  request,
  response 
} from "jsfiber/http";

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

You can use middleware to handle tasks such as logging, authentication, etc. Here is an example of using middleware:

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
  resInstance.json({ message: 'Options request received' });
});
```

## Full Example

Bellow we provide a complete full example code.

```javascript
import { Server } from "jsfiber/server";
import { Router, MiddlewareRouter } from "jsfiber/router";
import { request, response } from "jsfiber/http";

const server = new Server({ infoBox: true });
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

server.setPublicDirectory("public");
server.start(3000);
```

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.
