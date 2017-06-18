export default() => {
  'ngInject';
  
  const get_date = (timestamp, type, name) => {
    var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var q_names = new Array("第1", "第2", "第3", "第4");
    var d = new Date(timestamp);
    var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var curr_year = d.getFullYear();
    if(type=='YEARLY'){
      return curr_year + "年";
    }else if(type=='MONTHLY'){
      if (name.indexOf('GDP') > 0) {
        return curr_year + "年" + q_names[parseInt( curr_month / 3 )] + "季度";
      } else {
        return curr_year + "年" + m_names[curr_month] + "月份";
      }
    }else if (type=='DAYLY'){
      return curr_year + "年" + m_names[curr_month] + "月" + curr_date + "日" ;
    }else{
      return curr_year + "年" + m_names[curr_month] + "月" + curr_date + "日";
    }
  }
  return (kpi) => {
    var type = kpi.type;
    var name = kpi.name;
    var applyDate = kpi.data.applyDate;
    if(applyDate!=undefined){
      return get_date(applyDate, type, name);
    }else{
      return '无数据';
    }
  };
}