(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	
	
    vm.pageHeader = {
		title: "Battle Ship",
	    	heading:"challenge" 
    }; 

	$http.get('/api/game/' + vm.currentUser().email).success(function(data) {
	console.log(data);
	});

	vm.currentUser = function() {
	return authentication.currentUser();
	};
	
	
	
	
}

	
})();
