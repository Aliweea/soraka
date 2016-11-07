export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 4001:
        // out ="app.environmentdetail.waterQuality";
        out ="app.environmentdetail.waterSecond({id:1000})";
        break;
      case 4003:
        out ="app.environmentdetail.waterSecond({id:1000})";
        break;
      case 4002:
        out ="app.environmentdetail.waterSecond({id:1000})";
        break;
      }
      return out;
  }
  
};