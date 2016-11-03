export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out = "";
    out = (input*100).toFixed(1);
    return out;
  }
  
};