export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "民生";
	// 上一级路由
	$scope.toH = () => {
		let h = hService.state();
		if (h.params == null) {
			$state.go(h.name);
		} else {
			$state.go(h.name, h.params);
		}
	}
	
	$scope.changeState = (state) => {
		let categoryId = hService.state().params.categoryId;
		let paramObj = {
			"categoryId": categoryId,
			"state": state
		};
		$state.go("app.livehood.bystate",paramObj);
	}

	// 用于底部bar的当前位置
	$scope.currentCategoryName = "人口结构"; // default value
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		switch($scope.currentCategoryName) {
			case "人口结构":
				$state.go("app.livehood.PopulationStructure");
				break;
			case "社会保险":
				$state.go("app.livehood.UBEI");
				break;
			case "价格指数":
				$state.go("app.livehood.priceThree");
				break;
		}
	}
};