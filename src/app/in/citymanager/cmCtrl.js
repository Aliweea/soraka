export default($scope, $state, hService, scFactory) => {
	'ngInject';
	$scope.title = "城市管理";
	// 上一级路由
	$scope.toH = () => {
		let h = hService.state();
		if (h.params == null) {
			$state.go(h.name);
		} else {
			$state.go(h.name, h.params);
		}
	}
	let historyCategoryId = 0; // 在状态之间切换时记住当前categoryId
	$scope.changeState = (state) => {
		let categoryId = scFactory[$state.current.name];
		if (categoryId === 0) {
			categoryId = historyCategoryId;
		} else {
			historyCategoryId = categoryId;
		}
		let paramObj = {
			"categoryId":categoryId
		};
		paramObj.state = state;
		$state.go("app.cm.bystate",paramObj);
	}
};