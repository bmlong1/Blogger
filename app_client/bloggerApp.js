var app = angular.module('bloggerApp', ['ngRoute']);

//*** Router Provider ***//
app.config( function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl: 'pages/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})

		.when('/blog-list', {
			templateUrl: 'pages/blog-list.html',
			controller : 'ListController',
			controllerAs: 'vm'
		})

		.when('/blog-add', {
			templateUrl: 'pages/blog-add.html',
			controller: 'AddController',
			controllerAs: 'vm'
		})
          
        .when('/blog-edit/:id', {
			templateUrl: 'pages/blog-edit.html',
			controller: 'EditController',
			controllerAs: 'vm'
		})
        
        .when('/blog-delete/:id', {
			templateUrl: 'pages/blog-delete.html',
            controller: 'DeleteController',
            controllerAs: 'vm'
        })
	
		.when('/register', {
			templateUrl: 'pages/register.html',
			controller: 'RegisterController',
			controllerAs: 'vm'
		})
		
		.when('/login', {
			templateUrl: 'pages/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
		
		.otherwise({redirectTo: '/'});
});

//*** REST Web API functions ***//
function addBlog($http, data) {
	return $http.post('/api/blogs', data);
}

function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

function updateBlogById($http, authentication, id, data) {
    return $http.put('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }} );
}

function deleteBlogById($http, id, data) {
    return $http.delete('/api/blogs/' + id, data);
}

//*** Controllers ***//
app.controller('HomeController', function HomeController() {
	var vm = this;
    vm.pageHeader = {
		title: "My Blogs"
    };
	vm.message = "Welcome to my blog site!";
});

app.controller('AddController', ['$http', '$location',  function AddController($http, $location) {
    var vm = this;
    vm.blog = {};
    vm.pageHeader = {
		title: "Add Blog"
    };
    vm.submit = function() {
		var data = vm.blog;
        data.blogTitle = form.blogTitle.value;
        data.blogText = form.blogText.value;
        addBlog($http, data).success(function(data) {
			$location.url('/blog-list');
		}).error(function(e) {
		});
	};
}]);

app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };
    getAllBlogs($http).success(function(data) {
		vm.blogs = data;
        vm.message = "Blog data found!";
    }).error(function (e) {
		vm.message = "Could not get list of blogs";
    });
});

app.controller('EditController',[ '$http', '$routeParams', '$location', function EditController($http, $routeParams, $location) {
    var vm = this;
    vm.pageHeader = {
       title: 'Blog Edit'
    };
    vm.blog = {};       // Start with a blank blog
    vm.id = $routeParams.id;    // Get id from $routParams which must be injected and passed into controller
	
    // Get blog data so it may be displayed on edit page
    getBlogById($http, vm.id).success(function(data) {
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
               
        updateBlogById($http, vm.id, data).success(function(data) {
			vm.message = "Blog data updated!";
            $location.url('/blog-list');           
        }).error(function (e) {
			vm.message = "Could not update blog given id of " + vm.id + userForm.blogTitle.text + " " + userForm.blogText.text;
        });
    }
}]);

app.controller('DeleteController', ['$http', '$routeParams', '$location', function DeleteController($http, $routeParams, $location) {
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
		deleteBlogById($http, vm.id, data).success(function(data) {
			vm.message = "Blog deleted";
			$location.url('/blog-list');
		}).error(function(e) {
			vm.message = "Could not delete blog given id";
		});
	}
}]);
