(function () {

  angular
    .module('bloggerApp')
    .controller('EditController', EditController);
    
    EditController.$inject['$http', '$routeParams', '$location', 'authentication'];
    function EditController($http, $routeParams, $location, authentication) {
    var vm = this;
    vm.pageHeader = {
       title: 'Blog Edit'
    };
    vm.blog = {};       // Start with a blank blog
    vm.id = $routeParams.id;    // Get id from $routParams which must be injected and passed into controller
	
    // Get blog data so it may be displayed on edit page
    getBlogById($http, authentication, vm.id).success(function(data) {
        vm.blog = data;
        vm.message = "Blog data found!";
    }).error(function (e) {
        vm.message = "Could not get blog given id of " + vm.id;
    });
    
    // Submit function attached to ViewModel for use in form
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
function updateBlogById($http, authentication, id, data) {
    return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}
function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

})();
