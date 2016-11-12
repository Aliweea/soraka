export default ($scope, $state, dateService, dataDetailFactory, qService, kpiDetailService) => {
    'ngInject';
    const jQueryDOMToDos = () => {
        $(".navbar2position").hide(0); // 显示当前位置
        $(".navbar2return").show(0); // 显示返回按钮
        $(".navTopShowMark").hide(0); // 隐藏KPI状态 KPI分类
        $('.navTopShowPolice').show(0); // 显示公安类型
        $('#showshort').focus(); // 获取默认焦点

    }();

    let token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo1LCJjcmVhdGVfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDEtMDMgMjI6MzM6MzUiLCJuYW1lIjoi5raI6Ziy5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5raI6Ziy5bGAIn0seyJAaWQiOiIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn0seyJAaWQiOiI0IiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI1IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiI2IiwiaWQiOjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MTo1NyIsIm5hbWUiOiLluILkuqTorablpKfpmJ8iLCJkZXNjcmlwdGlvbiI6IlNKSkREX+W4guS6pOitpuWkp+mYnyJ9LHsiQGlkIjoiNyIsImlkIjo3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzc6MDUiLCJuYW1lIjoi57uf6K6h5bGAIiwiZGVzY3JpcHRpb24iOiJUSkpf57uf6K6h5bGAIn0seyJAaWQiOiI4IiwiaWQiOjEzLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzU6NTQiLCJuYW1lIjoi5rC05Yip5bGAIiwiZGVzY3JpcHRpb24iOiJTTEpf5rC05Yip5bGAIn0seyJAaWQiOiI5IiwiaWQiOjE2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTAtMTYgMjE6NDE6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDItMDggMTQ6NTg6NTYiLCJuYW1lIjoi6YKu5pS/5bGAIiwiZGVzY3JpcHRpb24iOiJZWkpf6YKu5pS/5bGAIn0seyJAaWQiOiIxMCIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIxMSIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiMTIiLCJpZCI6MjksImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NDowMiIsIm5hbWUiOiLmlZnogrLlsYAiLCJkZXNjcmlwdGlvbiI6IkpZSl/mlZnogrLlsYAifSx7IkBpZCI6IjEzIiwiaWQiOjI2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzg6MzQiLCJuYW1lIjoi5Lq656S+5bGAIiwiZGVzY3JpcHRpb24iOiJSU0pf5Lq656S+5bGAIn0seyJAaWQiOiIxNCIsImlkIjozMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIwIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjAyIiwibmFtZSI6IuS/oeiuv+WxgCIsImRlc2NyaXB0aW9uIjoiWEZKX+S/oeiuv+WxgCJ9LHsiQGlkIjoiMTUiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjE2IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiMTciLCJpZCI6MjgsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0MzowOCIsIm5hbWUiOiLln47nrqHlsYAiLCJkZXNjcmlwdGlvbiI6IkNHSl/ln47nrqHlsYAifSx7IkBpZCI6IjE4IiwiaWQiOjMxLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjMiLCJuYW1lIjoi5Y2r55Sf5bGAIiwiZGVzY3JpcHRpb24iOiJXU0pf5Y2r55Sf5bGAIn0seyJAaWQiOiIxOSIsImlkIjoxNywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ1OjE0IiwibmFtZSI6Iue7j+S/oeWnlCIsImRlc2NyaXB0aW9uIjoiSlhXX+e7j+S/oeWnlCJ9LHsiQGlkIjoiMjAiLCJpZCI6MjUsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0zMSAwOToxMjo0OCIsIm5hbWUiOiLnu4/mtY7nm7jlhbPnu4QiLCJkZXNjcmlwdGlvbiI6IkpKWEdaX+e7j+a1juebuOWFs+e7hCJ9LHsiQGlkIjoiMjEiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjIyLCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDA6MTAiLCJuYW1lIjoi5YWs5a6J5bGAIiwiZGVzY3JpcHRpb24iOiJHQUpf5YWs5a6J5bGAIn1dfSwiZXhwaXJlcyI6MTQ3ODk5NzEwMDA0NSwiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.zfXDZ0KX6J/Yj3Ups5sAeJCS2Sl3LU1uURWXHOdCSA0=";
    let headers = { "X-Auth-Token": token };

    var newColors = new Array('#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705', '#F26200');
    var eachMonthData = [

        {
            month: '1',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '2',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '3',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '4',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '5',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '6',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '7',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '8',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '9',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '10',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '11',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }, {
            month: '12',
            police: 0,
            criminal: 0,
            trafficAccident: 0,
            fire: 0,
            elseCase: 0
        }
    ];

    var stationInfo = [{
            id: '3005',
            name: '港区派出所',
            value: 0,
            desc: '121.2059|31.60332|无|53701356|胡月林'
        }, {
            id: '3006',
            name: '沙溪派出所',
            value: 0,
            desc: '121.05642|31.57744|无|53212921|何惠忠'
        }, {
            id: '3003',
            name: '经济开发区派出所',
            value: 0,
            desc: '121.12173|31.4561|无|53561516|戴学忠'
        },

        {
            id: '3002',
            name: '陆渡派出所',
            value: 0,
            desc: '121.18237|31.48157|无|53458110|沈卫斌'
        },

        {
            id: '3004',
            name: '璜泾派出所',
            value: 0,
            desc: '121.09727|31.64911|无|53811054|徐达'
        },


        {
            id: '3007',
            name: '城西派出所',
            value: 0,
            desc: '121.09999|31.4416|无|53536690|何国清'
        }, {
            id: '3008',
            name: '浏家港派出所',
            value: 0,
            desc: '121.2504|31.56292|无|53645337|冯月清'
        }, {
            id: '3009',
            name: '浏河派出所',
            value: 0,
            desc: '121.27199|31.51266|无|53611136|王晖'
        }, {
            id: '3010',
            name: '板桥派出所',
            value: 0,
            desc: '121.13344|31.49177|无|53441632|吴强'
        }, {
            id: '3011',
            name: '科教新城派出所',
            value: 0,
            desc: '121.11456|31.42972|无|53405229|毛晓波'
        }, {
            id: '3012',
            name: '城中派出所',
            value: 0,
            desc: '121.10104|31.45055|无|53514708|孙靖'
        }, {
            id: '3013',
            name: '双凤派出所',
            value: 0,
            desc: '121.02222|31.51791|无|53439673|李建民'
        }, {
            id: '3014',
            name: '金仓湖派出所',
            value: 0,
            desc: '121.0849|31.50502|无|无|郁宏兵'
        }, {
            id: '3015',
            name: '公交派出所',
            value: 0,
            desc: '121.09379|31.47528|无|无|戴建国'
        }, {
            id: '3016',
            name: '金浪派出所',
            value: 0,
            desc: '121.15255|31.61736|无|53781138|陆建兵'
        }, {
            id: '3017',
            name: '水上派出所',
            value: 0,
            desc: '121.10141|31.43555|无|53781138|时剑清'
        }, {
            id: '3501',
            name: '交巡警城厢中队',
            value: 0,
            desc: ''
        }, {
            id: '3502',
            name: '交巡警事故处理中队',
            value: 0,
            desc: ''
        }, {
            id: '3503',
            name: '交巡警南郊中队',
            value: 0,
            desc: ''
        }, {
            id: '3504',
            name: '交巡警经济开发区中队',
            value: 0,
            desc: ''
        }, {
            id: '3505',
            name: '交巡警沙溪中队',
            value: 0,
            desc: ''
        }, {
            id: '3506',
            name: '交巡警港区中队',
            value: 0,
            desc: ''
        }, {
            id: '3507',
            name: '交通巡逻警察大队',
            value: 0,
            desc: ''
        }, {
            id: '3508',
            name: '交巡警璜泾中队',
            value: 0,
            desc: ''
        }, {
            id: '3509',
            name: '交巡警浏河中队',
            value: 0,
            desc: ''
        }, {
            id: '3001',
            name: '岳王派出所',
            value: 0,
            desc: '121.14612|31.54969|无|53301130|陈楠'
        }, {
            id: '3027',
            name: '公安局指挥中心',
            value: 0,
            desc: ''
        }, {
            id: '3028',
            name: '公安局治安警察大队',
            value: 0,
            desc: ''
        }, {
            id: '3029',
            name: '公安局经济犯罪侦查大队',
            value: 0,
            desc: ''
        }, {
            id: '3030',
            name: '浏河港边防派出所',
            value: 0,
            desc: ''
        }, {
            id: '3031',
            name: '公安局刑事警察大队',
            value: 0,
            desc: ''
        }, {
            id: '3032',
            name: '公安局出入境管理大队',
            value: 0,
            desc: ''
        }, {
            id: '3033',
            name: '公安局网络警察大队',
            value: 0,
            desc: ''
        }, {
            id: '3034',
            name: '公安局巡防大队',
            value: 0,
            desc: ''
        }, {
            id: '3035',
            name: '交巡警秩序管理科',
            value: 0,
            desc: ''
        }
    ];

    //查看月份的每个接警单位接警数
    var eachStationData = [{
        categories: [],
        values: []
    }, {
        categories: [],
        values: []
    }, {
        categories: [],
        values: []
    }];

    var lineChartData = {
        categories: [],
        series: [{
            name: '治安类',
            data: []
        }, {
            name: '刑事类',
            data: []
        }, {
            name: '交通事故类',
            data: []
        }, {
            name: '火灾类',
            data: []
        }, {
            name: '其它',
            data: []
        }]
    };

    var pieChartData = {};

    var barTypeChartData = {
        categories: ['治安类', '刑事类', '交通事故类', '火灾类', '其它'],
        data: [0, 0, 0, 0, 0]
    };

    $scope.totalData = {
        month: 0,
        checkModel: 2
    };
    var dateTime = new Date(dateService.getSystemTime());
    console.log(dateTime);
    //---------------------------********系统时间获取*********------------------------------------------
    //var dateTime = new Date("2014-03-12T14:57:55.091Z");
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
                console.log(month_);
                if ($scope.getDate.year > year_) {
                    $scope.getDate.year = year_;
                    $scope.getDate.month = month_;
                } else if ($scope.getDate.year == year_) {
                    $scope.getDate.month = month_;
                }

            }

            //---------------------------********api调用参数*********------------------------------------------
            var tableName = 'PoliceCallData';

            var advancedQueryConfig = {
                    "year": {
                        "value1": $scope.getDate.year,
                        "queryType": "eq",
                        "valueType": "innt"
                    }
                }
                //处理函数返回data的函数，就是原来的http.success()里面的function

            var processFunction = function(data) {
                console.log(JSON.stringify(data));
                //组装每月数据

                wireEachMonthData(data.data);
                //初始化图表数据
                initChartData(data.data);


                function initChartData(data) {
                    if (data.length == 0) {
                        alert('本年度数据未录入 ！');
                        // var processFunction1 = function(data){
                        //    console.log(data);
                        //   }
                        //   kpiDetailService.getLastestObject('PoliceCallData',["year",'month'],processFunction1);
                        return;
                    } else if (eachMonthData[$scope.getDate.month - 1].police == 0 && eachMonthData[$scope.getDate.month - 1].criminal == 0 && eachMonthData[$scope.getDate.month - 1].trafficAccident == 0 && eachMonthData[$scope.getDate.month - 1].fire == 0 && eachMonthData[$scope.getDate.month - 1].elseCase == 0) {
                        alert('本月数据未录入 ！');

                        return;
                    } else {

                        wireEachStationData();

                        createLineChartData();

                        createBarTypeChartData();

                        $scope.totalData.month = eachMonthData[$scope.getDate.month - 1].police + eachMonthData[$scope.getDate.month - 1].criminal + eachMonthData[$scope.getDate.month - 1].trafficAccident + eachMonthData[$scope.getDate.month - 1].fire + eachMonthData[$scope.getDate.month - 1].elseCase;

                        pieChartData = createPieChartData(eachMonthData[$scope.getDate.month - 1]);
                    }


                };

                function wireEachMonthData(PoliceCallData) {
                    for (var i = 0; i < PoliceCallData.length; i++) {
                        var month = PoliceCallData[i].month;
                        eachMonthData[month - 1].police = eachMonthData[month - 1].police + PoliceCallData[i].police;
                        eachMonthData[month - 1].criminal = eachMonthData[month - 1].criminal + PoliceCallData[i].criminal;
                        eachMonthData[month - 1].trafficAccident = eachMonthData[month - 1].trafficAccident + PoliceCallData[i].trafficAccident;
                        eachMonthData[month - 1].fire = eachMonthData[month - 1].fire + PoliceCallData[i].fire;
                        eachMonthData[month - 1].elseCase = eachMonthData[month - 1].elseCase + PoliceCallData[i].elseCase;

                        if (month == $scope.getDate.month) {
                            var id = PoliceCallData[i].policeStation_id;
                            eachStationData[2].categories.push(getStationName(id));
                            eachStationData[2].values.push(PoliceCallData[i].police + PoliceCallData[i].criminal + PoliceCallData[i].trafficAccident + PoliceCallData[i].fire + PoliceCallData[i].elseCase);
                        }
                    }
                };

                function createBarTypeChartData() {
                    for (var i = 0; i < $scope.getDate.month; i++) {
                        barTypeChartData.data[0] = barTypeChartData.data[0] + eachMonthData[i].police;
                        barTypeChartData.data[1] = barTypeChartData.data[1] + eachMonthData[i].criminal;
                        barTypeChartData.data[2] = barTypeChartData.data[2] + eachMonthData[i].trafficAccident;
                        barTypeChartData.data[3] = barTypeChartData.data[3] + eachMonthData[i].fire;
                        barTypeChartData.data[4] = barTypeChartData.data[4] + eachMonthData[i].elseCase;
                    }
                }

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
                    for (var i = 0; i < $scope.getDate.month; i++) {
                        lineChartData.categories.push((i + 1) + '月');
                        lineChartData.series[0].data.push(eachMonthData[i].police);
                        lineChartData.series[1].data.push(eachMonthData[i].criminal);
                        lineChartData.series[2].data.push(eachMonthData[i].trafficAccident);
                        lineChartData.series[3].data.push(eachMonthData[i].fire);
                        lineChartData.series[4].data.push(eachMonthData[i].elseCase);
                    }
                };

                // function setDateTime(dateTime){
                //  $scope.getDate.year = dateTime.getFullYear();
                //  var month = 
                //  $scope.getDate.month = 
                // };

                function getStationName(id) {
                    for (var i = 0; i < stationInfo.length; i++) {
                        if (stationInfo[i].id == id)
                            return stationInfo[i].name;

                    }
                    return '未知';
                };

                function wireEachStationData() {
                    for (var i = 0; i < eachStationData[2].values.length; i++) {
                        if (eachStationData[2].values[i] > 1000) {
                            eachStationData[0].values.push(eachStationData[2].values[i]);
                            eachStationData[0].categories.push(eachStationData[2].categories[i]);
                        } else {
                            eachStationData[1].values.push(eachStationData[2].values[i]);
                            eachStationData[1].categories.push(eachStationData[2].categories[i]);
                        }
                    }
                };

                $scope.typeChange = function(id) {
                    //条形图
                    $scope.kpiBarChart = {
                        options: {
                            exporting: {
                                enabled: false
                            },
                            colors: newColors,
                            chart: {
                                type: 'bar'
                            },
                            xAxis: {
                                categories: eachStationData[id].categories,
                                title: {
                                    text: '接警单位',
                                    align: 'high'
                                }
                            },
                            yAxis: {
                                min: 0,
                                title: {
                                    text: "接警案件数(起)"
                                },
                                labels: {
                                    overflow: 'justify'
                                }
                            },
                            tooltip: {
                                valueSuffix: '(起)'
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
                            },
                            title: {
                                text: $scope.getDate.year + "年" + $scope.getDate.month + "月份太仓市各接警单位接处警案件数"
                            },
                        },

                        series: [{
                            name: '接警案件数',
                            data: eachStationData[id].values
                        }]
                    };
                };


                $scope.barTypeChart = {
                    options: {
                        exporting: {
                            enabled: false
                        },
                        chart: {
                            type: 'bar'
                        },
                        title: {
                            text: "各类报警案件总数"
                        },
                        subtitle: {
                            text: ''
                        },
                        xAxis: {
                            categories: barTypeChartData.categories,
                            title: {
                                text: null
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: "各类报警案件总数"
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: ' (起)'
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
                        },
                    },
                    series: [{
                        name: '案件数',
                        data: barTypeChartData.data
                    }]

                };



                //
                $scope.lineChart = {
                    options: {
                        exporting: {
                            enabled: false
                        },

                        title: {
                            text: $scope.getDate.year + "年太仓市公安局各类报警案件趋势图",
                            x: -20 //center
                        },
                        subtitle: {
                            text: '',
                            x: -20
                        },
                        xAxis: {
                            categories: lineChartData.categories
                        },
                        yAxis: {
                            title: {
                                text: '报警数 (起)'
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
                            layout: 'vertical',
                            align: 'right',
                            verticalAlign: 'middle',
                            borderWidth: 0
                        }
                    },
                    series: lineChartData.series

                };

                //饼图
                $scope.kpiPieChart = {
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
                            text: $scope.getDate.year + "年" + $scope.getDate.month + "月份太仓市公安局各类报警案件统计分析"
                        },
                        tooltip: {
                            pointFormat: '<b>接警数</b>:{point.y:1.f}(起)</b>'
                        },
                        plotOptions: {
                            pie: {
                                allowPointSelect: true,
                                cursor: 'pointer',
                                dataLabels: {
                                    enabled: true,
                                    color: '#000000',
                                    connectorColor: '#000000',
                                    format: '<b>{point.name}</b>:{point.percentage:.1f} %'
                                },
                                showInLegend: true
                            }
                        }
                    },
                    series: [{
                        type: 'pie',
                        name: '刑事案件数',
                        data: pieChartData
                    }]

                };

                //条形图
                $scope.kpiBarChart = {
                    options: {
                        exporting: {
                            enabled: false
                        },
                        colors: newColors,
                        chart: {
                            type: 'bar'
                        },
                        xAxis: {
                            categories: eachStationData[$scope.totalData.checkModel].categories,
                            title: {
                                text: '接警单位',
                                align: 'high'
                            }
                        },
                        yAxis: {
                            min: 0,
                            title: {
                                text: "接警案件数(起)"
                            },
                            labels: {
                                overflow: 'justify'
                            }
                        },
                        tooltip: {
                            valueSuffix: '(起)'
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
                        },
                        title: {
                            text: $scope.getDate.year + "年" + $scope.getDate.month + "月份太仓市各接警单位接处警案件数"
                        },
                    },

                    series: [{
                        name: '接警案件数',
                        data: eachStationData[$scope.totalData.checkModel].values
                    }]
                };

            };

            kpiDetailService.advancedQuery(tableName, advancedQueryConfig, processFunction);
        }
        //---------------------------********api调用参数*********------------------------------------------
    kpiDetailService.getLastestObject('PoliceCallData', ["year", 'month'], processFunction1);




};
