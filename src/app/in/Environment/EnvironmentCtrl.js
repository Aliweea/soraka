export default($scope, $state, hService, qService, xService, kpiRes, $rootScope) => {
	'ngInject';
	$scope.title = "资源环境";
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
	xService.h("environment", ["4001", "4002", "4004", "5001"]);
	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6NzksImNyZWF0ZV90aW1lIjoiMjAxNS0wNy0wNSAxNTowNjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNTowNzowNiIsImFjY291bnQiOiJnYWowMSIsInBhc3N3b3JkIjpudWxsLCJ0aXRsZSI6IuWFrOWuieWxgCIsIm5hbWUiOiLlhazlronlsYAiLCJzeXN0ZW1OYW1lIjoi5YWs5a6J5bGAIiwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkRJUkVDVE9SIiwiZGVwYXJ0bWVudHMiOlt7IkBpZCI6IjIiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifV19LCJleHBpcmVzIjoxNDgwMTAxNzc1NTEyLCJncmFudGVkQXV0aHMiOlsiUk9MRV9ESVJFQ1RPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6ImdhajAxIiwicGFzc3dvcmQiOm51bGx9.oazO0vE7wp76MqfN+h9kmTZH1nPjU1ZEFDmW0tqqyWQ="
    };
	$rootScope.loading = false;
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