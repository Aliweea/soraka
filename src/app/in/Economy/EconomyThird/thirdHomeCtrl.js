export default($scope, $state, hService, xService, kpiRes, qService, $rootScope) => {
  'ngInject';
  $scope.title = "经济";
  // 上一级路由
  $scope.toH = () => {
    hService.back();
  }
};