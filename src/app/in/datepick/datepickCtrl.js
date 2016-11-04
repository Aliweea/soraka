export default($scope, dateService) => {
    'ngInject';

    // 隐藏topbar上的logout按钮
    $('#navTopLogout').hide(0);
    $('#navBottomReturn').show(0);

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