export default ($scope,dateService,dictService,generalService,dataDetailFactory,qService) => {
  'ngInject';
  var token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wOCAwNjozOToyNSIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMyIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNCIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNSIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjYiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjciLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjgiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiOSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIxMCIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEzIiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIxNCIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm5hbWUiOiLmtojpmLLlpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlhGRERf5raI6Ziy5aSn6ZifIn0seyJAaWQiOiIxNiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTciLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjE4IiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxOSIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIyMCIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMjUiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifV19LCJleHBpcmVzIjoxNDgwNzQzMjYxNTAxLCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.Whz+yh6w7uHdJJqf4wSCsRFo6H3XIq8jlxmHgxw2Bf8=";
 var height = $(window).height();
 var bottomheight = $('.navbar-absolute-bottom').height();
$scope.newheight = height*0.78;
 $(".navbar2detail").hide(0); 
 // $('.scrollable').css('height',$(window).height()-200);
 $scope.InvestValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'spline',
        }
      },
      series: [{
        name: '全社会固定资产投资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        },
      }, {
        name: '去年同期值',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right',
        },
        title: {
          text: '月份',
          align: 'high',
        }
      },
      yAxis: {
        labels: {
        },
        title: {
          text: '值（万元）',
        }
      },
      title: {
        text: '全社会固定资产投资(累计值)',
        style:{
          color:'white'
        }
      },
      loading: false
    };
    //分类资产投资
    $scope.ClassInvestValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
        }
      },
      series: [{
        name: '工业投资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '服务业投资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '房地产投资',

        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right',
        },
        title: {
          text: '月份',
          align: 'high',
        }
      },
      yAxis: {
        labels: {
        },
        title: {
          text: '值（万元）',
        }
      },
      title: {
        text: '主要分类固定资产投资(累计值)',
        style:{
          color:'white'
        }
      },
      loading: false
    };
    //实际利用外资
    $scope.CapitalValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
        }
      },
      series: [{
        name: '注册外资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万美元</b> '
        }

      }, {
        name: '实际利用外资',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万美元</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right',

        },
        title: {
          text: '月份',
          align: 'high',
        }
      },
      yAxis: {
        labels: {
        },
        title: {
          text: '值（万美元）',

        }
      },
      title: {
        text: '引进外资(累计值)',
        style:{
          color:'white'
        }
      },
      loading: false
    };
    //引进内资
    $scope.ImportCapitalValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 80],
        }
      },
      series: [{
        name: '新增注册资金',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '到账资金',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right',

        },
        title: {
          text: '月份',
          align: 'high',
        }
      },
      yAxis: {
        labels: {
        },
        title: {
          text: '值（万元）',

        }
      },
      title: {
        text: '引进内资(累计值)',
      },
      loading: false
    };
    /****结束图表配置****/

    var currDateMoment = moment(dateService.getSystemTime());
    $scope.zones = dictService.zoneDict();
    var year = 2014;

    $scope.dataMap = {
      'InvestData': {
        tableName: 'InvestData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.InvestValueChart,
          columns: ['gaccmAmount', 'glastAccmAmount']
        }, {
          chart: $scope.ClassInvestValueChart,
          columns: ['giaccmAmount', 'gsaccmAmount', 'gfaccmAmount']
        }]
      },
      'ImportData': {
        value: '主要分类全社会固定资产投资',
        tableName: 'CapitalImportData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.CapitalValueChart,
          columns: ['rAccm', 'uAccm']
        }, {
          chart: $scope.ImportCapitalValueChart,
          columns: ['addFund', 'inFund']
        }]
      }
    };

    $scope.initData = function(mapKey) {

      //init map
      var map = {};
      for (var i = 0; i < $scope.zones.length; i++) {
        var key = $scope.zones[i].key;
        map[key] = {
          categories: [],
          datas: []
        };
      };
      qService.httpPost(dataDetailFactory.lastestObject, {
        tableName: $scope.dataMap[mapKey].tableName
      }, {"X-Auth-Token":token},['year', 'month']).then(function(result) {
        
        $scope.dataMap[mapKey].lastestObject = {
          'year':result.data.year,
          'month':result.data.month
        };
        var queryMap = {
          year: generalService.advanceQueryObj('eq', 'innt', [$scope.dataMap[mapKey].lastestObject.year]),
          sort: {
            key: 'month',
            sortType: 'asc'
          }
        };
        //获取后台数据，并显示在图表上
        var promise = qService.httpPost(dataDetailFactory.advancedQuery, {
          tableName: $scope.dataMap[mapKey].tableName
        }, {"X-Auth-Token":token},queryMap);
        promise.then(function(rc) {
          console.log(rc.data)
          
          var rc = rc.data;
          for (var i = 0; i < rc.length; i++) {
            var obj = rc[i];
            if(obj.year == result.data.year && obj.month == result.data.month
              && obj.zone == '全市'){
              $scope.dataMap[mapKey].lastestObject = obj; 
              $scope.newmap = obj;
            }
            if (obj.zone == '全市') {
              map['QS'].datas.push(obj);
            }
          };
          
           $scope.accm = $scope.newmap.gaccmAmount;
          $scope.dataMap[mapKey].chartData = map;

          for (var i = 0; i < $scope.dataMap[mapKey].charts.length; i++) {
            setTargetChart('QS', mapKey, i);
          }
        });
      });
    };

    function setTargetChart(zone, mapKey, offset) {
      var subMap = $scope.dataMap[mapKey];
      var topList = {};
      var chartConfig = $scope.dataMap[mapKey].charts[offset];
      var categories = [];
      //构建 list
      for (var i = 0; i < chartConfig.columns.length; i++) {
        topList[chartConfig.columns[i]] = [];
      };
      //构建数据列
      
      for (var i = 0; i < subMap.chartData[zone].datas.length; i++) {
        var data = subMap.chartData[zone].datas[i];
        categories.push(data.year + '-' + data.month);
        for (var j = 0; j < chartConfig.columns.length; j++) {
          var column = chartConfig.columns[j];
          topList[column].push(data[column]);
        };
      };
      //填入表格
      for (var i = 0; i < chartConfig.columns.length; i++) {
         chartConfig.chart.series[i].data= topList[chartConfig.columns[i]];
        chartConfig.chart.xAxis.categories = categories;
        console.log(i);
        console.log(chartConfig.chart.xAxis.categories);
        console.log(chartConfig.chart.series[i].data);
      };
     
    };

    $scope.loadAllData = function() {
      var keys = Object.keys($scope.dataMap);
      for (var i = 0; i < keys.length; i++) {
        $scope.initData(keys[i]);
      };
    };
    
    $scope.loadAllData();
    var x = 0;
    $scope.show1 = true;
    $scope.show = function(){ 
        x=x+1;
        if (x>3) {
          x=0;
        }
        switch(x){
          case 0:
          $scope.show1 = true;
           $scope.show2 = false;
           $scope.show3 = false;
           $scope.show4 = false;
          break;
          case 1:
           $scope.show1 = false;
           $scope.show2 = true;
           $scope.show3 = false;
           $scope.show4 = false;
          break;
          case 2:
           $scope.show1 = false;
           $scope.show2 = false;
           $scope.show3 = true;
           $scope.show4 = false;
          break;
          case 3:
          $scope.show1 = false;
           $scope.show2 = false;
           $scope.show3 = false;
           $scope.show4 = true;
          break;
        }
       
    }
     $scope.newtab1 = true;
    $scope.newtab2 = false;
    $scope.tab1 = function(){
      $("#tab1").removeClass("economyinactive");
      $("#tab1").addClass("economyactive");
      $("#tab2").removeClass("economyactive");
      $("#tab2").addClass("economyinactive");
       $scope.newtab1 = true;
    $scope.newtab2 = false;
    }
    $scope.tab2 = function(){
      $("#tab1").removeClass("economyactive");
      $("#tab1").addClass("economyinactive");
       $("#tab2").removeClass("economyinactive");
      $("#tab2").addClass("economyactive");
       $scope.newtab1 = false;
    $scope.newtab2 = true;
    }

 
};