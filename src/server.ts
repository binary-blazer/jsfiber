import http from 'http';

class Server {
  private server: http.Server;

  constructor() {
    this.server = http.createServer((req, res) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'text/plain');
      res.end('Hello, World!\n');
    });
  }

  public start(port: number): void {
    this.server.listen(port, () => {
      console.log(`Server running at http://localhost:${port}/`);
    });
  }
}

const serverInstance = new Server();
export default serverInstance;
