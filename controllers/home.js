/* Get Home Page */
module.exports.home = function(req, res) {
	res.render('home', { title: "Bri Long's Blog Site" });
};
