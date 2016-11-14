export default ($scope,dateService,dictService,generalService,dataDetailFactory,qService) => {
  'ngInject';
var token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMyIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiNCIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiNSIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiNiIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjciLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjgiLCJpZCI6NiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjU3IiwibmFtZSI6IuW4guS6pOitpuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiU0pKRERf5biC5Lqk6K2m5aSn6ZifIn0seyJAaWQiOiI5IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxMCIsImlkIjoyNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibmFtZSI6Iue7j+a1juebuOWFs+e7hCIsImRlc2NyaXB0aW9uIjoiSkpYR1pf57uP5rWO55u45YWz57uEIn0seyJAaWQiOiIxMSIsImlkIjozNCwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuawlOixoeWxgCIsImRlc2NyaXB0aW9uIjoiUVhKX+awlOixoeWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIxNSIsImlkIjoxNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM2OjMwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM2OjMwIiwibmFtZSI6IuWbveWcn+WxgCIsImRlc2NyaXB0aW9uIjoiR1RKX+WbveWcn+WxgCJ9LHsiQGlkIjoiMTYiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjE3IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjE4IiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiIxOSIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIyMCIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjI4LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJuYW1lIjoi5Z+O566h5bGAIiwiZGVzY3JpcHRpb24iOiJDR0pf5Z+O566h5bGAIn1dfSwiZXhwaXJlcyI6MTQ3OTc5MTEwNTA2NywiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.zOUGv3w1P4jE58Lj5dsDvisuTeB7MmrUUoN/Av7n0VE=";   var year = 2014;
    /*************************
     * 图表定义
     */
    //工业总产值
    var height = $(window).height();
$scope.newheight = height*0.78;
    $scope.touch = function(){
      $scope.test = 3;
      console.log($scope.test);
    }
    $scope.IndustryValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
           
        }
      },
      series: [{
        name: '工业总产值',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }

      }, {
        name: '规模以上工业总产值',
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
        text: '工业总产值(累计值)',
         
      },
      loading: false
    };
    //新兴产业工业的总产值
    $scope.NewIndustryValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'spline',
           
        }
      },
      series: [{
        name: '规模以上新兴工业总产值',
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
        text: '规模以上新兴产业工业的总产值(累计值)',
         
      },
      loading: false
    }
    //工业主营业务收入
    $scope.industryIncomeValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 70],
           
        }
      },
      series: [{
        name: '工业主营业务收入',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '规模以上工业主营业务收入',
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
        text: '工业主营业务收入(累计值)',
         
      },
      loading: false
    }
    //工业利润和利税
    $scope.industryProfitValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 70],
           
        }
      },
      series: [{
        name: '工业利润',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '规模以上工业利润',
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
        text: '工业利润(累计值)',
         
      },
      loading: false
    }
    //工业利税
    $scope.industryTaxValueChart = {
      options: {
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
          margin: [50, 50, 90, 80],
           
        }
      },
      series: [{
        name: '工业利税',
        tooltip: {
          pointFormat: '<span style="font-weight: bold; color: {series.color}">{series.name}</span>: <b>{point.y:.1f} 万元</b> '
        }
      }, {
        name: '规模以上工业利税',
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
        abels: {
          
        },
        title: {
          text: '值（万元）'
        }
      },
      title: {
        text: '工业利税(累计值)',
         
      },
      loading: false
    }
    /*** 结束图表定义***/

    var currDateMoment = moment(dateService.getSystemTime());
    $scope.zones = dictService.zoneDict();
    $scope.dataMap = {
      'Ivalue': {
        value: '工业总产值(累计值)',
        tableName: 'IndustryValueData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.IndustryValueChart,
          columns: ['accmAmount', 'uaccmAmount']
        }]
      },
      'NIvalue': {
        value: '工业总产值(累计值)',
        tableName: 'NewIndustryData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.NewIndustryValueChart,
          columns: ['accmAmount']
        }]
      },
      'NSvalue': {
        value: '工业主营业务收入(累计值)',
        tableName: 'IndustrySellData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.industryIncomeValueChart,
          columns: ['accmAmount','uaccmAmount']
        }]
      },
      'NPvalue': {
        value: '工业利润(累计值)',
        tableName: 'IndustryProfitData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.industryProfitValueChart,
          columns: ['accmAmount','uaccmAmount']
        }]
      },
      'NProfitvalue': {
        value: '工业利税(累计值)',
        tableName: 'IndustryTaxData',
        chartData: {},
        tableData: {},
        lastestObject: null,
        charts: [{
          chart: $scope.industryTaxValueChart,
          columns: ['accmAmount','uaccmAmount']
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
        // console.log(result.data);
        $scope.dataMap[mapKey].lastestObject = {
          'year': result.data.year,
          'month': result.data.month
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
          var rc = rc.data;
          for (var i = 0; i < rc.length; i++) {
            var obj = rc[i];
            if (obj.year == result.data.year && 
              obj.month == result.data.month && 
              obj.zone == '全市') {
              $scope.dataMap[mapKey].lastestObject = obj;
            console.log(obj);
            }
            if (obj.zone == '全市') {
              map['QS'].datas.push(obj);
            }
          };
          // console.log($scope.newmap);
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
        chartConfig.chart.series[i].data = topList[chartConfig.columns[i]];
        chartConfig.chart.xAxis.categories = categories;
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
        if (x>4) {
          x=0;
        }
        switch(x){
          case 0:
          $scope.show1 = true;
           $scope.show2 = false;
           $scope.show3 = false;
           $scope.show4 = false;
           $scope.show5 = false;
          break;
          case 1:
           $scope.show1 = false;
           $scope.show2 = true;
           $scope.show3 = false;
           $scope.show4 = false;
           $scope.show5 = false;
          break;
          case 2:
           $scope.show1 = false;
           $scope.show2 = false;
           $scope.show3 = true;
           $scope.show4 = false;
           $scope.show5 = false;
          break;
          case 3:
          $scope.show1 = false;
           $scope.show2 = false;
           $scope.show3 = false;
           $scope.show4 = true;
           $scope.show5 = false;
          break;
          case 4:
          $scope.show1 = false;
           $scope.show2 = false;
           $scope.show3 = false;
           $scope.show4 = false;
           $scope.show5 = true;
          break;
        }
       
    }



 
};