(function () {

  angular
    .module('bloggerApp')
    .controller('GameController', GameController);

 function GameController(authentication) {
	var vm = this;
    vm.pageHeader = {
		title: "Game Controller"
    };

	vm.onlineUsersList = function() {
		return authentication.users();
	}
}
})();
