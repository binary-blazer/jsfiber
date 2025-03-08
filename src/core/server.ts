import { createServer, IncomingMessage, ServerResponse } from 'node:http';

import { error, warn, success } from '../lib/logger.js';
import { middlewares } from '../data/middlewares.js';

import executeMiddlewares from '../functions/executeMiddlewares.js';
import handleRequest from '../functions/handleRequests.js';

import { readFile, stat, access } from 'node:fs/promises';
import { join } from 'node:path';
import { constants } from 'node:fs';

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
            await access(filePath, constants.F_OK);
            const fileStat = await stat(filePath);
            if (fileStat.isFile()) {
              this.serveStaticFile(filePath, res);
            } else {
              handleRequest(method, url, req, res);
            }
          } catch (err) {
            handleRequest(method, url, req, res);
          }
        } else {
          handleRequest(method, url, req, res);
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