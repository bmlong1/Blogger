(function () {

  angular
    .module('bloggerApp')
    .controller('HomeController', HomeController);

 function HomeController() {
	var vm = this;
    vm.pageHeader = {
		title: "My Blogs"
    };
	vm.message = "Welcome to my blog site!";
}
})();
