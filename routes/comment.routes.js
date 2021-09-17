const express = require("express");
const router = express.Router();
const { postComment } = require("../controllers/comment.controller");

router.route("/comment").post(postComment);

module.exports = router;
