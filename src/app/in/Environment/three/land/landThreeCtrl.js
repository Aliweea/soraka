export default ($scope, $state, $rootScope,dateService, dataDetailFactory, qService) => {
    'ngInject';

    const jQueryDOMToDos = () => {
        $(".navbar2position").hide(0); // 显示当前位置
        $(".navbar2return").show(0); // 显示返回按钮
        $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('#showshort').focus(); // 获取默认焦点
        $(".navbar2detail").hide(0); // 隐藏 查看kpi详情
    }();

    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMC0yMSAxMTowMToxNCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI0IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiI1IiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI2IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjciLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjgiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjkiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjExIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMTUiLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxNyIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIyMCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjI1IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifV19LCJleHBpcmVzIjoxNDgwNjU1OTU1OTU4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25Mb2NrZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.PT3kqmzkjZtV98yDr6kvK2gErGk8wsHUq0Krf+GOtGU="
    let headers = {"X-Auth-Token": token};

    var landUseHistoryArr;
    var landGrantHistoryArr;
    var landIllegalHistoryArr;
    var landUseLastDate;
    var landGrantLastDate;
    var landIllegalLastDate;
    var landUseFlag=false;
    var landIllegalFlag=false;


    $scope.activeTab1 = () => {
      $scope.tab1 = true;
      $scope.tab2 = false;
    };
    $scope.activeTab2 = () => {
      $scope.tab1 = false;
      $scope.tab2 = true;
    };

    //隐藏选择面板
    $scope.useGrantPanel=false;
    $scope.useDetailPanel=false;
    $scope.illegalDetailPanel=false;


    //土地使用和出让 highcharts options
    $scope.landUseOption = {
        allOption: {
            options: {
                colors: ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'],
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '',
                    x:-20
                },
                tooltip: {
                    pointFormat: '<b>{point.percentage:.1f}%</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '{point.percentage:.1f} %'
                        },
                        showInLegend: true
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                type: 'pie',
                data: []
            }]
        },
        detailOption: {
            options: {
                title: {
                    text: '',
                    x: -10 //center
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: '公顷'
                    },
                    plotLines: [{
                        value: 0,
                        width: 1,
                        color: '#808080'
                    }]
                },
                tooltip: {
                    valueSuffix: '公顷'
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name: '',
                data: []
            }]
        },
        increaseOption: {
            options: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '',
                    style: {
                        fontSize: "16px"
                    }
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '增加量(公顷)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 公顷'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name: '土地增加量',
                data: []
            }]
        },
        decreaseOption: {
            options: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '',
                    style: {
                        fontSize: "16px"
                    }
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '减少量(公顷)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 公顷'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name: '土地减少量',
                data: []
            }]
        },
        grantOption: {
            options: {
                colors: ['#7CADDF', '#195489', '#1FC22B', '#FB9705', '#F26200'],
                title: {
                    text: '',
                    x: -20 //center
                },
                xAxis: {
                    categories: []
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
                    valueSuffix: ''
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name: '',
                data: []
            }, {
                name: '',
                data: []
            }]
        }
    };

    //土地执法 highcharts options
    $scope.landIllegalOption = {
        allOption: {
            options: {
                colors: ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'],
                chart: {
                    plotBackgroundColor: null,
                    plotBorderWidth: null,
                    plotShadow: false
                },
                title: {
                    text: '',
                    x:-20
                },
                tooltip: {
                    pointFormat: '<b>{point.y}件</b>'
                },
                plotOptions: {
                    pie: {
                        allowPointSelect: true,
                        cursor: 'pointer',
                        dataLabels: {
                            enabled: true,
                            color: '#000000',
                            connectorColor: '#000000',
                            format: '{point.y} 件'
                        },
                        showInLegend: true
                    },
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                type: 'pie',
                data: []
            }]
        },
        increaseOption: {
            options: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '',
                    x:-20,
                    style: {
                        fontSize: "16px"
                    }
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '面积(亩)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 亩'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true,
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name: '违法用地总面积',
                data: []
            }]
        },
        decreaseOption: {
            options: {
                chart: {
                    type: 'bar'
                },
                title: {
                    text: '',
                    x:-20,
                    style: {
                        fontSize: "16px"
                    }
                },
                xAxis: {
                    categories: [],
                    title: {
                        text: null
                    }
                },
                yAxis: {
                    min: 0,
                    title: {
                        text: '面积(亩)',
                        align: 'high'
                    },
                    labels: {
                        overflow: 'justify'
                    }
                },
                tooltip: {
                    valueSuffix: ' 亩'
                },
                plotOptions: {
                    bar: {
                        dataLabels: {
                            enabled: true
                        }
                    }
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: [{
                name: '违法基本农田用地面积',
                data: []
            }]
        },
        detailOption: {
            options: {
                colors: ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200'],
                chart: {
                    type: 'area'
                },
                title: {
                    text: '',
                    x:-20
                },
                xAxis: {
                    categories: []
                },
                yAxis: {
                    title: {
                        text: ''
                    },
                    labels: {
                        formatter: function () {
                            return this.value;
                        }
                    }
                },
                plotOptions: {
                    area: {
                        stacking: 'normal',
                        lineColor: '#666666',
                        lineWidth: 1,
                        marker: {
                            lineWidth: 1,
                            lineColor: '#666666'
                        }
                    }
                },
                tooltip: {
                    valueSuffix: '',
                    shared: true
                },
                credits: {
                    enabled: false
                },
                exporting: {
                    enabled: false
                }
            },
            series: []
        },
    };

    var getCurrentYearMonth = function (year, month) {
        var yearSystem = moment(dateService.getSystemTime()).get('year');
        var monthSystem = moment(dateService.getSystemTime()).get('month') + 1;
        if ((12 * year + month) < (12 * yearSystem + monthSystem)) {
            return {
                year: year,
                month: month
            };
        } else
            return {
                year: yearSystem,
                month: monthSystem
            };

    };

    //土地使用 排行榜
    var processRank = function (increArr, decreArr, result, index) {
        if (result >= 0) {
            increArr.push({
                index: index,
                dataResult: result
            });
        } else {
            decreArr.push({
                index: index,
                dataResult: -result
            })
        }

    }

    //土地使用 列表点击事件
    $scope.landUseDetailListChange = function (landUseOne) {
        $scope.useDetailPanel=false;
        for (var i = 0; i < landUseHistoryArr.length; i++) {
            if (landUseHistoryArr[i].index == landUseOne) {
                $scope.landUseOption.detailOption.options.title.text = landUseHistoryArr[i].index + '面积';
                $scope.landUseOption.detailOption.series[0].name = landUseHistoryArr[i].index;
                $scope.landUseOption.detailOption.series[0].data = landUseHistoryArr[i].dataList;
            }
        }
    };

    //土地出让 列表点击事件
    $scope.landUseGrantListChange = function (landUseOne) {
        $scope.useGrantPanel=false;
        for (var i = 0; i < landGrantHistoryArr.length; i++) {
            if (landGrantHistoryArr[i].index == landUseOne) {
                $scope.landUseOption.grantOption.options.title.text = landGrantHistoryArr[i].index;
                $scope.landUseOption.grantOption.series[0].data = landGrantHistoryArr[i].dataList;
                $scope.landUseOption.grantOption.series[1].data = landGrantHistoryArr[i].industryDataList;
                if (landUseOne == '土地出让成交总价') {
                    $scope.landUseOption.grantOption.options.yAxis.title.text = '万元';
                    $scope.landUseOption.grantOption.options.tooltip.valueSuffix = '万元';
                } else if (landUseOne == '土地出让成交总面积') {
                    $scope.landUseOption.grantOption.options.yAxis.title.text = '公顷';
                    $scope.landUseOption.grantOption.options.tooltip.valueSuffix = '公顷';
                } else if (landUseOne == '土地出让成交总宗数') {
                    $scope.landUseOption.grantOption.options.yAxis.title.text = '件';
                    $scope.landUseOption.grantOption.options.tooltip.valueSuffix = '件';
                }
            }
        }
    };

    //土地使用数据获取
    var landUseFun = function () {
        //土地使用当前,数据获取
        qService.httpPost(dataDetailFactory.lastestObject,
          {tableName: 'LandUse'}, headers, ['year']).then(function (result) {
            if (result.errorCode == "NO_ERROR") {
                var year = result.data.year;
                var yearCurrent = getCurrentYearMonth(year, 1).year;
                landUseLastDate = {
                    year: yearCurrent
                };
                qService.httpPost(dataDetailFactory.advancedQuery,
                  {tableName: 'LandUse'}, headers, {
                      year: {
                          value1: landUseLastDate.year - 4,
                          value2: landUseLastDate.year,
                          queryType: 'bt',
                          valueType: 'innt'
                      },
                      sort1: {
                          key: 'year',
                          sortType: 'asc'
                      }
                  }).then(function (data) {
                      var landUsePieArr = [];
                      var farmlandList = [];
                      var forestList = [];
                      var gardenList = [];
                      var grassList = [];
                      var townList = [];
                      var trafficList = [];
                      var waterList = [];
                      var otherList = [];
                      for (var i = 0; i < data.data.length; i++) {
                          if (data.data[i].year == landUseLastDate.year) {
                              landUsePieArr.push(['耕地', data.data[i].farmland]);
                              landUsePieArr.push(['水域及水利设施用地', data.data[i].water]);
                              landUsePieArr.push(['草地', data.data[i].grass]);
                              landUsePieArr.push(['城镇村及工矿用地', data.data[i].town]);
                              landUsePieArr.push(['园地', data.data[i].garden]);
                              landUsePieArr.push(['林地', data.data[i].forest]);
                              landUsePieArr.push(['交通运输用地', data.data[i].traffic]);
                              landUsePieArr.push(['其他用地', data.data[i].other]);
                          }
                          farmlandList.push(data.data[i].farmland);
                          forestList.push(data.data[i].forest);
                          gardenList.push(data.data[i].garden);
                          grassList.push(data.data[i].grass);
                          townList.push(data.data[i].town);
                          trafficList.push(data.data[i].traffic);
                          waterList.push(data.data[i].water);
                          otherList.push(data.data[i].other);
                      }
                      landUseHistoryArr = [{
                          index: '耕地',
                          dataList: farmlandList
                      }, {
                          index: '水域及水利设施用地',
                          dataList: waterList
                      }, {
                          index: '草地',
                          dataList: grassList
                      }, {
                          index: '城镇村及工矿用地',
                          dataList: townList
                      }, {
                          index: '园地',
                          dataList: gardenList
                      }, {
                          index: '林地',
                          dataList: forestList
                      }, {
                          index: '交通运输用地',
                          dataList: trafficList
                      }, {
                          index: '其他用地',
                          dataList: otherList
                      }];

                      var landUseIncre = [];
                      var landUseDecre = [];

                      for (var i = 0; i < data.data.length; i++) {
                          if (data.data[i].year == landUseLastDate.year) {
                              //排行榜数组构造
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].farmland - data.data[i - 1].farmland)).toFixed(2), '耕地');
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].water - data.data[i - 1].water)).toFixed(2), '水域及水利设施用地');
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].grass - data.data[i - 1].grass)).toFixed(2), '草地');
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].town - data.data[i - 1].town)).toFixed(2), '城镇村及工矿用地');
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].garden - data.data[i - 1].garden)).toFixed(2), '园地');
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].forest - data.data[i - 1].forest)).toFixed(2), '林地');
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].traffic - data.data[i - 1].traffic)).toFixed(2), '交通运输用地');
                              processRank(landUseIncre, landUseDecre, (parseFloat(data.data[i].other - data.data[i - 1].other)).toFixed(2), '其他用地');
                          }
                      }

                      function sortLandUse(a, b) {
                          return b.dataResult - a.dataResult;
                      }

                      landUseIncre.sort(sortLandUse);
                      landUseDecre.sort(sortLandUse);

                      var increChartCategories = [];
                      var increChartData = [];
                      var decreChartCategories = [];
                      var decreChartData = [];
                      for (var i = 0; i < landUseIncre.length; i++) {
                          increChartCategories.push(landUseIncre[i].index);
                          increChartData.push(parseFloat(landUseIncre[i].dataResult));
                      }
                      $scope.landUseOption.increaseOption.options.title.text = landUseLastDate.year + '年各类土地面积增加排行';
                      $scope.landUseOption.increaseOption.options.xAxis.categories = increChartCategories;
                      $scope.landUseOption.increaseOption.series[0].data = increChartData;

                      for (var i = 0; i < landUseDecre.length; i++) {
                          decreChartCategories.push(landUseDecre[i].index);
                          decreChartData.push(parseFloat(landUseDecre[i].dataResult));
                      }

                      $scope.landUseOption.decreaseOption.options.title.text = landUseLastDate.year + '年各类土地面积减少排行';
                      $scope.landUseOption.decreaseOption.options.xAxis.categories = decreChartCategories;
                      $scope.landUseOption.decreaseOption.series[0].data = decreChartData;

                      //土地使用 初始化
                      $scope.landUseOption.allOption.options.title.text = landUseLastDate.year + "年土地类型面积分布";
                      $scope.landUseOption.allOption.series[0].data = landUsePieArr;

                      $scope.landUseOption.detailOption.options.title.text = landUseHistoryArr[0].index + '面积';
                      $scope.landUseOption.detailOption.options.xAxis.categories = [landUseLastDate.year - 4, landUseLastDate.year - 3, landUseLastDate.year - 2, landUseLastDate.year - 1, landUseLastDate.year];

                      $scope.landUseOption.detailOption.series[0].name = landUseHistoryArr[0].index;
                      $scope.landUseOption.detailOption.series[0].data = landUseHistoryArr[0].dataList;

                      $scope.landUseDetailList = ['耕地', '园地', '林地', '草地', '城镇村及工矿用地', '交通运输用地', '水域及水利设施用地', '其他用地'];
                      $scope.landUseOneDetailListSelected = '耕地';
                  }
                  , (err) => {
                      if (err.errorCode == "UNAUTHORIZED") {
                          $state.go('portal');
                      }
                  }).finally(
                  () => {
                      $rootScope.loading = false;
                  }
                );
            }
        }, (err) => {
            if (err.errorCode == "UNAUTHORIZED") {
                $state.go('portal');
            }
        }).finally(
          () => {
              $rootScope.loading = false;
          }
        );

        //土地出让最近五年，数据获取
        qService.httpPost(dataDetailFactory.lastestObject,
          {tableName: 'LandGrant'}, headers, ['year']).then(function (result) {
            var year = result.data.year;
            var yearCurrent = getCurrentYearMonth(year, 1).year;
            landGrantLastDate = {
                year: yearCurrent
            };
            qService.httpPost(dataDetailFactory.advancedQuery,
              {tableName: 'LandGrant'}, headers, {
                  year: {
                      value1: landGrantLastDate.year - 4,
                      value2: landGrantLastDate.year,
                      queryType: 'bt',
                      valueType: 'innt'
                  },
                  sort1: {
                      key: 'year',
                      sortType: 'asc'
                  }
              }).then(function (data) {
                var columnSumList = [];
                var areaSumMuList = [];
                var valueList = [];

                var industryColumnSumList = [];
                var industryAreaSumMuList = [];
                var industryValueList = [];
                for (var i = 0; i < data.data.length; i++) {
                    columnSumList.push(data.data[i].columnSum);
                    areaSumMuList.push(parseFloat(data.data[i].areaSumMu.toFixed(2)));
                    valueList.push(parseFloat(data.data[i].value.toFixed(2)));
                    industryColumnSumList.push(data.data[i].industryColumnSum);
                    industryAreaSumMuList.push(parseFloat(data.data[i].industryAreaSumMu.toFixed(2)));
                    industryValueList.push(parseFloat(data.data[i].industryValue.toFixed(2)));
                }

                landGrantHistoryArr = [{
                    index: '土地出让成交总价',
                    dataList: valueList,
                    industryDataList: industryValueList
                }, {
                    index: '土地出让成交总面积',
                    dataList: areaSumMuList,
                    industryDataList: industryAreaSumMuList
                }, {
                    index: '土地出让成交总宗数',
                    dataList: columnSumList,
                    industryDataList: industryColumnSumList
                }]

                $scope.landUseOption.grantOption.options.title.text = landGrantHistoryArr[0].index;
                $scope.landUseOption.grantOption.options.xAxis.categories = [landGrantLastDate.year - 4, landGrantLastDate.year - 3, landGrantLastDate.year - 2, landGrantLastDate.year - 1, landGrantLastDate.year];
                $scope.landUseOption.grantOption.options.yAxis.title.text = '万元';
                $scope.landUseOption.grantOption.options.tooltip.valueSuffix = '万元';
                $scope.landUseOption.grantOption.series[0].name = '经营性用地';
                $scope.landUseOption.grantOption.series[0].data = landGrantHistoryArr[0].dataList;
                $scope.landUseOption.grantOption.series[1].name = '工业用地';
                $scope.landUseOption.grantOption.series[1].data = landGrantHistoryArr[0].industryDataList;


                $scope.landUseGrantList = ['土地出让成交总价', '土地出让成交总面积', '土地出让成交总宗数'];
                $scope.landUseGrantListSelected = '土地出让成交总价';
                landUseFlag = true;
            }, (err) => {
                if (err.errorCode == "UNAUTHORIZED") {
                    $state.go('portal');
                }
            }).finally(
              () => {
                  $rootScope.loading = false;
              }
            );
        }, (err) => {
            if (err.errorCode == "UNAUTHORIZED") {
                $state.go('portal');
            }
        }).finally(
          () => {
              $rootScope.loading = false;
          }
        );
    };

    //土地执法 列表点击事件
    $scope.landIllegalIndexListChange = function (landIllegalOne) {
        $scope.illegalDetailPanel=false;
        if (landIllegalOne == '总宗数') {
            $scope.landIllegalOption.detailOption.options.title.text = '违法用地' + '总宗数';
            $scope.landIllegalOption.detailOption.options.yAxis.title.text = '件';
            $scope.landIllegalOption.detailOption.options.tooltip.valueSuffix = '件';

            $scope.landIllegalOption.detailOption.series = [];
            for (var i = 0; i < landIllegalHistoryArr.length; i++) {
                $scope.landIllegalOption.detailOption.series.push({
                    name: landIllegalHistoryArr[i].index,
                    data: landIllegalHistoryArr[i].data.columnSumData
                });
            }
        } else if (landIllegalOne == '总面积') {
            $scope.landIllegalOption.detailOption.options.title.text = '违法用地' + '总面积';
            $scope.landIllegalOption.detailOption.options.yAxis.title.text = '亩';
            $scope.landIllegalOption.detailOption.options.tooltip.valueSuffix = '亩';

            $scope.landIllegalOption.detailOption.series = [];
            for (var i = 0; i < landIllegalHistoryArr.length; i++) {
                $scope.landIllegalOption.detailOption.series.push({
                    name: landIllegalHistoryArr[i].index,
                    data: landIllegalHistoryArr[i].data.areaSumData
                });
            }
        } else if (landIllegalOne == '基本农田面积') {
            $scope.landIllegalOption.detailOption.options.title.text = '违法用地' + '基本农田面积';
            $scope.landIllegalOption.detailOption.options.yAxis.title.text = '亩';
            $scope.landIllegalOption.detailOption.options.tooltip.valueSuffix = '亩';

            $scope.landIllegalOption.detailOption.series = [];
            for (var i = 0; i < landIllegalHistoryArr.length; i++) {
                $scope.landIllegalOption.detailOption.series.push({
                    name: landIllegalHistoryArr[i].index,
                    data: landIllegalHistoryArr[i].data.farmlandData
                });
            }
        } else if (landIllegalOne == '已整改宗数') {
            $scope.landIllegalOption.detailOption.options.title.text = '违法用地' + '已整改宗数';
            $scope.landIllegalOption.detailOption.options.yAxis.title.text = '件';
            $scope.landIllegalOption.detailOption.options.tooltip.valueSuffix = '件';

            $scope.landIllegalOption.detailOption.series = [];
            for (var i = 0; i < landIllegalHistoryArr.length; i++) {
                $scope.landIllegalOption.detailOption.series.push({
                    name: landIllegalHistoryArr[i].index,
                    data: landIllegalHistoryArr[i].data.modfiyColumnData
                });
            }
        } else if (landIllegalOne == '已整改面积') {
            $scope.landIllegalOption.detailOption.options.title.text = '违法用地' + '已整改面积';
            $scope.landIllegalOption.detailOption.options.yAxis.title.text = '亩';
            $scope.landIllegalOption.detailOption.options.tooltip.valueSuffix = '亩';

            $scope.landIllegalOption.detailOption.series = [];
            for (var i = 0; i < landIllegalHistoryArr.length; i++) {
                $scope.landIllegalOption.detailOption.series.push({
                    name: landIllegalHistoryArr[i].index,
                    data: landIllegalHistoryArr[i].data.modifyAreaData
                });
            }
        }
    };

    //土地执法数据获取
    var landIllegalFun = function () {
        qService.httpPost(dataDetailFactory.lastestObject,
          {tableName: 'LandIllegal'}, headers, ['year', 'month']).then(function (result) {
            var year = result.data.year;
            var month = result.data.month;
            var yearCurrent = getCurrentYearMonth(year, month).year;
            var monthCurrent = getCurrentYearMonth(year, month).month;
            landIllegalLastDate = {
                year: yearCurrent,
                month: monthCurrent
            };
            var fromYear, endYear, fromMonth, endMonth;
            if (landIllegalLastDate.month < 6) {
                fromYear = landIllegalLastDate.year - 1;
                endYear = landIllegalLastDate.year;
                fromMonth = landIllegalLastDate.month + 7
                endMonth = landIllegalLastDate.month;
            } else {
                fromYear = landIllegalLastDate.year;
                endYear = landIllegalLastDate.year;
                fromMonth = landIllegalLastDate.month - 5
                endMonth = landIllegalLastDate.month;
            }
            qService.httpPost(dataDetailFactory.advancedQuery,
              {tableName: 'LandIllegal'}, headers, {
                  applyTime: {
                      value1: new Date(fromYear, fromMonth - 1, 1, 0, 0, 0).getTime(),
                      value2: new Date(endYear, endMonth - 1, 1, 0, 0, 0).getTime(),
                      queryType: 'bt',
                      valueType: 'datte'
                  },
                  sort1: {
                      key: 'zone.id',
                      sortType: 'asc'
                  },
                  sort2: {
                      key: 'applyTime',
                      sortType: 'asc'
                  },
              }).then(function (data) {
                function sortLandIllegal(a, b) {
                    if (a.zone.id == b.zone.id) {
                        return ((a.year) * 12 + a.month) - ((b.year) * 12 + b.month);
                    }
                    return a.zone.id - b.zone.id;
                }

                data.data.sort(sortLandIllegal);
                $scope.landIllegalOption.allOption.options.title.text = landIllegalLastDate.year + '年' + landIllegalLastDate.month + '月' + "违法用地宗数";
                var landIllegalPieArr = [];
                for (var i = 0; i < data.data.length; i++) {
                    if (data.data[i].month == landIllegalLastDate.month && data.data[i].year == landIllegalLastDate.year) {
                        landIllegalPieArr.push([data.data[i].zone.name, data.data[i].columnSum]);
                    }
                }

                $scope.landIllegalOption.allOption.series[0].data = landIllegalPieArr;

                landIllegalHistoryArr = [];
                var landIllegalCurrentAreaSumList = [];
                var landIllegalCurrentFarmlandList = [];

                for (var i = 0; i < data.data.length / 6; i++) {
                    var columnSumList = [];
                    var areaSumList = [];
                    var farmlandSumList = [];
                    var modifyColumnList = [];
                    var modifyAreaList = [];
                    for (var j = 0; j < 6; j++) {
                        columnSumList.push(parseFloat(data.data[i * 6 + j].columnSum));
                        areaSumList.push(parseFloat(data.data[i * 6 + j].areaSum));
                        farmlandSumList.push(parseFloat(data.data[i * 6 + j].farmlandSum));
                        modifyColumnList.push(parseFloat(data.data[i * 6 + j].modifyColumn));
                        modifyAreaList.push(parseFloat(data.data[i * 6 + j].modifyArea));
                    }
                    landIllegalHistoryArr.push({
                        index: data.data[i * 6].zone.name,
                        data: {
                            columnSumData: columnSumList,
                            areaSumData: areaSumList,
                            farmlandData: farmlandSumList,
                            modfiyColumnData: modifyColumnList,
                            modifyAreaData: modifyAreaList
                        }
                    });

                    landIllegalCurrentAreaSumList.push(areaSumList[5]);
                    landIllegalCurrentFarmlandList.push(farmlandSumList[5]);
                }

                $scope.landIllegalOption.increaseOption.options.title.text = landIllegalLastDate.year + '年' + landIllegalLastDate.month + '月' + '违法用地总面积';
                $scope.landIllegalOption.increaseOption.options.xAxis.categories = ['城厢镇', '双凤镇', '沙溪镇', '浏河镇', '浮桥镇', '璜泾镇', '新区'];
                $scope.landIllegalOption.increaseOption.series[0].data = landIllegalCurrentAreaSumList;

                $scope.landIllegalOption.decreaseOption.options.title.text = landIllegalLastDate.year + '年' + landIllegalLastDate.month + '月' + '违法基本农田用地总面积';
                $scope.landIllegalOption.decreaseOption.options.xAxis.categories = ['城厢镇', '双凤镇', '沙溪镇', '浏河镇', '浮桥镇', '璜泾镇', '新区'];
                $scope.landIllegalOption.decreaseOption.series[0].data = landIllegalCurrentFarmlandList;

                var landIllegalTimeCategories = [];
                for (var i = 0; i < 6; i++) {
                    if (parseInt((parseInt(landIllegalLastDate.month) + i - 5) % 12) == 0) {
                        landIllegalTimeCategories.push('12月');
                    } else {
                        landIllegalTimeCategories.push(parseInt((parseInt(landIllegalLastDate.month) + i + 7) % 12) + '月');
                    }
                }

                $scope.landIllegalOption.detailOption.options.xAxis.categories = landIllegalTimeCategories;
                $scope.landIllegalOption.detailOption.options.title.text = '违法用地总宗数';
                $scope.landIllegalOption.detailOption.options.yAxis.title.text = '件';
                $scope.landIllegalOption.detailOption.options.tooltip.valueSuffix = '件';

                $scope.landIllegalOption.detailOption.series = [];
                for (var i = 0; i < landIllegalHistoryArr.length; i++) {
                    $scope.landIllegalOption.detailOption.series.push({
                        name: landIllegalHistoryArr[i].index,
                        data: landIllegalHistoryArr[i].data.columnSumData
                    });
                }
                $scope.landIllegalIndexList = ['总宗数', '总面积', '基本农田面积', '已整改宗数', '已整改面积'];
                $scope.landIllegalIndexListSelected = '总宗数';
                landIllegalFlag = true;
            }, (err) => {
                if (err.errorCode == "UNAUTHORIZED") {
                    $state.go('portal');
                }
            }).finally(
              () => {
                  $rootScope.loading = false;
              }
            );
        }, (err) => {
            if (err.errorCode == "UNAUTHORIZED") {
                $state.go('portal');
            }
        }).finally(
          () => {
              $rootScope.loading = false;
          }
        );
    };

    //土地使用
    $scope.landUseFunction=function () {
        $scope.activeTab1();
        if (!landUseFlag){
            $rootScope.loading = true;
            landUseFun();
        }
    };
    $scope.useGantSelectFun=function () {
        $scope.useGrantPanel=!$scope.useGrantPanel;
    };
    $scope.useDetailSelectFun=function () {
        $scope.useDetailPanel=!$scope.useDetailPanel;
    };
    $scope.illegalDetailSelectFun=function () {
        $scope.illegalDetailPanel=!$scope.illegalDetailPanel;
    };
    //土地执法
    $scope.landIllegalFunction = function () {
        $scope.activeTab2();
        if (!landIllegalFlag){
            $rootScope.loading = true;
            landIllegalFun();
        }
    };

    //进入页面，默认显示土地使用
    $scope.landUseFunction();

};
