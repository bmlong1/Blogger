var app = angular.module('bloggerApp', ['ngRoute']);

app.config(function($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'pages/home.html',
            controller: 'HomeController', 
            controllerAs: 'vm'
        })
        .when('/blog-list', {
            templateUrl: 'pages/blog-list.html',
            controller: 'ListController',
            controllerAs: 'vm'
        })
        .when('/blog-add', {
            templateUrl: 'pages/blog-add.html',
            controller: 'AddController',
            controllerAs: 'vm'
        })
        .when('/blog-edit', {
            templateUrl: 'pages/blog-edit.html',
            controller: 'EditController',
            controllerAs: 'vm'
        })
        .when('/blog-delete', {
            templateUrl: 'pages/blog-delete.html',
            controller: 'DeleteController',
            controllerAs: 'vm'
        })
});

app.controller('HomeController', function HomeController() {
    var vm = this;
    vm.pageHeader = {
        title: "Bri Long's Blog Site"
    };
    vm.message = "Welcome to my blog site!";
});

app.controller('ListController', function ListController($http) {
    var vm = this;
    vm.pageHeader = {
        title: "Blog List"
    };
    
    getAllBlogs($http).success(function(data) {
      vm.blogs = data;
      vm.message = "blog data found";
      }).error(function(e) {
       vm.message = "could not get blogs";
     });
});

app.controller('AddController', function AddController() {
    var vm = this;
    vm.pageHeader = {
        title: "Add Blog"
    };
});

app.controller('EditController', function EditController() {
    var vm = this;
    vm.pageHeader = {
        title: "Edit Blog"
    };
}):    
app.controller('DeleteController', function DeleteController() {
    var vm = this;
    vm.pageHeader = {
        title: "Delete Blog"
    };
});

function getAllBlogs($http) {
    return $http.get('/api/blogs');
}

