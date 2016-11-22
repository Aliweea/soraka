// 记录ui-href跳转记录
export default($state) => {
	'ngInject';
	let h = [{
		"name": "app.in.home",
		"params": {}
	}];
	let s = {
		"name": "app.in.home",
		"params": {}
	};
	return {
		// 三级界面不要注册
		register: (state) => {
			if (state !== "") {
				let temp = {};
				temp.name = state.current.name;
				if (!$.isEmptyObject(state.params)) {
					temp.params = state.params;
				}
				h.push(temp);
			}
		}, 
		back: () => {
			let last = h.pop();
			if (last.params == undefined) {
				$state.go(last.name);
			} else {
				$state.go(last.name, last.params);
			}
		}, 
		state: (history = "") => {
			if (history !== "") {
				s.name = history.current.name;
				if (!$.isEmptyObject(history.params)) {
					s.params = history.params;
				}
			}
			return s;
		}
	}
};