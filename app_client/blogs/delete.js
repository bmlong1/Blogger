(function () {

  angular
    .module('bloggerApp')
    .service('authentication', authentication);

  authentication.$inject = ['$http', '$window'];
  function authentication ($http, $window) {    var saveToken = function (token) {
            $window.localStorage['blog-token'] = token;
        };
                                       
        var getToken = function () {
            return $window.localStorage['blog-token'];
        };
        
        var register = function(user) {
            console.log('Registering user ' + user.email + ' ' + user.password);
            return $http.post('/api/register', user).success(function(data){
                saveToken(data.token);
          });
        };
     
        var login = function(user) {
           console.log('Attempting to login user ' + user.email + ' ' + user.password);
           //$http.defaults.headers.post["Content-Type"] = "application/x-www-form-urlencoded";
            return $http.post('/api/login', user).success(function(data) {
              saveToken(data.token);
           });
        };
        
        var logout = function() {
            $window.localStorage.removeItem('blog-token');
        };
        
        var isLoggedIn = function() {
          var token = getToken();

          if(token){
            var payload = JSON.parse($window.atob(token.split('.')[1]));

            return payload.exp > Date.now() / 1000;
          } else {
            return false;
          }
        };

        var currentUser = function() {
          if(isLoggedIn()){
            var token = getToken();
            var payload = JSON.parse($window.atob(token.split('.')[1]));
            return {
              email : payload.email,
              name : payload.name
            };
          }
        };

        return {
          saveToken : saveToken,
          getToken : getToken,
          register : register,
          login : login,
          logout : logout,
          isLoggedIn : isLoggedIn,
          currentUser : currentUser
        };
}
})();
(function () {
	angular
    		.module('bloggerApp')
    		.controller('DeleteController', DeleteController);
    
    	DeleteController.$inject = ['$http', '$routeParams', '$location', 'authentication'];
    	function DeleteController($http, $routeParams, $location, authentication) {
		var vm = this;
		vm.pageHeader = {
			title: 'Delete Blog'
		};
		vm.blog = {};
		vm.id = $routeParams.id;

		getBlogById($http, vm.id).success(function(data) {
			vm.blog = data;
			vm.message = "Blog data found!";
		}).error(function(e) {
			vm.message = "Could not get blog given id";
		});

		vm.submit = function() {
			var data = vm.blog;
			deleteBlogById($http, authentication, vm.id, data).success(function(data) {
				vm.message = "Blog deleted";
				$location.url('/blog-list');
			}).error(function(e) {
				vm.message = "Could not delete blog given id";
			});
		}
	}
	
function getBlogById($http, id) {
    return $http.get('/api/blogs/' + id);
}

function deleteBlogById($http, authentication, id, data) {
    return $http.delete('/api/blogs/' + id, data, { headers: { Authorization: 'Bearer '+ authentication.getToken() }});
}

})();
