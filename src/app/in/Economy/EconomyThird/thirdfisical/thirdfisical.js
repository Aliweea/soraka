export default ($scope,dateService,dictService,generalService,dataDetailFactory,qService) => {
  'ngInject';
var token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wOCAwNjozOToyNSIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMyIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNCIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNSIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjYiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjciLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjgiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiOSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIxMCIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEzIiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIxNCIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm5hbWUiOiLmtojpmLLlpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlhGRERf5raI6Ziy5aSn6ZifIn0seyJAaWQiOiIxNiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTciLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjE4IiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxOSIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIyMCIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMjUiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifV19LCJleHBpcmVzIjoxNDgwNzQzMjYxNTAxLCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.Whz+yh6w7uHdJJqf4wSCsRFo6H3XIq8jlxmHgxw2Bf8=";    var currDateMoment = moment(dateService.getSystemTime());
    //获取当前数据项的最新时间
    var height = $(window).height();
$scope.newheight = height*0.78;
     $scope.lastestObject;
    $scope.dataMap = {
      'R_SAVE': {
        value: '金融机构存款余额(人民币)',
        key: 'R_SAVE',
        chartData: [],
        tableData: {},
        categories:[]
      },
      'R_LOAN': {
        value: '金融机构存款余额(人民币)',
        key: 'R_SAVE',
        chartData: [],
        tableData: {},
        categories:[]
      },
      'F_SAVE': {
        value: '金融机构存款余额(人民币)',
        key: 'R_SAVE',
        chartData: [],
        tableData: {},
        categories:[]
      },
      'F_LOAN': {
        value: '金融机构存款余额(人民币)',
        key: 'R_SAVE',
        chartData: [],
        tableData: {},
        categories:[]
      }
    };
    var keys = Object.keys($scope.dataMap);
    $scope.queryMap;
    
    function loadLastestYearMonth() {
      qService.httpPost(dataDetailFactory.lastestObject, {
        tableName: 'FinanceData'
      }, {"X-Auth-Token":token},['year', 'month']).then(function(rc) {
        $scope.lastestObject = rc.data;
        $scope.queryMap = {
          year: generalService.advanceQueryObj('eq', 'innt', [$scope.lastestObject.year])

        };
        loadData();
      });
    };

    loadLastestYearMonth();
    function loadData() {
      var promise = qService.httpPost(dataDetailFactory.advancedQuery, {
        tableName: 'FinanceData'
      }, {"X-Auth-Token":token},$scope.queryMap);
      promise.then(function(rc) {
        console.log(rc.data);
        var datas = rc.data;
        //根据年数据绘制表格数据
        if (datas.length == 0) {
          console.log('no data');
        } else {
          for (var i = 0; i < datas.length; i++) {
            var d = datas[i];
            var key = datas[i].type.uniqueKey;
            if (keys.indexOf(key) >= 0) {
              $scope.dataMap[key].chartData.push(datas[i].remain);
              console.log( datas[i].type);
              $scope.dataMap[key].categories.push(datas[i].year + '-' + datas[i].month);
              if (datas[i].month == $scope.lastestObject.month) { 
                $scope.dataMap[key].tableData['remain'] = datas[i].remain;
                $scope.dataMap[key].tableData['rateWithOpen'] = datas[i].rateWithOpen;
              };
            }
          };
        }
        renderCharts();
        renderTables();
      });
    };


    function renderCharts() {
      $scope.FinanceKeepingChart.series[0].data = $scope.dataMap.R_SAVE.chartData;
      $scope.FinanceKeepingChart.series[1].data = $scope.dataMap.R_LOAN.chartData;
      $scope.FinanceKeepingChart.xAxis.categories = $scope.dataMap.R_LOAN.categories;

      $scope.FinanceLoanChart.series[0].data = $scope.dataMap.F_SAVE.chartData;
      $scope.FinanceLoanChart.series[1].data = $scope.dataMap.F_LOAN.chartData;
      $scope.FinanceLoanChart.xAxis.categories = $scope.dataMap.F_LOAN.categories;
      console.log($scope.dataMap.R_SAVE.chartData);
    };

    function renderTables() {
      for (var i = 0; i < keys.length; i++) {
        var key = keys[i];
        var td = $scope.dataMap[key].tableData;
        var obj = generateFinanceObject($scope.dataMap[key].value, td.remain, td.rateWithOpen);
        if (key.indexOf('R_') >= 0) {
          $scope.tables.rTable.push(obj);
        } else if (key.indexOf('F_') >= 0) {
          $scope.tables.fTable.push(obj);
        }
      };
      console.log($scope.tables.rTable);
      //console.log($scope.tables);
    };
    /***
     * 表格
     */
    $scope.tables = {
      rTable: [],
      fTable: []
    };

    function generateFinanceObject(key, value, rateWithOpen) {
      return {
        key: key + '',
        remain: value,
        rateWithOpen: rateWithOpen
      };
    };

    /******
     * 图表
     */
    //金融机构存款余额
    $scope.FinanceKeepingChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          
        }
      },
      series: [{
        name: '金融机构存款余额(人民币)',
       
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }

      }, {
        name: '金融机构存款余额(本外币)',
       
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
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
        title: {
          text: '值（亿元）',
          
        }
      },
      title: {
        text: '金融机构存款余额',
        
      },
      loading: false
    };

    //金融机构贷款余额
    $scope.FinanceLoanChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
         
        }
      },
      series: [{
        name: '金融机构贷款余额(人民币)',
       
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }, {
        name: '金融机构贷款余额(本外币)',
       
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
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
          text: '值（亿元）',
           
        }
      },
      title: {
        text: '金融机构贷款余额',
         
      },
      loading: false
    };
    var x = 0;
    $scope.show1 = true;
    $scope.show = function(){ 
        x=x+1;
        if (x>1) {
          x=0;
        }
        switch(x){
          case 0:
          $scope.show1 = true;
           $scope.show2 = false;
          break;
          case 1:
           $scope.show1 = false;
           $scope.show2 = true;
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