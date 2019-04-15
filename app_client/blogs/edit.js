(function () {
	angular
    		.module('bloggerApp')
    		.controller('EditController', EditController);
    
    	EditController.$inject = ['$http', '$routeParams', '$location'];
	function EditController($http, $routeParams, $location, authentication) {
    		var vm = this;
    		vm.pageHeader = {
       			title: 'Blog Edit'
    		};
   		vm.blog = {};      
    		vm.id = $routeParams.id;  
	
    
    		getBlogById($http, vm.id).success(function(data) {
       			vm.blog = data;
        		vm.message = "Blog data found!";
    		}).error(function (e) {
        		vm.message = "Could not get blog given id of " + vm.id;
    		});

    		vm.submit = function() {
        		var data = vm.blog;
        		data.blogTitle = userForm.blogTitle.value;
        		data.blogText = userForm.blogText.value;
               		updateBlogById($http, authentication, vm.id, data).success(function(data) {
				vm.message = "Blog data updated!";
            			$location.url('/blog-list');           
        		}).error(function (e) {
				vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
        		});
    	}
}

function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, authentication, id, data) {
    return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

})();
