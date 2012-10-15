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
    $scope.today = new Date();
    $scope.goalEndDate = new Date();
    $scope.weeklySaving = function () {
        var period = Math.ceil(($scope.goalEndDate - $scope.today) / (ONE_WEEK));
        var totalSavings = $scope.goalTarget - $scope.goalCurrentSavings;

        return totalSavings > 0 ? Math.ceil(totalSavings/period) : 0;
    };

    // watch the weeklySaving value and redraw the savings graph when it changes
    $scope.$watch('weeklySaving()', function (newVal, oldVal) {
      var chart = new Highcharts.Chart({
        chart: {
            renderTo: 'graph',
            margin: [70, 50, 60, 80]
        },
        title: {
            text: 'Savings Goal'
        },
        subtitle: {
            text: 'Here\'s how long it will take to achieve your goal.'
        },
        xAxis: {
            type: 'datetime',
            tickInterval: ONE_WEEK,
            tickWidth: 1,
            gridLineWidth: 1,
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
        legend: {
            enabled: false
        },
        exporting: {
            enabled: false
        },
        series: [{
        	// data is based on input values
            data: [[$scope.today.getTime(), parseFloat($scope.goalCurrentSavings)],
            		[$scope.goalEndDate.getTime(), parseFloat($scope.goalTarget)]],
            name: $scope.goalName
        }]
    });
	});

}
GoalsCtrl.$inject = ['$scope', '$filter'];



