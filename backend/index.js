require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const cookieParser = require("cookie-parser");

const userRouter = require("./routes/User");
const discordServerRouter = require("./routes/DiscordServer");

mongoose
  .connect(process.env.MONGO_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    const app = express();

    app.use(cookieParser());
    app.use(express.json());
    app.use("/user", userRouter);
    app.use("/discord-server", discordServerRouter);

    app.listen(process.env.PORT, () => {
      console.log("Server running on port: ", process.env.PORT);
    });
  })
  .catch((err) => console.error("Error on connect to database\n", err));
