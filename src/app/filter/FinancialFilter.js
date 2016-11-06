export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 34:
        out ="app.economydetail.fixedInvestment({id:34})";
        break;
      case 35:
        out ="app.economydetail.fixedInvestmentcomplete({id:35})";
        break;
      case 36:
        out ="app.economydetail.industryInvestment({id:36})";
        break;
      case 38:
        out ="app.economydetail.serveInvestment({id:38})";
        break;
      case 40:
        out ="app.economydetail.realtyInvestment({id:1004})";
        break;
      case 42:
        out ="app.economydetail.realforeigncapitaluse({id:42})";
        break;
      case 43:
        out ="app.economydetail.importnewinnercapital({id:43})";
        break;
      case 22:
        out ="app.economydetail.accumimexport({id:22})";
        break;
      case 23:
        out ="app.economydetail.yearaccumimexportcomplete({id:23})";
        break;
      case 24:
        out ="app.economydetail.accumexport({id:24})";
        break;
      case 25:
        out ="app.economydetail.exportcomplete({id:25})";
        break;
      }
      return out;
  }
  
};