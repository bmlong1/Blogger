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
	
	
	 $http.get('/api/allUsers').success(function(data) {
		console.log(data);
	});
	 
	 getAllUsers($http).success(function(data) {
			vm.users = data;
        		vm.message = "User data found!";
		 	console.log(vm.users);
	
    		}).error(function (e) {
			vm.message = "Could not get list of Users";
    		});
	
	/*// Refreshes lists of users periodically					  
		$scope.callAtInterval = function() {
			console.log("Interval occurred");
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
	*/
	vm.submit = function() {
for(var i = 0; i <= userForm.length) {
	if(userForm[i].userrr == checked) {
		console.log(userForm[i].userrr);
	}
}
		
		/*		data.userName = userForm.userName.value;
			authentication.startGame(vm.currentUser().name, data.userName).success(function(){
			$location.url('/blog-list');
			});*/
    	};
}

	function getAllUsers($http) {
    		return $http.get('/api/user');
	};
	
	

})();
