export default ($scope,$state, dateService, dataDetailFactory, qService, kpiDetailService) => {
  'ngInject';

  let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI0IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI1IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiI2IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiNyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiI4IiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiI5IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIxMCIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIxMSIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjEzIiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiIxNCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjE2IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiMTciLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE4IiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxOSIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjAiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjEiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn1dfSwiZXhwaXJlcyI6MTQ3ODk5NzEwMDA0NSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.zfXDZ0KX6J/Yj3Ups5sAeJCS2Sl3LU1uURWXHOdCSA0=";
  let headers={"X-Auth-Token":token};
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
	var eachMonthData = [

		{
			month:'1',
			data:[0,0,0,0]      //0 是总数 , 1是受伤人数 , 2 死亡人数 ,3是直接财产损失
		},
		{
			month:'2',
			data:[0,0,0,0]
		},
		{
			month:'3',
			data:[0,0,0,0]
		},
		{
			month:'4',
			data:[0,0,0,0]
		},
		{
			month:'5',
			data:[0,0,0,0]
		},
		{
			month:'6',
			data:[0,0,0,0]
		},
		{
			month:'7',
			data:[0,0,0,0]
		},
		{
			month:'8',
			data:[0,0,0,0]
		},
		{
			month:'9',
			data:[0,0,0,0]
		},
		{
			month:'10',
			data:[0,0,0,0]
		},
		{
			month:'11',
			data:[0,0,0,0]
		}, 
		{
			month:'12',
			data:[0,0,0,0]
		}
	];

	var stationInfo = [
		{
			id:'1',
			name:'城厢镇',
			value:0,
			desc:''
		},
		{
			id:'2',
			name:'双凤镇',
			value:0,
			desc:''
		},
		{
			id:'3',
			name:'沙溪镇',
			value:0,
			desc:''
		},
		{
			id:'4',
			name:'浏河镇',
			value:0,
			desc:''
		},
		{
			id:'5',
			name:'浮桥镇',
			value:0,
			desc:''
		},
		{
			id:'6',
			name:'璜泾镇',
			value:0,
			desc:''
		},
		{
			id:'7',
			name:'新区',
			value:0,
			desc:''
		},
		{
			id:'8',
			name:'港区',
			value:0,
			desc:''
		},
		{
			id:'9',
			name:'科教新城',
			value:0,
			desc:''
		}

	];

	//查看月份的每个接警单位接警数
	var eachStationData = {
			categories:[
				{
					cateData:[]
				},
				{
					cateData:[]
				},
				{
					cateData:[]
				},
				{
					cateData:[]
				}
			],
			values:[
				{
					moreLargeAccident:[],
					largeAccident:[],
					littleLargeAccident:[],
					commonAccident:[]
				},
				{
					moreLargeAccident:[],
					largeAccident:[],
					littleLargeAccident:[],
					commonAccident:[]
				},
				{
					moreLargeAccident:[],
					largeAccident:[],
					littleLargeAccident:[],
					commonAccident:[]
				},
				{
					moreLargeAccident:[],
					largeAccident:[],
					littleLargeAccident:[],
					commonAccident:[]
				}
			]
	};
		
	$scope.amountData = {
		amount:0,
		elseIndicator:0,
		moreLargeAccident:0,
		largeAccident:0
	}

	$scope.sumData={
			sumAccident:0
	}
	
	$scope.pieTypeData1 = {
		data:[
				['特重大事故',0],
				['重大事故',0],
				['较大事故',0],
				['一般事故',0]
	          ],
	    unit:''
	};

	$scope.barCountStationData1 = {
		categories:[],
		data:[],
		title:'受伤人数(人)',
		unit:'人',
		type:0
	}	

	var pieTypeData = [
		        ['特重大事故',0],
				['重大事故',0],
				['较大事故',0],
				['一般事故',0]
	];

	var barCountStationData = {
		categories:[],
		data:[]
	}

	$scope.thisMonthTotalData = {
    	amount:0,
    	majorAccident:0,
    	largeAccident:0,
    	type:0
    };

    $scope.lineChartData = {
    	categories:[],
    	data:[],
    	name:'',
    	title:'事故发生数(起)',
		unit:'起',
    	type:0
    }

	
//---------------------------********系统时间获取*********------------------------------------------
	var  dateTime = new Date(dateService.getSystemTime());
    console.log(dateTime);
	//var dateTime = new Date("2014-12-12T14:57:55.091Z");
	 $scope.getDate = {
	    year:dateTime.getFullYear(),
	    month:dateTime.getMonth()+1
	  }
    console.log($scope.getDate.year + "," +$scope.getDate.month);


//---------------------------*****************------------------------------------------
    var processFunction1 = function(data){
    	console.log(data.data);
    	var obj = data.data;
    	if(obj != null){
    		var year_ = obj.year;
    		var month_ = obj.month;
    		console.log(month_);
    		if($scope.getDate.year > year_){
    			$scope.getDate.year = year_;
    			$scope.getDate.month = month_;
    		}else if($scope.getDate.year == year_){
    			$scope.getDate.month = month_;
    		}

    	}

   //---------------------------********api调用参数*********------------------------------------------

	var tableName='ProductionSafetyData';

	var advancedQueryConfig = {
		"year":{
	    "value1":$scope.getDate.year,
	    "queryType":"eq",
	    "valueType":"innt"
		}
	}
//-----------------------------------处理函数返回data的函数，-------------------------------
	
	var processFunction = function(data){
		console.log(data);
		//组装每月数据

		wireEachMonthData(data.data);
		//初始化图表数据
		initChartData(data.data);


		function initChartData(data){
		if(data.length == 0){
			alert('无数据 ！');
			return;
		}else if(eachMonthData[$scope.getDate.month - 1].police == 0 && eachMonthData[$scope.getDate.month - 1].criminal == 0 && eachMonthData[$scope.getDate.month - 1].trafficAccident == 0 && eachMonthData[$scope.getDate.month - 1].fire == 0 && eachMonthData[$scope.getDate.month - 1].elseCase == 0){
			alert('本月数据未录入 ！');
			return;
		}

		createLineChartData();

		createBarCountStationDataAndPieTypeData();

		};

	function wireEachMonthData(data){
		for(var i = 0 ; i < data.length ; i ++){
			var month  =  data[i].month;
			var type = data[i].type;
			eachMonthData[month - 1].data[type] = eachMonthData[month - 1].data[type] + data[i].moreLargeAccident + data[i].largeAccident +data[i].littleLargeAccident+data[i].commonAccident;
			
			if(month == $scope.getDate.month){
				eachStationData.categories[type].cateData.push(data[i].town.name);
				eachStationData.values[type].moreLargeAccident.push(data[i].moreLargeAccident); 
				eachStationData.values[type].largeAccident.push(data[i].largeAccident);
				eachStationData.values[type].littleLargeAccident.push(data[i].littleLargeAccident);
				eachStationData.values[type].commonAccident.push(data[i].commonAccident);
			}
		}
	};


//	function createPieChartData(data){
//		var pieChartData = [
//			['治安类', parseInt(data.police)],
//			['刑事类', data.criminal],
//			['交通事故类', data.trafficAccident],
//			['火灾类', data.fire],
//			['其它', data.elseCase]
//		];
//		return pieChartData;
//	};

	function createLineChartData(){
		var nameArray = ['生产安全事故数(起)','死亡人数(人)','死亡人数(人)','直接财产损失(元)'];
		var s=0;
		for(var i = 0 ; i < $scope.getDate.month; i ++){
			$scope.lineChartData.categories.push((i + 1) + '月');
			$scope.lineChartData.data.push(eachMonthData[i].data[$scope.lineChartData.type]);
			var temp=eachMonthData[i].data[$scope.lineChartData.type];
			s=s+temp;
			$scope.lineChartData.name = nameArray[$scope.lineChartData.type];	
		}
		$scope.sumData.sumAccident=s;
	};


	function getStationName(id){
		for(var i = 0 ;  i < stationInfo.length ; i ++){
			if(stationInfo[i].id == id)
				return stationInfo[i].name;
		}
		return '未知';
	};

	function createBarCountStationDataAndPieTypeData(){	
		var moreLargeAccident = 0,
		largeAccident = 0,
		littleLargeAccident = 0,
		commonAccident=0,
		moreLargeAccident1 = 0,
		largeAccident1 = 0,
		littleLargeAccident1 = 0,
		commonAccident1=0;	
		for(var i = 0 ; i < eachStationData.categories[0].cateData.length ; i ++){
			barCountStationData.categories = eachStationData.categories[0].cateData;
			$scope.barCountStationData1.categories = eachStationData.categories[1].cateData;
			barCountStationData.data.push(eachStationData.values[0].moreLargeAccident[i] + eachStationData.values[0].largeAccident[i] + eachStationData.values[0].littleLargeAccident[i]+eachStationData.values[0].commonAccident[i]);
			$scope.barCountStationData1.data.push(eachStationData.values[1].moreLargeAccident[i] + eachStationData.values[1].largeAccident[i] + eachStationData.values[1].littleLargeAccident[i]+eachStationData.values[1].commonAccident[i]);
			moreLargeAccident = moreLargeAccident + eachStationData.values[0].moreLargeAccident[i];
			largeAccident = largeAccident + eachStationData.values[0].largeAccident[i];
			littleLargeAccident = littleLargeAccident + eachStationData.values[0].littleLargeAccident[i];
			commonAccident = commonAccident + eachStationData.values[0].commonAccident[i];
			moreLargeAccident1 = moreLargeAccident1 + eachStationData.values[1].moreLargeAccident[i];
			largeAccident1 = largeAccident1 + eachStationData.values[1].largeAccident[i];
			littleLargeAccident1 = littleLargeAccident1 + eachStationData.values[1].littleLargeAccident[i];
			commonAccident1 = commonAccident1 + eachStationData.values[1].commonAccident[i];
		}
		pieTypeData[0][1] = moreLargeAccident;
		pieTypeData[1][1] = largeAccident;
		pieTypeData[2][1] = littleLargeAccident;
		pieTypeData[3][1] = commonAccident;
		$scope.amountData.amount = moreLargeAccident + largeAccident + littleLargeAccident+commonAccident;
		$scope.amountData.moreLargeAccident=moreLargeAccident;
		$scope.amountData.largeAccident=largeAccident;
		$scope.pieTypeData1.data[0][1] = moreLargeAccident1;
		$scope.pieTypeData1.data[1][1] =largeAccident1;
		$scope.pieTypeData1.data[2][1] = littleLargeAccident1;
		$scope.pieTypeData1.data[3][1] = commonAccident1;
		$scope.amountData.elseIndicator = moreLargeAccident1 + largeAccident1 + littleLargeAccident1+commonAccident1;	
		$scope.pieTypeData1.unit = '人';	 
	}

	$scope.typeChange1 = function(type){
		var moreLargeAccident = 0,
		largeAccident = 0,
		littleLargeAccident = 0,
		commonAccident=0;
		var titles = ['','受伤人数(人)','死亡人数(人)','直接财产损失(元)']
		var units = ['','人','人','元']
		$scope.barCountStationData1.categories = eachStationData.categories[type].cateData;
		$scope.barCountStationData1.data = [];
		for(var i = 0 ; i < eachStationData.categories[0].cateData.length ; i ++){		
			$scope.barCountStationData1.data.push(eachStationData.values[type].moreLargeAccident[i] + eachStationData.values[type].largeAccident[i] + eachStationData.values[type].littleLargeAccident[i]+eachStationData.values[type].commonAccident[i]);
			moreLargeAccident = moreLargeAccident + eachStationData.values[type].moreLargeAccident[i];
			largeAccident = largeAccident + eachStationData.values[type].largeAccident[i];
			littleLargeAccident = littleLargeAccident + eachStationData.values[type].littleLargeAccident[i];
			commonAccident = commonAccident + eachStationData.values[type].commonAccident[i];
		}
		$scope.amountData.elseIndicator = moreLargeAccident + largeAccident + littleLargeAccident+commonAccident;
		$scope.barCountStationData1.unit = units[type];
		$scope.barCountStationData1.title = titles[type];
		$scope.pieTypeData1.data[0][1] = moreLargeAccident;
		$scope.pieTypeData1.data[1][1] = largeAccident;
		$scope.pieTypeData1.data[2][1] = littleLargeAccident;
		$scope.pieTypeData1.data[3][1] = commonAccident;
		$scope.pieTypeData1.unit = units[type];

		$scope.pieType1 = {  //第二个饼图
			                   options: {
			                             colors:newColors,
			                   
			                    chart: {
			                        plotBackgroundColor: null,
			                        plotBorderWidth: null,
			                        plotShadow: false
			                    },
			                    credits:{
			                        enabled:false
			                        },
			                    title: {
			                        text: $scope.getDate.year+"年"+$scope.getDate.month+"月份全市各类交通事故详情"
			                    },
			                    tooltip: {
			                        pointFormat: '<b>{point.name}</b>:{point.y:1.f}(' + $scope.pieTypeData1.unit +')</b>'
			                    },
			                    plotOptions: {
			                        pie: {
			                            allowPointSelect: true,
			                            cursor: 'pointer',
			                            dataLabels: {
			                                enabled: true,
			                                color: '#000000',
			                                connectorColor: '#000000',
			                                format: '{point.percentage:.1f} %'
			                            },
			                            showInLegend: true
			                        }
			                                        
			                }
			            },
			                series: [{
			                    type: 'pie',
			                    name: '交通事故数',
			                    data: $scope.pieTypeData1.data
			                }]                        
			};

$scope.barCountStation1 = {  //第二个柱状图
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: $scope.barCountStationData1.categories ,
            title: {                                                       
                text: '乡镇',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: $scope.barCountStationData1.title                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '人'                                       
        },                                                                 
        plotOptions: {                                                     
            bar: {                                                         
                dataLabels: {                                              
                    enabled: true                                          
                }                                                          
            }                                                              
        },                                                                 
        legend: {                                                          
            enabled: false                                                  
        },                                                                 
        credits: {                                                         
            enabled: false                                                 
        }
    },
    title: {                                                           
            text: $scope.getDate.year+"年"+$scope.getDate.month+'月份各乡镇受理生产安全事故详情'                    
        }, 
    series: [{                                                         
            name:$scope.barCountStationData1.title,                                             
            data: $scope.barCountStationData1.data                                 
    }] 
};



	}

	$scope.pieType1 = {//第二个饼图
			                   options: {
			                             colors:newColors,
			                   
			                    chart: {
			                        plotBackgroundColor: null,
			                        plotBorderWidth: null,
			                        plotShadow: false
			                    },
			                    credits:{
			                        enabled:false
			                        },
			                    title: {
			                        text: $scope.getDate.year+"年"+$scope.getDate.month+"月份全市各类生产安全事故详情"
			                    },
			                    tooltip: {
			                        pointFormat: '<b>{point.name}</b>:{point.y:1.f}(' + $scope.pieTypeData1.unit +')</b>'
			                    },
			                    plotOptions: {
			                        pie: {
			                            allowPointSelect: true,
			                            cursor: 'pointer',
			                            dataLabels: {
			                                enabled: true,
			                                color: '#000000',
			                                connectorColor: '#000000',
			                                format: '{point.percentage:.1f} %'
			                            },
			                            showInLegend: true
			                        }
			                                        
			                }
			            },
			                series: [{
			                    type: 'pie',
			                    name: '生产安全事故数',
			                    data: $scope.pieTypeData1.data
			                }]                        
			};

$scope.barCountStation1 = {//第二个柱状图
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: $scope.barCountStationData1.categories ,
            title: {                                                       
                text: '乡镇',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '受伤人数(人)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '人'                                       
        },                                                                 
        plotOptions: {                                                     
            bar: {                                                         
                dataLabels: {                                              
                    enabled: true                                          
                }                                                          
            }                                                              
        },                                                                 
        legend: {                                                          
            enabled: false                                                  
        },                                                                 
        credits: {                                                         
            enabled: false                                                 
        }
    },
    title: {                                                           
            text: $scope.getDate.year+"年"+$scope.getDate.month+'月份各乡镇受理生产安全事故详情'                    
        }, 
    series: [{                                                         
            name:'受伤人数',                                             
            data: $scope.barCountStationData1.data                                 
    }] 
};

				 $scope.pieType = { //第一个饼图
			                   options: {
			                             colors:newColors,
			                   
			                    chart: {
			                        plotBackgroundColor: null,
			                        plotBorderWidth: null,
			                        plotShadow: false
			                    },
			                    credits:{
			                        enabled:false
			                        },
			                    title: {
			                        text: $scope.getDate.year+"年"+$scope.getDate.month+"月份全市各类生产安全事故详情"
			                    },
			                    tooltip: {
			                        pointFormat: '<b>{point.name}</b>:{point.y:1.f}(起)</b>'
			                    },
			                    plotOptions: {
			                        pie: {
			                            allowPointSelect: true,
			                            cursor: 'pointer',
			                            dataLabels: {
			                                enabled: true,
			                                color: '#000000',
			                                connectorColor: '#000000',
			                                format: '{point.percentage:.1f} %'
			                            },
			                            showInLegend: true
			                        }
			                                        
			                }
			            },
			                series: [{
			                    type: 'pie',
			                    name: '生产安全事故数',
			                    data: pieTypeData
			                }]                        
			};

$scope.barCountStation = {//第一个柱状图
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: barCountStationData.categories ,
            title: {                                                       
                text: '乡镇',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '受理生产安全事故数(起)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '起'                                       
        },                                                                 
        plotOptions: {                                                     
            bar: {                                                         
                dataLabels: {                                              
                    enabled: true                                          
                }                                                          
            }                                                              
        },                                                                 
        legend: {                                                          
            enabled: false                                                  
        },                                                                 
        credits: {                                                         
            enabled: false                                                 
        }
    },
    title: {                                                           
            text: $scope.getDate.year+"年"+$scope.getDate.month+'月份各乡镇受理生产安全事故数'                    
        }, 
    series: [{                                                         
            name:'受理事故数',                                             
            data:barCountStationData.data                                 
    }] 
};
		$scope.typeChange = function(type){//折线
				$scope.lineChartData.categories = [];
				$scope.lineChartData.data = [];
				var titles = ['事故发生数(起)','受伤人数(人)','死亡人数(人)','直接财产损失(万元)']
				var units = ['起','人','人','万元']
                var s=0;
				var nameArray = ['生产安全事故数(起)','受伤数(人)','死亡人数(人)','直接财产损失(万元)'];
				for(var i = 0 ; i < $scope.getDate.month; i ++){
					$scope.lineChartData.categories.push((i + 1) + '月');
					if(type == 3){
						var temp = eachMonthData[i].data[$scope.lineChartData.type];
						temp = temp/10000;
						$scope.lineChartData.data.push(temp);
						s=s+temp;
					}
					else		
						{$scope.lineChartData.data.push(eachMonthData[i].data[$scope.lineChartData.type]);
					    var tem=eachMonthData[i].data[$scope.lineChartData.type];
				        s=s+tem;}
					$scope.lineChartData.name = nameArray[$scope.lineChartData.type];
					$scope.lineChartData.unit = units[type];
					$scope.lineChartData.title = titles[type];
						
				}
				if(type==3)
					s=s.toFixed(4);
				$scope.sumData.sumAccident=s;
				
		   $scope.lineChart = {
               options: {
                           
                            title: {
                                text: $scope.getDate.year+"年太仓市生产安全事故趋势图",
                                x: -20 //center
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: $scope.lineChartData.categories
                            },
                            yAxis: {
                                title: {
                                    text: $scope.lineChartData.name
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }],
                                min:0
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                             credits: {                                                         
                        enabled: false                                                 
                    },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            }
                        },
        			 series:[
        			 	{                                                         
						            name: $scope.lineChartData.name,                                             
						            data: $scope.lineChartData.data                                   
						}
        			 ] 
                                            
    };

		};





//
    $scope.lineChart = {
               options: {
                           
                            title: {
                                text: $scope.getDate.year+"年太仓市生产安全事故趋势图",
                                x: -20 //center
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: $scope.lineChartData.categories
                            },
                            yAxis: {
                                title: {
                                    text: $scope.lineChartData.name
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }],
                                min:0
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                             credits: {                                                         
                        enabled: false                                                 
                    },
                            legend: {
                                layout: 'vertical',
                                align: 'right',
                                verticalAlign: 'middle',
                                borderWidth: 0
                            }
                        },
        			 series:[
        			 	{                                                         
						            name: $scope.lineChartData.name,                                             
						            data: $scope.lineChartData.data                                   
						}
        			 ] 
                                            
    };

		
	};

kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);
    }
//---------------------------********api调用参数*********------------------------------------------
kpiDetailService.getLastestObject('ProductionSafetyData',["year",'month'],processFunction1);

};