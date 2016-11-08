export default () => {
  'ngInject';

  return{
    columnColors:() => {
       return ['#7CADDF', '#327EBD', '#195489', '#1FC22B', '#FB9705', '#F26200'];
    },
    pieColors:() => {
      return ['#0787C8', '#3795BC', '#1FC22B', '#B5DF15', '#F6CD00', '#FB9705','#F26200'];
    },
    lineColors:() => {
      return ['#7CADDF', '#7CADDF', '#195489', '#1FC22B', '#FB9705', '#F26200'];
    },
    compareColors:() => {
       return ['#3795BC', '#FB9705', '#195489', '#F26200'];
     },
     advanceQueryObj:(queryType, valueType, values) => {
      var map = {
      queryType: queryType,
      valueType: valueType
      };
        for (var i = 0; i < values.length; i++) {
          var key = 'value'+ (i+1);
          map[key] = values[i];
        };
        return map;
     },
  };
}