export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	// const jQueryDOMToDos = () => {
	// 	$(".navbar2position").hide(0); // 显示当前位置
	// 	$(".navbar2return").show(0); // 显示返回按钮
	// 	$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
	// 	$('#cmrefuse-s1').focus();
	// 	$('#psTrafficTogglePanel').hide(0);
	// 	$('#psTrafficToggleButton').click(() => {
	// 		$('#psTrafficTogglePanel').toggle(0);
	// 	})
	// }();
	const jQueryDOMToDos = () => {
		$(".navbar2return").show(0); // 显示 返回
		$(".navbar3position").show(0); // 显示 当前三级界面位置

        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
        $(".navTopShowMark").hide(0); // 隐藏 KPI状态KPI分类
        $('.navTopShowtraffic').show(0);
		$('#psTrafficTogglePanel').hide(0);
		$('#psTrafficToggleButton').click(() => {
			$('#psTrafficTogglePanel').toggle(0);
		})
	}();

	let headers = {

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
	qService.httpPostWithToken(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
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
					$('#psTrafficTogglePanel').hide(0);
					switch (type) {
						case "quantity":		
							$scope.kindList = $scope.gdsTrckNumList;
							$scope.kindSelected = $scope.gdsTrckKindSelected;
							$scope.chart1 = $scope.gdsTrckNumKindColumnChart;
							$scope.chart2 = $scope.gdsTrckNumPieChart;
							$scope.tableTitle = $scope.displayYear +"年"+ $scope.TrckLastMonth+ "月货车存量分布情况";
							$scope.list = $scope.gdsTrckNumLastMonthList;
							$scope.tab1 = true;
							$scope.tab2 = false;
							$scope.union = "辆";
							$scope.title1 = "货车数量";
							$scope.type = "选择货车类别";
							currentType = "quantity";
							break;
						case "weight":	
							$scope.kindList = $scope.gdsTrckTngList;
							$scope.kindSelected = $scope.gdsTrckTngKindSelected;
							$scope.chart1 = $scope.gdsTrckTngKindColumnChart;
							$scope.tableTitle = $scope.displayYear+ "年" +$scope.TrckLastMonth+"月货车吨位数分布情况";
							$scope.list = $scope.gdsTrckTngLastMonthList;
							$scope.tab2 = true;
							$scope.tab1 = false;
							$scope.union = "吨";
							$scope.title1 = "货车吨位数";
							$scope.type = "选择货车吨位数类别";							
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
			        exporting: {
						enabled: false, // 取消打印menu
					},
			        chart: {
			        	height: 400,
			            plotBackgroundColor: null,
			            plotBorderWidth: null,
			            plotShadow: false
			        },
			        title: {
			            text: '',
			            style: {
							fontSize: '13px'
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
		            data: gdsTrckNumPieChartData
		        }]
			};
		$scope.gdsTrckNumKindColumnChart = {
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
		            text: '',
		            style: {
						fontSize: '13px'
					}
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
		            text: '',
		            style: {
						fontSize: '13px'
					}
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