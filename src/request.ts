class Request {
  private req: any;

  constructor(req: any) {
    this.req = req;
  }

  public get body(): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";
      this.req.on("data", (chunk: any) => {
        body += chunk.toString();
      });
      this.req.on("end", () => {
        resolve(JSON.parse(body));
      });
      this.req.on("error", (err: any) => {
        reject(err);
      });
    });
  }

  public get query(): { [key: string]: string } {
    const url = new URL(this.req.url, `http://${this.req.headers.host}`);
    const queryParams: { [key: string]: string } = {};
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    return queryParams;
  }
}

const request = (req: any) => new Request(req);
export default request;
