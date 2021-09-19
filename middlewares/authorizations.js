module.exports = {
	isLoggedIn: (req, res, next) => {
		if (req.isAuthenticated()) {
			next();
		} else {
			req.flash("error-message", "Please login or signup to continue");
			res.redirect('/auth/login');
		}
	}
}