(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	vm.challenger = function() {
		getGamers($http).success(function(data) {
			data.forEach(function(element) {
				if(challengerEmail == vm.currentUser().email) {
					return vm.currentUser().name;
				} else if (playerEmail == vm.currentUser().email){
					return challengerName;
				}
			});
		});
	};
	
    vm.pageHeader = {
		title: "Battle Ship",
	    	heading:"challenge" + vm.challenger() + "hey"
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
