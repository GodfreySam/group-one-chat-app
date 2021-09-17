const express = require("express");
const router = express.Router();
const {
	register,
	login,
	postLogin,
	verify,
	postVerify,
	postRegister,
	forgotPassword,
	postForgotPassword,
} = require("../controllers/auth.controller");

router.route("/register").get(register).post(postRegister);

router.route("/login").get(login).post(postLogin);

router.route("/verify").get(verify).post(postVerify);

router.route("/forgot-password").get(forgotPassword).post(postForgotPassword);

module.exports = router;
