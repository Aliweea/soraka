export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
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

    var medicalInstitutionSumChartData = [];
	var sickBedsNumList = [];
	var medicalInstitutionsLastYearData=[];
	var medicalServiceColumnChartData=[];
	var medicalServiceColumnChartData1=[];
	var medicalServiceColumnChartData2=[];
	var medicalServiceKind=["门诊","急诊","住院","120急救"];
	var monthData=[];
	$scope.medicalServicePatientsByKindList=[];
	$scope.medicalInstitutionByKindSumList=[];
	var medicalWorkersPieChartData = [];
	var medicalWorkersYearData = [];
	$scope.medicalWorkersYearsList = [];
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15');
	
	
	let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjExIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIxMiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjE1IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjE2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiIxNyIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjIwIiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIyMSIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIyMiIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjMiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn1dfSwiZXhwaXJlcyI6MTQ3OTg4MzMyOTUxNCwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.1yfx07Fa3M8CzqObBbUAGsEM5m+fi00aGs5J9NiiRac=";
	let headers = {
		"X-Auth-Token":token
	};
	let params = {
		tableName: "HealthServiceData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var svcRecentTime = lastObj.applyTime;
			
			$scope.displayYear = new Date(svcRecentTime).getFullYear();
		
			var svcStartDate = dateService.formatDate(moment(svcRecentTime).startOf('year')); // alert(startDate);
			var svcEndDate =  dateService.formatDate(moment(svcRecentTime).endOf('month'));  // alert(endDate);
			let params = {
				tableName: "HealthServiceData",
				start: svcStartDate,
				end: svcEndDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {	
				var data = JSOG.parse(JSOG.stringify(data.data));
				var outpatientNumList = [];
				var inpatientNumList = [];
				var emrgncyPatientNumList = [];
				var firstAid120List = [];
				
				var applyMonth;
				
				for(var i=0; i<data.length; i++){
					outpatientNumList.push(data[i].outpatientNum);
					inpatientNumList.push(data[i].inpatientNum);
					emrgncyPatientNumList.push(data[i].emrgncyPatientNum);
					firstAid120List.push(data[i].firstAid120);
					applyMonth = new Date(data[i].applyTime);
					monthData.push(applyMonth.getMonth()+1);
				}
				$scope.medicalServicePatientsByKindList.push({
					name: medicalServiceKind[0],
					data: outpatientNumList
					});
				$scope.medicalServicePatientsByKindList.push({
					name: medicalServiceKind[1],
					data: emrgncyPatientNumList
					});
				$scope.medicalServicePatientsByKindList.push({
					name: medicalServiceKind[2],
					data: inpatientNumList
					});
				$scope.medicalServicePatientsByKindList.push({
					name: medicalServiceKind[3],
					data: firstAid120List
					});
				$scope.medicalServiceSelected = $scope.medicalServicePatientsByKindList[0].name;
				$scope.medicalServiceColumnChart1.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月全市门诊及急诊情况";
				$scope.medicalServiceColumnChart2.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月全市住院及120急救情况";
				$scope.medicalServiceByKindLineChart.title.text = $scope.displayYear+'年全市门诊服务情况';
				$scope.displayMonth = monthData[data.length-1];
				medicalServiceColumnChartData.push(outpatientNumList[data.length-1]);
				medicalServiceColumnChartData.push(emrgncyPatientNumList[data.length-1]);
				medicalServiceColumnChartData.push(inpatientNumList[data.length-1]);
				medicalServiceColumnChartData.push(firstAid120List[data.length-1]);
				$scope.medicalServiceByKindLineChart.series[0].name = $scope.medicalServicePatientsByKindList[0].name;
			    $scope.medicalServiceByKindLineChart.series[0].data = $scope.medicalServicePatientsByKindList[0].data;
			    medicalServiceColumnChartData1.push(medicalServiceColumnChartData[0]);
			    medicalServiceColumnChartData1.push(medicalServiceColumnChartData[1]);
			    medicalServiceColumnChartData2.push(medicalServiceColumnChartData[2]);
			    medicalServiceColumnChartData2.push(medicalServiceColumnChartData[3]);
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
		tableName: "MedicalAdminData"
	};
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var maRecentTime = lastObj.applyTime;
			
			var maStartOprtr = new Date(maRecentTime);
			var maStartDate = dateService.formatDate(moment(maStartOprtr.setFullYear(maStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var maEndDate =  dateService.formatDate(moment(maRecentTime).endOf('year')); // alert(endDate);
			
			let params = {
				tableName: "MedicalAdminData",
				start: maStartDate,
				end: maEndDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {	
				var data = JSOG.parse(JSOG.stringify(data.data));
				var thrdLvlHsptlNumList = [];
				var scndLvlHsptlNumList = [];
				var prmryHsptlNumList = [];
				var prvtHsptlNumList = [];
				var applyYear ;
				for(var i=0; i<data.length; i++){
					var sum;
					if(data[i].thrdLvlHsptlNum==null&&data[i].scndLvlHsptlNum==null&&data[i].prmryHsptlNum==null&&data[i].prvtHsptlNum==null)
						sum=null;
					else
						sum = data[i].thrdLvlHsptlNum+data[i].scndLvlHsptlNum+data[i].prmryHsptlNum+data[i].prvtHsptlNum;
					medicalInstitutionSumChartData.push(sum);
					
					thrdLvlHsptlNumList.push(data[i].thrdLvlHsptlNum);
					scndLvlHsptlNumList.push(data[i].scndLvlHsptlNum);
					prmryHsptlNumList.push(data[i].prmryHsptlNum);
					prvtHsptlNumList.push(data[i].prvtHsptlNum);
					sickBedsNumList.push(data[i].sickBedsNum);
					
					applyYear = new Date(data[i].applyTime);
					medicalInstitutionsLastYearData.push(applyYear.getFullYear());
					
					if(i==data.length-1){
						var lastYearSum = data[i].thrdLvlHsptlNum+data[i].scndLvlHsptlNum+data[i].prmryHsptlNum+data[i].prvtHsptlNum;
						//table data
						$scope.medicalInstitutions = [
						                          	{ name : "三级医院" ,  number : data[i].thrdLvlHsptlNum },
						                          	{ name : "二级医院" ,  number : data[i].scndLvlHsptlNum },
						                          	{ name : "基层医院" ,  number : data[i].prmryHsptlNum },
						                          	{ name : "民营医院(门诊部)" ,  number : data[i].prvtHsptlNum },
						                          	{ name : "合计" ,  number : lastYearSum }
						                          ];
					}
				}
				$scope.medicalInstitutionsLastYear = medicalInstitutionsLastYearData[data.length-1];
				$scope.medicalInstitutionByKindSumList.push({
					name: "三级医院",
					data: thrdLvlHsptlNumList
					});
				$scope.medicalInstitutionByKindSumList.push({
					name: "二级医院",
					data: scndLvlHsptlNumList
					});
				$scope.medicalInstitutionByKindSumList.push({
					name: "基层医院",
					data: prmryHsptlNumList
					});
				$scope.medicalInstitutionByKindSumList.push({
					name: "民营医院(门诊部)",
					data: prvtHsptlNumList
					});
				
				$scope.medicalInstitutionSelected = $scope.medicalInstitutionByKindSumList[1].name;
				$scope.medicalInstitutionSumByKindChart.series[0].name = $scope.medicalInstitutionByKindSumList[1].name;
				$scope.medicalInstitutionSumByKindChart.series[0].data = $scope.medicalInstitutionByKindSumList[1].data;
				$scope.medicalInstitutionLastYear = medicalInstitutionsLastYearData[medicalInstitutionsLastYearData.length-1];
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
		tableName: "HealthPersonnelData"
	};
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var hpRecentTime = lastObj.applyTime;
			
			var hpStartOprtr = new Date(hpRecentTime);
			var hpStartDate = dateService.formatDate(moment(hpStartOprtr.setFullYear(hpStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var hpEndDate =  dateService.formatDate(moment(hpRecentTime).endOf('year')); // alert(endDate);
			
			let params = {
				tableName: "HealthPersonnelData",
				start: hpStartDate,
				end: hpEndDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {	
				var data = JSOG.parse(JSOG.stringify(data.data));
				var doctorNumList = [];
				var nurseNumList = [];
				
				var mkApplyYear;
				for(var i=0; i<data.length; i++){
					doctorNumList.push(data[i].doctorNum);
					nurseNumList.push(data[i].nurseNum);
					
					mkApplyYear = new Date(data[i].applyTime);
					medicalWorkersYearData.push(mkApplyYear.getFullYear());
					if(i==data.length-1){
						medicalWorkersPieChartData.push({
							name: "医生",
				            y: data[i].doctorNum
						});
						medicalWorkersPieChartData.push({
							name: "护士",
				            y: data[i].nurseNum 
						});
					}
				}
				$scope.medicalWorkersPieChart.options.title.text = medicalWorkersYearData[data.length-1]+"年全市卫生技术人员情况";
				$scope.medicalWorkersYearsList.push({
					name: "医生",
					data: doctorNumList
					});
				$scope.medicalWorkersYearsList.push({
					name: "护士",
					data: nurseNumList
					});
				$scope.medicalWorkersByKindLineChart.series[0].data = $scope.medicalWorkersYearsList[0].data;
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

	$scope.medicalInstitutionSumChart = {
		options:{
			title: {
	            text: '近五年全市医疗机构总数情况',
	            x: -20 //center
	        },
	        credits: {
				enabled: false
				},
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalInstitutionsLastYearData,
	            tickmarkPlacement: 'on'
	        },
	        yAxis: {
	        	min: 0 ,
	            title: {
	                text: '医疗机构总数 (家)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '家'
	        },
	        legend: {
	            enabled:false
	        }
		},
		series: [{
	            name: '机构数',
	            data: medicalInstitutionSumChartData
	    }]
	};

	$scope.medicalInstitutionSumByKindChart = {
		options:{
			chart: {                                                           
	            type: 'column'                                                   
	        },                                                                                                                                  
	        xAxis: {                                                           
	            categories: medicalInstitutionsLastYearData,
	            title: {                                                       
	                text: '年份'
	            }                                                              
	        },                                                                 
	        yAxis: {                                                           
	            min: 0,                                                        
	            title: {                                                       
	                text: '机构数（家）'                                            
	            },                                                             
	            labels: {
					formatter: function() {
						return this.value
					}
				},
	            minTickInterval: 1
	        },                                                                 
	        tooltip: {                                                         
	            valueSuffix: '家'                                       
	        },                                                                 
	        plotOptions: {                                                     
	            bar: {                                                         
	                dataLabels: {                                              
	                    enabled: true                                          
	                }                                                          
	            }                                                              
	        },                                                                 
	        legend: {                                                          
	            enabled: false                                                  
	        },                                                                 
	        credits: {                                                         
	            enabled: false                                                 
	        }
		},
		title: {                                                           
	            text: '近五年二级医院情况'                    
	        }, 
		series: [{                                                         
	            name: '',                                             
	            data: [],
	    }] 
	};

	$scope.medicalWorkersPieChart = {
	    options:{
	        colors: pieColors,
	        chart: {
	            plotBackgroundColor: null,
	            plotBorderWidth: null,
	            plotShadow: false
	        },
	        credits: {                                                         
	            enabled: false                                                 
	        },
	        title: {
	            text: ''
	        },
	        subtitle: {
	            text: '点击饼图各部分查看近五年走势'
	        },
	        tooltip: {
	            enabled : false 
	        },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                dataLabels: {
	                    enabled: true,
	                    color: '#000000',
	                    connectorColor: '#000000',
	                    format: '<b>{point.name}</b>: {point.y:.0f}人'
	                },
	                events: {
	                    click: function(event){
	                        var name = event.point.name;
	                        $scope.medicalWorkersByKindLineChart.title.text = "近五年全市"+name+"情况";
	                        for(var i=0; i<$scope.medicalWorkersYearsList.length; i++)
	                        {
	                            if(name==$scope.medicalWorkersYearsList[i].name)
	                            {
	                                $scope.$apply(
	                                    function(){
	                                        $scope.medicalWorkersByKindLineChart.series[0].data = $scope.medicalWorkersYearsList[i].data;
	                                    }
	                                ); 
	                            }
	                        }
	                     }
	                }
	            }
	        }
	    },
	    series: [{
	            type: 'pie',
	            name: '人数',
	            data: medicalWorkersPieChartData
	        }]
	};

	$scope.medicalWorkersByKindLineChart = {
	    options:{
	        credits: {
	            enabled: false
	            },
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalWorkersYearData,
	            tickmarkPlacement: 'on'
	        },
	        yAxis: {
	            title: {
	                text: '人数 (人)'
	            },
	            plotLines: [{
	                value: 0,
	                width: 1,
	                color: '#808080'
	            }]
	        },
	        tooltip: {
	            valueSuffix: '人'
	        },
	        legend: {
	            enabled:false
	        }
	    },
	    title: {
	            text: '近五年全市医生情况',
	            x: -20 //center
	        },
	    series: [{
	            name: '人数',
	            data: []
	    }]
	};

	$scope.medicalBedsColumnChart = {
	    options:{
	    	credits: {
	            enabled: false
	            },
	        chart: {
	            type: 'column'
	           // margin: [ 50, 50, 100, 80]
	        },
	        title: {
	            text: '近五年全市医疗机构病床情况'
	        },
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalInstitutionsLastYearData
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '病床数(张)'
	            }
	        },
	        legend: {
	            enabled: false
	        },
	        tooltip: {
	            pointFormat: '病床数: <b>{point.y:.0f}张</b>',
	        }
	    },
	    series: [{
	            name: '病床数',
	            data: sickBedsNumList,
	    }]
	};

	$scope.medicalServiceColumnChart1 = {
	    options:{
	    	credits: {
	            enabled: false
	            },
	        chart: {
	            type: 'column'
	           // margin: [ 50, 50, 100, 80]
	        },
	        title: {
	            text: ''
	        },
	        xAxis: {
	            categories: ['门诊人次', '急诊人次']
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '诊疗人数(人次)'
	            },
	            labels: {
					formatter: function() {
						return this.value
					}
				}
	        },
	        legend: {
	            enabled: false
	        },
	        tooltip: {
	            pointFormat: '诊疗人次: <b>{point.y:.0f}人次</b>',
	        }
	    },
	    series: [{
	            name: '诊疗人次',
	            data: medicalServiceColumnChartData1,
	    }]
	};

	$scope.medicalServiceColumnChart2 = {
		    options:{
		    	credits: {
		            enabled: false
		            },
		        chart: {
		            type: 'column'
		           // margin: [ 50, 50, 100, 80]
		        },
		        title: {
		            text: ''
		        },
		        xAxis: {
		            categories: ['住院人次', '120急救人次']
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '诊疗人数(人次)'
		            },
		            labels: {
						formatter: function() {
							return this.value
						}
					}
		        },
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            pointFormat: '诊疗人次: <b>{point.y:.0f}人次</b>',
		        }
		    },
		    series: [{
		            name: '诊疗人次',
		            data: medicalServiceColumnChartData2
		    }]
		};

	$scope.medicalServiceByKindLineChart = {
	    options:{
	        credits: {
	            enabled: false
	        },
	        chart: {
	            type: 'line'
	           // margin: [ 50, 50, 100, 80]
	        },   
	        xAxis: {
	            title: {
	                text: '月份'
	            },
	            categories: monthData,
	            tickmarkPlacement: 'on'
	        },
	        yAxis: {
	            title: {
	                text: '诊疗人次 (人次)'
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
	            x: -20//center
	    },
	    series: [{
	        name: "",//$scope.medicalServicePatientsByKindList[0].name,
	        data: []//$scope.medicalServicePatientsByKindList[0].data
	    }]
	};

	$scope.medicalInstitutionKindChange = function(medicalInstitutionSumOne){
		$scope.medicalInstitutionSumByKindChart.title.text = "近五年"+medicalInstitutionSumOne.name+"情况";
		$scope.medicalInstitutionSumByKindChart.series[0].name = medicalInstitutionSumOne.name;
		$scope.medicalInstitutionSumByKindChart.series[0].data = medicalInstitutionSumOne.data;
	};

	$scope.medicalServiceKindChange = function(medicalServicePatientsOne){
	    $scope.medicalServiceByKindLineChart.title.text = $scope.displayYear+"年全市"+medicalServicePatientsOne.name+"服务情况";
	    $scope.medicalServiceByKindLineChart.series[0].name = medicalServicePatientsOne.name;
	    $scope.medicalServiceByKindLineChart.series[0].data = medicalServicePatientsOne.data;
	};
};