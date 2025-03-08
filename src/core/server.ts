import { createServer, IncomingMessage, ServerResponse } from 'node:http';
import { error, warn, success } from '../lib/logger.js';
import { router } from '../router.js';
import { middlewares } from '../data/middlewares.js';
import executeMiddlewares from '../functions/executeMiddlewares.js';
import { readFile, stat } from 'node:fs/promises';
import { join } from 'node:path';

class FiberServer {
  private server: any;
  private publicDirectory: string | null;

  constructor() {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const url = req.url ?? '/';
      const method = req.method ?? 'GET';
      executeMiddlewares(req, res, middlewares, async () => {
        if (this.publicDirectory && method === 'GET') {
          const filePath = join(this.publicDirectory, url);
          try {
            const fileStat = await stat(filePath);
            if (fileStat.isFile()) {
              this.serveStaticFile(filePath, res);
            } else {
              router.handleRequest(method, url, req, res);
            }
          } catch (err) {
            router.handleRequest(method, url, req, res);
          }
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

  private async serveStaticFile(filePath: string, res: ServerResponse): Promise<void> {
    try {
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