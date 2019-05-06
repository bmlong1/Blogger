/*(function () {

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
		} else if (vm.o.email == vm.currentUser().email) {
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
})();*/




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
			console.log(vm.users);
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


})();

