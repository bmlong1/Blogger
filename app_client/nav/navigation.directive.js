(function () {

  angular
    .module('bloggerApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/nav/navigation.html',
      controller: 'NavigationController',
        controllerAs: 'vm'
    };
  }

})();
