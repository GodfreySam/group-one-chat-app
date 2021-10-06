const express = require("express");
const router = express.Router();
const { landing } = require("../controllers/default.controller");
const {ensureAuth, ensureGuest } = require("../middlewares/authorization");

router.route("/").get(ensureGuest, landing);
router.route("/").post(ensureAuth, landing);

module.exports = router;
