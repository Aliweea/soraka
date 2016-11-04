export default($scope, dateService) => {
    'ngInject';
	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.today();

	$scope.options = {
		minDate: new Date("1990-1-1"),
		showWeeks: true
	};

	$scope.setDate = function(year, month, day) {
		$scope.dt = new Date(year, month, day);
	};

	$scope.confirm = () => {
		dateService.setSystemTime($scope.dt);
	}
}