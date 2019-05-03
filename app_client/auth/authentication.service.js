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
          var user2 = { email: user.email, name: ""};
      
          var userss;
          $http.get('/api/allUsers').success(function(data) {
            userss = data;
            userss.forEach(function(element) {
            if(element.userEmail == user.email) {
                user2.name = element.userName;
            }
          });
          
          $http.post('/api/user', user2);
          
          });
          
           return $http.post('/api/login', user).success(function(data) {
              saveToken(data.token);
           });
        };
        
        var logout = function() {
          var thisEmail = currentUser().email;
            $window.localStorage.removeItem('blog-token');
          return $http.delete('/api/user/' + thisEmail);
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
                                            
        var users = function() {
        return $http.get('/api/user');
        }

        return {
          saveToken : saveToken,
          getToken : getToken,
          register : register,
          login : login,
          logout : logout,
          isLoggedIn : isLoggedIn,
          currentUser : currentUser,
          users : users
        };
}
})();
