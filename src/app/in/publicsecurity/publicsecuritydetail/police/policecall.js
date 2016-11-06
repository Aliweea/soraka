export default ($scope) => {
  'ngInject';
 
  $scope.height=$(window).height();
    $("#gdpchart").css("height",$scope.height*0.85);  
    $("#modal").css("height",$scope.height*0.85);  
$scope.GDP={
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
        text: 'GDP KPI详情',
        style:{
        fontWeight:'bold'
      }
       
    },
    xAxis: 
    {
        categories: ['一月', '二月', '三月', '四月','五月','六月','七月','八月','九月','十月','十一月','十二月']
    },
    yAxis: 
    { plotLines:[{
            color:'red',
            dashStyle:'solid',
            value:7.9,
            width:2,
            label:{
                text:'本年度GDP增长率预测值',
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
            text: '增长率％'
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
        name: '1',
        color:"rgb(205,130,61)",
        data: [7.9, 10.1, 9.5, 7.7,12.3,7.4,7.5,7.7,-3.3,9.9,2.4,null]
        },
        {
        name: '2',
        color:"rgb(51,181,88)",
        data: [8.9, 18.1, -18.1, 18.2,32.3,2.2,28.2,1.7,20.0,7.2,22.3,null]
        },
        {
        name: '3',
        color:"rgb(62,160,200)",
        data: [-3.2, -4.3, -8, -0.7,6.7,8.2,7.3,10.5,4.3,4.7,-0.9,null]
        }]
};
 
};