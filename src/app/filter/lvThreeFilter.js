export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    switch (input) {
        case '2301':
        return 'UBEI';
        break;
        case '2231':
        return 'PopulationStructure';
        break;     
    };
  };
  
};