export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#cmrefuse-s1').focus();
		$('#psHealthcareTogglePanel').hide(0);
		$('#psHealthcareToggleButton').click(() => {
			$('#psHealthcareTogglePanel').toggle(0);
		})
	}();
	
	var svcRecentTime;
	var maRecentTime;
	var hpRecentTime;
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15');
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
	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMS0xNSAxODowODo1OCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjQiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiNSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI2IiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiI3IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiI4IiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiI5IiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMCIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjIwIiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn1dfSwiZXhwaXJlcyI6MTQ4MDE0NjA5NTczMiwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.FGoM5cgKKtIX3azkquWK9GBo+wFpcgnTFJCKvxiP6eU="
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
			svcRecentTime = lastObj.applyTime;
			$scope.displayYear = new Date(svcRecentTime).getFullYear();
			var svcStartDate = dateService.formatDate(moment(svcRecentTime).startOf('year')); // alert(startDate);
			var svcEndDate =  dateService.formatDate(moment(svcRecentTime).endOf('month'));  // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "HealthServiceData",
				start: svcStartDate,
				end: svcEndDate
			}
			let currentType = "resource"; // 标记当前处于车次还是吨数状态
			$scope.table1 = true;
			$scope.currentName = "公交车";
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
				$scope.chart3 = $scope.medicalServiceColumnChart2;
				$scope.changeChoice = (choice) => {
					console.log(choice);
					$('#psHealthcareTogglePanel').hide(0);
					if(currentType == "resource"){
						$scope.medicalInstitutionKindChange(choice);
					}else if(currentType == "service"){
						$scope.medicalServiceKindChange(choice);
					}
				};
				$scope.changeChart = (type) => {
						switch (type) {
							case "resource":
								$scope.typeTitle = "选择医院类别";
								$scope.title1 = "医疗机构";
								$scope.list = $scope.medicalInstitutionByKindSumList;
								$scope.listSelected = $scope.medicalInstitutionSelected;
								$scope.chart1 = $scope.medicalInstitutionSumByKindChart;
								$scope.chart2 = $scope.medicalInstitutionSumChart;
								$scope.tab1 = true;
								$('#cmhealthcare-s1').addClass('activeTab');
								$('#cmhealthcare-s2').removeClass('activeTab');
								currentType = "resource";
								break;
							case "service":
								$scope.typeTitle = "选择诊疗类别";
								$scope.title1 = "诊疗服务";
								$scope.list = $scope.medicalServicePatientsByKindList;
								$scope.listSelected = $scope.medicalServiceSelected;
								$scope.chart1 = $scope.medicalServiceByKindLineChart;
								$scope.chart2 = $scope.medicalServiceColumnChart1;
								$('#cmhealthcare-s2').addClass('activeTab');
								$('#cmhealthcare-s1').removeClass('activeTab');
								$scope.tab1 = false;
								currentType = "service";
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
		tableName: "MedicalAdminData"
	};
    qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			maRecentTime = lastObj.applyTime;
			var maStartOprtr = new Date(maRecentTime);
			var maStartDate = dateService.formatDate(moment(maStartOprtr.setFullYear(maStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var maEndDate =  dateService.formatDate(moment(maRecentTime).endOf('year')); // alert(endDate);
			// 最新一天数据
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
    qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			hpRecentTime = lastObj.applyTime;
			
			var hpStartOprtr = new Date(hpRecentTime);
			var hpStartDate = dateService.formatDate(moment(hpStartOprtr.setFullYear(hpStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var hpEndDate =  dateService.formatDate(moment(hpRecentTime).endOf('year')); // alert(endDate);
			// 最新一天数据
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
	            style: {
					fontSize: "13px"
				}
	        },
	        credits: {
				enabled: false
				},
			exporting: {
				enabled: false, // 取消打印menu
			},
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalInstitutionsLastYearData,
	            tickmarkPlacement: 'on',
	            tickInterval: 1,
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
	        exporting: {
					enabled: false, // 取消打印menu
			},                                                                                                                                
	        xAxis: {                                                           
	            categories: medicalInstitutionsLastYearData,
	            title: {                                                       
	                text: '年份'
	            },
	            tickmarkPlacement: 'on',
	            tickInterval: 1,
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
	            text: '近五年二级医院情况',
	            style: {
					fontSize: "13px"
				}              
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
	        exporting: {
					enabled: false, // 取消打印menu
				},
	        credits: {                                                         
	            enabled: false                                                 
	        },
	        title: {
	            text: '',
	            style: {
					fontSize: "13px"
				}
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
	            exporting: {
					enabled: false, // 取消打印menu
				},
	        xAxis: {
	            title: {
	                text: '年份',
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
	        exporting: {
					enabled: false, // 取消打印menu
				},
	        title: {
	            text: '近五年全市医疗机构病床情况',
	            style: {
					fontSize: "13px"
				}
	        },
	        xAxis: {
	            title: {
	                text: '年份'
	            },
	            categories: medicalInstitutionsLastYearData,
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
	        exporting: {
					enabled: false, // 取消打印menu
				},
	        title: {
	            text: '',
	            style: {
					fontSize: "13px"
				}
	        },
	        xAxis: {
	            categories: ['门诊人次', '急诊人次'],
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
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        title: {
		            text: '',
		            style: {
						fontSize: "13px"
					}
		        },
		        xAxis: {
		            categories: ['住院人次', '120急救人次'],
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
		            data: medicalServiceColumnChartData2,
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
	        exporting: {
					enabled: false, // 取消打印menu
				},
	        xAxis: {
	            title: {
	                text: '月份'
	            },
	            categories: monthData,
	            tickmarkPlacement: 'on',
	            tickInterval: 1,
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

	// radio点击事件
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