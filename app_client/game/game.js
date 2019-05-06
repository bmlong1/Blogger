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
		console.log(vm.x);
		console.log(vm.currentUser());
		if(vm.x == vm.currentUser()) {
			console.log("true");
			return "X's";
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
	
	
	// Refreshes lists of users periodically					  
		$scope.callAtInterval = function() {
//			vm.yourPlayer();	
		}
		$interval( function(){$scope.callAtInterval();}, 3000, 0, true);
	
	vm.submit = function() {
		vm.userName = userForm.userName.value;
		console.log(vm.userName);
		vm.userEmail = userForm.userEmail.value;
		console.log(vm.userEmail);
		$http.post('/api/game/' + vm.currentUser().name + "/" + vm.currentUser().email + "/" +
			  vm.userName + "/" + vm.userEmail).success(function(){
			$location.url('/game-board');
			});
    	};

}
function getOnlineUsers($http) {
	return $http.get('/api/user');
};

	function changeHeading() {
		vm.pageHeader.heading = "you are playing as";
	};

})();
