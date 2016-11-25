export default($scope, $state, hService, qService, xService, kpiRes, $rootScope) => {
	'ngInject';
	$scope.title = "民生";

	const jQueryDOMToDos = () => {
		$('.navTopShowPopulation').hide(0);
	    $('.navTopShowInsurance').hide(0);
	    $(".insurance-return").hide(0);
        $(".insurance2detail").hide(0);
	}();
	$scope.changeTitle = (title = "人口结构图") => {
		$scope.populationStructure = {
			title: title
		};
	}
	$scope.changeTitle();


    //社会保险部分
	$scope.insuranceTitle = "城镇基本养老保险";
  	$scope.changeInsuranceTitle = (name) => {
		$scope.insuranceTitle = name;
	};
	$scope.changeInsuranceTitle("城镇基本养老保险");

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
		$state.go("app.livehood.bystate",paramObj);
	}
	// 用于底部bar的当前位置
	const initPosition = () => {
		switch($state.params.categoryId) {
			case "2003": $scope.currentCategoryName = "人口结构"; break;
			case "2004": $scope.currentCategoryName = "社会保险"; break;
			case "2001": $scope.currentCategoryName = "价格指数"; break;
		}
	}();
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
		hService.register($state); // 向下级跳转则将当前位置计入历史记录=
		switch($scope.currentCategoryName) {
			case "人口结构":
				$state.go("app.livehood.PopulationStructure");
				break;
			case "社会保险":
				$state.go("app.livehood.UrbanBasicEndowmentInsuranceData");
				break;
			case "价格指数":
				$state.go("app.pricehome.citizen");
				break;
		}
	}
	xService.h("livehood", ["2003", "2004", "2001"]);
	let headers = {
    };
	$rootScope.loading = false;
    qService.httpGetWithToken(kpiRes.blueMap, {}, headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
        	let t = data.data;
        	for (var i = t.length - 1; i >= 0; i--) {
        		if (t[i].id === "3") {
        			let a = [];
        			for (var j = t[i].categories.length - 1; j >= 0; j--) {
        				a.push(t[i].categories[j].id);
        				xService.s("livehood", a);
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