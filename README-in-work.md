# JSFiber

JSFiber is a next-generation JavaScript web framework designed to be a comprehensive web server utility like Express. It provides routing, middleware, and request handling features, all while being fast and efficient.

## Installation

To install JSFiber, use npm:

```sh
npm install jsfiber
```

## Usage

### Starting the Server

To start the server, create a new instance of the server and call the `start` method with the desired port number:

```typescript
import server from './src/server';

server.start(3000);
```

### Port Availability Check

The server now includes a feature to check port availability before starting. If the specified port is unavailable, the server will try subsequent ports until it finds an available one. Warnings are logged each time a new port is tried.

### Defining Routes

You can define routes using the `router` instance. Here is an example of defining GET and POST routes:

```typescript
import router from './src/router';
import request from './src/request';
import response from './src/response';

router.get('/hello', (req, res) => {
  const resInstance = response(res);
  resInstance.text('Hello, World!');
});

router.post('/data', async (req, res) => {
  const reqInstance = request(req);
  const body = await reqInstance.body;
  const resInstance = response(res);
  resInstance.json({ received: body });
});
```

### Using Middleware

You can use middleware to handle tasks such as logging, authentication, etc. Here is an example of using middleware:

```typescript
import middleware from './src/middleware';

middleware.use((req, res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});
```

### Improved Error Handling

The server now includes improved error handling to manage various scenarios, including port unavailability and server errors. This ensures that the server can handle errors gracefully and provide meaningful error messages.

### Additional HTTP Methods

JSFiber now supports additional HTTP methods such as PUT, DELETE, PATCH, HEAD, and OPTIONS. Here is an example of defining routes for these methods:

```typescript
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

## License

This project is licensed under the BSD-3-Clause License - see the [LICENSE](LICENSE) file for details.
