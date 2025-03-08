import { Server } from "../dist/server.js";
import router from "../dist/router.js";
import middleware from "../dist/middleware.js";
import response from "../dist/response.js";

const server = new Server();

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
