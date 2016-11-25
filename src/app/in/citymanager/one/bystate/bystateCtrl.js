export default($scope, $rootScope, $stateParams, qService, kpiRes, dateService, hService, $state) => {
	'ngInject';
    hService.state($state);
    $scope.registerHistory = () => {
        hService.register($state); // 向下级跳转则将当前位置计入历史记录
    }

    const jQueryDOMToDos = () => {
        $(".navTopShowMark").show(0); // 显示 KPI状态KPI分类
        $(".navbar2return").show(0); // 显示 返回

        $(".navbar3position").hide(0); // 隐藏 当前三级界面位置
        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
    }();
    
	let categoryId = $stateParams.categoryId;
	let state = $stateParams.state;
	let dateStr = dateService.formatDate(dateService.getSystemTime());
	let params = {
		"currentDate": dateStr,
		"categoryId": categoryId
	}
	let headers = {
    };
    $rootScope.loading = true;
	qService.httpGetWithToken(kpiRes.categorykpi, params,headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
            let rawData = data.data.data;
            $scope.deptname = rawData[0].department.name;
            let filtedData = [];
            for (var i = 0; i < rawData.length; i++) {
                if (state === "ALL") {
                    filtedData.push(rawData[i]);
                    continue;
                }
            	if (rawData[i].data.status == state) {
            		filtedData.push(rawData[i]);
            	}
            }
            $scope.items = filtedData;
        } else {

        }
    }, (err) => {
        if (err.errorCode == "UNAUTHORIZED") {
            $state.go('portal');
        } else {
        }
    }).finally(() => {
        $rootScope.loading = false;
    });
};