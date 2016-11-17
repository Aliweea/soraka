export default ($scope, qService, generalService, dataDetailFactory, $http, $rootScope, $location) => {



  const jQueryDOMToDos = () => {
    // 隐藏下面当前位置
   $(".navbar2return").hide(0); // 隐藏下面的返回按钮
   $(".insurance-return").show(0); // 隐藏下面返回按钮
   $(".homepage").hide(0); // 隐藏主页键
   $(".navbar2position").hide(0); // 隐藏下面当前位置
   $(".navbar2return").show(0); // 显示返回按钮
   $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
   $('#showshort').focus(); // 获取默认焦点
   $('.navTopShowInsurance').show(0); //显示人口结构下拉框
   $('#cmRefuseTownTooglePanel').hide(0);
   $('#chooseAge').click(() => {
      $('#chooseAgePanel').toggle(0);
    })
  }();

  let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjQiLCJpZCI6OSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibmFtZSI6IueJqeS7t+WxgCIsImRlc2NyaXB0aW9uIjoiV0pKX+eJqeS7t+WxgCJ9LHsiQGlkIjoiNSIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiI4IiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI5IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjEwIiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiIxMSIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIxNCIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE2IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjE3IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzQsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLmsJTosaHlsYAiLCJkZXNjcmlwdGlvbiI6IlFYSl/msJTosaHlsYAifSx7IkBpZCI6IjIwIiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIyMSIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn1dfSwiZXhwaXJlcyI6MTQ3OTg3MzA4MTA3MSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.nXKJ4UHowc3prW9H/CpZ7byCTgrzZJS4ttDSXCthcx0=";


 /*******************************************************************************
                              VARIABLE AREA
  *******************************************************************************/
  $scope.BALANCEUNIT = "万元";
  $scope.PARTICAPTEDUNIT = "人";
  $scope.ALLOPTION = {};
  $scope.ALLDATA = {};

  //控制导航条
  $scope.isActive1="active";
  $scope.isActive2="";
  $scope.isToggle=true;
  $scope.show1=()=>{
    $scope.isActive1="active";
    $scope.isActive2="";
    $scope.isToggle=true;
  };
  $scope.show2=()=>{
   $scope.isActive1="";
   $scope.isActive2="active";
   $scope.isToggle=false;
 };
//收支详情展开
$scope.isLink = true;
$scope.hideLink = () => {
  $scope.isLink = false;
  $scope.isConceal = true;
}
//收缩
$scope.concealDetail = () => {
  $scope.isConceal = false;
  $scope.isLink = true;
}

//收支详情展开1
$scope.isLink1 = true;
$scope.hideLink1 = () => {
  $scope.isLink1 = false;
  $scope.isConceal1 = true;
}
//收缩
$scope.concealDetail1 = () => {
  $scope.isConceal1 = false;
  $scope.isLink1 = true;
};
  // 顶部切换
  $scope.currentCategoryName = "城镇基本养老保险"; // default value
  $scope.changeCategory = (name) => {
    $scope.currentCategoryName = name;
  };
  $scope.tabMap = [{
    id: "tab_UBEI",
    label: "城镇基本养老保险",
    name: "UrbanBasicEndowmentInsuranceData",
    active: false
  }, {
    id: "tab_UI",
    label: "失业保险",
    name: "UnemploymentInsuranceData",
    active: false
  }, {
    id: "tab_UBMI",
    label: "城镇基本医疗保险",
    name: "UrbanBasicMedicalInsuranceData",
    active: false
  }, {
    id: "tab_URMI",
    label: "城镇居民医疗保险",
    name: "UrbanResidentsMedicalInsuranceData",
    active: false
  }, {
    id: "tab_EI",
    label: "工伤保险",
    name: "EmploymentInjuryInsuranceData",
    active: false
  }, {
    id: "tab_MI",
    label: "生育保险",
    name: "MaternityInsuranceData",
    active: false
  }, {
    id: "tab_REBI",
    label: "居民基本养老保险",
    name: "ResidentsBasicEndowmentInsuranceData",
    active: false
  }];


      // 取消选中当前选中tab，并且选中对应的tab
  function setTab(tabName) {
      for (var i = 0; i < $scope.tabMap.length; i++) {
        if ($scope.tabMap[i].active == true && $scope.tabMap[i].name != tabName)
          {$scope.tabMap[i].active = false;}
        else if ($scope.tabMap[i].name == tabName)
         { $scope.tabMap[i].active = true;}
      }
      $scope.PARTICAPTEDUNITNEW = $scope.PARTICAPTEDUNIT;
      $scope.PARTICAPTEDNAME = "参保人员";
      switch (tabName) {
        case "UrbanBasicEndowmentInsuranceData": // 城镇基本养老保险
        $scope.CURRENTINSURANCE = "城镇基本养老保险";
        break;
        case "UnemploymentInsuranceData": // 失业保险
        $scope.CURRENTINSURANCE = "失业保险";
        $scope.PARTICAPTEDNAME = "失业金领取人员";
        break;
        case "UrbanBasicMedicalInsuranceData": // 城镇基本医疗保险
        $scope.CURRENTINSURANCE = "城镇基本医疗保险";
        break;
        case "UrbanResidentsMedicalInsuranceData": // 城镇居民医疗保险
        $scope.CURRENTINSURANCE = "城镇居民医疗保险";
        break;
        case "EmploymentInjuryInsuranceData": // 工伤保险
        $scope.PARTICAPTEDUNITNEW = "%";
        $scope.CURRENTINSURANCE = "工伤保险";
        break;
        case "MaternityInsuranceData": // 生育保险
        $scope.PARTICAPTEDUNITNEW = "%";
        $scope.CURRENTINSURANCE = "生育保险";
        break;
        case "ResidentsBasicEndowmentInsuranceData": // 居民基本养老保险
        $scope.PARTICAPTEDUNITNEW = "%";
        $scope.CURRENTINSURANCE = "居民基本养老保险";
        break;
      }
      setChartData(tabName);
    }

/*******************************************************************************
                            INIT PART
*******************************************************************************/
                            var temploc = $location.path().split("/");
                            var thisLoc = temploc[temploc.length - 1];
                            if (thisLoc == undefined) {
                              setTab("UrbanBasicEndowmentInsuranceData");
                            } else {
                              setTab(thisLoc);
                            }
/*******************************************************************************
                HIGHCHARG CONFIGURATION AREA
*******************************************************************************/

   function splineHighChart(height, categories)
    {
                  this.options = {
                    colors: generalService.lineColors(),
                    chart: {
                      type: 'spline',
                    },
                    title: {
                      text: "",
                          style:{
         fontWeight:"bold",
         fontSize:15
    }
                    },
                    credits: {
                      enabled: false
                    },
        xAxis: {
          categories: categories,//设置x轴标签的显示，这里是传进来的一个数组
          tickmarkPlacement: 'on'
        },
        yAxis: {
          title: {
            text: '单位：万元'
          },
          labels: {
            formatter: function() {
              return this.value
            }
          },
          min: 0
        },
                    exporting: {
                    enabled: false // 设置导出按钮不可用
                     },
        legend: {//设置图例
          align: 'right',
          x: -70,
          verticalAlign: 'top',
          y: 20,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
       //当鼠标悬置数据点时的提示框   
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '<b>{point.series.name}</b> {point.y:,.2f}万元<br>'
        },
        //设置数据点   
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
            },
            exporting: {
          enabled: false, // 取消打印menu
        },
        cursor: 'pointer',
        events: {
          click: function(event) {
            var query_year = event.point.category.substr(0, 4);
            $scope.$apply(clickEventOfIncomeSpline(thisLoc, query_year))
          }
        }
      }
    },
  };
  this.series = [];
  this.size = {
      // width: 200,
      height: height
    };
  };
