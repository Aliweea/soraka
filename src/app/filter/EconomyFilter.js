export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out = "";
    if (input>1000000) {
      out = (input/100000000).toFixed(2);
    }else if (input<2) {
      out = (input*100);
    }
    return out;
  }
  
};