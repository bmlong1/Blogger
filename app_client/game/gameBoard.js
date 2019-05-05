(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	vm.challenger = function() {
		vm.game = [];
		getGamers($http).success(function(data) {
			data.forEach(function(element) {
				console.log(element.challengerEmail);
				if(element.challengerEmail == vm.currentUser().email) {
					vm.game.challengerName = vm.currentUser().name;
				} else if (element.playerEmail == vm.currentUser().email){
					return element.challengerName;
				}
			});
		});
	};
	
    vm.pageHeader = {
		title: "Battle Ship",
	    	heading:"challenge" + vm.challenger() + vm.game.challengerName + "hey"
    }; 

	$http.get('/api/game').success(function(data) {
	console.log(data);
	});

	vm.currentUser = function() {
	return authentication.currentUser();
	};
	
	
	
	
}

	function getGamers($http) {
		return $http.get('/api/game');
	};
})();
