(function () {
  	angular
    		.module('bloggerApp')
    		.controller('ListController', ListController);
    
    	function ListController($http, authentication) {
    		var vm = this;
    		vm.pageHeader = {
        		title: 'Blog List'
    		};
		vm.isLoggedIn = function() {
        		return authentication.isLoggedIn();
    		};
		
		vm.currentUser = function() {
			if(!authentication.currentUser()) {
				return "";
			} else {
				return authentication.currentUser().email;
			}
		};
    		getAllBlogs($http).success(function(data) {
			vm.blogs = data;
        		vm.message = "Blog data found!";
			console.log(vm.blogs);
    		}).error(function (e) {
			vm.message = "Could not get list of blogs";
    		});
}

	function getAllBlogs($http) {
    		return $http.get('/api/blogs');
	}
	
})();
