export default($scope, $state, hService) => {
  'ngInject';
  $scope.title = "资源环境";
  // 上一级路由
  $scope.toH = () => {
    $state.go(hService.state());
  }
};