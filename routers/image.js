const { Router } = require("express");

const Images = require("../models").image;
const { toData } = require("../auth/jwt");
const authMiddleware = require("../auth/middleware");

const router = Router();

router.get("/", authMiddleware, async (request, response, next) => {
  try {
    const allImages = await Images.findAll({ where: { id: request.userId } });
    response.send(allImages);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.get("/auth/messy", async (request, response, next) => {
  const auth =
    request.headers.authorization && request.headers.authorization.split(" ");
  if (auth && auth[0] === "Bearer" && auth[1]) {
    try {
      const data = toData(auth[1]);
      const allImages = await Images.findAll();
      response.send(allImages);
    } catch (e) {
      console.log(e.message);
      next(e);
    }
  } else {
    response.status(400).send(`Please enter some valid credentials`);
    return;
  }
});

router.get("/:id", authMiddleware, async (request, response, next) => {
  try {
    const { id } = request.params;
    const imageWithId = await Images.findByPk(id);
    response.send(imageWithId);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

router.post("/", async (request, response, next) => {
  try {
    const { title, url } = request.body;
    if (!title || !url) {
      res.status(404).send(`missing parameters`);
    }
    const newImage = await Images.create({ title, url });
    response.send(newImage);
  } catch (e) {
    console.log(e.message);
    next(e);
  }
});

module.exports = router;
