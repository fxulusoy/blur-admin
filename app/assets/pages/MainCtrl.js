'use strict';

angular.module('BlurAdmin.pages').controller('MainCtrl', function(
  $rootScope, $scope, $location, $window, $translate, profileService) {

  $scope.$on('$viewContentLoaded', function() {
    //console.log("viewContentLoaded");
  });

  $rootScope.currentLanguage = 'tr';

  $scope.changeLanguage = function(key) {
    $rootScope.currentLanguage = key;
  };

  $scope.changeLanguage($scope.currentLanguage);

  $rootScope.$watch('currentLanguage', function(newValue, oldValue) {
    if (newValue) {
      $translate.use(newValue);
    }
  });
  /*
  profileService.find($rootScope.loggedInUser.id).success(function(profile) {
    $rootScope.profile = profile;
  }).error(function(err) {
    console.error("Getting the profile of the loggedin user is failed.");
  });
  */
}).config(function($translateProvider) {

  $translateProvider.useStaticFilesLoader({
    prefix: '/translations/',
    suffix: '.json'
  });

  $translateProvider.preferredLanguage('tr');

});
