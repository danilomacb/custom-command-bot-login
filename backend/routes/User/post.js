const bcrypt = require("bcrypt");

const User = require("../../models/User");
const errorHandler = require("../utils/errorHandler");

async function post(req, res) {
  const { username, password, email } = req.body;

  if (!email) {
    errorHandler(res, 500, "Error on register user, email is missing", "Email is missing");
    return;
  }

  try {
    const user = await User.findOne({ username });

    if (user) {
      errorHandler(
        res,
        400,
        "Error on register user, username is already taken",
        "Username is already taken"
      );
      return;
    }
  } catch (err) {
    errorHandler(
      res,
      500,
      "Error on register user, fail on find user",
      "Error on register user",
      err
    );
    return;
  }

  if (username.length < 5) {
    errorHandler(
      res,
      500,
      "Error on register user, username is too short",
      "Username is too short"
    );
    return;
  }

  if (username.length > 15) {
    errorHandler(res, 500, "Error on register user, username is too long", "Username is too long");
    return;
  }

  if (password.length < 5) {
    errorHandler(
      res,
      500,
      "Error on register user, password is too short",
      "Password is too short"
    );
    return;
  }

  if (password.length > 15) {
    errorHandler(res, 500, "Error on register user, password is too long", "Password is too long");
    return;
  }

  let passwordHashed;
  try {
    passwordHashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
  } catch (err) {
    errorHandler(
      res,
      500,
      "Error on register user, fail on hash password",
      "Error on register user",
      err
    );
    return;
  }

  const newUser = new User({ username, password: passwordHashed, email });

  try {
    await newUser.save();

    res.status(201).json({ message: "Account successfully created" });
    return;
  } catch (err) {
    errorHandler(
      res,
      500,
      "Error on register user, fail to save new user",
      "Error on register user",
      err
    );
    return;
  }
}

module.exports = post;
