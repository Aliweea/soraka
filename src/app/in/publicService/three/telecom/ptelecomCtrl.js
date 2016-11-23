export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	// const jQueryDOMToDos = () => {
	// 	$(".navbar2position").hide(0); // 显示当前位置
	// 	$(".navbar2return").show(0); // 显示返回按钮
	// 	$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
	// 	$('#cmhealthcare-s1').focus();
	// 	$('#psTelecomTogglePanel').hide(0);
	// 	$('#pshealthcareToggleButton').click(() => {
	// 		$('#psTelecomTogglePanel').toggle(0);
	// 	})
	// }();

	const jQueryDOMToDos = () => {
		$(".navbar2return").show(0); // 显示 返回
		$(".navbar3position").show(0); // 显示 当前三级界面位置

        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
        $(".navTopShowMark").hide(0); // 隐藏 KPI状态KPI分类
		$('#psTelecomTogglePanel').hide(0);
		$('#pstelecomToggleButton').click(() => {
			$('#psTelecomTogglePanel').toggle(0);
		})
	}();
	let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMC0yMSAxMTowMToxNCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI0IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiI1IiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI2IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjciLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjgiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjkiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjExIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMTUiLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxNyIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIyMCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjI1IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifV19LCJleHBpcmVzIjoxNDgwNjU1OTU1OTU4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25Mb2NrZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.PT3kqmzkjZtV98yDr6kvK2gErGk8wsHUq0Krf+GOtGU="

	// let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjExIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIxMiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjE1IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjE2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiIxNyIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjIwIiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIyMSIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIyMiIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjMiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn1dfSwiZXhwaXJlcyI6MTQ3OTg4MzMyOTUxNCwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.1yfx07Fa3M8CzqObBbUAGsEM5m+fi00aGs5J9NiiRac=";
	let headers = {
		"X-Auth-Token":token
	};
	let params = {
		tableName: "TlcmInfrData"
	};
	$scope.list = [];
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');
	var time = new Date();
	var thisYear = time.getUTCFullYear();
	
	var teleTelUserList = [];
	var mblTelUserList = [];
	var unicomTelUserList = [];
	
	var teleMblUserList = [];
	var mblMblUserList = [];
	var unicomMblUserList = [];
	
	var teleNetUserList = [];
	var mblNetUserList = [];
	var unicomNetUserList = [];
	
	var tele3gUserList = [];
	var mbl3gUserList = [];
	var unicom3gUserList = [];

	var telUserLastYearList = [];
	var mblUserLastYearList = [];
	var netUserLastYearList = [];
	var bsns3gUserLastYearList = [];
	var yearData = [];
	var telUserTotalList = [];  //固话总数
	var mblUserTotalList = [];  //移动总数
	var netUserTotalList = [];  //宽带用户总数
	var bsns3gUserTotalList = []; //3G用户总数
	$scope.userList = [];

	
	var baseStationTotalList = [];
	var optclFiberLengthTotalList = [];
	var switcherGateTotalList = [];
	var netBandWidthTotalList = [];
	$scope.infrstrctTotalList = [];

	var teleBaseStationNumList = [];
	var teleOptclFiberLengthList = [];
	var teleSwitcherGateNumList = [];
	var teleNetBandWidthList = [];
				
	var mblBaseStationNumList = [];
	var mblOptclFiberLengthList = [];
	var mblSwitcherGateNumList = [];
	var mblNetBandWidthList = [];
				
	var unicomBaseStationNumList = [];
	var unicomOptclFiberLengthList = [];
	var unicomSwitcherGateNumList = [];
	var unicomNetBandWidthList = [];

	var baseStationLastYearList = [];
	var optclFiberLastYearList = [];
	var switcherGateLastYearList = [];
	var netBandWidthLastYearList = [];
				
	var telUserList = [];
	var mblUserList = [];
	var netUserList = [];
	var bsns3gUserList = [];
	$scope.usrPrcntgKindList = [];	
	
	$scope.userLastYearListSelected = [];
	$scope.lineChart = $scope.inforUserTotalLineChart;
	$scope.areaChart = $scope.userPercentageByKindAreaChart;

	let body = ['applyTime'];
	$rootScope.loading = true;
	qService.httpPost(dataDetailFactory.lastestObject, params, headers, body).then((data) => {
		if (data.errorCode == "NO_ERROR") {
			/* 最外层: 获取最新垃圾清运数据的时间
			* 目的: 当数据更新落后于当前系统选择时间时, 按最后更新时间来显示数据
			*/
			let sysTime = dateService.getSystemTime(); // 获取到系统设置的时间
			let lastTime = dateService.formatDate(data.data.applyTime); // 获取到数据库最后一条数据的时间
			if (sysTime < lastTime) {
				lastTime = sysTime;
			}
			let startTime = moment(lastTime).subtract(4, 'years').format("YYYY-MM-DD"); // 开始时间为相对于lastTime的6天前（因为要显示最近七天的数据)
			// 最新一天数据
			let params = {
				tableName: "TlcmInfrData",
				start: startTime,
				end: lastTime
			}
			let currentType = "user"; 
			$rootScope.loading = true;
			qService.httpGetbyJSOG(dataDetailFactory.query, params, headers).then((data) => {
				
				var data = data.data;
				for(var i=0; i<data.length; i++){
			
			switch(data[i].oprtrType.id){
			
			case 6071://电信
				teleTelUserList.push(data[i].telUserNum);
				teleMblUserList.push(data[i].mblUserNum);
				teleNetUserList.push(data[i].netUserNum);
				tele3gUserList.push(data[i].bsns3gUserNum);
				
				teleBaseStationNumList.push(data[i].baseStationNum);
				teleOptclFiberLengthList.push(data[i].optclFiberLength);
				teleSwitcherGateNumList.push(data[i].switcherGateNum);
				teleNetBandWidthList.push(data[i].netBandWidth);
				break;
			case 6072://移动
				mblTelUserList.push(data[i].telUserNum);
				mblMblUserList.push(data[i].mblUserNum);
				mblNetUserList.push(data[i].netUserNum);
				mbl3gUserList.push(data[i].bsns3gUserNum);
				
				mblBaseStationNumList.push(data[i].baseStationNum);
				mblOptclFiberLengthList.push(data[i].optclFiberLength);
				mblSwitcherGateNumList.push(data[i].switcherGateNum);
				mblNetBandWidthList.push(data[i].netBandWidth);
				break;
			case 6073://联通
				unicomTelUserList.push(data[i].telUserNum);
				unicomMblUserList.push(data[i].mblUserNum);
				unicomNetUserList.push(data[i].netUserNum);
				unicom3gUserList.push(data[i].bsns3gUserNum);
				
				unicomBaseStationNumList.push(data[i].baseStationNum);
				unicomOptclFiberLengthList.push(data[i].optclFiberLength);
				unicomSwitcherGateNumList.push(data[i].switcherGateNum);
				unicomNetBandWidthList.push(data[i].netBandWidth);
				break;
			}
			
		}
		var applyYear;
		for(var j=0; j<data.length/3; j++){
			applyYear = new Date(data[j*3].applyTime);
			yearData.push(applyYear.getFullYear());
			
			if(teleTelUserList[j]==null&&mblTelUserList[j]==null&&unicomTelUserList[j]==null){
				telUserTotalList.push(null);
			}else{
				telUserTotalList.push(teleTelUserList[j]+mblTelUserList[j]+unicomTelUserList[j]);
			}
			if(teleMblUserList[j]==null&&mblMblUserList[j]==null&&unicomMblUserList[j]==null){
				mblUserTotalList.push(null);
			}else{
				mblUserTotalList.push(teleMblUserList[j]+mblMblUserList[j]+unicomMblUserList[j]);
			}
			if(teleNetUserList[j]==null&&mblNetUserList[j]==null&&unicomNetUserList[j]==null){
				netUserTotalList.push(null);
			}else{
				netUserTotalList.push(teleNetUserList[j]+mblNetUserList[j]+unicomNetUserList[j]);
			}
			if(tele3gUserList[j]==null&&mbl3gUserList[j]==null&&unicom3gUserList[j]==null){
				bsns3gUserTotalList.push(null);
			}else{
				bsns3gUserTotalList.push(tele3gUserList[j]+mbl3gUserList[j]+unicom3gUserList[j]);
			}
			
			if(teleBaseStationNumList[j]==null&&mblBaseStationNumList[j]==null&&unicomBaseStationNumList[j]==null){
				baseStationTotalList.push(null);
			}else{
				baseStationTotalList.push(teleBaseStationNumList[j]+mblBaseStationNumList[j]+unicomBaseStationNumList[j]);
			}
			if(teleOptclFiberLengthList[j]==null&&mblOptclFiberLengthList[j]==null&&unicomOptclFiberLengthList[j]==null){
				optclFiberLengthTotalList.push(null);
			}else{
				optclFiberLengthTotalList.push(teleOptclFiberLengthList[j]+mblOptclFiberLengthList[j]+unicomOptclFiberLengthList[j]);
			}
			if(teleSwitcherGateNumList[j]==null&&mblSwitcherGateNumList[j]==null&&unicomSwitcherGateNumList[j]==null){
				switcherGateTotalList.push(null);
			}else{
				switcherGateTotalList.push(teleSwitcherGateNumList[j]+mblSwitcherGateNumList[j]+unicomSwitcherGateNumList[j]);
			}
			if(teleNetBandWidthList[j]==null&&mblNetBandWidthList[j]==null&&unicomNetBandWidthList[j]==null){
				netBandWidthTotalList.push(null);
			}else{
				netBandWidthTotalList.push(teleNetBandWidthList[j]+mblNetBandWidthList[j]+unicomNetBandWidthList[j]);
			}
		}
		
		$scope.displayYear = yearData[data.length/3-1];
		$scope.lastYear = yearData[data.length/3-2];
		telUserLastYearList = returnLastYearTableData(teleTelUserList, '电信', mblTelUserList, '移动', unicomTelUserList, '联通', (data.length/3-1));
		mblUserLastYearList = returnLastYearTableData(teleMblUserList, '电信', mblMblUserList, '移动', unicomMblUserList, '联通', (data.length/3-1));
		netUserLastYearList = returnLastYearTableData(teleNetUserList, '电信', mblNetUserList, '移动', unicomNetUserList, '联通', (data.length/3-1));
		bsns3gUserLastYearList = returnLastYearTableData(tele3gUserList, '电信', mbl3gUserList, '移动', unicom3gUserList, '联通', (data.length/3-1));
		$scope.userListLastYearSelected = telUserLastYearList;
		$scope.userListLastYearTitle = '固话用户情况';
		
		baseStationLastYearList = returnLastYearTableData(teleBaseStationNumList, '电信', mblBaseStationNumList, '移动', unicomBaseStationNumList, '联通', (data.length/3-1));
		optclFiberLastYearList = returnLastYearTableData(teleOptclFiberLengthList, '电信', mblOptclFiberLengthList, '移动', unicomOptclFiberLengthList, '联通', (data.length/3-1));
		switcherGateLastYearList = returnLastYearTableData(teleSwitcherGateNumList, '电信', mblSwitcherGateNumList, '移动', unicomSwitcherGateNumList, '联通', (data.length/3-1));
		netBandWidthLastYearList = returnLastYearTableData(teleNetBandWidthList, '电信', mblNetBandWidthList, '移动', unicomNetBandWidthList, '联通', (data.length/3-1));
		$scope.infrstrctTotalLastYearTitle = '基站情况';
		$scope.infrstrctTotalLastYearUnion = '个';
		$scope.infrstrctListLastYearSelected = baseStationLastYearList;
		
		$scope.userList.push({
			name: '固话用户',
			data: telUserTotalList
		});
		$scope.userList.push({
			name: '移动电话用户',
			data: mblUserTotalList
		});
		$scope.userList.push({
			name: '宽带用户',
			data: netUserTotalList
		});
		$scope.userList.push({
			name: '3G业务用户',
			data: bsns3gUserTotalList
		});
		$scope.userKindSelected = $scope.userList[0].name;
		$scope.inforUserTotalLineChart.series[0].name = $scope.userList[0].name;
		$scope.inforUserTotalLineChart.series[0].data = $scope.userList[0].data;
		
		$scope.infrstrctTotalList.push({
			name: '基站',
			data: baseStationTotalList
		});
		$scope.infrstrctTotalList.push({
			name: '光纤总长',
			data: optclFiberLengthTotalList
		});
		$scope.infrstrctTotalList.push({
			name: '交换机',
			data: switcherGateTotalList
		});
		$scope.infrstrctTotalList.push({
			name: '互联网带宽',
			data: netBandWidthTotalList
		});
		$scope.infrstrctKindSelected = $scope.infrstrctTotalList[0].name;
		$scope.infrstrctTotalLineChart.series[0].name = $scope.infrstrctTotalList[0].name;
		$scope.infrstrctTotalLineChart.series[0].data = $scope.infrstrctTotalList[0].data;
		$scope.infrstrctTotalLineChart.options.yAxis.title.text = "基站数 (个)";
		$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = '个';
		
		telUserList = returnUserByKindTableData(teleTelUserList, '电信', mblTelUserList, '移动', unicomTelUserList, '联通');
		mblUserList = returnUserByKindTableData(teleMblUserList, '电信', mblMblUserList, '移动', unicomMblUserList, '联通');
		netUserList = returnUserByKindTableData(teleNetUserList, '电信', mblNetUserList, '移动', unicomNetUserList, '联通');
		bsns3gUserList = returnUserByKindTableData(tele3gUserList, '电信', mbl3gUserList, '移动', unicom3gUserList, '联通');
		
		$scope.usrPrcntgKindList.push({
			name: '固话用户',
			data: telUserList
		});
		$scope.usrPrcntgKindList.push({
			name: '移动电话用户',
			data: mblUserList
		});
		$scope.usrPrcntgKindList.push({
			name: '宽带用户',
			data: netUserList
		});
		$scope.usrPrcntgKindList.push({
			name: '3G业务用户',
			data: bsns3gUserList
		});
		$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[0].data[0].data;
		$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[0].data[1].data;
		$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[0].data[2].data;
		$scope.userPercentageKindSelected = $scope.usrPrcntgKindList[0].name;
		
		$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleBaseStationNumList;
		$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblBaseStationNumList;
		$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomBaseStationNumList;
		$scope.lineChart = $scope.inforUserTotalLineChart;
		$scope.areaChart = $scope.userPercentageByKindAreaChart;
		$scope.changeChoice = (choice) => {
			$('#psTelecomTogglePanel').hide(0);
			if(currentType == "user"){
				$scope.userKindChange(choice);
				$scope.listLastYearTitle = $scope.userListLastYearTitle;
				$scope.listLastYearSelected = $scope.userListLastYearSelected;
				$scope.union = "人";
			}else if(currentType == "infrastructure"){
				$scope.infrstrctKindChange(choice);
				$scope.listLastYearTitle = $scope.infrstrctTotalLastYearTitle;
				$scope.listLastYearSelected = $scope.infrstrctListLastYearSelected;
				$scope.union = $scope.infrstrctTotalLastYearUnion;
			}
		};
		$scope.changeChart = (type) => {
			$('#psTelecomTogglePanel').hide(0);
				switch (type) {
					case "user":
						$scope.type = "用户";
						$scope.title = "基础用户";
						$scope.list = $scope.userList;
						$scope.lineChart = $scope.inforUserTotalLineChart;
						$scope.areaChart = $scope.userPercentageByKindAreaChart;
						$scope.listLastYearTitle = $scope.userListLastYearTitle;
						$scope.listLastYearSelected = $scope.userListLastYearSelected;
						$scope.union = "人";
						$scope.tab2 = false;
						$scope.tab1 = true;
						currentType = "user";
						break;
					case "infrastructure":
						$scope.type = "基础设施";
						$scope.title = "基础设施";
						$scope.list = $scope.infrstrctTotalList;
						$scope.lineChart = $scope.infrstrctTotalLineChart;
						$scope.areaChart = $scope.infrstrctPercentageByKindAreaChart;
						$scope.listLastYearTitle = $scope.infrstrctTotalLastYearTitle;
						$scope.listLastYearSelected = $scope.infrstrctListLastYearSelected;
						$scope.union = $scope.infrstrctTotalLastYearUnion;
						$scope.tab1 = false;
						$scope.tab2 = true;
						currentType = "infrastructure";
						break;
				}
		};
		$scope.changeChart(currentType);
	}, (err) => {
		if (err.errorCode == "UNAUTHORIZED") {
			$state.go('portal');
		} else {}
	}).finally(() => {
        $rootScope.loading = false;
    });
		} else {}
	}, (err) => {
		if (err.errorCode == "UNAUTHORIZED") {
			$state.go('portal');
		} else {}
	}).finally(() => {
        $rootScope.loading = false;
    });	

	$scope.inforUserTotalLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
		        xAxis: {
		        	tickInterval: 1,
		        	title: {
		                text: '年份'
		            },
		            categories: yearData,
		            tickmarkPlacement: 'on',
		            labels: {
	                    rotation: -45,
	                    align: 'right',
	                    step: 1,
	                    style: {
							fontSize: "10px"
						}
                	}
		        },
		        yAxis: {
		        	min: 0,
		            title: {
		                text: '用户数(人)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }],
		            labels: {
						formatter: function() {
							return this.value
						}
					}
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        tooltip: {
		            valueSuffix: '人'
		        },
			},
			legend: {
				layout: 'vertical',
                align: 'right',
                verticalAlign: 'top',
                x: 0,
                y: 100,
                borderWidth: 0
			},
			title: {
	            text: '近五年固话用户情况',
	            style: {
					fontSize: "15px"
				}
	        },
	        series: [{
	        	color: '#2F4172',
	            name: '',
	            data: []
	        }]
	};
	$scope.userPercentageByKindAreaChart = {
			options:{
				colors: pieColors,
				chart: {
		            type: 'area'
		        },
		        credits: {
		            enabled: false
		        },
		        xAxis: {
		            categories: yearData,
		            tickInterval: 1,
		            tickmarkPlacement: 'on',
		            title: {
		                text: '年份'
		            },
	                labels: {
	                    rotation: -45,
	                    align: 'right',
	                    step: 1,
	                    style: {
							fontSize: "10px"
						}
	                }
		        },
		        yAxis: {
		            title: {
		                text: '各运营商所占比例 (%)'
		            }
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        tooltip: {
		            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f} 人)<br/>',
		            shared: true
		        },
		        plotOptions: {
		            area: {
		                stacking: 'percent',
		                lineColor: '#ffffff',
		                lineWidth: 1,
		                marker: {
		                    lineWidth: 1,
		                    lineColor: '#ffffff'
		                }
		            }
		        }
			},
	        title: {
	            text: '近五年固话用户分布情况',
	            style: {
					fontSize: "15px"
				}
	        },
	        series: [{
	        	name: '电信',
	        	data: []
	        },{
	        	name: '移动',
	        	data: []
	        },{
	        	name: '联通',
	        	data: []
	        }]
	};
	$scope.infrstrctTotalLineChart = {
			options:{
				credits: {
		            enabled: false
		        },
		        xAxis: {
		        	title: {
		                text: '年份'
		            },
		            categories: yearData,
		            tickInterval: 1,
		            tickmarkPlacement: 'on',
		            labels: {
	                    rotation: -45,
	                    align: 'right',
	                    step: 1,
	                    style: {
							fontSize: "10px"
						}
	                }
		        },
		        yAxis: {
		        	min: 0,
		            title: {
		                text: '基站数(个)'
		            },
		            plotLines: [{
		                value: 0,
		                width: 1,
		                color: '#808080'
		            }],
		            labels: {
						formatter: function() {
							return this.value
						}
					}
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        tooltip: {
		            valueSuffix: '个'
		        },
		        legend: {
		            enabled: false
		        }
			},
			title: {
	            text: '近五年基站情况',
	            style: {
					fontSize: "15px"
				}
	        },
	        series: [{
	            name: '',
	            data: []
	        }]
	};
	
	$scope.infrstrctPercentageByKindAreaChart = {
			options:{
				colors: pieColors,
				chart: {
		            type: 'area'
		        },
		        credits: {
		            enabled: false
		        },
		        xAxis: {
		            categories: yearData,
		            tickInterval: 1,
		            tickmarkPlacement: 'on',
		            title: {
		                text: '年份'
		            },
		            labels: {
	                    rotation: -45,
	                    align: 'right',
	                    step: 1,
	                    style: {
							fontSize: "10px"
						}
	                }
		        },
		        yAxis: {
		            title: {
		                text: '各运营商所占比例 (%)'
		            }
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        tooltip: {
		            pointFormat: '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}个)<br/>',
		            shared: true
		        },
		        plotOptions: {
		            area: {
		                stacking: 'percent',
		                lineColor: '#ffffff',
		                lineWidth: 1,
		                marker: {
		                    lineWidth: 1,
		                    lineColor: '#ffffff'
		                }
		            }
		        }
			},
	        title: {
	            text: '近五年基站分布情况',
	            style: {
					fontSize: "15px"
				}
	        },
	        series: [{
	        	name: '电信',
	        	data: []
	        },{
	        	name: '移动',
	        	data: []
	        },{
	        	name: '联通',
	        	data: []
	        }]
	};
	
	//function 
	function returnLastYearTableData(list1, name1, list2, name2, list3, name3, index){
		
		var reList = [];
		reList.push({
			name: name1,
			number: list1[index]
		});
		reList.push({
			name: name2,
			number: list2[index]
		});
		reList.push({
			name: name3,
			number: list3[index]
		});
		reList.push({
			name: '合计',
			number: list1[index]+list2[index]+list3[index]
		});
		return reList;
	}
	function returnUserByKindTableData(list1, name1, list2, name2, list3, name3){
		
		var reList = [];
		reList.push({
			name: name1,
			data: list1
		});
		reList.push({
			name: name2,
			data: list2
		});
		reList.push({
			name: name3,
			data: list3
		});
		return reList;
	}
	$scope.userKindChange = function(user){
		$scope.inforUserTotalLineChart.title.text = "近五年"+user.name+"情况";
		$scope.inforUserTotalLineChart.series[0].name = user.name;
		$scope.inforUserTotalLineChart.series[0].data = user.data;
		switch(user.name.trim()){
		
		case '固话用户':  
			$scope.userListLastYearSelected = telUserLastYearList;
			$scope.userListLastYearTitle = '固话用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[0].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[0].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[0].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年固话用户分布情况';
			break;
		case '移动电话用户':  
			$scope.userListLastYearSelected = mblUserLastYearList;
			$scope.userListLastYearTitle = '移动电话用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[1].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[1].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[1].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年移动电话用户分布情况';
			break;
		case '宽带用户':  
			$scope.userListLastYearSelected = netUserLastYearList;
			$scope.userListLastYearTitle = '宽带用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[2].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[2].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[2].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年宽带用户分布情况';
			break;
		case '3G业务用户':  
			$scope.userListLastYearSelected = bsns3gUserLastYearList;
			$scope.userListLastYearTitle = '3G业务用户情况';
			$scope.userPercentageByKindAreaChart.series[0].data = $scope.usrPrcntgKindList[3].data[0].data;
			$scope.userPercentageByKindAreaChart.series[1].data = $scope.usrPrcntgKindList[3].data[1].data;
			$scope.userPercentageByKindAreaChart.series[2].data = $scope.usrPrcntgKindList[3].data[2].data;
			$scope.userPercentageByKindAreaChart.title.text = '近五年3G业务用户分布情况';
			break;
		
		}
	};
	$scope.infrstrctKindChange = function(infrstrct){
		$scope.infrstrctTotalLineChart.title.text = "近五年"+infrstrct.name+"情况";
		$scope.infrstrctTotalLineChart.series[0].name = infrstrct.name;
		$scope.infrstrctTotalLineChart.series[0].data = infrstrct.data;
		$scope.infrstrctPercentageByKindAreaChart.title.text = "近五年"+infrstrct.name+"分布情况";//"近五年"+infrstrct.name+"分布情况";
		switch(infrstrct.name.trim()){
		case '基站':
			$scope.infrstrctTotalLastYearTitle = '基站情况';
			$scope.infrstrctTotalLastYearUnion = '个';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "基站数 (个)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = '个';
			
			$scope.infrstrctListLastYearSelected = baseStationLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}个)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleBaseStationNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblBaseStationNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomBaseStationNumList;
			break;
		case '光纤总长':
			$scope.infrstrctTotalLastYearTitle = '光纤总长情况';
			$scope.infrstrctTotalLastYearUnion = 'km';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "光纤总长 (km)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = 'km';
			
			$scope.infrstrctListLastYearSelected = optclFiberLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f}km)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleOptclFiberLengthList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblOptclFiberLengthList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomOptclFiberLengthList;
			break;
		case '交换机':
			$scope.infrstrctTotalLastYearTitle = '交换机情况';
			$scope.infrstrctTotalLastYearUnion = '门';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "交换机门数 (门)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = '门';
			
			$scope.infrstrctListLastYearSelected = switcherGateLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}门)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleSwitcherGateNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblSwitcherGateNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomSwitcherGateNumList;
			break;
		case '互联网带宽':
			$scope.infrstrctTotalLastYearTitle = '互联网带宽情况';
			$scope.infrstrctTotalLastYearUnion = 'G';
			$scope.infrstrctTotalLineChart.options.yAxis.title.text = "互联网带宽 (G)";
			$scope.infrstrctTotalLineChart.options.tooltip.valueSuffix = 'G';
			
			$scope.infrstrctListLastYearSelected = netBandWidthLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f}G)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleNetBandWidthList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblNetBandWidthList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomNetBandWidthList;
			break;
		}
	}	
};