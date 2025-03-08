/**
 * MiddlewareRouter class to manage middleware functions.
 */
export declare class MiddlewareRouter {
    private middlewares;
    constructor();
    /**
     * Adds a middleware function to the middleware stack.
     * @param {Function} middleware - The middleware function to add.
     * @example
     * middlewareRouter.use((req, res, next) => {
     *  console.log("Middleware function");
     * next();
     * });
     */
    use(middleware: any): void;
}
/**
 * Router class to manage route handlers.
 */
export declare class Router {
    private routes;
    constructor();
    /**
     * Registers a GET route handler.
     * @param {string} path - The path for the GET route.
     * @param {Function} handler - The handler function for the GET route.
     * @example
     * router.get("/", (req, res) => {
     *  res.json({ message: "Hello, world!" });
     * });
     */
    get(path: string, handler: Function): void;
    /**
     * Registers a POST route handler.
     * @param {string} path - The path for the POST route.
     * @param {Function} handler - The handler function for the POST route.
     * @example
     * router.post("/path", (req, res) => {
     *  res.json({ message: "POST request received" });
     * });
     */
    post(path: string, handler: Function): void;
    /**
     * Registers a PUT route handler.
     * @param {string} path - The path for the PUT route.
     * @param {Function} handler - The handler function for the PUT route.
     * @example
     * router.put("/path", (req, res) => {
     *  res.json({ message: "PUT request received" });
     * });
     */
    put(path: string, handler: Function): void;
    /**
     * Registers a DELETE route handler.
     * @param {string} path - The path for the DELETE route.
     * @param {Function} handler - The handler function for the DELETE route.
     * @example
     * router.delete("/path", (req, res) => {
     *  res.json({ message: "DELETE request received" });
     * });
     */
    delete(path: string, handler: Function): void;
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
    patch(path: string, handler: Function): void;
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
    head(path: string, handler: Function): void;
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
    options(path: string, handler: Function): void;
    /**
     * Registers a route handler for a specific method and path.
     * @param {string} method - The HTTP method (e.g., GET, POST).
     * @param {string} path - The path for the route.
     * @param {Function} handler - The handler function for the route.
     */
    private registerRoute;
}
export declare const middlewareRouter: MiddlewareRouter;
export declare const router: Router;
