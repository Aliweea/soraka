export default($scope, $rootScope, $state, qService, dataDetailFactory, dateService) => {
	'ngInject';
	const jQueryDOMToDos = () => {
		$(".navbar2position").hide(0); // 显示当前位置
		$(".navbar2return").show(0); // 显示返回按钮
		$(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
		$('#cmrefuse-s1').focus();
		$('#cmRefuseTownTooglePanel').hide(0);
		$('#cmRefuseTownToogleButton').click(() => {
			$('#cmRefuseTownTooglePanel').toggle(0);
		})
	}();

	$scope.tab1 = true;
    $scope.tab2 = false;
    $scope.show = function () {
        $scope.tab1 = true;
        $scope.tab2 = false;
    }
    $scope.show2 = function () {
        $scope.tab1 = false;
        $scope.tab2 = true;
    }

	let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjExIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIxMiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjE1IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjE2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiIxNyIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjIwIiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIyMSIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIyMiIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjMiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn1dfSwiZXhwaXJlcyI6MTQ3OTg4MzMyOTUxNCwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.1yfx07Fa3M8CzqObBbUAGsEM5m+fi00aGs5J9NiiRac=";
	let headers = {
		"X-Auth-Token":token
	};
	let params = {
		tableName: "TlcmInfrData"
	};
	var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var columnColors = new Array('#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200');
	var time = new Date();
	var thisYear = time.getUTCFullYear();
	
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

	$scope.userPercentageByKindAreaChart = {
			options:{
				colors: pieColors,
				chart: {
		            type: 'area'
		        },
		        credits: {
		            enabled: false
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        xAxis: {
		            categories: yearData,
		            tickmarkPlacement: 'on',
		            title: {
		                text: '年份'
		            },
		        },
		        yAxis: {
		            title: {
		                text: '各运营商所占比例 (%)'
		            }
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
	            text: '近五年固话用户分布情况'
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
	$scope.infrstrctPercentageByKindAreaChart = {
			options:{
				colors: pieColors,
				chart: {
		            type: 'area'
		        },
		        credits: {
		            enabled: false
		        },
		        exporting: {
					enabled: false, // 取消打印menu
				},
		        xAxis: {
		            categories: yearData,
		            tickmarkPlacement: 'on',
		            title: {
		                text: '年份'
		            },
		        },
		        yAxis: {
		            title: {
		                text: '各运营商所占比例 (%)'
		            }
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
	            text: '近五年基站分布情况'
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
		$scope.infrstrctPercentageByKindAreaChart.title.text = "近五年"+infrstrct.name+"分布情况";//"近五年"+infrstrct.name+"分布情况";
		switch(infrstrct.name.trim()){
		case '基站':
			$scope.infrstrctTotalLastYearTitle = '基站情况';
			$scope.infrstrctTotalLastYearUnion = '个';
			
			$scope.infrstrctListLastYearSelected = baseStationLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}个)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleBaseStationNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblBaseStationNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomBaseStationNumList;
			break;
		case '光纤总长':
			$scope.infrstrctTotalLastYearTitle = '光纤总长情况';
			$scope.infrstrctTotalLastYearUnion = 'km';
			
			$scope.infrstrctListLastYearSelected = optclFiberLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f}km)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleOptclFiberLengthList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblOptclFiberLengthList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomOptclFiberLengthList;
			break;
		case '交换机':
			$scope.infrstrctTotalLastYearTitle = '交换机情况';
			$scope.infrstrctTotalLastYearUnion = '门';
			
			$scope.infrstrctListLastYearSelected = switcherGateLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.0f}门)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleSwitcherGateNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblSwitcherGateNumList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomSwitcherGateNumList;
			break;
		case '互联网带宽':
			$scope.infrstrctTotalLastYearTitle = '互联网带宽情况';
			$scope.infrstrctTotalLastYearUnion = 'G';
			
			$scope.infrstrctListLastYearSelected = netBandWidthLastYearList;
			
			$scope.infrstrctPercentageByKindAreaChart.options.tooltip.pointFormat = '<span style="color:{series.color}">{series.name}</span>: <b>{point.percentage:.1f}%</b> ({point.y:,.1f}G)<br/>';
			$scope.infrstrctPercentageByKindAreaChart.series[0].data = teleNetBandWidthList;
			$scope.infrstrctPercentageByKindAreaChart.series[1].data = mblNetBandWidthList;
			$scope.infrstrctPercentageByKindAreaChart.series[2].data = unicomNetBandWidthList;
			break;
		}
	}	
};