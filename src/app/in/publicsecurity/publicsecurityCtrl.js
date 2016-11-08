export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "公共安全";
	// 上一级路由
	$scope.toH = () => {
		$state.go(hService.state());
	}
};