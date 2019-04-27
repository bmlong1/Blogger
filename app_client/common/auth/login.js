(function () {
      angular
            .module('bloggerApp')
            .controller('LoginController', LoginController);
    
      LoginController.$inject = ['$http', '$location', 'authentication'];
            function LoginController($htttp, $location, authentication) {
            var vm = this;
                  vm.pageHeader = {
              title: 'Sign in to Blogger'
            };
            vm.credentials = {
                  email : "",
                  password : ""
            };
            vm.returnPage = $location.search().page || '/';

            vm.onSubmit = function () {
                  vm.formError = "";
                  if (!vm.credentials.email || !vm.credentials.password) {
                        vm.formError = "All fields required, please try again";
                        return false;
                  } else {
                        vm.doLogin();
			  $http.post('/api/user',vm.credentials);
                  }
            };

            vm.doLogin = function() {
                  vm.formError = "";
                  authentication
                        .login(vm.credentials)
                        .error(function(err){
                              var obj = err;
                              vm.formError = obj.message;
                         })
                         .then(function(){
             
                              $location.search('page', null); 
                              $location.path(vm.returnPage);
                   
                        });
            };
 }
 
 })();
