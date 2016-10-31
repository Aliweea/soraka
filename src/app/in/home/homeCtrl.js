export default ($scope) => {
	'ngInject';
	
	// 适应屏幕高度
	let clientH = $(window).height();
	let contentH = clientH - 50 * 2;
	$(".home-module").height(contentH);

	let rowH_common = (contentH - 40) / 3;
	$(".list-group-item-home").css("height", rowH_common + "px");
};