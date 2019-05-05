(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	
	
	$http.get('/api/game/' + vm.currentUser().email).success(function(data) {
		vm.challengerEmail = data[0].challengerEmail;
	});
    vm.pageHeader = {
		title: "Battle Ship",
	    	heading:"challenge" + vm.challengerEmail; 
    }; 

	vm.currentUser = function() {
	return authentication.currentUser();
	};
	

	
	
	
	
}

	
})();
