module.exports = {
	ensureAuth: (req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			req.flash("error-message", "Please login to continue");
			res.redirect("/");
		}
	},
	ensureGuest: (req, res, next) => {
		if (req.isAuthenticated()) {
			res.redirect("/user/home");
		} else {
			next();
		}
	},
};
