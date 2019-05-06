(function () {

  angular
    .module('bloggerApp')
    .controller('GameController', GameController);
GameController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	
	vm.currentUser = function() {
		return authentication.currentUser();
	};

	
	vm.yourPlayer = function() {
		if(vm.x.email == vm.currentUser().email) {
			return "X's";
		} else if (vm.O.email == vm.currentUser().email) {
			return "O's";
		}
	};
		
	vm.pageHeader = {
		title: "Play a Game",
	    	heading: "Would you like to be X's or O's?",
		other: "You are playing as "
    	};
	
	
	vm.noPlayer = function() {
		if (vm.x == undefined && vm.o == undefined) {
			return true;
		} else {
			return false;
		}
	};
	
	
	vm.playerX = function() {
		vm.x = vm.currentUser();
		vm.hideX = true;
	};
	
	vm.playerO = function() {
		vm.o = vm.currentUser();
		vm.hideO = true;
	};
	
	
	// Refreshes lists of users periodically					  
		$scope.callAtInterval = function() {
//			vm.yourPlayer();	
		}
		$interval( function(){$scope.callAtInterval();}, 3000, 0, true);
	

}
})();
