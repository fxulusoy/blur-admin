(function() {
'use strict';

angular.module('BlurAdmin.signin').controller('LoginCtrl', LoginCtrl);

function LoginCtrl($rootScope, $scope, $state, toastr, printService, authenticationService, profileService) {

  var vm = this;
  vm.user = {
    name: '',
    email: '',
    password: ''
  };

  vm.signIn = function() {
    var authData = {
      username: vm.user.email,
      password: vm.user.password,
    };

    userService.authenticateUser(authenticationDetails, {
      onFailure: function(err) {
        toastr.error(err.message, 'Error');
      },
      onSuccess: function(authResult) {

        var currentUser = {
          id: userPayload.sub,
          name: userPayload.name,
          email: userPayload.email,
          isAdmin: false
        };
        if (currentUser.name === "ADMIN") {
          currentUser.isAdmin = true;
        }

        $rootScope.loggedInUser = currentUser;
        authenticationService.setUser(currentUser);

        $rootScope.authToken = authToken;
        authenticationService.setToken(authToken);

        $state.go('main.dashboard');


      }
    });
  };

  vm.signUp = function() {

    userService.signUp(vm.user.email, vm.user.password, function(err, result) {
      if (err) {
        console.error('Signing up is failed for', vm.user.email);
        toastr.error(err.message, 'Error');
        if (err.code === "UsernameExistsException") {
          $state.go('confirm');
        }
      } else {
        var cognitoUser = result.user;
        console.log('Signing up is successfull', vm.user.email);
        $state.go('confirm');
      }
    });
  };

  vm.confirm = function() {
    var userData = {
      username: vm.email
    };

    userService.confirmRegistration(vm.confirmationCode, true, function(err, result) {
      if (err) {
        console.error('Confirmation is failed for user', vm.email);
        toastr.error(err.message, 'Error');
      } else {
        console.log('Confirmation is successfull for user', vm.email);
        toastr.success(null, 'Success');
        $state.go('signin');
      }
    });
  };

  vm.forgot = function() {
    var userData = {
      username: vm.email
    };

    userService.forgotPassword({
      onSuccess: function(result) {
        toastr.success(null, 'Success');
        $state.go('signin');
      },
      onFailure: function(err) {
        toastr.error(err.message, 'Error');
      },
      inputVerificationCode: function() {
        var verificationCode = prompt('Please input verification code ', '');
        var newPassword = prompt('Enter new password ', '');
        cognitoUser.confirmPassword(verificationCode, newPassword, this);
      }
    });
  };

}

})();
