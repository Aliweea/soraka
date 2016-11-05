export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 44:
        out ="app.economydetail.savemoneyRMB({id:44})";
        break;
      case 46:
        out ="app.economydetail.loanmoneyRMB({id:46})";
        break;
      case 45:
        out ="app.economydetail.savemoney({id:45})";
        break;
      case 47:
        out ="app.economydetail.loanmoney({id:47})";
        break;
      }
      return out;
  }
  
};