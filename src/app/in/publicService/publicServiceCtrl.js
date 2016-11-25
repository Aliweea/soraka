export default($scope, $state, hService, qService, xService, kpiRes, $rootScope) => {
	'ngInject';
	$scope.title = "公共事业";

	const jQueryDOMToDos = () =>{
		$('.navTopShowhealthcare').hide(0);
		$('.navTopShowtraffic').hide(0);
	}();
	$scope.changeHealthCareTitle = (title = "医疗卫生资源") => {
		$scope.healthcare = {
			title:title
		};
	}
	$scope.changeHealthCareTitle();
	$scope.changeTrafficTitle = (title = "旅客运输") => {
		$scope.traffic = {
			title:title
		};
	}
	$scope.changeTrafficTitle();
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
		$state.go("app.publicService.bystate",paramObj);
	}

	// 用于底部bar的当前位置
	const initPosition = () => {
		switch($state.params.categoryId) {
			case "6001": $scope.currentCategoryName = "教育"; break;
			case "6004": $scope.currentCategoryName = "医疗卫生"; break;
			case "6003": $scope.currentCategoryName = "交通"; break;
			case "6002": $scope.currentCategoryName = "电信"; break;
		}
	}();
	$scope.changeCategory = (name) => {
		$scope.currentCategoryName = name;
	}

	$scope.toDetail = () => {
	    hService.register($state); // 向下级跳转则将当前位置计入历史记录
		switch($scope.currentCategoryName) {	
			case "教育":
				$state.go("app.publicService.eduGuarantee");
				break;
			case "医疗卫生":
				$state.go("app.publicService.hlthRscSvc");
				break;
			case "电信":
				$state.go("app.publicService.ptelecom");
				break;
			case "交通":
				$state.go("app.publicService.psngrTransportation");
				break;

		}
	}
	xService.h("publicService", ["6001", "6004", "6003", "6002"]);
	let headers = {
		
    };
	$rootScope.loading = false;
    qService.httpGetWithToken(kpiRes.blueMap, {}, headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
        	let t = data.data;
        	for (var i = t.length - 1; i >= 0; i--) {
        		if (t[i].id === "6") {
        			let a = [];
        			for (var j = t[i].categories.length - 1; j >= 0; j--) {
        				a.push(t[i].categories[j].id);
        				xService.s("publicService", a);
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