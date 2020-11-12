const JWT = require("jsonwebtoken");

const signToken = (userID) => {
  return JWT.sign(
    {
      iss: "CustomCommandBot",
      sub: userID,
    },
    process.env.PASSPORT_SECRET,
    { expiresIn: "1d" }
  );
};

function login(req, res) {
  if (req.isAuthenticated()) {
    const { _id, username, role } = req.user;
    const token = signToken(_id);
    res.cookie("access_token", token, { httpOnly: true, sameSite: true });
    res.status(200).json({ isAuthenticated: true, user: { username, role } });
  }
}

module.exports = login;
