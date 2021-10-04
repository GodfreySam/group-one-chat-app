const LocalStrategy = require("passport-local");
const bcrypt = require("bcryptjs");
const User = require("../models/User.model");

module.exports = function (passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: "value",
				passReqToCallback: true,
			},
			async (req, value, password, done) => {
				await User.findOne({ $or: [{ username: value }, { email: value }] })
					.then(async (user) => {
						// console.log(user);
						if (!user)
							return done(null, false, req.flash("error-message", "User not found!"));
						await bcrypt.compare(password, user.password, (err, passwordMatch) => {
							if (!passwordMatch) {
								return done(
									null,
									false,
									req.flash("error-message", "Password incorrect!"),
								);
							}

							if (user.verified == false) {
								return done(
									null,
									false,
									req.flash(
										"error-message",
										"User not yet verified, please check your email for the verify token",
									),
								);
							}
							return done(
								null,
								user,
								req.flash("success-message", `Welcome ${user.firstName}`),
							);
						});
					})
					.catch((err) => {
						console.log(err);
						req.flash("error-message", err.message);
					});
			},
		),
	);

	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});
};
