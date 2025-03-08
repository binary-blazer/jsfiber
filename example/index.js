import { Server } from "../dist/server.js";
import { routerInstance as router } from "../dist/router.js";
import { middlewareInstance as middleware } from "../dist/middleware.js";
import { responseInstance as response } from "../dist/response.js";

const server = new Server();

middleware.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.get("/", (_req, res) => {
  const resInstance = response(res);
  resInstance.text("Hello, World!");

  // resInstance.json({
  //     message: 'Hello, World!',
  // })
});

server.start(3000);