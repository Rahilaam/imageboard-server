const express = require("express");
const userRouter = require("./routers/user");
const imageRouter = require("./routers/image");
const authRouter = require("./routers/auth");

const app = express();
const PORT = process.env.PORT || 4000;
app.use(express.json());

app.use("/auth", authRouter);
app.use("/users", userRouter);
app.use("/images", imageRouter);

app.listen(PORT, () => {
  console.log(`Listening to:`, PORT);
});
