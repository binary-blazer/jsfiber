import { error } from "./lib/logger.js";

class Router {
  private routes: { [key: string]: { [key: string]: Function } };
  private rootHandler: Function | null;

  constructor() {
    this.routes = {};
    this.rootHandler = null;
  }

  public get(path: string, handler: Function): void {
    if (path === "/") {
      this.rootHandler = handler;
    } else {
      this.registerRoute("GET", path, handler);
    }
  }

  public post(path: string, handler: Function): void {
    this.registerRoute("POST", path, handler);
  }

  private registerRoute(method: string, path: string, handler: Function): void {
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = handler;
  }

  public handleRequest(method: string, path: string, ...args: any[]): void {
    if (path === "/" && this.rootHandler) {
      this.rootHandler(...args);
    } else {
      const routeHandler = this.routes[method]?.[path];
      if (routeHandler) {
        routeHandler(...args);
      } else {
        error(`No route found for ${method} ${path}`);
      }
    }
  }
}

const router = new Router();
export default router;
