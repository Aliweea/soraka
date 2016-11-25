export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	// const jQueryDOMToDos = () => {
	// 	$(".navbar2position").hide(0); // 显示当前位置
	// 	$(".navbar2return").show(0); // 显示返回按钮
	// 	$(".navTopShowtraffic").show(0); 
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

	var recentTime;
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');

	$scope.transAdminSumList = [];
	var monthData = [];  
	var monthData2 = [];
	var transAdminPenaltyPieChartData = [];
	var transAdminHandlePieChartData = [];
	var adminPermissionList = [];
	var transAdminPrmsnPieChartData = [];
	var servicePermissionList = [];
	var transSrvcPrmsnPieChartData = [];
	$scope.permissionList = [];
	var srvcMonthData = [];
	$scope.transAdminSumLastYearList = [];
	let headers = {
		
    };
	let params = {
		tableName: "TrnspAdminData"
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
		
			var startDate = dateService.formatDate(moment(recentTime).startOf('year')); // alert(startDate);
			var endDate =  dateService.formatDate(moment(recentTime).endOf('month'));  // alert(endDate);
			// 最新一天数据
			let params = {
				tableName: "TrnspAdminData",
				start: startDate,
				end: endDate
			}
			let currentType = "enforce"; // 标记当前处于车次还是吨数状态
			$scope.table1 = true;
			$scope.currentName = "公交车";
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
	
				var data = JSOG.parse(JSOG.stringify(data.data));
				$scope.transAdminColumnChart.title.text = $scope.displayYear+'年各月份交通行政处罚案件情况';
				
				var roadPenalty=[];
				var roadHandle=[];         //公路
				var transAdminPenalty=[]; 
				var transAdminHandle=[];  //运管
				var channelPenalty=[];           
				var channelHandle=[];     //航道  
				var maritimePenalty=[];           
				var maritimeHandle=[];    //海事
				var transBuildMarketPenalty=[];   
				var transBuildMarketHandle=[];     //交通建设市场
				var portPenalty=[];            
				var portHandle=[];        //港口
				
				var transAdminPenaltySumList = [];
				var transAdminHandleSumList = [];
				
				for(var i=0; i<data.length; i++){
					switch(data[i].caseType.id){
					case 6054: //公路
						{
						roadPenalty.push(parseInt(data[i].penaltyCaseSum));
						roadHandle.push(parseInt(data[i].handleCaseSum));
						}
						
						break;
					case 6055://运管
						{
						transAdminPenalty.push(parseInt(data[i].penaltyCaseSum));
						transAdminHandle.push(parseInt(data[i].handleCaseSum));
						}
						break;
					case 6056://航道
						{
						channelPenalty.push(parseInt(data[i].penaltyCaseSum));
						channelHandle.push(parseInt(data[i].handleCaseSum));
						}
						break;
					case 6057://海事
						{
						maritimePenalty.push(parseInt(data[i].penaltyCaseSum));
						maritimeHandle.push(parseInt(data[i].handleCaseSum));
						}
						break;
					case 6058://交通建设市场
						{
						transBuildMarketPenalty.push(parseInt(data[i].penaltyCaseSum));
						transBuildMarketHandle.push(parseInt(data[i].handleCaseSum));
						}
						break;
					case 6059://港口
						{
						portPenalty.push(parseInt(data[i].penaltyCaseSum));
						portHandle.push(parseInt(data[i].handleCaseSum));
						}
						break;
					}
				}
				var applyMonth1;
				for(var j=0; j<data.length/6; j++){
					var penaltySum = roadPenalty[j]+transAdminPenalty[j]+channelPenalty[j]+maritimePenalty[j]+transBuildMarketPenalty[j]+portPenalty[j];
					var handleSum = roadHandle[j]+transAdminHandle[j]+channelHandle[j]+maritimeHandle[j]+transBuildMarketHandle[j]+portHandle[j];
					transAdminPenaltySumList.push(penaltySum);
					transAdminHandleSumList.push(handleSum);
					applyMonth1 = new Date(data[j*6].applyTime);
					monthData.push(applyMonth1.getMonth()+1);
				}
				$scope.transAdminPenaltyPieChart.options.title.text = $scope.displayYear+"年"+monthData[data.length/6-1]+"月交通行政处罚案件分布情况";
				transAdminPenaltyPieChartData.push({
					name: '公路',
					y: roadPenalty[data.length/6-1]
				});
				transAdminPenaltyPieChartData.push({
					name: '运管',
					y: transAdminPenalty[data.length/6-1]
				});
				transAdminPenaltyPieChartData.push({
					name: '航道',
					y: channelPenalty[data.length/6-1]
				});
				transAdminPenaltyPieChartData.push({
					name: '海事',
					y: maritimePenalty[data.length/6-1]
				});
				transAdminPenaltyPieChartData.push({
					name: '交通建设市场',
					y: transBuildMarketPenalty[data.length/6-1]
				});
				transAdminPenaltyPieChartData.push({
					name: '港口',
					y: portPenalty[data.length/6-1]
				});
				$scope.transAdminHandlePieChart.options.title.text = $scope.displayYear+"年"+monthData[data.length/6-1]+"月交通行政处理案件分布情况";
				transAdminHandlePieChartData.push({
					name: '公路',
					y: roadHandle[data.length/6-1]
				});
				transAdminHandlePieChartData.push({
					name: '运管',
					y: transAdminHandle[data.length/6-1]
				});
				transAdminHandlePieChartData.push({
					name: '航道',
					y: channelHandle[data.length/6-1]
				});
				transAdminHandlePieChartData.push({
					name: '海事',
					y: maritimeHandle[data.length/6-1]
				});
				transAdminHandlePieChartData.push({
					name: '交通建设市场',
					y: transBuildMarketHandle[data.length/6-1]
				});
				transAdminHandlePieChartData.push({
					name: '港口',
					y: portHandle[data.length/6-1]
				});
				$scope.transAdminSumList.push({
					name : '行政处罚',
					data: transAdminPenaltySumList,
					comment: ''
				});
				$scope.transAdminSumList.push({
					name : '行政处理',
					data: transAdminHandleSumList,
					comment: ''
				});
				$scope.transAdminKindSelected = $scope.transAdminSumList[0].name;
				$scope.transAdminColumnChart.series[0].data = $scope.transAdminSumList[0].data;
				$scope.transAdminSumLastYearList.push({
					name : '行政处罚',
					number: transAdminPenaltySumList[transAdminPenaltySumList.length-1]
				});
				$scope.transAdminSumLastYearList.push({
					name : '行政处理',
					number: transAdminHandleSumList[transAdminHandleSumList.length-1]
				});
	
				$scope.changeChoice = (choice) => {
					$('#psTrafficTogglePanel').hide(0);
					if(currentType == "enforce"){
						$scope.transAdminKindChange(choice);
					}else if(currentType == "permit"){
						$scope.permissionKindChange(choice);
					}
				};
				$scope.changeChart = (type) => {
					$('#psTrafficTogglePanel').hide(0);
					switch (type) {
						case "enforce":		
							$scope.kindList = $scope.transAdminSumList;
							$scope.kindSelected = $scope.transAdminKindSelected;
							$scope.chart1 = $scope.transAdminColumnChart;
							$scope.chart2 = $scope.transAdminPenaltyPieChart;
							$scope.chart3 = $scope.transAdminHandlePieChart;
							$scope.type = "选择交通行政案件类别";
							$scope.tab1 = true;
							$scope.tab2 = false;
							$scope.title1= "行政执法";
							currentType = "enforce";
							break;
						case "permit":	
							$scope.kindList = $scope.permissionList;
							$scope.kindSelected = $scope.permissionKindSelected;
							$scope.chart1 = $scope.transPrmsnColumnChart;
							$scope.chart2 = $scope.transAdminPrmsnPieChart;
							$scope.chart3 = $scope.transSrvcPrmsnPieChart;
							$scope.type = "选择交通许可类别";	
							$scope.tab2 = true;
							$scope.tab1 = false;	
							$scope.title1= "许可";					
							currentType = "permit";
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
			params = {
				tableName: "TrnspPrmsnData",
				start: startDate,
				end: endDate
			}
		    qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				var data = JSOG.parse(JSOG.stringify(data.data));
				$scope.transPrmsnColumnChart.title.text = $scope.displayYear+'年各月份交通行政许可情况';
				
				var roadPermission=[];   //公路许可60
				var transPermission=[]; //道路运输许可61
				var waterTransPermission=[];    //水路运输许可62
				var channelPermission=[];     //航道许可63
				var maritimePermission=[];    //海事许可64
				var portPermission=[];       //港口65
				
				for(var i=0; i<data.length; i++){
					switch(data[i].prmsnType.id){
					case 6060:
						roadPermission.push(parseInt(data[i].hndlPrmsnNum));
						break;
					case 6061:
						transPermission.push(parseInt(data[i].hndlPrmsnNum));
						break;
					case 6062:
						waterTransPermission.push(parseInt(data[i].hndlPrmsnNum));
						break;
					case 6063:
						channelPermission.push(parseInt(data[i].hndlPrmsnNum));
						break;
					case 6064:
						maritimePermission.push(parseInt(data[i].hndlPrmsnNum));
						break;
					case 6065:
						portPermission.push(parseInt(data[i].hndlPrmsnNum));
						break;
					}
				}
				var applyMonth2;
				for(var j=0; j<data.length/6; j++){
					var adminPermissionSum = roadPermission[j]+transPermission[j]+waterTransPermission[j]+channelPermission[j]+maritimePermission[j]+portPermission[j];
					adminPermissionList.push(adminPermissionSum);
					applyMonth2 = new Date(data[j*6].applyTime);
					monthData2.push(applyMonth2.getMonth()+1);
				}
				$scope.transAdminPrmsnPieChart.options.title.text = $scope.displayYear+'年'+monthData2[data.length/6-1]+'月交通行政许可分布情况';
				transAdminPrmsnPieChartData.push(
					['公路许可', roadPermission[data.length/6-1]]
					);
				transAdminPrmsnPieChartData.push(
					['道路运输许可', transPermission[data.length/6-1]]
					);
				transAdminPrmsnPieChartData.push(
					['水路运输许可', waterTransPermission[data.length/6-1]]
					);
				transAdminPrmsnPieChartData.push(
					['航道许可', channelPermission[data.length/6-1]]
					);
				transAdminPrmsnPieChartData.push(
					['海事许可', maritimePermission[data.length/6-1]]
					);
				transAdminPrmsnPieChartData.push(
					['港口', portPermission[data.length/6-1]]
					);
			}, (err) => {
				if (err.errorCode == "UNAUTHORIZED") {
					$state.go('portal');
				} else {}
			}).finally(() => {
		        $rootScope.loading = false;
		    });

		    params = {
				tableName: "TrnspSrvcPrmsnData",
				start: startDate,
				end: endDate
			}
		    qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {		
				var data = JSOG.parse(JSOG.stringify(data.data));
				var taxiDriver=[];       //出租车驾驶员上岗证66
				var transCrtfc=[];      //客货运从业资格证67
				var waterTransPermission=[];    //客运标志牌68
				var roadTransCrtfc=[];        //道路运输证配发69
				var other=[];          //其他70
				
				for(var i=0; i<data.length; i++){
					switch(data[i].srvcPrmsnType.id){
					case 6066:
						taxiDriver.push(parseInt(data[i].number));
						break;
					case 6067:
						transCrtfc.push(parseInt(data[i].number));
						break;
					case 6068:
						waterTransPermission.push(parseInt(data[i].number));
						break;
					case 6069:
						roadTransCrtfc.push(parseInt(data[i].number));
						break;
					case 6070:
						other.push(parseInt(data[i].number));
						break;
					}
				}
				var applyMonth3;
				for(var j=0; j<data.length/5; j++){
					var servicePermissionSum = taxiDriver[j]+transCrtfc[j]+waterTransPermission[j]+roadTransCrtfc[j]+other[j];
					servicePermissionList.push(servicePermissionSum);
					applyMonth3 = new Date(data[j*5].applyTime);
					srvcMonthData.push(applyMonth3.getMonth()+1);
				}
				$scope.transSrvcPrmsnPieChart.options.title.text = $scope.displayYear+'年'+srvcMonthData[data.length/5-1]+'月交通服务类许可分布情况';
				//alert(data.length/5-1);
				//alert("2  "+monthData[10]);
				transSrvcPrmsnPieChartData.push(
					['出租车驾驶员上岗证', taxiDriver[data.length/5-1]]
					);
				transSrvcPrmsnPieChartData.push(
					['客货运从业资格证', transCrtfc[data.length/5-1]]
					);
				transSrvcPrmsnPieChartData.push(
					['客运标志牌', waterTransPermission[data.length/5-1]]
					);
				transSrvcPrmsnPieChartData.push(
					['道路运输证配发', roadTransCrtfc[data.length/5-1]]
					);
				transSrvcPrmsnPieChartData.push(
					['其他', other[data.length/5-1]]
					);
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
	
	var startOprtr1 = new Date(dateService.getSystemTime());
	//var startOprtr1 = new Date('2014-12-20');
	var startDateMonthly = dateService.formatDate(moment(startOprtr1.setMonth(0)).startOf('month'));
	var endOprtr1 = new Date(dateService.getSystemTime());
	//var endOprtr1 = new Date('2014-12-20');
	var endDateMonthly =  dateService.formatDate(moment(endOprtr1).endOf('month'));	
    $scope.permissionList.push({
		name: '行政许可',
		data: adminPermissionList
	},{
		name: '服务类许可',
		data: servicePermissionList
	});
	$scope.permissionKindSelected = $scope.permissionList[0].name;
	
	//highCharts
	function highchartsConfiguration(){
		$scope.transAdminPenaltyPieChart = {
				options:{
					colors: pieColors,
					credits: {
						enabled: false
					},
					exporting: {
						enabled: false, // 取消打印menu
					},
					chart: {
						height: 300,
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
			    	    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
			        },
			        legend: {
						lineHeight: 10,
					},
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    color: '#000000',
			                    connectorColor: '#000000',
			                    format: '<b>{point.name}</b>: {point.y:.0f} 起'
			                }
			            }
			        }
				},
				series: [{
		            type: 'pie',
		            name: '占比',
		            data: transAdminPenaltyPieChartData
		        }]
		};
		$scope.transAdminHandlePieChart = {
				options:{
					colors: pieColors,
					credits: {
						enabled: false
						},
					exporting: {
						enabled: false, // 取消打印menu
					},
					chart: {
						height: 300,
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
			    	    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    color: '#000000',
			                    connectorColor: '#000000',
			                    format: '<b>{point.name}</b>: {point.y:.0f} 起'
			                }
			            }
			        }
				},
				series: [{
		            type: 'pie',
		            name: '占比',
		            data: transAdminHandlePieChartData
		        }]
		};
		$scope.transAdminColumnChart = {
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
			                text: '案件数 (起)'
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y:.0f}起</b></td></tr>',
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
			            name: '案件数',
			            data: []
			    }]
		};
		$scope.transAdminPrmsnPieChart = {
				options:{
					colors: pieColors,
					credits: {
						enabled: false
						},
					exporting: {
						enabled: false, // 取消打印menu
					},
					chart: {
						height: 300,
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
			    	    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    color: '#000000',
			                    connectorColor: '#000000',
			                    format: '<b>{point.name}</b>: {point.y:.0f} 起'
			                }
			            }
			        }
				},
				series: [{
		            type: 'pie',
		            name: '占比',
		            data: transAdminPrmsnPieChartData
		        }]
		};
		$scope.transSrvcPrmsnPieChart = {
				options:{
					colors: pieColors,
					credits: {
						enabled: false
						},
					exporting: {
						enabled: false, // 取消打印menu
					},
					chart: {
						height: 300,
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
			    	    pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
			        },
			        plotOptions: {
			            pie: {
			                allowPointSelect: true,
			                cursor: 'pointer',
			                dataLabels: {
			                    enabled: true,
			                    color: '#000000',
			                    connectorColor: '#000000',
			                    format: '<b>{point.name}</b>: {point.y:.0f} 起'
			                }
			            }
			        }
				},
				series: [{
		            type: 'pie',
		            name: '占比',
		            data: transSrvcPrmsnPieChartData
		        }]
		};
		$scope.transPrmsnColumnChart = {
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
			                text: '许可数 (起)'
			            }
			        },
			        tooltip: {
			            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
			            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
			                '<td style="padding:0"><b>{point.y:.0f}起</b></td></tr>',
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
							fontSize: '13px',
							color:'black'
						}
		        },
				series: [{
			            name: '许可数',
			            data: adminPermissionList
			    }]
		};
	}
	//radio点击事件
	$scope.transAdminKindChange = function(transAdminOne){
		
		$scope.transAdminColumnChart.title.text = $scope.displayYear+'年各月份交通'+transAdminOne.name+'案件情况';
		$scope.transAdminColumnChart.series[0].data = transAdminOne.data;
		$scope.transAdminSumCommentSelected = transAdminOne.comment;
	};

	$scope.permissionKindChange = function(permissionOne){
			
		$scope.transPrmsnColumnChart.title.text = $scope.displayYear+'年各月份交通'+permissionOne.name+'情况';
		$scope.transPrmsnColumnChart.series[0].data = permissionOne.data;
	};
};