module.exports = {
	checkAuthentication: (req, res, next) => {
		if (req.session && req.session.user) {
			return next();
		}
		res.redirect("/login");
	},

	// deleteSession: (req, res, next) => {
	// 	if (req.session && req.session.user) {
	// 		req.session.destroy(() => {
	// 			res.redirect("/");
	// 		});
	// 	}
	// },
};
