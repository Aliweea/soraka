export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    switch (input) {
        case 'appear':
          return '起';
          break;
        case 'percentage':
          return '%';
          break;
        case 'people':
          return '人';
          break;
        case 'tt_rmb':
          return '万元';
          break;
        default:
          return ' ';
      };
    };
}