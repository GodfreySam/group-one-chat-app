const express = require("express");
const router = express.Router();
const { landing } = require("../controllers/default.controller");

router.route("/").get(landing);

module.exports = router;
