export default($scope, $rootScope, kpiDetailService,$state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	// const jQueryDOMToDos = () => {
	// 	$(".navbar2position").hide(0); // 显示当前位置
	// 	$(".navbar2return").show(0); // 显示返回按钮
	// 	$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
	// 	$('.navTopShowhealthcare').show(0);
	// 	$('#cmrefuse-s1').focus();
	// 	$('#psHealthcareTogglePanel').hide(0);
	// 	$('#psHealthcareToggleButton').click(() => {
	// 		$('#psHealthcareTogglePanel').toggle(0);
	// 	})
	// }();
	const jQueryDOMToDos = () => {
		$(".navbar2return").show(0); // 显示 返回
		$(".navbar3position").show(0); // 显示 当前三级界面位置

        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
        $(".navTopShowMark").hide(0); // 隐藏 KPI状态KPI分类
        $('.navTopShowhealthcare').show(0);
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
	var medicalServiceKind=["门诊和急诊","住院","120急救"];
	var monthData=[];
	$scope.medicalServicePatientsByKindList=[];
	$scope.medicalInstitutionByKindSumList=[];
	var medicalWorkersPieChartData = [];
	var medicalWorkersYearData = [];
	$scope.medicalWorkersYearsList = [];
	let headers = {
    };
	let params = {
		tableName: "HealthServiceData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPostWithToken(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
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
				var emrgncyAndoutpatientList=[];
				var firstAid120List = [];
				var applyMonth;
				for(var i=0; i<data.length; i++){
					outpatientNumList.push(data[i].outpatientNum);
					inpatientNumList.push(data[i].inpatientNum);
					emrgncyPatientNumList.push(data[i].emrgncyPatientNum);
					emrgncyAndoutpatientList.push(data[i].emrgncyAndoutpatient);
					firstAid120List.push(data[i].firstAid120);
					applyMonth = new Date(data[i].applyTime);
					monthData.push(applyMonth.getMonth()+1);
				}
				// $scope.medicalServicePatientsByKindList.push({
				// 	name: medicalServiceKind[0],
				// 	data: outpatientNumList
				// 	});
				$scope.medicalServicePatientsByKindList.push({
					name: medicalServiceKind[0],
					data: emrgncyAndoutpatientList
					});
				$scope.medicalServicePatientsByKindList.push({
					name: medicalServiceKind[1],
					data: inpatientNumList
					});
				$scope.medicalServicePatientsByKindList.push({
					name: medicalServiceKind[2],
					data: firstAid120List
					});
				$scope.medicalServiceSelected = $scope.medicalServicePatientsByKindList[0].name;
				//$scope.medicalServiceColumnChart1.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月全市门诊及急诊情况";
				$scope.medicalServiceColumnChart2.options.title.text = $scope.displayYear+'年'+monthData[data.length-1]+"月全市住院及120急救情况";
				$scope.medicalServiceByKindLineChart.title.text = $scope.displayYear+'年全市门诊服务情况';
				$scope.displayMonth = monthData[data.length-1];
				//medicalServiceColumnChartData.push(outpatientNumList[data.length-1]);
				//medicalServiceColumnChartData.push(emrgncyPatientNumList[data.length-1]);
                medicalServiceColumnChartData.push(emrgncyAndoutpatientList[data.length-1]);
				medicalServiceColumnChartData.push(inpatientNumList[data.length-1]);
				medicalServiceColumnChartData.push(firstAid120List[data.length-1]);
				$scope.medicalServiceByKindLineChart.series[0].name = $scope.medicalServicePatientsByKindList[0].name;
			    $scope.medicalServiceByKindLineChart.series[0].data = $scope.medicalServicePatientsByKindList[0].data;
			    //medicalServiceColumnChartData1.push(medicalServiceColumnChartData[0]);
			    //medicalServiceColumnChartData1.push(medicalServiceColumnChartData[1]);
			    //medicalServiceColumnChartData2.push(medicalServiceColumnChartData[2]);
			    //medicalServiceColumnChartData2.push(medicalServiceColumnChartData[3]);
                medicalServiceColumnChartData2.push(medicalServiceColumnChartData[1]);
                medicalServiceColumnChartData2.push(medicalServiceColumnChartData[2]);
				$scope.chart3 = $scope.medicalServiceColumnChart2;
				$scope.changeChoice = (choice) => {
					$('#psHealthcareTogglePanel').hide(0);
					if(currentType == "resource"){
						$scope.medicalInstitutionKindChange(choice);
					}else if(currentType == "service"){
						$scope.medicalServiceKindChange(choice);
					}
				};
				$scope.changeChart = (type) => {
					$('#psHealthcareTogglePanel').hide(0);
						switch (type) {
							case "resource":
								$scope.typeTitle = "选择医院类别";
								$scope.title1 = "医疗机构";
								$scope.list = $scope.medicalInstitutionByKindSumList;
								$scope.listSelected = $scope.medicalInstitutionSelected;
								$scope.chart1 = $scope.medicalInstitutionSumByKindChart;
								$scope.chart2 = $scope.medicalInstitutionSumChart;
								$scope.tab1 = true;
								$scope.tab2 = false;
								currentType = "resource";
								break;
							case "service":
								$scope.typeTitle = "选择诊疗类别";
								$scope.title1 = "诊疗服务";
								$scope.list = $scope.medicalServicePatientsByKindList;
								$scope.listSelected = $scope.medicalServiceSelected;
								$scope.chart1 = $scope.medicalServiceByKindLineChart;
							//	$scope.chart2 = $scope.medicalServiceColumnChart1;
								$scope.tab1 = false;
								$scope.tab2 = true;
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
    qService.httpPostWithToken(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
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
    qService.httpPostWithToken(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
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
	        	height:300,
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
	        // tooltip: {
	        //     enabled : false 
	        // },
	       tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: '{point.name}',
                    pointFormat: '{point.y:.0f}人',
                    footerFormat: '</table>',
                    valueDecimals: 2
                },
	        plotOptions: {
	            pie: {
	                allowPointSelect: true,
	                cursor: 'pointer',
	                // dataLabels: {
	                //     enabled: true,
	                //     color: '#000000',
	                //     connectorColor: '#000000',
	                //     format: '<b>{point.name}</b>: {point.y:.0f}人'
	                // },
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
	            style: {
					fontSize: "13px"
				}
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

	// $scope.medicalServiceColumnChart1 = {
	//     options:{
	//     	credits: {
	//             enabled: false
	//             },
	//         chart: {
	//             type: 'column'
	//            // margin: [ 50, 50, 100, 80]
	//         },
	//         exporting: {
	// 				enabled: false, // 取消打印menu
	// 			},
	//         title: {
	//             text: '',
	//             style: {
	// 				fontSize: "13px"
	// 			}
	//         },
	//         xAxis: {
	//             categories: ['门诊人次', '急诊人次'],
	//             tickInterval: 1,
	//             tickmarkPlacement: 'on',
     //            labels: {
     //                rotation: -45,
     //                align: 'right',
     //                step: 1,
     //                style: {
	// 					fontSize: "10px"
	// 				}
     //            }
	//         },
	//         yAxis: {
	//             min: 0,
	//             title: {
	//                 text: '诊疗人数(人次)'
	//             },
	//             labels: {
	// 				formatter: function() {
	// 					return this.value
	// 				}
	// 			}
	//         },
	//         legend: {
	//             enabled: false
	//         },
	//         tooltip: {
	//             pointFormat: '诊疗人次: <b>{point.y:.0f}人次</b>',
	//         }
	//     },
	//     series: [{
	//             name: '诊疗人次',
	//             data: medicalServiceColumnChartData1,
	//     }]
	// };

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
	            style: {
					fontSize: "13px"
				}
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