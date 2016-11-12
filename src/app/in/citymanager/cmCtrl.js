export default($scope, $state, hService) => {
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
	
	$scope.changeState = (state) => {
		let categoryId = hService.state().params.categoryId;
		let paramObj = {
			"categoryId": categoryId,
			"state": state
		};
		$state.go("app.cm.bystate",paramObj);
	}

	// 用于底部bar的当前位置
	$scope.currentCategoryName = "垃圾清运"; // default value
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		switch($scope.currentCategoryName) {
			case "垃圾清运":
				$state.go("app.cm.cmrefuse");
				break;
			case "行政处罚":
				$state.go("app.cm.cmpunish");
				break;
			case "违法建设整治":
				$state.go("app.cm.cmfix");
				break;
			case "数字城管":
				$state.go("app.cm.cmicm");
				break;
		}
	}
};