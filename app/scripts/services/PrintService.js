/**
 * @author f.ulusoy
 * created on 11.11.2016
 */
(function() {
'use strict';

angular.module('BlurAdmin.services', []).factory('printService', printService);

function printService($http, $timeout) {
  var service = {};
  service.print = function(content) {
    //console.log(content);
  };
  return service;
}

})();