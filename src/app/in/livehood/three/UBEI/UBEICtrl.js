export default ($scope, qService, generalService, dataDetailFactory, $http, $rootScope, $location) => {
  let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoyNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibmFtZSI6Iue7j+a1juebuOWFs+e7hCIsImRlc2NyaXB0aW9uIjoiSkpYR1pf57uP5rWO55u45YWz57uEIn0seyJAaWQiOiIxMCIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjEyIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjE1IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIxNyIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjE4IiwiaWQiOjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm5hbWUiOiLnu5/orqHlsYAiLCJkZXNjcmlwdGlvbiI6IlRKSl/nu5/orqHlsYAifSx7IkBpZCI6IjE5IiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn0seyJAaWQiOiIyMCIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn1dfSwiZXhwaXJlcyI6MTQ3ODg2MDM0NjcyMywiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.R612aMpkC1yeJcajKjX21a+5MGFOCi+plIR9nCngfuM=";
  /*******************************************************************************
                              VARIABLE AREA
*******************************************************************************/
  $scope.BALANCEUNIT = "万元"
  $scope.PARTICAPTEDUNIT = "人"
  $scope.ALLOPTION = {}
  $scope.ALLDATA = {}

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
    }]

  function setTab(tabName) {
      // 取消选中当前选中tab，并且选中对应的tab
      for (var i = 0; i < $scope.tabMap.length; i++) {
        if ($scope.tabMap[i].active == true && $scope.tabMap[i].name != tabName)
          $scope.tabMap[i].active = false
        else if ($scope.tabMap[i].name == tabName)
          $scope.tabMap[i].active = true
      }
      $scope.PARTICAPTEDUNITNEW = $scope.PARTICAPTEDUNIT;
      $scope.PARTICAPTEDNAME = "参保人员"
      switch (tabName) {
        case "UrbanBasicEndowmentInsuranceData": // 城镇基本养老保险
          $scope.CURRENTINSURANCE = "城镇基本养老保险"
          break;
        case "UnemploymentInsuranceData": // 失业保险
          $scope.CURRENTINSURANCE = "失业保险"
          $scope.PARTICAPTEDNAME = "失业金领取人员"
          break;
        case "UrbanBasicMedicalInsuranceData": // 城镇基本医疗保险
          $scope.CURRENTINSURANCE = "城镇基本医疗保险"
          break;
        case "UrbanResidentsMedicalInsuranceData": // 城镇居民医疗保险
          $scope.CURRENTINSURANCE = "城镇居民医疗保险"
          break;
        case "EmploymentInjuryInsuranceData": // 工伤保险
          $scope.PARTICAPTEDUNITNEW = "%"
          $scope.CURRENTINSURANCE = "工伤保险"
          break;
        case "MaternityInsuranceData": // 生育保险
          $scope.PARTICAPTEDUNITNEW = "%"
          $scope.CURRENTINSURANCE = "生育保险"
          break;
        case "ResidentsBasicEndowmentInsuranceData": // 居民基本养老保险
          $scope.PARTICAPTEDUNITNEW = "%";
          $scope.CURRENTINSURANCE = "居民基本养老保险"
          break;
      }
      setChartData(tabName)
    }
    
/*******************************************************************************
                            INIT PART
*******************************************************************************/
  var temploc = $location.path().split("/")
  var thisLoc = temploc[temploc.length - 1]
  if (thisLoc == undefined) {
    setTab("UrbanBasicEndowmentInsuranceData")
  } else {
    setTab(thisLoc)
  }

/*******************************************************************************
                HIGHCHARG CONFIGURATION AREA
*******************************************************************************/
  function splineHighChart(height, categories) {
    this.options = {
        colors: generalService.lineColors(),
        chart: {
          type: 'spline',
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
          crosshairs: true,
          shared: true,
          pointFormat: '<b>{point.series.name}</b> {point.y:,.2f}万元<br>'
        },
        plotOptions: {
          spline: {
            marker: {
              radius: 4,
              lineColor: '#666666',
              lineWidth: 1
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
    }
    this.series = []
    this.size = {
      // width: 200,
      height: height
    }
  }

  function columnstackHighChart(height, categories) {
    this.options = {
      colors: generalService.columnColors(),
      chart: {
        type: 'column',
      },
      credits: {
        enabled: false
      },
      title: {
        text: ""
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
            return this.value
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
              $scope.$apply(clickEventOfEngageStackColumn(thisLoc, query_year))
            }
          }
        }
      },
    }
    this.series = []
    this.size = {
      // width: 200,
      height: height
    }
  }

  function columnHighChart(height) {
    this.options = {
      colors: generalService.columnColors().slice(0,3),
      chart: {
        type: 'column',
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
            return this.value
          }
        }
      },
      legend: {
        enabled: true,
        align: 'right',
        x: 0,
        verticalAlign: 'top',
        y: 20,
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
              return Number(this.y / 10000).toFixed(2)
            }
          }
        }
      }
    }
    this.series = []
    this.size = {
      // width: 200,
      height: height
    }
  }

  function pieHighchart() {
    this.options = {
      colors: generalService.pieColors(),
      credits: {
        enabled: false
      },
      chart: {
        type: 'pie',
      },
      title: {
        text: ""
      },
      legend: {
        align: 'right',
        x: 0,
        verticalAlign: 'top',
        y: 20,
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
            enabled: false,
            color: '#000000',
            connectorColor: '#000000',
            format: '{point.percentage:.2f}%'
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
    }]
  }

/*******************************************************************************
                              OBJECT AREA
*******************************************************************************/
  function splineDataObject(name, symbol, size) {
    var temp = new Array(size)
    for (var i=0; i<size; i++) {
      temp[i] = null
    }
    this.data = temp
    this.name = name
    this.marker ={symbol: symbol}
  }

  function splineListObject(size) {
    this.data = [new splineDataObject("收入", "triangle", size), new splineDataObject("支出", "triangle-down", size)]
  }

  function columnDataObject(name) {
    this.data = [null]
    this.name = name
  }

  function listObject(itemList, dataObject) {
    var temp = []
    for (var i=0; i<itemList.length; i++) {
      temp.push(new dataObject(itemList[i]))
    }
    this.data = temp;
  }

  function detailListObject(size, itemList) {
    var temp = new Array()
    for (var i=0; i < size; i++) {
      temp.push(new listObject(itemList, columnDataObject))
    }
    this.data = temp
  }

  function pieDataObject(name) {
    this.name = name
    this.y = null
  }

  }