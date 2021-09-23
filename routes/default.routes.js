const express = require("express");
const router = express.Router();
const { home, postHome } = require("../controllers/default.controller");

const authorized = require("../middlewares/authorization").isLoggedIn;

router.route("/").get(home).post(authorized, postHome);

module.exports = router;
