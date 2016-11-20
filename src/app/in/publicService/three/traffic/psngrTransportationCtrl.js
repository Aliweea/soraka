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
	var pcRecentTime;
	var pvRecentTime;
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

	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMS0xNSAxODowODo1OCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjQiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiNSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI2IiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiI3IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiI4IiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiI5IiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMCIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjIwIiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn1dfSwiZXhwaXJlcyI6MTQ4MDE0NjA5NTczMiwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.FGoM5cgKKtIX3azkquWK9GBo+wFpcgnTFJCKvxiP6eU="
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
			pcRecentTime = lastObj.applyTime;
			$scope.displayYear = new Date(pcRecentTime).getFullYear();
			console.log($scope.displayYear);
			var pcStartDate = dateService.formatDate(moment(pcRecentTime).startOf('year')); // alert(startDate);
			var pcEndDate =  dateService.formatDate(moment(pcRecentTime).endOf('month'));  // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "PsngrCapacityData",
				start: pcStartDate,
				end: pcEndDate
			}
			let currentType = "passenger"; // 标记当前处于车次还是吨数状态
			$scope.table1 = true;
			$scope.currentName = "公交车";
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
				$scope.changeChoice = (choice) => {
					$('#psTrafficTogglePanel').hide(0);
					if(currentType == "passenger"){
						$scope.passengerCapacityKindChange(choice);
						$scope.listLastYearTitle = $scope.userListLastYearTitle;
						$scope.listLastYearSelected = $scope.userListLastYearSelected;
						$scope.union = "人";
					}else if(currentType == "vehicle"){
						$scope.vehicleKindChange(choice);
						$scope.listLastYearTitle = $scope.infrstrctTotalLastYearTitle;
						$scope.listLastYearSelected = $scope.infrstrctListLastYearSelected;
						$scope.union = $scope.infrstrctTotalLastYearUnion;
					}
				};
				$scope.changeChart = (type) => {
					console.log(type);
					switch (type) {
						case "passenger":						
							$scope.kindList = $scope.passengerCapacityByKindList;
							$scope.kindSelected = $scope.passengerCapacitySelected;
							$scope.chart1 = $scope.passengerCapacitySumChart;
							$scope.chart2 = $scope.passengerCapacityByKindChart;
							$scope.tableTitle = $scope.displayYear+"年"+ $scope.passengerCapacityLastMonth+"月全市客运量分布情况";
							$scope.list = $scope.passengerCapacity;
							$scope.union = "人次";
							$('#cmtraffic-s1').addClass('activeTab');
							$('#cmtraffic-s2').removeClass('activeTab');
							currentType = "passenger";
							$scope.table1 = true;
							break;
						case "vehicle":							
							$scope.kindList = $scope.vehicleByKindSumList;
							$scope.kindSelected = $scope.vehicleKindSelected;
							$scope.chart1 = $scope.vehicleByKindColumnChart;
							$scope.chart2 = $scope.newVehicleByKindAreaChart;
							$scope.tableTitle = $scope.vehicleYear+"年全市客运车辆分布情况";
							$scope.list = $scope.vehicleLastYearList;
							$scope.union = "辆";
							$('#cmtraffic-s2').addClass('activeTab');
							$('#cmtraffic-s1').removeClass('activeTab');
							currentType = "vehicle";
							$scope.table1 = false;
							break;
					}
				};
				$scope.changeChart(currentType);
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
			pvRecentTime = lastObj.applyTime;
			var pvStartOprtr = new Date(pvRecentTime);
			var pvStartDate = dateService.formatDate(moment(pvStartOprtr.setFullYear(pvStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var pvEndDate =  dateService.formatDate(moment(pvRecentTime).endOf('year')); // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "PsngrVehicleData",
				start: pvStartDate,
				end: pvEndDate
			}
			// let currentType = "passenger"; // 标记当前处于车次还是吨数状态
			// $scope.currentName = "公交车";
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

    function highchartsConfiguration(){
		$scope.passengerCapacitySumChart = {
				options:{
			        credits: {
						enabled: false
						},
					exporting: {
						enabled: false, // 取消打印menu
					},
			        xAxis: {
			        	tickInterval: 1,
			            title: {
			                text: '月份'
			            },
			            categories: passengerCapacityMonthData,
			            tickmarkPlacement: 'on',
			            labels: {
		                    rotation: -45,
		                    align: 'right',
		                    step: 1,
		                    style: {
								fontSize: "10px"
							}
		                }
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
		            style: {
						fontSize: "15px",
						fontStyle:"宋体"
					}
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
					exporting: {
						enabled: false, // 取消打印menu
					},
					chart: {
			            type: 'column'
			        },
			        xAxis: {
			        	title: {
			                text: '月份'
			            },
			            categories: passengerCapacityMonthData,
			            tickInterval: 1,
			            tickmarkPlacement: 'on',
		                labels: {
		                    rotation: -45,
		                    align: 'right',
		                    step: 1,
		                    style: {
								fontSize: "10px"
							}
		                }
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
			            text: '' ,
			            style: {
							fontSize: "15px",
							fontStyle:"宋体"
						}                   
			    }, 
				series: [{                                                         
			            name: '',                                             
			            data: []                                   
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
			        exporting: {
						enabled: false, // 取消打印menu
					},
			        title: {
			            text: '近五年客运车辆情况',
			            style: {
							fontSize: "15px",
							fontStyle:"宋体"
						}
			        },
			        xAxis: {
			        	title: {
			                text: '年份'
			            },
			            categories: vehicleByKindYearList,
			            tickInterval: 1,
			            tickmarkPlacement: 'on',
		                labels: {
		                    rotation: -45,
		                    align: 'right',
		                    step: 1,
		                    style: {
								fontSize: "10px"
							}
		                }
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
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        xAxis: {
		            categories: vehicleByKindYearList,
		            title: {
			                text: '年份'
			        },
			        tickmarkPlacement: 'on',
	                labels: {
	                    rotation: -45,
	                    align: 'right',
	                    step: 1,
	                    style: {
							fontSize: "10px"
						}
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
	            text: '近五年公交车中新(清洁)能源车占比情况',
	            style: {
					fontSize: "15px",
					fontStyle:"宋体"
				}
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