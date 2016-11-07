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
      case 4007:
        out="app.environmentdetail.commercialLandGross";
        break;
      case 4008:
        out="app.environmentdetail.commercialLandArea";
        break;
      case 4012:
        out="app.environmentdetail.industryLandGross";
        break;
      case 4013:
        out="app.environmentdetail.industryLandArea";
        break;
      case 4009:
        out="app.environmentdetail.illegalLandArea";
        break;
      case 4011:
        out="app.environmentdetail.cultivateLandArea";
        break;
      }
      return out;
  }
  
};