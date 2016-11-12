export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "公共安全";
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
		$state.go("app.publicService.bystate",paramObj);
	}

	// 用于底部bar的当前位置
	$scope.currentCategoryName = "教育"; // default value
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
		console.log(currentCategoryName);
	}

	$scope.toDetail = () => {
		switch($scope.currentCategoryName) {	
			case "教育":
				$state.go("app.publicService.peducation");
				console.log($scope.currentCategoryName);
				break;
			case "医疗卫生":
				$state.go("app.publicService.phealthCare");
				console.log($scope.currentCategoryName);
				break;
			case "电信":
				$state.go("app.publicService.ptelecom");
				console.log($scope.currentCategoryName);
				break;
			case "交通":
				$state.go("app.publicService.ptraffic");
				console.log($scope.currentCategoryName);
				break;

		}
	}
};