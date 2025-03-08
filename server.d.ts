interface ServerOptions {
    /**
     * Whether to display the info box when the server starts. Info box contains the server URL (localhost and IP address) and the public directory path.
     * @type {boolean}
     */
    infoBox?: boolean;
}
/**
 * Represents the server instance.
 */
declare class Server {
    private server;
    private infoBox;
    constructor(options?: ServerOptions);
    private checkPortAvailability;
    /**
     * Starts the server on the specified port.
     * @param {number} port - The port number to start the server on.
     * @returns {Promise<void>} - A promise that resolves when the server has started.
     * @example
     * server.start(3000);
     * // Server running at http://localhost:3000
     */
    start(port: number): Promise<void>;
    /**
     * Sets the public directory for serving static files.
     * @param {string} path - The path to the public directory.
     * @returns {void}
     * @example
     * server.setPublicDirectory("public");
     * // Static files are now served from the ./public directory.
     */
    setPublicDirectory(path: string): void;
}
export { Server };
