class Middleware {
  private middlewares: Function[];

  constructor() {
    this.middlewares = [];
  }

  public use(middleware: Function): void {
    this.middlewares.push(middleware);
  }

  public executeMiddlewares(req: any, res: any, next: Function): void {
    const execute = (index: number) => {
      if (index < this.middlewares.length) {
        this.middlewares[index](req, res, () => execute(index + 1));
      } else {
        next();
      }
    };
    execute(0);
  }
}

const middlewareInstance = new Middleware();
export { Middleware, middlewareInstance };
