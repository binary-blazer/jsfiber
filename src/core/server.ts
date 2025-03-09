import { createServer, IncomingMessage, ServerResponse } from "node:http";
import { error, warn, success } from "../lib/logger.js";
import { middlewares } from "../data/middlewares.js";
import executeMiddlewares from "../functions/executeMiddlewares.js";
import handleRequest from "../functions/handleRequests.js";
import { readFile, stat, access } from "node:fs/promises";
import { join } from "node:path";
import { constants } from "node:fs";
import Box from "cli-box";
import ip from "ip";
import { fiberResponseInstance } from "./response.js";

class FiberServer {
  private server: any;
  private publicDirectory: string | null;
  private enableCORS: boolean;

  constructor(config: { enableCORS?: boolean } = {}) {
    this.server = createServer((req: IncomingMessage, res: ServerResponse) => {
      const url = req.url ?? "/";
      const method = req.method ?? "GET";
      executeMiddlewares(req, res, middlewares, async () => {
        if (this.publicDirectory && method === "GET") {
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
        if (this.enableCORS) {
          const resInstance = fiberResponseInstance(res);
          resInstance.setCORSHeaders({
            "Access-Control-Allow-Origin": "*",
            "Access-Control-Allow-Methods":
              "GET, POST, PUT, DELETE, PATCH, OPTIONS",
            "Access-Control-Allow-Headers": "Content-Type, Authorization",
          });
        }
      });
    });
    this.publicDirectory = null;
    this.enableCORS = config.enableCORS ?? false;
  }

  private async checkPortAvailability(port: number): Promise<number> {
    return new Promise((resolve, reject) => {
      const testServer = createServer();
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

  public async start(port: number, infoBox: boolean): Promise<void> {
    try {
      const availablePort = await this.checkPortAvailability(port);
      if (availablePort !== port) {
        warn(
          `port ${port} is unavailable. Trying port ${availablePort} instead.`,
        );
      }

      const box = new Box(
        {
          w: 50,
          h: 4,
          stringify: false,
          marks: {
            nw: "\x1b[34m╭\x1b[0m",
            n: "\x1b[34m─\x1b[0m",
            ne: "\x1b[34m╮\x1b[0m",
            e: "\x1b[34m│\x1b[0m",
            se: "\x1b[34m╯\x1b[0m",
            s: "\x1b[34m─\x1b[0m",
            sw: "\x1b[34m╰\x1b[0m",
            w: "\x1b[34m│\x1b[0m",
          },
        },
        {
          text: `Public Directory: ${this.publicDirectory ? `./${this.publicDirectory}` : "Not set"}\n\nhttp://localhost:${availablePort}/\nhttp://${ip.address()}:${availablePort}/`,
          stretch: false,
          autoEOL: true,
          hAlign: "middle",
          vAlign: "center",
        },
      ).stringify();

      if (infoBox) console.log(box);

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

  public setCORS(enable: boolean): void {
    this.enableCORS = enable;
  }

  private async serveStaticFile(
    filePath: string,
    res: ServerResponse,
  ): Promise<void> {
    try {
      const data = await readFile(filePath);
      res.writeHead(200);
      res.end(data);
    } catch (err) {
      res.writeHead(404);
      res.end("File not found");
    }
  }
}

const fiberServerInstance = new FiberServer();
export { FiberServer, fiberServerInstance };
