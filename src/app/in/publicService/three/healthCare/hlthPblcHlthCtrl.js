export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('.navTopShowhealthcare').show(0);
		$('#cmrefuse-s1').focus();
		$('#psHealthcareTogglePanel').hide(0);
		$('#psHealthcareToggleButton').click(() => {
			$('#psHealthcareTogglePanel').toggle(0);
		})
	}();
	var idRecentTime;
	var efRecentTime;
	var wcRecentTime;
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');

	//charts data
	var infectiousDiseasesPieChartData = [];
	$scope.infectiousDiseasesByKindList = [];
	var infectiousDiseasesByKindLineChartCategories = [];
	var expectedLifeYearData = [];
	$scope.averageExpectedLifeByKindList = [];
	$scope.womenAndChildrenDeathRateByKindList = [];
	var babyDeathRateList = [];
	var prgntLyinginWmnDeathRateYearData = [];
	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMS0xNSAxODowODo1OCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjQiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiNSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI2IiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiI3IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiI4IiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiI5IiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMCIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjIwIiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn1dfSwiZXhwaXJlcyI6MTQ4MDE0NjA5NTczMiwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.FGoM5cgKKtIX3azkquWK9GBo+wFpcgnTFJCKvxiP6eU="
    };
	let params = {
		tableName: "InfctsDiseaseData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			idRecentTime = lastObj.applyTime;
			$scope.displayYear = new Date(idRecentTime).getFullYear();
			var idStartDate = dateService.formatDate(moment(idRecentTime).startOf('year')); // alert(startDate);
			var idEndDate =  dateService.formatDate(moment(idRecentTime).endOf('month'));  // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "InfctsDiseaseData",
				start: idStartDate,
				end: idEndDate
			}
			let currentType = "infection"; // 标记当前处于车次还是吨数状态
			$scope.table1 = true;
			$scope.currentName = "公交车";
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				var data = JSOG.parse(JSOG.stringify(data.data));
				
				var enteric=[];   //肠道传染病
				var breath=[];    //呼吸道传染病
				var bloodSex=[];  //血源及性传播传染病
				var nature=[];	  //自然疫源及虫媒传染病
				
				var applyMonth;
				
				for(var i=0; i<data.length; i++){
					switch(data[i].diseaseType.id){
					case 6040://肠道传染病
						enteric.push(data[i].patientNum);
						break;
					case 6041://呼吸道传染病
						breath.push(data[i].patientNum);
						break;
					case 6042://血源及性传播传染病
						bloodSex.push(data[i].patientNum);
						break;
					case 6043://自然疫源及虫媒传染病
						nature.push(data[i].patientNum);
						break;
					}
					
				}
				infectiousDiseasesPieChartData.push({
					name: "肠道传染病(甲乙类)",
		            y:  enteric[data.length/4-1]
				});
				infectiousDiseasesPieChartData.push({
					name: "呼吸道传染病(甲乙类)",
		            y: breath[data.length/4-1]
				});
				infectiousDiseasesPieChartData.push({
					name: "血源及性传播传染病(甲乙类)",
		            y: bloodSex[data.length/4-1]
				});
				infectiousDiseasesPieChartData.push({
					name: "自然疫源及虫媒传染病(甲乙类)",
		            y: nature[data.length/4-1]
				});
				$scope.infectiousDiseases = [
				                     		{ name : "肠道传染病(甲乙类)" ,  number : enteric[data.length/4-1] },
				                     		{ name : "呼吸道传染病(甲乙类)" ,  number : breath[data.length/4-1] },
				                     		{ name : "血源及性传播传染病(甲乙类)" ,  number : bloodSex[data.length/4-1] },
				                     		{ name : "自然疫源及虫媒传染病(甲乙类)" ,  number : nature[data.length/4-1] },
				                     		{ name : "合计" ,  number : enteric[enteric.length-1]+breath[data.length/4-1]+bloodSex[data.length/4-1]+nature[data.length/4-1] }
				                     	];
				
				for(var i=0; i<data.length/4; i++){
					
					applyMonth = new Date(data[i*4].applyTime);
					infectiousDiseasesByKindLineChartCategories.push(applyMonth.getMonth()+1);
				}
				$scope.infectiousDiseasesByKindList.push({
					name: "肠道传染病(甲乙类)",
		            data: enteric
				});
				$scope.infectiousDiseasesByKindList.push({
					name: "呼吸道传染病(甲乙类)",
		            data: breath
				});
				$scope.infectiousDiseasesByKindList.push({
					name: "血源及性传播传染病(甲乙类)",
		            data: bloodSex
				});
				$scope.infectiousDiseasesByKindList.push({
					name: "自然疫源及虫媒传染病(甲乙类)",
		            data: nature
				});
				$scope.infectiousDiseasesKindSelected = $scope.infectiousDiseasesByKindList[0].name;
				$scope.infectiousDiseasesByKindLineChart.series[0].name = $scope.infectiousDiseasesByKindList[0].name;
				$scope.infectiousDiseasesByKindLineChart.series[0].data = $scope.infectiousDiseasesByKindList[0].data;
				$scope.infectiousDiseasesPieChart.options.title.text = $scope.displayYear+'年'+infectiousDiseasesByKindLineChartCategories[data.length/4-1]+"月全市主要传染病分布情况";
				$scope.infectiousDiseasesLastMonth = infectiousDiseasesByKindLineChartCategories[data.length/4-1];
				$scope.infectiousDiseasesByKindLineChart.title.text = $scope.displayYear+'年各月份肠道传染病(甲乙类)情况';
				$scope.changeChoice = (choice) => {
					console.log(choice);
					$('#psHealthcareTogglePanel').hide(0);
					if(currentType == "infection"){
						$scope.infectiousDiseasesKindChange(choice);
					}else if(currentType == "lifetime"){
						$scope.averageExpectedLifeKindChange(choice);
					}else if(currentType == "mc"){
						$scope.womenAndChildrenDeathRateKindChange(choice);
					}
				};
				$scope.changeChart = (type) => {
						switch (type) {
							case "infection":
								$scope.type = "选择传染病类别";
								$scope.title1 = "医疗机构";
								$scope.list = $scope.infectiousDiseasesByKindList;
								$scope.listSelected = $scope.infectiousDiseasesKindSelected;

								$scope.chart1 = $scope.infectiousDiseasesByKindLineChart;
								$scope.chart2 = $scope.infectiousDiseasesPieChart;
								$('#cmhealthcare-s1').addClass('activeTab');
								$('#cmhealthcare-s2').removeClass('activeTab');
								currentType = "infection";
								$scope.tab1 = true;
								$scope.tab3 = false;
								break;
							case "lifetime":
								$scope.type = "选择期望寿命类别";
								$scope.title1 = "诊疗服务";
								$scope.list = $scope.averageExpectedLifeByKindList;
								$scope.listSelected = $scope.averageExpectedLifeKindSelected;


								$scope.chart1 = $scope.averageExpectedLifeLineChart;
								$scope.chart2 = $scope.averageExpectedLifeComparedColumnChart;
								$('#cmhealthcare-s2').addClass('activeTab');
								$('#cmhealthcare-s1').removeClass('activeTab');
								currentType = "lifetime";
								$scope.tab1 = false;
								$scope.tab3 = false;
								break;
							case "mc":
								$scope.type = "选择妇幼死亡率类别";
								$scope.title1 = "诊疗服务";
								$scope.list = $scope.womenAndChildrenDeathRateByKindList;
								$scope.listSelected = $scope.womenAndChildrenDeathRateKindSelected;

								$scope.chart1 = $scope.womenAndChildrenDeathRateColumnChart;
								$scope.chart2 = $scope.medicalServiceColumnChart1;
								$('#cmhealthcare-s2').addClass('activeTab');
								$('#cmhealthcare-s1').removeClass('activeTab');
								currentType = "mc";
								$scope.tab1 = false;
								$scope.tab3 = true;
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
		tableName: "ExpectedLifeData"
	};
    qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			efRecentTime = lastObj.applyTime;
			
			var efStartOprtr = new Date(efRecentTime);
			var efStartDate = dateService.formatDate(moment(efStartOprtr.setFullYear(efStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var efEndDate =  dateService.formatDate(moment(efRecentTime).endOf('year')); // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "ExpectedLifeData",
				start: efStartDate,
				end: efEndDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {		
				var data = JSOG.parse(JSOG.stringify(data.data));
				var mlExpectedLifeList = [];
				var fmlExpectedLifeList = [];
				var avrgExpectedLifeList = [];
				var applyYear;
				for(var i=0; i<data.length; i++){
					applyYear = new Date(data[i].applyTime);
					expectedLifeYearData.push(applyYear.getFullYear());
					mlExpectedLifeList.push(data[i].mlExpectedLife);
					fmlExpectedLifeList.push(data[i].fmlExpectedLife);
					avrgExpectedLifeList.push(data[i].avrgExpectedLife);
					babyDeathRateList.push(data[i].babyDeathRate);
				}
				$scope.averageExpectedLifeByKindList.push({
					name: "男性平均期望寿命",
					data: mlExpectedLifeList
					});
				$scope.averageExpectedLifeByKindList.push({
					name: "女性平均期望寿命",
					data: fmlExpectedLifeList
					});
				$scope.averageExpectedLifeByKindList.push({
					name: "平均期望寿命(合计)",
					data: avrgExpectedLifeList
					});
				$scope.averageExpectedLifeKindSelected = $scope.averageExpectedLifeByKindList[0].name;
				$scope.averageExpectedLifeLineChart.series[0].name = $scope.averageExpectedLifeByKindList[0].name;
				$scope.averageExpectedLifeLineChart.series[0].data = $scope.averageExpectedLifeByKindList[0].data;  
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
		tableName: "WomanCareData"
	};
    qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			wcRecentTime = lastObj.applyTime;
			
			var wcStartOprtr = new Date(wcRecentTime);
			var wcStartDate = dateService.formatDate(moment(wcStartOprtr.setFullYear(wcStartOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var wcEndDate =  dateService.formatDate(moment(wcRecentTime).endOf('year')); // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "WomanCareData",
				start: wcStartDate,
				end: wcEndDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				var data = JSOG.parse(JSOG.stringify(data.data));
				var prgntLyinginWmnDeathRateList = [];
				var wcApplyYear;
				for(var i=0; i<data.length; i++){
					
					wcApplyYear = new Date(data[i].applyTime);
					prgntLyinginWmnDeathRateYearData.push(wcApplyYear.getFullYear());
					
					prgntLyinginWmnDeathRateList.push(data[i].prgntLyinginWmnDeathRate);
				}
				//alert(prgntLyinginWmnDeathRateList);
				$scope.womenAndChildrenDeathRateByKindList.push({
					name: '婴儿死亡率',
					data: babyDeathRateList,
					comment: ''
				});
				$scope.womenAndChildrenDeathRateByKindList.push({
					name: '孕产妇死亡率',
					data: prgntLyinginWmnDeathRateList,
					comment: ''
				});
				$scope.womenAndChildrenDeathRateKindSelected = $scope.womenAndChildrenDeathRateByKindList[0].name;
				$scope.womenAndChildrenDeathRateColumnChart.series[0].data = $scope.womenAndChildrenDeathRateByKindList[0].data;
		
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

   	$scope.infectiousDiseasesPieChart = {
		    options:{
		        colors: pieColors,
		        credits: {
		            enabled: false
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        chart: {
		            plotBackgroundColor: null,
		            plotBorderWidth: null,
		            plotShadow: false
		        },
		        title: {
		            text: '',
		            style: {
						fontSize: "13px"
					}
		        },
		        tooltip: {
		    	    pointFormat: '{series.name}: <b>{point.percentage:.1f}%</b>'
		        },
		        plotOptions: {
		            pie: {
		                allowPointSelect: true,
		                cursor: 'pointer',
		                dataLabels: {
		                    enabled: true,
		                    color: '#000000',
		                    connectorColor: '#000000',
		                    format: '<b>{point.name}</b>: {point.percentage:.1f} %'
		                }
		            }
		        }
		    },
		    series: [{
	            type: 'pie',
	            name: '占比',
	            data: infectiousDiseasesPieChartData
	        }]
		};
	$scope.infectiousDiseasesByKindLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
				xAxis: {
					title: {
		                text: '月份'
		            },
		            categories: infectiousDiseasesByKindLineChartCategories,
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
		                text: '患者数 (人次)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }],
		            minTickInterval: 1
		        },
		        tooltip: {
		            valueSuffix: '人次'
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
	
	$scope.averageExpectedLifeLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
				xAxis: {
					title: {
		                text: '年份'
		            },
		            categories: expectedLifeYearData,
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
		            title: {
		                text: '期望寿命 (岁)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }]
		        },
		        tooltip: {
		            valueSuffix: '岁',
		            //pointFormat: '病床数: <b>{point.y:.2f}岁</b>',
		        },
		        legend: {
		            enabled: false
		        }
			},
			title: {
	            text: '近五年男性平均期望情况',
	            style: {
					fontSize: "13px"
				}
	        },
	        series: [{
	            name: '',
	            data: []
	        }]
	};
	
	$scope.averageExpectedLifeComparedColumnChart = {
			options:{
				colors: columnColors,
				credits: {
		            enabled: false
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
				chart: {
		            type: 'column'
		           // margin: [ 50, 50, 100, 80]
		        },
		        title: {
		            text: '近五年平均期望寿命对比情况',
		            style: {
						fontSize: "13px"
					}
		        },
		        xAxis: {
		        	title: {
		                text: '年份',
		            },
		            categories: expectedLifeYearData,
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
		                text: '平均期望寿命 (岁)'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f} 岁</b></td></tr>',
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
			series: $scope.averageExpectedLifeByKindList
	};
	
	$scope.womenAndChildrenDeathRateColumnChart = {
			options:{
				credits: {
		            enabled: false
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
				chart: {
		            type: 'column',
		            margin: [ 50, 50, 100, 80]
		        },
		        xAxis: {
		        	title: {
		                text: '年份'
		            },
		            categories: expectedLifeYearData,
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
		        legend: {
		            enabled: false
		        },
		        tooltip: {
		            enabled: false
		        }
			},
			title: {
	            text: '近五年婴儿死亡率情况',
	            style: {
					fontSize: "13px"
				}
	        },
	        yAxis: {
	            min: 0,
	            title: {
	                text: '死亡率 (‰)'
	            }
	        },
			series: [{
	            name: '死亡率',
	            data: [],
	            dataLabels: {
	                enabled: true,
	                rotation: -90,
	                color: '#FFFFFF',
	                align: 'right',
	                x: 4,
	                y: 10,
	                style: {
	                    fontSize: '13px',
	                    fontFamily: 'Verdana, sans-serif',
	                    textShadow: '0 0 3px black'
	                }
	            }
	        }]
	};
	
	// radio点击事件
	$scope.infectiousDiseasesKindChange = function(infectiousDiseasesOne){
		$scope.infectiousDiseasesByKindLineChart.title.text = $scope.displayYear+"年各月份"+infectiousDiseasesOne.name+"情况";
		$scope.infectiousDiseasesByKindLineChart.series[0].name = infectiousDiseasesOne.name;
		$scope.infectiousDiseasesByKindLineChart.series[0].data = infectiousDiseasesOne.data;
	};
	$scope.averageExpectedLifeKindChange = function(averageExpectedLifeOne){
		$scope.averageExpectedLifeLineChart.title.text = "近五年"+averageExpectedLifeOne.name+"情况";
		$scope.averageExpectedLifeLineChart.series[0].name = averageExpectedLifeOne.name;
		$scope.averageExpectedLifeLineChart.series[0].data = averageExpectedLifeOne.data;
		switch(averageExpectedLifeOne.name.trim()){
		case '男性平均期望寿命':
			$scope.averageExpectedLifeLineChart.series[0].name = '男性平均期望寿命';
			$scope.averageExpectedLifeLineChart.series[0].data = $scope.averageExpectedLifeByKindList[0].data;
			break;
		case '女性平均期望寿命':
			$scope.averageExpectedLifeLineChart.series[0].name = '女性平均期望寿命';
			$scope.averageExpectedLifeLineChart.series[0].data =  $scope.averageExpectedLifeByKindList[1].data;
			break;
		case '平均期望寿命(合计)':
			$scope.averageExpectedLifeLineChart.series[0].name = '平均期望寿命(合计)';
			$scope.averageExpectedLifeLineChart.series[0].data =  $scope.averageExpectedLifeByKindList[2].data;
			break;
		}
	};
	$scope.womenAndChildrenDeathRateKindChange = function(womenAndChildrenDeathRateOne){
		$scope.womenAndChildrenDeathRateColumnChart.title.text = "近五年"+womenAndChildrenDeathRateOne.name+"情况";
		$scope.womenAndChildrenDeathRateColumnChart.series[0].data = womenAndChildrenDeathRateOne.data;
		$scope.womenAndChildrenDeathRateComment = womenAndChildrenDeathRateOne.comment;
		if(womenAndChildrenDeathRateOne.name.trim()=="婴儿死亡率".trim()){
			$scope.womenAndChildrenDeathRateColumnChart.yAxis.title.text = "死亡率 (‰)";
			$scope.womenAndChildrenDeathRateColumnChart.options.xAxis.categories = expectedLifeYearData;
		}
		else {
			$scope.womenAndChildrenDeathRateColumnChart.yAxis.title.text = "死亡率 (十万分比)";
			$scope.womenAndChildrenDeathRateColumnChart.options.xAxis.categories = prgntLyinginWmnDeathRateYearData;
		}
	};
};