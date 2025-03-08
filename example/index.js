import { Server } from "jsfiber/server";
import { Router, MiddlewareRouter } from "jsfiber/router";
import { request, response } from "jsfiber/http";

const server = new Server({ infoBox: false, enableCORS: true });
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
