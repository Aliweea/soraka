export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "城市管理";
	// 上一级路由
	$scope.toH = () => {
		$state.go(hService.state());
	}
};