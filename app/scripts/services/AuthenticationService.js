/**
 * @author f.ulusoy
 * created on 11.11.2016
 */
(function() {
'use strict';

angular.module('BlurAdmin.authService', []).factory('authenticationService', AuthenticationService);

function AuthenticationService() {

  return {
    isLoggedIn: function() {
      if (localStorage.getItem('authToken')) {
        return true;
      }
      return false;
    },
    isAdmin: function() {
      if (localStorage.getItem('authToken')) {
        var user = JSON.parse(localStorage.getItem('user'));
        if (user && user.isAdmin) {
          return true;
        }
      }
      return false;
    },
    getUser: function() {
      var user = JSON.parse(localStorage.getItem('user'));
      console.info("User is fetched from localStorage.");
      return user;
    },
    setUser: function(user) {
      localStorage.setItem('user', JSON.stringify(user));
      console.info("User is saved in localStorage.");
    },
    getToken: function() {
      var token = localStorage.getItem('authToken');
      console.info("AuthToken is fetched from localStorage.");
      return token;
    },
    setToken: function(token) {
      localStorage.setItem('authToken', token);
      console.info("User is saved in localStorage.");
    },
    signOut: function() {
      localStorage.clear();
    }
  };

}

})();
