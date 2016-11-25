export default($scope, $state, hService, qService, xService, kpiRes, $rootScope) => {
	'ngInject';
	$scope.title = "公共安全";
	$scope.subTitle = "报警数";
	const jQueryDOMToDos = () => {
        //$(".navbar2position").hide(0); // 显示当前位置
        //$(".navbar2return").show(0); // 显示返回按钮
        //$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('.navTopShowPolice').hide(0); // 隐藏公安类型
        $scope.subTitle = "报警数";
        //$('#showshort').focus(); // 获取默认焦点

    }();
	// 上一级路由
	$scope.toH = () => {
		// $scope.changeTitle();
		// let h = hService.state();
		// if (h.params == null) {
		// 	$state.go(h.name);
		// } else {
		// 	$state.go(h.name, h.params);
		// }
		hService.back();
	}
	$scope.changeTitle = (subTitle = "报警数") => {
		$scope.subTitle = subTitle;
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
	const initPosition = () => {
		switch($state.params.categoryId) {
			case "3001": $scope.currentCategoryName = "公安"; break;
			case "3002": $scope.currentCategoryName = "消防"; break;
			case "3004": $scope.currentCategoryName = "信访"; break;
			case "3003": $scope.currentCategoryName = "交通事故"; break;
			case "3005": $scope.currentCategoryName = "生产安全"; break;
		}
	}();
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		hService.register($state);//向下级跳转，将当前位置计入历史记录
		$scope.subTitle = "报警数";
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
	xService.h("publicsecurity", ["3001", "3002", "3004", "3003", "3005"]);
	let headers = {
		
    };
	$rootScope.loading = true;
    qService.httpGetWithToken(kpiRes.blueMap, {}, headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
        	let t = data.data;
        	for (var i = t.length - 1; i >= 0; i--) {
        		if (t[i].id === "4") {
        			let a = [];
        			for (var j = t[i].categories.length - 1; j >= 0; j--) {
        				a.push(t[i].categories[j].id);
        				xService.s("publicsecurity", a);
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