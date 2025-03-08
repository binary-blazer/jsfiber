import { Server } from "../dist/server.js";
import { Router, MiddlewareRouter } from "../dist/router.js";
import { request, response } from "../dist/http.js";

const server = new Server({ infoBox: true });
const router = new Router();
const middleware = new MiddlewareRouter();

middleware.use((req, _res, next) => {
  console.log(`${req.method} ${req.url}`);
  next();
});

router.get("/", async (_req, res) => {
  const resInstance = response(res);
  resInstance.status(200).json({
    message: 'Hello, World!',
  });
});

// router.post("/", async (req, res) => {
//   const reqInstance = request(req);
//   const body = await reqInstance.body;
//   console.log(`Body: ${body}`);

//   const resInstance = response(res);
//   resInstance.status(200).json({
//     message: 'Hello, World!',
//   });
// });

server.setPublicDirectory("public");
server.start(3000);
