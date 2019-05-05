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
	$http.get('/api/game/'+vm.currentUser().email).success(function(data) {
		if(data.length > 0) {
				$location.url('/game-board');	

		}
		
	});
	
	
	 getOnlineUsers($http).success(function(data) {
			vm.users = data;
        		vm.message = "User data found!";
	
    		}).error(function (e) {
			vm.message = "Could not get list of Users";
    		});
	
	
	// Refreshes lists of users periodically					  
		$scope.callAtInterval = function() {
			getOnlineUsers($http)
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
		vm.userName = userForm.userName.value;
		vm.userEmail = userForm.userEmail.value;
		$http.post('/api/game/' + vm.currentUser().name + "/" + vm.currentUser().email + "/" +
			   + vm.userName + "/" + vm.userEmail).success(function(){
			$location.url('/game-board');
			});
    	};

}
function getOnlineUsers($http) {
	return $http.get('/api/user');
};

})();
