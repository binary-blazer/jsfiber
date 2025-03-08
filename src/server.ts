import { CustomServer, customServerInstance } from "./core/server.js";
import { error, warn, success } from "./lib/logger.js";
import { routerInstance as router } from "./router.js";
import { middlewareInstance as middleware } from "./middleware.js";

class Server {
  private server: any;

  constructor() {
    this.server = customServerInstance;
  }

  private async checkPortAvailability(port: number): Promise<number> {
    return this.server.checkPortAvailability(port);
  }

  public async start(port: number): Promise<void> {
    try {
      const availablePort = await this.checkPortAvailability(port);
      if (availablePort !== port) {
        warn(`port ${port} is unavailable. Trying port ${availablePort} instead.`);
      }
      this.server.start(availablePort);
    } catch (e) {
      error(`server startup failure: ${e}`);
    }
  }
}

const serverInstance = new Server();
export { Server, serverInstance };
