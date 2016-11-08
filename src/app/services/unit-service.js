/*
* 功能: 单位相关
*/
export default () => {
	'ngInject';

	const handlePercentageUnit = (value) => {
		// for 0.1 -> 10%
		return (value * 100).toFixed(1);
	}
	const handleNormalUnit = (value) => {
		return value + UNIT_MAP[unit];
	}
	const handleTTTUnit = (value) => {
		return (value / 10000000).toFixed(1);
	}
	const handleMUnit = (value) => {
		return (value / 1000000).toFixed(1);
	}
	const handleBUnit = (value) => {
		return (value / 100000000).toFixed(1);
	}
	const handleTTUnit = (value) => {
		return (value / 10000).toFixed(1);
	}
	const handleThousandPercetage = (value) => {
		return (value * 1000).toFixed(2);
	}

	const filter = (value, unit) => {
		let result = value;
		switch (unit) {
			case 'thoudsand_percentage':
				result = handleThousandPercetage(value);
				break;
			case 'percentage':
				result = handlePercentageUnit(value);
				break;
			case 'tt_rmb':
				result = handleTTUnit(value);
				break;
			case 'tt_dollor':
				result = handleTTUnit(value);
				break;
			case 'tt_people':
				result = handleTTUnit(value);
				break;
			case 'm_rmb':
				result = handleMUnit(value);
				break;
			case 'ttt_rmb':
				result = handleTTTUnit(value);
				break;
			case 'b_rmb':
				result = handleBUnit(value);
				break;
			case 'm_dollor':
				result = handleMUnit(value);
				break;
			case 'ttt_dollor':
				result = handleTTTUnit(value);
				break;
			case 'b_dollor':
				result = handleBUnit(value);
				break;
		}
		return parseFloat(result);
	};
	
	return {
		numberWithCommas: (x) => {
			return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
		},

		getMonthList: (lst) => {
			let n_list = [];
			for (let i = 0; i < lst.length; i++) {
				n_list.push(lst[i] + '月');
			};
			return n_list;
		},

		filter2DoubleList: (lst) => {
			let n_list = [];
			for (let i = 0; i < lst.length; i++) {
				n_list.push(parseFloat(lst[i].toFixed(1)));
			};
			return n_list;
		},

		getDouble: (v) => {
			return parseFloat(v.toFixed(1));
		},

		getInt: (v) => {
			return parseInt(v);
		},

		categoryYxisFilter: (yData, unit) => {
			let rc_list = [];
			for (let i = 0; i < yData.length; i++) {
				let v = yData[i];
				let temp_map = {};
				let temp_list = [];
				for (let h = 0; h < v.data.length; h++) {
					if(v.data[h] === null){
						temp_list.push(v.data[h]);
						continue;
					}
					temp_list.push(filter(v.data[h],unit));
				};
				temp_map.name = v.name;
				temp_map.color = v.color;
				temp_map.data = temp_list;
				rc_list.push(temp_map);
			};
			return rc_list;
		},

		sigleFilter: (val, unit)=> {
			return filter(val, unit);
		}
	};
};