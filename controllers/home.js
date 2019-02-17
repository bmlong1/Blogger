/* Get Home Page */
module.exports.home = function(req, res) {
	res.render('home', { title: "Bri Graham's Blog Site" });
};
