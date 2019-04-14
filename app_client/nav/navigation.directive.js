(function () {

  angular
    .module('bloggerApp')
    .directive('navigation', navigation);

  function navigation () {
    return {
      restrict: 'EA',
      templateUrl: '/nav/navigation.template.html',
      controller: 'navigationCtrl as navigationController'
    };
  }

})();
