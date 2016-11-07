export default ($localStorage) => {
	'ngInject';

	Date.prototype.format = function(format) {
		var o = {
			"M+": this.getMonth() + 1, //month
			"d+": this.getDate(), //day
			"h+": this.getHours(), //hour
			"m+": this.getMinutes(), //minute
			"s+": this.getSeconds(), //second
			"q+": Math.floor((this.getMonth() + 3) / 3), //quarter
			"S": this.getMilliseconds() //millisecond
		}
		if (/(y+)/.test(format)) format = format.replace(RegExp.$1, (this.getFullYear() + "").substr(4 - RegExp.$1.length));
		for (var k in o)
			if (new RegExp("(" + k + ")").test(format))
				format = format.replace(RegExp.$1,
					RegExp.$1.length == 1 ? o[k] :
					("00" + o[k]).substr(("" + o[k]).length));
		return format;
	};
	// 获取当前时间
	const currentDate = () => {
		return new Date();
	};

	return {
		// 获取本地存储的时间, 如果没有设置则返回现在的时间
		getSystemTime: () => {
			let date = currentDate();
			if ($localStorage.systemTime != undefined) {
				date = new Date($localStorage.systemTime);
			};
			return date;
		},
		// 将特定日期存到本地
		setSystemTime: (date) => {
			$localStorage.systemTime = date;
		},
		// 不知道干哈用的
		currentYearMonth: () => {
			let date = systemDate();
			let year = date.format('yyyy');
			let month = date.format('MM');
			let day = date.format('dd');
			//stub
			if (month == 2 && year >= 2015) {
				month = 1;
				day = 31;
			};
			return [year + "", month + "", day + ""];
		},
		// 不知道干哈用的
		formerYearMonth: () => {
			let date = systemDate();
			let year = date.format('yyyy');
			let month = date.format('MM');
			let day = date.format('dd');
			//stub
			if (month == 2 && year >= 2015) {
				month = 1;
				day = 31;
			};
			if (month == 1) {
				year = year - 1;
				month = 12;
			} else {
				month = month - 1;
			}
			return [year + "", month + "", day];
		},
		// 不知道干哈用的
		minusOneYearMonth: () => {
			var date = new Date();
			var year = date.format('yyyy');
			var month = date.format('MM');
			var day = date.format('dd');
			if (month == 1) {
				return [year - 1, 12, 31];
			} else {
				return [year, month - 1, day];
			}
		},

		// 格式化为标准输出格式
		formatDateTime: (str) => {
			return (new Date(parseInt(str))).format("yyyy-MM-dd hh:mm:ss");
		},

		// 获取后台数据时需要的日期格式
		formatDate: (date)=> {
			return (new Date(date)).format("yyyy-MM-dd");
		},

		// 二级界面highchart横坐标时间设置
		configX: (type, span, kpiDate) => {
			var curSelectedTime = kpiDate;
			var xdata = [];
			switch (type) {
				case 'YEARLY':
					if (span == 'short') {
						for (var i = 2; i >= 0; i--) {
							var yearShort = moment(curSelectedTime).subtract(i, 'years').get('year');
							xdata.push(yearShort.toString());
						}
					} else if (span == 'long') {
						for (var j = 4; j >= 0; j--) {
							var yearLong = moment(curSelectedTime).subtract(j, 'years').get('year');
							xdata.push(yearLong.toString());
						}
					}
					break;
				case 'MONTHLY':
					if (span == 'short') {
						for (var i = 2; i >= 0; i--) {
							var short = moment(curSelectedTime).subtract(i, 'month');
							var monthStr = moment(short).get('year') + '-' + (moment(short).get('month') + 1);
							xdata.push(monthStr);
						}
					} else if (span == 'long') {
						var startMonth = moment(curSelectedTime).startOf('year').get('month');
						var curMonth = moment(curSelectedTime).get('month');
						while (startMonth <= curMonth) {
							xdata.push((startMonth + 1).toString());
							startMonth++;
						}
					}
					break;
				case 'DAILY':
					if (span == 'short') {
						for (var i = 6; i >= 0; i--) {
							var short = moment(curSelectedTime).subtract(i, 'days');
							var DateStr = (moment(short).get('month') + 1) + '-' + moment(short).get('date');
							xdata.push(DateStr);
						}
					} else if (span == 'long') {
						var startDate = moment(curSelectedTime).startOf('month').get('date');
						var curDate = moment(curSelectedTime).get('date');
						while (startDate <= curDate) {
							xdata.push(startDate.toString());
							startDate++;
						}
					}
					break;
			}
			return xdata;
		}
	};
}