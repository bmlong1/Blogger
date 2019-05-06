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
	
	vm.markTile = function(num) {
		if (vm.currentUser().email == vm.challengerEmail) {
			if (num == 1){
			vm.printLetter1 = "x";
			} else if (num == 2) {
				vm.printLetter2 = "x";
			}else if (num == 3) {
				vm.printLetter3 = "x";
			}else if (num == 4) {
				vm.printLetter4 = "x";
			}else if (num == 5) {
				vm.printLetter5 = "x";
			}else if (num == 6) {
				vm.printLetter6 = "x";
			}else if (num == 7) {
				vm.printLetter7 = "x";
			}else if (num == 8) {
				vm.printLetter8 = "x";
			}else if (num == 9) {
				vm.printLetter9 = "x";
			}
		}
		if (vm.currentUser().email == vm.playerEmail) {
if (num == 1){
			vm.printLetter1 = "o";
			} else if (num == 2) {
				vm.printLetter2 = "o";
			}else if (num == 3) {
				vm.printLetter3 = "o";
			}else if (num == 4) {
				vm.printLetter4 = "o";
			}else if (num == 5) {
				vm.printLetter5 = "o";
			}else if (num == 6) {
				vm.printLetter6 = "o";
			}else if (num == 7) {
				vm.printLetter7 = "o";
			}else if (num == 8) {
				vm.printLetter8 = "o";
			}else if (num == 9) {
				vm.printLetter9 = "o";
			}		}
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


