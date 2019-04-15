(function () {

  angular
    .module('bloggerApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: 'navigation.html',
      controller: 'NavigationController',
        controllerAs: 'vm'
    };
  }

})();
