(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameBoardController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameBoardController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	vm.currentUser = function() {
	return authentication.currentUser();
	};
	
	
	$http.get('/api/game/' + vm.currentUser().email).success(function(data) {
		vm.challengerEmail = data[0].challengerEmail;
		vm.challengerName = data[0].challengerName;
		vm.playerEmail = data[0].playerEmail;
		vm.playerName = data[0].playerName;
	});
	
	$http.get('/api/otherPlayer/' + vm.currentUser().email).success(data) {
		console.log(data);
	});
    vm.pageHeader = {
		title: "Battle Ship"
    }; 
	
}

	
})();
