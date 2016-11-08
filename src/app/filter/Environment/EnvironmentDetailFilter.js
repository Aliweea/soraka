export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 4001:
        // out ="app.environmentdetail.waterQuality";
        out ="app.environmentdetail.waterSecond({id:4001})";
        break;
      case 4003:
        out ="app.environmentdetail.waterSecond({id:4003})";
        break;
      case 4002:
        out ="app.environmentdetail.waterSecond({id:4002})";
        break;
      case 4004:
        out ="app.environmentdetail.airSecond({id:4004})";
        break;
      case 4006:
        out ="app.environmentdetail.airSecond({id:4006})";
        break;
      case 5001:
        out ="app.environmentdetail.energySecond({id:5001})";
        break;
      case 5002:
        out ="app.environmentdetail.energySecond({id:5002})";
        break;
      case 5003:
        out ="app.environmentdetail.energySecond({id:5003})";
        break;
      case 5004:
        out ="app.environmentdetail.energySecond({id:5004})";
        break;
      case 5005:
        out ="app.environmentdetail.energySecond({id:5005})";
        break;
      case 5006:
        out ="app.environmentdetail.energySecond({id:5006})";
        break;
      case 5007:
        out ="app.environmentdetail.energySecond({id:5007})";
        break;
      case 5008:
        out ="app.environmentdetail.energySecond({id:5008})";
        break;
      case 5009:
        out ="app.environmentdetail.energySecond({id:5001})";
        break;
      case 5010:
        out ="app.environmentdetail.energySecond({id:5002})";
        break;
      case 5011:
        out ="app.environmentdetail.energySecond({id:5003})";
        break;
      case 5012:
        out ="app.environmentdetail.energySecond({id:5004})";
        break;
      case 5013:
        out ="app.environmentdetail.energySecond({id:5005})";
        break;
      case 5014:
        out ="app.environmentdetail.energySecond({id:5006})";
        break;
      case 5015:
        out ="app.environmentdetail.energySecond({id:5007})";
        break;
      case 5016:
        out ="app.environmentdetail.energySecond({id:5008})";
        break;
      case 4007:
        out="app.environmentdetail.commercialLandGross({id:4007})";
        break;
      case 4008:
        out="app.environmentdetail.commercialLandArea({id:4008})";
        break;
      case 4012:
        out="app.environmentdetail.industryLandGross({id:4012})";
        break;
      case 4013:
        out="app.environmentdetail.industryLandArea({id:4013})";
        break;
      case 4009:
        out="app.environmentdetail.illegalLandArea({id:4009})";
        break;
      case 4011:
        out="app.environmentdetail.cultivateLandArea({id:4011})";
        break;
      }
      return out;
  }
  
};