class Middleware {
  private middlewares: Function[];

  constructor() {
    this.middlewares = [];
  }

  public use(middleware: Function): void {
    this.middlewares.push(middleware);
  }
}

const middleware = new Middleware();
export default middleware;
