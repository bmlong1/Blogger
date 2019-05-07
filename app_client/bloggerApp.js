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
			templateUrl: '/blogs/add.html',
			controller: 'AddController',
			controllerAs: 'vm'
		})
          
        .when('/blog-edit/:id', {
			templateUrl: '/blogs/edit.html',
			controller: 'EditController',
			controllerAs: 'vm'
		})
        
        .when('/blog-delete/:id', {
			templateUrl: '/blogs/delete.html',
            controller: 'DeleteController',
            controllerAs: 'vm'
        })
	
		.when('/register', {
			templateUrl: '/auth/register.html',
			controller: 'RegisterController',
			controllerAs: 'vm'
		})
		
		.when('/login', {
			templateUrl: '/auth/login.html',
			controller: 'LoginController',
			controllerAs: 'vm'
		})
	.when('/chat', {
		templateUrl: '/chat/chat.html',
		controller: 'ChatController',
		controllerAs: 'vm'
	})
		
		.otherwise({redirectTo: '/'});
	$locationProvider.html5Mode(true).hashPrefix('!');
});
