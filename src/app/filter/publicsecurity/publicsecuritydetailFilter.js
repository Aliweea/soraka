export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out ="";
    switch (input)
      {
      case 3010:
        out ="app.publicsecuritydetail.policecall";
        break;
      case 3014:
        out ="app.publicsecuritydetail.policesafe";
        break;
      }
      return out;
  }
  
};