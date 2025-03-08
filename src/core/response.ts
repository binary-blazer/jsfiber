class FiberResponse {
  private res: any;
  private statusCode: number | null = null;

  constructor(res: any) {
    this.res = res;
  }

  public status(code: number): this {
    this.statusCode = code;
    return this;
  }

  public json(data: any): void {
    if (this.statusCode) {
      this.res.statusCode = this.statusCode;
    }
    this.res.setHeader("Content-Type", "application/json");
    this.res.end(JSON.stringify(data));
  }

  public text(data: string): void {
    if (this.statusCode) {
      this.res.statusCode = this.statusCode;
    }
    this.res.setHeader("Content-Type", "text/plain");
    this.res.end(data);
  }
}

const fiberResponseInstance = (res: any) => new FiberResponse(res);
export { FiberResponse, fiberResponseInstance };
