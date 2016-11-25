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
    };
	let params = {
		tableName: "CityManagerJianduData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPostWithToken(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
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