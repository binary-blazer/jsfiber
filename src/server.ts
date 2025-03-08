import http from "node:http";
import { routerInstance as router } from "./router.js";
import { middlewareInstance as middleware } from "./middleware.js";

class Server {
  private server: http.Server;

  constructor() {
    this.server = http.createServer((req, res) => {
      const url = req.url ?? "/";
      const method = req.method ?? "GET";
      middleware.executeMiddlewares(req, res, () => {
        router.handleRequest(method, url, req, res);
      });
    });
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  }
}

const serverInstance = new Server();
export { Server, serverInstance };
