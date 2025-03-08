import { fiberServerInstance } from "./core/server.js";
import { error, warn } from "./lib/logger.js";

/**
 * Represents the server instance.
 */
class Server {
  private server: any;

  constructor() {
    this.server = fiberServerInstance;
  }

  /**
   * Checks the availability of a port.
   * @param {number} port - The port number to check.
   * @returns {Promise<number>} - A promise that resolves to an available port number.
   */
  private async checkPortAvailability(port: number): Promise<number> {
    return this.server.checkPortAvailability(port);
  }

  /**
   * Starts the server on the specified port.
   * @param {number} port - The port number to start the server on.
   * @returns {Promise<void>} - A promise that resolves when the server has started.
   */
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

  /**
   * Sets the public directory for serving static files.
   * @param {string} path - The path to the public directory.
   */
  public setPublicDirectory(path: string): void {
    this.server.setPublicDirectory(path);
  }
}

export { Server };
