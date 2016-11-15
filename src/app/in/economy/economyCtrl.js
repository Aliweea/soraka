export default($scope, $state, hService, xService, kpiRes, qService, $rootScope) => {
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
				$state.go("app.thirddetail.thirdfisical");
				break;
			case "工业与新兴产业":
				$state.go("app.thirddetail.thirdindustry");
				break;
		}
	}
	xService.h("cm", ["2", "1", "4", "3", "5"]);
	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6NzksImNyZWF0ZV90aW1lIjoiMjAxNS0wNy0wNSAxNTowNjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNTowNzowNiIsImFjY291bnQiOiJnYWowMSIsInBhc3N3b3JkIjpudWxsLCJ0aXRsZSI6IuWFrOWuieWxgCIsIm5hbWUiOiLlhazlronlsYAiLCJzeXN0ZW1OYW1lIjoi5YWs5a6J5bGAIiwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkRJUkVDVE9SIiwiZGVwYXJ0bWVudHMiOlt7IkBpZCI6IjIiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifV19LCJleHBpcmVzIjoxNDgwMTAxNzc1NTEyLCJncmFudGVkQXV0aHMiOlsiUk9MRV9ESVJFQ1RPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6ImdhajAxIiwicGFzc3dvcmQiOm51bGx9.oazO0vE7wp76MqfN+h9kmTZH1nPjU1ZEFDmW0tqqyWQ="
    };
	$rootScope.loading = false;
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