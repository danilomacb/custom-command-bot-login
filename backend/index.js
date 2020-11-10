require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");

const userRouter = require("./routes/User");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(express.json());
    app.use("/user", userRouter);

    app.listen(process.env.PORT, () => {
      console.log("Server running on port: ", process.env.PORT);
    });
  })
  .catch((err) => console.error("Error on connect to database\n", err));
