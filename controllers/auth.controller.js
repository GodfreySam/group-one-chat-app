const User = require("../models/User.model");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;
const bcrypt = require("bcryptjs");
const randomstring = require("randomstring");
const verifyEmail = require("../utils/verifyEmail");
const passwordEmail = require("../utils/passwordEmail");

// Passport config
passport.use(new LocalStrategy({usernameField: 'email', passReqToCallback: true}, async(req, email, password, done) => {
    await User.findOne({email})
    .then(async(user) => {
        if (!user) {return done(null, false, req.flash('error-message', 'User not found. Please register and try again.'));}

        bcrypt.compare(password, user.password, (err, passwordMatch) => {
            if (err){
                return err;
            }
            if (!passwordMatch) return done(null,false, req.flash('error-message', 'Password incorrect'))

            return done(null, user, req.flash('success-message', 'Login successfully'));
        });
    });
}));

module.exports = {
	register: async (req, res) => {
		let pageTitle = "Register page";
		res.render("auth/register", { pageTitle });
	},

	postRegister: async (req, res) => {
		try {
			let { firstName, lastName , email, password, confirmPassword } = req.body;

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
		} catch (err) {
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

		console.log(req.body);
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

		let trimmedInputEmail = inputEmail.trim();
		let user = await User.findOne({ email: trimmedInputEmail });

		if (!user) {
			req.flash('error-message', 'Email not found');
			return res.redirect('back')
		}

		let firstName = User.firstName;
		await passwordEmail(req, firstName, trimmedInputEmail);
		req.flash(
			"success-message",
			"Please check your email to reset your password",
		);
		return res.redirect("back");	
	},

	resetPassword: async (req, res) => {
		let pageTitle = "Password reset";
		res.render("auth/reset-password", { pageTitle });
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

		User.password = newHashedPassword;
		await User.save();
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

	getLogout: (req, res)=>{
		req.logout();
		res.redirect('/');
	}
};
