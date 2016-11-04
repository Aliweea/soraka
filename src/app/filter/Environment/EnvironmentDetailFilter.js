export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 4001:
        out ="app.environmentdetail.waterQuality";
        break;
      case 4003:
        out ="app.environmentdetail.wasteWater";
        break;
      case 4002:
        out ="app.environmentdetail.waterCondition";
        break;
      }
      return out;
  }
  
};