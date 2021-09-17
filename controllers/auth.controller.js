const User = require("../models/User.model");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const verifyEmail = require("../utils/verifyEmail");


passport.use(new LocalStrategy({usernameField: 'email', passReqToCallback: true}, async(req, email, password, done) =>{
	await User.findOne({email})
	.then(async(user)=>{
		if (!user) {
			return done(null, false, req.flash('error-message', 'User not found. Please try again'))
		};
		bcrypt.compare(password, user.password, (err, passwordMatch) =>{
			if (err) {
				return err;
			}
			if (!passwordMatch) {
				return done(null, false, req.flash('error-message', 'Password Incorrect'))
			}
			return done(null, user, req.flash('success-message', 'Login successful'))
		});
	});
}))

module.exports = {
	register: async (req, res) => {
		let pageTitle = "Register page";
		res.render("auth/register", { pageTitle });
	},

	login: async (req, res) => {
		let pageTitle = "Login page";
		res.render("auth/login", { pageTitle });
	},

	verify: async (req, res) => {
		let pageTitle = "Token Verification";
		res.render("auth/verify", { pageTitle });
	},

	postVerify: async (req, res) => {
		let {inputToken} = req.body;

		console.log(req.body);
		let user = await User.findOne({ secretToken: inputToken });

		if (!user) {
			req.flash('error-message', 'Wrong token. Please copy the token appropriately');
			return res.redirect('back')
		}

		user.verified = true;
		user.save();
		res.redirect("auth/login", { pageTitle });
	},

	postRegister: async (req, res) => {
		try {
			let { firstName, lastName , email, password, confirmPassword } = req.body;

			// console.log(req.body);

			if (password !== confirmPassword) {
				req.flash("error-message", "Passwords do not match");
				return res.redirect("back");
			}

			let emailExists = await User.findOne({ email });

			if (emailExists) {
				req.flash("error-message", "Email aleady exist!");
				return res.redirect("back");
			}

			if (password.length < 6) {
				req.flash("error-message", "Password must be six characters or more");
				return res.redirect("back");
			}

			const salt = await bcrypt.genSalt();
			const hashedPassword = await bcrypt.hash(password, salt);
			const secretToken = randomstring.generate();

			const newUser = new User({
				firstName, 
				lastName , 
				email,
				password: hashedPassword,
			});

			await newUser.save();

			await verifyEmail(req, email, email, secretToken);

			if (!newUser) {
				req.flash("error-message", "An error occurred while registering user");
				return res.redirect("back");
			}

			req.flash(
				"success-message",
				"User registration successful, Check your email to verify your account",
			);
			return res.redirect("/auth/login");
		} catch (err) {
			console.log(err);
		}
	},

	postLogin: async (req, res) => {
		passport.authenticate("local", {
			successRedirect: "/",
			failureRedirect: "/auth/login",
			failureFlash: true,
			successFlash: true,
			session: true,
		});
	},

	forgotPassword: async (req, res) => {
		let pageTitle = "Password reset";
		res.render("auth/forgot-password", { pageTitle });
	},

	postForgotPassword: async (req, res) => {},
};
