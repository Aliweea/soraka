export default ($scope,$state, dateService, qService, kpiDetailService, dictService) => {
  'ngInject';

  let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI0IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI1IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiI2IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiNyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiI4IiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiI5IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIxMCIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIxMSIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjEzIiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiIxNCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjE2IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiMTciLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE4IiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxOSIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjAiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjEiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn1dfSwiZXhwaXJlcyI6MTQ3ODk5NzEwMDA0NSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.zfXDZ0KX6J/Yj3Ups5sAeJCS2Sl3LU1uURWXHOdCSA0=";
  let headers={"X-Auth-Token":token};
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');

$scope.barData = {
    selected:0,
    jyData:[],
    ybData:[],
    cate:[],
    title:'',
    yText:'������������',
    valueSuffix:'����'
  };
$scope.amountData = {
		thisMonthAmount:0,
		thisMonthMoney:0,
		allYearAmount:0,
		allYearMoney:0
	};
var columnChartData = [
		[0,0],
		[0,0]
	];
var eachMonthData = [
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0],
        [0,0,0,0]
    ];

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
    data:[
        [],
        [],
        [],
        []
    ]   
};

var stationInfo = [];
	


$scope.lineChartData = {
    selected:'0',
    title:'',
    yText:'��������(��)',
    valueSuffix:'��',
    name:'��������(��)',
    amount:[],
    injury:[],
    dead:[],
    damage:[],
    categories:[]
}


//---------------------------********ϵͳʱ���ȡ*********------------------------------------------
    var  dateTime = new Date(dateService.getSystemTime());console.log(dateTime);
	//var dateTime = new Date("2014-12-12T14:57:55.091Z");
	 $scope.getDate = {
	    year:dateTime.getFullYear(),
	    month:dateTime.getMonth() + 1
	  }
    console.log($scope.getDate.year + "," +$scope.getDate.month);





