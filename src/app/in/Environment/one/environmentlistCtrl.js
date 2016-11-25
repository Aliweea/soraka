export default($scope, $rootScope, qService, kpiRes, $state, dateService, hService) => {
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

    let dateStr = dateService.formatDate(dateService.getSystemTime());
	let params = {
		"currentDate": dateStr,
		"categoryId": $state.params.categoryId
	}
	let headers = {
		
	};
	$rootScope.loading = true;
	qService.httpGetWithToken(kpiRes.categorykpi, params,headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
            $scope.cmRefuseData = data.data.data;
            $scope.deptname = $scope.cmRefuseData[0].department.name;
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
}