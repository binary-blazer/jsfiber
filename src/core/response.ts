class CustomResponse {
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

const customResponseInstance = (res: any) => new CustomResponse(res);
export { CustomResponse, customResponseInstance };
