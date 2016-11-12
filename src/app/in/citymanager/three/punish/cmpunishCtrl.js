export default($scope, $state) => {
	'ngInject';
	
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#showshort').focus(); // 获取默认焦点
	}();

	qService.httpPost(dataDetailFactory.lastestObject, {
		tableName: $scope.dataMap[mapKey].tableName
	}, {"X-Auth-Token":token},['year', 'month']).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			// 画图
		} else {}
	}, (err) => {
		if (err.errorCode == "UNAUTHORIZED") {
			$state.go('portal');
		} else {}
	});		
};