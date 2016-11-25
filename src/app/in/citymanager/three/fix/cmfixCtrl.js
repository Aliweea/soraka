export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';

	const chartStore = (type, title, yTitle, xTitle, unit, data, xData) => {
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
                        '<td style="text-align: right"><b>{point.y:,0.f} '+ unit+'</b></td></tr>',
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
				colorByPoint: true,
				name: "拆除数",
				data: data
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
							enabled: true,
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
    }();
	let headers = {
    };
	let params = {
		tableName: "IllegalConstructionData"
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
			let pieData = [];
			pieData.push(['居民区拆除数', data.data.jmqccs]); pieData.push(['道路两侧拆除数', data.data.dllcccs]);
			pieData.push(['单位两侧拆除数', data.data.dwlcccs]); pieData.push(['河道两侧拆除数', data.data.hdlcccs]);
			pieData.push(['其他地域拆除数', data.data.qtdycss]);
			let columnName = ['强拆数', '自拆除数']
			let columnData = [data.data.qcs, data.data.zccs];
			let totalCount = data.data.qcs + data.data.zccs;
			$scope.pieChart = pieStore(lastYear+"年"+lastMonth+"月份太仓市分区域拆除详情",
									'<b>拆除数</b>:{point.y:0.f}起</b>',
									pieData,
									'{point.percentage:.1f} %');
			$scope.columnChart = chartStore('column', lastYear+"年"+lastMonth+"月份各类拆除数详情", '拆除数(起)', '', "起", columnData, columnName);
			$scope.oneword1 = lastYear+"年"+lastMonth+"月份全市违法建设整治共拆除"+totalCount+"起, 拆除面积"+data.data.ccmj+"平方米。";
			$scope.oneword2 = lastYear+"年"+lastMonth+"月份全市违法建设整治强拆数"+data.data.qcs+"起, 自拆除数"+data.data.zccs+"起。";
		} else {}
	}, (err) => {
		if (err.errorCode == "UNAUTHORIZED") {
			$state.go('portal');
		} else {}
	}).finally(() => {
        $rootScope.loading = false;
    });		
};