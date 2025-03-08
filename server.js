"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Server = void 0;
const server_js_1 = require("./core/server.js");
const logger_js_1 = require("./lib/logger.js");
/**
 * Represents the server instance.
 */
class Server {
    constructor(options = {}) {
        var _a;
        this.server = server_js_1.fiberServerInstance;
        this.infoBox = (_a = options.infoBox) !== null && _a !== void 0 ? _a : false;
    }
    checkPortAvailability(port) {
        return __awaiter(this, void 0, void 0, function* () {
            return this.server.checkPortAvailability(port);
        });
    }
    /**
     * Starts the server on the specified port.
     * @param {number} port - The port number to start the server on.
     * @returns {Promise<void>} - A promise that resolves when the server has started.
     * @example
     * server.start(3000);
     * // Server running at http://localhost:3000
     */
    start(port) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const availablePort = yield this.checkPortAvailability(port);
                if (availablePort !== port) {
                    (0, logger_js_1.warn)(`port ${port} is unavailable. Trying port ${availablePort} instead.`);
                }
                this.server.start(availablePort, this.infoBox);
            }
            catch (e) {
                (0, logger_js_1.error)(`server startup failure: ${e}`);
            }
        });
    }
    /**
     * Sets the public directory for serving static files.
     * @param {string} path - The path to the public directory.
     * @returns {void}
     * @example
     * server.setPublicDirectory("public");
     * // Static files are now served from the ./public directory.
     */
    setPublicDirectory(path) {
        this.server.setPublicDirectory(path);
    }
}
exports.Server = Server;
