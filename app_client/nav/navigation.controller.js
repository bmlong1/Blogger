(function () {

  angular
    .module('bloggerApp')
    .controller('NavigationController', NavigationController);

 NavigationController.$inject = ['$location', 'authentication'];
  function NavigationController($location, authentication) {
var vm = this;
    vm.currentPath = $location.path();
    vm.currentUser = function()  {
        return authentication.currentUser();
    }
    vm.isLoggedIn = function() {
        return authentication.isLoggedIn();
    }
    vm.logout = function() {
        authentication.logout();
        $location.path('/').replace();
    };
  }
})();
