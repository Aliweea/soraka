export default ($scope, $rootScope, qService, kpiRes, xService, toolService) => {
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
	let params = {

	};
	let headers = {
		"X-Auth-Token": "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6NzksImNyZWF0ZV90aW1lIjoiMjAxNS0wNy0wNSAxNTowNjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNTowNzowNiIsImFjY291bnQiOiJnYWowMSIsInBhc3N3b3JkIjpudWxsLCJ0aXRsZSI6IuWFrOWuieWxgCIsIm5hbWUiOiLlhazlronlsYAiLCJzeXN0ZW1OYW1lIjoi5YWs5a6J5bGAIiwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkRJUkVDVE9SIiwiZGVwYXJ0bWVudHMiOlt7IkBpZCI6IjIiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifV19LCJleHBpcmVzIjoxNDgwMTAxNzc1NTEyLCJncmFudGVkQXV0aHMiOlsiUk9MRV9ESVJFQ1RPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6ImdhajAxIiwicGFzc3dvcmQiOm51bGx9.oazO0vE7wp76MqfN+h9kmTZH1nPjU1ZEFDmW0tqqyWQ="
    };
    $rootScope.loading = true;
    qService.httpGet(kpiRes.blueMap, params,headers).then((data) => {
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
};