export default ($scope, $state, dateService, dataDetailFactory, qService, kpiDetailService) => {
    'ngInject';

    const jQueryDOMToDos = () => {
        $(".navbar2position").hide(0); // 显示当前位置
        $(".navbar2return").show(0); // 显示返回按钮
        $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('#showshort').focus(); // 获取默认焦点
    }();
    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MzQsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLmsJTosaHlsYAiLCJkZXNjcmlwdGlvbiI6IlFYSl/msJTosaHlsYAifSx7IkBpZCI6IjQiLCJpZCI6MjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm5hbWUiOiLmtojpmLLlpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlhGRERf5raI6Ziy5aSn6ZifIn0seyJAaWQiOiI1IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiI3IiwiaWQiOjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm5hbWUiOiLnu5/orqHlsYAiLCJkZXNjcmlwdGlvbiI6IlRKSl/nu5/orqHlsYAifSx7IkBpZCI6IjgiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjkiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjEwIiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxMSIsImlkIjoyNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibmFtZSI6Iue7j+a1juebuOWFs+e7hCIsImRlc2NyaXB0aW9uIjoiSkpYR1pf57uP5rWO55u45YWz57uEIn0seyJAaWQiOiIxMiIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjE1IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxNiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTciLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozOToyOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozOToyOCIsIm5hbWUiOiLnianku7flsYAiLCJkZXNjcmlwdGlvbiI6IldKSl/nianku7flsYAifSx7IkBpZCI6IjIwIiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn0seyJAaWQiOiIyMSIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMC0xNiAyMTo0MTozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMi0wOCAxNDo1ODo1NiIsIm5hbWUiOiLpgq7mlL/lsYAiLCJkZXNjcmlwdGlvbiI6IllaSl/pgq7mlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjI4LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJuYW1lIjoi5Z+O566h5bGAIiwiZGVzY3JpcHRpb24iOiJDR0pf5Z+O566h5bGAIn1dfSwiZXhwaXJlcyI6MTQ3OTg3MjQ0Mjc0NywiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.v+2Qyvs/jfLTXJ9g1OJP/qhfNxeTdxUiU98DJcd/zAw=";
    let headers = {
        "X-Auth-Token": token
    };

    var pieColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200');
    var eachMonthData = [

        {
            month: '1',
            data: []
        }, {
            month: '2',
            data: []
        }, {
            month: '3',
            data: []
        }, {
            month: '4',
            data: []
        }, {
            month: '5',
            data: []
        }, {
            month: '6',
            data: []
        }, {
            month: '7',
            data: []
        }, {
            month: '8',
            data: []
        }, {
            month: '9',
            data: []
        }, {
            month: '10',
            data: []
        }, {
            month: '11',
            data: []
        }, {
            month: '12',
            data: []
        }
    ];
    var eachMonthData1 = [

        {
            month: '1',
            data: []
        }, {
            month: '2',
            data: []
        }, {
            month: '3',
            data: []
        }, {
            month: '4',
            data: []
        }, {
            month: '5',
            data: []
        }, {
            month: '6',
            data: []
        }, {
            month: '7',
            data: []
        }, {
            month: '8',
            data: []
        }, {
            month: '9',
            data: []
        }, {
            month: '10',
            data: []
        }, {
            month: '11',
            data: []
        }, {
            month: '12',
            data: []
        }
    ];
    var eachMonthData2 = [

        {
            month: '1',
            data: []
        }, {
            month: '2',
            data: []
        }, {
            month: '3',
            data: []
        }, {
            month: '4',
            data: []
        }, {
            month: '5',
            data: []
        }, {
            month: '6',
            data: []
        }, {
            month: '7',
            data: []
        }, {
            month: '8',
            data: []
        }, {
            month: '9',
            data: []
        }, {
            month: '10',
            data: []
        }, {
            month: '11',
            data: []
        }, {
            month: '12',
            data: []
        }
    ];
    $scope.getDate = {
        year: '',
        month: ''
    }


    $scope.totalData = {
        bypassletter: '',
        //    byje:'',
        qnafs: '',
        //    qnje:''
        //  
    }

    var pieTypeData = [
        ['已处理信件', 0],
        ['未处理信件', 0]
    ];

    var barTypeData = [
        ['群众来信上访信件', 0],
        ['群众网上上访信件', 0],
        ['群众到访上访信件', 0],
        ['其他途径上访信件', 0]
    ];

    var barTypeData1 = [
        ['越级个人上访', 0],
        ['越级集体上访', 0]
    ];

    $scope.lineDataType = {
        category: [],
        data: []
    }
    $scope.lineDataType1 = {
        category1: [],
        data: []
    }
    $scope.lineDataType2 = {
        category2: [],
        data: []
    }
    $scope.data = {}

    //初始化页面数据


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
                //console.log(month_);
                if ($scope.getDate.year > year_) {
                    $scope.getDate.year = year_;
                    $scope.getDate.month = month_;
                } else if ($scope.getDate.year == year_) {
                    $scope.getDate.month = month_;
                }

            }

            //---------------------------********api调用参数*********------------------------------------------

            var tableName = 'PetitionLetterData';

            var advancedQueryConfig = {
                    "year": {
                        "value1": $scope.getDate.year,
                        "queryType": "eq",
                        "valueType": "innt"
                    }
                }
                //-----------------------------------处理函数返回data的函数，-------------------------------

            //获取数据库最新数据的日期
            var processFunction = function(data) {
                //console.log(data);
                // var data = data.data[0];

                console.log("year: " + $scope.getDate.year);
                console.log("month: " + $scope.getDate.month);


                //根据返回日期取最新的数据
                var doneLetterdata = 0;
                var undoneLetterdata = 0;
                var pieDataList = [];
                for (var i = 0; i < data.data.length; i++) {
                    var month = data.data[i].month;
                    if (month == $scope.getDate.month) {
                        doneLetterdata += data.data[i].doneLetter;
                        undoneLetterdata += data.data[i].undoneLetter;
                        pieTypeData[0][1] = doneLetterdata;
                        pieTypeData[1][1] = undoneLetterdata;
                        barTypeData[0][1] = data.data[i].publicLetter;
                        barTypeData[1][1] = data.data[i].publicWebLetter;
                        barTypeData[2][1] = data.data[i].publicBureauLetter;
                        barTypeData[3][1] = data.data[i].otherLetter;
                        barTypeData1[0][1] = data.data[i].bypassperLetter;
                        barTypeData1[1][1] = data.data[i].bypasscollectiveLetter;
                        $scope.totalData.bypassletter = data.data[i].bypassperLetter + data.data[i].bypasscollectiveLetter;
                        $scope.totalData.qnafs = ((doneLetterdata / (doneLetterdata + undoneLetterdata)).toFixed(4)) * 100 + "%";
                    }

                    //console.log(eachMonthData[$scope.getDate.month].doneLetter);

                }
                for (var i = 0; i < $scope.getDate.month; i++) {
                    $scope.lineDataType.category.push((i + 1) + '月');
                    eachMonthData[i].data.push(data.data[i].publicLetter + data.data[i].publicWebLetter + data.data[i].publicBureauLetter + data.data[i].otherLetter);
                    $scope.lineDataType.data.push(eachMonthData[i].data);
                    eachMonthData1[i].data.push(data.data[i].bypassperLetter);
                    $scope.lineDataType1.data.push(eachMonthData1[i].data);
                    eachMonthData2[i].data.push(data.data[i].bypasscollectiveLetter);
                    $scope.lineDataType2.data.push(eachMonthData2[i].data);

                }
                 console.log( $scope.lineDataType1.data);
                 console.log( $scope.lineDataType2.data);
                 console.log(pieTypeData);
                console.log(eachMonthData[0].data);
                 //$scope.totalData.bypassletter = data.bypass[0] + data.bypass[1];

                 // $scope.totalData.qnafs =((data.pieData1.petitionletterPieData2[0]/(data.pieData1.petitionletterPieData2[0]+data.pieData1.petitionletterPieData2[1])).toFixed(3))*100+"%";


                $scope.PieChart = { //第一个饼图
                    options: {

                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: $scope.getDate.year + "年" + $scope.getDate.month + "月份群众上访信件结案率"
                        },
                        tooltip: {
                            pointFormat: '<b>上访信件</b>:{point.y:1.f}(起)</b>'
                        },
                        plotOptions: {
                            
                            pie: {
                                size: '75%',
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    distance: 0,
                                    enabled: true,
                                    color: '#000000',
                                    connectorColor: '#000000',
                                    format: '{point.percentage:.1f} %'
                                },
                                showInLegend: true
                            }


                        },
                        exporting: {
                            enabled: false
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '',
                        data: pieTypeData
                    }]

                };


                $scope.lineChart = { //折线图
                    options: {
                        colors: pieColors,
                        title: {
                            text: 2015 + '年越级上访信件趋势',
                            x: -20 //center

                        },
                        exporting: {
                            enabled: false
                        },

                        xAxis: {
                            categories: $scope.lineDataType.category
                        },
                        yAxis: {
                            title: {
                                text: '上访信件数(起)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }],
                            min: 0
                        },
                        tooltip: {
                            valueSuffix: '(起)'
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: true
                        }
                    },

                    series: [{
                        name: '越级个人上访',
                        data: $scope.lineDataType1.data //[16,7,9,15,20,14,16,21,22,18,11,9]
                    }, {
                        name: '越级集体上访',
                        data: $scope.lineDataType2.data //[10,11,5,23,14,26,17,10,15,10,9,16]
                    }]

                };

                $scope.lineChart1 = { //群众上访折线图
                    options: {
                        colors: pieColors,
                        title: {
                            text: $scope.getDate.year + '年群众上访信件趋势',
                            x: -20 //center

                        },
                        exporting: {
                            enabled: false
                        },
                        xAxis: {
                            categories: $scope.lineDataType.category
                        },
                        yAxis: {
                            title: {
                                text: '上访信件数(起)'
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }],
                            min: 0
                        },
                        tooltip: {
                            valueSuffix: '(起)'
                        },
                        credits: {
                            enabled: false
                        },
                        legend: {
                            enabled: true
                        }
                    },

                    series: [{
                            name: '上访信件',
                            data: $scope.lineDataType.data
                        },

                    ]

                };

                $scope.columnChart1 = { //第二个柱状图
                    options: {
                        exporting: {
                            enabled: false
                        },
                        chart: {
                            type: 'column'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: $scope.getDate.year + "年" + $scope.getDate.month + "月份越级上访信件数"
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            categories: [
                                '越级个人上访',
                                '越级集体上访'

                            ]
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '信件数 (起)'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} (起)</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true
                                },
                                colorByPoint: true
                            },

                            showInLegend: false

                        }
                    },
                    series: [{
                        name: '上访信件数',
                        data: barTypeData1 //[14,36]

                    }]

                };
                $scope.columnChart2 = { //第一个柱状图
                    options: {
                        chart: {
                            type: 'column'
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: $scope.getDate.year + "年" + $scope.getDate.month + "月份上访信件详情"
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            categories: [
                                '群众来信上访信件',
                                '群众网上上访信件',
                                '群众到访上访信件',
                                '其他途径上访信件'
                            ],
                            labels: {
                                rotation: -45,
                                align: 'right',
                                style: {
                                    fontSize: '10px',
                                    fontFamily: 'Verdana, sans-serif'
                                }
                            }

                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '上访信件数(起)'
                            }
                        },
                        tooltip: {
                            headerFormat: '<span style="font-size:10px">{point.key}</span><table>',
                            pointFormat: '<tr><td style="color:{series.color};padding:0"> </td>' +
                                '<td style="padding:0"><b>{point.y:.1f} (起)</b></td></tr>',
                            footerFormat: '</table>',
                            shared: true,
                            useHTML: true
                        },
                        legend: {
                            enabled: false
                        },
                        plotOptions: {
                            column: {
                                pointPadding: 0.2,
                                borderWidth: 0,
                                dataLabels: {
                                    enabled: true
                                },
                                colorByPoint: true

                            },

                            showInLegend: false

                        },
                        exporting: {
                            enabled: false
                        }
                    },
                    series: [{
                        name: '上访信件数',
                        data: barTypeData //[10,20,30,40,50]

                    }]

                };
            };
            kpiDetailService.advancedQuery(tableName, advancedQueryConfig, processFunction);
        }
        //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('PetitionLetterData', ["year", 'month'], processFunction1);
};
