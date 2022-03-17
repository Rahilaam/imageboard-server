const Users = require("../models").user;

const { toData } = require("./jwt");

const authMiddleware = (request, response, next) => {
  const tokenBearer = request.headers.authorization;
  //   const aa = request.headers.authorization
  console.log(tokenBearer);
  if (!tokenBearer) {
    response.status(400).send(`Token is not in headers`);
    return;
  } else {
    const token = tokenBearer.split(" ")[1];
    try {
      const data = toData(token);
      console.log(data.userId);
      request.userId = data.userId;
      next();
    } catch (e) {
      console.log(e.message);
      return;
    }
  }
};

module.exports = authMiddleware;
