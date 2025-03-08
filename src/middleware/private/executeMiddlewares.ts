function executeMiddlewares(req, res, next) {
  let index = 0;

  function nextMiddleware(err) {
    if (err) {
      return next(err);
    }

    const middleware = this.middlewares[index];
    index += 1;

    if (!middleware) {
      return next();
    }

    try {
      middleware(req, res, nextMiddleware);
    } catch (error) {
      next(error);
    }
  }

  nextMiddleware();
}

export default executeMiddlewares;
