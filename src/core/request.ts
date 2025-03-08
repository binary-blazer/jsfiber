class FiberRequest {
  private req: any;

  constructor(req: any) {
    this.req = req;
  }

  public async parseBody(): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";
      this.req.on("data", (chunk: any) => {
        body += chunk.toString();
      });
      this.req.on("end", () => {
        try {
          resolve(JSON.parse(body));
        } catch (err) {
          reject(err);
        }
      });
      this.req.on("error", (err: any) => {
        reject(err);
      });
    });
  }

  public parseQueryParams(): { [key: string]: string } {
    const url = new URL(this.req.url, `http://${this.req.headers.host}`);
    const queryParams: { [key: string]: string } = {};
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    return queryParams;
  }
}

const fiberRequestInstance = (req: any) => new FiberRequest(req);
export { FiberRequest, fiberRequestInstance };
