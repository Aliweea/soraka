// 记录ui-href跳转记录
export default() => {
	'ngInject';
	let h = {
		"name": "app.in.home"
	};
	return {
		state: (history = "") => {
			if (history !== "") {
				h.name = history.current.name;
				if (!$.isEmptyObject(history.params)) {
					h.params = history.params;
				}
			}
			return h;
		}
	}
};