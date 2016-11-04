export default(AuthTool, $state) => {
	'ngInject';

	$("#logout").bind('click', (event) => {
		AuthTool.delLoginInfo();
		console.log("已退出登录, 本地用户信息已删除");
		$state.go("portal");
	});
	$("#home_logout").bind('click', (event) => {
		AuthTool.delLoginInfo();
		console.log("已退出登录, 本地用户信息已删除");
		$state.go("portal");
	});
};