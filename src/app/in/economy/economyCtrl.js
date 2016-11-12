export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "经济";
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
		$state.go("app.economy.bystate",paramObj);
	}
   $scope.currentCategoryName = "国内生产总值"; // default value
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		switch($scope.currentCategoryName) {
			case "国内生产总值":
				$state.go("app.thirddetail.economy");
				break;
			case "财政":
				$state.go("app.thirddetail.finance");
				break;
			case "投资与贸易":
				$state.go("app.thirddetail.thirdinvest");
				break;
			case "金融":
				$state.go("app.thirddetail.thirdindustry");
				break;
			case "工业与新兴产业":
				$state.go("app.thirddetail.thirdfisical");
				break;
		}
	}
};