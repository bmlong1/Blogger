(function () {

  angular
    .module('bloggerApp')
    .controller('GameController', GameController);

 function GameController() {
	var vm = this;
    vm.pageHeader = {
		title: "Game Controller"
    };
}
})();
