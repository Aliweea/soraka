export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    var out = "";
    out = input.toFixed(1);
    return out;
  }
  
};