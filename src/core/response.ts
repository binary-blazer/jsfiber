class FiberResponse {
  private res: any;

  constructor(res: any) {
    this.res = res;
  }

  public json(data: any): void {
    this.res.setHeader("Content-Type", "application/json");
    this.res.end(JSON.stringify(data));
  }

  public text(data: string): void {
    this.res.setHeader("Content-Type", "text/plain");
    this.res.end(data);
  }
}

const fiberResponseInstance = (res: any) => new FiberResponse(res);
export { FiberResponse, fiberResponseInstance };
