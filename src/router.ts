import { middlewares, handlers, routes } from "./data";

/**
 * MiddlewareRouter class to manage middleware functions.
 */
export class MiddlewareRouter {
  private middlewares: Function[];

  constructor() {
    this.middlewares = middlewares;
  }

  /**
   * Adds a middleware function to the middleware stack.
   * @param {Function} middleware - The middleware function to add.
   */
  public use(middleware: any): void {
    this.middlewares.push(middleware);
    middlewares.push(middleware);
  }
}

/**
 * Router class to manage route handlers.
 */
export class Router {
  private routes: { [key: string]: { [key: string]: Function } };

  constructor() {
    this.routes = routes;
  }

  /**
   * Registers a GET route handler.
   * @param {string} path - The path for the GET route.
   * @param {Function} handler - The handler function for the GET route.
   */
  public get(path: string, handler: Function): void {
    if (path === "/") {
      handlers.rootHandler = handler;
    } else {
      this.registerRoute("GET", path, handler);
    }
  }

  /**
   * Registers a POST route handler.
   * @param {string} path - The path for the POST route.
   * @param {Function} handler - The handler function for the POST route.
   */
  public post(path: string, handler: Function): void {
    this.registerRoute("POST", path, handler);
  }

  /**
   * Registers a route handler for a specific method and path.
   * @param {string} method - The HTTP method (e.g., GET, POST).
   * @param {string} path - The path for the route.
   * @param {Function} handler - The handler function for the route.
   */
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
