(function () {

  angular
    .module('bloggerApp')
    .controller('GameController', GameController);

GameController.$inject = ['$http', '$location', 'authentication'];
 function GameController($htttp, $location, authentication) {
	var vm = this;
    vm.pageHeader = {
		title: "Game Controller"
    };

	vm.onlineUsersList = function() {
		return authentication.users();
	}
}
})();
