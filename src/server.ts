import http from "node:http";
import { error, warn, success } from "./lib/logger.js";
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

  private async checkPortAvailability(port: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const testServer = http.createServer();
      testServer.listen(port, () => {
        testServer.close(() => {
          resolve(port);
        });
      });
      testServer.on("error", () => {
        resolve(this.checkPortAvailability(port + 1));
      });
    });
  }

  public async start(port: number): Promise<void> {
    try {
      const availablePort = await this.checkPortAvailability(port);
      if (availablePort !== port) {
        warn(`port ${port} is unavailable. Trying port ${availablePort} instead.`);
      }
      this.server.listen(availablePort, () => {
        success(`server running at http://localhost:${availablePort}/`);
      });
    } catch (e) {
      error(`server startup failure: ${e}`);
    }
  }
}

const serverInstance = new Server();
export { Server, serverInstance };
