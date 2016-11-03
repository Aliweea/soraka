export default($rootScope) => {
	'ngInject';

	return (input) => {
		var out = "";

		if(input == null) {
			out = "无数据";
		}
		else {
			if(input > 200) {
				out = input.toString();
			} else if(input > 1) {
				out = input.toFixed(2);
			}
			else if(Math.abs(input) >= 0.01) {
				out = (input * 100).toFixed(1).toString();
			} else if(Math.abs(input) < 0.01) {
				out = (input * 1000).toFixed(2).toString();
			}
		}
		switch(input) {
			case "people":
				out = "人";
				break;
			case "thoudsand_percentage":
				out = "‰";
				break;
			case "percentage":
				out = "%";
				break;
			case "nil":
				out = "";
				break;
			default:
		}
		return out;
	}
};