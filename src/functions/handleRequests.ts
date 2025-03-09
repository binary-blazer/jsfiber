import { routes, handlers } from "../data";
import { error } from "../lib/logger.js";

function handleRequest(method: string, path: string, ...args: any[]): void {
  if (path === "/" && handlers.rootHandler) {
    handlers.rootHandler(...args);
  } else if (routes && routes[method] && routes[method][path]) {
    const routeHandler = routes[method][path];
    routeHandler(...args);
  } else {
    error(`no route found for ${method} ${path}`);
  }
}

export default handleRequest;
