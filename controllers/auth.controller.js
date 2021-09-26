const User = require("../models/User.model");
const passport = require("passport");
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const verifyEmail = require("../utils/verifyEmail");
const passwordEmail = require("../utils/passwordEmail");

// Passport config
require("../config/passport.config")(passport);

module.exports = {
	register: async (req, res) => {
		let pageTitle = "Register page"
		res.render('auth/register', {pageTitle});
	},
	postRegister: async (req, res) => {
		try {
			let { firstName, lastName , email, username, password, confirmPassword } = req.body;

			// console.log(req.body);

			if (password.length < 6) {
				req.flash("error-message", "Password must be six characters or more");
				return res.redirect("back");
			}

			if (password !== confirmPassword) {
				req.flash("error-message", "Passwords do not match");
				return res.redirect("back");
			}

			let emailExists = await User.findOne({ email });

			if (emailExists) {
				req.flash("error-message", "Email aleady exist!");
				return res.redirect("back");
			}

			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			const secretToken = randomstring.generate({
				length: 6,
				charset: 'numeric'
			});

			let firstNameInitials = firstName.split("");
			let lastNameInitials = lastName.split("");
			let userAvatar = firstNameInitials[0] + lastNameInitials[0];
			

			const newUser = new User({
				firstName, 
				lastName , 
				email,
				secretToken,
				password: hashedPassword,
				avatar: userAvatar
			});

			await newUser.save();

			await verifyEmail(req, firstName, email, secretToken);

			if (!newUser) {
				req.flash("error-message", "An error occurred while registering user");
				return res.redirect("back");
			}

			req.flash(
				"success-message",
				"User registration successful, Check your email to verify your account",
			);
			return res.redirect("/auth/verify");
		}
		catch (err) {
			console.log(err);
		}
	},

	verify: async (req, res) => {
		let pageTitle = "Token Verification";
		res.render("auth/verify", { pageTitle });
	},

	postVerify: async (req, res) => {
		let {inputToken} = req.body;

		let trimmedInputToken = inputToken.trim();

		// console.log(req.body);
		let user = await User.findOne({ secretToken: trimmedInputToken });

		if (!user) {
			req.flash('error-message', 'Wrong token. Please copy the token appropriately');
			return res.redirect('back')
		}

		user.verified = true;
		user.save();
		res.redirect("/auth/login");
	},

	forgotPassword: async (req, res) => {
		let pageTitle = "Forgot Password";
		res.render("auth/forgot-password", { pageTitle });
	},

	postForgotPassword: async (req, res) => {
		let{inputEmail} = req.body;

		let user = await User.findOne({ email: inputEmail });

		if (!user) {
			req.flash('error-message', 'Email not found');
			return res.redirect('back')
		}
		let token = randomstring.generate({
			length: 6,
			charset: 'numeric'
		});
		user.secretToken = token;
		user.save();
		await passwordEmail(req, token, inputEmail);
		req.flash(
			"success-message",
			"Please check your email to reset your password",
		);
		return res.redirect("back");	
	},

	resetPassword: async (req, res) => {
		let pageTitle = "Password reset";
		let {token} = req.params;
		res.render("auth/reset-password", { pageTitle, token });
	},

	postResetPassword: async (req, res) => {
		let{newPassword, confirmNewPassword} = req.body;
		if (newPassword.length < 6) {
			req.flash("error-message", "Password must be six characters or more");
			return res.redirect("back");
		}
		if (newPassword !== confirmNewPassword) {
			req.flash("error-message", "Passwords do not match");
			return res.redirect("back");
		}

		const salt = await bcrypt.genSalt();
		const newHashedPassword = await bcrypt.hash(newPassword, salt);

		let { token } = req.params;
		let user = await User.findOne({secretToken: token})
		// console.log(user);
		if (!user) {
			req.flash('error-message', 'User not found')
		}
		user.password = newHashedPassword;
		// console.log(user.password);
		user.save();
		req.flash("success-message", "Password reset successfully")
		res.redirect("/auth/login")
	},

	login: async (req, res) => {
		let pageTitle = "Login page";
		res.render("auth/login", {pageTitle});
	},

	postLogin: passport.authenticate('local',{
        successRedirect: '/',
        failureRedirect: '/auth/login',
        successFlash: true,
        failureFlash: true,
        session: true,
	}),

	changePassword: (req, res) => {
		let pageTitle = "Change Password";
		res.render("auth/change-password", {pageTitle});
	},

	postChangePassword: async (req, res) => {
		let{oldPassword, updatedPassword} = req.body;

		const salt = await bcrypt.genSalt();
		const hashedUpdatedPassword = await bcrypt.hash(updatedPassword, salt);
		console.log(hashedUpdatedPassword);

		let user = await User.findById(req.user._id);
		
		if (user) {
		const passwordMatch = await bcrypt.compare(oldPassword, user.password);
		console.log(passwordMatch);
			if (passwordMatch == false){
				req.flash('error-message', 'Old password is wrong')
				res.redirect("back")
			}else{
				user.password = hashedUpdatedPassword;
				await user.save();
				req.flash('success-message', 'Password changed successfully');
				res.redirect('/user/profile');
			}
		}
		return req.flash('error-message', 'Something went wrong')
	},

	getLogout: (req, res)=>{
		req.logout();
		res.redirect('/');
	}
};
