(function () {

  angular
    .module('bloggerApp')
    .controller('HomeController', HomeController);

 function HomeController() {
	var vm = this;
    vm.pageHeader = {
		title: "My Blogs"
    };
	vm.message = "So this is my blog site...  Let's hope in the future it doesn't look so basic...  Anyways, sign in and add/manage a blog, or just browse because your non-logged in butt can't make any changes.";
}
})();
