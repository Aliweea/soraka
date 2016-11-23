export default ($scope,$rootScope,$stateParams,dateService,generalService,dataDetailFactory,qService) => {
  'ngInject';
  var token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wOCAwNjozOToyNSIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMyIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNCIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNSIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjYiLCJpZCI6MTUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNjozMCIsIm5hbWUiOiLlm73lnJ/lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73lnJ/lsYAifSx7IkBpZCI6IjciLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjgiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiOSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIxMCIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjEzIiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIxNCIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm5hbWUiOiLmtojpmLLlpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlhGRERf5raI6Ziy5aSn6ZifIn0seyJAaWQiOiIxNiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTciLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjE4IiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxOSIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIyMCIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMjUiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifV19LCJleHBpcmVzIjoxNDgwNzQzMjYxNTAxLCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.Whz+yh6w7uHdJJqf4wSCsRFo6H3XIq8jlxmHgxw2Bf8=";
var height = $(window).height();
$scope.newheight = height*0.78;
$('#indicatorContainer').radialIndicator({
        barColor: '#87CEEB',
        barWidth: 10,
        initValue: 40,
        roundCorner : true,
        percentage: true
    });
var radialObj = $('#indicatorContainer').data('radialIndicator');
 var currDateMoment = moment(dateService.getSystemTime());
    var year = 2014;
    $('#container').css("height",($(window).height())*0.75);
    function getConfig(key, value) {
      return {
        "value": value,
        "key": key,
        "lastestObject": null,
        "chartData": [],
        "categories": [],
        "tableData": {}
      }
    };
    $scope.lastestYM = null;
    $scope.dataMap = {
      'ONE_GDP': getConfig('ONE_GDP', '第一产业GDP'),
      'TWO_GDP': getConfig('TWO_GDP', '第二产业GDP'),
      'THREE_GDP': getConfig('THREE_GDP', '第三产业GDP'),
      'INDUSTRY_GDP': getConfig('INDUSTRY_GDP', '工业GDP'),
      'ACCM_GDP': getConfig('ACCM_GDP', '总GDP')
    };
    var keys = Object.keys($scope.dataMap);
    

    qService.httpPost(dataDetailFactory.lastestObject, {
      tableName: 'GdpData'
    }, {"X-Auth-Token":token},['year', 'month']).then(function(r) {
      console.log("1"+r.data);
      $scope.lastestYM = {
        'year':r.data.year,
        'month':r.data.month
      };
      loadData();
    });

    function loadData() {
      var queryMap = {
      year: generalService.advanceQueryObj('eq', 'innt', [$scope.lastestYM.year]),
      sort: {
        key: 'month',
        sortType: 'asc'
        }
      };
      var promise = qService.httpPost(dataDetailFactory.advancedQuery, {
        tableName: 'GdpData'
      }, {"X-Auth-Token":token},queryMap);
      promise.then(function(rc) {
        console.log("querymap"+queryMap);
        console.log("2"+rc.data);
        var datas = rc.data;
        //根据年数据绘制表格数据
        if (datas.length == 0) {
          console.log('no data');
        } else {
          console.log($scope.lastestYM);
          for (var i = 0; i < datas.length; i++) {
            var d = datas[i];
            var key = datas[i].type.uniqueKey;

            //***************uniqueKey未定义
            //***************

            if (keys.indexOf(key) >= 0) {
              if(d.year == $scope.lastestYM.year && d.month == $scope.lastestYM.month){
                $scope.dataMap[key].lastestObject = d;
              }
              $scope.dataMap[key].chartData.push(datas[i]);
              $scope.dataMap[key].categories.push(datas[i].year + '-' + datas[i].month);
            }
          };
        }
        console.log($scope.dataMap);
        $scope.gdptable = $scope.dataMap;
        $scope.GDPaccm = $scope.dataMap.ACCM_GDP.chartData[0].accmAmount;
        $scope.GDPaccmRate = $scope.dataMap.ACCM_GDP.chartData[0].accmRate;
        renderCharts();
      });
    }

    function renderCharts() {
      //累计GDP图表
      var accms = [];
      var mamounts = [];
      var categories = [];
      var keys = ['ONE_GDP', 'TWO_GDP', 'THREE_GDP'];
      var n_categories = [];
      for (var i = 0; i < $scope.dataMap['ACCM_GDP'].chartData.length; i++) {
        var d = $scope.dataMap['ACCM_GDP'].chartData[i];
        accms[i]=d.accmAmount;
        mamounts[i]=d.amount;
        categories[i]=d.month/3 + '季度';
      };

      $scope.firstchart.series[0].data = accms;
      $scope.firstchart.series[1].data = mamounts;
      $scope.firstchart.xAxis.categories = categories;

      // 三产业GDP图表 
      
      for (var i = 0; i < keys.length; i++) {
        var list = [];
        var key = keys[i];
        for (var j = 0; j < $scope.dataMap[key].chartData.length; j++) {
          if(i==0){
            n_categories.push($scope.dataMap[key].chartData[j].month / 3  + '季度');
          }
          list.push($scope.dataMap[key].chartData[j].accmAmount);
        };
        $scope.secondchart.series[i].data = list;
      };
      $scope.secondchart.xAxis.categories = n_categories;
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
      console.log($scope.tables);
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
    $scope.firstchart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
        }
      },
      series: [{
        name: '国内生产总值(累计值)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }

      }, {
        name: '国内生产总值(各季度)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }],
      xAxis: {
        title: {
          text: '季度',
          align: 'high',
        }
      },
      yAxis: {
        title: {
          text: '值（亿元）',
          style:{
            color:'white'
          }
        }
      },
      title: {
        text: '国内生产总值(总计)'
      },
      loading: false
    };

    //金融机构贷款余额
    $scope.secondchart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
        }
      },
      series: [{
        name: '国内生产总值(第一产业)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }, {
        name: '国内生产总值(第二产业)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }, {
        name: '国内生产总值(第三产业)',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 亿元</b> '
        }
      }],
      xAxis: {
        labels: {
          rotation: -45,
          align: 'right',
          style:{
            color:'white'
          }
        },
        title: {
          text: '季度',
          align: 'high',
         style:{
            color:'white'
          }
        }
      },
      yAxis: {
        title: {
          text: '值（亿元）',
          style:{
            color:'white'
          }
        }
      },
      title: {
        text: '国内生产总值(分类)'
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
   
    $scope.showtest = false;
    $scope.showtest1 = true;
    $scope.showtest = function(){
      $scope.showtest = !$scope.showtest;
      $scope.showtest1 = !$scope.showtest1;
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