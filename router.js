"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.router = exports.middlewareRouter = exports.Router = exports.MiddlewareRouter = void 0;
const data_1 = require("./data");
/**
 * MiddlewareRouter class to manage middleware functions.
 */
class MiddlewareRouter {
    constructor() {
        this.middlewares = data_1.middlewares;
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
    use(middleware) {
        this.middlewares.push(middleware);
        data_1.middlewares.push(middleware);
    }
}
exports.MiddlewareRouter = MiddlewareRouter;
/**
 * Router class to manage route handlers.
 */
class Router {
    constructor() {
        this.routes = data_1.routes;
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
    get(path, handler) {
        if (path === "/") {
            data_1.handlers.rootHandler = handler;
        }
        else {
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
    post(path, handler) {
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
    put(path, handler) {
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
    delete(path, handler) {
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
    patch(path, handler) {
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
    head(path, handler) {
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
    options(path, handler) {
        this.registerRoute("OPTIONS", path, handler);
    }
    /**
     * Registers a route handler for a specific method and path.
     * @param {string} method - The HTTP method (e.g., GET, POST).
     * @param {string} path - The path for the route.
     * @param {Function} handler - The handler function for the route.
     */
    registerRoute(method, path, handler) {
        if (!this.routes[method]) {
            this.routes[method] = {};
            data_1.routes[method] = {};
        }
        this.routes[method][path] = handler;
        data_1.routes[method][path] = handler;
    }
}
exports.Router = Router;
exports.middlewareRouter = new MiddlewareRouter();
exports.router = new Router();
