const LocalStrategy = require('passport-local');
const bcrypt = require('bcryptjs');
const User = require('../models/User.model');

module.exports = function(passport) {
	passport.use(
		new LocalStrategy(
			{
				usernameField: 'email',
				passReqToCallback: true,
			},
			async (req, username, password, done) => {
				await User.findOne({email})
					.then(async (user) => {
						if (!user) return done(null, false, req.flash('error-message', 'User not found, please register'));
						await bcrypt.compare(password, user.password, (err, passwordMatch) => {
							if (!passwordMatch) return done(null, false, req.flash('error-message', 'Password incorrect!'));
							if(User.verified !== true) return done(null, false, req.flash("error-message", 'Please verify token in your email to proceed'))
							return done(null, user, req.flash('success-message', 'Login successful'));
						});
					})
					.catch((err) => {
						console.log(err);
						req.flash('error-message', err.message);
					});
			},
		),
	);

	passport.serializeUser(function(user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function(id, done) {
		User.findById(id, function(err, user) {
			done(err, user);
		});
	});
};
