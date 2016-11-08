export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "公共事业";
	// 上一级路由
	$scope.toH = () => {
		$state.go(hService.state());
	}
};