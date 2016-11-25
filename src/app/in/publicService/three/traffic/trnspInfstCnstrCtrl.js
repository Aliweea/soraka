export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowtraffic").show(0); 
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#cmrefuse-s1').focus();
		$('#psTrafficTogglePanel').hide(0);
		$('#psTrafficToggleButton').click(() => {
			$('#psTrafficTogglePanel').toggle(0);
		})
	}();
	var recentTime;
	$scope.projectsUnderConstructionList=[];
	$scope.completedProjectList = [];
	let headers = {
		
    };
	let params = {
		tableName: "TrnspPrjctPrgrsData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPostWithToken(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			recentTime = lastObj.applyTime;
			$scope.displayYear = new Date(recentTime).getFullYear();
			var startDate = dateService.formatDate(moment(recentTime).startOf('month')); // alert(startDate);
			var endDate =  dateService.formatDate(moment(recentTime).endOf('month'));  // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "TrnspPrjctPrgrsData",
				start: startDate,
				end: endDate
			}
			$scope.table1 = true;
			$scope.currentName = "公交车";
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				var data = JSOG.parse(JSOG.stringify(data.data));
				var applyDate = new Date(data[data.length-1].applyTime);
				var finalMonth = applyDate.getMonth()+1;
				$scope.displayMonth = finalMonth;
				var finalList = [];
				var month;
				for(var i=0; i<data.length; i++){
					//var aa = new Date(data[i].applyTime);
				    month = new Date(data[i].applyTime).getMonth()+1;
					if(month==finalMonth){
						finalList.push(data[i]);
					}
				}
				for(var j=0; j<finalList.length; j++){
					if(!finalList[j].completedOrNot){
						$scope.projectsUnderConstructionList.push({
							prjctName : finalList[j].projectName, 
		        			year: finalList[j].project.year,
		        			month: finalList[j].project.month,
		        			cntrctPrice: finalList[j].project.cntrctPrice.toFixed(2),
		        			prjctcost: finalList[j].addUpCost.toFixed(2),
		        			progressPercentage : (finalList[j].addUpCost/finalList[j].project.cntrctPrice*100).toFixed(2)
						});
					}
				}
				$scope.underConstructionProjectSelected = $scope.projectsUnderConstructionList[0];	

			}, (err) => {
				if (err.errorCode == "UNAUTHORIZED") {
					$state.go('portal');
				} else {}
			}).finally(() => {
		        $rootScope.loading = false;
		    });	
		    params = {
				tableName: "TrnspPrjctPrgrsData",
				start: '2008-01-01',
				end: endDate
			}
		    qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				var data = JSOG.parse(JSOG.stringify(data.data));
				for(var i=data.length-1; i>=0; i--){
					var startTime;
					var endTime;
					if(data[i].completedOrNot){
						if(data[i].project.year==null)
							startTime = '无记录';
						else if(data[i].project.month==null)
							startTime = data[i].project.year+'年';
						else 
							startTime = data[i].project.year+'年'+data[i].project.month+'月';
						
						var endYear = new Date(data[i].applyTime).getFullYear();
						var endMonth = new Date(data[i].applyTime).getMonth()+1;
							
						$scope.completedProjectList.push({
							prjctName : data[i].projectName, 
							startTime: startTime,
		           	        year: endYear,
		           	        month: endMonth,
		           	        cntrctPrice: data[i].project.cntrctPrice.toFixed(2),
		           	        addUpCost: data[i].addUpCost.toFixed(2), 
		           	        remark: data[i].remark
						}); 
					}
				}
				$scope.completedProjectSelected = $scope.completedProjectList[0];	
			}, (err) => {
				if (err.errorCode == "UNAUTHORIZED") {
					$state.go('portal');
				} else {}
			}).finally(() => {
		        $rootScope.loading = false;
		    });	
		} else {}
	}, (err) => {
		if (err.errorCode == "UNAUTHORIZED") {
			$state.go('portal');
		} else {}
	}).finally(() => {
        $rootScope.loading = false;
    });	
    $scope.projectsDetails = function(underConstructionProject){
		$scope.underConstructionProjectSelected = underConstructionProject;
	};	
	$scope.projectsDetails2 = function(completedProject){
		$scope.completedProjectSelected = completedProject;
	};	
};