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
                        style: {
                            fontSize: '12px',
                            fontWeight: 'bold'
                        },
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

                $rootScope.loading = false;
            };
            $rootScope.loading = true;
            kpiDetailService.advancedQuery(tableName, advancedQueryConfig, processFunction);
        }
        //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('TrafficAccidentData', ["year", 'month'], processFunction1);

};
