export default($scope, qService, accountRes, AuthTool, $state, $rootScope, $sessionStorage) => {
    'ngInject';
    // 隐藏topbar上的logout按钮
    $('#home_logout').hide(0);
    $('#footlabel').hide(0);
    $('#navBottomReturn').show(0);

    $scope.err = "";
    $scope.succ = "";
    $rootScope.loading = false;
    const checkInput = () => {
        if ($scope.npsw1 !== $scope.npsw2) {
            $scope.err = "两次密码输入不一致!";
            return false;
        }
        return true;
    }
    $scope.submit = ()=> {
        if (checkInput()) {
            qService.httpPostWithToken(accountRes.resetPsw, {}, {}, { password: $scope.npsw1 }).then((data) => {
                if (data.errorCode == "NO_ERROR") {
                    $scope.succ = "修改成功!";
                } else {}
            }, (err) => {
                if (err.errorCode == "UNAUTHORIZED") {
                    $state.go('portal');
                } else {}
            }).finally(() => {
                $rootScope.loading = false;
            });
        }
    }
}