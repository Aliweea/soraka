export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    switch (input) {
        case 'GREEN':
          return 'label-success';
          break;
        case 'YELLOW':
          return 'label-warning';
          break;
        case 'RED':
          return 'label-danger';
          break;
        case 'GRAY':
          return 'label-default';
          break;
        default:
          return 'label-default';
      };
    };
}