function logout(req, res) {
  res.clearCookie("access_token");
  res.json({ user: { username: "", role: "" }, success: true });
}

module.exports = logout;
