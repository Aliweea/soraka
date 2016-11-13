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
	const chartStore = (type, title, yTitle, xTitle, xData, yData) => {
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

    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjQiLCJpZCI6OSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibmFtZSI6IueJqeS7t+WxgCIsImRlc2NyaXB0aW9uIjoiV0pKX+eJqeS7t+WxgCJ9LHsiQGlkIjoiNSIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiI4IiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI5IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjEwIiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiIxMSIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIxNCIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE2IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjE3IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzQsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLmsJTosaHlsYAiLCJkZXNjcmlwdGlvbiI6IlFYSl/msJTosaHlsYAifSx7IkBpZCI6IjIwIiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIyMSIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn1dfSwiZXhwaXJlcyI6MTQ3OTg3MzA4MTA3MSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.nXKJ4UHowc3prW9H/CpZ7byCTgrzZJS4ttDSXCthcx0=";
	let headers = {
		"X-Auth-Token":token
	};
	let params = {
		tableName: "CityManagerLajiData"
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
								$scope.oChart = chartStore("column", lastTime+"垃圾清运车次", "车次", "垃圾清运点", towns, times);
								$scope.status = timeStatus;
								$('#cmrefuse-s1').addClass('activeTab');
								$('#cmrefuse-s2').removeClass('activeTab');
								currentType = "time";
								break;
							case "ton":
								$scope.oChart = chartStore("column", lastTime+"垃圾清运吨数", "吨数", "垃圾清运点", towns, tons);
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
								$scope.townChart = chartStore("spline", "近七天"+townMap[id]+"地区垃圾清运车数", "车数", "日期", timeLines, timeDataMap[id]);
								break;
							case "ton":
								$scope.townChart = chartStore("spline", "近七天"+townMap[id]+"地区垃圾清运吨数", "吨数", "日期", timeLines, tonDataMap[id]);		
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