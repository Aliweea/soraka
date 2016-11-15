export default ($scope, $state, dateService, dataDetailFactory, qService, kpiDetailService) => {
    'ngInject';
    const jQueryDOMToDos = () => {
        $(".navbar2position").hide(0); // 显示当前位置
        $(".navbar2return").show(0); // 显示返回按钮
        $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('#showshort').focus(); // 获取默认焦点
    }();
    
    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjMiLCJpZCI6MzQsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLmsJTosaHlsYAiLCJkZXNjcmlwdGlvbiI6IlFYSl/msJTosaHlsYAifSx7IkBpZCI6IjQiLCJpZCI6MjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTowNyIsIm5hbWUiOiLmtojpmLLlpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlhGRERf5raI6Ziy5aSn6ZifIn0seyJAaWQiOiI1IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI2IiwiaWQiOjEyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMTkgMTY6MjE6MDciLCJuYW1lIjoi546v5L+d5bGAIiwiZGVzY3JpcHRpb24iOiJIQkpf546v5L+d5bGAIn0seyJAaWQiOiI3IiwiaWQiOjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm5hbWUiOiLnu5/orqHlsYAiLCJkZXNjcmlwdGlvbiI6IlRKSl/nu5/orqHlsYAifSx7IkBpZCI6IjgiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjkiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjEwIiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxMSIsImlkIjoyNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibmFtZSI6Iue7j+a1juebuOWFs+e7hCIsImRlc2NyaXB0aW9uIjoiSkpYR1pf57uP5rWO55u45YWz57uEIn0seyJAaWQiOiIxMiIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiMTMiLCJpZCI6MiwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTMwIDE3OjUyOjM0IiwibmFtZSI6Iui0ouaUv+WxgCIsImRlc2NyaXB0aW9uIjoiQ1pKX+i0ouaUv+WxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTMsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNTo1NCIsIm5hbWUiOiLmsLTliKnlsYAiLCJkZXNjcmlwdGlvbiI6IlNMSl/msLTliKnlsYAifSx7IkBpZCI6IjE1IiwiaWQiOjExLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MzkiLCJuYW1lIjoi6K6h55Sf5aeUIiwiZGVzY3JpcHRpb24iOiJKU1df6K6h55Sf5aeUIn0seyJAaWQiOiIxNiIsImlkIjozMywiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuWuieebkeWxgCIsImRlc2NyaXB0aW9uIjoiQUpKX+WuieebkeWxgCJ9LHsiQGlkIjoiMTciLCJpZCI6NSwiY3JlYXRlX3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAxLTAzIDIyOjMzOjM1IiwibmFtZSI6Iua2iOmYsuWxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+a2iOmYsuWxgCJ9LHsiQGlkIjoiMTgiLCJpZCI6MzIsImNyZWF0ZV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjoyMCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNC0yMCAxMzo1NjowMiIsIm5hbWUiOiLkv6Horr/lsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/kv6Horr/lsYAifSx7IkBpZCI6IjE5IiwiaWQiOjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozOToyOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozOToyOCIsIm5hbWUiOiLnianku7flsYAiLCJkZXNjcmlwdGlvbiI6IldKSl/nianku7flsYAifSx7IkBpZCI6IjIwIiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn0seyJAaWQiOiIyMSIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiMjIiLCJpZCI6MTYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMC0xNiAyMTo0MTozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMi0wOCAxNDo1ODo1NiIsIm5hbWUiOiLpgq7mlL/lsYAiLCJkZXNjcmlwdGlvbiI6IllaSl/pgq7mlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjI4LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDM6MDgiLCJuYW1lIjoi5Z+O566h5bGAIiwiZGVzY3JpcHRpb24iOiJDR0pf5Z+O566h5bGAIn1dfSwiZXhwaXJlcyI6MTQ3OTg3MjQ0Mjc0NywiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.v+2Qyvs/jfLTXJ9g1OJP/qhfNxeTdxUiU98DJcd/zAw=";
    let headers = { "X-Auth-Token": token };
    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200');
    var eachMonthData = [

        {
            month: '1',
            data: [0, 0, 0, 0] //0 是总数 , 1是受伤人数 , 2 死亡人数 ,3是直接财产损失
        }, {
            month: '2',
            data: [0, 0, 0, 0]
        }, {
            month: '3',
            data: [0, 0, 0, 0]
        }, {
            month: '4',
            data: [0, 0, 0, 0]
        }, {
            month: '5',
            data: [0, 0, 0, 0]
        }, {
            month: '6',
            data: [0, 0, 0, 0]
        }, {
            month: '7',
            data: [0, 0, 0, 0]
        }, {
            month: '8',
            data: [0, 0, 0, 0]
        }, {
            month: '9',
            data: [0, 0, 0, 0]
        }, {
            month: '10',
            data: [0, 0, 0, 0]
        }, {
            month: '11',
            data: [0, 0, 0, 0]
        }, {
            month: '12',
            data: [0, 0, 0, 0]
        }
    ];

    var stationInfo = [{
            id: '3101',
            name: '南郊交警中队',
            value: 0,
            desc: ''
        }, {
            id: '3102',
            name: '港区交警中队',
            value: 0,
            desc: ''
        }, {
            id: '3103',
            name: '沙溪交警中队',
            value: 0,
            desc: ''
        }, {
            id: '3104',
            name: '浏河交警中队',
            value: 0,
            desc: ''
        }, {
            id: '3105',
            name: '城厢交警中队',
            value: 0,
            desc: ''
        }, {
            id: '3106',
            name: '璜泾交警中队',
            value: 0,
            desc: ''
        }, {
            id: '3107',
            name: '经济开发区交警中队',
            value: 0,
            desc: ''
        }

    ];

    //查看月份的每个接警单位接警数
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
        values: [{
            elseAccident: [],
            vehicle: [],
            nonVehicle: []
        }, {
            elseAccident: [],
            vehicle: [],
            nonVehicle: []
        }, {
            elseAccident: [],
            vehicle: [],
            nonVehicle: []
        }, {
            elseAccident: [],
            vehicle: [],
            nonVehicle: []
        }]
    };

    $scope.amountData = {
        amount: 0,
        elseIndicator: 0
    }

    $scope.sumData = {
        sumAccident: 0
    }

    $scope.pieTypeData1 = {
        data: [
            ['机动车事故', 0],
            ['非机动车事故', 0],
            ['其它交通事故', 0]
        ],
        unit: ''
    };

    $scope.barCountStationData1 = {
        categories: [],
        data: [],
        title: '受伤人数(人)',
        unit: '人',
        type: 0
    }

    var pieTypeData = [

        ['机动车事故', 0],
        ['非机动车事故', 0],
        ['其它交通事故', 0]
    ];

    var barCountStationData = {
        categories: [],
        data: []
    }

    $scope.thisMonthTotalData = {
        amount: 0,
        majorAccident: 0,
        largeAccident: 0,
        type: 0
    };

    $scope.lineChartData = {
        categories: [],
        data: [],
        name: '',
        title: '事故发生数(起)',
        unit: '起',
        type: 0
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
            console.log(data.data);
            var obj = data.data;
            if (obj != null) {
                var year_ = obj.year;
                var month_ = obj.month;
                console.log(month_);
                if ($scope.getDate.year > year_) {
                    $scope.getDate.year = year_; //
                    $scope.getDate.month = month_;
                } else if ($scope.getDate.year == year_) {
                    $scope.getDate.month = month_; //month_
                }

            }

            //---------------------------********api调用参数*********------------------------------------------

            var tableName = 'TrafficAccidentData';

            var advancedQueryConfig = {
                    "year": {
                        "value1": $scope.getDate.year,
                        "queryType": "eq",
                        "valueType": "innt"
                    }
                }
                //-----------------------------------处理函数返回data的函数，-------------------------------

            var processFunction = function(data) {
                console.log(data);
                //组装每月数据

                wireEachMonthData(data.data);
                //初始化图表数据
                initChartData(data.data);


                function initChartData(data) {
                    if (data.length == 0) {
                        alert('无数据 ！');
                        return;
                    } else if (eachMonthData[$scope.getDate.month - 1].police == 0 && eachMonthData[$scope.getDate.month - 1].criminal == 0 && eachMonthData[$scope.getDate.month - 1].trafficAccident == 0 && eachMonthData[$scope.getDate.month - 1].fire == 0 && eachMonthData[$scope.getDate.month - 1].elseCase == 0) {
                        alert('本月数据未录入 ！');
                        return;
                    }

                    createLineChartData();

                    createBarCountStationDataAndPieTypeData();

                };

                function wireEachMonthData(data) {
                    for (var i = 0; i < data.length; i++) {
                        var month = data[i].month;
                        var type = data[i].type.abbr;
                        eachMonthData[month - 1].data[type] = eachMonthData[month - 1].data[type] + data[i].elseAccident + data[i].vehicle + data[i].nonVehicle;

                        if (month == $scope.getDate.month) {
                            eachStationData.categories[type].cateData.push(data[i].trafficStation.name);
                            eachStationData.values[type].elseAccident.push(data[i].elseAccident);
                            eachStationData.values[type].vehicle.push(data[i].vehicle);
                            eachStationData.values[type].nonVehicle.push(data[i].nonVehicle);
                        }
                    }
                };


                function createPieChartData(data) {
                    var pieChartData = [
                        ['治安类', parseInt(data.police)],
                        ['刑事类', data.criminal],
                        ['交通事故类', data.trafficAccident],
                        ['火灾类', data.fire],
                        ['其它', data.elseCase]
                    ];
                    return pieChartData;
                };

                function createLineChartData() {
                    var nameArray = ['交通事故数(起)', '死亡人数(人)', '死亡人数(人)', '直接财产损失(元)'];
                    var s = 0;
                    for (var i = 0; i < $scope.getDate.month; i++) {
                        $scope.lineChartData.categories.push((i + 1) + '月');
                        $scope.lineChartData.data.push(eachMonthData[i].data[$scope.lineChartData.type]);
                        var temp = eachMonthData[i].data[$scope.lineChartData.type];
                        s = s + temp;
                        $scope.lineChartData.name = nameArray[$scope.lineChartData.type];
                    }
                    $scope.sumData.sumAccident = s;
                };


                function getStationName(id) {
                    for (var i = 0; i < stationInfo.length; i++) {
                        if (stationInfo[i].id == id)
                            return stationInfo[i].name;
                    }
                    return '未知';
                };

                function createBarCountStationDataAndPieTypeData() {
                    var elseAccident = 0,
                        vehicle = 0,
                        nonVehicle = 0,
                        elseAccident1 = 0,
                        vehicle1 = 0,
                        nonVehicle1 = 0;
                    for (var i = 0; i < eachStationData.categories[0].cateData.length; i++) {
                        barCountStationData.categories = eachStationData.categories[0].cateData;
                        $scope.barCountStationData1.categories = eachStationData.categories[1].cateData;
                        barCountStationData.data.push(eachStationData.values[0].elseAccident[i] + eachStationData.values[0].vehicle[i] + eachStationData.values[0].nonVehicle[i]);
                        $scope.barCountStationData1.data.push(eachStationData.values[1].elseAccident[i] + eachStationData.values[1].vehicle[i] + eachStationData.values[1].nonVehicle[i]);
                        elseAccident = elseAccident + eachStationData.values[0].elseAccident[i];
                        vehicle = vehicle + eachStationData.values[0].vehicle[i];
                        nonVehicle = nonVehicle + eachStationData.values[0].nonVehicle[i];
                        elseAccident1 = elseAccident1 + eachStationData.values[1].elseAccident[i];
                        vehicle1 = vehicle1 + eachStationData.values[1].vehicle[i];
                        nonVehicle1 = nonVehicle1 + eachStationData.values[1].nonVehicle[i];
                    }

                    pieTypeData[0][1] = vehicle;
                    pieTypeData[1][1] = nonVehicle;
                    pieTypeData[2][1] = elseAccident;
                    console.log(pieTypeData);
                    $scope.amountData.amount = elseAccident + vehicle + nonVehicle;

                    $scope.pieTypeData1.data[0][1] = vehicle1;
                    $scope.pieTypeData1.data[1][1] = nonVehicle1;
                    $scope.pieTypeData1.data[2][1] = elseAccident1;
                    $scope.amountData.elseIndicator = elseAccident1 + vehicle1 + nonVehicle1;
                    $scope.pieTypeData1.unit = '人';
                }

                $scope.typeChange1 = function(type) {
                    var elseAccident = 0,
                        vehicle = 0,
                        nonVehicle = 0;
                    var titles = ['', '受伤人数(人)', '死亡人数(人)', '直接财产损失(元)']
                    var units = ['', '人', '人', '元']
                    $scope.barCountStationData1.categories = eachStationData.categories[type].cateData;
                    $scope.barCountStationData1.data = [];
                    for (var i = 0; i < eachStationData.categories[0].cateData.length; i++) {
                        $scope.barCountStationData1.data.push(eachStationData.values[type].elseAccident[i] + eachStationData.values[type].vehicle[i] + eachStationData.values[type].nonVehicle[i]);
                        elseAccident = elseAccident + eachStationData.values[type].elseAccident[i];
                        vehicle = vehicle + eachStationData.values[type].vehicle[i];
                        nonVehicle = nonVehicle + eachStationData.values[type].nonVehicle[i];
                    }
                    $scope.amountData.elseIndicator = elseAccident + vehicle + nonVehicle;
                    $scope.barCountStationData1.unit = units[type];
                    $scope.barCountStationData1.title = titles[type];

                    $scope.pieTypeData1.data[0][1] = vehicle;
                    $scope.pieTypeData1.data[1][1] = nonVehicle;
                    $scope.pieTypeData1.data[2][1] = elseAccident;
                    $scope.pieTypeData1.unit = units[type];

                    $scope.pieType1 = { //第二个饼图
                        options: {
                            exporting: {
                                enabled: false
                            },
                            colors: newColors,

                            chart: {
                                plotBackgroundColor: null,
                                plotBorderWidth: null,
                                plotShadow: false
                            },
                            credits: {
                                enabled: false
                            },
                            title: {
                                text: $scope.getDate.year + "年" + $scope.getDate.month + "月份全市各类交通事故详情"
                            },
                            tooltip: {
                                pointFormat: '<b>{point.name}</b>:{point.y:1.f}(' + $scope.pieTypeData1.unit + ')</b>'
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

                            }
                        },
                        series: [{
                            type: 'pie',
                            name: '交通事故数',
                            data: $scope.pieTypeData1.data
                        }]
                    };

                    $scope.barCountStation1 = { //第二个柱状图
                        options: {
                            exporting: {
                                enabled: false
                            },
                            colors: newColors,
                            chart: {
                                type: 'bar'
                            },
                            xAxis: {
                                categories: $scope.barCountStationData1.categories,
                                title: {
                                    text: '交警支队',
                                    align: 'high'
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: $scope.barCountStationData1.title
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
                            text: $scope.getDate.year + "年" + $scope.getDate.month + '月份各交警中队受理交通事故详情'
                        },
                        series: [{
                            name: $scope.barCountStationData1.title,
                            data: $scope.barCountStationData1.data
                        }]
                    };



                }

                $scope.pieType1 = { //第二个饼图
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,

                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: $scope.getDate.year + "年" + $scope.getDate.month + "月份全市各类交通事故详情"
                        },
                        tooltip: {
                            pointFormat: '<b>{point.name}</b>:{point.y:1.f}(' + $scope.pieTypeData1.unit + ')</b>'
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

                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '交通事故数',
                        data: $scope.pieTypeData1.data
                    }]
                };

                $scope.barCountStation1 = { //第二个柱状图
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,
                        chart: {
                            type: 'bar'
                        },
                        xAxis: {
                            categories: $scope.barCountStationData1.categories,
                            title: {
                                text: '交警支队',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '受伤人数(人)'
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
                        text: $scope.getDate.year + "年" + $scope.getDate.month + '月份各交警中队受理交通事故详情'
                    },
                    series: [{
                        name: '受伤人数',
                        data: $scope.barCountStationData1.data
                    }]
                };

                $scope.pieType = { //第一个饼图
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,

                        chart: {
                            plotBackgroundColor: null,
                            plotBorderWidth: null,
                            plotShadow: false
                        },
                        credits: {
                            enabled: false
                        },
                        title: {
                            text: $scope.getDate.year + "年" + $scope.getDate.month + "月份全市各类交通事故详情"
                        },
                        tooltip: {
                            pointFormat: '<b>{point.name}</b>:{point.y:1.f}(起)</b>'
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

                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '交通事故数',
                        data: pieTypeData
                    }]
                };

                $scope.barCountStation = { //第一个柱状图
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,
                        chart: {
                            type: 'bar'
                        },
                        xAxis: {
                            categories: barCountStationData.categories,
                            title: {
                                text: '交警支队',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: '受理交通事故数(起)'
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
                        style: {
                            fontSize: '12px',
                            fontWeight: 'bold'
            },
                        text: $scope.getDate.year + "年" + $scope.getDate.month + '月份各交警中队受理交通事故数'
                    },
                    series: [{
                        name: '受理事故数',
                        data: barCountStationData.data
                    }]
                };
                $scope.typeChange = function(type) { //折线
                    $scope.lineChartData.categories = [];
                    $scope.lineChartData.data = [];
                    var titles = ['事故发生数(起)', '受伤人数(人)', '死亡人数(人)', '直接财产损失(万元)']
                    var units = ['起', '人', '人', '万元']
                    var s = 0;
                    var nameArray = ['交通事故数(起)', '受伤数(人)', '死亡人数(人)', '直接财产损失(万元)'];
                    for (var i = 0; i < $scope.getDate.month; i++) {
                        $scope.lineChartData.categories.push((i + 1) + '月');
                        if (type == 3) {
                            var temp = eachMonthData[i].data[$scope.lineChartData.type];
                            temp = temp / 10000;
                            $scope.lineChartData.data.push(temp);
                            s = s + temp;
                        } else {
                            $scope.lineChartData.data.push(eachMonthData[i].data[$scope.lineChartData.type]);
                            var tem = eachMonthData[i].data[$scope.lineChartData.type];
                            s = s + tem;
                        }
                        $scope.lineChartData.name = nameArray[$scope.lineChartData.type];
                        $scope.lineChartData.unit = units[type];
                        $scope.lineChartData.title = titles[type];

                    }
                    if (type == 3)
                        s = s.toFixed(4);
                    $scope.sumData.sumAccident = s;

                    $scope.lineChart = {
                        options: {
                            exporting: {
                                enabled: false
                            },

                            title: {
                                text: $scope.getDate.year + "年太仓市交通事故趋势图",
                                x: -20 //center
                            },
                            subtitle: {
                                text: '',
                                x: -20
                            },
                            xAxis: {
                                categories: $scope.lineChartData.categories
                            },
                            yAxis: {
                                title: {
                                    text: $scope.lineChartData.name
                                },
                                plotLines: [{
                                    value: 0,
                                    width: 1,
                                    color: '#808080'
                                }],
                                min: 0
                            },
                            tooltip: {
                                valueSuffix: ''
                            },
                            credits: {
                                enabled: false
                            },
                            legend: {
                                align: 'center', //水平方向位置
            verticalAlign: 'bottom', //垂直方向位置
            x: 0, //距离x轴的距离
            y: 0 //距离Y轴的距离
                            }
                        },
                        series: [{
                            name: $scope.lineChartData.name,
                            data: $scope.lineChartData.data
                        }]

                    };

                };





                //
                $scope.lineChart = {
                    options: {
                        exporting: {
                            enabled: false
                        },

                        title: {
                            text: $scope.getDate.year + "年太仓市交通事故趋势图",
                            x: -20 //center
                        },
                        subtitle: {
                            text: '',
                            x: -20
                        },
                        xAxis: {
                            categories: $scope.lineChartData.categories
                        },
                        yAxis: {
                            title: {
                                text: $scope.lineChartData.name
                            },
                            plotLines: [{
                                value: 0,
                                width: 1,
                                color: '#808080'
                            }],
                            min: 0
                        },
                        tooltip: {
                            valueSuffix: ''
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
                        name: $scope.lineChartData.name,
                        data: $scope.lineChartData.data
                    }]

                };


            };

            kpiDetailService.advancedQuery(tableName, advancedQueryConfig, processFunction);
        }
        //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('TrafficAccidentData', ["year", 'month'], processFunction1);

};
