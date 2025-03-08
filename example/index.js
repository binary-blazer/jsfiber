import { Server } from "../dist/server.js";
import { Router, MiddlewareRouter } from "../dist/router.js";
import { request, response } from "../dist/http.js";

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
