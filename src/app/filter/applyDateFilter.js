export default() => {
  'ngInject';
  
  const get_date = (timestamp, type) => {
    var m_names = new Array("01", "02", "03", "04", "05", "06", "07", "08", "09", "10", "11", "12");
    var d = new Date(timestamp);
    var curr_date = d.getDate();
      var curr_month = d.getMonth();
      var curr_year = d.getFullYear();
    if(type=='YEARLY'){
      return curr_year + "年";
    }else if(type=='MONTHLY'){
      return curr_year + "年" + m_names[curr_month] + "月份";
    }else if (type=='DAYLY'){
      return curr_year + "年" + m_names[curr_month] + "月" + curr_date + "日" ;
    }else{
      return curr_year + "年" + m_names[curr_month] + "月" + curr_date + "日";
    }
  }
  return (kpi) => {
    var type = kpi.type;
    var applyDate = kpi.data.applyDate;
    if(applyDate!=undefined){
      return get_date(applyDate, type);
    }else{
      return '无数据';
    }
  };
}