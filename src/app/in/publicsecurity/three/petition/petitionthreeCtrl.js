export default ($scope,$state, dateService, dataDetailFactory, qService, kpiDetailService) => {
  'ngInject';

  let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI0IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI1IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiI2IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiNyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiI4IiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiI5IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIxMCIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIxMSIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjEzIiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiIxNCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjE2IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiMTciLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE4IiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxOSIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjAiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjEiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn1dfSwiZXhwaXJlcyI6MTQ3ODk5NzEwMDA0NSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.zfXDZ0KX6J/Yj3Ups5sAeJCS2Sl3LU1uURWXHOdCSA0=";
  let headers={"X-Auth-Token":token};

  var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200');
  var eachMonthData = [

                  {
                    month:'1',
                    data:[]     
                  },
                  {
                    month:'2',
                    data:[]  
                  },
                  {
                    month:'3',
                    data:[]  
                  },
                  {
                    month:'4',
                    data:[]  
                  },
                  {
                    month:'5',
                    data:[]  
                  },
                  {
                    month:'6',
                    data:[]  
                  },
                  {
                    month:'7',
                    data:[]  
                  },
                  {
                    month:'8',
                    data:[]  
                  },
                  {
                    month:'9',
                    data:[]  
                  },
                  {
                    month:'10',
                    data:[]  
                  },
                  {
                    month:'11',
                    data:[]  
                  }, 
                  {
                    month:'12',
                    data:[]  
                  }
                ];
  var eachMonthData1 = [

                    {
                      month:'1',
                      data:[]     
                    },
                    {
                      month:'2',
                      data:[]  
                    },
                    {
                      month:'3',
                      data:[]  
                    },
                    {
                      month:'4',
                      data:[]  
                    },
                    {
                      month:'5',
                      data:[]  
                    },
                    {
                      month:'6',
                      data:[]  
                    },
                    {
                      month:'7',
                      data:[]  
                    },
                    {
                      month:'8',
                      data:[]  
                    },
                    {
                      month:'9',
                      data:[]  
                    },
                    {
                      month:'10',
                      data:[]  
                    },
                    {
                      month:'11',
                      data:[]  
                    }, 
                    {
                      month:'12',
                      data:[]  
                    }
                  ];
  var eachMonthData2 = [

                    {
                      month:'1',
                      data:[]     
                    },
                    {
                      month:'2',
                      data:[]  
                    },
                    {
                      month:'3',
                      data:[]  
                    },
                    {
                      month:'4',
                      data:[]  
                    },
                    {
                      month:'5',
                      data:[]  
                    },
                    {
                      month:'6',
                      data:[]  
                    },
                    {
                      month:'7',
                      data:[]  
                    },
                    {
                      month:'8',
                      data:[]  
                    },
                    {
                      month:'9',
                      data:[]  
                    },
                    {
                      month:'10',
                      data:[]  
                    },
                    {
                      month:'11',
                      data:[]  
                    }, 
                    {
                      month:'12',
                      data:[]  
                    }
                  ];
  $scope.getDate = {
    year:'',
    month:''
  }


  $scope.totalData = {
     bypassletter:'',
//    byje:'',
    qnafs:'',
//    qnje:''
//  
  }
 
  var pieTypeData=[
      ['已处理信件',0],
      ['未处理信件',0]
  ];
  
  var barTypeData=[
          ['群众来信上访信件',0],
          ['群众网上上访信件',0],
          ['群众到访上访信件',0],
          ['其他途径上访信件',0]
  ];
  
  var barTypeData1=[
          ['越级个人上访',0],
          ['越级集体上访',0]
  ];
  
  $scope.lineDataType={
      category:[],
      data:[]
  }
  $scope.lineDataType1={
      category1:[],
      data:[]
  }
  $scope.lineDataType2={
      category2:[],
      data:[]
  }
  $scope.data ={}

    //初始化页面数据
  
  
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

  var tableName='PetitionLetterData';

  var advancedQueryConfig = {
    "year":{
      "value1":$scope.getDate.year,
      "queryType":"eq",
      "valueType":"innt"
    }
  }
//-----------------------------------处理函数返回data的函数，-------------------------------

                //获取数据库最新数据的日期
  var processFunction = function(data){
        console.log(data);
       // var data = data.data[0];
    
        console.log("year: "+$scope.getDate.year);
        console.log("month: "+$scope.getDate.month);

  
        //根据返回日期取最新的数据
        var doneLetterdata=0;
        var undoneLetterdata=0;
        var pieDataList=[];
           for(var i=0;i<data.data.length;i++){
             var month=data.data[i].month;
             if(month==$scope.getDate.month){
               doneLetterdata+=data.data[i].doneLetter;
                 undoneLetterdata+=data.data[i].undoneLetter;
                 pieTypeData[0][1]=doneLetterdata;
                 pieTypeData[1][1]=undoneLetterdata;
                 barTypeData[0][1]=data.data[i].publicLetter;
                 barTypeData[1][1]=data.data[i].publicWebLetter;
                 barTypeData[2][1]=data.data[i].publicBureauLetter;
                 barTypeData[3][1]=data.data[i].otherLetter;
                 barTypeData1[0][1]=data.data[i].bypassperLetter;
                 barTypeData1[1][1]=data.data[i].bypasscollectiveLetter;
                 $scope.totalData.bypassletter = data.data[i].bypassperLetter +data.data[i].bypasscollectiveLetter;
                 $scope.totalData.qnafs =((doneLetterdata/(doneLetterdata+undoneLetterdata)).toFixed(4))*100+"%";
             }
             
             //console.log(eachMonthData[$scope.getDate.month].doneLetter);
             
           }
           for(var i=0;i<$scope.getDate.month;i++){
             $scope.lineDataType.category.push((i + 1) + '月');
             eachMonthData[i].data.push(data.data[i].publicLetter+data.data[i].publicWebLetter+data.data[i].publicBureauLetter+data.data[i].otherLetter);
             $scope.lineDataType.data.push(eachMonthData[i].data);
             eachMonthData1[i].data.push(data.data[i].bypassperLetter);
             $scope.lineDataType1.data.push(eachMonthData1[i].data);
             eachMonthData2[i].data.push(data.data[i].bypasscollectiveLetter);
             $scope.lineDataType2.data.push(eachMonthData2[i].data);
            
           }
          // console.log( $scope.lineDataType1.data);
          // console.log( $scope.lineDataType2.data);
          // console.log(pieDataList);
           //console.log(eachMonthData[1].data);
                   // $scope.totalData.bypassletter = data.bypass[0] + data.bypass[1];
 
                  //  $scope.totalData.qnafs =((data.pieData1.petitionletterPieData2[0]/(data.pieData1.petitionletterPieData2[0]+data.pieData1.petitionletterPieData2[1])).toFixed(3))*100+"%";


        $scope.PieChart = {  //第一个饼图
               options: {
                              
                                chart: {
                                    plotBackgroundColor: null,
                                    plotBorderWidth: null,
                                    plotShadow: false
                                },
                                credits:{
                                    enabled:false
                                    },
                                title: {
                                    text: $scope.getDate.year+"年"+$scope.getDate.month+"月份群众上访信件结案率"
                                },
                                tooltip: {
                                    pointFormat: '<b>上访信件</b>:{point.y:1.f}(起)</b>'
                                },
                                plotOptions: {
                                    pie: {
                                        size: '75%',
                                        allowPointSelect: true,
                                        cursor: 'pointer',
                                        dataLabels: {
                                            distance: -10,
                                            enabled: true,
                                            color: '#000000',
                                            connectorColor: '#000000',
                                            format: '<b>{point.name}</b>:{point.percentage:.1f} %'
                                        },
                                        showInLegend: true
                                    }
                                
                                
                            }
                        },
                            series: [{
                                type: 'pie',
                                name: '',
                                data:pieTypeData
                            }]
                                            
};


         $scope.lineChart  ={ //折线图
             options:{
                   colors:pieColors,
                      title: {
                      text: 2015+'年越级上访信件趋势',
                      x: -20 //center
                  },
              
                  xAxis: {
                      categories:$scope.lineDataType.category
                  },
                  yAxis: {
                      title: {
                          text: '上访信件数(起)'
                      },
                      plotLines: [{
                          value: 0,
                          width: 1,
                          color: '#808080'
                      }],
                      min:0
                  },
                  tooltip: {
                      valueSuffix: '(起)'
                  },
                    credits:{
                      enabled:false
                  },
                  legend: {
                      enabled:true
                  }
                },
              
                  series: [{
                      name: '越级个人上访',
                      data: $scope.lineDataType1.data //[16,7,9,15,20,14,16,21,22,18,11,9]
                  },
                  {
                      name:'越级集体上访',
                  data:$scope.lineDataType2.data  //[10,11,5,23,14,26,17,10,15,10,9,16]
              }]

};

    $scope.lineChart1  ={  //群众上访折线图
                              options:{
                                 colors:pieColors,
                                    title: {
                                    text:$scope.getDate.year+'年群众上访信件趋势',
                                    x: -20 //center
                                },
                            
                                xAxis: {
                                    categories: $scope.lineDataType.category
                                },
                                yAxis: {
                                    title: {
                                        text: '上访信件数(起)'
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }],
                                    min:0
                                },
                                tooltip: {
                                    valueSuffix: '(起)'
                                },
                                  credits:{
                                    enabled:false
                                },
                                legend: {
                                    enabled:true
                                }
                              },
                            
                                series: [{
                                    name: '上访信件',
                                    data: $scope.lineDataType.data
                                },
                               
                                ]
  
              };

    $scope.columnChart1 = { //第二个柱状图
               options: {
         chart: {
            type: 'column'
        },
            credits:{
               enabled:false
                },
        title: {
            text: $scope.getDate.year+"年"+$scope.getDate.month+ "月份越级上访信件数"
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '越级个人上访',
                '越级集体上访'
       
            ]
        },
        yAxis: {
            min: 0,
            title: {
                text: '信件数 (起)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
                '<td style="padding:0"><b>{point.y:.1f} (起)</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
         legend: {
                        enabled:false
                         },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {                                              
                             enabled: true                                          
                             } 
                                                        
            },                                             
           
             showInLegend: false

        }
                        },
    series: [{
            name: '上访信件数',
            data:  barTypeData1   //[14,36]

        }]
                                            
};
    $scope.columnChart2 = { //第一个柱状图
               options: {
         chart: {
            type: 'column'
        },
            credits:{
               enabled:false
                },
        title: {
            text: $scope.getDate.year+"年"+$scope.getDate.month+ "月份上访信件详情"
        },
        subtitle: {
            text: ''
        },
        xAxis: {
            categories: [
                '群众来信上访信件',
                '群众网上上访信件',
                '群众到访上访信件',
                '其他途径上访信件'
            ],
        labels: {
            rotation: -45,
            align: 'right',
            style: {
                fontSize: '10px',
                fontFamily: 'Verdana, sans-serif'
            }
        }

        },
        yAxis: {
            min: 0,
            title: {
                text: '上访信件数(起)'
            }
        },
        tooltip: {
            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
            pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
                '<td style="padding:0"><b>{point.y:.1f} (起)</b></td></tr>',
            footerFormat: '</table>',
            shared: true,
            useHTML: true
        },
         legend: {
                        enabled:false
                         },
        plotOptions: {
            column: {
                pointPadding: 0.2,
                borderWidth: 0,
                dataLabels: {                                              
                             enabled: true                                          
                             } 
                                                        
            },                                             
           
             showInLegend: false

        }
                        },
    series: [{
            name: '上访信件数',
            data: barTypeData  //[10,20,30,40,50]

        }]
                                            
};
};
kpiDetailService.advancedQuery(tableName,advancedQueryConfig,processFunction);
    }
  //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('PetitionLetterData',["year",'month'],processFunction1);
 };
   