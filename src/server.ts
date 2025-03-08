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
        console.warn(`Port ${port} is unavailable. Trying port ${availablePort} instead.`);
      }
      this.server.listen(availablePort, () => {
        console.log(`Server running at http://localhost:${availablePort}/`);
      });
    } catch (error) {
      console.error("Failed to start the server:", error);
    }
  }
}

const serverInstance = new Server();
export { Server, serverInstance };
