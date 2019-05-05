(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
		vm.challengerOrPlayer() = $http.get('/api/gameUsers').success(function(data) {
			data.forEach(function(element) {
				if(element.challenger == vm.currentUser()) {
					console.log("challenge");
					return "challenged ";
				} else {
					console.log("player");
					return "were challenged by ";
				}
			});
		});
	
	vm.otherPlayer = function() {
		$http.get('/api/gameUsers').success(function(data) {
			data.forEach(function(element) {
				if (element.challenger == vm.currentUser()) {
					return (element.player);
				} else if (element.player == vm.currentUser()){
					return element.challenger;
				}
			});
		});
	};
	
    vm.pageHeader = {
		title: "Battle Ship",
	    	heading1: "You ",
	    	heading2: " to play a game of Battle Ship."
    };
	
	vm.currentUser = function() {
		return authentication.currentUser();
	};
}
})();
