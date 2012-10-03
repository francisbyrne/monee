'use strict';


// Declare app level module which depends on filters, and services
angular.module('monee', ['ui']).
  config(['$routeProvider', function($routeProvider) {
    $routeProvider.when('/home', {templateUrl: 'partials/landing.html', controller: LandingCtrl});
    $routeProvider.when('/goals', {templateUrl: 'partials/goals.html', controller: GoalsCtrl});
    $routeProvider.otherwise({redirectTo: '/home'});
  }]);
