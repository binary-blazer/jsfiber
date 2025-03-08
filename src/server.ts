import { fiberServerInstance } from "./core/server.js";
import { error, warn } from "./lib/logger.js";

class Server {
  private server: any;

  constructor() {
    this.server = fiberServerInstance;
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

  public setPublicDirectory(path: string): void {
    this.server.setPublicDirectory(path);
  }
}

const serverInstance = new Server();
export { Server, serverInstance };
