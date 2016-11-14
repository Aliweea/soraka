export default($scope, $rootScope,kpiDetailService, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#cmrefuse-s1').focus();
		$('#cmRefuseTownTooglePanel').hide(0);
		$('#cmRefuseTownToogleButton').click(() => {
			$('#cmRefuseTownTooglePanel').toggle(0);
		})
	}();

	$scope.tab1 = true;
    $scope.tab2 = false;
    $scope.show = function () {
        $scope.tab1 = true;
        $scope.tab2 = false;
    }
    $scope.show2 = function () {
        $scope.tab1 = false;
        $scope.tab2 = true;
    }

    var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');
	
	//chartData
	var passengerCapacityMonthData = [];
	var passengerCapacitySumChartData = [];
	$scope.passengerCapacityByKindList = [];
	var festivalPassengerCapacityBusList = [];
	var festivalPassengerCapacityLongDistanceBusList = [];
	var festivalData = [];
	var festivalPassengerCapacityBusList2 = [];
	var festivalPassengerCapacityLongDistanceBusList2 = [];
	var vehicleByKindYearList = [];
	$scope.vehicleByKindSumList = [];
	$scope.vehicleLastYearList = [];

	highchartsConfiguration();


	let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjExIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIxMiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjE1IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjE2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiIxNyIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjIwIiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIyMSIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIyMiIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjMiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn1dfSwiZXhwaXJlcyI6MTQ3OTg4MzMyOTUxNCwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.1yfx07Fa3M8CzqObBbUAGsEM5m+fi00aGs5J9NiiRac=";
	let headers = {
		"X-Auth-Token":token
	};
	let params = {
		tableName: "PsngrCapacityData"
	};
	
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var pcRecentTime = lastObj.applyTime;
			
			$scope.displayYear = new Date(pcRecentTime).getFullYear();
		
			var pcStartDate = dateService.formatDate(moment(pcRecentTime).startOf('year')); // alert(startDate);
			var pcEndDate =  dateService.formatDate(moment(pcRecentTime).endOf('month'));  // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "PsngrCapacityData",
				start: pcStartDate,
				end: pcEndDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				var data = JSOG.parse(JSOG.stringify(data.data));
				var busVolumeList = [];
				var taxiVolumeList = [];
				var longDistanceBusVolumeList = [];
				var applyMonth;
				for(var i=0; i<data.length; i++){
					var sum;
					if(data[i].busVolume==null&&data[i].taxiVolume==null&&data[i].longDistanceBusVolume==null)
						sum=null;
					else
						sum = data[i].busVolume+data[i].taxiVolume+data[i].longDistanceBusVolume;
					passengerCapacitySumChartData.push(sum);
					applyMonth = new Date(data[i].applyTime);
					passengerCapacityMonthData.push(applyMonth.getMonth()+1);
					
					busVolumeList.push(data[i].busVolume);
					taxiVolumeList.push(data[i].taxiVolume);
					longDistanceBusVolumeList.push(data[i].longDistanceBusVolume);
					
					if(i==data.length-1){
						var lastMonthSum = data[i].busVolume+data[i].taxiVolume+data[i].longDistanceBusVolume;
						//table data
						$scope.passengerCapacity = [
						                          	{ name : "公交车" ,  number : data[i].busVolume },
						                          	{ name : "出租车" ,  number : data[i].taxiVolume},
						                          	{ name : "长途班车" ,  number : data[i].longDistanceBusVolume },
						                          	{ name : "合计" ,  number : lastMonthSum }
						                          ];
					}
				}
				$scope.passengerCapacityLastMonth = passengerCapacityMonthData[data.length-1];
				$scope.passengerCapacityByKindList.push({
					name: "公交车",
					data: busVolumeList
					});
				$scope.passengerCapacityByKindList.push({
					name: "出租车",
					data: taxiVolumeList
					});
				$scope.passengerCapacityByKindList.push({
					name: "长途班车",
					data: longDistanceBusVolumeList
					});
				
				$scope.passengerCapacitySumChart.title.text = $scope.displayYear+'年各月客运总量情况';
				$scope.passengerCapacityByKindChart.title.text = $scope.displayYear+'年各月公交车客运量情况';
				$scope.passengerCapacitySelected = $scope.passengerCapacityByKindList[0].name;
				$scope.passengerCapacityByKindChart.series[0].name = $scope.passengerCapacityByKindList[0].name;
				$scope.passengerCapacityByKindChart.series[0].data = $scope.passengerCapacityByKindList[0].data;
			
				
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

    params = {
		tableName: "PsngrVehicleData"
	};
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var pvRecentTime = lastObj.applyTime;
			var pvStartOprtr = new Date(pvRecentTime);
			var pvStartDate = dateService.formatDate(moment(pvStartOprtr.setFullYear(pvStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var pvEndDate =  dateService.formatDate(moment(pvRecentTime).endOf('year')); // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "PsngrVehicleData",
				start: pvStartDate,
				end: pvEndDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				var data = JSOG.parse(JSOG.stringify(data.data));
				var busList = [];
				var taxiList = [];
				var longDistanceBusList = [];
				
				var newBusList = [];
				var newTaxiList = [];
				var newLongDistanceBusList = [];
				
				var notNewBusList = [];
				var notNewTaxiList = [];
				var notNewLongDistanceBusList = [];
				
				for(var i=0; i<data.length; i++){
					switch(data[i].vehicleType.id){
					case 6044://公交车
						{
						busList.push(data[i].vehicleSum);
						newBusList.push(data[i].newEnergyResourcesVehicleSum);
						notNewBusList.push(data[i].vehicleSum-data[i].newEnergyResourcesVehicleSum);
						}
						
						break;
					case 6045://出租车
						{
						taxiList.push(data[i].vehicleSum);
						newTaxiList.push(data[i].newEnergyResourcesVehicleSum);
						notNewTaxiList.push(data[i].vehicleSum-data[i].newEnergyResourcesVehicleSum);
						}
						
						break;
					case 6046://长途班车
						{
						longDistanceBusList.push(data[i].vehicleSum);
						newLongDistanceBusList.push(data[i].newEnergyResourcesVehicleSum);
						notNewLongDistanceBusList.push(data[i].vehicleSum-data[i].newEnergyResourcesVehicleSum);
						}
						
						break;
					}
				}
				$scope.vehicleByKindSumList.push({
					name: "公交车",
					sum: busList,
					newVehicle: newBusList,
					notNewVehicle: notNewBusList
				});
				$scope.vehicleByKindSumList.push({
					name: "出租车",
					sum: taxiList,
					newVehicle: newTaxiList,
					notNewVehicle: notNewTaxiList
				});
				$scope.vehicleByKindSumList.push({
					name: "长途班车",
					sum: longDistanceBusList,
					newVehicle: newLongDistanceBusList,
					notNewVehicle: notNewLongDistanceBusList
				});
				$scope.vehicleKindSelected = $scope.vehicleByKindSumList[0].name;
				$scope.newVehicleByKindAreaChart.series[0].data = $scope.vehicleByKindSumList[0].notNewVehicle;
				$scope.newVehicleByKindAreaChart.series[1].data = $scope.vehicleByKindSumList[0].newVehicle;
				var applyYear;
				for(var i=0; i<data.length/3; i++){
					applyYear = new Date(data[i*3].applyTime);
					vehicleByKindYearList.push(applyYear.getFullYear());
				}
				$scope.vehicleByKindColumnChart.series[0].name = $scope.vehicleByKindSumList[0].name;
				$scope.vehicleByKindColumnChart.series[0].data = $scope.vehicleByKindSumList[0].sum;
				$scope.vehicleByKindColumnChart.series[1].name = $scope.vehicleByKindSumList[1].name;
				$scope.vehicleByKindColumnChart.series[1].data = $scope.vehicleByKindSumList[1].sum;
				$scope.vehicleByKindColumnChart.series[2].name = $scope.vehicleByKindSumList[2].name;
				$scope.vehicleByKindColumnChart.series[2].data = $scope.vehicleByKindSumList[2].sum;
				
				$scope.vehicleLastYearList.push({
					name: '公交车',
					sum: busList[busList.length-1],
					newEnerge: newBusList[newBusList.length-1]
				});
				$scope.vehicleLastYearList.push({
					name: '出租车',
					sum: taxiList[taxiList.length-1],
					newEnerge: newTaxiList[newTaxiList.length-1]
				});
				$scope.vehicleLastYearList.push({
					name: '长途班车',
					sum: longDistanceBusList[longDistanceBusList.length-1],
					newEnerge: newLongDistanceBusList[newLongDistanceBusList.length-1]
				});
				$scope.vehicleYear = vehicleByKindYearList[vehicleByKindYearList.length-1];
			
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

    var thisYearFstvlPsngrCapacityProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		for(var i=0; i<data.length; i++){
			festivalPassengerCapacityBusList.push(data[i].busVolume);
			festivalPassengerCapacityLongDistanceBusList.push(data[i].longDistanceBusVolume);
		}
	}
	var fpcRecentTime = dateService.getSystemTime();
	var fpcStartOprtrThisYear = new Date(fpcRecentTime);
	var fpcStartDateThisYear = dateService.formatDate(moment(fpcStartOprtrThisYear).startOf('year')); //alert(fpcStartDateThisYear);
	var fpcEndDateThisYear =  dateService.formatDate(moment(fpcStartOprtrThisYear).endOf('year'));  //alert(fpcEndDateThisYear);
	kpiDetailService.query('FstvlPsngrCapacityData',fpcStartDateThisYear,fpcEndDateThisYear,thisYearFstvlPsngrCapacityProcessFunction);
	
	var lastYearFstvlPsngrCapacityProcessFunction = function(raw){
		var data = JSOG.parse(JSOG.stringify(raw.data));
		for(var i=0; i<data.length; i++){
			festivalPassengerCapacityBusList2.push(data[i].busVolume);
			festivalPassengerCapacityLongDistanceBusList2.push(data[i].longDistanceBusVolume);
			
			festivalData.push(data[i].festival.name);
		}
	}
	var fpcTimeOprtr = new Date(fpcRecentTime);
	var fpcLastYear = fpcTimeOprtr.setFullYear(fpcTimeOprtr.getFullYear()-1);
	var fpcStartDateLastYear = dateService.formatDate(moment(fpcLastYear).startOf('year'));  //alert(fpcStartDateLastYear);
	var fpcEndDateLastYear =  dateService.formatDate(moment(fpcLastYear).endOf('year'));   //alert(fpcEndDateLastYear);
	kpiDetailService.query('FstvlPsngrCapacityData',fpcStartDateLastYear,fpcEndDateLastYear,lastYearFstvlPsngrCapacityProcessFunction);
	

	//highcharts configuration
	function highchartsConfiguration(){
		$scope.passengerCapacitySumChart = {
				options:{
			        credits: {
						enabled: false
						},
			        xAxis: {
			            title: {
			                text: '月份'
			            },
			            categories: passengerCapacityMonthData,
			            tickmarkPlacement: 'on'
			        },
			        yAxis: {
			            title: {
			                text: '客运量 (人次)'
			            },
			            plotLines: [{
			                value: 0,
			                width: 1,
			                color: '#808080'
			            }],
			            labels: {
							formatter: function() {
								return this.value
							}
						}
			        },
			        tooltip: {
			            valueSuffix: '人次'
			        },
			        legend: {
			            enabled:false
			        }
				},
				title: {
		            text: '',
		            x: -20 //center
		        },
				series: [{
			            name: '客运量',
			            data: passengerCapacitySumChartData
			    }]
			};

		$scope.passengerCapacityByKindChart = {
				options:{
					credits: {
						enabled: false
						},
					chart: {
			            type: 'column'
			        },
			        xAxis: {
			        	title: {
			                text: '月份'
			            },
			            categories: passengerCapacityMonthData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '客运量(人次)'
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
			                '<td style="padding:0"><b>{point.y:.0f} 人次</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        legend: {                                                          
				            enabled: false                                                  
				        }, 
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
			        }
				},
				title: {                                                           
			            text: ''                    
			        }, 
				series: [{                                                         
			            name: '',                                             
			            data: []                                   
			    }] 
			};
		$scope.festivalPassengerBusCapacityChart = {
				options:{
					credits: {
						enabled: false
						},
					colors: columnColors,
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: '节假日公交车客运量情况'
			        },
			        xAxis: {
			            categories: festivalData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '客运量 (人次)'
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
			                '<td style="padding:0"><b>{point.y:.0f}人次</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
			        }
				},
				series: [{
		            name: '去年',
		            data: festivalPassengerCapacityBusList2

		        },{
		            name: '今年',
		            data: festivalPassengerCapacityBusList

		        }]
		};

		$scope.festivalPassengerLongDistanceBusCapacityChart = {
				options:{
					credits: {
						enabled: false
						},
					colors: columnColors,
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: '节假日长途班车客运量情况'
			        },
			        xAxis: {
			            categories: festivalData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '客运量 (人次)'
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
			                '<td style="padding:0"><b>{point.y:.0f}人次</b></td></tr>',
			            footerFormat: '</table>',
			            shared: true,
			            useHTML: true
			        },
			        plotOptions: {
			            column: {
			                pointPadding: 0.2,
			                borderWidth: 0
			            }
			        }
				},
				series: [{
		            name: '去年',
		            data: festivalPassengerCapacityLongDistanceBusList2

		        },{
		            name: '今年',
		            data: festivalPassengerCapacityLongDistanceBusList

		        }]
		};

		$scope.vehicleByKindColumnChart = {
				options:{
					colors: columnColors,
					credits: {
						enabled: false
						},
					chart: {
			            type: 'column'
			        },
			        title: {
			            text: '近五年客运车辆情况'
			        },
			        xAxis: {
			        	title: {
			                text: '年份'
			            },
			            categories: vehicleByKindYearList
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '车辆数（辆）'
			            },
			            stackLabels: {
			                enabled: true,
			                style: {
			                    fontWeight: 'bold',
			                    color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
			                }
			            }
			        },
			        tooltip: {
			            formatter: function() {
			                return '<b>'+ this.x +'</b><br/>'+
			                    this.series.name +': '+ this.y +'辆<br/>'+
			                    '合计: '+ this.point.stackTotal+'辆';
			            }
			        },
			        plotOptions: {
			            column: {
			                stacking: 'normal',
			                dataLabels: {
			                    enabled: false,
			                    color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white'
			                }
			            }
			        }
				},
				series:[{
					name: '',
					data: []
				},{
					name: '',
					data: []
				},{
					name: '',
					data: []
				}] 
		};

		$scope.newVehicleByKindAreaChart = {
				options:{
					colors:columnColors,
					credits: {
						enabled: false
						},
					chart: {
			            type: 'area'
			        },
			        xAxis: {
			            categories: vehicleByKindYearList
		,
			            tickmarkPlacement: 'on',
			            title: {
				                text: '年份'
				            }
			        },
			        yAxis: {
			            title: {
			                text: '新(清洁)能源车占比(%)'
			            }
			        },
			        tooltip: {
			            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.2f}%</b> ({point.y:,.0f}辆)<br/>',
			            shared: true
			        },
			        plotOptions: {
			            area: {
			                stacking: 'percent',
			                lineColor: '#ffffff',
			                lineWidth: 1,
			                marker: {
			                    lineWidth: 1,
			                    lineColor: '#ffffff'
			                }
			            }
			        }
				},
		        title: {
		            text: '近五年公交车中新(清洁)能源车占比情况'
		        },
		        series: [{
		            name: '非新(清洁)能源车',
		            data: []
		        },{
		            name: '新(清洁)能源车',
		            data: []
		        }]
		};
	}

	//radio点击事件
	$scope.passengerCapacityKindChange = function(passengerCapacityOne){
			
		$scope.passengerCapacityByKindChart.title.text = $scope.displayYear+'年各月'+passengerCapacityOne.name+'客运量情况';
		$scope.passengerCapacityByKindChart.series[0].name = passengerCapacityOne.name;
		$scope.passengerCapacityByKindChart.series[0].data = passengerCapacityOne.data;
	};

	$scope.vehicleKindChange = function(vehicleOne){
		$scope.newVehicleByKindAreaChart.title.text = "近五年"+vehicleOne.name+"中新(清洁)能源车占比情况";
		$scope.newVehicleByKindAreaChart.series[0].data = vehicleOne.notNewVehicle;
		$scope.newVehicleByKindAreaChart.series[1].data = vehicleOne.newVehicle;
	};	
};