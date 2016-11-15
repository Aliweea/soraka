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
    $scope.tab3 = false;
    $scope.show = function () {
        $scope.tab1 = true;
        $scope.tab2 = false;
        $scope.tab3 = false;
    }
    $scope.show2 = function () {
        $scope.tab1 = false;
        $scope.tab2 = true;
        $scope.tab3 = false;
    }
    $scope.show3 = function () {
        $scope.tab1 = false;
        $scope.tab3 = true;
        $scope.tab2 = false;
    }
    var yearData = [];
	$scope.eduUniversalList = [];
	$scope.eduEquityIndexList = [];

	$scope.eduUniversalLastYearList = [];
	$scope.eduEquityIndexLastYearList = [];

	$scope.studyQualityLastYearList =[];
	$scope.schoolQualityLastYearList =[];
	$scope.contribLastYearList =[];
	$scope.enrollLastYearList =[];//
	
	//chartData
	var yearData = [];
	$scope.studyQuality = [];
	$scope.schoolQuality = [];
	$scope.contrib = [];
	$scope.enroll=[];//


	$scope.tchrGrntLastYearList = [];
	
	$scope.investGrntLastYearList=[];
	$scope.perEduFundGrntLastYearList=[];
	
	//chartData
	var yearData = [];
	$scope.tchrGrntList = [];
	
	$scope.investGrntList=[];//投资保障
	$scope.perEduFundGrntList=[];
	$scope.perEduFundGrntRateList=[];
	$scope.perFundGrntList=[];
	$scope.perFundGrntRateList=[];

	let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjExIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIxMiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjE1IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjE2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiIxNyIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjIwIiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIyMSIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIyMiIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjMiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn1dfSwiZXhwaXJlcyI6MTQ3OTg4MzMyOTUxNCwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.1yfx07Fa3M8CzqObBbUAGsEM5m+fi00aGs5J9NiiRac=";
	let headers = {
		"X-Auth-Token":token
	};
	let params = {
		tableName: "EduEquityUniversalData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var recentTime = lastObj.applyTime;
			
			var startOprtr = new Date(recentTime);
			var startDate = dateService.formatDate(moment(startOprtr.setFullYear(startOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var endDate =  dateService.formatDate(moment(recentTime).endOf('year')); // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "EduEquityUniversalData",
				start: startDate,
				end: endDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				
				var data = JSOG.parse(JSOG.stringify(data.data));
		
				var prschlEduThrYrRateList = [];
				var cmplsryEduStrngthnRateList = [];
				var hghSchlEnrllmntRateList = [];
				var hghrEduEnrllmntRateList = [];
				
				var dffIndxBtwnPrmrySchlCndList = [];
				var dffIndxBtwnMddlSchlCndList = [];
				
				var applyDate;
				
				for(var i=0; i<data.length; i++){
					prschlEduThrYrRateList.push(data[i].prschlEduThrYrRate);
					cmplsryEduStrngthnRateList.push(data[i].cmplsryEduStrngthnRate);
					hghSchlEnrllmntRateList.push(data[i].hghSchlEnrllmntRate);
					hghrEduEnrllmntRateList.push(data[i].hghrEduEnrllmntRate);
					
					dffIndxBtwnPrmrySchlCndList.push(data[i].dffIndxBtwnPrmrySchlCnd);
					dffIndxBtwnMddlSchlCndList.push(data[i].dffIndxBtwnMddlSchlCnd);
					
					applyDate = new Date(data[i].applyTime);
					yearData.push(applyDate.getFullYear());
				}
				
				$scope.eduUniversalLastYear = yearData[data.length-1];
				
				$scope.eduUniversalLastYearList.push({
					name: '学前三年教育毛入园率',
					number: prschlEduThrYrRateList[data.length-1],
					target:0
				});
				$scope.eduUniversalLastYearList.push({
					name: '义务教育巩固率',
					number: cmplsryEduStrngthnRateList[data.length-1],
					target:0
				});
				$scope.eduUniversalLastYearList.push({
					name: '高中阶段教育毛入学率',
					number: hghSchlEnrllmntRateList[data.length-1],
					target:0
				});
				$scope.eduUniversalLastYearList.push({
					name: '十九周岁人口高等教育入学率',
					number: hghrEduEnrllmntRateList[data.length-1],
					target:0
				});
				
				$scope.eduUniversalList.push({
					name: '学前三年教育毛入园率',
					data: prschlEduThrYrRateList,
					comment: ''
				});
				$scope.eduUniversalList.push({
					name: '义务教育巩固率',
					data: cmplsryEduStrngthnRateList,
					comment: ''
				});
				$scope.eduUniversalList.push({
					name: '高中阶段教育毛入学率',
					data: hghSchlEnrllmntRateList,
					comment: ''
				});
				$scope.eduUniversalList.push({
					name: '十九周岁人口高等教育入学率',
					data: hghrEduEnrllmntRateList,
					comment: ''
				});
				$scope.eduUniversalKindSelected = $scope.eduUniversalList[0].name;
				$scope.eduUniversalByKindColumnChart.series[0].data = $scope.eduUniversalList[0].data;
				$scope.eduUniversalByKindColumnChart.series[0].name = $scope.eduUniversalList[0].name;
				$scope.eduUniversalByKindColumnChart.options.yAxis.title.text = $scope.eduUniversalList[0].name+"(%)";
				
				$scope.eduEquityIndexLastYearList.push({
					name: '小学办学条件校际均衡差异系数',
					number: dffIndxBtwnPrmrySchlCndList[data.length-1]
				});
				$scope.eduEquityIndexLastYearList.push({
					name: '初中办学条件校际均衡差异系数',
					number: dffIndxBtwnMddlSchlCndList[data.length-1]
				});
				$scope.eduEquityIndexList.push({
					name: '小学办学条件校际均衡差异系数',
					data: dffIndxBtwnPrmrySchlCndList,
					comment: ''
				});
				$scope.eduEquityIndexList.push({
					name: '初中办学条件校际均衡差异系数',
					data: dffIndxBtwnMddlSchlCndList,
					comment: ''
				});
				$scope.eduEquityIndexKindSelected = $scope.eduEquityIndexList[0].name;
				$scope.eduEquityIndexKindColumnChart.series[0].data = $scope.eduEquityIndexList[0].data;
				$scope.eduEquityIndexKindColumnChart.series[0].name = $scope.eduEquityIndexList[0].name;
			
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

	$scope.eduUniversalByKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {text : '年份'},
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
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
	            text: '近五年学前三年教育毛入园率情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
	};
	
	$scope.eduEquityIndexKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {
			                text: '年份'
			            },
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '办学条件校际均衡差异系数'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
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
	            text: '近五年小学办学条件校际均衡差异系数情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
	};

	$scope.eduUniversalKindChange = function(eduUniversalOne){
			$scope.eduUniversalByKindColumnChart.title.text = "近五年"+eduUniversalOne.name+"情况";
			$scope.eduUniversalByKindColumnChart.series[0].data = eduUniversalOne.data;
			$scope.eduUniversalByKindColumnChart.series[0].name = eduUniversalOne.name;
			$scope.eduUniversalByKindColumnChart.options.yAxis.title.text = eduUniversalOne.name+"(%)";
			$scope.eduUniversalCommentSelected = eduUniversalOne.comment;
	};

	$scope.eduEquityIndexKindChange = function(eduEquityIndexOne){
			$scope.eduEquityIndexKindColumnChart.title.text = "近五年"+eduEquityIndexOne.name+"情况";
			$scope.eduEquityIndexKindColumnChart.series[0].name = eduEquityIndexOne.name;
			$scope.eduEquityIndexKindColumnChart.series[0].data = eduEquityIndexOne.data;
			$scope.eduEquityIndexCommentSelected = eduEquityIndexOne.comment;
	};

	params = {
		tableName: "EduQualityContribData"
	};
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var recentTime = lastObj.applyTime;
			
			var startOprtr = new Date(recentTime);
			var startDate = dateService.formatDate(moment(startOprtr.setFullYear(startOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var endDate =  dateService.formatDate(moment(recentTime).endOf('year'));  //alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "EduQualityContribData",
				start: startDate,
				end: endDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				
				var data = JSOG.parse(JSOG.stringify(data.data));
		
				var prmryPssRateList = [];
				var mdlPssRateList = [];
				var hghPssRateList = [];
				var trdSchlDblCrtfctRateList = [];
				
				var hghQultyKndrgrtnPrcntgList = [];
				var stndrdCmplsryEduSchlPrcntgList = [];
				var thrStrLvlHghSchlPrcntgList = [];
				
				var newLaborAvrgEduYearList = [];
				var mainLaborAvrgEduYearList = [];
				var mainLaborHghEduPrcntgList = [];
				var trdSchlGrdtEmplymntRateList = [];
				
				var commonCollegeEnrollRateList=[];//
				var commonCollegeUgrEnrollRateList=[];//
				var highSchlGrdtEmplymntRateList=[];//
				
				var applyDate;
				
				for(var i=0; i<data.length; i++){
					
					prmryPssRateList.push(data[i].prmryPssRate);
					mdlPssRateList.push(data[i].mdlPssRate);
					hghPssRateList.push(data[i].hghPssRate);
					trdSchlDblCrtfctRateList.push(data[i].trdSchlDblCrtfctRate);
					
					hghQultyKndrgrtnPrcntgList.push(data[i].hghQultyKndrgrtnPrcntg);
					stndrdCmplsryEduSchlPrcntgList.push(data[i].stndrdCmplsryEduSchlPrcntg);
					thrStrLvlHghSchlPrcntgList.push(data[i].thrStrLvlHghSchlPrcntg);
					
					newLaborAvrgEduYearList.push(data[i].newLaborAvrgEduYear);
					mainLaborAvrgEduYearList.push(data[i].mainLaborAvrgEduYear);
					mainLaborHghEduPrcntgList.push(data[i].mainLaborHghEduPrcntg);
					trdSchlGrdtEmplymntRateList.push(data[i].trdSchlGrdtEmplymntRate);
					
					commonCollegeEnrollRateList.push(data[i].commonCollegeEnrollRate);//
					commonCollegeUgrEnrollRateList.push(data[i].commonCollegeUgrEnrollRate);//
					highSchlGrdtEmplymntRateList.push(data[i].highSchlGrdtEmplymntRate);//
					
					applyDate = new Date(data[i].applyTime);
					yearData.push(applyDate.getFullYear());
				}
				$scope.lastYear = yearData[data.length-1];
				$scope.studyQuality.push({
					name: '小学学业合格率',
					data: prmryPssRateList,
					comment: ''
				});
				$scope.studyQuality.push({
					name: '初中学业合格率',
					data: mdlPssRateList,
					comment: ''
				});
				$scope.studyQuality.push({
					name: '普通高中学业合格率',
					data: hghPssRateList,
					comment: ''
				});
				$scope.studyQuality.push({
					name: '中等职业学校毕业生双证书获取率',
					data: trdSchlDblCrtfctRateList,
					comment: ''
				});
				$scope.studyQualityKindSelected = $scope.studyQuality[0].name;
				$scope.studyQualityByKindColumnChart.series[0].name = $scope.studyQuality[0].name;
				$scope.studyQualityByKindColumnChart.series[0].data = $scope.studyQuality[0].data;
				$scope.studyQualityByKindColumnChart.options.yAxis.title.text = $scope.studyQuality[0].name+"(%)";
				
				$scope.studyQualityLastYearList.push({
					name: '小学学业合格率',
					number: prmryPssRateList[data.length-1]
				});
				$scope.studyQualityLastYearList.push({
					name: '初中学业合格率',
					number: mdlPssRateList[data.length-1]
				});
				$scope.studyQualityLastYearList.push({
					name: '普通高中学业合格率',
					number: hghPssRateList[data.length-1]
				});
				$scope.studyQualityLastYearList.push({
					name: '中等职业学校毕业生双证书获取率',
					number: trdSchlDblCrtfctRateList[data.length-1]
				});
				
				$scope.schoolQuality.push({
					name: '省优质幼儿园的比例',
					data: hghQultyKndrgrtnPrcntgList,
					comment: ''
				});
				$scope.schoolQuality.push({
					name: '义务教育学校达省现代化学校办学标准的比例',
					data: stndrdCmplsryEduSchlPrcntgList,
					comment: ''
				});
				$scope.schoolQuality.push({
					name: '高中阶段达省定三星级以上学校的比例',
					data: thrStrLvlHghSchlPrcntgList,
					comment: ''
				});
				$scope.schoolQualityKindSelected = $scope.schoolQuality[0].name;
				$scope.schoolQualityByKindColumnChart.series[0].name = $scope.schoolQuality[0].name;
				$scope.schoolQualityByKindColumnChart.series[0].data = $scope.schoolQuality[0].data;
				$scope.schoolQualityByKindColumnChart.options.yAxis.title.text = $scope.schoolQuality[0].name+"(%)";
				
				$scope.schoolQualityLastYearList.push({
					name: '省优质幼儿园的比例',
					number: hghQultyKndrgrtnPrcntgList[data.length-1]
				});
				$scope.schoolQualityLastYearList.push({
					name: '义务教育学校达省现代化学校办学标准的比例',
					number: stndrdCmplsryEduSchlPrcntgList[data.length-1]
				});
				$scope.schoolQualityLastYearList.push({
					name: '高中阶段达省定三星级以上学校的比例',
					number: thrStrLvlHghSchlPrcntgList[data.length-1]
				});
				
				$scope.contrib.push({
					name: '新增劳动力人均受教育年限',
					data: newLaborAvrgEduYearList,
					comment: ''
				});
				$scope.contrib.push({
					name: '主要劳动年龄人口平均受教育年限',
					data: mainLaborAvrgEduYearList,
					comment: ''
				});
				$scope.contrib.push({
					name: '主要劳动年龄人口受过高等教育的比例',
					data: mainLaborHghEduPrcntgList,
					comment: ''
				});
				$scope.contrib.push({
					name: '中等职业学校毕业生就业率',
					data: trdSchlGrdtEmplymntRateList,
					comment: ''
				});
				$scope.eduContribKindSelected = $scope.contrib[0].name;
				$scope.eduContribByKindBarChart.series[0].name = $scope.contrib[0].name;
				$scope.eduContribByKindBarChart.series[0].data = $scope.contrib[0].data;
				$scope.eduContribByKindBarChart.options.yAxis.title.text = $scope.contrib[0].name+"(年)";
				$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "年";
				
				$scope.contribLastYearList.push({
					name: '新增劳动力人均受教育年限',
					number: newLaborAvrgEduYearList[data.length-1]
				});
				$scope.contribLastYearList.push({
					name: '主要劳动年龄人口平均受教育年限',
					number: mainLaborAvrgEduYearList[data.length-1]
				});
				$scope.contribLastYearList.push({
					name: '主要劳动年龄人口受过高等教育的比例',
					number: mainLaborHghEduPrcntgList[data.length-1]
				});
				$scope.contribLastYearList.push({
					name: '中等职业学校毕业生就业率',
					number: trdSchlGrdtEmplymntRateList[data.length-1]
				});
				//
				$scope.enroll.push({
					name: '普通高校升学率',
					data: commonCollegeEnrollRateList,
					comment: ''
				});
				$scope.enroll.push({
					name: '普通高校本科升学率',
					data: commonCollegeUgrEnrollRateList,
					comment: ''
				});
				$scope.enroll.push({
					name: '高等职业学校毕业生就业率',
					data: highSchlGrdtEmplymntRateList,
					comment: ''
				});
				
				$scope.eduEnrollKindSelected = $scope.enroll[0].name;
				$scope.eduEnrollByKindBarChart.series[0].name = $scope.enroll[0].name;
				$scope.eduEnrollByKindBarChart.series[0].data = $scope.enroll[0].data;
				$scope.eduEnrollByKindBarChart.options.yAxis.title.text = $scope.enroll[0].name+"(年)";
				$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "年";
				
				$scope.enrollLastYearList.push({
					name: '普通高校升学率',
					number: commonCollegeEnrollRateList[data.length-1]
				});
				$scope.enrollLastYearList.push({
					name: '普通高校本科升学率',
					number: commonCollegeUgrEnrollRateList[data.length-1]
				});
				$scope.enrollLastYearList.push({
					name: '高等职业学校毕业生就业率',
					number: highSchlGrdtEmplymntRateList[data.length-1]
				});
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

    $scope.studyQualityByKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {
			                text: '年份'
			            },
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
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
	            text: '近五年小学学业合格率情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.schoolQualityByKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {
			                text: '年份'
			            },
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
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
	            text: '近五年省优质幼儿园的比例情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.eduEnrollByKindBarChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {
			                text: '年份'
			            },
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
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
	            text: '近五年省普通高校/高等职业学校教学成果'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.eduContribByKindBarChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {                                                       
			                text: ''                                              
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: ' millions'                                       
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
			        }
			},
	        title: {
	            text: '近五年新增劳动力人均受教育年限情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	//redio 点击事件
	$scope.studyQualityKindChange = function(studyQualityOne){
		$scope.studyQualityByKindColumnChart.title.text = "近五年"+studyQualityOne.name+"情况";
		$scope.studyQualityByKindColumnChart.series[0].data = studyQualityOne.data;
		$scope.studyQualityByKindColumnChart.series[0].name = studyQualityOne.name;
		$scope.studyQualityByKindColumnChart.options.yAxis.title.text = studyQualityOne.name+"(%)";
		$scope.studyQualityCommentSelected = studyQualityOne.comment;
	};
	$scope.schoolQualityKindChange = function(schoolQualityOne){
		$scope.schoolQualityByKindColumnChart.title.text = "近五年"+schoolQualityOne.name+"情况";
		$scope.schoolQualityByKindColumnChart.series[0].name = schoolQualityOne.name;
		$scope.schoolQualityByKindColumnChart.series[0].data = schoolQualityOne.data;
		$scope.schoolQualityByKindColumnChart.options.yAxis.title.text = schoolQualityOne.name+"(%)";
		$scope.schoolQualityCommentSelected = schoolQualityOne.comment;
	};
	$scope.contribKindChange = function(contribOne){
		$scope.eduContribByKindBarChart.title.text = "近五年"+contribOne.name+"情况";
		$scope.eduContribByKindBarChart.series[0].name = contribOne.name;
		$scope.eduContribByKindBarChart.series[0].data = contribOne.data;
		switch(contribOne.name.trim()){
		case '新增劳动力人均受教育年限':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "年";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(年)";
			break;
		case '主要劳动年龄人口平均受教育年限':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "年";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(年)";
			break;
		case '主要劳动年龄人口受过高等教育的比例':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(%)";
			break;
		case '中等职业学校毕业生就业率':
			$scope.eduContribByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduContribByKindBarChart.options.yAxis.title.text = contribOne.name+"(%)";
			break;
		}
		$scope.contribCommentSelected = contribOne.comment;
	};
	$scope.enrollKindChange = function(enrollOne){
		$scope.eduEnrollByKindBarChart.title.text = "近五年"+enrollOne.name+"情况";
		$scope.eduEnrollByKindBarChart.series[0].name = enrollOne.name;
		$scope.eduEnrollByKindBarChart.series[0].data = enrollOne.data;
		switch(enrollOne.name.trim()){
		case '普通高校升学率':
			$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduEnrollByKindBarChart.options.yAxis.title.text = enrollOne.name+"(%)";
			break;
		case '普通高校本科升学率':
			$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduEnrollByKindBarChart.options.yAxis.title.text = enrollOne.name+"(%)";
			break;
		case '高等职业学校毕业生就业率':
			$scope.eduEnrollByKindBarChart.options.tooltip.valueSuffix = "%";
			$scope.eduEnrollByKindBarChart.options.yAxis.title.text = enrollOne.name+"(%)";
			break;
		}
		$scope.enrollCommentSelected = enrollOne.comment;
	};

	params = {
		tableName: "EduGuaranteeData"
	};
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			var recentTime = lastObj.applyTime;
			
			var startOprtr = new Date(recentTime);
			var startDate = dateService.formatDate(moment(startOprtr.setFullYear(startOprtr.getFullYear()-4)).startOf('year')); //alert(startDate);
			var endDate =  dateService.formatDate(moment(recentTime).endOf('year'));  //alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "EduGuaranteeData",
				start: startDate,
				end: endDate
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				
				var data = JSOG.parse(JSOG.stringify(data.data));
		
				var kndrgrtnTchrJnrRateList = [];
				var prmrySchlTchrUndrgrdtRateList = [];
				var mdlSchlTchrUndrgrdtRateList = [];
				var hghSchlTchrPstgrdtRateList = [];
				
				var sctyEduInvstmntGrwthRateList = [];
				
				var pubFinanceEduFundList=[];//公共财政预算教育拨款（万元）
				var pubFinanceEduFundRateList=[];//公共财政预算教育拨款增减率
				var financeRegIncomeList=[];//财政经常性收入（亿元）
				var financeRegIncomeRateList=[];//财政经常性收入增减率
				var pubEduFundHigherRegIncomeRateList=[];//公共财政预算教育拨款增长高于财政经常性收入增长（%）
				var perEduExpenseRisePrimarySchlList=[];//生均公共财政预算教育事业费支出增长情况(普通小学（元）)
				var perEduExpenseRisePrimarySchlRateList=[];//生均公共财政预算教育事业费支出增长情况(普通小学（元）)增减率
				var perEduExpenseRiseMiddleSchlList=[];//生均公共财政预算教育事业费支出增长情况(普通中学（元）)
				var perEduExpenseRiseMiddleSchlRateList=[];//生均公共财政预算教育事业费支出增长情况(普通中学（元）)增减率
				var perEduExpenseRiseHighSchlList=[];//生均公共财政预算教育事业费支出增长情况(普通高中（元）)
				var perEduExpenseRiseHighSchlRateList=[];//生均公共财政预算教育事业费支出增长情况(普通高中（元）)增减率
				var perEduExpenseRiseSecVocSchlList=[];//生均公共财政预算教育事业费支出增长情况(中等职业学校（元）)
				var perEduExpenseRiseSecVocSchlRateList=[];//生均公共财政预算教育事业费支出增长情况(中等职业学校（元）)增减率
				var perPubFundRisePrimarySchlList=[];//生均公共财政预算公用经费支出增长情况 (普通小学（元）)
				var perPubFundRisePrimarySchlRateList=[];//生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率
				var perPubFundRiseMiddleSchlList=[];//生均公共财政预算公用经费支出增长情况 (普通中学（元）)
				var perPubFundRiseMiddleSchlRateList=[];//生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率
				var perPubFundRiseHighSchlList=[];//生均公共财政预算公用经费支出增长情况 (普通高中（元）)
				var perPubFundRiseHighSchlRateList=[];//生均公共财政预算公用经费支出增长情况 (普通高中（元）)增减率
				var perPubFundRiseSecVocSchlList=[];//生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)
				var perPubFundRiseSecVocSchlRateList=[];//生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)增减率
				var stateEduFinanceRateList=[];//国家财政性教育经费占国内生产总值的比例（%）
				var stateEduFinanceRateRateList=[];//国家财政性教育经费占国内生产总值的比例（%）增减率
				var pubEduFinanceRateList=[];//公共财政预算教育经费占公共财政预算支出的比例（%）
				var pubEduFinanceRateRateList=[];//公共财政预算教育经费占公共财政预算支出的比例（%）增减率
				
				var applyDate;
				
				for(var i=0; i<data.length; i++){
					kndrgrtnTchrJnrRateList.push(data[i].kndrgrtnTchrJnrRate);
					prmrySchlTchrUndrgrdtRateList.push(data[i].prmrySchlTchrUndrgrdtRate);
					mdlSchlTchrUndrgrdtRateList.push(data[i].mdlSchlTchrUndrgrdtRate);
					hghSchlTchrPstgrdtRateList.push(data[i].hghSchlTchrPstgrdtRate);
					
					sctyEduInvstmntGrwthRateList.push(data[i].sctyEduInvstmntGrwthRate);
					
					pubFinanceEduFundList.push(data[i].pubFinanceEduFund);//
					pubFinanceEduFundRateList.push(data[i].pubFinanceEduFundRate);
					financeRegIncomeList.push(data[i].financeRegIncome);
					financeRegIncomeRateList.push(data[i].financeRegIncomeRate);
					pubEduFundHigherRegIncomeRateList.push(data[i].pubEduFundHigherRegIncomeRate);
					perEduExpenseRisePrimarySchlList.push(data[i].perEduExpenseRisePrimarySchl);
					perEduExpenseRisePrimarySchlRateList.push(data[i].perEduExpenseRisePrimarySchlRate);
					perEduExpenseRiseMiddleSchlList.push(data[i].perEduExpenseRiseMiddleSchl);
					perEduExpenseRiseMiddleSchlRateList.push(data[i].perEduExpenseRiseMiddleSchlRate);
					perEduExpenseRiseHighSchlList.push(data[i].perEduExpenseRiseHighSchl);
					perEduExpenseRiseHighSchlRateList.push(data[i].perEduExpenseRiseHighSchlRate);
					perEduExpenseRiseSecVocSchlList.push(data[i].perEduExpenseRiseSecVocSchl);
					perEduExpenseRiseSecVocSchlRateList.push(data[i].perEduExpenseRiseSecVocSchlRate);
					perPubFundRisePrimarySchlList.push(data[i].perPubFundRisePrimarySchl);
					perPubFundRisePrimarySchlRateList.push(data[i].perPubFundRisePrimarySchlRate);
					perPubFundRiseMiddleSchlList.push(data[i].perPubFundRiseMiddleSchl);
					perPubFundRiseMiddleSchlRateList.push(data[i].perPubFundRiseMiddleSchlRate);
					perPubFundRiseHighSchlList.push(data[i].perPubFundRiseHighSchl);
					perPubFundRiseHighSchlRateList.push(data[i].perPubFundRiseHighSchlRate);
					perPubFundRiseSecVocSchlList.push(data[i].perPubFundRiseSecVocSchl);
					perPubFundRiseSecVocSchlRateList.push(data[i].perPubFundRiseSecVocSchlRate);
					stateEduFinanceRateList.push(data[i].stateEduFinanceRate);
					stateEduFinanceRateRateList.push(data[i].stateEduFinanceRateRate);
					pubEduFinanceRateList.push(data[i].pubEduFinanceRate);
					pubEduFinanceRateRateList.push(data[i].pubEduFinanceRateRate);//
					
					
					applyDate = new Date(data[i].applyTime);
					yearData.push(applyDate.getFullYear());
				}
				$scope.tchrGrntList.push({
					name: '幼儿园教师专科率',
					data: kndrgrtnTchrJnrRateList,
					comment: ''
				});
				$scope.tchrGrntList.push({
					name: '小学教师本科率',
					data: prmrySchlTchrUndrgrdtRateList,
					comment: ''
				});
				$scope.tchrGrntList.push({
					name: '初中教师本科率',
					data: mdlSchlTchrUndrgrdtRateList,
					comment: ''
				});
				$scope.tchrGrntList.push({
					name: '高中阶段教师研究生率',
					data: hghSchlTchrPstgrdtRateList,
					comment: ''
				});
				

				
				
				$scope.investGrntList.push({   //
					name: '公共财政预算教育拨款（万元）',
					data: pubFinanceEduFundList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '公共财政预算教育拨款增减率',
					data: pubFinanceEduFundRateList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '财政经常性收入（亿元）',
					data: financeRegIncomeList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '财政经常性收入增减率',
					data: financeRegIncomeRateList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '公共财政预算教育拨款增长高于财政经常性收入增长（%）',
					data: pubEduFundHigherRegIncomeRateList,
					comment: ''
				});
				$scope.perEduFundGrntList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)',
					data: perEduExpenseRisePrimarySchlList,
					comment: ''
				});
				$scope.perEduFundGrntRateList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)增减率',
					data: perEduExpenseRisePrimarySchlRateList,
					comment: ''
				});
				$scope.perEduFundGrntList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (普通中学（元）)',
					data: perEduExpenseRiseMiddleSchlList,
					comment: ''
				});
				$scope.perEduFundGrntRateList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (普通中学（元）)增减率',
					data: perEduExpenseRiseMiddleSchlRateList,
					comment: ''
				});
				$scope.perEduFundGrntList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)',
					data: perEduExpenseRiseHighSchlList,
					comment: ''
				});
				$scope.perEduFundGrntRateList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)增减率',
					data: perEduExpenseRiseHighSchlRateList,
					comment: ''
				});
				$scope.perEduFundGrntList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)',
					data: perEduExpenseRiseSecVocSchlList,
					comment: ''
				});
				$scope.perEduFundGrntRateList.push({   
					name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)增减率',
					data: perEduExpenseRiseSecVocSchlRateList,
					comment: ''
				});
				$scope.perFundGrntList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)',
					data: perPubFundRisePrimarySchlList,
					comment: ''
				});
				$scope.perFundGrntRateList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率',
					data: perPubFundRisePrimarySchlRateList,
					comment: ''
				});
				$scope.perFundGrntList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)',
					data: perPubFundRiseMiddleSchlList,
					comment: ''
				});
				$scope.perFundGrntRateList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率',
					data: perPubFundRiseMiddleSchlRateList,
					comment: ''
				});
				$scope.perFundGrntList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)',
					data: perPubFundRiseHighSchlList,
					comment: ''
				});
				$scope.perFundGrntRateList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)增减率',
					data: perPubFundRiseHighSchlRateList,
					comment: ''
				});
				$scope.perFundGrntList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)',
					data: perPubFundRiseSecVocSchlList,
					comment: ''
				});
				$scope.perFundGrntRateList.push({   
					name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)增减率',
					data: perPubFundRiseSecVocSchlRateList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '国家财政性教育经费占国内生产总值的比例（%）',
					data: stateEduFinanceRateList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '国家财政性教育经费占国内生产总值的比例（%）增减率',
					data: stateEduFinanceRateRateList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '公共财政预算教育经费占公共财政预算支出的比例（%）',
					data: pubEduFinanceRateList,
					comment: ''
				});
				$scope.investGrntList.push({   
					name: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
					data: pubEduFinanceRateRateList,
					comment: ''
				});
				
				$scope.tchrGrntKindSelected = $scope.tchrGrntList[0].name;
				$scope.tchrGrntByKindBarChart.series[0].name = $scope.tchrGrntList[0].name;
				$scope.tchrGrntByKindBarChart.series[0].data = $scope.tchrGrntList[0].data;
				$scope.tchrGrntByKindBarChart.options.yAxis.title.text = $scope.tchrGrntList[0].name+"(%)";
				
				$scope.pubFinEduChart.series[0].data=$scope.investGrntList[0].data;//
				$scope.pubFinEduChart.series[1].data=$scope.investGrntList[1].data;//
				$scope.financeRegIncomeChart.series[0].data=$scope.investGrntList[2].data;//
				$scope.financeRegIncomeChart.series[1].data=$scope.investGrntList[3].data;//
				$scope.HigherChart.series[0].data=$scope.investGrntList[4].data;//
				
				$scope.investGrntKindSelected = $scope.perEduFundGrntList[0].name;
				$scope.perEduFundChart.series[0].name = $scope.perEduFundGrntList[0].name;
				$scope.perEduFundChart.series[0].data = $scope.perEduFundGrntList[0].data;
				$scope.perEduFundChart.options.yAxis.title.text = $scope.perEduFundGrntList[0].name;
				
				$scope.investGrntRateKindSelected = $scope.perEduFundGrntRateList[0].name;
				$scope.perEduFundRateChart.series[0].name = $scope.perEduFundGrntRateList[0].name;
				$scope.perEduFundRateChart.series[0].data = $scope.perEduFundGrntRateList[0].data;
				$scope.perEduFundRateChart.options.yAxis.title.text = $scope.perEduFundGrntRateList[0].name;
				
				$scope.investpubGrntKindSelected = $scope.perFundGrntList[0].name;
				$scope.perFundChart.series[0].name = $scope.perFundGrntList[0].name;
				$scope.perFundChart.series[0].data = $scope.perFundGrntList[0].data;
				$scope.perFundChart.options.yAxis.title.text = $scope.perFundGrntList[0].name;
				
				$scope.investpubGrntRateKindSelected = $scope.perFundGrntRateList[0].name;
				$scope.perFundRateChart.series[0].name = $scope.perFundGrntRateList[0].name;
				$scope.perFundRateChart.series[0].data = $scope.perFundGrntRateList[0].data;
				$scope.perFundRateChart.options.yAxis.title.text = $scope.perFundGrntRateList[0].name;
				
				$scope.stateChart.series[0].data=$scope.investGrntList[5].data;//
				$scope.stateChart.series[1].data=$scope.investGrntList[6].data;//
				$scope.pubEduFinanceChart.series[0].data=$scope.investGrntList[7].data;//
				$scope.pubEduFinanceChart.series[1].data=$scope.investGrntList[8].data;//
			
				
				$scope.tchrGrntLastYearList.push({
					name: '幼儿园教师专科率',
					number: kndrgrtnTchrJnrRateList[data.length-1]
				});
				$scope.tchrGrntLastYearList.push({
					name: '小学教师本科率',
					number: prmrySchlTchrUndrgrdtRateList[data.length-1]
				});
				$scope.tchrGrntLastYearList.push({
					name: '初中教师本科率',
					number: mdlSchlTchrUndrgrdtRateList[data.length-1]
				});
				$scope.tchrGrntLastYearList.push({
					name: '高中阶段教师研究生率',
					number: hghSchlTchrPstgrdtRateList[data.length-1]
				});
				
				$scope.investGrntLastYearList.push({
					name: '公共财政预算教育拨款（万元）',
					number: pubFinanceEduFundList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '公共财政预算教育拨款增减率',
					number: pubFinanceEduFundRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '财政经常性收入（亿元）',
					number: financeRegIncomeList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '财政经常性收入增减率',
					number: financeRegIncomeRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '公共财政预算教育拨款增长高于财政经常性收入增长（%）',
					number: pubEduFundHigherRegIncomeRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)',
					number: perEduExpenseRisePrimarySchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算教育事业费支出增长情况 (普通小学（元）)增减率',
					number: perEduExpenseRisePrimarySchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算教育事业费支出增长情况 (普通中学（元）)',
					number: perEduExpenseRiseMiddleSchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率',
					number: perEduExpenseRiseMiddleSchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)',
					number: perEduExpenseRiseHighSchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算教育事业费支出增长情况 (普通高中（元）)增减率',
					number: perEduExpenseRiseHighSchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)',
					number: perEduExpenseRiseSecVocSchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算教育事业费支出增长情况 (中等职业学校（元）)增减率',
					number: perEduExpenseRiseSecVocSchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)',
					number: perPubFundRisePrimarySchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率',
					number: perPubFundRisePrimarySchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)',
					number: perPubFundRiseMiddleSchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (普通中学（元）)增减率',
					number: perPubFundRiseMiddleSchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)',
					number: perPubFundRiseHighSchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (普通高中（元）)增减率',
					number: perPubFundRiseHighSchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)',
					number: perPubFundRiseSecVocSchlList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '生均公共财政预算公用经费支出增长情况 (中等职业学校（元）)增减率',
					number: perPubFundRiseSecVocSchlRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '国家财政性教育经费占国内生产总值的比例（%）',
					number: stateEduFinanceRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '国家财政性教育经费占国内生产总值的比例（%）增减率',
					number: stateEduFinanceRateRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '公共财政预算教育经费占公共财政预算支出的比例（%）',
					number: pubEduFinanceRateList[data.length-1]
				});
				$scope.investGrntLastYearList.push({
					name: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
					number: pubEduFinanceRateRateList[data.length-1]
				});
				
				$scope.lastYear = yearData[data.length-1];
				$scope.invstGrntBarChart.series[0].data = sctyEduInvstmntGrwthRateList;
				
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

	$scope.tchrGrntByKindBarChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {                                                       
			                text: ''                                              
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: '%'                                       
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
			        }
			},
	        title: {
	            text: '近五年幼儿园教师专科率情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
		};
	$scope.invstGrntBarChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {                                                       
			                text: '增长比例 (%)'                                             
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: '%'                                       
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
			        }
			},
	        title: {
	            text: '近五年全社会教育投入增长比例情况'
	        },
			series: [{
		            name: '增长比例',
		            data: []
		    }]
		};
	$scope.pubFinEduChart={
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
						zoomType: 'xy'                                                   
			        },                                                                  
			        xAxis: {                                                           
			            categories:yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: [{ // Primary yAxis
			            labels: {
			                format: '{value}%',
			            },
			            title: {
			                text: '公共财政预算教育拨款增减率',
			            }
			        }, { // Secondary yAxis
			            title: {
			                text: '公共财政预算教育拨款（万元）',
			              
			            },
			            labels: {
			                format: '{value} 万元',
			               
			            },
			            opposite: true
			        }],                                                                 
			        tooltip: {                                                         
			        	shared: true                                       
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
			        }
			},
	        title: {
	            text: '近五年公共财政预算教育拨款情况'
	        },
			series: [{
	            name: '公共财政预算教育拨款（万元）',
	            type: 'column',
	            yAxis: 1,
	            data: [],
	            tooltip: {
	                valueSuffix: '万元'
	            }

	        }, {
	            name: '公共财政预算教育拨款增减率',
	            type: 'spline',
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }
	        }]
		    };
	$scope.financeRegIncomeChart={
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
						zoomType: 'xy'                                                   
			        },                                                                  
			        xAxis: {                                                           
			            categories:yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: [{ // Primary yAxis
			            labels: {
			                format: '{value}%',
			            },
			            title: {
			                text: '财政经常性收入增减率',
			            }
			        }, { // Secondary yAxis
			            title: {
			                text: '财政经常性收入（亿元）',
			              
			            },
			            labels: {
			                format: '{value} 亿元',
			               
			            },
			            opposite: true
			        }],                                                                 
			        tooltip: {                                                         
			        	shared: true                                       
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
			        }
			},
	        title: {
	            text: '近五年财政经常性收入情况'
	        },
			series: [{
	            name: '财政经常性收入（亿元）',
	            type: 'column',
	            yAxis: 1,
	            data: [],
	            tooltip: {
	                valueSuffix: '亿元'
	            }

	        }, {
	            name: '财政经常性收入增减率',
	            type: 'spline',
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }
	        }]
		    };
	$scope.HigherChart={
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
						type: 'spline',                                                
			        },                                                                  
			        xAxis: {                                                           
			            categories:yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: [{ // Primary yAxis
			            labels: {
			                format: '{value}%',
			            },
			            title: {
			                text: '公共财政预算教育拨款增长高于财政经常性收入增长增减率',
			            }
			        }],                                                                 
			        tooltip: {                                                         
			        	shared: true                                       
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
			        }
			},
	        title: {
	            text: '近五年公共财政预算教育拨款增长高于财政经常性收入增长情况'
	        },
			series: [ {
	            name: '公共财政预算教育拨款增长高于财政经常性收入增长增减率',
	            
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }
	        }]
		    };
	$scope.perEduFundChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {  useHTML:true,                                                     
			                text: ''                                              
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: '元'                                       
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
			        }
			},
	        title: {
	            text: '近五年生均公共财政预算教育事业费支出增长情况 (普通小学（元）)情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
	};
	$scope.perEduFundRateChart={
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
						type: 'spline',                                                
			        },                                                                  
			        xAxis: {                                                           
			            categories:yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: { // Primary yAxis
			            labels: {
			                format: '{value}%',
			            },
			            title: {
			                text: '',
			            }
			        },                                                                 
			        tooltip: {                                                         
			        	shared: true                                       
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
			        }
			},
	        title: {
	            text: '近五年生均公共财政预算教育事业费支出增长情况 (普通小学（元）)增减率情况'
	        },
			series: [ {
	            name: '',
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }
	        }]
		    };
	$scope.perFundChart = {
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
			            type: 'column'                                                    
			        },                                                                  
			        xAxis: {                                                           
			            categories: yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: {                                                           
			            min: 0,                                                        
			            title: {                                                       
			                text: ''                                              
			            },                                                             
			            labels: {                                                      
			                overflow: 'justify'                                        
			            }                                                              
			        },                                                                 
			        tooltip: {                                                         
			            valueSuffix: '元'                                       
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
			        }
			},
	        title: {
	            text: '近五年生均公共财政预算公用经费支出增长情况 (普通小学（元）)情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
	};
	$scope.perFundRateChart={
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
						type: 'spline',                                                
			        },                                                                  
			        xAxis: {                                                           
			            categories:yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: { // Primary yAxis
			            labels: {
			                format: '{value}%',
			            },
			            title: {
			                text: '',
			            }
			        },                                                                   
			        tooltip: {                                                         
			        	shared: true                                       
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
			        }
			},
	        title: {
	            text: '近五年生均公共财政预算公用经费支出增长情况 (普通小学（元）)增减率情况'
	        },
			series: [ {
	            name: '',       
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }
	        }]
		    };
	$scope.stateChart={
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
						zoomType: 'xy'                                                   
			        },                                                                  
			        xAxis: {                                                           
			            categories:yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: [{ // Primary yAxis
			            labels: {
			                format: '{value}%',
			            },
			            title: {
			                text: '国家财政性教育经费占国内生产总值的比例（%）增减率',
			            }
			        }, { // Secondary yAxis
			            title: {
			                text: '国家财政性教育经费占国内生产总值的比例（%）',
			              
			            },
			            labels: {
			                format: '{value}%',
			               
			            },
			            opposite: true
			        }],                                                                 
			        tooltip: {                                                         
			        	shared: true                                       
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
			        }
			},
	        title: {
	            text: '近五年国家财政性教育经费占国内生产总值的比例情况'
	        },
			series: [{
	            name: '国家财政性教育经费占国内生产总值的比例（%）',
	            type: 'spline',
	            yAxis: 1,
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }

	        }, {
	            name: '国家财政性教育经费占国内生产总值的比例（%）增减率',
	            type: 'spline',
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }
	        }]
		    };
	$scope.pubEduFinanceChart={
			options:{
				credits: {
					enabled: false
					},
					chart: {                                                           
						zoomType: 'xy'                                                   
			        },                                                                  
			        xAxis: {                                                           
			            categories:yearData,
			            title: {
			                text: '年份'
			            },                                                             
			        },                                                                 
			        yAxis: [{ // Primary yAxis
			            labels: {
			                format: '{value}%',
			            },
			            title: {
			                text: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
			            }
			        }, { // Secondary yAxis
			            title: {
			                text: '公共财政预算教育经费占公共财政预算支出的比例（%）',
			              
			            },
			            labels: {
			                format: '{value}%',
			               
			            },
			            opposite: true
			        }],                                                                 
			        tooltip: {                                                         
			        	shared: true                                       
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
			        }
			},
	        title: {
	            text: '近五年公共财政预算教育经费占公共财政预算支出的比例情况'
	        },
			series: [{
	            name: '公共财政预算教育经费占公共财政预算支出的比例（%）',
	            type: 'spline',
	            yAxis: 1,
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }

	        }, {
	            name: '公共财政预算教育经费占公共财政预算支出的比例（%）增减率',
	            type: 'spline',
	            data: [],
	            tooltip: {
	                valueSuffix: '%'
	            }
	        }]
		    };
	$scope.tchrGrntKindChange = function(tchrGrntOne){
		$scope.tchrGrntByKindBarChart.title.text = "近五年"+tchrGrntOne.name+"情况";
		$scope.tchrGrntByKindBarChart.series[0].name = tchrGrntOne.name;
		$scope.tchrGrntByKindBarChart.series[0].data = tchrGrntOne.data;
		$scope.tchrGrntByKindBarChart.options.yAxis.title.text = tchrGrntOne.name+"(%)";
		$scope.tchrGrntListCommentSelected = tchrGrntOne.comment;
	};

	$scope.investGrntKindChange = function(investGrntOne){
		$scope.perEduFundChart.title.text = "近五年"+investGrntOne.name+"情况";
		$scope.perEduFundChart.series[0].name = investGrntOne.name;
		$scope.perEduFundChart.series[0].data = investGrntOne.data;
		$scope.perEduFundChart.options.yAxis.title.text = investGrntOne.name;
		$scope.investGrntListCommentSelected = investGrntOne.comment;
	};
	
	$scope.investGrntRateKindChange = function(investGrntTwo){
		$scope.perEduFundRateChart.title.text = "近五年"+investGrntTwo.name+"情况";
		$scope.perEduFundRateChart.series[0].name = investGrntTwo.name;
		$scope.perEduFundRateChart.series[0].data = investGrntTwo.data;
		$scope.perEduFundRateChart.options.yAxis.title.text = investGrntTwo.name;
		$scope.investGrntRateListCommentSelected = investGrntTwo.comment;
	};
	
	$scope.investpubGrntKindChange = function(investpubGrntOne){
		$scope.perFundChart.title.text = "近五年"+investpubGrntOne.name+"情况";
		$scope.perFundChart.series[0].name = investpubGrntOne.name;
		$scope.perFundChart.series[0].data = investpubGrntOne.data;
		$scope.perFundChart.options.yAxis.title.text = investpubGrntOne.name;
		$scope.investpubGrntListCommentSelected = investpubGrntOne.comment;
	};
	
	$scope.investpubGrntRateKindChange = function(investpubGrntTwo){
		$scope.perFundRateChart.title.text = "近五年"+investpubGrntTwo.name+"情况";
		$scope.perFundRateChart.series[0].name = investpubGrntTwo.name;
		$scope.perFundRateChart.series[0].data = investpubGrntTwo.data;
		$scope.perFundRateChart.options.yAxis.title.text = investpubGrntTwo.name;
		$scope.investpubGrntRateListCommentSelected = investpubGrntTwo.comment;
	};
};