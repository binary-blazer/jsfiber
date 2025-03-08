function executeMiddlewares(req: any, res: any, middlewares: Function[], callback: Function): void {
    let index = 0;
    const next = () => {
        if (index < middlewares.length) {
            middlewares[index++](req, res, next);
        } else {
            callback();
        }
    };
    next();
}

export default executeMiddlewares;