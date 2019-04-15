var app = angular.module('bloggerApp', ['ngRoute']);
//*** Router Provider ***//
app.config( function($routeProvider, $locationProvider) {
	$routeProvider
		.when('/', {
			templateUrl: '/home/home.html',
			controller: 'HomeController',
			controllerAs: 'vm'
		})

		.when('/blog-list', {
			templateUrl: '/blogs/list.html',
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
	$locationProvider.html5Mode(true).hashPrefix('!');
});

//*** REST Web API functions ***//
function addBlog($http, authentication, data) {
	return $http.post('/api/blogs', data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
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

function deleteBlogById($http, authentication, id, data) {
    return $http.delete('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

//*** Controllers ***//
//app.controller('HomeController', function HomeController() {
//	var vm = this;
  //  vm.pageHeader = {
//		title: "My Blogs"
  //  };
//	vm.message = "Welcome to my blog site!";
//});

app.controller('AddController', ['$http', '$location', 'authentication',  function AddController($http, $location, authentication) {
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
}]);

app.controller('ListController', function ListController($http, authentication) {
    var vm = this;
    vm.pageHeader = {
        title: 'Blog List'
    };
	
	 vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
	
    getAllBlogs($http).success(function(data) {
		vm.blogs = data;
        vm.message = "Blog data found!";
    }).error(function (e) {
		vm.message = "Could not get list of blogs";
    });
});

app.controller('EditController',[ '$http', '$routeParams', '$location', 'authentication', function EditController($http, $routeParams, $location, authentication) {
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
}]);

app.controller('DeleteController', ['$http', '$routeParams', '$location', 'authentication', function DeleteController($http, $routeParams, $location, authentication) {
	var vm = this;
	vm.pageHeader = {
		title: 'Delete Blog'
	};

	vm.blog = {};
	vm.id = $routeParams.id;

	getBlogById($http, authentication, vm.id).success(function(data) {
		vm.blog = data;
		vm.message = "Blog data found!";
	}).error(function(e) {
		vm.message = "Could not get blog given id";
	});

	vm.submit = function() {
		var data = vm.blog;
		deleteBlogById($http, authentication, vm.id, data).success(function(data) {
			vm.message = "Blog deleted";
			$location.url('/blog-list');
		}).error(function(e) {
			vm.message = "Could not delete blog given id";
		});
	}
}]);

app.controller('LoginController', [ '$http', '$location', 'authentication', function LoginController($htttp, $location, authentication) {
    var vm = this;

    vm.pageHeader = {
      title: 'Sign in to Blogger'
    };

    vm.credentials = {
      email : "",
      password : ""
    };

    vm.returnPage = $location.search().page || '/';

    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.email || !vm.credentials.password) {
           vm.formError = "All fields required, please try again";
        return false;
      } else {
           vm.doLogin();
      }
    };

    vm.doLogin = function() {
      vm.formError = "";
      authentication
        .login(vm.credentials)
        .error(function(err){
          var obj = err;
          vm.formError = obj.message;
        })
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
        });
    };
 }]);

app.controller('RegisterController', [ '$http', '$location', 'authentication', function RegisterController($htttp, $location, authentication) {
    var vm = this;
    
    vm.pageHeader = {
      title: 'Create a new Blooger account'
    };
    
    vm.credentials = {
      name : "",
      email : "",
      password : ""
    };
    
    vm.returnPage = $location.search().page || '/';
    
    vm.onSubmit = function () {
      vm.formError = "";
      if (!vm.credentials.name || !vm.credentials.email || !vm.credentials.password) {
        vm.formError = "All fields required, please try again";
        return false;
      } else {
        vm.doRegister();
      }
    };

    vm.doRegister = function() {
      vm.formError = "";
      authentication
        .register(vm.credentials)
        .error(function(err){
          vm.formError = "Error registering. Try again with a different email address."
          //vm.formError = err;
        })
        .then(function(){
          $location.search('page', null); 
          $location.path(vm.returnPage);
        });
    };
}]);      
