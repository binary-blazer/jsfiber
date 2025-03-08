import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { error, warn, success } from '../lib/logger.js';
import { routerInstance as router } from '../router.js';
import { middlewareInstance as middleware } from '../middleware.js';
import { readFile } from 'node:fs/promises';
import { join } from 'node:path';

class FiberServer {
  private server: any;
  private publicDirectory: string | null;

  constructor() {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const url = req.url ?? '/';
      const method = req.method ?? 'GET';
      middleware.executeMiddlewares(req, res, () => {
        if (this.publicDirectory && method === 'GET') {
          this.serveStaticFile(url, res);
        } else {
          router.handleRequest(method, url, req, res);
        }
      });
    });
    this.publicDirectory = null;
  }

  private async checkPortAvailability(port: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const testServer = createServer();
      testServer.listen(port, () => {
        testServer.close(() => {
          resolve(port);
        });
      });
      testServer.on('error', () => {
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

  public setPublicDirectory(path: string): void {
    this.publicDirectory = path;
  }

  private async serveStaticFile(url: string, res: ServerResponse): Promise<void> {
    try {
      const filePath = join(this.publicDirectory!, url);
      const data = await readFile(filePath);
      res.writeHead(200);
      res.end(data);
    } catch (err) {
      res.writeHead(404);
      res.end('File not found');
    }
  }
}

const fiberServerInstance = new FiberServer();
export { FiberServer, fiberServerInstance };
