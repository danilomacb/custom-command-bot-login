const express = require("express");
const passport = require("passport");

const passportConfig = require("../../passport");
const post = require("./post");
const login = require("./auth/login");
const logout = require("./auth/logout");

const router = express.Router();

router.post("/register", post);
router.post("/login", passport.authenticate("local", { session: false }), login);
router.get("/logout", passport.authenticate("jwt", { session: false }), logout);

module.exports = router;