//第二张大图
  function columnstackHighChart(height, categories) {
    this.options = {
     exporting: {
          enabled: false, // 取消打印menu
        },
        colors: generalService.columnColors(),
        chart: {
          type: 'column',
        },
        credits: {
          enabled: false
        },
        title: {
          text: "",
          style:{
            fontWeight:"bold",
            fontSize:15
          }

        },
        xAxis: {
          categories: categories,
          tickmarkPlacement: 'on'
        },
        yAxis: {
          min: 0,
          title: {
            text: '单位：人'
          },
          labels: {
            formatter: function() {
              return this.value;
            }
          }
        },
        legend: {
          align: 'right',
          x: -70,
          verticalAlign: 'top',
          y: 20,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          formatter: function() {
            return '<b>' + this.x + '</b><br/>' + this.series.name + ': ' + this.y + '人<br/>' + '总数: ' + this.point.stackTotal + '人';
          }
        },
        plotOptions: {
          column: {
            stacking: 'normal',
            cursor: 'pointer',
            events: {
              click: function(event) {
                var query_year = event.point.category.substr(0, 4);
                $scope.$apply(clickEventOfEngageStackColumn(thisLoc, query_year));
              }
            }
          }
        },
      };
      this.series = [];
      this.size = {
      // width: 200,
      height: height
    };
  }

  function columnHighChart(height) {
    this.options = {
     exporting: {
          enabled: false, // 取消打印menu
        },
        colors: generalService.columnColors().slice(0,3),
        chart: {
          type: 'column',
           margin: [30, 0, 0, 0],
        },
        title: {
          text: ""
        },
        credits: {
          enabled: false
        },
        xAxis: {
          categories: []
        },
        yAxis: {
          title: {
            text: '单位：万元'
          },
          labels: {
            formatter: function() {
              return this.value;
            }
          }
        },
        legend: {
          enabled: true,
          align: 'right',
          x: 0,
          verticalAlign: 'top',
          y: 0,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        tooltip: {
          enabled: true,
          pointFormat: '{series.name}：{point.y:.2f} 万元'
        },
        plotOptions: {
         exporting: {
          enabled: false, // 取消打印menu
        },
        series: {
          dataLabels: {
            enabled: false,
            rotation: -90,
            color: '#FFFFFF',
            align: 'right',
            x: 4,
            y: 10,
            style: {
              fontSize: '13px',
              fontFamily: 'Verdana, sans-serif',
              textShadow: '0 0 3px black'
            },
            formatter: function() {
              return Number(this.y / 10000).toFixed(2);
            }
          }
        }
      }
    }
    this.series = [];
    this.size = {
      // width: 200,
      height: height
    };
  }

  function pieHighchart() {
    this.options = {
     exporting: {
          enabled: false, // 取消打印menu
        },
        colors: generalService.pieColors(),
        credits: {
          enabled: false
        },
        chart: {
          type: 'pie',
           margin: [30, 30, 30, 30],
        },
        title: {
          text: ""
        },
        legend: {
          align: 'right',
          x: 0,
          verticalAlign: 'top',
          y: 10,
          floating: true,
          backgroundColor: (Highcharts.theme && Highcharts.theme.legendBackgroundColorSolid) || 'white',
          borderColor: '#CCC',
          borderWidth: 1,
          shadow: false
        },
        plotOptions: {
          pie: {
            allowPointSelect: true,
            cursor: 'pointer',
            dataLabels: {
              zIndex: 40,
                    enabled: true,
                    format: '<b>{point.name}</b>: <br><center>{point.percentage:.1f} %</center>',
                    style: {

                        color: (Highcharts.theme && Highcharts.theme.contrastTextColor) || 'black'
                    }
                },
            showInLegend: true
          }
        },
        tooltip: {
          enabled: true,
          pointFormat: '{series.name}: <b>{point.percentage:.2f}%</b>'
        }
      }
      this.series = [{
       type: 'pie',
       name: '占比',
       data: []
     }];
   }

/*******************************************************************************
                              OBJECT AREA
 *******************************************************************************/
                              function splineDataObject(name, symbol, size) {
                                var temp = new Array(size);
                                for (var i=0; i<size; i++) {
                                  temp[i] = null;
                                }
                                this.data = temp;
                                this.name = name;
                                this.marker ={symbol: symbol};
                              }

                              function splineListObject(size) {
                                this.data = [new splineDataObject("收入", "triangle", size), new splineDataObject("支出", "triangle-down", size)];
                              }

                              function columnDataObject(name) {
                                this.data = [null];
                                this.name = name;
                              }

                              function listObject(itemList, dataObject) {
                                var temp = [];
                                for (var i=0; i<itemList.length; i++) {
                                  temp.push(new dataObject(itemList[i]));
                                }
                                this.data = temp;
                              }

                              function detailListObject(size, itemList) {
                                var temp = new Array();
                                for (var i=0; i < size; i++) {
                                  temp.push(new listObject(itemList, columnDataObject));
                                }
                                this.data = temp;
                              }

                              function pieDataObject(name) {
                                this.name = name;
                                this.y = null;
                              }

/*******************************************************************************
                          FUNCTION AREA
                          *******************************************************************************/
//这里的parameter就是传过来的UrbanBasicEndowmentInsuranceData
$scope.tabChangeFunction = function(parmeter) {
  $location.path("/InsuranceChart/"+parmeter);
}
//第一张大图
function setChartData(entityName) {
  qService.httpPost(dataDetailFactory.lastestObject, {tableName: entityName
  }, {"X-Auth-Token":token},['year']).then(function(lastObjRaw) {
    console.log(lastObjRaw);
    if (lastObjRaw.errorCode != "NO_ERROR") {
      $location.path("/main");
    }
    var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
    $scope.LATESTYEAR = latestObj.year;
    var yearList = new Array();
    for (var i=$scope.LATESTYEAR-4; i <= $scope.LATESTYEAR; i++) {
      yearList.push(i+"年");
    }
    $scope.ALLOPTION = {
      //第一张大图
      INCOMESPLINE: new splineHighChart(345, yearList),
      //第一张小图
      BALANCECOLUMN: new columnHighChart(370),
      //第二张大图
      ENGAGESTACKCOLUMN: new columnstackHighChart(345, yearList),
            //第二张小图，即饼图
      ENGAGEPIE: new pieHighchart(),
    };
    $scope.ALLDATA[entityName] = {
      INCOMESPLINEDATA: new splineListObject(5),
      BALANCEDATA: new Array(5),
      BALANCECOLUMNDATALIST: new detailListObject(5, ["收入", "支出", "结余"])
    }
    getDataAll(entityName, $scope.LATESTYEAR);
  })
}

//获取数据
function getDataAll(entityName, year) {
  var queryMap = {
    year: generalService.advanceQueryObj('bt', 'innt', [(year-4), year]),
    sort1: {
      key: 'year',
      sortType: 'asc'
    }
  };
  var tempData = $scope.ALLDATA[entityName];
  var INSURANCEDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
    tableName: entityName
  },  {"X-Auth-Token":token},queryMap);

  INSURANCEDATA.then(function(data) {
    if (data.errorCode != "NO_ERROR") {
      $location.path("/main");
    };
    var dataList = data.data;
    var currentObj, tempYear, income, outcome, lastBalance, tempIndex, tempBalance, columnNameList, lastYear, tempColumn, tempPie, lastYearDetailData, curYearDetailData, incORdecString, pieNameList
    for (var i=0; i<dataList.length; i++) {
      currentObj = dataList[i];
      tempYear = currentObj.year;
      lastYear = tempYear - 1;
      tempIndex = 4 - (year - tempYear);
      income = currentObj.income;
      outcome = currentObj.outcome;
      tempBalance = income-outcome;
      lastBalance = currentObj.lastBalance;
      tempData.BALANCEDATA[tempIndex] = [income, outcome, tempBalance, lastBalance];
      tempData.INCOMESPLINEDATA.data[0].data[tempIndex] = income;
      tempData.INCOMESPLINEDATA.data[1].data[tempIndex] = outcome;
      tempData.BALANCECOLUMNDATALIST.data[tempIndex].data[0].data[0] = income;
      tempData.BALANCECOLUMNDATALIST.data[tempIndex].data[1].data[0] = outcome;
      tempData.BALANCECOLUMNDATALIST.data[tempIndex].data[2].data[0] = tempBalance;

      columnNameList =  ["参保人员"];
      tempColumn = [];
      tempPie = [];
      var tempDetail;
      var detailNameList;

      tempColumn = [currentObj.participatedPopulation];
      switch ($scope.CURRENTINSURANCE) {
          case "城镇基本养老保险": // 城镇基本养老保险
          columnNameList = ["在职职工", "离退人员"];
          detailNameList = [(tempYear%1000)+"年在职职工参保人数", (tempYear%1000)+"年离退人员参保人数", (tempYear%1000)+"年总参保人数"];
          tempColumn = [currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation-currentObj.employeesParticipatedPopulation];
          tempDetail = [currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation-currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation];
          tempPie = [currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation-currentObj.employeesParticipatedPopulation];
          pieNameList = ["在职职工", "离退人员"];
          break;
          case "失业保险": // 失业保险
          curYearDetailData = currentObj.benefitedPopulation;
          incORdecString = "新增";
          pieNameList = [lastYear+"年在职参保人数", tempYear+"年"+incORdecString+"在职参保人数"];
          if (i === 0) {
            lastYearDetailData = 0;
            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData-curYearDetailData)];
          } else {
            lastYearDetailData = dataList[i-1].benefitedPopulation;
            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData-curYearDetailData)];
            if (lastYearDetailData > curYearDetailData) {
              incORdecString = "减少";
              tempPie = [curYearDetailData, Math.abs(lastYearDetailData-curYearDetailData)];
            }
          }
          columnNameList =  ["失业金领取人员"];
          detailNameList = [(lastYear%1000)+"年失业金领取人数", (tempYear%1000)+"年"+incORdecString+"失业金领取人数", (tempYear%1000)+"年失业金领取人数"];
          tempColumn = [curYearDetailData];
          tempDetail = [lastYearDetailData, Math.abs(lastYearDetailData-curYearDetailData), curYearDetailData];
          break;
          case "城镇基本医疗保险": // 城镇基本医疗保险
          case "城镇居民医疗保险": // 城镇居民医疗保险
          curYearDetailData = currentObj.participatedPopulation;
          incORdecString = "新增";
          pieNameList = [lastYear+"年在职参保人数", tempYear+"年"+incORdecString+"在职参保人数"];
          if (i === 0) {
            lastYearDetailData = 0;
            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData-curYearDetailData)];
          } else {
            lastYearDetailData = dataList[i-1].participatedPopulation;
            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData-curYearDetailData)];
            if (lastYearDetailData > curYearDetailData) {
              incORdecString = "减少";
              pieNameList = [tempYear+"年在职参保人数", tempYear+"年"+incORdecString+"在职参保人数"];
              tempPie = [curYearDetailData, Math.abs(lastYearDetailData-curYearDetailData)];
            }
          }
          tempDetail = [lastYearDetailData, Math.abs(lastYearDetailData-curYearDetailData), curYearDetailData];
          detailNameList = [(lastYear%1000)+"年在职参保人数", (tempYear%1000)+"年"+incORdecString+"在职参保人数", (tempYear%1000)+"年在职参保人数"];
          break;
          case "工伤保险": // 工伤保险
          case "生育保险": // 生育保险
          case "居民基本养老保险": // 居民基本养老保险
          tempDetail = [currentObj.participatedPopulation, currentObj.benefitedPopulation, Number(currentObj.benefitedPopulation*100/(currentObj.benefitedPopulation+currentObj.participatedPopulation)).toFixed(2)];
          detailNameList = [(tempYear%1000)+"年在职人员参保人数", (tempYear%1000)+"年享受待遇人员数量", (tempYear%1000)+"年享受待遇人数占比"];
          pieNameList = ["在职人员","享受待遇人员"];
          tempPie = [currentObj.participatedPopulation, currentObj.benefitedPopulation];
          break;
        }
        if (tempData.ENGAGESTACKCOLUMNDATALIST  == undefined) {
          tempData.ENGAGESTACKCOLUMNDATALIST = new listObject(columnNameList, columnDataObject);
          tempData.yearParticipatedTitle = new Array(5);
          tempData.insuranceDetailParticipated = new Array(5);
          tempData.ENGAGEPIELIST = new Array(5);
          tempData.ENGAGEPIELIST[0] = null;
        }

        tempData.ENGAGEPIELIST[tempIndex] = new listObject(pieNameList, pieDataObject);
        for(var j=0; j < tempColumn.length; j++) {
          tempData.ENGAGESTACKCOLUMNDATALIST.data[j].data[tempIndex] = tempColumn[j];
        }
        tempData.yearParticipatedTitle[tempIndex] = detailNameList;
        tempData.insuranceDetailParticipated[tempIndex] = tempDetail;
        for(var j=0; j < tempPie.length; j++) {
          tempData.ENGAGEPIELIST[tempIndex].data[j].y = tempPie[j];
        }
      }

      $scope.ALLOPTION.INCOMESPLINE.options.title.text = "太仓市近5年" + $scope.CURRENTINSURANCE + "收支情况";
      $scope.ALLOPTION.INCOMESPLINE.series = $scope.ALLDATA[entityName].INCOMESPLINEDATA.data;
      clickEventOfIncomeSpline(entityName, year)

      $scope.chartSuffix =  "参保人员";
      if ($scope.CURRENTINSURANCE === "失业保险") {
        $scope.chartSuffix = "失业金领取人员";
      }
      $scope.ALLOPTION.ENGAGESTACKCOLUMN.options.title.text = "太仓市近5年" + $scope.CURRENTINSURANCE + $scope.chartSuffix + "情况";
      $scope.ALLOPTION.ENGAGESTACKCOLUMN.series = $scope.ALLDATA[entityName].ENGAGESTACKCOLUMNDATALIST.data;
      clickEventOfEngageStackColumn(entityName, year);
    })
}
//点击第一张大图发生的事件
function clickEventOfIncomeSpline(entityName, year) {
  var index = year - $scope.LATESTYEAR + 4;
  // $scope.ALLOPTION.BALANCECOLUMN.options.title.text = "收入支出"
  $scope.ALLOPTION.BALANCECOLUMN.series = $scope.ALLDATA[entityName].BALANCECOLUMNDATALIST.data[index].data;
  $scope.ALLOPTION.BALANCECOLUMN.options.xAxis.categories = [$scope.CURRENTINSURANCE];
  $scope.yearBalance = $scope.ALLDATA[entityName].BALANCEDATA[index];
  $scope.balance = $scope.ALLDATA[entityName].BALANCEDATA[index];
  $scope.balanceSelectYear = year;
}
//点击第二张大图发生的事件
function clickEventOfEngageStackColumn(entityName, year) {
  var index = year - $scope.LATESTYEAR + 4;
  $scope.ALLOPTION.ENGAGEPIE.options.title.text = "";
  $scope.ALLOPTION.ENGAGEPIE.series[0].data = $scope.ALLDATA[entityName].ENGAGEPIELIST[index].data;
  $scope.insuranceParticapted = $scope.ALLDATA[entityName].insuranceDetailParticipated[index];
  $scope.insuranceDetailParticipated = $scope.ALLDATA[entityName].insuranceDetailParticipated[index];
  $scope.yearParticipatedTitle = $scope.ALLDATA[entityName].yearParticipatedTitle[index];
  $scope.participatedTitle = $scope.ALLDATA[entityName].yearParticipatedTitle[index];
  $scope.engageSelectYear = year;
}



}











