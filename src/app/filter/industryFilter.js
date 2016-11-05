export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 48:
        out ="app.economydetail.industryvalue({id:48})";
        break;
      case 50:
        out ="app.economydetail.newindustryvalue({id:50})";
        break;
      case 52:
        out ="app.economydetail.industryprofit({id:52})";
        break;
      case 53:
        out ="app.economydetail.industrytax({id:53})";
        break;
      case 54:
        out ="app.economydetail.industrysale({id:54})";
        break;
      }
      return out;
  }
  
};