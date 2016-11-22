export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';

	const chartStore = (height, type, title, yTitle, xTitle, unit, xData, yData) => {
		return {
			options: {
				chart: {
					height: height,
					type: type
				},
				tooltip: {
                    shared: true,
                    useHTML: true,
                    headerFormat: '<small>{point.key}' + xTitle + '</small><table>',
                    pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
                        '<td style="text-align: right"><b>{point.y:,0f}' + unit + '</b></td></tr>',
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
					text: yTitle + "(" + unit + ")"
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
				color: '#2F4172',
				name: yTitle,
				data: yData
			}]
		};
	}
	const spiderStore = (title, dept, ttpFormat, xData, yData) => {
		return {
			options:{	
				chart: {
					height: 280,
					polar: true,
					type: 'line'
				},
				exporting: {
					enabled: false, // 取消打印menu
				},
				title: {
					text: title,
					style: {
						fontSize: "13px"
					},
				},
				pane: {
					size: '65%'
				},
				xAxis: {
					categories: xData,
					tickmarkPlacement: 'on',
					lineWidth: 0
				},  
				yAxis: {
					gridLineInterpolation: 'polygon',
					lineWidth: 0,
					min: 0
				},
				tooltip: {
					shared: true,
					pointFormat: '<span style="color:{series.color}">{series.name}: <b>'+ttpFormat+'</b><br/>'
				},
				legend: {
					align: 'right',
					verticalAlign: 'top',
					y: 70,
					layout: 'vertical',
					enabled: false
				},
				credits:{
					enabled:false
				}
			},
			series: [{
				name: dept,
				data: yData,
				pointPlacement: 'on'
			}],
		}
	}
	const jQueryDOMToDos = () => {
		$(".navbar2return").show(0); // 显示 返回
		$(".navbar3position").show(0); // 显示 当前三级界面位置

        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
        $(".navTopShowMark").hide(0); // 隐藏 KPI状态KPI分类

		$("#cmIcmIndexTooglePanel").hide(0);
		$('#cmIcmIndexToogleButton').click( ()=> {
			$("#cmIcmIndexTooglePanel").toggle(0);
		})
		$("#cmIcmIndexAccTogglePanel").hide(0);
		$('#cmIcmIndexAccToggleButton').click(() => {
			$("#cmIcmIndexAccTogglePanel").toggle(0);
		})
		$("#cmIcmDeptTogglePanel").hide(0);
		$('#cmIcmDeptToggleButton').click(() => {
			$("#cmIcmDeptTogglePanel").toggle(0);
		})
		$("#cmIcmHisDeptTogglePanel").hide(0);
		$('#cmIcmHisDeptToggleButton').click(() => {
			$("#cmIcmHisDeptTogglePanel").toggle(0);
		})
		$("#cmIcmHisIndexTogglePanel").hide(0);
		$('#cmIcmHisIndexToggleButton').click(() => {
			$("#cmIcmHisIndexTogglePanel").toggle(0);
		})
	}();

	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMC0yMSAxMTowMToxNCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI0IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiI1IiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI2IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjciLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjgiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjkiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjExIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMTUiLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxNyIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIyMCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjI1IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifV19LCJleHBpcmVzIjoxNDgwNjU1OTU1OTU4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25Mb2NrZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.PT3kqmzkjZtV98yDr6kvK2gErGk8wsHUq0Krf+GOtGU="
    };
	let params = {
		tableName: "CityManagerJianduData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			let sysTime = dateService.getSystemTime(); // 获取到系统设置的时间
			let lastTime = dateService.formatDate(data.data.applyTime); // 获取到数据库最后一条数据的时间
			if (sysTime < lastTime) {
				lastTime = sysTime;
			}
			// 最新一天数据
			let params = {
				tableName: "CityManagerJianduData",
				start: lastTime,
				end: lastTime
			}
			let indexCategory = ["立案数","总结案数","应处置数","处置数","处置率","按时处置数","按时处置率","超期未处置数","延期数","延期率","返工数","返工率"],
				indexUnitMap = {
					"立案数":"起",
					"总结案数":"起",
					"应处置数":"起",
					"处置数":"起",
					"处置率":"%",
					"按时处置数":"起",
					"按时处置率":"%",
					"超期未处置数":"起",
					"延期数":"起",
					"延期率":"%",
					"返工数":"起",
					"返工率":"%"
				},
				indexAbbr = ["las","zjas","yczs","czs","czl","asczs","asczl","cqwczs","yqs","yql","fgs","fgl"];
			$scope.indexCategory = indexCategory;
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				if (data.errorCode == "NO_ERROR") {
					let departmentsCategory = []; // 所有的单位名称
					$scope.keyValue1 = 0, // 关键指标数据
					$scope.keyValue2 = 0, // 关键指标数据
					$scope.keyValue3 = 0; // 关键指标数据
					for (var i = 0; i < data.data.length; i++) {
						if (departmentsCategory.indexOf(data.data[i].dept != -1)) {
							departmentsCategory.push(data.data[i].dept); // 所有的单位名称
						}
						$scope.keyValue1 += data.data[i].las; // 关键指标数据
						$scope.keyValue2 += data.data[i].yczs; // 关键指标数据
						$scope.keyValue3 += data.data[i].czs; // 关键指标数据
					}
					// 用于html中的ng-repeat按钮
					$scope.indexs = {};
					for (var i = 0; i < indexCategory.length; i++) {
						$scope.indexs[indexCategory[i]] = indexAbbr[i];
					};
					$scope.changeIndex1 = (name, index) => {
						$("#cmIcmIndexTooglePanel").hide(0);
						let departmentsData = [];
						for (var i = 0; i < data.data.length; i++) {
							departmentsData.push(data.data[i][index]);
						}
						$scope.chart1 = chartStore(500, "bar",
							moment(lastTime).format("YYYY年MM月DD日")+"各单位数字城管案件"+name,
							name,
							"",
							indexUnitMap[name],
							departmentsCategory,
							departmentsData);
					}
					$scope.changeIndex1("应处置数", "yczs");
					// 蜘蛛图 以各单位名称为键值 每个键值映射一个二维数组
					let deptSpiderData = {};
					for (var i = 0; i < data.data.length; i++) {
						let temp = data.data[i];
						deptSpiderData[temp.dept] = [];
						deptSpiderData[temp.dept][0] = [];
						deptSpiderData[temp.dept][1] = [];
						deptSpiderData[temp.dept][0].push(temp.czl, temp.fgl, temp.asczl, temp.yql); // 第一张蜘蛛图数据
						deptSpiderData[temp.dept][1].push(temp.las, temp.zjas, temp.yczs, temp.czs, temp.asczs, temp.cqwczs, temp.yqs, temp.fgs); // 第二张蜘蛛图数据
					}
					$scope.changeDept  = (name) => {
						$("#cmIcmDeptTogglePanel").hide(0);
						$scope.spider1 = spiderStore(name+'数字城管案件处置效率情况', name, "{point.y:,.0f}%", ["处置率","返工率","按时处置率","延期率"], deptSpiderData[name][0]);
						$scope.spider2 = spiderStore(name+'数字城管案件处置情况', name, "{point.y:,0f}起", ["立案数","总结案数","应处置数","处置数","按时处置数","超期未处置数","延期数","返工数"], deptSpiderData[name][1]);
					};
					$scope.changeDept("市电信公司");
				} else {}
			}, (err) => {
				if (err.errorCode == "UNAUTHORIZED") {
					$state.go('portal');
				} else {}
			}).finally(() => {
		        $rootScope.loading = false;
		    });
		    // 当月累计数据
			params = {
				tableName: "CityManagerJianduBenyueData",
				start: lastTime,
				end: lastTime
			};
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				if (data.errorCode == "NO_ERROR") {
					// 获取到所有的单位名称
					let departmentsCategory = [];
					for (var i = 0; i < data.data.length; i++) {
						if (departmentsCategory.indexOf(data.data[i].dept != -1)) {
							departmentsCategory.push(data.data[i].dept);
						}
					}
					$scope.changeIndex2 = (name, index) => {
						$("#cmIcmIndexAccTogglePanel").hide(0);
						let departmentsData = [];
						for (var i = 0; i < data.data.length; i++) {
							departmentsData.push(data.data[i][index]);
						}
						$scope.chart2 = chartStore(500, "bar", 
							"当月累计至"+moment(lastTime).format("DD日")+"各单位数字城管案件"+name, 
							name, 
							"", 
							indexUnitMap[name],
							departmentsCategory, 
							departmentsData);
					}
					$scope.departmentsCategory = departmentsCategory;
					$scope.changeIndex2("应处置数", "yczs");
					// 蜘蛛图 以各单位名称为键值 每个键值映射一个二维数组
					let deptSpiderData = {};
					for (var i = 0; i < data.data.length; i++) {
						let temp = data.data[i];
						deptSpiderData[temp.dept] = [];
						deptSpiderData[temp.dept][0] = [];
						deptSpiderData[temp.dept][1] = [];
						deptSpiderData[temp.dept][0].push(temp.czl, temp.fgl, temp.asczl, temp.yql); // 第三张蜘蛛图数据
						deptSpiderData[temp.dept][1].push(temp.las, temp.zjas, temp.yczs, temp.czs, temp.asczs, temp.cqwczs, temp.yqs, temp.fgs); // 第四张蜘蛛图数据
					}
					$scope.changeDeptAcc  = (name) => {
						$scope.spider3 = spiderStore(name+'数字城管案件累计处置效率情况', name, "{point.y:,.0f}%", ["处置率","返工率","按时处置率","延期率"], deptSpiderData[name][0]);
						$scope.spider4 = spiderStore(name+'数字城管案件累计处置情况', name, "{point.y:,0f}起", ["立案数","总结案数","应处置数","处置数","按时处置数","超期未处置数","延期数","返工数"], deptSpiderData[name][1]);
					};
					$scope.changeDeptAcc("市电信公司");
				} else {}
			}, (err) => {
				if (err.errorCode == "UNAUTHORIZED") {
					$state.go('portal');
				} else {}
			}).finally(() => {
		        $rootScope.loading = false;
		    });
			// 历史数据
			params = {
				tableName: "CityManagerJianduData",
				start: moment(lastTime).year()+"-"+(moment(lastTime).month()+1)+"-01",
				end: lastTime
			};
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				if (data.errorCode == "NO_ERROR") {
					// 数据结构{dept:{index1:[], index2:[]...},...}
					let historyMap = {};
					// 构建数据结构
					for (var i = 0; i < $scope.departmentsCategory.length; i++) {
						historyMap[$scope.departmentsCategory[i]] = {};
						for (var j = 0; j < indexCategory.length; j++) {
							historyMap[$scope.departmentsCategory[i]][indexCategory[j]] = [];
						};
					};
					// 填入数据
					for (var i = 0; i < data.data.length; i++) {
						let temp = data.data[i];
						historyMap[temp.dept]["立案数"].push(temp.las);
						historyMap[temp.dept]["总结案数"].push(temp.zjas);
						historyMap[temp.dept]["应处置数"].push(temp.yczs);
						historyMap[temp.dept]["处置数"].push(temp.czs);
						historyMap[temp.dept]["处置率"].push(temp.czl);
						historyMap[temp.dept]["按时处置数"].push(temp.asczs);
						historyMap[temp.dept]["按时处置率"].push(temp.asczl);
						historyMap[temp.dept]["超期未处置数"].push(temp.cqwczs);
						historyMap[temp.dept]["延期数"].push(temp.yqs);
						historyMap[temp.dept]["延期率"].push(temp.yql);
						historyMap[temp.dept]["返工数"].push(temp.fgs);
						historyMap[temp.dept]["返工率"].push(temp.fgl);
					}
					$scope.currentDept = "市电信公司";
					$scope.currentIndex = "应处置数";
					let xData = [];
					let lastDay = moment(lastTime).date();
					for (i = 1; i <= lastDay; i++) {
						xData.push(i);
					};
					$scope.changeHis = (dept, index) => {
						$("#cmIcmHisDeptTogglePanel").hide(0);
						$("#cmIcmHisIndexTogglePanel").hide(0);
						$scope.currentDept = dept;
						$scope.currentIndex = index;
						$scope.hisChart = chartStore(380, "spline",
							moment(lastTime).year()+"年"+(moment(lastTime).month()+1)+"月"+dept+"数字城管案件"+index,
							index,
							"日",
							indexUnitMap[index],
							xData,
							historyMap[dept][index]);
					}
					$scope.changeHis($scope.currentDept, $scope.currentIndex);
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