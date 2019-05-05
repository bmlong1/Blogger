(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	
	vm.otherPlayer = function() {
		return authentication.otherPlayer(vm.currentUser());
	};
	
    vm.pageHeader = {
		title: "Battle Ship"
    };
	
	vm.currentUser = function() {
		return authentication.currentUser().name;
	};
}
})();
