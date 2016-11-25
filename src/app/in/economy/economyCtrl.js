export default($scope, $state, hService, xService, kpiRes, qService, $rootScope) => {
	'ngInject';
	$scope.title = "经济";
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
		$state.go("app.economy.bystate",paramObj);
	}
	const initPosition = () => {
		switch($state.params.categoryId) {
			case "2": $scope.currentCategoryName = "国内生产总值"; break;
			case "1": $scope.currentCategoryName = "财政"; break;
			case "4": $scope.currentCategoryName = "投资与贸易"; break;
			case "3": $scope.currentCategoryName = "金融"; break;
			case "5": $scope.currentCategoryName = "工业与新兴产业"; break;
		}
	}();
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
    	hService.register($state);
		switch($scope.currentCategoryName) {
			case "国内生产总值":
				$state.go("app.economy.economy");
				break;
			case "财政":
				$state.go("app.economy.finance");
				break;
			case "投资与贸易":
				$state.go("app.economy.thirdinvest");
				break;
			case "金融":
				$state.go("app.economy.thirdfisical");
				break;
			case "工业与新兴产业":
				$state.go("app.economy.thirdindustry");
				break;
		}
	}
	xService.h("cm", ["2", "1", "4", "3", "5"]);
	let headers = {
		
    };
	$rootScope.loading = true;
    qService.httpGetWithToken(kpiRes.blueMap, {}, headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
        	let t = data.data;
        	for (var i = t.length - 1; i >= 0; i--) {
        		if (t[i].id === "1") {
        			let a = [];
        			for (var j = t[i].categories.length - 1; j >= 0; j--) {
        				a.push(t[i].categories[j].id);
        				xService.s("economy", a);
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