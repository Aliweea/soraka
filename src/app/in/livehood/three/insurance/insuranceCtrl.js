export default ($scope, $rootScope, qService, generalService, dataDetailFactory, $http, $location) => {
    'ngInject';
    //$rootScope.loading = true;
    const jQueryDOMToDos = () => {
        $(".navbar2return").hide(0); // 隐藏下面的返回按钮
        $(".insurance-return").show(0); // 显示上面的返回按钮
        $(".homepage").hide(0); // 隐藏主页键
        $(".navbar2position").hide(0); // 隐藏下面当前位置
        $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('#showshort').focus(); // 获取默认焦点
        $('.navTopShowInsurance').show(0); //显示社会保险下拉框
        $(".insurance2detail").hide(0);
        $('#cmRefuseTownTooglePanel').hide(0);
        $('#chooseAge').click(() => {
            $('#chooseAgePanel').toggle(0);
        })
    }();

    $scope.divice = {
        width: $(window).width(),
        height: $(window).height(),
        d_width: $(document).width(),
        d_height: $(document).height()
    };

    $scope.insuranceSwitch = (choices) => {
        switch(choices) {
            case 'income':
                $scope.choice = true;
                $scope.tab1 = true;
                $scope.tab2 = false;
                break;
            case 'people':
                $scope.choice = false;
                $scope.tab1 = false;
                $scope.tab2 = true;
                break;
        }
    };
    $scope.insuranceSwitch('income');

    $scope.BALANCEUNIT = "万元"

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
    }];

    $scope.tabChangeFunction = function(parmeter) {
      $location.path("/InsuranceChart/"+parmeter)
    }

    function setTab(tabName) {
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
                $scope.ENGAGE = 1
                break;
            case "UnemploymentInsuranceData": // 失业保险
                $scope.CURRENTINSURANCE = "失业保险"
                $scope.PARTICAPTEDNAME = "失业金领取人员"
                $scope.ENGAGE = 2
                break;
            case "UrbanBasicMedicalInsuranceData": // 城镇基本医疗保险
                $scope.CURRENTINSURANCE = "城镇基本医疗保险"
                $scope.ENGAGE = 3
                break;
            case "UrbanResidentsMedicalInsuranceData": // 城镇居民医疗保险
                $scope.CURRENTINSURANCE = "城镇居民医疗保险"
                $scope.ENGAGE = 4
                break;
            case "EmploymentInjuryInsuranceData": // 工伤保险
                $scope.PARTICAPTEDUNITNEW = "%"
                $scope.CURRENTINSURANCE = "工伤保险"
                $scope.PARTICAPTEDNAME = "申报人数"
                $scope.ENGAGE = 5
                break;
            case "MaternityInsuranceData": // 生育保险
                $scope.PARTICAPTEDUNITNEW = "%"
                $scope.CURRENTINSURANCE = "生育保险"
                $scope.ENGAGE = 6
                break;
            case "ResidentsBasicEndowmentInsuranceData": // 居民基本养老保险
                $scope.PARTICAPTEDUNITNEW = "%";
                $scope.CURRENTINSURANCE = "居民基本养老保险"
                $scope.ENGAGE = 7
                break;
        }
        initData(tabName)
    };

    var temploc = $location.path().split("/");
    var thisLoc = temploc[temploc.length - 1];
    if (thisLoc == undefined) {
        setTab("UrbanBasicEndowmentInsuranceData");
    } else {
        setTab(thisLoc);
    }

    function initData(tabName) {
      qService.httpPostWithToken(dataDetailFactory.lastestObject, {tableName: tabName
        }, {}, ['year', 'month']).then(function(result) {
          if (result.errorCode != 'NO_ERROR') {
            $location.path("/main");
          }

          $scope.lastestObject = result.data;

          console.log($scope.lastestObject);

          var queryMap = {
            year: generalService.advanceQueryObj('eq', 'innt', [$scope.lastestObject.year]),
            sort: {
              key: 'month',
              sortType: 'asc'
            }
          };

          qService.httpPostWithToken(dataDetailFactory.advancedQuery, {
            tableName: tabName}, {}, queryMap).then(function(rc) {
            if (result.errorCode != 'NO_ERROR') {
              $location.path("/main");
            }
            console.log(rc.data);

            $scope.allObject = [];
            for(var i = 0; i < rc.data.length; i++) {
              var obj = rc.data[i];
              $scope.allObject.push(obj);
            }

            var categories = [];
            for(var i = 0; i < $scope.allObject.length; i++) {
              var data = $scope.allObject[i];
              categories.push(data.year + '-' + data.month);
            }

            $scope.ALLOPTION = {
              INCOMESPLINE: new incomeHighChart(categories),
              //BALANCECOLUMN: new balanceHighChart(),
              ENGAGESTACKCOLUMN: new engageHighChart(categories)
              //ENGAGEPIE: new engageRateHighChart()
            };

            setChartData(tabName, $scope.allObject);

          });
        });
    };

    function setChartData(tabName, allObject) {
      $scope.incomeSeries = [];
      $scope.engageSeries = [];

      switch (tabName) {
        case 'UrbanBasicEndowmentInsuranceData':
          getSeries("income", "收入", "column", "万元", $scope.incomeSeries);
          getSeries("outcome", "支出", "column", "万元", $scope.incomeSeries);
          getSeries("balance", "结余", "column", "万元", $scope.incomeSeries);
          getSeries("lastBalance", "累计结余", "column", "万元", $scope.incomeSeries);

          getSeries("employeesParticipatedPopulation", "城镇基本养老保险在职职工参保人数", "column", "人", $scope.engageSeries);
          getSeries("retireeParticipatedPopulation", "城镇基本养老保险离退人员参保人数", "column", "人", $scope.engageSeries);
          getSeries("newRetiree", "新增离退人员", "column", "人", $scope.engageSeries);
          getSeries("participatedPopulation", "参保人数", "column", "人", $scope.engageSeries);
        break;
        case 'UnemploymentInsuranceData':
          getSeries("income", "收入", "column", "万元", $scope.incomeSeries);
          getSeries("outcome", "支出", "column", "万元", $scope.incomeSeries);
          getSeries("balance", "结余", "column", "万元", $scope.incomeSeries);
          getSeries("lastBalance", "累计结余", "column", "万元", $scope.incomeSeries);

          getSeries("benefitedPopulation", "失业金领取人数", "column", "人", $scope.engageSeries);
          getSeries("newBenefitedPopulation", "新增失业金领取人数", "column", "人", $scope.engageSeries);
        break;
        case 'UrbanBasicMedicalInsuranceData':
          getSeries("income", "收入", "column", "万元", $scope.incomeSeries);
          getSeries("localOutcome", "本地支出", "column", "万元", $scope.incomeSeries);
          getSeries("nonlocalOutcome", "外地支出", "column", "万元", $scope.incomeSeries);
          getSeries("balance", "结余", "column", "万元", $scope.incomeSeries);
          getSeries("lastBalance", "累计结余", "column", "万元", $scope.incomeSeries);
          console.log($scope.incomeSeries);

          getSeries("participatedPopulation", "参保人数", "column", "人", $scope.engageSeries);
        break;
        case 'UrbanResidentsMedicalInsuranceData':
          getSeries("income", "收入", "column", "万元", $scope.incomeSeries);
          getSeries("localOutcome", "本地支出", "column", "万元", $scope.incomeSeries);
          console.log($scope.incomeSeries);

          getSeries("participatedPopulation", "参保人数", "column", "人", $scope.engageSeries);
        break;
        case 'EmploymentInjuryInsuranceData':
          getSeries("income", "收入", "column", "万元", $scope.incomeSeries);
          getSeries("outcome", "支出", "column", "万元", $scope.incomeSeries);
          getSeries("balance", "结余", "column", "万元", $scope.incomeSeries);
          getSeries("lastBalance", "累计结余", "column", "万元", $scope.incomeSeries);

          getSeries("participatedPopulation", "参保人数", "column", "人", $scope.engageSeries);
          getSeries("oneToFourDeclarationPopulation", "一级至四级工伤待遇申报人数", "column", "人", $scope.engageSeries);
          getSeries("fiveToTenDeclarationPopulation", "五级至十级工伤待遇申报人数", "column", "人", $scope.engageSeries);
          getSeries("deathDeclarationPopulation", "工伤死亡待遇申报人数", "column", "人", $scope.engageSeries);
        break;
        case 'MaternityInsuranceData':
          getSeries("income", "收入", "column", "万元", $scope.incomeSeries);
          getSeries("outcome", "支出", "column", "万元", $scope.incomeSeries);
          getSeries("balance", "结余", "column", "万元", $scope.incomeSeries);
          getSeries("lastBalance", "累计结余", "column", "万元", $scope.incomeSeries);

          getSeries("participatedPopulation", "参保人数", "column", "人", $scope.engageSeries);
          getSeries("declarationPopulation", "申报人数", "column", "人", $scope.engageSeries);
        break;
        case 'ResidentsBasicEndowmentInsuranceData':
          var incomeSequence = ["income", "outcome", "balance", "lastBalance"];
          var is_ch = ["收入", "支出", "结余", "累计结余"];
          var incomeRatioSequence = ["incomeYearIncreaseRatio", "incomeMonthIncreaseRatio", "outcomeYearIncreaseRatio", "outcomeMonthIncreaseRatio"];
          var irs_ch = ["收入同比增长", "收入环比增长", "支出同比增长", "支出环比增长"];
          var engageSequence = ["participatedPopulation"];
          var e_ch = ["参保人数"];

          getSeries("income", "收入", "column", "万元", $scope.incomeSeries);
          getSeries("outcome", "支出", "column", "万元", $scope.incomeSeries);
          getSeries("balance", "结余", "column", "万元", $scope.incomeSeries);
          getSeries("lastBalance", "累计结余", "column", "万元", $scope.incomeSeries);
          //console.log($scope.incomeSeries);
          getSeries("participatedPopulation", "参保人数", "column", "人", $scope.engageSeries);
          //console.log($scope.engageSeries);
        break;
      }

      console.log($scope.incomeSeries);
      $scope.ALLOPTION.INCOMESPLINE.options.title.text = "太仓市" + $scope.lastestObject.year + "年" + $scope.CURRENTINSURANCE + "收支情况";
      $scope.ALLOPTION.INCOMESPLINE.series = $scope.incomeSeries;

      $scope.chartSuffix =  "参保人员";
      if ($scope.CURRENTINSURANCE === "失业保险") {
        $scope.chartSuffix = "失业金领取人员";
      }
      console.log($scope.engageSeries);
      $scope.ALLOPTION.ENGAGESTACKCOLUMN.options.title.text = "太仓市" + $scope.lastestObject.year + "年" + $scope.CURRENTINSURANCE + $scope.chartSuffix + "情况";
      $scope.ALLOPTION.ENGAGESTACKCOLUMN.series = $scope.engageSeries;
    }

    function getSeries(sequence, namelist, type, suffix, datalist) {
        var series = {
          name: "",
          type: "",
          data: [],
          yAxis: 0,
          tooltip: {
            valueSuffix: ""
          }
        };

        series.name = namelist;
        series.type = type;
        series.tooltip.valueSuffix = suffix;
        series.data = [];
        for(var j = 0; j < $scope.allObject.length; j++) {
          var temp = $scope.allObject[j][sequence];
          series.data.push(temp);
        }
        datalist.push(series);
    }

    function columnColors() {
      return ['#7CADDF', '#327EBD', '#195489', '#515151', '#383838'];
    }

    function incomeHighChart(categories) {
      this.options = {
        colors: columnColors(),
        chart: {
          type: 'column',
        },
        title: {
          text: ""
        },
        subtitile: {
          text: ""
        },
        credits: {
          enabled: false
        },
        xAxis: {
          labels: {
            rotation: -45,
            align: 'right'
          },
          title: {
            text: '月份'
          },
          categories: categories,
          tickmarkPlacement: 'on'
        },
        yAxis: [{
          title: {
            text: '单位：万元'
          },
          min: 0,
          plotLines: [{
            value: 0,
            color: '#808080'
          }]
        }
        ],
        tooltip: {
          crosshairs: true,
          shared: true,
          pointFormat: '<b>{point.series.name}</b> {point.y:,.2f}万元<br>'
        },
        loading: false
      };
    }

    function engageHighChart(categories) {
      this.options = {
        colors: columnColors(),
        chart: {
          type: 'column',
        },
        title: {
          text: ""
        },
        subtitile: {
          text: ""
        },
        credits: {
          enabled: false
        },
        xAxis: {
          labels: {
            rotation: -45,
            align: 'right'
          },
          title: {
            text: '月份'
          },
          categories: categories,
          tickmarkPlacement: 'on'
        },
        yAxis: {
          min: 0,
          title: {
            text: '单位：人'
          },
          plotLines: [{
            value: 0,
            color: '#808080'
          }]
        },
        loading: false
      };
    }

}
/**
export default ($scope, $rootScope, qService, generalService, dataDetailFactory, $http, $location) => {
    'ngInject';
    $rootScope.loading = true;
    const jQueryDOMToDos = () => {
        $(".navbar2return").hide(0); // 隐藏下面的返回按钮
        $(".insurance-return").show(0); // 显示上面的返回按钮
        $(".homepage").hide(0); // 隐藏主页键
        $(".navbar2position").hide(0); // 隐藏下面当前位置
        $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('#showshort').focus(); // 获取默认焦点
        $('.navTopShowInsurance').show(0); //显示社会保险下拉框
        $(".insurance2detail").hide(0);
    }();
    $scope.BALANCEUNIT = "万元";
    $scope.PARTICAPTEDUNIT = "人";
    $scope.ALLOPTION = {};
    $scope.ALLDATA = {};
    $scope.isLink = true;
    $scope.isLink1 = true;
    $scope.tab1 = true;
    $scope.tab2 = false;
    $scope.isToggle = true;
    $scope.show1 = () => {
        $scope.tab1 = true;
        $scope.tab2 = false;
        $scope.isToggle = true;
    };
    $scope.show2 = () => {
        $scope.tab1 = false;
        $scope.tab2 = true;
        $scope.isToggle = false;
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
            if ($scope.tabMap[i].active == true && $scope.tabMap[i].name != tabName) {
                $scope.tabMap[i].active = false;
            } else if ($scope.tabMap[i].name == tabName) {
                $scope.tabMap[i].active = true;
            }
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
            exporting: {
                enabled: false
            },
            colors: generalService.lineColors(),
            chart: {
                type: 'spline',
            },
            title: {
                text: "",
                style: {
                    fontWeight: "bold",
                    fontSize: 15
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
                style: {
                    fontWeight: "bold",
                    fontSize: 15
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
            colors: generalService.columnColors().slice(0, 3),
            chart: {
                type: 'column',
            },
            title: {
                text: "",
                style: {
                    fontWeight: "bold",
                    fontSize: 15
                }
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
                text: "111"
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
        for (var i = 0; i < size; i++) {
            temp[i] = null;
        }
        this.data = temp;
        this.name = name;
        this.marker = {
            symbol: symbol
        };
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
        for (var i = 0; i < itemList.length; i++) {
            temp.push(new dataObject(itemList[i]));
        }
        this.data = temp;
    }

    function detailListObject(size, itemList) {
        var temp = new Array();
        for (var i = 0; i < size; i++) {
            temp.push(new listObject(itemList, columnDataObject));
        }
        this.data = temp;
    }

    function pieDataObject(name) {
        this.name = name;
        this.y = null;
    }
    $scope.tabChangeFunction = function(parmeter) {
        $location.path("/InsuranceChart/" + parmeter);
    }

    function setChartData(entityName) {
        qService.httpPostWithToken(dataDetailFactory.lastestObject, {
            tableName: entityName
        }, {}, ['year']).then(function(lastObjRaw) {
            if (lastObjRaw.errorCode != "NO_ERROR") {
                $location.path("/main");
            }
            var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
            $scope.LATESTYEAR = latestObj.year;
            var yearList = new Array();
            for (var i = $scope.LATESTYEAR - 4; i <= $scope.LATESTYEAR; i++) {
                yearList.push(i + "年");
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
        }).finally(() => {
            $rootScope.loading = false;
        });
    }

    function getDataAll(entityName, year) {
        var queryMap = {
            year: generalService.advanceQueryObj('bt', 'innt', [(year - 4), year]),
            sort1: {
                key: 'year',
                sortType: 'asc'
            }
        };
        var tempData = $scope.ALLDATA[entityName];
        var INSURANCEDATA = qService.httpPostWithToken(dataDetailFactory.advancedQuery, {
            tableName: entityName
        }, {}, queryMap);
        INSURANCEDATA.then(function(data) {
            if (data.errorCode != "NO_ERROR") {
                $location.path("/main");
            };
            var dataList = data.data;
            var currentObj, tempYear, income, outcome, lastBalance, tempIndex, tempBalance, columnNameList, lastYear, tempColumn, tempPie, lastYearDetailData, curYearDetailData, incORdecString, pieNameList
            for (var i = 0; i < dataList.length; i++) {
                currentObj = dataList[i];
                tempYear = currentObj.year;
                lastYear = tempYear - 1;
                tempIndex = 4 - (year - tempYear);
                income = currentObj.income;
                outcome = currentObj.outcome;
                tempBalance = income - outcome;
                lastBalance = currentObj.lastBalance;
                tempData.BALANCEDATA[tempIndex] = [income, outcome, tempBalance, lastBalance];
                tempData.INCOMESPLINEDATA.data[0].data[tempIndex] = income;
                tempData.INCOMESPLINEDATA.data[1].data[tempIndex] = outcome;
                tempData.BALANCECOLUMNDATALIST.data[tempIndex].data[0].data[0] = income;
                tempData.BALANCECOLUMNDATALIST.data[tempIndex].data[1].data[0] = outcome;
                tempData.BALANCECOLUMNDATALIST.data[tempIndex].data[2].data[0] = tempBalance;
                columnNameList = ["参保人员"];
                tempColumn = [];
                tempPie = [];
                var tempDetail;
                var detailNameList;
                tempColumn = [currentObj.participatedPopulation];
                switch ($scope.CURRENTINSURANCE) {
                    case "城镇基本养老保险":
                        columnNameList = ["在职职工", "离退人员"];
                        detailNameList = [(tempYear % 1000) + "年在职职工参保人数", (tempYear % 1000) + "年离退人员参保人数", (tempYear % 1000) + "年总参保人数"];
                        tempColumn = [currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation - currentObj.employeesParticipatedPopulation];
                        tempDetail = [currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation - currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation];
                        tempPie = [currentObj.employeesParticipatedPopulation, currentObj.participatedPopulation - currentObj.employeesParticipatedPopulation];
                        pieNameList = ["在职职工", "离退人员"];
                        break;
                    case "失业保险": // 失业保险
                        curYearDetailData = currentObj.benefitedPopulation;
                        incORdecString = "新增";
                        pieNameList = [lastYear + "年在职参保人数", tempYear + "年" + incORdecString + "在职参保人数"];
                        if (i === 0) {
                            lastYearDetailData = 0;
                            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData - curYearDetailData)];
                        } else {
                            lastYearDetailData = dataList[i - 1].benefitedPopulation;
                            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData - curYearDetailData)];
                            if (lastYearDetailData > curYearDetailData) {
                                incORdecString = "减少";
                                tempPie = [curYearDetailData, Math.abs(lastYearDetailData - curYearDetailData)];
                            }
                        }
                        columnNameList = ["失业金领取人员"];
                        detailNameList = [(lastYear % 1000) + "年失业金领取人数", (tempYear % 1000) + "年" + incORdecString + "失业金领取人数", (tempYear % 1000) + "年失业金领取人数"];
                        tempColumn = [curYearDetailData];
                        tempDetail = [lastYearDetailData, Math.abs(lastYearDetailData - curYearDetailData), curYearDetailData];
                        break;
                    case "城镇基本医疗保险": // 城镇基本医疗保险
                    case "城镇居民医疗保险": // 城镇居民医疗保险
                        curYearDetailData = currentObj.participatedPopulation;
                        incORdecString = "新增";
                        pieNameList = [lastYear + "年在职参保人数", tempYear + "年" + incORdecString + "在职参保人数"];
                        if (i === 0) {
                            lastYearDetailData = 0;
                            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData - curYearDetailData)];
                        } else {
                            lastYearDetailData = dataList[i - 1].participatedPopulation;
                            tempPie = [lastYearDetailData, Math.abs(lastYearDetailData - curYearDetailData)];
                            if (lastYearDetailData > curYearDetailData) {
                                incORdecString = "减少";
                                pieNameList = [tempYear + "年在职参保人数", tempYear + "年" + incORdecString + "在职参保人数"];
                                tempPie = [curYearDetailData, Math.abs(lastYearDetailData - curYearDetailData)];
                            }
                        }
                        tempDetail = [lastYearDetailData, Math.abs(lastYearDetailData - curYearDetailData), curYearDetailData];
                        detailNameList = [(lastYear % 1000) + "年在职参保人数", (tempYear % 1000) + "年" + incORdecString + "在职参保人数", (tempYear % 1000) + "年在职参保人数"];
                        break;
                    case "工伤保险": // 工伤保险
                    case "生育保险": // 生育保险
                    case "居民基本养老保险": // 居民基本养老保险
                        tempDetail = [currentObj.participatedPopulation, currentObj.benefitedPopulation, Number(currentObj.benefitedPopulation * 100 / (currentObj.benefitedPopulation + currentObj.participatedPopulation)).toFixed(2)];
                        detailNameList = [(tempYear % 1000) + "年在职人员参保人数", (tempYear % 1000) + "年享受待遇人员数量", (tempYear % 1000) + "年享受待遇人数占比"];
                        pieNameList = ["在职人员", "享受待遇人员"];
                        tempPie = [currentObj.participatedPopulation, currentObj.benefitedPopulation];
                        break;
                }
                if (tempData.ENGAGESTACKCOLUMNDATALIST == undefined) {
                    tempData.ENGAGESTACKCOLUMNDATALIST = new listObject(columnNameList, columnDataObject);
                    tempData.yearParticipatedTitle = new Array(5);
                    tempData.insuranceDetailParticipated = new Array(5);
                    tempData.ENGAGEPIELIST = new Array(5);
                    tempData.ENGAGEPIELIST[0] = null;
                }
                tempData.ENGAGEPIELIST[tempIndex] = new listObject(pieNameList, pieDataObject);
                for (var j = 0; j < tempColumn.length; j++) {
                    tempData.ENGAGESTACKCOLUMNDATALIST.data[j].data[tempIndex] = tempColumn[j];
                }
                tempData.yearParticipatedTitle[tempIndex] = detailNameList;
                tempData.insuranceDetailParticipated[tempIndex] = tempDetail;
                for (var j = 0; j < tempPie.length; j++) {
                    tempData.ENGAGEPIELIST[tempIndex].data[j].y = tempPie[j];
                }
            }
            $scope.ALLOPTION.INCOMESPLINE.options.title.text = "太仓市近5年" + $scope.CURRENTINSURANCE + "收支情况";
            $scope.ALLOPTION.INCOMESPLINE.series = $scope.ALLDATA[entityName].INCOMESPLINEDATA.data;
            clickEventOfIncomeSpline(entityName, year)
            $scope.chartSuffix = "参保人员";
            if ($scope.CURRENTINSURANCE === "失业保险") {
                $scope.chartSuffix = "失业金领取人员";
            }
            $scope.ALLOPTION.ENGAGESTACKCOLUMN.options.title.text = "太仓市近5年" + $scope.CURRENTINSURANCE + $scope.chartSuffix + "情况";
            $scope.ALLOPTION.ENGAGESTACKCOLUMN.series = $scope.ALLDATA[entityName].ENGAGESTACKCOLUMNDATALIST.data;
            clickEventOfEngageStackColumn(entityName, year);
        }).finally(() => {
            $rootScope.loading = false;
        });
    }

    function clickEventOfIncomeSpline(entityName, year) {
        var index = year - $scope.LATESTYEAR + 4;
        $scope.ALLOPTION.BALANCECOLUMN.options.title.text = "收入支出情况对比图"
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
**/