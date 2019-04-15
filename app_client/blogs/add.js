(function () {
	angular
    		.module('bloggerApp')
    		.controller('AddController', AddController);

	AddController.$inject = ['$http', '$location', 'authentication'];
    	function AddController($http, $location, authentication) {
    	var vm = this;
	vm.blog = {};
    	vm.pageHeader = {
		title: "Add Blog"
    	};
    
	vm.submit = function() {
		var data = vm.blog;
        	data.blogTitle = userForm.blogTitle.value;
        	data.blogText = userForm.blogText.value;
        	addBlog($http, authentication, data).success(function(data) {
			$location.url('/blog-list');
		}).error(function(e) {
		});
	};
}

function addBlog($http, authentication, data) {
	return $http.post('/api/blogs', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}
	
})();
