export default ($scope, qService, generalService, dataDetailFactory, $http, $rootScope, $location) => {
  let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoyNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibmFtZSI6Iue7j+a1juebuOWFs+e7hCIsImRlc2NyaXB0aW9uIjoiSkpYR1pf57uP5rWO55u45YWz57uEIn0seyJAaWQiOiIxMCIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjEyIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjE1IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIxNyIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjE4IiwiaWQiOjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm5hbWUiOiLnu5/orqHlsYAiLCJkZXNjcmlwdGlvbiI6IlRKSl/nu5/orqHlsYAifSx7IkBpZCI6IjE5IiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn0seyJAaWQiOiIyMCIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn1dfSwiZXhwaXJlcyI6MTQ3ODg2MDM0NjcyMywiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.R612aMpkC1yeJcajKjX21a+5MGFOCi+plIR9nCngfuM=";
  $scope.tabMap = [{
    id: "tab_populationStructure",
    label: "人口结构图",
    name: "PopulationStructure",
    active: false
  }, {
    id: "tab_terminalPopulation",
    label: "期末户籍人口数",
    name: "TerminalPopulation",
    active: false
  }, {
    id: "tab_bornDeath",
    label: "出生人口与死亡人口详情",
    name: "BornDeath",
    active: false
  }, {
    id: "tab_bearingWomen",
    label: "户籍育龄妇女详情",
    name: "BearingWomen",
    active: false
  }, {
    id: "tab_firstMarriage",
    label: "初婚女性详情",
    name: "FirstMarriage",
    active: false
  }];

/*******************************************************************************
                            INIT PART
*******************************************************************************/
  var temploc = $location.path().split("/");
  var thisLoc = temploc[temploc.length - 1];
  if (thisLoc == undefined) {
    setTab("PopulationStructure");
  } else {
    setTab(thisLoc);
  }


  /*******************************************************************************
                HIGHCHARG CONFIGURATION AREA
*******************************************************************************/
  function barHighChart(height, categories) {
    this.options = {
      colors: generalService.compareColors(),
      chart: {
        type: 'bar'
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
      },
      subtitle: {
        text: ''
      },
      xAxis: [{
        categories: categories,
        reversed: false
      }, { // mirror axis on right side
        opposite: true,
        reversed: false,
        categories: categories,
        linkedTo: 0
      }],
      yAxis: {
        title: {
          text: null
        },
        labels: {
          formatter: function() {
            return Math.abs(this.value);
          }
        },
        min: -15000,
        max: 15000
      },
      plotOptions: {
        bar: {
          cursor: 'pointer',
          events: {},
          point: {
            events: {
              click: function(event) {
                var query_age = event.point.category;
                $scope.$apply($scope.ALLDATA.detailTableData = $scope.ALLDATA.detailTableDataList[query_age.substr(0, query_age.indexOf("岁"))].data);
              }
            }
          }
        },
        series: {
          stacking: 'normal'
        }
      },
      legend: {
        enabled: false
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.series.name + '<br/> 年龄段: ' + this.point.category + '</b><br/>' + '人口数量: ' + Highcharts.numberFormat(Math
            .abs(this.point.y), 0) + "人";
        }
      }
    }
    this.series = [];
    this.size = {
      // width: 200,
      height: height
    };
  }

  function STACKCOLUMNHIGHCHART(height, categories, yAxisTitle, callFunc1, callFunc2) {
    var colors = generalService.columnColors();
    colors.splice(3,0,'#606060');
    this.options = {
      colors: colors,
      chart: {
        type: 'column'
      },
      title: {
        text: ""
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,
        tickmarkPlacement: 'on'
      },
      yAxis: {
        min: 0,
        title: {
          text: yAxisTitle
        },
        stackLabels: {
          enabled: false,
          style: {
            fontWeight: 'bold',
            color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
          }
        },
        labels: {
          formatter: function() {
            return Math.abs(this.value);
          }
        },
      },
      legend: {
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + '： ' + this.y + ' 人<br/>' +
            '<b>总共： ' + this.point.stackTotal + ' 人</b>';
        }
      },
      plotOptions: {
        column: {
          stacking: 'normal',
          dataLabels: {
            enabled: false,
            color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
            style: {
              textShadow: '0 0 3px black'
            }
          },
          point: {
            events: {
              click: function(event) {
                var queryTown;
                var queryItem = event.point.category;
                var tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
                if (queryItem.substr(-1) == "年") {
                  $scope.queryYear = queryItem.substr(0, queryItem.length - 1);
                  tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
                  queryTown = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex][0];
                  callFunc2($scope.queryYear, tempIndex, $scope.tableNameStr);
                } else {
                  queryTown = queryItem;
                }
                $scope.$apply(callFunc1($scope.queryYear, tempIndex, queryTown, $scope.tableNameStr));
              }
            }
          }
        }
      }
    };
    this.series = [];
    this.size = {
      // width: 200,
      height: height
    };
  }

  function COLUMNHIGHCHART(height, categories, yAxisTitle, callFunc1, callFunc2) {
    this.options = {
      chart: {
        type: 'column'
      },
      title: {
        text: ""
      },
      subtitle: {
        text: ''
      },
      credits: {
        enabled: false
      },
      xAxis: {
        categories: categories,
        tickmarkPlacement: 'on'
      },
      yAxis: {
        min: 0,
        title: {
          text: yAxisTitle
        },
        labels: {
          formatter: function() {
            return Math.abs(this.value);
          }
        }
      },
      legend: {
        enabled: true,
        align: 'right',
        x: -30,
        verticalAlign: 'top',
        y: 25,
        floating: true,
        backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
        borderColor: '#CCC',
        borderWidth: 1,
        shadow: false
      },
      tooltip: {
        formatter: function() {
          return '<b>' + this.x + '</b><br/>' +
            this.series.name + '： ' + this.y + ' 人<br/>';
        }
      },
      plotOptions: {
        column: {
          point: {
            events: {
              click: function(event) {
                var queryTown;
                var queryItem = event.point.category;
                var tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
                if (queryItem.substr(-1) == "年") {
                  $scope.queryYear = queryItem.substr(0, queryItem.length - 1);
                  tempIndex = $scope.queryYear - $scope.LATESTYEAR + 4;
                  queryTown = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex][0];
                  callFunc2($scope.queryYear, tempIndex, $scope.tableNameStr);
                } else {
                  queryTown = queryItem;
                }
                $scope.$apply(callFunc1($scope.queryYear, tempIndex, queryTown, $scope.tableNameStr));
              }
            }
          }
        }
      }
    };
    this.series = [];
    this.size = {
      // width: 200,
      height: height
    };
  }


  /*******************************************************************************
                          FUNCTION AREA
*******************************************************************************/
  $scope.tabChangeFunction = function(parmeter) {
    $location.path("/DetailPlanBorn/"+parmeter);
  };

  function setTab(tabName) {
    $scope.currentTab = tabName;
    $("#plan-born-detail-panel").removeClass("hide");
    $scope.detail_table_name = null;
    $scope.detailTableDataList = null;
    for (var i = 0; i < $scope.tabMap.length; i++) {
      if ($scope.tabMap[i].active == true && $scope.tabMap[i].name != tabName)
      $scope.tabMap[i].active = false;
      if ($scope.tabMap[i].name == tabName)
      $scope.tabMap[i].active = true;
    }
    setChartData(tabName)
  }

  function setChartData(tabName) {
    let getDataFunction = function(){}
    var entityName;
    var ageList = new Array();
    if (tabName === $scope.tabMap[0].name) {
      for (var i=0; i <= 99; i++) {
        ageList.push(i+"岁");
      }
      ageList.push("100岁及以上");
      entityName = "DetailPopulationByAge";
    } else {
      entityName = "PlanBorn";
    }
    qService.httpPost(dataDetailFactory.lastestObject, {tableName: entityName
    }, {"X-Auth-Token":token},['year']).then(function(lastObjRaw) {
      console.log(lastObjRaw);
      if (lastObjRaw.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
      $scope.LATESTYEAR = latestObj.year;
      $scope.queryYear = latestObj.year;

      var yearList = new Array();
      for (var i=$scope.LATESTYEAR-4; i <= $scope.LATESTYEAR; i++) {
        yearList.push(i+"年");
      }

      switch (tabName) {
        case $scope.tabMap[0].name:
          $("#plan-born-detail-panel").addClass("hide");
          $scope.currentTab = $scope.tabMap[0].label;
          $scope.panel_heading = [$scope.LATESTYEAR + "年人口结构图"];
          $scope.ALLOPTION = {
            POPULATIONCHART: new barHighChart(700, ageList)
          }
          $scope.ALLDATA = {
            POPULATIONCHARTDATA: new DataList(["男性", "女性"], ageList.length, chartDataObject),
            tableName: $scope.LATESTYEAR + "年太仓市人口总量数据详请",
            tableDataList: new tableDataList(3),
            tableData: null,
            detailTableName: $scope.LATESTYEAR + "年太仓市人口结构数据详请",
            detailTableDataList: new Array(ageList.length)
          }
          getDataFunction = getPopulationStructureData;
          break;
        case $scope.tabMap[1].name:
          $scope.currentTab = $scope.tabMap[1].label;
          $scope.tableNameStr = "期末户籍人口";
          $scope.panel_heading = ["太仓市期末户籍人口数量", "各乡镇期末户籍人口详情"];
          $scope.ALLOPTION = {
            POPULATIONCHART: new COLUMNHIGHCHART(450, yearList, "期末户籍人口数", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
            POPULATIONTOWNCHART: new COLUMNHIGHCHART(400, [], "期末户籍人口数", callFunctionOfPopulationTownChart, null)
          }
          $scope.ALLDATA = {
            POPULATIONCHARTDATA: new DataList(["期末户籍人口数"], yearList.length, chartDataObject),
            tableName: $scope.LATESTYEAR + "年太仓全市户籍人口数据详请",
            tableDataList: new Array(yearList.length),
            tableData: null,
            POPULATIONTOWNCHARTDATA: new Array(yearList.length),
            POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
            townTableName: $scope.LATESTYEAR + "年太仓城厢镇户籍人口数据详请",
            townTableDataList: new Array(yearList.length),
            townTableData: null
          }
          getDataFunction = getTerminalPopulationData;
          break;
        case $scope.tabMap[2].name:
          $scope.currentTab = $scope.tabMap[2].label;
          $scope.tableNameStr = "户籍人口出生死亡";
          $scope.panel_heading = ["太仓市户籍人口出生死亡情况", "各乡镇户籍人口出生死亡详情"];
          $scope.ALLOPTION = {
            POPULATIONCHART: new STACKCOLUMNHIGHCHART(450, yearList, "出生/死亡人数", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
            POPULATIONTOWNCHART: new STACKCOLUMNHIGHCHART(400, [], "出生/死亡人数", callFunctionOfPopulationTownChart, null)
          }
          $scope.ALLDATA = {
            POPULATIONCHARTDATA: new DataList([["一孩总数", "出生总数"],["二孩总数", "出生总数"],["多孩总数", "出生总数"],["死亡总数", "死亡总数"]], yearList.length, stackColumnDataObject),
            tableName: $scope.LATESTYEAR + "年太仓全市户籍人口出生死亡数据详请",
            tableDataList: new Array(yearList.length),
            tableData: null,
            POPULATIONTOWNCHARTDATA: new Array(yearList.length),
            POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
            townTableName: $scope.LATESTYEAR + "年太仓城厢镇户籍人口出生死亡数据详请",
            townTableDataList: new Array(yearList.length),
            townTableData: null
          }
          getDataFunction = getBornDeathData;
          break;
        case $scope.tabMap[3].name:
          $scope.currentTab = $scope.tabMap[3].label;
          $scope.tableNameStr = "育龄妇女";
          $scope.panel_heading = ["太仓市育龄妇女情况", "各乡镇育龄妇女数据详情"];
          $scope.ALLOPTION = {
            POPULATIONCHART: new STACKCOLUMNHIGHCHART(450, yearList, "育龄妇女数量", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
            POPULATIONTOWNCHART: new STACKCOLUMNHIGHCHART(400, [], "育龄妇女数量", callFunctionOfPopulationTownChart, null)
          }
          $scope.ALLDATA = {
            POPULATIONCHARTDATA: new DataList([["已婚育龄妇女", "育龄妇女"],["未婚育龄妇女", "育龄妇女"]], yearList.length, stackColumnDataObject),
            tableName: $scope.LATESTYEAR + "年太仓全市育龄妇女数据详情",
            tableDataList: new Array(yearList.length),
            tableData: null,
            POPULATIONTOWNCHARTDATA: new Array(yearList.length),
            POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
            townTableName: $scope.LATESTYEAR + "年太仓城厢镇育龄妇女数据详请",
            townTableDataList: new Array(yearList.length),
            townTableData: null
          }
          getDataFunction = getBearingWomenData;
          break;
        case $scope.tabMap[4].name:
          $scope.currentTab = $scope.tabMap[4].label;
          $scope.tableNameStr = "初婚女性";
          $scope.panel_heading = ["太仓市初婚女性情况", "各乡镇初婚女性数据详情"];
          $scope.ALLOPTION = {
            POPULATIONCHART: new STACKCOLUMNHIGHCHART(450, yearList, "初婚女性数量", callFunctionOfPopulationTownChart, callFunctionOfPopulationChart),
            POPULATIONTOWNCHART: new STACKCOLUMNHIGHCHART(400, [], "初婚女性数量", callFunctionOfPopulationTownChart, null)
          }
          $scope.ALLDATA = {
            POPULATIONCHARTDATA: new DataList([["19周岁及以下初婚女性", "初婚女性"], ["20到22周岁初婚女性", "初婚女性"], ["23周岁及以上初婚女性", "初婚女性"]], yearList.length, stackColumnDataObject),
            tableName: $scope.LATESTYEAR + "年太仓全市初婚女性数据详情",
            tableDataList: new Array(yearList.length),
            tableData: null,
            POPULATIONTOWNCHARTDATA: new Array(yearList.length),
            POPULATIONTOWNCHARTCATEGORIES: new Array(yearList.length),
            townTableName: $scope.LATESTYEAR + "年太仓城厢镇初婚女性数据详请",
            townTableDataList: new Array(yearList.length),
            townTableData: null
          }
          getDataFunction = getFirstMarriageWomenData;
          break;
      }

      getDataFunction(entityName, $scope.LATESTYEAR);
    });
  }


  function getFirstMarriageWomenData(entityName, year) {
    var queryMap = {
      year: generalService.advanceQueryObj('bt', 'innt', [year-4, year]),
      sort1: {
        key: 'year',
        sortType: 'asc'
      },
      sort2: {
        key: 'townType',
        sortType: 'asc'
      }
    };
    var POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
      tableName: entityName
    }, {"X-Auth-Token":token},queryMap);

    POPULATIONSTRUCTUREDATA.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data;
      var firstMarriageUnder19, firstMarriageUnder23, firstMarriageAbove23, lateMarriageRate, tempDataObj, dataObject, tempIndex, tempDetailIndex
      for (var i=0; i<dataList.length; i++) {
        dataObject = dataList[i];
        tempIndex = dataObject.year - year + 4;

        firstMarriageUnder19 = 0;
        firstMarriageAbove23 = dataObject.female23FirstMarriageSum;
        firstMarriageUnder23 = dataObject.femaleFirstMarriageSum - firstMarriageUnder19 - firstMarriageAbove23;
        lateMarriageRate = firstMarriageAbove23 / dataObject.femaleFirstMarriageSum * 100;

        if (dataObject.townTypeName === "全市") {
          $scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = firstMarriageUnder19;
          $scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = firstMarriageUnder23;
          $scope.ALLDATA.POPULATIONCHARTDATA.data[2].data[tempIndex] = firstMarriageAbove23;
          if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(4);
          }
          tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
        } else {
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
          }
          tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
          if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList([["19周岁及以下初婚女性", "初婚女性"], ["20到22周岁初婚女性", "初婚女性"], ["23周岁及以上初婚女性", "初婚女性"]], 1, stackColumnDataObject);
          }
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = firstMarriageUnder19;
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[1].data[tempDetailIndex] = firstMarriageUnder23;
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[2].data[tempDetailIndex] = firstMarriageAbove23;
          if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(4);
          }
          tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
        }
        tempDataObj.data[0].name = "19周岁及以下女性初婚总数";
        tempDataObj.data[0].value = firstMarriageUnder19 + "人";
        tempDataObj.data[1].name = "20到22周岁女性初婚总数";
        tempDataObj.data[1].value = firstMarriageUnder23 + "人";
        tempDataObj.data[2].name = "23周岁及以上女性初婚总数";
        tempDataObj.data[2].value = firstMarriageAbove23 + "人";
        tempDataObj.data[3].name = "晚婚率";
        tempDataObj.data[3].value = Number(lateMarriageRate).toFixed(2) + "%";
      }
      $scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年初婚女性情况 ";
      $scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
      callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
      callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
    })
  }


  function getBearingWomenData(entityName, year) {
    var queryMap = {
      year: generalService.advanceQueryObj('bt', 'innt', [year-4, year]),
      sort1: {
        key: 'year',
        sortType: 'asc'
      },
      sort2: {
        key: 'townType',
        sortType: 'asc'
      }
    };
    var POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
      tableName: entityName
    }, {"X-Auth-Token":token},queryMap);

    POPULATIONSTRUCTUREDATA.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data;
      var bearingWomenRate, marriedBearingWomenRate, singleChildRation, singleChildCardRation, tempDataObj, dataObject, tempIndex, tempDetailIndex;
      for (var i=0; i<dataList.length; i++) {
        dataObject = dataList[i];
        tempIndex = dataObject.year - year + 4;

        bearingWomenRate = dataObject.womenPopulation / ((0.0 + dataObject.beginningPopulation + dataObject.terminalPopulation) / 2) * 100;
        marriedBearingWomenRate = dataObject.marriedWomenPopulation / ((0.0 + dataObject.beginningPopulation + dataObject.terminalPopulation) / 2) * 100;
        singleChildRation = dataObject.womenOfKid1Population / (0.0 + dataObject.marriedWomenPopulation) * 100;
        singleChildCardRation = dataObject.cardNumber / (0.0 + dataObject.marriedWomenPopulation) * 100;

        if (dataObject.townTypeName === "全市") {
          $scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = dataObject.marriedWomenPopulation;
          $scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = dataObject.womenPopulation - dataObject.marriedWomenPopulation;
          if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(4);
          }
          tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
        } else {
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
          }
          tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
          if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList([["已婚育龄妇女", "育龄妇女"],["未婚育龄妇女", "育龄妇女"]], 1, stackColumnDataObject);
          }
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = dataObject.marriedWomenPopulation;
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[1].data[tempDetailIndex] = dataObject.womenPopulation - dataObject.marriedWomenPopulation;
          if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(4);
          }
          tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
        }
        tempDataObj.data[0].name = "育龄妇女占总人口比";
        tempDataObj.data[0].value = Number(bearingWomenRate).toFixed(2) + "%";
        tempDataObj.data[1].name = "已婚育龄妇女占总人口比";
        tempDataObj.data[1].value = Number(marriedBearingWomenRate).toFixed(2) + "%";
        tempDataObj.data[2].name = "独生子女率";
        tempDataObj.data[2].value = Number(singleChildRation).toFixed(2) + "%";
        tempDataObj.data[3].name = "独生子女领证率";
        tempDataObj.data[3].value = Number(singleChildCardRation).toFixed(2) + "%";
      }
      $scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年户籍育龄妇女情况 ";
      $scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
      callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
      callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
    });
  }


  function getBornDeathData(entityName, year) {
    var queryMap = {
      year: generalService.advanceQueryObj('bt', 'innt', [year-4, year]),
      sort1: {
        key: 'year',
        sortType: 'asc'
      },
      sort2: {
        key: 'townType',
        sortType: 'asc'
      }
    };
    var POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
      tableName: entityName
    }, {"X-Auth-Token":token},queryMap);

    POPULATIONSTRUCTUREDATA.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data;
      var bornNumber, deathNumber, planBornRate, kid1Rate, bornGenderRation, tempDataObj, dataObject, tempIndex, tempDetailIndex;
      for (var i=0; i<dataList.length; i++) {
        dataObject = dataList[i];
        tempIndex = dataObject.year - year + 4;

        bornNumber = dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum;
        deathNumber = dataObject.deathSum;
        planBornRate = (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum - (dataObject.kid1OutSum + dataObject.kid2OutSum + dataObject.kidNOutSum)) / (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum) * 100;
        kid1Rate = dataObject.kid1Sum / (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum) * 100;
        bornGenderRation = (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum - (dataObject.kid1FemaleSum + dataObject.kid2FemaleSum + dataObject.kidNFemaleSum)) / (dataObject.kid1FemaleSum + dataObject.kid2FemaleSum + dataObject.kidNFemaleSum) * 100;

        if (dataObject.townTypeName === "全市") {
          $scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = dataObject.kid1Sum;
          $scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = dataObject.kid2Sum;
          $scope.ALLDATA.POPULATIONCHARTDATA.data[2].data[tempIndex] = dataObject.kidNSum;
          $scope.ALLDATA.POPULATIONCHARTDATA.data[3].data[tempIndex] = dataObject.deathSum;
          if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(5);
          }
          tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
        } else {
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
          }
          tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
          if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList([["一孩总数", "出生总数"],["二孩总数", "出生总数"],["多孩总数", "出生总数"],["死亡总数", "死亡总数"]], 1, stackColumnDataObject);
          }
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = dataObject.kid1Sum;
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[1].data[tempDetailIndex] = dataObject.kid2Sum;
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[2].data[tempDetailIndex] = dataObject.kidNSum;
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[3].data[tempDetailIndex] = dataObject.deathSum;
          if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(5);
          }
          tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
        }
        tempDataObj.data[0].name = "出生人口数量";
        tempDataObj.data[0].value = bornNumber + "人";
        tempDataObj.data[1].name = "死亡人口数量";
        tempDataObj.data[1].value = deathNumber + "人";
        tempDataObj.data[2].name = "政策符合率";
        tempDataObj.data[2].value = Number(planBornRate).toFixed(2) + "%";
        tempDataObj.data[3].name = "一孩率";
        tempDataObj.data[3].value = Number(kid1Rate).toFixed(2) + "%";
        tempDataObj.data[4].name = "出生性别比（男/女）";
        tempDataObj.data[4].value = Number(bornGenderRation).toFixed(2);
      }
      $scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年户籍人口出生死亡情况 ";
      $scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
      callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
      callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
    });
  }


  function getTerminalPopulationData(entityName, year) {
    var queryMap = {
      year: generalService.advanceQueryObj('bt', 'innt', [year-4, year]),
      sort1: {
        key: 'year',
        sortType: 'asc'
      },
      sort2: {
        key: 'townType',
        sortType: 'asc'
      }
    };
    var POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
      tableName: entityName
    }, {"X-Auth-Token":token},queryMap);

    POPULATIONSTRUCTUREDATA.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data;
      var bornRate, deathRate, naturalIncRate, population, tempDataObj, dataObject, tempIndex, tempDetailIndex, minTerminalPopulation=Number.MAX_VALUE;
      for (var i=0; i<dataList.length; i++) {
        dataObject = dataList[i];
        tempIndex = dataObject.year - year + 4;
        population = (0.0 + dataObject.beginningPopulation + dataObject.terminalPopulation) / 2;
        bornRate = (dataObject.kid1Sum + dataObject.kid2Sum + dataObject.kidNSum) / population * 1000;
        deathRate = dataObject.deathSum / population * 1000;
        naturalIncRate = bornRate - deathRate;
        if (dataObject.townTypeName === "全市") {
          $scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = dataObject.terminalPopulation;
          if (minTerminalPopulation > dataObject.terminalPopulation) {
            minTerminalPopulation = dataObject.terminalPopulation;
          }
          if ($scope.ALLDATA.tableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.tableDataList[tempIndex] = new tableDataList(4);
          }
          tempDataObj = $scope.ALLDATA.tableDataList[tempIndex];
        } else {
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName) === -1) {
            $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].push(dataObject.townTypeName);
          }
          tempDetailIndex = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[tempIndex].indexOf(dataObject.townTypeName);
          if ($scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] == undefined) {
            $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex] = new DataList(["期末户籍人口数"], 1, chartDataObject);
          }
          $scope.ALLDATA.POPULATIONTOWNCHARTDATA[tempIndex].data[0].data[tempDetailIndex] = dataObject.terminalPopulation;
          if ($scope.ALLDATA.townTableDataList[tempIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex] = new Array();
          }
          if ($scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] == undefined) {
            $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex] = new tableDataList(4);
          }
          tempDataObj = $scope.ALLDATA.townTableDataList[tempIndex][tempDetailIndex];
        }
        tempDataObj.data[0].name = "期末户籍人口数";
        tempDataObj.data[0].value = dataObject.terminalPopulation + "人";
        tempDataObj.data[1].name = "出生率";
        tempDataObj.data[1].value = Number(bornRate).toFixed(2) + "‰";
        tempDataObj.data[2].name = "死亡率";
        tempDataObj.data[2].value = Number(deathRate).toFixed(2) + "‰";
        tempDataObj.data[3].name = "自增率";
        tempDataObj.data[3].value = Number(naturalIncRate).toFixed(2) + "‰";
      }
      var operation = 1;
      while (minTerminalPopulation > 10) {
        operation *= 10;
        minTerminalPopulation = parseInt(minTerminalPopulation / 10);
      }
      minTerminalPopulation *= operation;
      $scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市近5年期末户籍人口情况";
      $scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
      $scope.ALLOPTION.POPULATIONCHART.options.yAxis.min = minTerminalPopulation;
      callFunctionOfPopulationChart(year, 4, $scope.tableNameStr);
      callFunctionOfPopulationTownChart(year, 4, "城厢镇", $scope.tableNameStr);
    });
  }


   function getPopulationStructureData(entityName, year) {
    var queryMap = {
      year: generalService.advanceQueryObj('eq', 'innt', [year]),
      sort1: {
        key: 'ageType',
        sortType: 'asc'
      }
    };
    var POPULATIONSTRUCTUREDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
      tableName: entityName
    }, {"X-Auth-Token":token},queryMap);

    POPULATIONSTRUCTUREDATA.then(function(data) {
      if (data.errorCode != "NO_ERROR") {
        $location.path("/main");
      }
      var dataList = data.data;
      var transientSum=0, residentSum=0, tempIndex=0, tempDataObj, dataObject;
      for (var i=0; i<dataList.length; i++) {
        dataObject = dataList[i];
        tempIndex = dataObject.ageTypeId - 2700;// 2700 stands for age 0
        transientSum += dataObject.transientPopulation;
        residentSum += dataObject.residentPopulation;
        if ($scope.ALLDATA.detailTableDataList[tempIndex] == undefined) {
          $scope.ALLDATA.detailTableDataList[tempIndex] = new tableDataList(4);
        }
        tempDataObj = $scope.ALLDATA.detailTableDataList[tempIndex];
        if (dataObject.sexName === "女性") {
          tempDataObj.data[0].name = dataObject.ageTypeName + "女性常住人口";
          tempDataObj.data[0].value = dataObject.residentPopulation + "人";
          tempDataObj.data[1].name = dataObject.ageTypeName + "女性暂住人口";
          tempDataObj.data[1].value = dataObject.transientPopulation + "人";
          if (tempIndex < 100) {
            $scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[tempIndex] = dataObject.residentPopulation + dataObject.transientPopulation;
          } else {
            $scope.ALLDATA.POPULATIONCHARTDATA.data[1].data[100] += dataObject.residentPopulation + dataObject.transientPopulation;
          }
        } else {
          tempDataObj.data[2].name = dataObject.ageTypeName + "男性常住人口";
          tempDataObj.data[2].value = dataObject.residentPopulation + "人";
          tempDataObj.data[3].name = dataObject.ageTypeName + "男性暂住人口";
          tempDataObj.data[3].value = dataObject.transientPopulation + "人";
          if (tempIndex < 100) {
            $scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[tempIndex] = -(dataObject.residentPopulation + dataObject.transientPopulation);
          } else {
            $scope.ALLDATA.POPULATIONCHARTDATA.data[0].data[100] -= (dataObject.residentPopulation + dataObject.transientPopulation);
          }
        }
      }
      $scope.ALLDATA.tableDataList.data[0].name = "人口总量";
      $scope.ALLDATA.tableDataList.data[0].value = transientSum + residentSum + "人";
      $scope.ALLDATA.tableDataList.data[1].name = "常住人口总量";
      $scope.ALLDATA.tableDataList.data[1].value = residentSum + "人";
      $scope.ALLDATA.tableDataList.data[2].name = "暂住人口总量";
      $scope.ALLDATA.tableDataList.data[2].value = transientSum + "人";

      $scope.ALLOPTION.POPULATIONCHART.options.title.text = "太仓市" + year + "人口结构图";
      $scope.ALLOPTION.POPULATIONCHART.series = $scope.ALLDATA.POPULATIONCHARTDATA.data;
      $scope.ALLDATA.detailTableData = $scope.ALLDATA.detailTableDataList[0].data;
      $scope.ALLDATA.tableData = $scope.ALLDATA.tableDataList.data;
    });
  }


  function chartDataObject(name, size) {
    this.name = name;
    this.data = new Array(size);
  }

  function stackColumnDataObject(nameList, size) {
    this.name = nameList[0];
    this.data = new Array(size);
    this.stack = nameList[1];
  }

  function DataList(nameList, size, dataObject) {
    var temp = new Array();
    for (var i=0; i < nameList.length; i++) {
      temp[i] = new dataObject(nameList[i], size);
    }
    this.data = temp;
  }

  function tableDataObject() {
    this.name = "";
    this.value = 0;
  }

  function tableDataList(size) {
    var temp = new Array(size);
    for (var i=0; i<size; i++) {
      temp[i] = new tableDataObject();
    }
    this.data = temp;
  }

  function callFunctionOfPopulationChart(year, index, nameStr) {
    $scope.ALLDATA.tableName = year + "年太仓全市" + nameStr + "数据详请";
    $scope.ALLDATA.tableData =  $scope.ALLDATA.tableDataList[index].data;
    $scope.ALLOPTION.POPULATIONTOWNCHART.options.title.text = year + "年太仓全市各乡镇" + nameStr + "情况";
    $scope.ALLOPTION.POPULATIONTOWNCHART.options.xAxis.categories = $scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[index];
    $scope.ALLOPTION.POPULATIONTOWNCHART.series = $scope.ALLDATA.POPULATIONTOWNCHARTDATA[index].data;
  }

  function callFunctionOfPopulationTownChart(year, index, town, nameStr) {
    $scope.ALLDATA.townTableName = year + "年太仓市" + town + nameStr + "数据详请";
    $scope.ALLDATA.townTableData =  $scope.ALLDATA.townTableDataList[index][$scope.ALLDATA.POPULATIONTOWNCHARTCATEGORIES[index].indexOf(town)].data;
  }


}