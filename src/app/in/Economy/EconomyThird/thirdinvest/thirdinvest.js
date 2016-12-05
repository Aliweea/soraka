export default ($scope,$rootScope,dateService,dictService,generalService,dataDetailFactory,qService) => {
  'ngInject';
  $rootScope.loading = true;
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
      qService.httpPostWithToken(dataDetailFactory.lastestObject, {
        tableName: $scope.dataMap[mapKey].tableName
      }, {},['year', 'month']).then(function(result) {
        
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
        var promise = qService.httpPostWithToken(dataDetailFactory.advancedQuery, {
          tableName: $scope.dataMap[mapKey].tableName
        }, {},queryMap);
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
        }).finally(() => {
            $rootScope.loading = false;
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