export default($scope, qService, generalService, dataDetailFactory, $http, $location) => {
  'ngInject';

 const jQueryDOMToDos = () => {
   $(".navbar2return").hide(0); // 隐藏下面的返回按钮
   $(".insurance-return").show(0); // 显示上面的返回按钮
   $(".homepage").hide(0); // 隐藏主页键
   $(".navbar2position").hide(0); // 隐藏下面当前位置
   $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
   $('#showshort').focus(); // 获取默认焦点
   $('.navTopShowInsurance').show(0); //显示社会保险下拉框
  }();

  let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMC0yMSAxMTowMToxNCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI0IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiI1IiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI2IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjciLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjgiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjkiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjExIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMTUiLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxNyIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIyMCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjI1IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifV19LCJleHBpcmVzIjoxNDgwNjU1OTU1OTU4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25Mb2NrZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.PT3kqmzkjZtV98yDr6kvK2gErGk8wsHUq0Krf+GOtGU=";



  $scope.BALANCEUNIT = "万元";
  $scope.PARTICAPTEDUNIT = "人";
  $scope.ALLOPTION = {};
  $scope.ALLDATA = {};
  $scope.isLink = true;
  $scope.isLink1 = true;
  $scope.tab1=true;
  $scope.tab2=false;

  $scope.show1=()=>{
    $scope.tab1 = true;
    $scope.tab2 = false;
    $scope.isToggle=true;
  };
  $scope.show2=()=>{
   $scope.tab1 = false;
   $scope.tab2 = true;
   $scope.isToggle=false;
  };
  $scope.hideLink = () => {
   $scope.isLink = false;
   $scope.isConceal = true;
  };
  $scope.concealDetail = () => {
   $scope.isConceal = false;
   $scope.isLink = true;
  };
  $scope.hideLink1 = () => {
  $scope.isLink1 = false;
  $scope.isConceal1 = true;
  }
  $scope.concealDetail1 = () => {
  $scope.isConceal1 = false;
  $scope.isLink1 = true;
  };
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

      var temploc = $location.path().split("/");
      var thisLoc = temploc[temploc.length - 1];
      if (thisLoc == undefined) {
         setTab("UrbanBasicEndowmentInsuranceData");
        } else {
        setTab(thisLoc);
        }


   function splineHighChart(height, categories) {
      this.options = {
        exporting:{ enabled: false },
        colors: generalService.lineColors(),
        chart: {
          type: 'spline',
        },
        title: {
          text: "",
          style:{
            fontWeight:"bold",
            fontSize:15
          },
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
      height: height
     }
   }


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


     $scope.tabChangeFunction = function(parmeter) {
       $location.path("/InsuranceChart/"+parmeter);
      }

     function setChartData(entityName) {
       qService.httpPost(dataDetailFactory.lastestObject, {tableName: entityName}, {"X-Auth-Token":token},['year']).then(function(lastObjRaw) {
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
         INCOMESPLINE: new splineHighChart(345, yearList),
         BALANCECOLUMN: new columnHighChart(370),
         ENGAGESTACKCOLUMN: new columnstackHighChart(345, yearList),
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

    function getDataAll(entityName, year) {
      var queryMap = {
      year: generalService.advanceQueryObj('bt', 'innt', [(year-4), year]),
      sort1: {
        key: 'year',
        sortType: 'asc'
       }
      };
     var tempData = $scope.ALLDATA[entityName];
     var INSURANCEDATA = qService.httpPost(dataDetailFactory.advancedQuery, { tableName: entityName},  {"X-Auth-Token":token},queryMap);
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
          case "城镇基本养老保险": 
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

    function clickEventOfIncomeSpline(entityName, year) {
      var index = year - $scope.LATESTYEAR + 4;
      // $scope.ALLOPTION.BALANCECOLUMN.options.title.text = "收入支出"
      $scope.ALLOPTION.BALANCECOLUMN.series = $scope.ALLDATA[entityName].BALANCECOLUMNDATALIST.data[index].data;
      $scope.ALLOPTION.BALANCECOLUMN.options.xAxis.categories = [$scope.CURRENTINSURANCE];
      $scope.yearBalance = $scope.ALLDATA[entityName].BALANCEDATA[index];
      $scope.balance = $scope.ALLDATA[entityName].BALANCEDATA[index];
      $scope.balanceSelectYear = year;
      }

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











