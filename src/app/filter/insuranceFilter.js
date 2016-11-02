export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out = "";
    if (input>1000000) {
      out = (input/10000).toFixed(2);
    }else {
      out=input;
    }
    return out;
  }
  
};