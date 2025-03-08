import { middlewares, handlers, routes } from "./data";

export class MiddlewareRouter {
  private middlewares: Function[];

  constructor() {
    this.middlewares = middlewares;
  }

  public use(middleware: any): void {
    this.middlewares.push(middleware);
    middlewares.push(middleware);
  }
}

export class Router {
  private routes: { [key: string]: { [key: string]: Function } };

  constructor() {
    this.routes = routes;
  }

  public get(path: string, handler: Function): void {
    if (path === "/") {
      handlers.rootHandler = handler;
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
      routes[method] = {};
    }
    this.routes[method][path] = handler;
    routes[method][path] = handler;
  }
}

export const middlewareRouter = new MiddlewareRouter();
export const router = new Router();