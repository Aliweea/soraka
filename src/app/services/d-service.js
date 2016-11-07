/*
* 功能: 二级界面相关service
* --Mondooo
*/
export default (dateService) => {
	'ngInject';
	
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
				periodDateStr;
			switch (kpiData.type) {
				case "YEARLY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(2, 'years').startOf('year')); // 三年走势起点
					startLongStr = dateService.formatDate(moment(startLong).subtract(4, 'years').startOf('year')); // 五年走势起点
					endStr = dateService.formatDate(moment(end).endOf('year')); // 三年走势&五年走势终点
					periodDateStr = (moment(end).get('year')) + '年'; // 时段
					break;
				case "MONTHLY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(2, 'month').startOf('month')); // 三个月走势起点
					startLongStr = dateService.formatDate(moment(startLong).startOf('year')); // 当年走势起点
					endStr = dateService.formatDate(moment(end).endOf('month')); // 三个月走势&&当年走势终点
					periodDateStr = moment(end).get('year') + '年' + (moment(end).get('month') + 1) + '月'; // 时段
					break;
				case "DAILY":
					startShortStr = dateService.formatDate(moment(startShort).subtract(6, 'days').startOf('day')); // 七天走势起点
					startLongStr = dateService.formatDate(moment(startLong).startOf('month')); // 当月走势起点
					 endStr = dateService.formatDate(moment(end).endOf('day')); // 七天走势&&当月走势终点
					periodDateStr = moment(end).get('year') + '年' + (moment(end).get('month') + 1) + '月' + (moment(end).get('date')) + '日'; // 时段
					break;
			}
			// 3. 返回配置对象
			return {
				"shortBtnText": shortBtnText,
				"longBtnText": longBtnText,
				"startShortStr": startShortStr,
				"startLongStr": startLongStr,
				"endStr": endStr,
				"periodDateStr": periodDateStr,
				"applyDate": kpiData.data.applyDate
			};
		},
		chart:(config, data, span) => {
			return {
				options: {
					chart: {
						type:'spline'
					},
					tooltip: {
						style: {
							padding: 10,
							fontWeight: 'bold'
						}
					}
				},
				credits:{
					enabled:false,
				},
				title: {
					text: data.data.name,
					style:{
						fontWeight:'bold'
					}
				},
				xAxis: {
					categories: dateService.configX(data.data.type, span, config.applyDate),
				},
				yAxis: {
					plotLines:[{
						color:'red',
						dashStyle:'solid',
						value:7.9,
						width:2,
						label:{
							text:'',
							align:'right',
							x:10,
							style: {
								fontSize: '8px',
								fontWeight: 200
							}
						}
					}],
					title: {
						text: data.data.name
					},
				},
				tooltip: {
					valueSuffix: ''
				},
				legend: {
					layout: 'vertical',
					align: 'right',
					verticalAlign: 'middle',
					borderWidth: 0
				},
				series:[{
					name: '真实值',
					color:"rgb(205,130,61)",
					data: data.data.data.value
				},{
					name: '目标值',
					color:"rgb(51,181,88)",
					data: data.data.data.target
				}]
			};
		}
	};
};