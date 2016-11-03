export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 7510:
        out ="app.economydetail.gdp";
        break;
      case 6:
        out ="app.economydetail.firstgdp";
        break;
      case 7:
        out ="app.economydetail.firstgdpindex";
        break;
      case 8:
        out ="app.economydetail.secondgdp";
        break;
      case 9:
        out ="app.economydetail.secondgdpindex";
        break;
      case 5:
        out ="app.economydetail.thirdgdp";
        break;
      case 3:
        out ="app.economydetail.thirdgdpindex";
        break;
      }
      return out;
  }
  
};