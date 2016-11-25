export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';

	const chartStore = (unit, height, type, title, yTitle, xTitle, simpleData, normalData, xData) => {
		return {
			options: {
				chart: {
					height: height,
					type: type
				},
				tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: '<small>{point.key}'+ xTitle+yTitle+'</small><table>',
                    pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right"><b>{point.y:,0f}'+unit+'</b></td></tr>',
                    footerFormat: '</table>',
                    valueDecimals: 2
                },
                exporting: {
					enabled: false, // 取消打印menu
				},
			},
			credits: {
				enabled: false, // 不显示商标
			},
			title: {
				text: title,
				style: {
					fontSize: "13px"
				}
			},
			xAxis: {
				categories: xData,
				tickInterval: 1,
				title: {
                    text: xTitle
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
				startOnTick: false,
				title: {
					text: yTitle+'('+unit+')'
				},
			},
			legend: {
				layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 100,
                borderWidth: 0
			},
			series:[{
				color: 'rgb(124, 181, 236)',
				name: "简易程序",
				data: simpleData
			}, {
				color: 'rgb(31, 194, 43)',
				name: "一般程序",
				data: normalData
			}]
		};
	}
	const pieStore = (title, tooltip, data, dataFormat) => {
		return {
			options: {
				chart: {
					height: 600,
					plotBackgroundColor: null,
					plotBorderWidth: null,
					plotShadow: false
				},
				credits:{
					enabled:false
				},
				exporting: {
					enabled: false, // 取消打印menu
				},
				title: {
					text: title,
					style: {
						fontSize: '13px'
					}
				},
				tooltip: {
					pointFormat: tooltip
				},
				legend: {
					lineHeight: 10,
				},
				plotOptions: {
					pie: {
						allowPointSelect: true,
						cursor: 'pointer',
						dataLabels: {
							enabled: false,
							color: '#000000',
							connectorColor: '#000000',
							format: dataFormat
						},
						showInLegend: true
					}					
                }
            },
			series: [{
				type: 'pie',
				name: '',
				data: data
			}]       
		};
	}
	const jQueryDOMToDos = () => {
		$(".navbar2return").show(0); // 显示 返回
		$(".navbar3position").show(0); // 显示 当前三级界面位置

        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
        $(".navTopShowMark").hide(0); // 隐藏 KPI状态KPI分类
        
		$('#cmPunishTownTooglePanel').hide(0);
		$('#cmPunishTownToogleButton').click(() => {
			$('#cmPunishTownTooglePanel').toggle(0);
		});
		$('#cmPunishTownTooglePanel').click(() => {
			$('#cmPunishTownTooglePanel').hide(300);
		});
	}();

	let headers = {
    };
	let params = {
		tableName: "AdministrativePenaltyData"
	};
	let body = ["year",'month'];
	$rootScope.loading = true;
	qService.httpPostWithToken(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			let sysTime = dateService.getSystemTime(); // 获取到系统设置的时间
			let lastYear = data.data.year, 
				lastMonth = data.data.month;
			let lastTime = new Date(lastYear+"-"+(lastMonth + 1)+"-"+"01");
			if (sysTime < lastTime) {
				lastTime = sysTime; // 取到最后有效时间
			}
			lastYear = moment(lastTime).year();
			lastMonth = moment(lastTime).month();
			let params = {
				tableName: "AyhzData"
			}
			let body = {
				"year": {
			        "value1": lastYear,
			        "queryType": "eq",
			        "valueType": "innt"
		        },
		        "month":{
			        "value1":lastMonth,
			        "queryType":"eq",
			        "valueType":"innt"
		        }
			}
			// 行政处罚案由汇总reasons
			$rootScope.loading = true;
			qService.httpPostWithToken(dataDetailFactory.advancedQuery, params, headers, body).then((data) => {
				if (data.errorCode == "NO_ERROR") {
					let reasons = [], // 所有案由
						timesByReason = {}, // 各个案由数量
						moneyByReason = {}; // 各个案由处罚金额
					for (var i = data.data.length - 1; i >= 0; i--) {
						if (reasons.indexOf(data.data[i].ay) === -1) {
							reasons.push(data.data[i].ay);
							timesByReason[data.data[i].ay] = data.data[i].sl;
							moneyByReason[data.data[i].ay] = data.data[i].cfje;
						} else {
							timesByReason[data.data[i].ay] += data.data[i].sl;
							moneyByReason[data.data[i].ay] += data.data[i].cfje;
						}
					}
					// 整理成highcharts所需格式
					let timesByReasonList = [],
						moneyByReasonList = [];
					for (var i = reasons.length - 1; i >= 0; i--) {
						timesByReasonList[i] = [reasons[i], timesByReason[reasons[i]]];
						moneyByReasonList[i] = [reasons[i], moneyByReason[reasons[i]]];
					}
					$scope.change2To = (type) => {
						switch(type) {
							case "time":
								$scope.reasonsShowData = timesByReasonList;
								$scope.reasonsDataUnit = "次";
								$scope.tab1 = true;
								$scope.tab2 = false;
								$scope.pieChart = pieStore(lastYear+"年"+lastMonth+"月份行政处罚案由汇总(案件数量)",
									'<b>案件数量</b>:{point.y:1.f}起</b>',
									timesByReasonList,
									'{point.percentage:.1f} %');
							break;
							case "money":
								$scope.reasonsShowData = moneyByReasonList;
								$scope.reasonsDataUnit = "元";
								$scope.tab1 = false;
								$scope.tab2 = true;
								$scope.pieChart = pieStore(lastYear+"年"+lastMonth+"月份行政处罚案由汇总(处罚金额)",
									'<b>处罚金额</b>:{point.y:1.f}元</b>',
									moneyByReasonList,
									'{point.percentage:.1f} %');
							break;
						}
					};
					$scope.change2To("time");
				} else {}
			}, (err) => {
				if (err.errorCode == "UNAUTHORIZED") {
					$state.go('portal');
				} else {}
			}).finally(() => {
		        $rootScope.loading = false;
		    });
			// 获取各执法中队处理案件详情
			params = {
				tableName: "AdministrativePenaltyData"
			}
		    body = {
				"year": {
			        "value1": lastYear,
			        "queryType": "eq",
			        "valueType": "innt"
		        }
			}
			$rootScope.loading = true;
			qService.httpPostWithToken(dataDetailFactory.advancedQuery, params, headers, body).then((data) => {
				if (data.errorCode == "NO_ERROR") {
					let lochus = [], // 所有中队
						simpletimes = [], simpletimesSum = 0,
						simplemoney = [], simplemoneySum = 0,
						normaltimes = [], normaltimesSum = 0,
						normalmoney = [], normalmoneySum = 0;
					for (var i = data.data.length - 1; i >= 0; i--) {
						if (lochus.indexOf(data.data[i].zdname) === -1 && data.data[i].month === lastMonth) {
							lochus.push(data.data[i].zdname);
							simpletimes.push(data.data[i].jy_BYAFS); simpletimesSum += data.data[i].jy_BYAFS;
							simplemoney.push(data.data[i].jy_BYJE); simplemoneySum += data.data[i].jy_BYJE;
							normaltimes.push(data.data[i].yb_BYAFS); normaltimesSum += data.data[i].yb_BYAFS;
							normalmoney.push(data.data[i].yb_BYJE); normalmoneySum += data.data[i].yb_BYJE;
						};
					}
					$scope.oneword1 = lastYear+"年"+lastMonth+"月份全市城市管理行政处罚案件数 " + (simpletimesSum+normaltimesSum) + " 起 , 处罚金额共 "+ (simplemoneySum+normalmoneySum) +" 元。"
					$scope.change3To = (type) => {
						switch(type) {
							case "time":
								// (type, title, yTitle, xTitle, simpleData, normalData, xData)
								$scope.lochusChart = chartStore("起", 500, "bar", lastYear+"年"+lastMonth+"月份各中队行政处罚案件数",
									'案件数量',
									'中队',
									simpletimes,
									normaltimes,
									lochus);
								$scope.totalChart = chartStore("起", 350, "column", lastYear+"年"+lastMonth+"月份城管执法行政处罚案件数",
									'案件数量',
									'',
									[simpletimesSum],
									[normaltimesSum],
									["总计"]);
							break;
							case "money":
								$scope.lochusChart = chartStore("元", 500, "bar", lastYear+"年"+lastMonth+"月份各中队行政处罚金额",
									'处罚金额',
									'中队',
									simplemoney,
									normalmoney,
									lochus);
								$scope.totalChart = chartStore("元", 350, "column", lastYear+"年"+lastMonth+"月份城管执法行政处罚金额",
									'处罚金额',
									'',
									[simplemoneySum],
									[normalmoneySum],
									["总计"]);
							break;
						};
						$scope.change2To(type);
					};
					$scope.change3To("time");
				} else {}
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
};