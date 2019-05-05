(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
    vm.pageHeader = {
		title: "Battle Ship",
	    	heading: "You " + vm.challengerOrPlayer() + vm.otherPlayer() + " to play a game of Battle Ship."
    };
	vm.challengerOrPlayer = function() {
		$http.get('/api/gamUsers').success(function(data) {
			data.forEach(function(element) {
				if(element.challenger == vm.currentUser()) {
					return "challenged ";
				} else {
					return "were challenged by ";
				}
			});
		});
	};
	vm.otherPlayer = function() {
		$http.get('/api/gameUsers').success(function(data) {
			data.forEach(function(element) {
				if (element.challenger == vm.currentUser()) {
					return element.player;
				} else if (element.player == vm.currentUser()){
					return element.challenger;
				}
			});
		});
	};
	
	vm.currentUser = function() {
		return authentication.currentUser();
	};
}
})();
