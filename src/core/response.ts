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

  public setCORSHeaders(options: { [key: string]: string }): void {
    for (const [key, value] of Object.entries(options)) {
      this.res.setHeader(key, value);
    }
  }
}

const fiberResponseInstance = (res: any) => new FiberResponse(res);
export { FiberResponse, fiberResponseInstance };
