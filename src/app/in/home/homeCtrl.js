export default ($scope, $rootScope, qService, kpiRes, xService, toolService) => {
	'ngInject';
	// 隐藏topbar上的logout按钮
    $('#footlabel').show(0);
	$('#home_logout').show(0);
    $('#navBottomReturn').hide(0);
	
	let params = {

	};
	let headers = {

    };
    $rootScope.loading = true;
    qService.httpGetWithToken(kpiRes.blueMap, params,headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
        	let t = data.data, m = [], o = {};
        	for (var i = t.length - 1; i >= 0; i--) {
        		m.push(t[i].id);
        		o[t[i].id] = t[i].categories[0].id;
        	}
        	xService.h("m", toolService.arraySub(["1", "2", "3", "4", "5", "6"], m));
        	xService.o(o);
        } else {

        }
    }, (err) => {
        if (err.errorCode == "UNAUTHORIZED") {
            $state.go('portal');
        } else {

        }
    }).finally(() => {
        $rootScope.loading = false;
    });

    // 适应屏幕高度
    $rootScope.loading = true;
	const adjustLayout = () => {
		let clientH = $(window).height();
		let clientW = $(window).width();
		if (clientW < clientH) { // 竖屏
			$(".list-group-item-side").css("height", "126px");
            let midH = clientH - 126 * 2 - 51 * 2;
            if ($rootScope.clientMax !== undefined) { // 解决输入法弹窗bug
                let midH = $rootScope.clientMax - 126 * 2 - 51 * 2;    
            }
			$("#list-group-middle").height(midH);
		} else {
			$(".list-group-item-side").css("height", "126px");
            let midH = clientW - 126 * 2 - 51 * 2;
            if ($rootScope.clientMax !== undefined) {
                let midH = $rootScope.clientMax - 126 * 2 - 51 * 2;
            }
			$("#list-group-middle").height(midH);
		}
	}();
	$rootScope.loading = false;
};