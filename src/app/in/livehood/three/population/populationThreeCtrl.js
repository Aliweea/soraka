export default ($scope, $state, $location, qService, dataDetailFactory, generalService) => {
	'ngInject';

	const jQueryDOMToDos = () => {
		$(".insurance-return").show(0); // 显示上面的返回按钮
        $(".homepage").hide(0); // 隐藏主页键
		$(".navbar2position").hide(0); // 隐藏下面当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#showshort').focus(); // 获取默认焦点
		$('.navTopShowPopulation').show(0); //显示人口结构下拉框
		$('#cmRefuseTownTooglePanel').hide(0);
		$(".insurance2detail").hide(0);
		$('#chooseAge').click(() => {
			$('#chooseAgePanel').toggle(0);
		})
	}();

	$scope.divice = {
		width: $(window).width(),
		height: $(window).height(),
		d_width: $(document).width(),
		d_height: $(document).height()
	};

	$scope.populationSwitch = (choices) => {
		switch (choices) {
			case 'total':
				$scope.choice = true;
				$scope.tab1 = true;
				$scope.tab2 = false;
				$('#lhpopulation-s1').addClass('activeTab');
				$('#lhpopulation-s2').removeClass('activeTab');
				$('#lhpopulation2-s1').addClass('activeTab');
				$('#lhpopulation2-s2').removeClass('activeTab');
				break;
			case 'structure':
				$scope.choice = false;
				$scope.tab1 = false;
				$scope.tab2 = true;
				$('#lhpopulation-s2').addClass('activeTab');
				$('#lhpopulation-s1').removeClass('activeTab');
				$('#lhpopulation2-s2').addClass('activeTab');
				$('#lhpopulation2-s1').removeClass('activeTab');
				break;
		}
	}
	$scope.populationSwitch("total");

	$scope.tabMap = [{
		id: "tab_populationStructure",
		label: "人口结构图",
		name: "PopulationStructure",
		active: false
	}, {
		id: "tab_terminalPopulation",
		label: "期末户籍人口数",
		name: "TerminalPopulation",
		active: false
	}, {
		id: "tab_bornDeath",
		label: "出生人口与死亡人口详情",
		name: "BornDeath",
		active: false
	}, {
		id: "tab_bearingWomen",
		label: "户籍育龄妇女详情",
		name: "BearingWomen",
		active: false
	}, {
		id: "tab_firstMarriage",
		label: "初婚女性详情",
		name: "FirstMarriage",
		active: false
	}];

	
    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMC0yMSAxMTowMToxNCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI0IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiI1IiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI2IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjciLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjgiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjkiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjExIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMTUiLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxNyIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIyMCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjI1IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifV19LCJleHBpcmVzIjoxNDgwNjU1OTU1OTU4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25Mb2NrZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.PT3kqmzkjZtV98yDr6kvK2gErGk8wsHUq0Krf+GOtGU=";
    
	let headers = {
		"X-Auth-Token": token
	};
	let params = {
		tableName: "DetailPopulationByAge"
	};
	let body = ['year'];

	let temploc = $location.path().split('/');
	$scope.thisloc = temploc[temploc.length - 1];
	switch($scope.thisloc) {
		case "TerminalPopulation":
			$scope.tabName1 = "太仓市期末户籍人口数量";
			$scope.tabName2 = "各乡镇期末户籍人口详情";
			break;
		case "BornDeath":
			$scope.tabName1 = "太仓市户籍人口出生死亡情况";
			$scope.tabName2 = "各乡镇户籍人口出生死亡详情";
			break;
		case "BearingWomen":
			$scope.tabName1 = "太仓市育龄妇女情况";
			$scope.tabName2 = "各乡镇育龄妇女数据详情";
			break;
		case "FirstMarriage":
			$scope.tabName1 = "太仓市初婚女性情况";
			$scope.tabName2 = "各乡镇初婚女性数据详情";
			break;
	}

	let entityName;
	let getDataFunction = () => {}

	let barHighChart = function(height, categories) {
		this.options = {
			colors: ['#7CADDF','#195489'],
			chart: {
				type: 'bar'
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			title: {
				text: "",
				style: {
					fontSize: 15
				}
			},
			subtitle: {
				text: ''
			},
			xAxis: [{
				categories: categories,
				reversed: false,
				labels: {
					rotation: 0
				}
			}, { // mirror axis on right side
				opposite: true,
				reversed: false,
				categories: categories,
				linkedTo: 0,
				labels: {
					rotation: 0
				}
			}],
			yAxis: {
				title: {
					text: null
				},
				labels: {
					formatter: function() {
						return Math.abs(this.value);
					},
					rotation: -50
				},
				min: -15000,
				max: 15000
			},
			plotOptions: {
				bar: {
					cursor: 'pointer',
					events: {},
					point: {
						events: {
							click: function(event) {
								let query_age = event.point.category;
								$scope.$apply($scope.ALLDATA.detailTableData = $scope.ALLDATA.detailTableDataList[query_age.substr(0, query_age.indexOf("岁"))].data);
							}
						}
					}
				},
				series: {
					stacking: 'normal'
				}
			},
			legend: {
				enabled: false
			},
			tooltip: {
				formatter: function() {
					return '<b>' + this.series.name + '<br/> 年龄段: ' + this.point.category + '</b><br/>' + '人口数量: ' + Highcharts.numberFormat(Math
						.abs(this.point.y), 0) + "人";
				}
			}
		};
		this.series = [];
	};

	let STACKCOLUMNHIGHCHART = function(height, marginBottom, categories, yAxisTitle, callFunc1, callFunc2) {
		let colors = generalService.columnColors()
		colors.splice(3, 0, '#606060')
		this.options = {
			colors: colors,
			chart: {
				type: 'column'
			},
			title: {
				text: "",
				style: {
					fontSize: 15
				}
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			xAxis: {
				categories: categories,
				tickmarkPlacement: 'on'
			},
			yAxis: {
				min: 0,
				title: {
					text: yAxisTitle
				},
				stackLabels: {
					enabled: false,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					}
				},
				labels: {
					formatter: function() {
						return Math.abs(this.value);
					}
				},
			},
			tooltip: {
				formatter: function() {
					return '<b>' + this.x + '</b><br/>' +
						this.series.name + '： ' + this.y + ' 人<br/>' +
						'<b>总共： ' + this.point.stackTotal + ' 人</b>';
				}
			},
			plotOptions: {
				column: {
					stacking: 'normal',
					dataLabels: {
						enabled: false,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
						style: {
							textShadow: '0 0 3px black'
						}
					},
					point: {
						events: {
							click: function(event) {
								let queryTown;
								let queryItem = event.point.category;
								let tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
								if (queryItem.substr(-1) == "年") {
									$scope.queryYear = queryItem.substr(0, queryItem.length - 1);
									tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
									queryTown = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex][0];
									callFunc2($scope.queryYear, tempIndex, $scope.tableNameStr);
								} else {
									queryTown = queryItem;
								}
								$scope.$apply(callFunc1($scope.queryYear, tempIndex, queryTown, $scope.tableNameStr));
							}
						}
					}
				}
			}
		};
		this.series = [];
	};

	let COLUMNHIGHCHART = function(height, marginBottom, categories, yAxisTitle, callFunc1, callFunc2) {
		this.options = {
			chart: {
				type: 'column'
			},
			title: {
				text: "",
				style: {
					fontSize: 15
				}
			},
			subtitle: {
				text: ''
			},
			credits: {
				enabled: false
			},
			exporting: {
				enabled: false
			},
			xAxis: {
				categories: categories,
				tickmarkPlacement: 'on'
			},
			yAxis: {
				min: 0,
				title: {
					text: yAxisTitle
				},
				labels: {
					formatter: function() {
						return Math.abs(this.value);
					}
				}
			},
			tooltip: {
				formatter: function() {
					return '<b>' + this.x + '</b><br/>' +
						this.series.name + '： ' + this.y + ' 人<br/>';
				}
			},
			plotOptions: {
				column: {
					point: {
						events: {
							click: function(event) {
								let queryTown;
								let queryItem = event.point.category;
								let tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
								if (queryItem.substr(-1) == "年") {
									$scope.queryYear = queryItem.substr(0, queryItem.length - 1);
									tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
									queryTown = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex][0];
									callFunc2($scope.queryYear, tempIndex, $scope.tableNameStr);
								} else {
									queryTown = queryItem;
								}
								$scope.$apply(callFunc1($scope.queryYear, tempIndex, queryTown, $scope.tableNameStr));
							}
						}
					}
				}
			}
		};
		this.series = [];
	};



	let setChartData = (tabName) => {
		let ageList = new Array();
		if (tabName === $scope.tabMap[0].name) {
			for (let i = 0; i <= 99; i++) {
				ageList.push(i + "岁");
			}
			ageList.push("100岁及以上");
			entityName = "DetailPopulationByAge";
		} else {
			entityName = "PlanBorn";
		}
		let aquiredData = qService.httpPost(dataDetailFactory.lastestObject, {
			tableName: entityName
		}, headers, ['year']).then((lastObjRaw) => {
			if (lastObjRaw.errorCode != "NO_ERROR") {
				$location.path("/main");
			}
			console.log(lastObjRaw);
			let latestObj = lastObjRaw.data;

			$scope.LATESTYEAR = latestObj.year;
			$scope.queryYear = latestObj.year;

			let yearList = new Array();
			for (let i = $scope.LATESTYEAR - 4; i <= $scope.LATESTYEAR; i++) {
				yearList.push(i + "年");
			}

			switch (tabName) {
				case $scope.tabMap[0].name:
					$scope.ALLOPTION = {
						POPULATIONCHART: new barHighChart(500, ageList)
					};
					$scope.ALLDATA = {
						POPULATIONCHARTDATA: new DataList(["男性", "女性"], ageList.length, chartDataObject),
						tableName: $scope.LATESTYEAR + "年太仓市人口总量数据详请",
						tableDataList: new tableDataList(3),
						tableData: null,
						detailTableName: $scope.LATESTYEAR + "年太仓市人口结构数据详请",
						detailTableDataList: new Array(ageList.length)
					};
					getDataFunction = getPopulationStructureData;
					break;
				case $scope.tabMap[1].name:
					$scope.tableNameStr = "期末户籍人口";
					$scope.panel_heading = ["太仓市期末户籍人口数量", "各乡镇期末户籍人口详情"];
					$scope.ALLOPTION = {
						POPULATIONCHART: new COLUMNHIGHCHART(400, 55, yearList, "期末户籍人口数", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
						POPULATIONTOWNCHART: new COLUMNHIGHCHART(400, 73, [], "期末户籍人口数", callFunctionOfPopulationTownChart, null)
					};
					$scope.ALLDATA = {
						POPULATIONCHARTDATA: new DataList(["期末户籍人口数"], yearList.length, chartDataObject),
						tableName: $scope.LATESTYEAR + "年太仓全市户籍人口数据详请",
						tableDataList: new Array(yearList.length),
						tableData: null,
						POPULATIONTOWNCHARTDATA: new Array(yearList.length),
						POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
						townTableName: $scope.LATESTYEAR + "年太仓城厢镇户籍人口数据详请",
						townTableDataList: new Array(yearList.length),
						townTableData: null
					};
					getDataFunction = getTerminalPopulationData;
					break;
				case $scope.tabMap[2].name:
					$scope.tableNameStr = "户籍人口出生死亡";
					$scope.panel_heading = ["太仓市户籍人口出生死亡情况", "各乡镇户籍人口出生死亡详情"];
					$scope.ALLOPTION = {
						POPULATIONCHART: new STACKCOLUMNHIGHCHART(400, 75, yearList, "出生/死亡人数", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
						POPULATIONTOWNCHART: new STACKCOLUMNHIGHCHART(400, 95, [], "出生/死亡人数", callFunctionOfPopulationTownChart, null)
					};
					$scope.ALLDATA = {
						POPULATIONCHARTDATA: new DataList([
							["一孩总数", "出生总数"],
							["二孩总数", "出生总数"],
							["多孩总数", "出生总数"],
							["死亡总数", "死亡总数"]
						], yearList.length, stackColumnDataObject),
						tableName: $scope.LATESTYEAR + "年太仓全市户籍人口出生死亡数据详请",
						tableDataList: new Array(yearList.length),
						tableData: null,
						POPULATIONTOWNCHARTDATA: new Array(yearList.length),
						POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
						townTableName: $scope.LATESTYEAR + "年太仓城厢镇户籍人口出生死亡数据详请",
						townTableDataList: new Array(yearList.length),
						townTableData: null
					};
					getDataFunction = getBornDeathData;
					break;
				case $scope.tabMap[3].name:
					$scope.tableNameStr = "育龄妇女";
					$scope.panel_heading = ["太仓市育龄妇女情况", "各乡镇育龄妇女数据详情"];
					$scope.ALLOPTION = {
						POPULATIONCHART: new STACKCOLUMNHIGHCHART(400, 58, yearList, "育龄妇女数量", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
						POPULATIONTOWNCHART: new STACKCOLUMNHIGHCHART(400, 78, [], "育龄妇女数量", callFunctionOfPopulationTownChart, null)
					};
					$scope.ALLDATA = {
						POPULATIONCHARTDATA: new DataList([
							["已婚育龄妇女", "育龄妇女"],
							["未婚育龄妇女", "育龄妇女"]
						], yearList.length, stackColumnDataObject),
						tableName: $scope.LATESTYEAR + "年太仓全市育龄妇女数据详情",
						tableDataList: new Array(yearList.length),
						tableData: null,
						POPULATIONTOWNCHARTDATA: new Array(yearList.length),
						POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
						townTableName: $scope.LATESTYEAR + "年太仓城厢镇育龄妇女数据详请",
						townTableDataList: new Array(yearList.length),
						townTableData: null
					};
					getDataFunction = getBearingWomenData;
					break;
				case $scope.tabMap[4].name:
					$scope.tableNameStr = "初婚女性";
					$scope.panel_heading = ["太仓市初婚女性情况", "各乡镇初婚女性数据详情"];
					$scope.ALLOPTION = {
						POPULATIONCHART: new STACKCOLUMNHIGHCHART(400, 72, yearList, "初婚女性数量", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
						POPULATIONTOWNCHART: new STACKCOLUMNHIGHCHART(400, 95, [], "初婚女性数量", callFunctionOfPopulationTownChart, null)
					};
					$scope.ALLDATA = {
						POPULATIONCHARTDATA: new DataList([
							["19周岁及以下初婚女性", "初婚女性"],
							["20到22周岁初婚女性", "初婚女性"],
							["23周岁及以上初婚女性", "初婚女性"]
						], yearList.length, stackColumnDataObject),
						tableName: $scope.LATESTYEAR + "年太仓全市初婚女性数据详情",
						tableDataList: new Array(yearList.length),
						tableData: null,
						POPULATIONTOWNCHARTDATA: new Array(yearList.length),
						POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
						townTableName: $scope.LATESTYEAR + "年太仓城厢镇初婚女性数据详请",
						townTableDataList: new Array(yearList.length),
						townTableData: null
					};
					getDataFunction = getFirstMarriageWomenData;
					break;
			}

			getDataFunction(entityName, $scope.LATESTYEAR);
		}).finally(() => {
			$rootScope.loading = false;
		});
	};

	setChartData($scope.thisloc);

	let getFirstMarriageWomenData = (entityName, year) => {
		let queryMap = {
			year: generalService.advanceQueryObj('bt', 'innt', [year - 4, year]),
			sort1: {
				key: 'year',
				sortType: 'asc'
			},
			sort2: {
				key: 'townType',
				sortType: 'asc'
			}
		};
		let POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
			tableName: entityName
		}, headers, queryMap).then((data) => {
			if (data.errorCode != "NO_ERROR") {
				$location.path("/main");
			}
			let dataList = data.data;
			let firstMarriageUnder19, firstMarriageUnder23, firstMarriageAbove23, lateMarriageRate, tempDataObj, dataObject, tempIndex, tempDetailIndex;
			for (let i = 0; i < dataList.length; i++) {
				dataObject = dataList[i];
				tempIndex = dataObject.year - year + 4;

				firstMarriageUnder19 = 0;
				firstMarriageAbove23 = dataObject.female23FirstMarriageSum;
				firstMarriageUnder23 = dataObject.femaleFirstMarriageSum - firstMarriageUnder19 - firstMarriageAbove23;
				lateMarriageRate = firstMarriageAbove23 / dataObject.femaleFirstMarriageSum * 100;

				if (dataObject.townTypeName === "全市") {
					$scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = firstMarriageUnder19;
					$scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = firstMarriageUnder23;
					$scope.ALLDATA.POPULATIONCHARTDATA.data[2].data[tempIndex] = firstMarriageAbove23;
					if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(4);
					}
					tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
				} else {
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
					}
					tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
					if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList([
							["19周岁及以下初婚女性", "初婚女性"],
							["20到22周岁初婚女性", "初婚女性"],
							["23周岁及以上初婚女性", "初婚女性"]
						], 1, stackColumnDataObject);
					}
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = firstMarriageUnder19;
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[1].data[tempDetailIndex] = firstMarriageUnder23;
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[2].data[tempDetailIndex] = firstMarriageAbove23;
					if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(4);
					}
					tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
				}
				tempDataObj.data[0].name = "19周岁及以下女性初婚总数";
				tempDataObj.data[0].value = firstMarriageUnder19 + "人";
				tempDataObj.data[1].name = "20到22周岁女性初婚总数";
				tempDataObj.data[1].value = firstMarriageUnder23 + "人";
				tempDataObj.data[2].name = "23周岁及以上女性初婚总数";
				tempDataObj.data[2].value = firstMarriageAbove23 + "人";
				tempDataObj.data[3].name = "晚婚率";
				tempDataObj.data[3].value = Number(lateMarriageRate).toFixed(2) + "%";
			}
			$scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年初婚女性情况 ";
			$scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
			callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
			callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
		}).finally(() => {
			$rootScope.loading = false;
		});
	};

	let getBearingWomenData = (entityName, year) => {
		let queryMap = {
			year: generalService.advanceQueryObj('bt', 'innt', [year - 4, year]),
			sort1: {
				key: 'year',
				sortType: 'asc'
			},
			sort2: {
				key: 'townType',
				sortType: 'asc'
			}
		};
		let POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
			tableName: entityName
		}, headers, queryMap).then((data) => {
			if (data.errorCode != "NO_ERROR") {
				$location.path("/main");
			}
			let dataList = data.data;
			let bearingWomenRate, marriedBearingWomenRate, singleChildRation, singleChildCardRation, tempDataObj, dataObject, tempIndex, tempDetailIndex;
			for (let i = 0; i < dataList.length; i++) {
				dataObject = dataList[i];
				tempIndex = dataObject.year - year + 4;

				bearingWomenRate = dataObject.womenPopulation / ((0.0 + dataObject.beginningPopulation + dataObject.terminalPopulation) / 2) * 100;
				marriedBearingWomenRate = dataObject.marriedWomenPopulation / ((0.0 + dataObject.beginningPopulation + dataObject.terminalPopulation) / 2) * 100;
				singleChildRation = dataObject.womenOfKid1Population / (0.0 + dataObject.marriedWomenPopulation) * 100;
				singleChildCardRation = dataObject.cardNumber / (0.0 + dataObject.marriedWomenPopulation) * 100;

				if (dataObject.townTypeName === "全市") {
					$scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = dataObject.marriedWomenPopulation;
					$scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = dataObject.womenPopulation - dataObject.marriedWomenPopulation;
					if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(4);
					}
					tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
				} else {
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
					}
					tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
					if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList([
							["已婚育龄妇女", "育龄妇女"],
							["未婚育龄妇女", "育龄妇女"]
						], 1, stackColumnDataObject);
					}
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = dataObject.marriedWomenPopulation;
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[1].data[tempDetailIndex] = dataObject.womenPopulation - dataObject.marriedWomenPopulation;
					if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(4);
					}
					tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
				}
				tempDataObj.data[0].name = "育龄妇女占总人口比";
				tempDataObj.data[0].value = Number(bearingWomenRate).toFixed(2) + "%";
				tempDataObj.data[1].name = "已婚育龄妇女占总人口比";
				tempDataObj.data[1].value = Number(marriedBearingWomenRate).toFixed(2) + "%";
				tempDataObj.data[2].name = "独生子女率";
				tempDataObj.data[2].value = Number(singleChildRation).toFixed(2) + "%";
				tempDataObj.data[3].name = "独生子女领证率";
				tempDataObj.data[3].value = Number(singleChildCardRation).toFixed(2) + "%";
			}
			$scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年户籍育龄妇女情况 ";
			$scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
			callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
			callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
		}).finally(() => {
			$rootScope.loading = false;
		});
	};

	let getBornDeathData = (entityName, year) => {
		let queryMap = {
			year: generalService.advanceQueryObj('bt', 'innt', [year - 4, year]),
			sort1: {
				key: 'year',
				sortType: 'asc'
			},
			sort2: {
				key: 'townType',
				sortType: 'asc'
			}
		};
		let POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
			tableName: entityName
		}, headers, queryMap).then((data) => {
			if (data.errorCode != "NO_ERROR") {
				$location.path("/main");
			}
			let dataList = data.data;
			let bornNumber, deathNumber, planBornRate, kid1Rate, bornGenderRation, tempDataObj, dataObject, tempIndex, tempDetailIndex;
			for (let i = 0; i < dataList.length; i++) {
				dataObject = dataList[i];
				tempIndex = dataObject.year - year + 4;

				bornNumber = dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum;
				deathNumber = dataObject.deathSum;
				planBornRate = (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum - (dataObject.kid1OutSum + dataObject.kid2OutSum + dataObject.kidNOutSum)) / (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum) * 100;
				kid1Rate = dataObject.kid1Sum / (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum) * 100;
				bornGenderRation = (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum - (dataObject.kid1FemaleSum + dataObject.kid2FemaleSum + dataObject.kidNFemaleSum)) / (dataObject.kid1FemaleSum + dataObject.kid2FemaleSum + dataObject.kidNFemaleSum) * 100;

				if (dataObject.townTypeName === "全市") {
					$scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = dataObject.kid1Sum;
					$scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = dataObject.kid2Sum;
					$scope.ALLDATA.POPULATIONCHARTDATA.data[2].data[tempIndex] = dataObject.kidNSum;
					$scope.ALLDATA.POPULATIONCHARTDATA.data[3].data[tempIndex] = dataObject.deathSum;
					if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(5);
					}
					tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
				} else {
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
					}
					tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
					if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList([
							["一孩总数", "出生总数"],
							["二孩总数", "出生总数"],
							["多孩总数", "出生总数"],
							["死亡总数", "死亡总数"]
						], 1, stackColumnDataObject);
					}
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = dataObject.kid1Sum;
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[1].data[tempDetailIndex] = dataObject.kid2Sum;
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[2].data[tempDetailIndex] = dataObject.kidNSum;
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[3].data[tempDetailIndex] = dataObject.deathSum;
					if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(5);
					}
					tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
				}
				tempDataObj.data[0].name = "出生人口数量";
				tempDataObj.data[0].value = bornNumber + "人";
				tempDataObj.data[1].name = "死亡人口数量";
				tempDataObj.data[1].value = deathNumber + "人";
				tempDataObj.data[2].name = "政策符合率";
				tempDataObj.data[2].value = Number(planBornRate).toFixed(2) + "%";
				tempDataObj.data[3].name = "一孩率";
				tempDataObj.data[3].value = Number(kid1Rate).toFixed(2) + "%";
				tempDataObj.data[4].name = "出生性别比（男/女）";
				tempDataObj.data[4].value = Number(bornGenderRation).toFixed(2)
			}
			$scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年户籍人口出生死亡情况 ";
			$scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
			callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
			callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
		}).finally(() => {
			$rootScope.loading = false;
		});
	};

	let getTerminalPopulationData = (entityName, year) => {
		let queryMap = {
			year: generalService.advanceQueryObj('bt', 'innt', [year - 4, year]),
			sort1: {
				key: 'year',
				sortType: 'asc'
			},
			sort2: {
				key: 'townType',
				sortType: 'asc'
			}
		};
		let POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
			tableName: entityName
		}, headers, queryMap).then((data) => {
			if (data.errorCode != "NO_ERROR") {
				$location.path("/main");
			}
			let dataList = data.data;
			let bornRate, deathRate, naturalIncRate, population, tempDataObj, dataObject, tempIndex, tempDetailIndex, minTerminalPopulation = Number.MAX_VALUE;
			for (let i = 0; i < dataList.length; i++) {
				dataObject = dataList[i];
				tempIndex = dataObject.year - year + 4;
				population = (0.0 + dataObject.beginningPopulation + dataObject.terminalPopulation) / 2;
				bornRate = (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum) / population * 1000;
				deathRate = dataObject.deathSum / population * 1000;
				naturalIncRate = bornRate - deathRate;
				if (dataObject.townTypeName === "全市") {
					$scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = dataObject.terminalPopulation;
					if (minTerminalPopulation > dataObject.terminalPopulation) {
						minTerminalPopulation = dataObject.terminalPopulation;
					}
					if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(4);
					}
					tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
				} else {
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
						$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
					}
					tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
					if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
						$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList(["期末户籍人口数"], 1, chartDataObject);
					}
					$scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = dataObject.terminalPopulation;
					if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex] = new Array();
					}
					if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
						$scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(4);
					}
					tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
				}
				tempDataObj.data[0].name = "期末户籍人口数";
				tempDataObj.data[0].value = dataObject.terminalPopulation + "人";
				tempDataObj.data[1].name = "出生率";
				tempDataObj.data[1].value = Number(bornRate).toFixed(2) + "‰";
				tempDataObj.data[2].name = "死亡率";
				tempDataObj.data[2].value = Number(deathRate).toFixed(2) + "‰";
				tempDataObj.data[3].name = "自增率";
				tempDataObj.data[3].value = Number(naturalIncRate).toFixed(2) + "‰";
			}
			let operation = 1;
			while (minTerminalPopulation > 10) {
				operation *= 10;
				minTerminalPopulation = parseInt(minTerminalPopulation / 10);
			}
			minTerminalPopulation *= operation
			$scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年期末户籍人口情况";
			$scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
			$scope.ALLOPTION.POPULATIONCHART.options.yAxis.min = minTerminalPopulation;
			callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
			callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
		}).finally(() => {
			$rootScope.loading = false;
		});
	};

	let getPopulationStructureData = (entityName, year) => {
		let queryMap = {
			year: generalService.advanceQueryObj('eq', 'innt', [year]),
			sort1: {
				key: 'ageType',
				sortType: 'asc'
			}
		};
		let POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
			tableName: entityName
		}, headers, queryMap).then((data) => {
			console.log(data);
			if (data.errorCode != "NO_ERROR") {
				$location.path("/main");
			}
			let dataList = data.data;
			let transientSum = 0,
				residentSum = 0,
				tempIndex = 0,
				tempDataObj, dataObject;
			for (let i = 0; i < dataList.length; i++) {
				dataObject = dataList[i];
				tempIndex = dataObject.ageTypeId - 2700; // 2700 stands for age 0
				transientSum += dataObject.transientPopulation;
				residentSum += dataObject.residentPopulation;
				if ($scope.ALLDATA.detailTableDataList[tempIndex] == undefined) {
					$scope.ALLDATA.detailTableDataList[tempIndex] = new tableDataList(4);
				}
				tempDataObj = $scope.ALLDATA.detailTableDataList[tempIndex];
				if (dataObject.sexName === "女性") {
					tempDataObj.data[0].name = dataObject.ageTypeName + "女性常住人口";
					tempDataObj.data[0].value = dataObject.residentPopulation + "人";
					tempDataObj.data[1].name = dataObject.ageTypeName + "女性暂住人口";
					tempDataObj.data[1].value = dataObject.transientPopulation + "人";
					if (tempIndex < 100) {
						$scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = dataObject.residentPopulation + dataObject.transientPopulation;
					} else {
						$scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[100] += dataObject.residentPopulation + dataObject.transientPopulation;
					}
				} else {
					tempDataObj.data[2].name = dataObject.ageTypeName + "男性常住人口";
					tempDataObj.data[2].value = dataObject.residentPopulation + "人";
					tempDataObj.data[3].name = dataObject.ageTypeName + "男性暂住人口";
					tempDataObj.data[3].value = dataObject.transientPopulation + "人";
					if (tempIndex < 100) {
						$scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = -(dataObject.residentPopulation + dataObject.transientPopulation);
					} else {
						$scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[100] -= (dataObject.residentPopulation + dataObject.transientPopulation);
					}
				}
			}
			$scope.ALLDATA.tableDataList.data[0].name = "人口总量";
			$scope.ALLDATA.tableDataList.data[0].value = transientSum + residentSum + "人";
			$scope.ALLDATA.tableDataList.data[1].name = "常住人口总量";
			$scope.ALLDATA.tableDataList.data[1].value = residentSum + "人";
			$scope.ALLDATA.tableDataList.data[2].name = "暂住人口总量";
			$scope.ALLDATA.tableDataList.data[2].value = transientSum + "人";

			$scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市" + year + "人口结构图";
			$scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
			$scope.ALLDATA.detailTableData = $scope.ALLDATA.detailTableDataList[0].data;
			$scope.ALLDATA.tableData = $scope.ALLDATA.tableDataList.data;
		}).finally(() => {
			$rootScope.loading = false;
		});
		console.log($scope.ALLDATA);
	};

	let chartDataObject = function(name, size) {
		this.name = name;
		this.data = new Array(size);
	}

	let stackColumnDataObject = function(nameList, size) {
		this.name = nameList[0];
		this.data = new Array(size);
		this.stack = nameList[1];
	}

	let DataList = function(nameList, size, dataObject) {
		let temp = new Array();
		for (let i = 0; i < nameList.length; i++) {
			temp[i] = new dataObject(nameList[i], size);
		}
		this.data = temp;
	}

	let tableDataObject = function() {
		this.name = "";
		this.value = 0;
	}

	let tableDataList = function(size) {
		let temp = new Array(size);
		for (let i = 0; i < size; i++) {
			temp[i] = new tableDataObject();
		}
		this.data = temp;
	}

	let callFunctionOfPopulationChart = (year, index, nameStr) => {
		$scope.ALLDATA.tableName = year + "年太仓全市" + nameStr + "数据详请";
		$scope.ALLDATA.tableData = $scope.ALLDATA.tableDataList[index].data;
		$scope.ALLOPTION.POPULATIONTOWNCHART.options.title.text = year + "年太仓全市各乡镇" + nameStr + "情况";
		$scope.ALLOPTION.POPULATIONTOWNCHART.options.xAxis.categories = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[index];
		$scope.ALLOPTION.POPULATIONTOWNCHART.series = $scope.ALLDATA.POPULATIONTOWNCHARTDATA[index].data;
	}

	let callFunctionOfPopulationTownChart = (year, index, town, nameStr) => {
		$scope.ALLDATA.townTableName = year + "年太仓市" + town + nameStr + "数据详请";
		$scope.ALLDATA.townTableData = $scope.ALLDATA.townTableDataList[index][$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[index].indexOf(town)].data;
	}
};