const bcrypt = require("bcrypt");

const User = require("../../models/User");

async function post(req, res) {
  const { username, password } = req.body;

  try {
    const user = await User.findOne({ username });

    if (user) {
      console.error("Error on register user, username is already taken");
      res.status(400).json({ message: { body: "Username is already taken", error: true } });
      return;
    }
  } catch (err) {
    console.error("Error on register user, fail to find user\n", err);
    res.status(500).json({ message: { body: "Error on register user", error: true } });
    return;
  }

  if (username.length < 5) {
    console.error("Error on register user, username is too short");
    res.status(500).json({ message: { body: "Username is too short", error: true } });
    return;
  }

  if (username.length > 15) {
    console.error("Error on register user, username is too long");
    res.status(500).json({ message: { body: "Username is too long", error: true } });
    return;
  }

  if (password.length < 5) {
    console.error("Error on register user, password is too short");
    res.status(500).json({ message: { body: "Password is too short", error: true } });
    return;
  }

  if (password.length > 15) {
    console.error("Error on register user, password is too long");
    res.status(500).json({ message: { body: "Password is too long", error: true } });
    return;
  }

  let passwordHashed;

  try {
    passwordHashed = await bcrypt.hash(password, parseInt(process.env.BCRYPT_SALT));
  } catch (err) {
    console.error("Error on register user, fail to hash password\n", err);
    res.status(500).json({ message: { body: "Error on register user", error: true } });
    return;
  }

  const newUser = new User({ username, password: passwordHashed });

  try {
    await newUser.save();

    res.status(201).json({ message: { body: "Account successfully created", error: false } });
    return;
  } catch (err) {
    console.error("Error on register user, fail to save new user\n", err);
    res.status(500).json({ message: { body: "Error on register user", error: true } });
    return;
  }
}

module.exports = post;
