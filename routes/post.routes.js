const express = require("express");
const router = express.Router();
const {
	register,
	login,
	postLogin,
	postRegister,
	forgotPassword,
	postForgotPassword,
} = require("../controllers/post.controller");

router.route("/register").get(register).post(postRegister);

router.route("/login").get(login).post(postLogin);

router.route("/forgot-password").get(forgotPassword).post(postForgotPassword);

module.exports = router;
