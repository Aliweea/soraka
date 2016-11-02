export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    switch (input) {
        case 'GREEN':
          return '可接受';
          break;
        case 'YELLOW':
          return '轻微问题';
          break;
        case 'RED':
          return '问题';
          break;
        case 'GRAY':
          return '数据未录入';
          break;
        default:
          return '数据未录入';
      };
  
};
}