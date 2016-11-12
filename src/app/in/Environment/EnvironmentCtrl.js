export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "资源环境";
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
		$state.go("app.environment.bystate",paramObj);
	}

	// 用于底部bar的当前位置
	$scope.currentCategoryName = "水环境"; // default value
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		switch($scope.currentCategoryName) {
			case "水环境":
				$state.go("app.environment.waterThree");
				break;
			case "大气环境":
				$state.go("app.environment.airThree");
				break;
			case "土地资源":
				$state.go("app.environment.landThree");
				break;
			case "电力消耗":
				$state.go("app.environment.energyThree");
				break;
		}
	}
};