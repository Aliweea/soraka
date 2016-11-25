export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$(".navTopShowtraffic").show(0); 
		$('#cmrefuse-s1').focus();
		$('#psTrafficTogglePanel').hide(0);
		$('#psTrafficToggleButton').click(() => {
			$('#psTrafficTogglePanel').toggle(0);
		})
	}();
	
	let headers = {
		
    };
    var recentTime;
    $scope.driverTrainLastMonth = [];
	$scope.driverTrainMsgLastMonthList = [];
	$scope.driverTrainList = [];
	var monthData = [];
	let params = {
		tableName: "DriveTrainData"
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
			var startDate = dateService.formatDate(moment(recentTime).startOf('year')); // alert(startDate);
			var endDate =  dateService.formatDate(moment(recentTime).endOf('month'));  // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "DriveTrainData",
				start: startDate,
				end: endDate
			}
			$scope.currentName = "公交车";
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {		
				var data = JSOG.parse(JSOG.stringify(data.data));
				
				var newDriverNumList = [];
				var coachNumList = [];
				var coachCarNumList = [];
				var prcntgList = [];
				
				var applyDate;
				
				$scope.displayYear = new Date(data[data.length-1].applyTime).getFullYear();
				
				for(var i=0; i<data.length; i++){
					newDriverNumList.push(parseInt(data[i].newDriverNum));
					coachNumList.push(parseInt(data[i].coachNum));
					coachCarNumList.push(parseInt(data[i].coachCarNum));
					prcntgList.push(parseFloat(data[i].prcntgOfNewEnrgyRsrcsCoachCar));
					applyDate = new Date(data[i].applyTime);
					//alert(applyDate.getMonth());
					monthData.push(applyDate.getMonth()+1);
				}
				
				$scope.driverTrainMsgLastMonthList.push({
					name: '毕业学员数',
					number: newDriverNumList[data.length-1]+"人"
				});
				$scope.driverTrainMsgLastMonthList.push({
					name: '教练员数',
					number: coachNumList[data.length-1]+"人"
				});
				$scope.driverTrainMsgLastMonthList.push({
					name: '教练车数',
					number: coachCarNumList[data.length-1]+"辆"
				});
				$scope.driverTrainMsgLastMonthList.push({
					name: '新(清洁)能源车占比',
					number: prcntgList[data.length-1]+"%"
				});
				$scope.driverTrainLastMonth = monthData[data.length-1];
				
				$scope.driverTrainList.push({
					name: '毕业学员数',
					data: newDriverNumList
				});
				$scope.driverTrainList.push({
					name: '教练员数',
					data: coachNumList
				});
				$scope.driverTrainList.push({
					name: '教练车数',
					data: coachCarNumList
				});
				$scope.driverTrainList.push({
					name: '教练车中新(清洁)能源车占比',
					data: prcntgList
				});
				
				$scope.driverTrainKindSelected = $scope.driverTrainList[0].name;
				$scope.driverTrainKindColumnChart.series[0].data = $scope.driverTrainList[0].data;
				$scope.driverTrainKindColumnChart.series[0].name = $scope.driverTrainList[0].name;
				$scope.driverTrainKindColumnChart.title.text = $scope.displayYear+"年各月份毕业学员数情况";
			
	
				$scope.changeChoice = (choice) => {
					$('#psTrafficTogglePanel').hide(0);
					$scope.driverTrainKindChange(choice);
				};
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
    $scope.driverTrainKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        xAxis: {
		            title: {
			                text: '月份'
			            },
		            categories: monthData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '毕业学员数 (人)'
		            },
		            labels: {
						formatter: function() {
							return this.value
						}
					}
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.0f}人</b></td></tr>',
		            footerFormat: '</table>',
		            shared: true,
		            useHTML: true
		        },
		        plotOptions: {
		            column: {
		                pointPadding: 0.2,
		                borderWidth: 0
		            }
		        },
		        legend: {                                                          
		            enabled: false                                                  
		        }
			},
	        title: {
	            text: '',
	            style: {
					fontSize: "13px"
				}
	        },
			series: [{
		            name: '',
		            data: []
		    }]
	};
	//redio 点击事件()
	$scope.driverTrainKindChange = function(driverTrainOne){
		$scope.driverTrainKindColumnChart.title.text = $scope.displayYear+"年各月份"+driverTrainOne.name+"情况";
		$scope.driverTrainKindColumnChart.series[0].name = driverTrainOne.name;
		$scope.driverTrainKindColumnChart.series[0].data = driverTrainOne.data;
		
		switch(driverTrainOne.name.trim()){
		case '毕业学员数':
			{
			$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(人)";
			$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}人</b></td></tr>';
			}
			
			break;
		case '教练员数':
			{
			$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(人)";
			$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}人</b></td></tr>';
			}
			
			break;
		case '教练车数':
			{
			$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(辆)";
			$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}辆</b></td></tr>';
			}
			
			break;
		case '教练车中新(清洁)能源车占比':
			{
			$scope.driverTrainKindColumnChart.options.yAxis.title.text = driverTrainOne.name+"(%)";
			$scope.driverTrainKindColumnChart.options.tooltip.pointFormat = '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
            '<td style="padding:0"><b>{point.y:.0f}%</b></td></tr>';
			}
			
			break;
		}	
	};
	
};