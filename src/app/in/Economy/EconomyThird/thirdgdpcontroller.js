export default ($scope,$rootScope,$stateParams,dateService,generalService,dataDetailFactory,qService,hService) => {
  'ngInject';
  $rootScope.loading = true;
$scope.toH = () => {
    hService.back();
  }
   $(".navbar2detail").hide(0); 
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
    

    qService.httpPostWithToken(dataDetailFactory.lastestObject, {
      tableName: 'GdpData'
    }, {},['year', 'month']).then(function(r) {
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
      var promise = qService.httpPostWithToken(dataDetailFactory.advancedQuery, {
        tableName: 'GdpData'
      }, {},queryMap);
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
        $scope.GDPaccm = $scope.dataMap.ACCM_GDP.chartData[2].accmAmount;
        $scope.GDPaccmRate = $scope.dataMap.ACCM_GDP.chartData[2].accmRate;
        renderCharts();
      }).finally(() => {
          $rootScope.loading = false;
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