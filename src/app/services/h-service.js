// 记录ui-href跳转记录
export default() => {
	'ngInject';
	let h = "app.in.home";
	return {
		state: (history = "") => {
			if (history !== "") {
				h = history;
			}
			return h;
		}
	}
};