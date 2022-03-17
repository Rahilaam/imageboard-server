const { Router } = require("express");
const bcrypt = require("bcrypt");

const Users = require("../models").user;

const router = Router();

router.get("/", async (request, response, next) => {
  try {
    const allUsers = await Users.findAll();
    response.send(allUsers);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { email, password, fullName } = request.body;
    if (!email || !password || !fullName) {
      response.status(404).send(`missing parameters`);
      next(e);
    } else {
      const newUser = await Users.create({
        email,
        password: bcrypt.hashSync(password, 10),
        fullName,
      });
      response.send(newUser);
    }
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
