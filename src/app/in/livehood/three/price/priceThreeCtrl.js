export default ($scope, qService, generalService, dataDetailFactory, $http, $rootScope, $location) => {
   

    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjQiLCJpZCI6OSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM5OjI4IiwibmFtZSI6IueJqeS7t+WxgCIsImRlc2NyaXB0aW9uIjoiV0pKX+eJqeS7t+WxgCJ9LHsiQGlkIjoiNSIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiNiIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNyIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiI4IiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn0seyJAaWQiOiI5IiwiaWQiOjI1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMzEgMDk6MTI6NDgiLCJuYW1lIjoi57uP5rWO55u45YWz57uEIiwiZGVzY3JpcHRpb24iOiJKSlhHWl/nu4/mtY7nm7jlhbPnu4QifSx7IkBpZCI6IjEwIiwiaWQiOjMwLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6NTEiLCJuYW1lIjoi5Lqk6YCa5bGAIiwiZGVzY3JpcHRpb24iOiJKVEpf5Lqk6YCa5bGAIn0seyJAaWQiOiIxMSIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjEyIiwiaWQiOjI5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDQ6MDIiLCJuYW1lIjoi5pWZ6IKy5bGAIiwiZGVzY3JpcHRpb24iOiJKWUpf5pWZ6IKy5bGAIn0seyJAaWQiOiIxMyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiIxNCIsImlkIjoxMSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjM5IiwibmFtZSI6IuiuoeeUn+WnlCIsImRlc2NyaXB0aW9uIjoiSlNXX+iuoeeUn+WnlCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE2IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjE3IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxOCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTkiLCJpZCI6MzQsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLmsJTosaHlsYAiLCJkZXNjcmlwdGlvbiI6IlFYSl/msJTosaHlsYAifSx7IkBpZCI6IjIwIiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIyMSIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzMsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLlronnm5HlsYAiLCJkZXNjcmlwdGlvbiI6IkFKSl/lronnm5HlsYAifSx7IkBpZCI6IjIzIiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn1dfSwiZXhwaXJlcyI6MTQ3OTg3MzA4MTA3MSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.nXKJ4UHowc3prW9H/CpZ7byCTgrzZJS4ttDSXCthcx0=";
    
    /*******************************************************************************
     VARIABLE AREA
     *******************************************************************************/
    var CURRENT_YEAR;
    var LAST_YEAR;
    var yearMonthList = new Array();
    var monthList = new Array(12);
    var dayList = new Array();

    $scope.currentCategory = "食品类";
    $scope.tabMapData = [{
        id: "tab_CPI",
        label: "居民消费价格指数",
        name: "cpi",
        active: false
    }, {
        id: "tab_DailyPrice",
        label: "农副产品市场价格",
        name: "dailyPrice",
        active: false
    }];

    $scope.tabChangeFunction = function(tab_name) {
        switch (tab_name) {
            case $scope.tabMapData[0].name:
                initCpiTrendHighChart();
                $("#cpi_container").show();
                $("#daily_price_container").hide();
                $scope.current_tab_label = $scope.tabMapData[0].label;
                $scope.tabMapData[0].active = true;
                break;
            case $scope.tabMapData[1].name:
                $scope.initFoodPriceHighChart();
                $("#cpi_container").hide();
                $("#daily_price_container").show();
                $scope.current_tab_label = $scope.tabMapData[1].label;
                $scope.tabMapData[1].active = true;
                break;
        }
    };

    /*******************************************************************************
     HIGHCHART CONFIGURATION AREA
     *******************************************************************************/
    function splineHighChart(height, categories, callFunc) {
        this.options = {
            colors: generalService.lineColors(),
            credits: {
                enabled: false
            },
            chart: {
                type: 'spline',
            },
            title: {
                text: ""
            },
            xAxis: {
                categories: categories,
                labels: {
                    rotation: -45,
                    align: 'right',
                    style: {
              //          color:'white',
                        fontSize: '13px',
                        fontFamily: 'Verdana, sans-serif'
                    }
                },
                tickmarkPlacement: 'on'
            },
            yAxis: {
                title: {
                    text: ""
                },
                labels: {
                    formatter: function() {
                        return this.value;
                    }
                },
                plotLines: [{
                    color: 'red', // 线的颜色，定义为红色
                    dashStyle: 'longdashdot', // 标示线的样式，默认是solid（实线），这里定义为长虚线
                    value: 100, // 定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                    width: 1, // 标示线的宽度，2px
                    label: {
                        text: '参考值',
                        verticalAlign: 'bottom',
                        textAlign: 'right',
                        y: -10,
                        x: 40
                    }
                }]
            },
            tooltip: {
                crosshairs: true,
                shared: true,
                pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>'
            },
            plotOptions: {
                spline: {
                    cursor: 'pointer',
                    marker: {
                        radius: 4,
                        lineColor: '#666666',
                        lineWidth: 1
                    },
                    events: {
                        click: function(event) {
                            var clickYear = new Number(event.point.category.slice(0, 4));
                            var clickMonth = new Number(event.point.category.slice(5, 7));
                            $scope.$apply(callFunc(clickYear.valueOf(), clickMonth.valueOf()));
                        }
                    },
                },
            }
        },
            this.series = [],
            this.size = {
                // width: 200,
                height: height
            };
    }

    function columnHighChart(height, categories, callFunc) {
        this.options = {
            colors: generalService.columnColors().slice(0,2),
            chart: {
                type: 'column',
            },
            title: {
                text: ""
            },
            subtitle: {
                text: "——红线代表参考值"
            },
            xAxis: {
                categories: categories,
                tickmarkPlacement: 'on'
            },
            yAxis: {
                title: {
                    text: ''
                },
                labels: {
                    formatter: function() {
                        return this.value + '';
                    }
                },
                plotLines: [{
                    color: 'red', // 线的颜色，定义为红色
                    dashStyle: 'longdashdot', // 标示线的样式，默认是solid（实线），这里定义为长虚线
                    value: 100.00, // 定义在那个值上显示标示线，这里是在x轴上刻度为3的值处垂直化一条线
                    width: 2, // 标示线的宽度，2px
                }],
                min: 90

            },
            legend: {
                enabled: true,
            },
            tooltip: {
                enabled: true,
                pointFormat: '{series.name}: <b>{point.y:.2f}</b><br/>'
            },
            credits: {
                enabled: false
            },
            plotOptions: {
                column: {
                    cursor: 'pointer',
                    point: {
                        events: {
                            click: function(event) {
                                var category = this.category;
                                if (category.substr(-1) != '类') {

                                } else {
                                    if ($scope.currentCategory != category) {
                                        $scope.currentCategory = category;
                                        $scope.$apply(callFunc(category, $scope.thisMonth));
                                    }
                                }
                            }
                        }
                    }
                },
                series: {
                    dataLabels: {
                        enabled: false,
                        rotation: 270,
                        format: '{y:.2f}%',
                        color: '#000000',
                        align: 'right',
                        x: 4,
                        y: -18,
                        style: {
                            fontSize: '14px',
                            fontFamily: 'Verdana, sans-serif',
                            fontWeight: 'bold'
                        }
                    },
                }
            },
        },
        this.series = [],
        this.size = {
            // width: 200,
            height: height
        };
    }

    function lineHighChart(title, xAxis, step, height) {
        this.options = {
            colors: new Array('#3333CC', '#336633', '#336666', '#336699', '#3366CC', '#339933', '#339966', '#339999', '#3399CC', '#33CC33', '#33CC66', '#33CC99', '#33CCCC', '#663333', '#663366', '#663399', '#6633CC', '#666633', '#666666', '#666699', '#6666CC', '#669933', '#669966', '#669999', '#6699CC', '#66CC33', '#66CC66', '#66CC99', '#66CCCC', '#993333', '#993366', '#993399', '#9933CC', '#996633', '#996666', '#996699', '#9966CC', '#999933', '#999966', '#999999', '#9999CC', '#99CC33', '#99CC66', '#99CC99', '#99CCCC', '#CC3333', '#CC3366', '#CC3399', '#CC33CC', '#CC6633', '#CC6666', '#CC6699', '#CC66CC', '#CC9933', '#CC9966', '#CC9999', '#CC99CC', '#CCCC33', '#CCCC66', '#CCCC99', '#CCCCCC'),
            credits: {
                enabled: false
            },
            title: {
                text: title,
                x: -20 //center
            },
            subtitle: {
                text: "",
                x: -20
            },
            xAxis: {
                categories: xAxis,
                labels: {
                    step: step
                },
                tickmarkPlacement: 'on',
                title: {
                    text: '天'
                },
            },
            yAxis: {
                title: {
                    text: '价格（元/500克）'
                },
            },
            tooltip: {
                valueSuffix: '元/500克'
            },
            legend: {
                enabled: true
            },
            noData: {
                position: {
                    "x": 0,
                    "y": 0,
                    "align": "center",
                    "verticalAlign": "middle"
                },
                style: {
                    "fontSize": "18px",
                    "fontWeight": "bold",
                    "color": "#60606a",
                    "text-indent": "1em"
                }
            }
        },
        this.series = [],
        this.size = {
            // width: 200,
            height: height
        };
    }

    /*******************************************************************************
     HIGHCHART FUNCTION AREA
     *******************************************************************************/
    function callFunctionInCpiTrend(year, month) {
        initCpiTrendDetailHighChart(month);
        initCpiCategoryHighChart(year, month);
        callFunctionInCpiCategory("食品类", month);
    }

    function callFunctionInCpiCategory(name, month) {
        var PIArray, detailArray;
        switch(name) {
            case "食品类":
                PIArray = $scope.CPIDATA.FPIList;
                detailArray = $scope.CPIDATA.FPIDetailList;
                break;
            case "烟酒及用品类":
                PIArray = $scope.CPIDATA.TLPIList;
                detailArray = $scope.CPIDATA.TLPIDetailList;
                break;
            case "衣着类":
                PIArray = $scope.CPIDATA.UPIList;
                detailArray = $scope.CPIDATA.UPIDetailList;
                break;
            case "家庭设备用品及维修服务类":
                PIArray = $scope.CPIDATA.HAPIList;
                detailArray = $scope.CPIDATA.HAPIDetailList;
                break;
            case "医疗保健和个人用品类":
                PIArray = $scope.CPIDATA.MPIList;
                detailArray = $scope.CPIDATA.MPIDetailList;
                break;
            case "交通和通讯类":
                PIArray = $scope.CPIDATA.TPIList;
                detailArray = $scope.CPIDATA.TPIDetailList;
                break;
            case "娱乐教育文化用品及服务类":
                PIArray = $scope.CPIDATA.EPIList;
                detailArray = $scope.CPIDATA.EPIDetailList;
                break;
            case "居住类":
                PIArray = $scope.CPIDATA.RPIList;
                detailArray = $scope.CPIDATA.RPIDetailList;
                break;
        }
        initCpiCategoryTrendHighChart(PIArray);
        initCpiCategoryTrendDetailHighChart(month, detailArray);
    }

    function callFunctionInCategoryTrend(year, month) {
        initCpiCategoryTrendDetailHighChart(month, $scope.CPIDATA.FPIDetailList);
    }

    /*******************************************************************************
     FUNCTION AREA
     *******************************************************************************/
    function getCPIDataAll() {
        var queryMap = {
            year: generalService.advanceQueryObj('bt', 'innt', [LAST_YEAR, CURRENT_YEAR]),
            sort1: {
                key: 'year',
                sortType: 'asc'
            },
            sort2: {
                key: 'month',
                sortType: 'asc'
            },
            sort3: {
                key: 'cpiType',
                sortType: 'asc'
            }
        };

        var CPIDATAPOST = qService.httpPost(dataDetailFactory.advancedQuery, {
            tableName: 'CPIData'
        },{"X-Auth-Token":token}, queryMap);
        CPIDATAPOST.then(function(data) {
            if (data.errorCode != "NO_ERROR") {
                $location.path("/main");
            }
            var dataList = data.data;
            var PIArray, detailArray,currentObj, detailIndex, currentCpi, accumulatedCpi, monthIndex;
            for (var i=0; i < dataList.length; i++) {
                currentObj = dataList[i];
                monthIndex = currentObj.month - 1;
                detailIndex = (currentObj.year - LAST_YEAR)*12 + monthIndex;
                currentCpi = currentObj.currentCpi;
                accumulatedCpi = currentObj.accumulatedCpi;
                if (currentObj.cpiType.name != "居民消费价格指数") {
                    if (detailIndex == 0) { // 8 表示八大类消费价格指数
                        $scope.CPIDATA.columnXAxis.push(currentObj.cpiName);
                    }
                    $scope.CPIDATA.DetailList.data[detailIndex].data[0].data.push(currentCpi);
                    $scope.CPIDATA.DetailList.data[detailIndex].data[1].data.push(accumulatedCpi);
                }
                switch(currentObj.cpiType.name) {
                    case "居民消费价格指数":
                        PIArray = $scope.CPIDATA.CPIList;
                        detailArray = $scope.CPIDATA.CPIDetailList;
                        break;
                    case "食品类":
                        PIArray = $scope.CPIDATA.FPIList;
                        detailArray = $scope.CPIDATA.FPIDetailList;
                        break;
                    case "烟酒及用品类":
                        PIArray = $scope.CPIDATA.TLPIList;
                        detailArray = $scope.CPIDATA.TLPIDetailList;
                        break;
                    case "衣着类":
                        PIArray = $scope.CPIDATA.UPIList;
                        detailArray = $scope.CPIDATA.UPIDetailList;
                        break;
                    case "家庭设备用品及维修服务类":
                        PIArray = $scope.CPIDATA.HAPIList;
                        detailArray = $scope.CPIDATA.HAPIDetailList;
                        break;
                    case "医疗保健和个人用品类":
                        PIArray = $scope.CPIDATA.MPIList;
                        detailArray = $scope.CPIDATA.MPIDetailList;
                        break;
                    case "交通和通讯类":
                        PIArray = $scope.CPIDATA.TPIList;
                        detailArray = $scope.CPIDATA.TPIDetailList;
                        break;
                    case "娱乐教育文化用品及服务类":
                        PIArray = $scope.CPIDATA.EPIList;
                        detailArray = $scope.CPIDATA.EPIDetailList;
                        break;
                    case "居住类":
                        PIArray = $scope.CPIDATA.RPIList;
                        detailArray = $scope.CPIDATA.RPIDetailList;
                        break;
                }
                PIArray.data[0].data.push(currentCpi);
                PIArray.data[1].data.push(accumulatedCpi);
                detailArray.data[monthIndex].data[0].data.push(currentCpi);
                detailArray.data[monthIndex].data[1].data.push(accumulatedCpi);
            }

            $scope.tabChangeFunction($scope.tabMapData[0].name);
        });
    }

    function initCpiTrendHighChart() {
        $scope.cpiHighChartOptions.cpiTrendOption.options.title.text =  LAST_YEAR + "~" + CURRENT_YEAR +"年"+ $scope.CPIDATA.CPIList.name + "趋势";
        $scope.cpiHighChartOptions.cpiTrendOption.series = $scope.CPIDATA.CPIList.data;

        callFunctionInCpiTrend($scope.thisYear, $scope.thisMonth);
    }

    function initCpiCategoryHighChart(year, month) {
        $scope.cpiDataList = $scope.CPIDATA.DetailList.data[(year - LAST_YEAR)*12 + (month - 1)].data;
        $scope.cpiHighChartOptions.categoryDetailOption.options.title.text = year + "年" + month + "月" + "各类别CPI同比累计比";
        $scope.cpiHighChartOptions.categoryDetailOption.series = $scope.cpiDataList;
    }

    function initCpiCategoryTrendHighChart(dataList) {
        $scope.cpiHighChartOptions.detailTrendOption.options.title.text =  LAST_YEAR + "~" + CURRENT_YEAR + dataList.name + "CPI趋势";
        $scope.cpiHighChartOptions.detailTrendOption.series = dataList.data;
    }

    function initCpiTrendDetailHighChart(month) {
        $scope.cpiDetailDataList = $scope.CPIDATA.CPIDetailList.data[month - 1].data;
        $scope.cpiDetailHeaderList = $scope.CPIDATA.detailColumnXAxisList[month - 1];
        $scope.cpiDetailIndexList = $scope.cpiDetailHeaderList.length === 1 ? [0] : [0,1];
        $scope.cpiHighChartOptions.cpiTrendDetailOption.options.title.text = "数据对比";
        $scope.cpiHighChartOptions.cpiTrendDetailOption.series = $scope.cpiDetailDataList;
        $scope.cpiHighChartOptions.cpiTrendDetailOption.options.xAxis.categories = $scope.cpiDetailHeaderList;
    }

    function initCpiCategoryTrendDetailHighChart(month, dataList) {
        $scope.detailTrendDataList = dataList.data[month - 1].data;
        $scope.detailTrendHeaderList = $scope.CPIDATA.detailColumnXAxisList[month - 1];
        $scope.detailTrendIndexList = $scope.detailTrendHeaderList.length === 1 ? [0] : [0,1];
        $scope.cpiHighChartOptions.detailTrendDetailOption.options.title.text = "数据对比";
        $scope.cpiHighChartOptions.detailTrendDetailOption.series = $scope.detailTrendDataList;
        $scope.cpiHighChartOptions.detailTrendDetailOption.options.xAxis.categories = $scope.detailTrendHeaderList;
    }

    function getFoodPriceDataAll(year, month, day, dayList) {
        var queryMap = {
            year: generalService.advanceQueryObj('eq', 'innt', [year]),
            month: generalService.advanceQueryObj('eq', 'innt', [month]),
            sort1: {
                key: 'subsidiaryFoodName',
                sortType: 'asc'
            },
            sort2: {
                key: 'day',
                sortType: 'asc'
            }
        };

        var SUBSIDIARYFOODPRICEDATA = qService.httpPost(dataDetailFactory.advancedQuery, {
            tableName: 'SubsidiaryFoodPriceData'
        },{"X-Auth-Token":token}, queryMap);

        SUBSIDIARYFOODPRICEDATA.then(function(data) {
            if (data.errorCode != "NO_ERROR") {
                $location.path("/main");
            }
            var dataList = data.data;
            var dataObject, SFArray, objectIndex, itemName, dataItem;
            for (var i=0; i<dataList.length; i++) {
                dataObject = dataList[i];
                switch(dataObject.subsidiaryFoodTypeName) {
                    case "粮食":
                        SFArray = $scope.PRICEDATA.a_riceDataList;
                        break;
                    case "油脂":
                        SFArray = $scope.PRICEDATA.b_oilDataList;
                        break;
                    case "肉禽及制品":
                        SFArray = $scope.PRICEDATA.c_meatDataList;
                        break;
                    case "蛋":
                        SFArray = $scope.PRICEDATA.d_eggDataList;
                        break;
                    case "水产品":
                        SFArray = $scope.PRICEDATA.e_aquaticProductDataList;
                        break;
                    case "蔬菜":
                        SFArray = $scope.PRICEDATA.f_vegetableDataList;
                        break;
                    case "干鲜瓜果":
                        SFArray = $scope.PRICEDATA.g_fruitDataList;
                        break;
                    case "其他":
                        SFArray = $scope.PRICEDATA.h_othersDataList;
                        break;
                }
                itemName = dataObject.subsidiaryFoodName;
                objectIndex = SFArray.nameList.indexOf(itemName);
                if (objectIndex === -1) {
                    dataItem = new subsidiaryFoodDataObject(itemName, day);
                    SFArray.nameList.push(itemName);
                    SFArray.data.push(dataItem);
                } else {
                    dataItem = SFArray.data[objectIndex];
                }
                dataItem.data[dayList.indexOf(pad(dataObject.day, 2))] = dataObject.price;
            }
        });
    }

    $scope.initFoodPriceHighChart = function() {
        resetPRICEDATA();

        $scope.PRICEDATA.a_riceDataList.isCollapsed = true;
        $scope.PRICEDATA.a_riceDataList.data[0].model = true;
        $scope.foodPriceHighChartOption.series=[];
        $scope.foodPriceHighChartOption.series.push($scope.PRICEDATA.a_riceDataList.data[0]);
    };

    $scope.checkBoxChange = function(item) {
        if (item.model) { // 选中的情况
            $scope.foodPriceHighChartOption.series.push(item);
        } else { // 取消选中的情况
            var index = $scope.foodPriceHighChartOption.series.indexOf(item);
            if (index > -1) {
                $scope.foodPriceHighChartOption.series.splice(index, 1);
            }
            var chart=$("#foodPriceHighChart").highcharts();
            if (chart.hasData()) {
                chart.hideNoData();
                chart.showNoData("未选中任何农副食品种类<br/>");
            }
        }
    };

    function resetPRICEDATA() {
        var tempFoodType;
        for (tempFoodType in $scope.PRICEDATA) {
            $scope.PRICEDATA[tempFoodType].isCollapsed = false;
            for (var i=0; i < $scope.PRICEDATA[tempFoodType].data.length; i++) {
                $scope.PRICEDATA[tempFoodType].data[i].model = false;
            }
        }
    }
    /*******************************************************************************
     OBJECT AREA
     *******************************************************************************/
    function columnDataObject(name) {
        this.data = new Array();
        this.name = name;
    }

    function splineDataObject(name, symbol) {
        this.data = new Array();
        this.name = name;
        this.marker ={symbol: symbol};
    }

    function splineListObject(name) {
        this.name = name;
        this.data = [new splineDataObject("同比", "square"), new splineDataObject("累计比", "diamond")];
    }

    function columnListObject() {
        this.data = [new columnDataObject("同比"), new columnDataObject("累计比")];
    }

    function detailListObject(num) {
        var temp = new Array();
        for (var i=0; i < 12 + num; i++) {
            temp.push(new columnListObject());
        }
        this.data = temp;
    }

    function subsidiaryFoodGroupObject(name) {
        this.name = name;
        this.nameList = new Array();
        this.data = new Array();
        this.isCollapsed = false;
    }

    function subsidiaryFoodDataObject(name, len) {
        this.name = name;
        this.model = false;
        var arr = new Array(len);
        for (var i=0; i<len; i++) {
            arr[i] = null;
        }
        this.data = arr;
    }

    /*******************************************************************************
     UTIL FUNCTION AREA
     *******************************************************************************/
    function pad(num, size) {
        var s = num+"";
        while (s.length < size) s = "0" + s;
        return s;
    }

    /*******************************************************************************
     INIT PART
     *******************************************************************************/
   $http.post("http://10.60.36.96:8080/api/data/CPIData/lastestObject", ["year","month"],{ headers: {'x-auth-token':token}}).success(function(lastObjRaw)
    {
        if (lastObjRaw.errorCode != "NO_ERROR") {
            $location.path("/main");
        }
        var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
        CURRENT_YEAR = latestObj.year;
        LAST_YEAR = CURRENT_YEAR - 1;

        $scope.thisYear = CURRENT_YEAR;
        $scope.thisMonth = latestObj.month;

        for (var i = 1; i <= 12; i++) {
            var item = LAST_YEAR + "." + pad(i, 2) + "";
            yearMonthList.push(item);
            monthList[i-1] = new Array();
            monthList[i-1].push(item);
        }
        for (var i = 1; i <= $scope.thisMonth; i++) {
            var item = CURRENT_YEAR + "." + pad(i, 2) + "";
            yearMonthList.push(item);
            monthList[i-1].push(item);
        }

        $scope.CPIDATA = {
            splineXAxis: yearMonthList,
            columnXAxis: new Array(),
            detailColumnXAxisList: monthList,
            CPIList: new splineListObject("居民消费价格指数"),
            FPIList: new splineListObject("食品类"),
            TLPIList: new splineListObject("烟酒及用品类"),
            UPIList: new splineListObject("衣着类"),
            HAPIList: new splineListObject("家庭设备用品及维修服务类"),
            MPIList: new splineListObject("医疗保健和个人用品类"),
            TPIList: new splineListObject("交通和通讯类"),
            EPIList: new splineListObject("娱乐教育文化用品及服务类"),
            RPIList: new splineListObject("居住类"),
            CPIDetailList: new detailListObject(0),
            FPIDetailList: new detailListObject(0),
            TLPIDetailList: new detailListObject(0),
            UPIDetailList: new detailListObject(0),
            HAPIDetailList: new detailListObject(0),
            MPIDetailList: new detailListObject(0),
            TPIDetailList: new detailListObject(0),
            EPIDetailList: new detailListObject(0),
            RPIDetailList: new detailListObject(0),
            DetailList: new detailListObject($scope.thisMonth)
        };

        $scope.cpiHighChartOptions = {
            cpiTrendOption: new splineHighChart(480, $scope.CPIDATA.splineXAxis, callFunctionInCpiTrend),
            cpiTrendDetailOption: new columnHighChart(250),
            categoryDetailOption: new columnHighChart(500, $scope.CPIDATA.columnXAxis, callFunctionInCpiCategory),
            detailTrendOption: new splineHighChart(480, $scope.CPIDATA.splineXAxis, callFunctionInCategoryTrend),
            detailTrendDetailOption: new columnHighChart(250)
        };

        getCPIDataAll();
    });

    $http.post("http://10.60.36.96:8080/api/data/SubsidiaryFoodPriceData/lastestObject", ["year","month"],{ headers: {'x-auth-token':token}}).success(function(lastObjRaw){
        if (lastObjRaw.errorCode != "NO_ERROR") {
            $location.path("/main");
        }
        var latestObj = JSOG.parse(JSOG.stringify(lastObjRaw.data));
        var year = latestObj.year;
        var month = latestObj.month;
        var day = latestObj.day;

        for (var i=1, monthDate = new Date(year, month-1, 1); i<= day; i++, monthDate.setDate(monthDate.getDate() + 1)) {
            if (monthDate.getDay()%6!=0) {
                dayList.push(pad(i, 2));
            }
        }
        var step = Math.floor(day / 7);
        if (step % 2 == 0) {
            step += 1;
        }
        var chartTile = year + "年" + month + "月中心农贸市场农副产品价格走势";
        $scope.foodPriceHighChartOption = new lineHighChart(chartTile, dayList, step, 450);
        $scope.PRICEDATA = {
            a_riceDataList: new subsidiaryFoodGroupObject("粮食类"),              // 粮食       2650
            b_oilDataList: new subsidiaryFoodGroupObject("油脂类"),              // 油脂       2651
            c_meatDataList: new subsidiaryFoodGroupObject("肉禽及制品类"),        // 肉禽及制品  2652
            d_eggDataList: new subsidiaryFoodGroupObject("蛋类"),                // 蛋        2653
            e_aquaticProductDataList: new subsidiaryFoodGroupObject("水产品类"), // 水产品     2654
            f_vegetableDataList: new subsidiaryFoodGroupObject("蔬菜类"),        // 蔬菜       2655
            g_fruitDataList: new subsidiaryFoodGroupObject("干鲜瓜果类"),         // 干鲜瓜果    2656
            h_othersDataList: new subsidiaryFoodGroupObject("其他"),             // 其他       2657
        };

        getFoodPriceDataAll(year, month, day, dayList);
    });

};
