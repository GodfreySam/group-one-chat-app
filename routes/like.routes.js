const express = require("express");
const router = express.Router();
const { postLike } = require("../controllers/like.controller");

router.route("/like").post(postLike);

module.exports = router;
