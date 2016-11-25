export default($scope, $rootScope, $stateParams, qService, dService, kpiRes, dateService, kpiSpanRes) => {
	'ngInject';
	$(".navbar2return").show(0); // 显示返回按钮
	$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
	$('#showshort').focus(); // 获取默认焦点
	$(".navTopShowPopulation").hide(0);
    $('.navTopShowInsurance').hide(0);
    $(".insurance2detail").show(0);

	let kpiId = $stateParams.kpiId;
    let dateStr = dateService.formatDate(dateService.getSystemTime());
	let headers = {
		
	};
	//赵成冬加的
	$scope.lv=kpiId;
	/**
	* 模块执行入口
	* 根据数据的时间粒度设置当前kpi界面的前置数据
	*/
	const cmConfig = () => {
		$rootScope.loading = true;
		qService.httpGetWithToken(kpiRes.singlekpi, {
			"currentDate": dateStr,
			"kpiId": kpiId
		},headers).then((data) => {
	        if (data.errorCode == "NO_ERROR") {
	            let kpiData = data.data;
	            // 配置成功后调用main()方法
				main(dService.config(kpiData));
	        } else {}
	    }, (err) => {
	        if (err.errorCode == "UNAUTHORIZED") {
	            $state.go('portal');
	        } else {}
	    }).finally(() => {
		    $rootScope.loading = false;
		});
	}();
	
	const main = (config) => {
		// 配置界面显示用
		$scope.config = config;
		// 短走势
		$scope.shortShow = () => {
			qService.httpGetWithToken(kpiSpanRes.spankpi,{
				'kpiID': kpiId,
				'start': config.startShortStr,
				'end'  : config.endStr
			}, headers).then((data) => {
		        if (data.errorCode == "NO_ERROR") {
		        	// 画图
		            $scope.cmChart= dService.chart(config, data, 'short');
		        } else {

		        }
		    }, (err) => {
		        if (err.errorCode == "UNAUTHORIZED") {
		            $state.go('portal');
		        } else {

		        }
		    });		
		};
		// 长走势
		$scope.longShow = () => {
			qService.httpGetWithToken(kpiSpanRes.spankpi,{
				'kpiID': kpiId,
				'start': config.startLongStr,
				'end'  : config.endStr
			}, headers).then((data) => {
		        if (data.errorCode == "NO_ERROR") {
		            $scope.cmChart= dService.chart(config, data, 'long');
		        } else {}
		    }, (err) => {
		        if (err.errorCode == "UNAUTHORIZED") {
		            $state.go('portal');
		        } else {}
		    });		
		}
		$scope.shortShow();
	}
};