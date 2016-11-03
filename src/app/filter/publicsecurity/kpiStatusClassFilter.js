export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    switch (input) {
        case 'GREEN':
          return 'clevel1';
          break;
        case 'YELLOW':
          return 'clevel2';
          break;
        case 'RED':
          return 'clevel3';
          break;
        case 'GRAY':
          return 'clevel4';
          break;
        default:
          return 'clevel4';
      };
    };
}