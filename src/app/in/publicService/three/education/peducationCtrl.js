export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';
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

    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjQiLCJpZCI6OSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibmFtZSI6IueJqeS7t+WxgCIsImRlc2NyaXB0aW9uIjoiV0pKX+eJqeS7t+WxgCJ9LHsiQGlkIjoiNSIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiI4IiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI5IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjEwIiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiIxMSIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIxNCIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE2IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjE3IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzQsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLmsJTosaHlsYAiLCJkZXNjcmlwdGlvbiI6IlFYSl/msJTosaHlsYAifSx7IkBpZCI6IjIwIiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIyMSIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn1dfSwiZXhwaXJlcyI6MTQ3OTg3MzA4MTA3MSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.nXKJ4UHowc3prW9H/CpZ7byCTgrzZJS4ttDSXCthcx0=";
	let headers = {
		"X-Auth-Token":token
	};
	let params = {
		tableName: "EduEquityUniversalData"
	};
	let body = ['applyTime'];
	$rootScope.loading = true;
	var yearData = [];

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
			let startTime = moment(lastTime).subtract(3, 'years').format("YYYY-MM-DD"); // 开始时间为相对于lastTime的6天前（因为要显示最近七天的数据)
			// 最新一天数据
			let params = {
				tableName: "EduEquityUniversalData",
				start: startTime,
				end: lastTime
			}
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((raw) => {
				if (raw.errorCode == "NO_ERROR") {
					console.log(raw);
					var data = JSOG.parse(JSOG.stringify(raw.data));
					$scope.eduUniversalList = [];
					$scope.eduEquityIndexList = [];
					$scope.eduUniversalLastYearList = [];
					$scope.eduEquityIndexLastYearList = [];
					
					var prschlEduThrYrRateList = [];
					var cmplsryEduStrngthnRateList = [];
					var hghSchlEnrllmntRateList = [];
					var hghrEduEnrllmntRateList = [];
					var dffIndxBtwnPrmrySchlCndList = [];
					var dffIndxBtwnMddlSchlCndList = [];
					var applyDate;
					for(var i=0; i<data.length; i++){
						prschlEduThrYrRateList.push(data[i].prschlEduThrYrRate);
						cmplsryEduStrngthnRateList.push(data[i].cmplsryEduStrngthnRate);
						hghSchlEnrllmntRateList.push(data[i].hghSchlEnrllmntRate);
						hghrEduEnrllmntRateList.push(data[i].hghrEduEnrllmntRate);
						dffIndxBtwnPrmrySchlCndList.push(data[i].dffIndxBtwnPrmrySchlCnd);
						dffIndxBtwnMddlSchlCndList.push(data[i].dffIndxBtwnMddlSchlCnd);
						applyDate = new Date(data[i].applyTime);
						yearData.push(applyDate.getFullYear());
					}
					$scope.changeChart = (type) => {
						console.log(type);
						switch (type) {
							case "popularity":
								 console.log(yearData);
								 console.log(prschlEduThrYrRateList);
								 $scope.eduUniversalByKindColumnChart = chartStore("column", lastTime+"垃圾清运车次", "车次", "垃圾清运点", yearData, prschlEduThrYrRateList);
								 $('#cmrefuse-s1').addClass('activeTab');
								 $('#cmrefuse-s2').removeClass('activeTab');
								break;
							case "equity":
								 console.log(yearData);
								 console.log(dffIndxBtwnMddlSchlCndList);
								 $scope.eduUniversalByKindColumnChart = chartStore("column", lastTime+"垃圾清运吨数", "吨数", "垃圾清运点", yearData, dffIndxBtwnMddlSchlCndList);
								 $('#cmrefuse-s2').addClass('activeTab');
								 $('#cmrefuse-s1').removeClass('activeTab');
								break;
						}
					};
					$scope.eduUniversalLastYear = yearData[data.length-1];
					$scope.eduUniversalLastYearList.push({
						name: '学前三年教育毛入园率',
						number: prschlEduThrYrRateList[data.length-1],
						target:0
					});
					$scope.eduUniversalLastYearList.push({
						name: '义务教育巩固率',
						number: cmplsryEduStrngthnRateList[data.length-1],
						target:0
					});
					$scope.eduUniversalLastYearList.push({
						name: '高中阶段教育毛入学率',
						number: hghSchlEnrllmntRateList[data.length-1],
						target:0
					});
					$scope.eduUniversalLastYearList.push({
						name: '十九周岁人口高等教育入学率',
						number: hghrEduEnrllmntRateList[data.length-1],
						target:0
					});
					$scope.eduUniversalList.push({
						name: '学前三年教育毛入园率',
						data: prschlEduThrYrRateList,
						comment: ''
					});
					$scope.eduUniversalList.push({
						name: '义务教育巩固率',
						data: cmplsryEduStrngthnRateList,
						comment: ''
					});
					$scope.eduUniversalList.push({
						name: '高中阶段教育毛入学率',
						data: hghSchlEnrllmntRateList,
						comment: ''
					});
					$scope.eduUniversalList.push({
						name: '十九周岁人口高等教育入学率',
						data: hghrEduEnrllmntRateList,
						comment: ''
					});
					$scope.eduUniversalKindSelected = $scope.eduUniversalList[0].name;
					$scope.eduUniversalByKindColumnChart.series[0].data = $scope.eduUniversalList[0].data;
					$scope.eduUniversalByKindColumnChart.series[0].name = $scope.eduUniversalList[0].name;
					$scope.eduUniversalByKindColumnChart.options.yAxis.title.text = $scope.eduUniversalList[0].name+"(%)";
					$scope.eduEquityIndexLastYearList.push({
						name: '小学办学条件校际均衡差异系数',
						number: dffIndxBtwnPrmrySchlCndList[data.length-1]
					});
					$scope.eduEquityIndexLastYearList.push({
						name: '初中办学条件校际均衡差异系数',
						number: dffIndxBtwnMddlSchlCndList[data.length-1]
					});
					$scope.eduEquityIndexList.push({
						name: '小学办学条件校际均衡差异系数',
						data: dffIndxBtwnPrmrySchlCndList,
						comment: ''
					});
					$scope.eduEquityIndexList.push({
						name: '初中办学条件校际均衡差异系数',
						data: dffIndxBtwnMddlSchlCndList,
						comment: ''
					});
					$scope.eduEquityIndexKindSelected = $scope.eduEquityIndexList[0].name;
					$scope.eduEquityIndexKindColumnChart.series[0].data = $scope.eduEquityIndexList[0].data;
					$scope.eduEquityIndexKindColumnChart.series[0].name = $scope.eduEquityIndexList[0].name;
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

    $scope.eduUniversalByKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {text : '年份'},
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: ''
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}%</b></td></tr>',
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
	            text: '近五年学前三年教育毛入园率情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
	};
	
	$scope.eduEquityIndexKindColumnChart = {
			options:{
				credits: {
					enabled: false
					},
				chart: {
		            type: 'column'
		        },
		        xAxis: {
		            title: {
			                text: '年份'
			            },
		            categories: yearData
		        },
		        yAxis: {
		            min: 0,
		            title: {
		                text: '办学条件校际均衡差异系数'
		            }
		        },
		        tooltip: {
		            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
		            pointFormat: '<tr><td style="color:{series.color};padding:0">{series.name}: </td>' +
		                '<td style="padding:0"><b>{point.y:.2f}</b></td></tr>',
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
	            text: '近五年小学办学条件校际均衡差异系数情况'
	        },
			series: [{
		            name: '',
		            data: []
		    }]
	};	

	$scope.eduUniversalKindChange = function(eduUniversalOne){
		$scope.eduUniversalByKindColumnChart.title.text = "近五年"+eduUniversalOne.name+"情况";
		$scope.eduUniversalByKindColumnChart.series[0].data = eduUniversalOne.data;
		$scope.eduUniversalByKindColumnChart.series[0].name = eduUniversalOne.name;
		$scope.eduUniversalByKindColumnChart.options.yAxis.title.text = eduUniversalOne.name+"(%)";
		$scope.eduUniversalCommentSelected = eduUniversalOne.comment;
	};

	$scope.eduEquityIndexKindChange = function(eduEquityIndexOne){
		$scope.eduEquityIndexKindColumnChart.title.text = "近五年"+eduEquityIndexOne.name+"情况";
		$scope.eduEquityIndexKindColumnChart.series[0].name = eduEquityIndexOne.name;
		$scope.eduEquityIndexKindColumnChart.series[0].data = eduEquityIndexOne.data;
		$scope.eduEquityIndexCommentSelected = eduEquityIndexOne.comment;
	};
};