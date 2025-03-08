import { Server } from "../dist/server.js";
import { Router, MiddlewareRouter } from "../dist/router.js";
import { response } from "../dist/http.js";

const server = new Server();
const router = new Router();
const middleware = new MiddlewareRouter();

middleware.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.get("/", (_req, res) => {
  const resInstance = response(res);
  resInstance.json({
    message: 'Hello, World!',
  });
});

server.setPublicDirectory("public");
server.start(3000);
