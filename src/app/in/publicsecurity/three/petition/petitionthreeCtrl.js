export default ($anchorScroll, $location, $rootScope, $scope, $state, dateService, dataDetailFactory, qService, kpiDetailService) => {
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
    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNi0xMC0yMSAxMTowMToxNCIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjoyNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM4OjM0IiwibmFtZSI6IuS6uuekvuWxgCIsImRlc2NyaXB0aW9uIjoiUlNKX+S6uuekvuWxgCJ9LHsiQGlkIjoiMyIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiI0IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiI1IiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI2IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjciLCJpZCI6MzEsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMyIsIm5hbWUiOiLljavnlJ/lsYAiLCJkZXNjcmlwdGlvbiI6IldTSl/ljavnlJ/lsYAifSx7IkBpZCI6IjgiLCJpZCI6MTcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NToxNCIsIm5hbWUiOiLnu4/kv6Hlp5QiLCJkZXNjcmlwdGlvbiI6IkpYV1/nu4/kv6Hlp5QifSx7IkBpZCI6IjkiLCJpZCI6NywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM3OjA1IiwibmFtZSI6Iue7n+iuoeWxgCIsImRlc2NyaXB0aW9uIjoiVEpKX+e7n+iuoeWxgCJ9LHsiQGlkIjoiMTAiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjExIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MjIsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MDoxMCIsIm5hbWUiOiLlhazlronlsYAiLCJkZXNjcmlwdGlvbiI6IkdBSl/lhazlronlsYAifSx7IkBpZCI6IjE0IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiMTUiLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiIxNyIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MTIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0xOSAxNjoyMTowNyIsIm5hbWUiOiLnjq/kv53lsYAiLCJkZXNjcmlwdGlvbiI6IkhCSl/njq/kv53lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjM4LCJjcmVhdGVfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDctMDggMDY6MzU6NDgiLCJuYW1lIjoi6YeR6J6N5YqeIiwiZGVzY3JpcHRpb24iOiJKUkJf6YeR6J6N5YqeIn0seyJAaWQiOiIyMCIsImlkIjozMCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjUxIiwibmFtZSI6IuS6pOmAmuWxgCIsImRlc2NyaXB0aW9uIjoiSlRKX+S6pOmAmuWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjIiLCJpZCI6MzcsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNS0yNSAxNToyOTo0OSIsIm5hbWUiOiLlm73nqI7lsYAiLCJkZXNjcmlwdGlvbiI6IkdUSl/lm73nqI7lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIyNCIsImlkIjoyNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQxOjA3IiwibmFtZSI6Iua2iOmYsuWkp+mYnyIsImRlc2NyaXB0aW9uIjoiWEZERF/mtojpmLLlpKfpmJ8ifSx7IkBpZCI6IjI1IiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifV19LCJleHBpcmVzIjoxNDgwNjU1OTU1OTU4LCJncmFudGVkQXV0aHMiOlsiUk9MRV9BRE1JTklTVFJBVE9SIl0sImFjY291bnROb25Mb2NrZWQiOnRydWUsImFjY291bnROb25FeHBpcmVkIjp0cnVlLCJjcmVkZW50aWFsc05vbkV4cGlyZWQiOnRydWUsImVuYWJsZWQiOnRydWUsInVzZXJuYW1lIjoic3lzdGVtIiwicGFzc3dvcmQiOm51bGx9.PT3kqmzkjZtV98yDr6kvK2gErGk8wsHUq0Krf+GOtGU=";
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
                        $scope.totalData.qnafs = ((doneLetterdata / (doneLetterdata + undoneLetterdata)) * 100).toFixed(2)  + "%";
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
                $rootScope.loading = false;
            };
            $rootScope.loading = true;
            kpiDetailService.advancedQuery(tableName, advancedQueryConfig, processFunction);
        }
        //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('PetitionLetterData', ["year", 'month'], processFunction1);
};
