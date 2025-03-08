class Response {
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

const response = (res: any) => new Response(res);
export default response;
