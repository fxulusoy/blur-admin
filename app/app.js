/**
 * @author f.ulusoy
 * created on 11.11.2016
 */
'use strict';

angular.module('BlurAdmin', [
  'toastr',
  'ngTouch',
  'ngJsTree',
  'ngAnimate',
  'xeditable',
  'smart-table',
  'ui.router',
  'ui.sortable',
  'ui.bootstrap',
  'ui.slimscroll',
  "pascalprecht.translate",
  'angular-progress-button-styles',

  'permission',
  'permission.ui',

  'BlurAdmin.authService',
  'BlurAdmin.signin',

  'BlurAdmin.theme',
  'BlurAdmin.pages',
  'BlurAdmin.services'

])
.config(function($stateProvider, $urlRouterProvider, $httpProvider) {

    $httpProvider.interceptors.push('blurAdminHttpInterceptor');

})
.run(function($rootScope, $state, $location, editableOptions, editableThemes, PermRoleStore, authenticationService, profileService) {

    // xeditable theme
    editableOptions.theme = 'bs3';
    editableThemes.bs3.inputClass = 'input-sm';

    PermRoleStore.defineRole('AUTHORIZED', function() {
        return authenticationService.isLoggedIn();
    });

    PermRoleStore.defineRole('ADMIN', function() {
        return authenticationService.isAdmin();
    });

    var originalPath = $location.path();
    // Try getting valid user with existing token or go to login page.
    var authToken = authenticationService.getToken();
    if (!authToken) {
        if (originalPath !== "/signin") {
            $location.path("/signin");
        }
    } else {
        $rootScope.authToken = authToken;
        $rootScope.loggedInUser = authenticationService.getUser();
        if (!$rootScope.loggedInUser) {
          profileService.find($rootScope.loggedInUser.id).success(function(profile) {
            $rootScope.profile = profile;
          }).error(function(err) {
            console.error("Getting the profile of the loggedin user is failed.");
          });
        }
    }

    $rootScope.$on('$stateChangeStart', function(event, toState, params) {
      if (toState.redirectTo) {
        event.preventDefault();
        $state.go(toState.redirectTo, params, {
            location: 'replace'
        });
      }
      if (toState.name !== 'signin') {
        if (authenticationService.getToken()) {
          $rootScope.loggedInUser = authenticationService.getUser();
          if (!$rootScope.loggedInUser) {
            profileService.find($rootScope.loggedInUser.id).success(function(profile) {
              $rootScope.profile = profile;
            }).error(function(err) {
              console.error("Getting the profile of the loggedin user is failed.");
            });
          }
        } else if ((toState.name !== 'signup') && (toState.name !== 'confirm') && (toState.name !== 'forgotpwd')) {
          $state.go('signin');
          event.preventDefault();
        }
      }
    });
})
.constant('apiProtocol', 'https')
.constant('apiHost', '')
.constant('apiPath', '/dev/');
