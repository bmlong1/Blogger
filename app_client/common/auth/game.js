(function () {

  angular
    .module('bloggerApp')
    .controller('GameController', GameController);

 function GameController(authentication) {
	var vm = this;
    vm.pageHeader = {
		title: "Game Controller"
    };

	 
	 getAllUsers($http).success(function(data) {
			vm.users = data;
        		vm.message = "User data found!";
    		}).error(function (e) {
			vm.message = "Could not get list of Users";
    		});
}

	function getAllUsers($http) {
    		return $http.get('/api/user');
	};
})();
