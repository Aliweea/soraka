export default($scope, $state, hService) => {
	'ngInject';
	$scope.title = "公共安全";
	const jQueryDOMToDos = () => {
        //$(".navbar2position").hide(0); // 显示当前位置
        //$(".navbar2return").show(0); // 显示返回按钮
        //$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('.navTopShowPolice').hide(0); // 显示公安类型
        //$('#showshort').focus(); // 获取默认焦点

    }();
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
		$state.go("app.publicsecurity.bystate",paramObj);
	}

	// 用于底部bar的当前位置
	$scope.currentCategoryName = "公安"; // default value
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		switch($scope.currentCategoryName) {
			case "公安":
				$state.go("app.publicsecurity.policecall");
				break;
			case "消防":
				$state.go("app.publicsecurity.fire");
				break;
			case "信访":
				$state.go("app.publicsecurity.petition");
				break;
			case "交通事故":
				$state.go("app.publicsecurity.accident");
				break;
			case "生产安全":
				$state.go("app.publicsecurity.safety");
				break;
		}
	}
};