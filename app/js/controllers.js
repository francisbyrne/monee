'use strict';

/* Controllers */


function LandingCtrl() {}
LandingCtrl.$inject = [];

// TODO: allow user to type currency symbol without screwing it up.
// TODO: localisation for datepicker
function GoalsCtrl($scope, $filter) {

	$scope.today = new Date();

	$scope.weeklySaving = function () {
		var period = Math.ceil(($scope.goalEndDate - $scope.today) / (1000*60*60*24*7));
		var totalSavings = $scope.goalTarget - $scope.goalCurrentSavings;

		return totalSavings > 0 ? Math.ceil(totalSavings/period) : 0;
	};

}

GoalsCtrl.$inject = ['$scope', '$filter'];
