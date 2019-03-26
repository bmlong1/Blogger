var app = angular.module('bloggerApp', ['ngRoute']);
app.config(function($routeProvider) {
  $routeProvider
    .when('/', {
      templateUrl: 'pages/home.html',
      controller: 'HomeController',
      controllerAs: 'vm'
    })
});

app.controller('HomeController', function HomeController() {
  var vm = this;
  vm.pageHeader = { title: "My Blog" };
  vm.message = "Welcome.";
});

