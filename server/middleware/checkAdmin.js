const ApiError = require("../errorHandler/ApiError");

exports.checkAdmin = (req, res, next) => {
  try {
    const headerAuth = req.headers.authorization;
    if (!headerAuth) {
      return next(ApiError.unauthorized("not authorized"));
    }
    
    const accessToken = headerAuth.split(" ")[1];
    if (!accessToken) {
      return next(ApiError.unauthorized("not authorized"));
    }

    const user = TokenService.accessValidate(accessToken);
    if (!user) {
      return next(ApiError.unauthorized("not authorized"));
    }

    if (user.role !== "ADMIN") {
      return next(ApiError.forbidden("not right"));
    }
    req.user = user;
    next();
  } catch (e) {
    return next();
  }
};
