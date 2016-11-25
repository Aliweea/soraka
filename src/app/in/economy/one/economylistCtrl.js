export default($scope, qService, kpiRes, $state, dateService, hService) => {
	'ngInject';
	hService.state($state);
	$scope.registerHistory = () => {
        hService.register($state); // 向下级跳转则将当前位置计入历史记录
    }
    
	$(".navbar2return").show(0); // 隐藏返回按钮 
    $(".navbar2detail").hide(0); 
	$(".navTopShowMark").show(0); // 显示KPI状态 KPI分类

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