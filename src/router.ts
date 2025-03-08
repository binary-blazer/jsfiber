class Router {
  private routes: { [key: string]: { [key: string]: Function } };

  constructor() {
    this.routes = {};
  }

  public get(path: string, handler: Function): void {
    this.registerRoute('GET', path, handler);
  }

  public post(path: string, handler: Function): void {
    this.registerRoute('POST', path, handler);
  }

  private registerRoute(method: string, path: string, handler: Function): void {
    if (!this.routes[method]) {
      this.routes[method] = {};
    }
    this.routes[method][path] = handler;
  }

  public handleRequest(method: string, path: string, ...args: any[]): void {
    const routeHandler = this.routes[method]?.[path];
    if (routeHandler) {
      routeHandler(...args);
    } else {
      console.error(`No route found for ${method} ${path}`);
    }
  }
}

const routerInstance = new Router();
export default routerInstance;
