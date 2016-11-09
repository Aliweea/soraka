export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    switch (input) {
      case '3010':
        return 'policethree';
        break;
      case '3001':
        return 'policethree';
        break;
      case '3014':
        return 'policethree';
        break;
      case '3002':
        return 'policethree';
        break;
      case '3011':
        return 'policethree';
        break; 
      case '3003':
        return 'policethree';
        break;
      
    };
  };
  
};