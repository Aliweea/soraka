export default ($scope) => {
	'ngInject';
	// 隐藏topbar上的logout按钮
    $('#footlabel').show(0);
	$('#home_logout').show(0);
    $('#navBottomReturn').hide(0);
	
	// 适应屏幕高度
	const adjustLayout = () => {
		let clientH = $(window).height();
		let clientW = $(window).width();
		if (clientW < clientH) { // 竖屏
			let contentH = clientH - 50 * 2;
			let rowH_common = (contentH - 20) / 3;
			$(".list-group-item-home").css("height", rowH_common + "px");
		} //横屏将根据图片150x150的大小自动调整
	}();
	// 根据屏幕调整布局
	const adjustItems = () => {
		let clientH = $(window).height();
		let clientW = $(window).width();
		let midH = clientH - 126 * 2 - 51 * 2;
		$("#list-group-middle").height(midH);
	}();
};