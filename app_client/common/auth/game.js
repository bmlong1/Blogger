(function () {

  angular
    .module('bloggerApp')
    .controller('GameController', GameController);
GameController.$inject = ['$http', '$scope', '$interval', 'authentication'];
function GameController($http, $scope, $interval, authentication) {
	var vm = this;
    vm.pageHeader = {
		title: "Game Controller"
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
	
	// Refreshes lists of users periodically					  
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
	
	
}

	function getAllUsers($http) {
    		return $http.get('/api/user');
	};

})();
