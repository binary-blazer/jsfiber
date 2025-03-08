class Middleware {
  private middlewares: Function[];

  constructor() {
    this.middlewares = [];
  }

  private executeMiddlewares(req: any, res: any, callback: Function): void {
    let index = 0;
    const next = () => {
      if (index < this.middlewares.length) {
        this.middlewares[index++](req, res, next);
      } else {
        callback();
      }
    };
    next();
  }

  public use(middleware: any): void {
    this.middlewares.push(middleware);
  }
}

const middleware = new Middleware();
const use = middleware.use.bind(middleware);
export default middleware;
