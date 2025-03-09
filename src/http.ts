class Response {
  private res: any;
  private statusCode: number | null = null;

  constructor(res: any) {
    this.res = res;
  }

  /**
   * Sets the status code of the response.
   * @param {number} code - The status code to set
   * @returns {Response} - The Response object
   * @example
   * resInstance.status(200).json({ message: "Hello, world!" });
   * resInstance.status(200).text("Hello, world!");
   * resInstance.status(404).json({ message: "Not Found" });
   * resInstance.status(404).text("Not Found");
   * resInstance.status(500).json({ message: "Internal Server Error" });
   * resInstance.status(500).text("Internal Server Error");
   */
  public status(code: number): this {
    this.statusCode = code;
    return this;
  }

  /**
   * Sends a JSON response.
   * @param {object} data - The data to send in the response
   * @example
   * resInstance.json({ message: "Hello, world!" });
   */
  public json(data: any): void {
    if (this.statusCode) {
      this.res.statusCode = this.statusCode;
    }
    this.res.setHeader("Content-Type", "application/json");
    this.res.end(JSON.stringify(data));
  }

  /**
   * Sends a Text response.
   * @param {string} data - The data to send in the response
   * @example
   * resInstance.text("Hello, world!");
   */
  public text(data: string): void {
    if (this.statusCode) {
      this.res.statusCode = this.statusCode;
    }
    this.res.setHeader("Content-Type", "text/plain");
    this.res.end(data);
  }
}

class Request {
  private req: any;

  constructor(req: any) {
    this.req = req;
  }

  /**
   * Returns the body of the request.
   * @returns {Promise<any>} - The body of the request
   * @example
   * const body = await reqInstance.body;
   * console.log(body);
   */
  public get body(): Promise<any> {
    return new Promise((resolve, reject) => {
      let body = "";
      this.req.on("data", (chunk: any) => {
        body += chunk.toString();
      });
      this.req.on("end", () => {
        const contentType = this.req.headers["content-type"];
        try {
          if (contentType === "application/json") {
            resolve(JSON.parse(body));
          } else if (contentType === "application/x-www-form-urlencoded") {
            const params = new URLSearchParams(body);
            const result: { [key: string]: string } = {};
            params.forEach((value, key) => {
              result[key] = value;
            });
            resolve(result);
          } else {
            resolve(body);
          }
        } catch (err) {
          resolve(body);
        }
      });
      this.req.on("error", (err: any) => {
        reject(err);
      });
    });
  }

  /**
   * Returns the query parameters of the request.
   * @returns {object} - The query parameters of the request
   * @example
   * const query = reqInstance.query;
   * console.log(query);
   */
  public get query(): { [key: string]: string } {
    const url = new URL(this.req.url, `http://${this.req.headers.host}`);
    const queryParams: { [key: string]: string } = {};
    url.searchParams.forEach((value, key) => {
      queryParams[key] = value;
    });
    return queryParams;
  }
}

/**
 * Creates a new Response object.
 * @param {object} res - The response object
 * @returns {Response} - The Response object
 * @example
 * const resInstance = response(res);
 * resInstance.json({ message: "Hello, world!" });
 * resInstance.text("Hello, world!");
 */
const response = (res: any) => new Response(res);

/**
 * Creates a new Request object.
 * @param {object} req - The request object
 * @returns {Request} - The Request object
 * @example
 * const reqInstance = request(req);
 * const body = await reqInstance.body;
 * const query = reqInstance.query;
 * console.log(body);
 * console.log(query);
 */
const request = (req: any) => new Request(req);

export { response, request };
