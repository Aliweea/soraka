export default ($scope,qService,kpiSpanRes,$rootScope,$stateParams) => {
    'ngInject';
    var token = "eyJhY2NvdW50Ijp7IkBpZCI6IjEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNS0wNS0xNCAxOTo1MToxNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wNy0wNSAxNDozNDozMyIsImFjY291bnQiOiJzeXN0ZW0iLCJwYXNzd29yZCI6bnVsbCwidGl0bGUiOiLnrqHnkIblkZgiLCJuYW1lIjoi566h55CG5ZGYIiwic3lzdGVtTmFtZSI6bnVsbCwibW9iaWxlUGhvbmUiOm51bGwsIndvcmtQaG9uZSI6bnVsbCwicm9sZSI6IkFETUlOSVNUUkFUT1IiLCJkZXBhcnRtZW50cyI6W3siQGlkIjoiMiIsImlkIjo5LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6Mzk6MjgiLCJuYW1lIjoi54mp5Lu35bGAIiwiZGVzY3JpcHRpb24iOiJXSkpf54mp5Lu35bGAIn0seyJAaWQiOiIzIiwiaWQiOjE1LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6MzY6MzAiLCJuYW1lIjoi5Zu95Zyf5bGAIiwiZGVzY3JpcHRpb24iOiJHVEpf5Zu95Zyf5bGAIn0seyJAaWQiOiI0IiwiaWQiOjI3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6MDciLCJuYW1lIjoi5raI6Ziy5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJYRkREX+a2iOmYsuWkp+mYnyJ9LHsiQGlkIjoiNSIsImlkIjoyOCwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQzOjA4IiwibmFtZSI6IuWfjueuoeWxgCIsImRlc2NyaXB0aW9uIjoiQ0dKX+WfjueuoeWxgCJ9LHsiQGlkIjoiNiIsImlkIjoxNiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEwLTE2IDIxOjQxOjM0IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTAyLTA4IDE0OjU4OjU2IiwibmFtZSI6IumCruaUv+WxgCIsImRlc2NyaXB0aW9uIjoiWVpKX+mCruaUv+WxgCJ9LHsiQGlkIjoiNyIsImlkIjoxMiwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTE5IDE2OjIxOjA3IiwibmFtZSI6IueOr+S/neWxgCIsImRlc2NyaXB0aW9uIjoiSEJKX+eOr+S/neWxgCJ9LHsiQGlkIjoiOCIsImlkIjozMSwiY3JlYXRlX3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibW9kaWZ5X3RpbWUiOiIyMDE1LTA0LTIwIDEzOjU2OjIzIiwibmFtZSI6IuWNq+eUn+WxgCIsImRlc2NyaXB0aW9uIjoiV1NKX+WNq+eUn+WxgCJ9LHsiQGlkIjoiOSIsImlkIjoyNSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTMxIDA5OjEyOjQ4IiwibmFtZSI6Iue7j+a1juebuOWFs+e7hCIsImRlc2NyaXB0aW9uIjoiSkpYR1pf57uP5rWO55u45YWz57uEIn0seyJAaWQiOiIxMCIsImlkIjoyMiwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQwOjEwIiwibmFtZSI6IuWFrOWuieWxgCIsImRlc2NyaXB0aW9uIjoiR0FKX+WFrOWuieWxgCJ9LHsiQGlkIjoiMTEiLCJpZCI6MjYsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozODozNCIsIm5hbWUiOiLkurrnpL7lsYAiLCJkZXNjcmlwdGlvbiI6IlJTSl/kurrnpL7lsYAifSx7IkBpZCI6IjEyIiwiaWQiOjMyLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MjAiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5L+h6K6/5bGAIiwiZGVzY3JpcHRpb24iOiJYRkpf5L+h6K6/5bGAIn0seyJAaWQiOiIxMyIsImlkIjoyOSwiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjQ0OjAyIiwibmFtZSI6IuaVmeiCsuWxgCIsImRlc2NyaXB0aW9uIjoiSllKX+aVmeiCsuWxgCJ9LHsiQGlkIjoiMTQiLCJpZCI6MTEsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzozOSIsIm5hbWUiOiLorqHnlJ/lp5QiLCJkZXNjcmlwdGlvbiI6IkpTV1/orqHnlJ/lp5QifSx7IkBpZCI6IjE1IiwiaWQiOjUsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0wMyAyMjozMzozNSIsIm5hbWUiOiLmtojpmLLlsYAiLCJkZXNjcmlwdGlvbiI6IlhGSl/mtojpmLLlsYAifSx7IkBpZCI6IjE2IiwiaWQiOjMzLCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5a6J55uR5bGAIiwiZGVzY3JpcHRpb24iOiJBSkpf5a6J55uR5bGAIn0seyJAaWQiOiIxNyIsImlkIjo2LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDE6NTciLCJuYW1lIjoi5biC5Lqk6K2m5aSn6ZifIiwiZGVzY3JpcHRpb24iOiJTSkpERF/luILkuqTorablpKfpmJ8ifSx7IkBpZCI6IjE4IiwiaWQiOjcsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjozNzowNSIsIm5hbWUiOiLnu5/orqHlsYAiLCJkZXNjcmlwdGlvbiI6IlRKSl/nu5/orqHlsYAifSx7IkBpZCI6IjE5IiwiaWQiOjE3LCJjcmVhdGVfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJtb2RpZnlfdGltZSI6IjIwMTQtMTItMjkgMTI6NDU6MTQiLCJuYW1lIjoi57uP5L+h5aeUIiwiZGVzY3JpcHRpb24iOiJKWFdf57uP5L+h5aeUIn0seyJAaWQiOiIyMCIsImlkIjoxMywiY3JlYXRlX3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibW9kaWZ5X3RpbWUiOiIyMDE0LTEyLTI5IDEyOjM1OjU0IiwibmFtZSI6IuawtOWIqeWxgCIsImRlc2NyaXB0aW9uIjoiU0xKX+awtOWIqeWxgCJ9LHsiQGlkIjoiMjEiLCJpZCI6MzAsImNyZWF0ZV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm1vZGlmeV90aW1lIjoiMjAxNC0xMi0yOSAxMjo0NTo1MSIsIm5hbWUiOiLkuqTpgJrlsYAiLCJkZXNjcmlwdGlvbiI6IkpUSl/kuqTpgJrlsYAifSx7IkBpZCI6IjIyIiwiaWQiOjIsImNyZWF0ZV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm1vZGlmeV90aW1lIjoiMjAxNS0wMS0zMCAxNzo1MjozNCIsIm5hbWUiOiLotKLmlL/lsYAiLCJkZXNjcmlwdGlvbiI6IkNaSl/otKLmlL/lsYAifSx7IkBpZCI6IjIzIiwiaWQiOjM0LCJjcmVhdGVfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJtb2RpZnlfdGltZSI6IjIwMTUtMDQtMjAgMTM6NTY6MDIiLCJuYW1lIjoi5rCU6LGh5bGAIiwiZGVzY3JpcHRpb24iOiJRWEpf5rCU6LGh5bGAIn1dfSwiZXhwaXJlcyI6MTQ3ODg2MDM0NjcyMywiZ3JhbnRlZEF1dGhzIjpbIlJPTEVfQURNSU5JU1RSQVRPUiJdLCJhY2NvdW50Tm9uTG9ja2VkIjp0cnVlLCJhY2NvdW50Tm9uRXhwaXJlZCI6dHJ1ZSwiY3JlZGVudGlhbHNOb25FeHBpcmVkIjp0cnVlLCJlbmFibGVkIjp0cnVlLCJ1c2VybmFtZSI6InN5c3RlbSIsInBhc3N3b3JkIjpudWxsfQ==.R612aMpkC1yeJcajKjX21a+5MGFOCi+plIR9nCngfuM=";

    $scope.height=$(window).height();
    $("#shortChart").css("height",$scope.height*0.85);
    $("#longChart").css("height",$scope.height*0.85);
    $("#modal").css("height",$scope.height*0.85);
    console.log($rootScope.LandDetailDate);
    var currentDate=$rootScope.LandDetailDate["_"+$stateParams.id];//获取时间
    var year=moment(currentDate).format('YYYY');
    console.log(year);
    var shortStartDate=(year-3)+'-01-01';
    var longStartDate=(year-5)+'-01-01';
    var endDate=year+'-12-31';
    $scope.shortText='三年走势';
    $scope.longText='五年走势';
    // $scope.month =[];
    // console.log(moment($rootScope.financeinfo.applyDate).format('YYYY-MM-DD'));
    // $scope.month[0]=moment($rootScope.financeinfo.applyDate).format('YYYY-MM-DD');
    // var year = moment($rootScope.financeinfo.applyDate).format('YYYY');
    // var realmonth = moment($rootScope.financeinfo.applyDate).format('MM');
    // var month = moment($rootScope.financeinfo.applyDate).format('MM')-3;
    // var smonth = moment($rootScope.financeinfo.applyDate).format('M');
    // var day = moment($rootScope.financeinfo.applyDate).format('DD');
    // $scope.month[2]=year+'-0'+month+'-'+day;
    // $scope.month[0]=year+'-'+realmonth+'-'+'31';
    // $scope.month[1]=year+'-01-01';
    // var xmonth = ['一月','二月','三月','四月','五月','六月','七月','八月','九月','十月','十一月','十二月'];
    // console.log($scope.month[2]);

    /**
     * 获取所有的kpi数据
     * 填充charts
     */
    qService.httpGet(kpiSpanRes.spankpi,{'kpiID':$stateParams.id,'start':shortStartDate,'end':endDate},{"X-Auth-Token":token}).then((data) => {
        $scope.evaluatetime = year+'年';
        var i = data.data.data.value.length;
        $scope.evaluatename = data.data.name;
        $scope.evaluatevalue = data.data.data.value[i-1];
        $scope.evaluatetarget = data.data.data.target[i-1];
        $scope.kpiText = data.data.name;
        data.data.data.value.splice(i-2,1);
        data.data.data.applyDate.splice(i-2,1);
        data.data.data.target.splice(i-2,1);
        i = data.data.data.value.length;
        console.log(data);
        var xYears=[];
        var valueData=[];
        var targetData=[];
        for (j=0;j<i;j++){
            xYears[j]=moment(data.data.data.applyDate[j]).format('YYYY年');
            valueData[j]=(parseFloat(data.data.data.value[j])/100000000).toFixed(1);
            targetData[j]=(parseFloat(data.data.data.value[j])/100000000).toFixed(1)
        }
        $scope.shortChart={
            options:
            {
                chart:
                {
                    type:'spline'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            credits:{
                enabled:false,
            },
            title:
            {
                text: data.data.tag+'KPI详情',
                style:{
                    fontWeight:'bold'
                }

            },
            xAxis:
            {
                categories: xYears,
            },
            yAxis:
            { plotLines:[{
                color:'red',
                dashStyle:'solid',
                value:7.9,
                width:2,
                label:{
                    text:'',
                    align:'right',
                    x:10,
                    style: {
                        fontSize: '8px',
                        fontWeight: 200
                    }
                }
            }],
                title:
                {
                    text: '年度经营性用地土地出让金额(亿元)'
                },


            },
            tooltip:
            {
                valueSuffix: ''
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series:[{
                name: 'KPI值',
                color:"rgb(205,130,61)",
                data: valueData
            },
                {
                    name: '参考值',
                    color:"rgb(51,181,88)",
                    data: targetData
                }]
        };


    });
    qService.httpGet(kpiSpanRes.spankpi,{'kpiID':$stateParams.id,'start':longStartDate,'end':endDate},{"X-Auth-Token":token}).then((data) => {
        $scope.evaluatetime = year+'年';
        var i = data.data.data.value.length;
        data.data.data.value.splice(i-2,1);
        data.data.data.applyDate.splice(i-2,1);
        data.data.data.target.splice(i-2,1);
        i = data.data.data.value.length;
        console.log(data);
        var xYears=[];
        var valueData=[];
        var targetData=[];
        for (j=0;j<i;j++){
            xYears[j]=moment(data.data.data.applyDate[j]).format('YYYY年');
            valueData[j]=(parseFloat(data.data.data.value[j])/100000000).toFixed(1);
            targetData[j]=(parseFloat(data.data.data.value[j])/100000000).toFixed(1)
        }
        $scope.shortChart={
            options:
            {
                chart:
                {
                    type:'spline'
                },
                tooltip: {
                    style: {
                        padding: 10,
                        fontWeight: 'bold'
                    }
                }
            },
            credits:{
                enabled:false,
            },
            title:
            {
                text: data.data.tag+'KPI详情',
                style:{
                    fontWeight:'bold'
                }

            },
            xAxis:
            {
                categories: xYears,
            },
            yAxis:
            { plotLines:[{
                color:'red',
                dashStyle:'solid',
                value:7.9,
                width:2,
                label:{
                    text:'',
                    align:'right',
                    x:10,
                    style: {
                        fontSize: '8px',
                        fontWeight: 200
                    }
                }
            }],
                title:
                {
                    text: '年度经营性用地土地出让金额(亿元)'
                },


            },
            tooltip:
            {
                valueSuffix: ''
            },
            legend:
            {
                layout: 'vertical',
                align: 'right',
                verticalAlign: 'middle',
                borderWidth: 0
            },
            series:[{
                name: 'KPI值',
                color:"rgb(205,130,61)",
                data: valueData
            },
                {
                    name: '参考值',
                    color:"rgb(51,181,88)",
                    data: targetData
                }]
        };


    });

};