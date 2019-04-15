
(function () {
	angular
    		.module('bloggerApp')
    		.controller('DeleteController', DeleteController);
    
    	DeleteController.$inject = ['$http', '$routeParams', '$location', 'authentication'];
    	function DeleteController($http, $routeParams, $location, authentication) {
		var vm = this;
		vm.pageHeader = {
			title: 'Delete Blog'
		};
		vm.blog = {};
		vm.id = $routeParams.id;

		getBlogById($http, vm.id).success(function(data) {
			vm.blog = data;
			vm.message = "Blog data found!";
		}).error(function(e) {
			vm.message = "Could not get blog given id";
		});

		vm.submit = function() {
			var data = vm.blog;
			deleteBlogById($http, authentication, vm.id).success(function(data) {
				vm.message = "Blog deleted";
				$location.url('/blog-list');
			}).error(function(e) {
				vm.message = "Could not delete blog given id";
			});
		}
	}
	
function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

function deleteBlogById($http, authentication, id) {
    return $http.delete('/api/blogs/' + id, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

})();
