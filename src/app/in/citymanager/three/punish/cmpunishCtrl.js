export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';

	const chartStore = (type, title, yTitle, xTitle, simpleData, normalData, xData) => {
		return {
			options: {
				chart: {
					type: type
				},
				tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: '<small>{point.key}'+ xTitle+'</small><table>',
                    pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right"><b>{point.y} '+ yTitle+'</b></td></tr>',
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
					fontSize: "15px"
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
						fontSize: '15px'
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

	let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMyIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiNCIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjUiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjYiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifSx7IkBpZCI6IjciLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiOCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiOSIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIxMCIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6OSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibmFtZSI6IueJqeS7t+WxgCIsImRlc2NyaXB0aW9uIjoiV0pKX+eJqeS7t+WxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MTYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMC0xNiAyMTo0MTozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMi0wOCAxNDo1ODo1NiIsIm5hbWUiOiLpgq7mlL/lsYAiLCJkZXNjcmlwdGlvbiI6IllaSl/pgq7mlL/lsYAifSx7IkBpZCI6IjEzIiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxNCIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTYiLCJpZCI6MjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm5hbWUiOiLmtojpmLLlpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlhGRERf5raI6Ziy5aSn6ZifIn0seyJAaWQiOiIxNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjIwIiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn0seyJAaWQiOiIyMSIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjI4LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJuYW1lIjoi5Z+O566h5bGAIiwiZGVzY3JpcHRpb24iOiJDR0pf5Z+O566h5bGAIn1dfSwiZXhwaXJlcyI6MTQ3OTgyMTc0MTY0OSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.JUDLwxyDXSAtPolQ5aznMGkehbEiEx+v3mN+xk0ol2I=";
	let headers = {
		"X-Auth-Token":token
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
									'<b>案件数量</b>:{point.y:1.f}(起)</b>',
									timesByReasonList,
									'{point.percentage:.1f} %');
							break;
							case "money":
								$scope.reasonsShowData = moneyByReasonList;
								$scope.reasonsDataUnit = "元";
								$('#cmrefuse-s2').addClass('activeTab');
								$('#cmrefuse-s1').removeClass('activeTab');
								$scope.pieChart = pieStore(lastYear+"年"+lastMonth+"月份行政处罚案由汇总(处罚金额)",
									'<b>处罚金额</b>:{point.y:1.f}(元)</b>',
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
								$scope.lochusChart = chartStore("bar", lastYear+"年"+lastMonth+"月份各中队行政处罚案件数",
									'案件数量(起)',
									'中队',
									simpletimes,
									normaltimes,
									lochus);
								$scope.totalChart = chartStore("column", lastYear+"年"+lastMonth+"月份城管执法行政处罚案件数",
									'案件数量(起)',
									'中队',
									[simpletimesSum],
									[normaltimesSum],
									["总计"]);
							break;
							case "money":
								$scope.lochusChart = chartStore("bar", lastYear+"年"+lastMonth+"月份各中队行政处罚金额",
									'处罚金额(元)',
									'中队',
									simplemoney,
									normalmoney,
									lochus);
								$scope.totalChart = chartStore("column", lastYear+"年"+lastMonth+"月份城管执法行政处罚金额",
									'处罚金额(元)',
									'中队',
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