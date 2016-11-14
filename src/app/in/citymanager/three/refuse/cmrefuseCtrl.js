export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';

	let townMap = {
		7001: "城厢",
		7002: "浮桥",
		7003: "璜泾",
		7004: "金浪",
		7005: "开发区",
		7006: "陆渡",
		7007: "浏河",	
		7008: "刘家港",
		7009: "鹿河",
		7010: "牌楼",
		7011: "双凤",
		7012: "全市", 
		7013: "沙溪",
		7014: "太仓",
		7015: "新湖",
		7016: "新毛",
		7017: "新塘",
		7018: "岳王",
		7019: "直塘",
	}
	$scope.townList = ["全市","城厢","浮桥","璜泾","金浪","开发区","陆渡","浏河","刘家港","鹿河","牌楼","双凤","沙溪","太仓","新湖","新毛","新塘","岳王","直塘"];
	const chartStore = (type, title, yTitle, xTitle, unit, xData, yData) => {
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
                        '<td style="text-align: right"><b>{point.y:,0f} '+ unit+'</b></td></tr>',
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
				color: '#2F4172',
				name: yTitle,
				data: yData
			}]
		};
	}
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#cmrefuse-s1').focus();
		$('#cmRefuseTownTooglePanel').hide(0);
		$('#cmRefuseTownToogleButton').click(() => {
			$('#cmRefuseTownTooglePanel').toggle(0);
		})
	}();

	let headers = {
	};
	let params = {
		tableName: "CityManagerLajiData"
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
			let startTime = moment(lastTime).subtract(6, 'days').format("YYYY-MM-DD"); // 开始时间为相对于lastTime的6天前（因为要显示最近七天的数据)
			// 最新一天数据
			let params = {
				tableName: "CityManagerLajiData",
				start: lastTime,
				end: lastTime
			}
			let currentType = "time"; // 标记当前处于车次还是吨数状态
			$scope.currentTownName = "全市";
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				if (data.errorCode == "NO_ERROR") {
					let towns = [], times = [], tons = [],
						timeStatus, tonStatus;
					for (var i = 0; i < data.data.length; i++) {
						if (data.data[i].lajiqingyundian !== 7012) { // 不显示全市数据
							towns.push(townMap[data.data[i].lajiqingyundian]);
							times.push(data.data[i].cheshu);
							tons.push(data.data[i].dunshu);
						} else {
							timeStatus = data.data[i].cheshu < 170? lastTime+"垃圾清运车次正常,"+data.data[i].cheshu+"车次(实绩)<170车次(警戒值)": lastTime+"垃圾清运车次不正常,"+data.data[i].cheshu+"车次(实绩)>170车次(警戒值)";
							tonStatus = data.data[i].dunshu < 900? lastTime+"垃圾清运吨数正常,"+data.data[i].dunshu+"吨(实绩)<900吨(警戒值)": "正常,"+data.data[i].dunshu+"吨(实绩)>900吨(警戒值)";
						}
					}
					$scope.changeChart = (type) => {
						switch (type) {
							case "time":
								$scope.oChart = chartStore("column", lastTime+"垃圾清运车次", "车次", "垃圾清运点", "次", towns, times);
								$scope.status = timeStatus;
								$('#cmrefuse-s1').addClass('activeTab');
								$('#cmrefuse-s2').removeClass('activeTab');
								currentType = "time";
								break;
							case "ton":
								$scope.oChart = chartStore("column", lastTime+"垃圾清运吨数", "吨数", "垃圾清运点", "吨", towns, tons);
								$scope.status = tonStatus;
								$('#cmrefuse-s2').addClass('activeTab');
								$('#cmrefuse-s1').removeClass('activeTab');
								currentType = "ton";
								break;
						}
					};
					$scope.changeChart(currentType);
				} else {}
			}, (err) => {
				if (err.errorCode == "UNAUTHORIZED") {
					$state.go('portal');
				} else {}
			}).finally(() => {
		        $rootScope.loading = false;
		    });
			// 最近七天数据
			params = {
				tableName: "CityManagerLajiData",
				start: startTime,
				end: lastTime
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				if (data.errorCode == "NO_ERROR") {
					let timeDataMap = {
						7001: [],7002: [],7003: [],7004: [],7005: [],7006: [],7007: [],	7008: [],7009: [],
						7010: [],7011: [],7012: [], 7013: [],7014: [],7015: [],7016: [],7017: [],7018: [],7019: []
					}, tonDataMap = {
						7001: [],7002: [],7003: [],7004: [],7005: [],7006: [],7007: [],	7008: [],7009: [],
						7010: [],7011: [],7012: [], 7013: [],7014: [],7015: [],7016: [],7017: [],7018: [],7019: []
					};
					for (var i = 0; i < data.data.length; i++) {
						timeDataMap[data.data[i].lajiqingyundian].push(data.data[i].cheshu);
						tonDataMap[data.data[i].lajiqingyundian].push(data.data[i].dunshu);
					}
					let timeLines = [
						moment(lastTime).subtract(6, 'days').date(),
						moment(lastTime).subtract(5, 'days').date(),
						moment(lastTime).subtract(4, 'days').date(),
						moment(lastTime).subtract(3, 'days').date(),
						moment(lastTime).subtract(2, 'days').date(),
						moment(lastTime).subtract(1, 'days').date(),
						moment(lastTime).subtract(0, 'days').date(),
					]
					$scope.changeTown = (name) => {
						$scope.currentTownName = name; // 记录当前显示的城镇name
						$('#cmRefuseTownTooglePanel').hide(0);
						let id = 7012;
						for(var key in townMap) {
							if (townMap[key] === name) {
								id = key;
							}
						}
						switch (currentType) {
							case "time":
								$scope.townChart = chartStore("spline", "近七天"+townMap[id]+"地区垃圾清运车数", "车数", "日期", "次", timeLines, timeDataMap[id]);
								break;
							case "ton":
								$scope.townChart = chartStore("spline", "近七天"+townMap[id]+"地区垃圾清运吨数", "吨数", "日期", "吨", timeLines, tonDataMap[id]);		
								break;
						}
					}
					$scope.changeTown($scope.currentTownName);
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