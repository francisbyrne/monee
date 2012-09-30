'use strict';


// Declare app level module which depends on filters, and services
angular.module('monee', []).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/landing.html', controller: LandingCtrl});
    $routeProvider.when('/get', {templateUrl: 'partials/get.html', controller: GetCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
