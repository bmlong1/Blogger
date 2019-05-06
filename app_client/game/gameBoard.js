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
	
	vm.markTile = function() {
		if (vm.currentUser().email == vm.challengerEmail) {
			vm.printLetter = "x";
		}
		if (vm.currentUser().email == vm.playerEmail) {
			vm.printLetter = "o";
		}
	};
	
	$http.get('/api/game/' + vm.currentUser().email).success(function(data) {
		vm.challengerEmail = data[0].challengerEmail;
		vm.challengerName = data[0].challengerName;
		vm.playerEmail = data[0].playerEmail;
		vm.playerName = data[0].playerName;
	});
	vm.otherPlayerName = function() {
	if(vm.currentUser().email == vm.challengerEmail) {
		console.log("het");
		return vm.playerName;
	}
if(vm.currentUser().email == vm.playerEmail) {
		return vm.challengerName;
	}    
	};
	vm.pageHeader = {
		title: "Battle Ship"
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
	vm.yourPlayer = function() {
		if(vm.x.email == vm.currentUser().email) {
			return "X's";
		} else if (vm.o.email == vm.currentUser().email) {
			return "O's";
		}
	};
	
}

	
})();


