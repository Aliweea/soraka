/*
* 功能: 二级界面相关service
* --Mondooo
*/
export default (dateService, unitService) => {
	'ngInject';
	//~ 工具
	const UNIT_MAP = {
		'percentage': '%',
		'count': '个',
		'rmb': '元',
		'tt_rmb': '万元',
		'ttt_rmb': '千万元',
		'm_rmb': '百万元',
		'b_rmb': '亿元',
		'square_klo': '平方公里',
		'people': '人',
		'tt_people': '万人',
		'strip': '条',
		'nil': '',
		'paper': '张',
		'place': '处',
		'appear': '起',
		'ton_coal': '吨标准煤',
		'tom_coal_per_tt': '吨标准煤每万元',
		'kwh': '千瓦时',
		'rmb_per_5hg': '元/500g',
		'wkwh': '万千瓦时',
		'wton_coal': '万吨标准煤',
		'che': '车',
		'sui': '岁',
		'liang': '辆',
		'ton': '吨',
		'year': '年',
		'kilometer': '公里',
		'men': '门',
		'haktare': '公顷',
		'mu': '亩',
		'gb': 'G',
		'square_meter': '平方米',
		'dollor': '美元',
		'tt_dollor': '万美元',
		'm_dollor': '百万美元',
		'ttt_dollor': '千万美元',
		'b_dollor': '亿美元',
		'people_time': '人次',
		'car_time': '车次',
		'thoudsand_percentage': '‰',
		'hthoudsand_percetage': ' (十万分比)'
	};
	const get_zn_value = (key) => {
		var val = UNIT_MAP[key];
		if (val != null || val != undefined) {
			return val;
		} else {
			return '';
		}
	}
	// 二级界面highchart横坐标时间设置
	const configX = (type, span, kpiDate) => {
		let curSelectedTime = kpiDate;
		let xdata = [];
		switch (type) {
			case 'YEARLY':
				if (span == 'short') {
					for (let i = 2; i >= 0; i--) {
						let yearShort = moment(curSelectedTime).subtract(i, 'years').get('year');
						xdata.push(yearShort.toString());
					}
				} else if (span == 'long') {
					for (let j = 4; j >= 0; j--) {
						let yearLong = moment(curSelectedTime).subtract(j, 'years').get('year');
						xdata.push(yearLong.toString());
					}
				}
				break;
			case 'MONTHLY':
				if (span == 'short') {
					for (let i = 2; i >= 0; i--) {
						let short = moment(curSelectedTime).subtract(i, 'month');
						let monthStr = moment(short).get('year') + '-' + (moment(short).get('month') + 1);
						xdata.push(monthStr);
					}
				} else if (span == 'long') {
					let startMonth = moment(curSelectedTime).startOf('year').get('month');
					let curMonth = moment(curSelectedTime).get('month');
					while (startMonth <= curMonth) {
						xdata.push((startMonth + 1).toString());
						startMonth++;
					}
				}
				break;
			case 'DAILY':
				if (span == 'short') {
					for (let i = 6; i >= 0; i--) {
						let short = moment(curSelectedTime).subtract(i, 'days');
						let DateStr = (moment(short).get('month') + 1) + '-' + moment(short).get('date');
						xdata.push(DateStr);
					}
				} else if (span == 'long') {
					let startDate = moment(curSelectedTime).startOf('month').get('date');
					let curDate = moment(curSelectedTime).get('date');
					while (startDate <= curDate) {
						xdata.push(startDate.toString());
						startDate++;
					}
				}
				break;
		}
		return xdata;
	};

	// 二级界面highchart纵坐标设置
	const configY = (span, data, xdata) => {
		let map = {};
		for (let i = 0; i < xdata.length; i++) {
			map[xdata[i]] = {
				value: null,
				target: null
			};
		};
		for (let j = 0; j < data.data.data.applyDate.length; j++) {
			let appStr;
			switch (data.data.type) {
				case 'YEARLY':
					appStr = moment(data.data.data.applyDate[j]).get('year');
					break;
				case 'MONTHLY':
					if (span == 'short') {
						appStr = moment(data.data.data.applyDate[j]).get('year') + '-' + (moment(data.data.data.applyDate[j]).get('month') + 1);
					} else if (span == 'long') {
						appStr = moment(data.data.data.applyDate[j]).get('month') + 1;
					}
					break;
				case 'DAILY':
					if (span == 'short') {
						appStr = (moment(data.data.data.applyDate[j]).get('month') + 1) + '-' + moment(data.data.data.applyDate[j]).get('date');
					} else if (span == 'long') {
						appStr = moment(data.data.data.applyDate[j]).get('date');
					}
					break;
			}
			map[appStr].value = data.data.data.value[j];
			map[appStr].target = data.data.data.target[j];
		}
		let valueList = [];
		let targetList = [];
		for (let k = 0; k < xdata.length; k++) {
			valueList.push(map[xdata[k]].value);
			targetList.push(map[xdata[k]].target);
		}

		let targetTypeName;
		let targetColor = '#41817F';
		switch (data.data.targetType) {
			case 'warn':
				targetTypeName = '警戒值';
				targetColor = '#AA3939';
				break;
			case 'target':
				targetTypeName = '目标值';
				break;
			case 'reference':
				targetTypeName = '参考值';
				break;
			case 'landWarn':
				targetTypeName = '土地红线';
				targetColor = '#AA3939';
				break;
			default:
				targetTypeName = '目标值';
				break;
		}

		let ydata = [];
		let valueMap = {
			color: '#2F4172',
			name: 'KPI 值',
			data: valueList
		};

		let targetMap = {
			color: targetColor,
			name: targetTypeName,
			data: targetList
		};
		ydata.push(valueMap);
		ydata.push(targetMap);
		ydata = unitService.categoryYxisFilter(ydata, data.data.data.unit);
		return ydata;
	};
	return {
		config: (kpiData) => {
			// 1. 根据数据时间粒度设置[查看趋势按钮]文字
            let shortBtnText,
            	longBtnText;
			switch (kpiData.type) {
				case "YEARLY":
					shortBtnText = "三年走势";
					longBtnText = "五年走势";
					break;
				case "MONTHLY":
					shortBtnText = "三个月走势";
					longBtnText = "当年走势";
					break;
				case "DAILY":
					shortBtnText = "七天走势";
					longBtnText = "当月走势";
					break;
			}
			// 2. 设置图表数据的起止时间, 用于后面的http请求
			let  startLong = new Date(kpiData.data.applyDate),
				startShort = new Date(kpiData.data.applyDate),
					   end = new Date(kpiData.data.applyDate);
			let startShortStr,
				startLongStr,
				endStr,
				periodDateStr,
				xName;
			switch (kpiData.type) {
				case "YEARLY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(2, 'years').startOf('year')); // 三年走势起点
					startLongStr = dateService.formatDate(moment(startLong).subtract(4, 'years').startOf('year')); // 五年走势起点
					endStr = dateService.formatDate(moment(end).endOf('year')); // 三年走势&五年走势终点
					periodDateStr = (moment(end).get('year')) + '年'; // 时段
					xName = '年';
					break;
				case "MONTHLY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(2, 'month').startOf('month')); // 三个月走势起点
					startLongStr = dateService.formatDate(moment(startLong).startOf('year')); // 当年走势起点
					endStr = dateService.formatDate(moment(end).endOf('month')); // 三个月走势&&当年走势终点
					periodDateStr = moment(end).get('year') + '年' + (moment(end).get('month') + 1) + '月'; // 时段
					xName = '月';
					break;
				case "DAILY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(6, 'days').startOf('day')); // 七天走势起点
					startLongStr = dateService.formatDate(moment(startLong).startOf('month')); // 当月走势起点
					 endStr = dateService.formatDate(moment(end).endOf('day')); // 七天走势&&当月走势终点
					periodDateStr = moment(end).get('year') + '年' + (moment(end).get('month') + 1) + '月' + (moment(end).get('date')) + '日'; // 时段
					xName = '日';
					break;
			}
			// 3. 返回配置对象
			return {
				"name": kpiData.name,
				"departmentName": kpiData.department.name,
				"categoryname": kpiData.tag,
				"shortBtnText": shortBtnText,
				"longBtnText": longBtnText,
				"startShortStr": startShortStr,
				"startLongStr": startLongStr,
				"endStr": endStr,
				"periodDateStr": periodDateStr,
				"applyDate": kpiData.data.applyDate,
				"xName": xName
			};
		},
		chart:(config, data, span) => {
			let xdata = configX(data.data.type, span, config.applyDate);
			let ydata = configY(span, data, xdata);
			return {
				options: {
					chart: {
						type:'spline'
					},
					tooltip: {
	                    shared: true,
	                    useHTML: true,
	                    headerFormat: '<small>{point.key}'+ config.xName+'</small><table>',
	                    pointFormat: '<tr><td style="color: {series.color}">{series.name}: </td>' +
	                        '<td style="text-align: right"><b>{point.y} '+ get_zn_value(data.data.unit)+'</b></td></tr>',
	                    footerFormat: '</table>',
	                    valueDecimals: 2
	                },
				},
				credits:{
					enabled:false,
				},
				title: {
					text: '',
				},
				xAxis: {
					categories: xdata,
					tickInterval: 1,
					title: {
                        text: config.xName
                    },
                    tickmarkPlacement: 'on',
                    labels: {
                        rotation: -45,
                        align: 'right'
                    }
				},
				yAxis: {
					startOnTick: false,
					title: {
						text: data.data.name + '(' + get_zn_value(data.data.unit) + ')'
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
				series:ydata,
				credits: {
                    enabled: false
                }
			};
		}
	};
};