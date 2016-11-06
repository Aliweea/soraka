export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 1000:
        out ="app.economydetail.financein({id:1000})";
        break;
      case 1001:
        out ="app.economydetail.financeinIndex({id:1001})";
        break;
      case 1002:
        out ="app.economydetail.localfinancein({id:1002})";
        break;
      case 1003:
        out ="app.economydetail.localfinanceinIndex({id:1003})";
        break;
      case 1004:
        out ="app.economydetail.monthfinancein({id:1004})";
        break;
      case 1005:
        out ="app.economydetail.monthfinanceinIndex({id:1005})";
        break;
      case 1006:
        out ="app.economydetail.monthaccumfinance({id:1006})";
        break;
      case 1007:
        out ="app.economydetail.monthaccumfinanceIndex({id:1007})";
        break;
      case 1008:
        out ="app.economydetail.yearfinanceincomplete({id:1008})";
        break;
      case 1009:
        out ="app.economydetail.financeout({id:1009})";
        break;
      case 1010:
        out ="app.economydetail.financeoutIndex({id:1010})";
        break;
      case 1011:
        out ="app.economydetail.monthfinanceout({id:1011})";
        break;
      case 1012:
        out ="app.economydetail.monthfinanceoutIndex({id:1012})";
        break;
      case 1013:
        out ="app.economydetail.yearfiananceoutcomplete({id:1013})";
        break;
      }
      return out;
  }
  
};