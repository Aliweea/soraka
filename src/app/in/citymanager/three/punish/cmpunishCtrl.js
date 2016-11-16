export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';

	const chartStore = (height, type, title, yTitle, xTitle, simpleData, normalData, xData) => {
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
                        '<td style="text-align: right"><b>{point.y:,0f}</b></td></tr>',
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
					text: yTitle
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
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#cmPunishTownTooglePanel').hide(0);
		$('#cmPunishTownToogleButton').click(() => {
			$('#cmPunishTownTooglePanel').toggle(0);
		});
		$('#cmPunishTownTooglePanel').click(() => {
			$('#cmPunishTownTooglePanel').hide(300);
		});
	}();

	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMS0xNSAxODowODo1OCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjQiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiNSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI2IiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiI3IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiI4IiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiI5IiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMCIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjIwIiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn1dfSwiZXhwaXJlcyI6MTQ4MDE0NjA5NTczMiwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.FGoM5cgKKtIX3azkquWK9GBo+wFpcgnTFJCKvxiP6eU="
    };
	let params = {
		tableName: "AdministrativePenaltyData"
	};
	let body = ["year",'month'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
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
			qService.httpPost(dataDetailFactory.advancedQuery, params, headers, body).then((data) => {
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
								$('#cmrefuse-s1').addClass('activeTab');
								$('#cmrefuse-s2').removeClass('activeTab');
								$scope.pieChart = pieStore(lastYear+"年"+lastMonth+"月份行政处罚案由汇总(案件数量)",
									'<b>案件数量</b>:{point.y:1.f}起</b>',
									timesByReasonList,
									'{point.percentage:.1f} %');
							break;
							case "money":
								$scope.reasonsShowData = moneyByReasonList;
								$scope.reasonsDataUnit = "元";
								$('#cmrefuse-s2').addClass('activeTab');
								$('#cmrefuse-s1').removeClass('activeTab');
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
			qService.httpPost(dataDetailFactory.advancedQuery, params, headers, body).then((data) => {
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
								$scope.lochusChart = chartStore(500, "bar", lastYear+"年"+lastMonth+"月份各中队行政处罚案件数",
									'案件数量(起)',
									'中队',
									simpletimes,
									normaltimes,
									lochus);
								$scope.totalChart = chartStore(350, "column", lastYear+"年"+lastMonth+"月份城管执法行政处罚案件数",
									'案件数量(起)',
									'',
									[simpletimesSum],
									[normaltimesSum],
									["总计"]);
							break;
							case "money":
								$scope.lochusChart = chartStore(500, "bar", lastYear+"年"+lastMonth+"月份各中队行政处罚金额",
									'处罚金额(元)',
									'中队',
									simplemoney,
									normalmoney,
									lochus);
								$scope.totalChart = chartStore(350, "column", lastYear+"年"+lastMonth+"月份城管执法行政处罚金额",
									'处罚金额(元)',
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