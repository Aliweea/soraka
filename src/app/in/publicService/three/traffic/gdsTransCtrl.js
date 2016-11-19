export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#cmrefuse-s1').focus();
		$('#psTrafficTogglePanel').hide(0);
		$('#psTrafficToggleButton').click(() => {
			$('#psTrafficTogglePanel').toggle(0);
		})
	}();
	
	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMS0xNSAxODowODo1OCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjQiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiNSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI2IiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiI3IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiI4IiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiI5IiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMCIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjIwIiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn1dfSwiZXhwaXJlcyI6MTQ4MDE0NjA5NTczMiwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.FGoM5cgKKtIX3azkquWK9GBo+wFpcgnTFJCKvxiP6eU="
    };
    var pieColors = new Array('#009ACD', '#EE4000');
	$scope.gdsTrckNumLastMonthList = [];
	$scope.gdsTrckTngLastMonthList = [];
	$scope.TrckLastMonth;
	
	//charts data
	var monthData = [];
	var gdsTrckNumPieChartData = [];
	$scope.gdsTrckNumList = [];
	$scope.gdsTrckTngList = [];
    var recentTime;
	let params = {
		tableName: "GoodsTranspData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			var lastObj = JSOG.parse(JSOG.stringify(data.data));
			recentTime = lastObj.applyTime;
			
			var startDate = dateService.formatDate(moment(recentTime).startOf('year'));  //alert(startDate);
			var endDate =  dateService.formatDate(moment(recentTime).endOf('month'));   //alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "GoodsTranspData",
				start: startDate,
				end: endDate
			}
			let currentType = "quantity"; // 标记当前处于车次还是吨数状态
			$scope.table1 = true;
			$scope.currentName = "公交车";
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {		
				var data = JSOG.parse(JSOG.stringify(data.data));
				
				var ordnryGdsTrckNumList = [];
				var dngrsGdsTrckNumList = [];
				var ordnryGdsTrckTngList = [];
				var dngrsGdsTrckTngList = [];
				
				$scope.displayYear = new Date(data[data.length-1].applyTime).getFullYear();
				
				$scope.gdsTrckNumKindColumnChart.title.text = $scope.displayYear+'年各月份普通货车存量情况';
				$scope.gdsTrckTngKindColumnChart.title.text = $scope.displayYear+'年各月份普通货车吨位数情况';
				
				var applyDate;
				
				for(var i=0; i<data.length; i++){
					ordnryGdsTrckNumList.push(parseInt(data[i].ordnryGdsTrckNum));
					dngrsGdsTrckNumList.push(parseInt(data[i].dngrsGdsTrckNum));
					ordnryGdsTrckTngList.push(parseInt(data[i].ordnryGdsTrckTng));
					dngrsGdsTrckTngList.push(parseInt(data[i].dngrsGdsTrckTng));
					
					applyDate = new Date(data[i].applyTime);
					monthData.push(applyDate.getMonth()+1);
				}
			
				gdsTrckNumPieChartData.push({
					name: '普通货车',
					y: ordnryGdsTrckNumList[data.length-1]
				});
				gdsTrckNumPieChartData.push({
					name: '危险品货车',
					y: dngrsGdsTrckNumList[data.length-1]
				});
				$scope.gdsTrckNumLastMonthList.push({
					name: '普通货车',
					number: ordnryGdsTrckNumList[data.length-1]
				});
				$scope.gdsTrckNumLastMonthList.push({
					name: '危险品货车',
					number: dngrsGdsTrckNumList[data.length-1]
				});
				$scope.gdsTrckNumLastMonthList.push({
					name: '合计',
					number: (ordnryGdsTrckNumList[data.length-1]+dngrsGdsTrckNumList[data.length-1])
				});
				$scope.TrckLastMonth = monthData[data.length-1];
				$scope.gdsTrckNumPieChart.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月货车存量分布情况";
				$scope.gdsTrckNumList.push({
					name: '普通货车',
					data: ordnryGdsTrckNumList
				});
				$scope.gdsTrckNumList.push({
					name: '危险品货车',
					data: dngrsGdsTrckNumList
				});
				$scope.gdsTrckKindSelected = $scope.gdsTrckNumList[0].name;
				$scope.gdsTrckNumKindColumnChart.series[0].data = $scope.gdsTrckNumList[0].data;
				$scope.gdsTrckTngList.push({
					name: '普通货车吨位数',
					data: ordnryGdsTrckTngList
				});
				$scope.gdsTrckTngList.push({
					name: '危险品货车吨位数',
					data: dngrsGdsTrckTngList
				});
				$scope.gdsTrckTngLastMonthList.push({
					name: '普通货车',
					number: ordnryGdsTrckTngList[data.length-1]
				});
				$scope.gdsTrckTngLastMonthList.push({
					name: '危险品货车',
					number: dngrsGdsTrckTngList[data.length-1]
				});
				$scope.gdsTrckTngKindSelected = $scope.gdsTrckTngList[0].name;
				$scope.gdsTrckTngKindColumnChart.series[0].data = $scope.gdsTrckTngList[0].data;
	
	
				$scope.changeChoice = (choice) => {
					$('#psTrafficTogglePanel').hide(0);
					if(currentType == "quantity"){
						$scope.gdsTrckKindChange(choice);
					}else if(currentType == "weight"){
						$scope.gdsTrckTngKindChange(choice);
					}
				};
				$scope.changeChart = (type) => {
					console.log(type);
					switch (type) {
						case "quantity":		
							$scope.kindList = $scope.gdsTrckNumList;
							$scope.kindSelected = $scope.gdsTrckKindSelected;
							$scope.chart1 = $scope.gdsTrckNumKindColumnChart;
							$scope.chart2 = $scope.gdsTrckNumPieChart;
							$scope.tableTitle = $scope.displayYear +"年"+ $scope.TrckLastMonth+ "月货车存量分布情况";
							$scope.list = $scope.gdsTrckNumLastMonthList;
							$scope.type = "选择货车类别";
							$('#cmtraffic-s1').addClass('activeTab');
							$('#cmtraffic-s2').removeClass('activeTab');
							currentType = "quantity";
							break;
						case "weight":	
							$scope.kindList = $scope.gdsTrckTngList;
							$scope.kindSelected = $scope.gdsTrckTngKindSelected;
							$scope.chart1 = $scope.gdsTrckTngKindColumnChart;
							$scope.tableTitle = $scope.displayYear+ "年" +$scope.TrckLastMonth+"月货车吨位数分布情况";
							$scope.list = $scope.gdsTrckTngLastMonthList;
							$scope.type = "选择货车吨位数类别";							
							$('#cmtraffic-s2').addClass('activeTab');
							$('#cmtraffic-s1').removeClass('activeTab');
							currentType = "weight";
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
    highchartsConfiguration();
	function highchartsConfiguration(){
		$scope.gdsTrckNumPieChart = {
			    options:{
			        colors: pieColors,
			        credits: {
			            enabled: false
			        },
			        chart: {
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false
			        },
			        title: {
			            text: ''
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
		            data: gdsTrckNumPieChartData
		        }]
			};
		$scope.gdsTrckNumKindColumnChart = {
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
			            categories: monthData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '货车数 (辆)'
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
			                '<td style="padding:0"><b>{point.y:.0f}辆</b></td></tr>',
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
		            text: ''
		        },
				series: [{
			            name: '货车数',
			            data: []
			    }]
			};
		$scope.gdsTrckTngKindColumnChart = {
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
			            categories: monthData
			        },
			        yAxis: {
			            min: 0,
			            title: {
			                text: '货车吨位数 (吨)'
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
			                '<td style="padding:0"><b>{point.y:.0f}吨</b></td></tr>',
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
		            text: ''
		        },
				series: [{
			            name: '吨位数',
			            data: []
			    }]
			};
	}
	//redio 点击事件()
	$scope.gdsTrckKindChange = function(gdsTrckNumOne){
			$scope.gdsTrckNumKindColumnChart.title.text = $scope.displayYear+"年各月份"+gdsTrckNumOne.name+"存量情况";
			$scope.gdsTrckNumKindColumnChart.series[0].data = gdsTrckNumOne.data;
	};
	$scope.gdsTrckTngKindChange = function(gdsTrckTngOne){
			$scope.gdsTrckTngKindColumnChart.title.text = $scope.displayYear+"年各月份"+gdsTrckTngOne.name+"情况";
			$scope.gdsTrckTngKindColumnChart.series[0].data = gdsTrckTngOne.data;
	};
};