export default($scope, $state, hService, xService, $rootScope, qService, kpiRes) => {
	'ngInject';
	$scope.title = "资源环境";
	// 上一级路由
	$scope.toH = () => {
		hService.back();
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
	const initPosition = () => {
		switch($state.params.categoryId) {
			case "4001": $scope.currentCategoryName = "水环境"; break;
			case "4002": $scope.currentCategoryName = "大气环境"; break;
			case "4004": $scope.currentCategoryName = "土地资源"; break;
			case "5001": $scope.currentCategoryName = "电力消耗"; break;
		}
	}();
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		hService.register($state); // 向下级跳转则将当前位置计入历史记录
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
	let headers = {
		
    };
    xService.h("environment", ["4001", "4002", "4004", "5001"]);
	$rootScope.loading = true;
    qService.httpGetWithToken(kpiRes.blueMap, {}, headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
        	let t = data.data;
        	for (var i = t.length - 1; i >= 0; i--) {
        		if (t[i].id === "2") {
        			let a = [];
        			for (var j = t[i].categories.length - 1; j >= 0; j--) {
        				a.push(t[i].categories[j].id);
        				xService.s("environment", a);
        			}
        		}
        	}
        } else {}
    }, (err) => {
        if (err.errorCode == "UNAUTHORIZED") {
            $state.go('portal');
        } else {}
    }).finally(() => {
        $rootScope.loading = false;
    });
};