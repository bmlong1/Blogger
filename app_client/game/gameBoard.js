(function () {

  angular
    .module('bloggerApp')
    .controller('GameBoardController', GameBoardController);
GameController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function GameController($http, $scope, $interval, $location, authentication) {
	var vm = this;
    vm.pageHeader = {
		title: "Game Board",
	    	heading: "Game Board"
    };
})();
