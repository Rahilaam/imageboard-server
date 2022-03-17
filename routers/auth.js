const { Router } = require("express");
const { toJWT, toData } = require("../auth/jwt");
const router = Router();
const Users = require("../models").user;
const bcrypt = require("bcrypt");
const authMiddleware = require("../auth/middleware");

router.post("/login", async (request, response, next) => {
  //login logic

  const { email, password } = request.body;
  if (!email || !password) {
    response.status(400).send(`please provide a email and password`);
  } else {
    const auth_user = await Users.findOne({ where: { email: email } });
    if (!auth_user) {
      response.status(500).send(`No user found`);
    } else {
      //   if (password === auth_user.password) {
      if (bcrypt.compareSync(password, auth_user.password)) {
        const token = toJWT({ userId: auth_user.id });
        response.send(token);
      } else {
        response.send(`password incorrect`);
      }
    }
  }
});

router.get("/test-auth", authMiddleware, (req, res) => {
  res.send({
    message: `Thanks for visiting the secret endpoint .`,
  });
});

module.exports = router;
