export default ($anchorScroll, $location, $rootScope, $scope, $state, dateService, qService, kpiDetailService, dictService) => {
    'ngInject';
    const jQueryDOMToDos = () => {
        $(".navbar2return").show(0); // 显示 返回
        $(".navbar3position").show(0); // 显示 当前三级界面位置

        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
        $(".navTopShowMark").hide(0); // 隐藏 KPI状态KPI分类

        $('#cmRefuseTownTooglePanel').hide(0);
        $('#cmRefuseTownToogleButton').click(() => {
            $('#cmRefuseTownTooglePanel').toggle(0);
        })

        $location.hash('top');//尝试移动锚点
        $anchorScroll();//别忘记注入$location, $anchorScroll
    }();
    
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200');

    $scope.barData = {
        selected: 0,
        jyData: [],
        ybData: [],
        cate: [],
        title: '',
        yText: '处理案件数（起）',
        valueSuffix: '（起）'
    };
    $scope.amountData = {
        thisMonthAmount: 0,
        thisMonthMoney: 0,
        allYearAmount: 0,
        allYearMoney: 0
    };
    var columnChartData = [
        [0, 0],
        [0, 0]
    ];
    var eachMonthData = [
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
    ];

    var eachStationData = {
        categories: [{
            cateData: []
        }, {
            cateData: []
        }, {
            cateData: []
        }, {
            cateData: []
        }],
        data: [
            [],
            [],
            [],
            []
        ]
    };

    var stationInfo = [];



    $scope.lineChartData = {
        selected: '0',
        title: '',
        yText: '受伤人数(人)',
        valueSuffix: '人',
        name: '受伤人数(人)',
        amount: [],
        injury: [],
        dead: [],
        damage: [],
        categories: []
    }


    //---------------------------********系统时间获取*********------------------------------------------
    var dateTime = new Date(dateService.getSystemTime());
    console.log(dateTime);
    //var dateTime = new Date("2014-12-12T14:57:55.091Z");
    $scope.getDate = {
        year: dateTime.getFullYear(),
        month: dateTime.getMonth() + 1
    }
    console.log($scope.getDate.year + "," + $scope.getDate.month);





    //---------------------------*****************------------------------------------------
    var processFunction1 = function(data) {
            //console.log(data.data);
            var obj = data.data;
            if (obj != null) {
                var year_ = obj.year;
                var month_ = obj.month;
                if ($scope.getDate.year > year_) {
                    $scope.getDate.year = year_;
                    $scope.getDate.month = month_;
                } else if ($scope.getDate.year == year_ && $scope.getDate.month > month_) {
                    $scope.getDate.month = month_;
                }

            }

            //---------------------------********api调用参数*********------------------------------------------

            var tableName = 'FireData';

            var advancedQueryConfig = {
                    "year": {
                        "value1": $scope.getDate.year,
                        "queryType": "eq",
                        "valueType": "innt"
                    }
                }
                //---------------------------********处理函数返回data的函数*********----------------------------------

            var processFunction = function(data) {
                console.log(JSON.stringify(data));
                //初始化图表数据

                initChartData(data.data);

                // wireBarChartData();

                //---------------------------********初始化图表数据********------------------------------------------
                function initChartData(data) {
                    if (data == null) {
                        alert('无数据 ！');
                        return;
                    }
                    // else if(columnChartData[0] == 0){
                    //  alert('本月数据未录入 ！');
                    //  return;
                    // }
                    //wireLineChartData();
                    $scope.lineChartData.title = $scope.getDate.month + "月份全市火灾事故受伤人数";

                    wireChartData(data);

                    wireLineChartData();

                };


                //---------------------------********函数定义*********------------------------------------------
                function wireChartData(data) {
                    for (var i = 0; i < data.length; i++) {
                        var month = data[i].month;
                        var type = data[i].type.abbr;
                        eachMonthData[month - 1][type] = eachMonthData[month - 1][type] + data[i].largeAccident + data[i].majorAccident + data[i].moreAccident + data[i].genealAccident;
                        if (month == $scope.getDate.month) {
                            var type_ = data[i].type.abbr;
                            var name = data[i].fireStation.name;
                            eachStationData.categories[type_].cateData.push(name);
                            eachStationData.data[type_].push(data[i].largeAccident + data[i].majorAccident + data[i].moreAccident + data[i].genealAccident);
                        }
                    }
                    $scope.amountData.thisMonthAmount = eachMonthData[$scope.getDate.month - 1][0];
                };

                function wireLineChartData() {
                    for (var i = 0; i < $scope.getDate.month; i++) {
                        $scope.lineChartData.categories.push((i + 1) + '月');
                        $scope.lineChartData.amount.push(eachMonthData[i][0]);
                        $scope.lineChartData.injury.push(eachMonthData[i][1]);
                        $scope.lineChartData.dead.push(eachMonthData[i][2]);
                        $scope.lineChartData.damage.push(eachMonthData[i][3]);
                    }

                    $scope.columnChart = {
                        options: {
                            exporting: {
                                enabled: false
                            },
                            title: {
                                text: $scope.getDate.year + '年火灾事故数趋势图',
                                x: -20 //center
                            },

                            xAxis: {
                                categories: $scope.lineChartData.categories
                            },
                            yAxis: {
                                title: {
                                    text: ''
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }]
                            },
                            tooltip: {
                                valueSuffix: '(起)'
                            },
                            credits: {
                                enabled: false
                            },
                            legend: {
                                layout: 'vertical',
                                align: 'center',
                                verticalAlign: 'bottom',
                                borderWidth: 0
                            }
                        },

                        series: [{
                            name: '火灾事故数',
                            data: $scope.lineChartData.amount
                        }]

                    };
                }

                function getStationName(id) {
                    for (var i = 0; i < stationInfo.length; i++) {
                        if (stationInfo[i].id == id) {
                            return stationInfo[i].name;
                        }
                    }
                }






                $scope.trendInfoChanged = function() {

                    let selected = $scope.lineChartData.selected
                    if (selected == 0) {
                        $scope.columnChart = {
                            options: {
                                exporting: {
                                    enabled: false
                                },
                                title: {
                                    text: $scope.getDate.year + '年火灾事故数趋势图',
                                    x: -20 //center
                                },

                                xAxis: {
                                    categories: $scope.lineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: ''
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '(起)'
                                },
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    borderWidth: 0
                                }
                            },

                            series: [{
                                name:'事故发生数（起）',
                                data: $scope.lineChartData.amount
                            }]

                        };
                    } else if (selected == 1) {
                        $scope.columnChart = {
                            options: {
                                exporting: {
                                    enabled: false
                                },
                                title: {
                                    text: $scope.getDate.year + '年火灾事故受伤人数趋势图',
                                    x: -20 //center
                                },

                                xAxis: {
                                    categories: $scope.lineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: ''
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '(人)'
                                },
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    borderWidth: 0
                                }
                            },

                            series: [{
                                name:'受伤人数（人）',
                                data: $scope.lineChartData.injury
                            }]

                        };
                    } else if (selected == 2) {
                        $scope.columnChart = {
                            options: {
                                exporting: {
                                    enabled: false
                                },
                                title: {
                                    text: $scope.getDate.year + '年火灾事故死亡人数趋势图',
                                    x: -20 //center
                                },

                                xAxis: {
                                    categories: $scope.lineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: ''
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                tooltip: {
                                    valueSuffix: '(人)'
                                },
                                credits: {
                                    enabled: false
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    borderWidth: 0
                                }
                            },

                            series: [{
                                name:'死亡人数（人）',
                                data: $scope.lineChartData.dead
                            }]

                        };
                    } else if (selected == 3) {
                        $scope.columnChart = {
                            options: {
                                exporting: {
                                    enabled: false
                                },
                                title: {
                                    text: $scope.getDate.year + '年火灾事故直接财产损失趋势图',
                                    x: -20 //center
                                },

                                xAxis: {
                                    categories: $scope.lineChartData.categories
                                },
                                yAxis: {
                                    title: {
                                        text: ''
                                    },
                                    plotLines: [{
                                        value: 0,
                                        width: 1,
                                        color: '#808080'
                                    }]
                                },
                                credits: {
                                    enabled: false
                                },
                                tooltip: {
                                    valueSuffix: '(万元)'
                                },
                                legend: {
                                    layout: 'vertical',
                                    align: 'center',
                                    verticalAlign: 'bottom',
                                    borderWidth: 0
                                }
                            },

                            series: [{
                                name:'财产损失（万元）',
                                data: $scope.lineChartData.damage
                            }]

                        };
                    }
                }


                $scope.barCount = {
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,
                        chart: {
                            type: 'bar'
                        },
                        xAxis: {
                            categories: eachStationData.categories[0].cateData,
                            title: {
                                text: '消防中队',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '受理火灾事故数(起)'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: '起'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    },
                    title: {
                        text: $scope.getDate.month + '月份各消防中队受理火灾事故数'
                    },
                    series: [{
                        name: '受理事故数',
                        data: eachStationData.data[0]
                    }]
                };

                $scope.barInjury = {
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,
                        chart: {
                            type: 'bar'
                        },
                        xAxis: {
                            categories: eachStationData.categories[1].cateData,
                            title: {
                                text: '消防中队',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '火灾事故受伤人数(人)'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: '人'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    },
                    title: {
                        text: $scope.getDate.month + '月份各消防中队火灾受伤人数'
                    },
                    series: [{
                        name: '受伤人数',
                        data: eachStationData.data[1]
                    }]
                };

                $scope.barDead = {
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,
                        chart: {
                            type: 'bar'
                        },
                        xAxis: {
                            categories: eachStationData.categories[2].cateData,
                            title: {
                                text: '消防中队',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '火灾事故死亡人数(人)'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: '人'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    },
                    title: {
                        text: $scope.getDate.month + '月份各消防中队火灾死亡故数'
                    },
                    series: [{
                        name: '死亡人数',
                        data: eachStationData.data[2]
                    }]
                };

                $scope.barDamage = {
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,
                        chart: {
                            type: 'bar'
                        },
                        xAxis: {
                            categories: eachStationData.categories[3].cateData,
                            title: {
                                text: '消防中队',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '火灾直接财产损失(元)'
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: '元'
                        },
                        plotOptions: {
                            bar: {
                                dataLabels: {
                                    enabled: true
                                }
                            }
                        },
                        legend: {
                            enabled: false
                        },
                        credits: {
                            enabled: false
                        }
                    },
                    title: {
                        text: $scope.getDate.month + '月份各消防中队火灾直接财产损失'
                    },
                    series: [{
                        name: '直接财产损失',
                        data: eachStationData.data[3]
                    }]
                };
                $rootScope.loading = false;
            }; //end of processFunction
            $rootScope.loading = true;
            kpiDetailService.advancedQuery(tableName, advancedQueryConfig, processFunction);

        }
        //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('FireData', ["year", 'month'], processFunction1);



    //---------------------------********api调用参数*********------------------------------------------

    var dictTypeID = 3003;

    var cashPieChartData = [];
    var casePieChartData = [];
    //---------------------------********处理函数返回data的函数*********----------------------------------

    var processFunction1 = function(data) {
        console.log(JSON.stringify(data));
        //初始化图表数据
        stationInfo = data.data;


    };

    dictService.getDictListByType(dictTypeID, processFunction1);

};
