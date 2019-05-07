(function () {

  angular
    .module('bloggerApp')
    .controller('ChatController', ChatController);
ChatController.$inject = ['$http', '$scope', '$interval', '$location', 'authentication'];
function ChatController($http, $scope, $interval, $location, authentication) {
	var vm = this;
	vm.chat = {};
	vm.pageHeader = {
		title: "Chat with Friends",
	    	heading: "You can chat with the other users who are online, or you can just browse what has been said previously."
    	};
	
	vm.currentUser = function() {
		return authentication.currentUser();
	};
	
	vm.submit = function() {
		var data = vm.chat;
        	data.comment = userForm.comment.value;
        	data.authorName = userForm.authorName.value;
		data.authorEmail = userForm.authorEmail.value;
		   	addChat($http, data).success(function(data) {
		}).error(function(e) {
		});
	};
	
	// Refreshes lists of users periodically					  
		$scope.callAtInterval = function() {
			getComments($http)
			  .success(function(data) {
				vm.comments = data;
			  })
			  .error(function (e) {
			});
		}
		$interval( function(){$scope.callAtInterval();}, 3000, 0, true);
	
}
function getComments($http) {
  return $http.get('/api/chat');
};
	
	function addChat($http, data) {
		return $http.post('/api/chat/' + data);
	};
})();
