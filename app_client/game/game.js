(function () {

  angular
    .module('bloggerApp')
    .controller('GameController', GameController);
GameController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameController($http, $scope, $interval, $location, authentication) {
	var vm = this;
    vm.pageHeader = {
		title: "Play a Game",
	    	heading: "Who would you like to play a game with?"
    };
	vm.currentUser = function() {
		return authentication.currentUser();
	};
	
	vm.isPlayingGame = function() {
		console.log(vm.currentUser());
		console.log(authentication.isPlayingGame(vm.currentUser().name));
	};
	if(vm.isPlayingGame() == true) {
		$location.url('/game-board');
	}
	 
	 getAllUsers($http).success(function(data) {
			vm.users = data;
        		vm.message = "User data found!";
	
    		}).error(function (e) {
			vm.message = "Could not get list of Users";
    		});
	
	// Refreshes lists of users periodically					  
		$scope.callAtInterval = function() {
			getAllUsers($http)
			  .success(function(data) {
				vm.users = data;
				vm.message = "Users list found!";
			  })
			  .error(function (e) {
				vm.message = "Could not get list of users";
			});								  
		}
		$interval( function(){$scope.callAtInterval();}, 3000, 0, true);
	
	vm.submit = function() {
		vm.userName = userForm.userrr.value;
			authentication.startGame(authentication.currentUser().name, vm.userName).success(function(){
			$location.url('/game-board');
			});
    	};
}

	function getAllUsers($http) {
    		return $http.get('/api/user');
	};
	
	

})();
