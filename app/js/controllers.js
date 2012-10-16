'use strict';

/* Controllers */

// Navigation bar controller
function NavCtrl($scope, $location) { 

	// switch highlighted button on navbar when clicked
  $scope.navClass = function (page) {
    var currentRoute = $location.path().substring(1) || 'home';
    return page === currentRoute ? 'active' : '';
  };   
}
NavCtrl.$inject = ['$scope', '$location'];


function LandingCtrl() {}
LandingCtrl.$inject = [];


// TODO: allow user to type currency symbol without screwing it up.
// TODO: localisation for datepicker
function GoalsCtrl($scope, $filter) {

	// milliseconds in one week
	var ONE_WEEK = 1000 * 60 * 60 * 24 * 7;

    // calculate weekly savings required based on form inputs
    var today = new Date();

    var calculateWeeklySaving = function () {
        var period = Math.ceil(($scope.goalEndDate - today) / (ONE_WEEK));
        var totalSavings = $scope.goalTarget - $scope.goalCurrentSavings;

        return totalSavings > 0 ? Math.ceil(totalSavings/period) : 0;
    };

    // calculate the days it will take to reach the goal target
    var calculateEndDate = function () {
    	var days = Math.ceil( ($scope.goalTarget - $scope.goalCurrentSavings) / ($scope.goalWeeklySaving / 7) );
    	var date = new Date();
    	date.setDate(today.getDate() + days);
    	return date;
    }

    $scope.endDate = function () {
    	if ( $scope.goalEndDate ) {
    		return $scope.goalEndDate;
    	} else if ( $scope.goalWeeklySaving ) {
    	 	return calculateEndDate();
    	} else {
    		return today;
    	}
    };

    $scope.subtitle = function () {
    	if ( $scope.goalEndDate ) {
    		return 'You will need to save $' + calculateWeeklySaving() + ' per week to achieve your goal.';
    	} else if ( $scope.goalWeeklySaving ) {
    		return 'You will reach your goal by ' + calculateEndDate().toDateString() + '.';
    	}
    };

    $scope.trigger = function () {
    	return $scope.goalEndDate + $scope.goalName + $scope.goalTarget + $scope.goalWeeklySaving + $scope.goalCurrentSavings;
    };

    // watch the weeklySaving value and redraw the savings graph when it changes
    //$scope.$watch('trigger()', function (newVal, oldVal) {
    $scope.drawGraph = function () {
      var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'graph',
            margin: [70, 50, 60, 80]
        },
        title: {
            text: 'My ' + ( $scope.goalName ? $scope.goalName : 'Goal' )
        },
        subtitle: {
            text: $scope.subtitle()
        },
        xAxis: {
            type: 'datetime',
            startOnTick: false,
            labels: {
                align: 'center',
                x: 0,
                y: 15
            }
        },
        yAxis: {
            title: {
                text: null
            },
            labels: {
                align: 'left',
                x: 3,
                y: 16,
                formatter: function() {
                    return Highcharts.numberFormat(this.value, 0);
                }
            },
            showFirstLabel: false
        },
        tooltip: {
        	crosshairs: true,
        	valuePrefix: '$',
        	xDateFormat: '%Y-%m-%d',
        },
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
        	// data is based on input values
            data: [[today.getTime(), parseFloat($scope.goalCurrentSavings)],
            		[ $scope.endDate().getTime(), parseFloat($scope.goalTarget)]],
            name: 'Savings'
        }]
    });
	};

}
GoalsCtrl.$inject = ['$scope', '$filter'];



