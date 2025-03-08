class Middleware {
  private middlewares: Function[];

  constructor() {
    this.middlewares = [];
  }

  public executeMiddlewares(req: any, res: any, callback: Function): void {
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
export default middleware;
