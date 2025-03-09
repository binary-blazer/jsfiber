import { fiberServerInstance } from "./core/server.js";
import { error, warn } from "./lib/logger.js";

interface ServerOptions {
  /**
   * Whether to display the info box when the server starts. Info box contains the server URL (localhost and IP address) and the public directory path.
   * @type {boolean}
   */
  infoBox?: boolean;
}

/**
 * Represents the server instance.
 */
class Server {
  private server: any;
  private infoBox: boolean;

  constructor(options: ServerOptions = {}) {
    this.server = fiberServerInstance;
    this.infoBox = options.infoBox ?? false;
  }

  private async checkPortAvailability(port: number): Promise<number> {
    return this.server.checkPortAvailability(port);
  }

  /**
   * Starts the server on the specified port.
   * @param {number} port - The port number to start the server on.
   * @returns {Promise<void>} - A promise that resolves when the server has started.
   * @example
   * server.start(3000);
   * // Server running at http://localhost:3000
   */
  public async start(port: number): Promise<void> {
    try {
      const availablePort = await this.checkPortAvailability(port);
      if (availablePort !== port) {
        warn(
          `port ${port} is unavailable. Trying port ${availablePort} instead.`,
        );
      }
      this.server.start(availablePort, this.infoBox);
    } catch (e) {
      error(`server startup failure: ${e}`);
    }
  }

  /**
   * Sets the public directory for serving static files.
   * @param {string} path - The path to the public directory.
   * @returns {void}
   * @example
   * server.setPublicDirectory("public");
   * // Static files are now served from the ./public directory.
   */
  public setPublicDirectory(path: string): void {
    this.server.setPublicDirectory(path);
  }
}

export { Server };
