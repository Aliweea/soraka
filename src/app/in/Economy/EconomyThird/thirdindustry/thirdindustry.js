export default ($scope,dateService,dictService,generalService,dataDetailFactory,qService) => {
  'ngInject';
    var year = 2014;
    /*************************
     * 图表定义
     */
    //工业总产值
    $(".navbar2detail").hide(0); 
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
      qService.httpPostWithToken(dataDetailFactory.lastestObject, {
        tableName: $scope.dataMap[mapKey].tableName
      }, {},['year', 'month']).then(function(result) {
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
        var promise = qService.httpPostWithToken(dataDetailFactory.advancedQuery, {
          tableName: $scope.dataMap[mapKey].tableName
        }, {},queryMap);
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