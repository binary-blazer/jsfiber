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
   * @example
   * middlewareRouter.use((req, res, next) => {
   *  console.log("Middleware function");
   * next();
   * });
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
   * @example
   * router.get("/", (req, res) => {
   *  res.json({ message: "Hello, world!" });
   * });
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
   * @example
   * router.post("/path", (req, res) => {
   *  res.json({ message: "POST request received" });
   * });
   */
  public post(path: string, handler: Function): void {
    this.registerRoute("POST", path, handler);
  }

  /**
   * Registers a PUT route handler.
   * @param {string} path - The path for the PUT route.
   * @param {Function} handler - The handler function for the PUT route.
   * @example
   * router.put("/path", (req, res) => {
   *  res.json({ message: "PUT request received" });
   * });
   */
  public put(path: string, handler: Function): void {
    this.registerRoute("PUT", path, handler);
  }

  /**
   * Registers a DELETE route handler.
   * @param {string} path - The path for the DELETE route.
   * @param {Function} handler - The handler function for the DELETE route.
   * @example
   * router.delete("/path", (req, res) => {
   *  res.json({ message: "DELETE request received" });
   * });
   */
  public delete(path: string, handler: Function): void {
    this.registerRoute("DELETE", path, handler);
  }

  /**
   * Registers a PATCH route handler.
   * @param {string} path - The path for the PATCH route.
   * @param {Function} handler - The handler function for the PATCH route.
   * @returns {void}
   * @example
   * router.patch("/path", (req, res) => {
   *   res.json({ message: "PATCH request received" });
   * });
   */
  public patch(path: string, handler: Function): void {
    this.registerRoute("PATCH", path, handler);
  }

  /**
   * Registers a HEAD route handler.
   * @param {string} path - The path for the HEAD route.
   * @param {Function} handler - The handler function for the HEAD route.
   * @returns {void}
   * @example
   * router.head("/path", (req, res) => {
   *  res.json({ message: "HEAD request received" });
   * });
   */
  public head(path: string, handler: Function): void {
    this.registerRoute("HEAD", path, handler);
  }

  /**
   * Registers an OPTIONS route handler.
   * @param {string} path - The path for the OPTIONS route.
   * @param {Function} handler - The handler function for the OPTIONS route.
   * @returns {void}
   * @example
   * router.options("/path", (req, res) => {
   *  res.json({ message: "OPTIONS request received" });
   * });
   */
  public options(path: string, handler: Function): void {
    this.registerRoute("OPTIONS", path, handler);
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