//---------------------------*****************------------------------------------------
    var processFunction1 = function(data){
        console.log(data.data);
        var obj = data.data;
        if(obj != null){
            var year_ = obj.year;
            var month_ = obj.month;
            if($scope.getDate.year > year_){
                $scope.getDate.year = year_;
                $scope.getDate.month = month_;
            }else if($scope.getDate.year == year_  && $scope.getDate.month > month_){
                $scope.getDate.month = month_;
            }

        }

    //---------------------------********api���ò���*********------------------------------------------

    var tableName='FireData';

    var advancedQueryConfig = {
        "year":{
        "value1":$scope.getDate.year,
        "queryType":"eq",
        "valueType":"innt"
        }
    }
//---------------------------********����������data�ĺ���*********----------------------------------
    
    var processFunction = function(data){
        console.log(JSON.stringify(data));
        //��ʼ��ͼ������

        initChartData(data.data);

        // wireBarChartData();

//---------------------------********��ʼ��ͼ������********------------------------------------------
        function initChartData(data){
            if(data == null){
                alert('������ ��');
                return;
            }
            // else if(columnChartData[0] == 0){
            //  alert('��������δ¼�� ��');
            //  return;
            // }
            //wireLineChartData();
            $scope.lineChartData.title = $scope.getDate.month + "�·�ȫ�л����¹���������";

            wireChartData(data);

            wireLineChartData();

        };


//---------------------------********��������*********------------------------------------------
    function wireChartData(data){
        for(var i = 0 ; i < data.length ; i ++){
            var month  =  data[i].month;
            var type = data[i].type.abbr;
            eachMonthData[month - 1][type] = eachMonthData[month - 1][type] + data[i].largeAccident + data[i].majorAccident + data[i].moreAccident + data[i].genealAccident;
            if(month == $scope.getDate.month){
                var type_ = data[i].type.abbr;
                var name = data[i].fireStation.name;
                eachStationData.categories[type_].cateData.push(name);
                eachStationData.data[type_].push(data[i].largeAccident + data[i].majorAccident + data[i].moreAccident + data[i].genealAccident);
            }
        }
        $scope.amountData.thisMonthAmount = eachMonthData[$scope.getDate.month - 1 ][0];
    };

    function wireLineChartData(){
        for(var i = 0 ; i < $scope.getDate.month ; i++){
            $scope.lineChartData.categories.push((i+1) + '��');
            $scope.lineChartData.amount.push(eachMonthData[i][0]);
            $scope.lineChartData.injury.push(eachMonthData[i][1]);
            $scope.lineChartData.dead.push(eachMonthData[i][2]);
            $scope.lineChartData.damage.push(eachMonthData[i][3]);
        }

 $scope.columnChart  ={
      options:{
            title: {
            text: $scope.getDate.year+'��̫���л����¹ʷ���������ͼ',
            x: -20 //center
        },
    
        xAxis: {
            categories: $scope.lineChartData.categories
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '(��)'
        },
          credits:{
            enabled:false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
      },
    
        series: [{
            name: '�����¹���',
            data: $scope.lineChartData.amount
        }]
  
};
    }

    function getStationName(id){
        for(var i = 0 ; i < stationInfo.length ; i++){
            if(stationInfo[i].id == id){
                return stationInfo[i].name;
            }
        }
    }






$scope.trendInfoChanged = function(){
    if($scope.lineChartData.selected == 0){
 $scope.columnChart  ={
      options:{
            title: {
            text: $scope.getDate.year+'��̫���л����¹ʷ���������ͼ',
            x: -20 //center
        },
    
        xAxis: {
            categories: $scope.lineChartData.categories
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        tooltip: {
            valueSuffix: '(��)'
        },
          credits:{
            enabled:false
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
      },
    
        series: [{
            name: '�����¹���',
            data: $scope.lineChartData.amount
        }]
  
};
    }else if($scope.lineChartData.selected == 1){
             $scope.columnChart  ={
                  options:{
                        title: {
                        text: $scope.getDate.year+'��̫���л����¹�������������ͼ',
                        x: -20 //center
                    },
                
                    xAxis: {
                        categories: $scope.lineChartData.categories
                    },
                    yAxis: {
                        title: {
                            text: ''
                        },
                        plotLines: [{
                            value: 0,
                            width: 1,
                            color: '#808080'
                        }]
                    },
                    tooltip: {
                        valueSuffix: '(��)'
                    },
                      credits:{
                        enabled:false
                    },
                    legend: {
                        layout: 'vertical',
                        align: 'right',
                        verticalAlign: 'middle',
                        borderWidth: 0
                    }
                  },
                
                    series: [{
                        name: '��������(��)',
                        data: $scope.lineChartData.injury
                    }]
              
            };
    }else if($scope.lineChartData.selected == 2){
                 $scope.columnChart  ={
                      options:{
                            title: {
                            text: $scope.getDate.year+'��̫���л����¹�������������ͼ',
                            x: -20 //center
                        },
                    
                        xAxis: {
                            categories: $scope.lineChartData.categories
                        },
                        yAxis: {
                            title: {
                                text: ''
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }]
                        },
                        tooltip: {
                            valueSuffix: '(��)'
                        },
                        credits:{
                            enabled:false
                        },
                        legend: {
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        }
                      },
                    
                        series: [{
                            name: '��������(��)',
                            data: $scope.lineChartData.dead
                        }]
                  
                };
    }else if($scope.lineChartData.selected == 3){
$scope.columnChart  ={
      options:{
            title: {
            text: $scope.getDate.year+'��̫���л����¹�ֱ�ӲƲ���ʧ����ͼ',
            x: -20 //center
        },
    
        xAxis: {
            categories: $scope.lineChartData.categories
        },
        yAxis: {
            title: {
                text: ''
            },
            plotLines: [{
                value: 0,
                width: 1,
                color: '#808080'
            }]
        },
        credits:{
            enabled:false
        },
        tooltip: {
            valueSuffix: '(��Ԫ)'
        },
        legend: {
            layout: 'vertical',
            align: 'right',
            verticalAlign: 'middle',
            borderWidth: 0
        }
      },
    
        series: [{
            name: 'ֱ�ӲƲ���ʧ(��Ԫ)',
            data: $scope.lineChartData.damage
        }]
  
};
    }
}


    $scope.barCount = {
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: eachStationData.categories[0].cateData ,
            title: {                                                       
                text: '�����ж�',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '��������¹���(��)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '��'                                       
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
            text: $scope.getDate.month+'�·ݸ������ж���������¹���'                    
        }, 
    series: [{                                                         
            name:'�����¹���',                                             
            data:eachStationData.data[0]                                 
    }] 
};

$scope.barInjury = {
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: eachStationData.categories[1].cateData ,
            title: {                                                       
                text: '�����ж�',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '�����¹���������(��)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '��'                                       
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
            text: $scope.getDate.month+'�·ݸ������жӻ�����������'                    
        }, 
    series: [{                                                         
            name:'��������',                                             
            data:eachStationData.data[1]                                 
    }] 
};

$scope.barDead = {
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: eachStationData.categories[2].cateData,
            title: {                                                       
                text: '�����ж�',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '�����¹���������(��)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: '��'                                       
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
            text: $scope.getDate.month+'�·ݸ������жӻ�����������'                    
        }, 
    series: [{                                                         
            name:'��������',                                             
            data:eachStationData.data[2]
             }] 
};

$scope.barDamage = {
    options:{
         colors:newColors,
        chart: {                                                           
            type: 'bar'                                                   
        },                                                                                                                                  
        xAxis: {                                                           
            categories: eachStationData.categories[3].cateData ,
            title: {                                                       
                text: '�����ж�',
                align: 'high'
            }                                                              
        },                                                                 
        yAxis: {                                                           
            min: 0,                                                        
            title: {                                                       
                text: '����ֱ�ӲƲ���ʧ(Ԫ)'                                            
            },                                                             
            labels: {                                                      
                overflow: 'justify'                                        
            }                                                              
        },                                                                 
        tooltip: {                                                         
            valueSuffix: 'Ԫ'                                       
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
            text: $scope.getDate.month+'�·ݸ������жӻ���ֱ�ӲƲ���ʧ'                    
        }, 
    series: [{                                                         
            name:'ֱ�ӲƲ���ʧ',                                             
            data:eachStationData.data[3]                                 
    }] 
};

    };//end of processFunction

        kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);

    }
//---------------------------********api���ò���*********------------------------------------------
kpiDetailService.getLastestObject('FireData',["year",'month'],processFunction1);



//---------------------------********api���ò���*********------------------------------------------

    var dictTypeID = 3003;

    var cashPieChartData = [];
    var casePieChartData = [];
//---------------------------********����������data�ĺ���*********----------------------------------
    
    var processFunction1 = function(data){
        console.log(JSON.stringify(data));
        //��ʼ��ͼ������
        stationInfo = data.data;


    };

dictService.getDictListByType(dictTypeID,processFunction1);

};