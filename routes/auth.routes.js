const express = require("express");
const router = express.Router();
const {
	register,
	postRegister,
	verify,
	postVerify,
	resetPassword,
	postResetPassword,
	login,
	postLogin,
	getLogout,
	forgotPassword,
	postForgotPassword,
} = require("../controllers/auth.controller");
const resetPasswordEmail = require( "../utils/passwordEmail" );

router.route("/register").get(register).post(postRegister);

router.route("/login").get(login).post(postLogin);

router.route("/verify").get(verify).post(postVerify);

router.route("/forgot-password/").get(forgotPassword).post(postForgotPassword);

router.route("/reset-password/:token").get(resetPassword).post(postResetPassword);

router.route("/logout").get(getLogout);


module.exports = router;
