const express = require("express");

const post = require("./post");

const router = express.Router();

router.post("/register", post)

module.exports = router;