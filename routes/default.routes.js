const express = require("express");
const router = express.Router();
const {
   home,
   postComment,
   postPost,
   postLike
} = require("../controllers/default.controller");

router.route("/")
   .get(home)
   .post(postComment)
   .post(postPost)
   .post(postLike);

module.exports = router;
