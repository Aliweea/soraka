export default($scope, $state, hService, xService, $rootScope, qService, kpiRes) => {
	'ngInject';
	$scope.title = "城市管理";
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
		$state.go("app.cm.bystate",paramObj);
	}

	const initPosition = () => {
		switch($state.params.categoryId) {
			case "7001": $scope.currentCategoryName = "垃圾清运"; break;
			case "7003": $scope.currentCategoryName = "行政处罚"; break;
			case "7005": $scope.currentCategoryName = "违法建设整治"; break;
			case "7006": $scope.currentCategoryName = "数字城管"; break;
		}
	}();
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		hService.register($state); // 向下级跳转则将当前位置计入历史记录
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
	let headers = {
    };
	xService.h("cm", ["7001", "7003", "7005", "7006"]);
	$rootScope.loading = true;
    qService.httpGetWithToken(kpiRes.blueMap, {}, headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
        	let t = data.data;
        	for (var i = t.length - 1; i >= 0; i--) {
        		if (t[i].id === "5") {
        			let a = [];
        			for (var j = t[i].categories.length - 1; j >= 0; j--) {
        				a.push(t[i].categories[j].id);
        				xService.s("cm", a);
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