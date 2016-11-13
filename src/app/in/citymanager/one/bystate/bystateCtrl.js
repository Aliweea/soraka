export default($scope, $rootScope, $stateParams, qService, kpiRes, dateService, hService, $state) => {
	'ngInject';
    hService.state($state);

    const jQueryDOMToDos = () => {
        $(".navbar2return").hide(0); // 隐藏返回按钮
        $(".navbar2position").show(0); // 显示当前位置
        $(".navTopShowMark").show(0); // 显示KPI状态 KPI分类
    }();
    
	let categoryId = $stateParams.categoryId;
	let state = $stateParams.state;
	let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjExIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIxMiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjE1IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjE2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiIxNyIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjIwIiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIyMSIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIyMiIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjMiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn1dfSwiZXhwaXJlcyI6MTQ3OTg4MzMyOTUxNCwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.1yfx07Fa3M8CzqObBbUAGsEM5m+fi00aGs5J9NiiRac=";
	let dateStr = dateService.formatDate(dateService.getSystemTime());
	let params = {
		"currentDate": dateStr,
		"categoryId": categoryId
	}
	let headers = {
		"X-Auth-Token":token
	};
    $rootScope.loading = true;
	qService.httpGet(kpiRes.categorykpi, params,headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
            let rawData = data.data.data;
            $scope.deptname = rawData[0].department.name;
            let filtedData = [];
            for (var i = 0; i < rawData.length; i++) {
            	if (rawData[i].data.status == state) {
            		filtedData.push(rawData[i]);
            	}
            }
            $scope.items = filtedData;
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