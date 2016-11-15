export default($scope, qService, accountRes, AuthTool, $state, $rootScope) => {
    'ngInject';
    // 隐藏topbar上的logout按钮
    $('#home_logout').hide(0);
    $('#footlabel').hide(0);
    $('#navBottomReturn').show(0);

    let params = {
        
    }
    let headers = {
        
    };
    $rootScope.loading = false;
    qService.httpGetWithToken(accountRes.accountById, params,headers).then((data) => {
        if (data.errorCode == "NO_ERROR") {
            $scope.meData = data.data;
        } else {

        }
    }, (err) => {
        if (err.errorCode == "UNAUTHORIZED") {
            $state.go('portal');
        } else {

        }
    }).finally(() => {
        $rootScope.loading = false;
    });
}