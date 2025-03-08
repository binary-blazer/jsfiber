declare class Response {
    private res;
    private statusCode;
    constructor(res: any);
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
    status(code: number): this;
    /**
      * Sends a JSON response.
      * @param {object} data - The data to send in the response
      * @example
      * resInstance.json({ message: "Hello, world!" });
      */
    json(data: any): void;
    /**
      * Sends a Text response.
      * @param {string} data - The data to send in the response
      * @example
      * resInstance.text("Hello, world!");
      */
    text(data: string): void;
}
declare class Request {
    private req;
    constructor(req: any);
    /**
     * Returns the body of the request.
     * @returns {Promise<any>} - The body of the request
     * @example
     * const body = await reqInstance.body;
     * console.log(body);
     */
    get body(): Promise<any>;
    /**
     * Returns the query parameters of the request.
     * @returns {object} - The query parameters of the request
     * @example
     * const query = reqInstance.query;
     * console.log(query);
     */
    get query(): {
        [key: string]: string;
    };
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
declare const response: (res: any) => Response;
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
declare const request: (req: any) => Request;
export { response, request };
