export default($scope, dateService) => {
    'ngInject';
	$('#sorakaHomeFooter').removeClass("nodisplay");
    $('#sorakaHomeBody').removeClass("nopaddingbottom");
    // 隐藏topbar上的logout按钮
    $('#home_logout').hide(0);
    $('#footlabel').hide(0);
    $('#navBottomReturn').show(0);

	$scope.today = function() {
		$scope.dt = new Date();
	};
	$scope.$watch('dt',() => {
		if ($scope.dt == null) {
			$scope.formatedDate = "还未选择";	
		} else {
			$scope.formatedDate = new Date($scope.dt);
		}
	});
	$scope.confirm = () => {
		if ($scope.dt == null) {
			$('.hint-area').css("color","red");
			$scope.changeState = "还未选择时间!";
			return;
		}
		dateService.setSystemTime($scope.dt);
		$('.hint-area').css("color","green");
		$scope.changeState = "设置成功!";
	}
}