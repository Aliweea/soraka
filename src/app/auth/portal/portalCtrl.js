export default ($scope, $localStorage, $timeout, $state, $q, $sessionStorage, qService, accountRes, AuthTool) => {
    'ngInject';

    var USERNAME   = 'username',
        PASSWORD   = 'password',
        AUTOLOGIN     = 'ioc-kpi-autologin';

    // 自动登录
    if ($localStorage[AUTOLOGIN] && $localStorage[USERNAME] && $localStorage[PASSWORD]) {
        let info = {
            'X-Username': $localStorage[USERNAME],
            // 'X-Auth-Password': encryptPsw($scope.loginPassword)
            'X-Password': $localStorage[PASSWORD]
        };
        qService.httpPost(accountRes.account, {}, info, {}).then((data) => {
            if (data.errorCode == "NO_ERROR") {
                console.log("自动登录, 用户信息验证成功");
                $state.go('app.in.home');
            } else {
                $scope.errMessage = "密码已变更, 请重新登陆";
                AuthTool.delLoginInfo();
            }
        }, (err) => {
            if (err.errorCode == "UNAUTHORIZED") {
                $scope.errMessage = "密码已变更, 请重新登陆";
                AuthTool.delLoginInfo();
            } else {
                AuthTool.delLoginInfo();
            }
        });
    }

    $scope.login = () => {
    	if (isNull($scope.loginAccount)) {
    		$scope.errMessage = "账号不能为空!";
    		$q((resolve, reject) => {
        		$timeout(() => {
        			$scope.errMessage = "";
        			resolve();
        		}, 1500);
            });
    		return;
    	};
    	let info = {
    		'X-Username': $scope.loginAccount,
    		// 'X-Auth-Password': encryptPsw($scope.loginPassword)
            'X-Password': $scope.loginPassword
    	};
    	qService.httpPost(accountRes.account, {}, info, {}).then((data) => {
            let isAutoLogin = $("#isAutoLogin :checkbox").is(":checked");

    		if (data.errorCode == "NO_ERROR") {
                if (isAutoLogin) {
                    AuthTool.saveAutoLoginInfo($scope.loginAccount, $scope.loginPassword);
                    console.log("用户信息已保存, 启用自动登录状态");
                }
    			$state.go('app.in.home');
    		} else {
                $scope.errMessage = "账号/密码不匹配!";
            }
    	}, (err) => {
            if (err.errorCode == "UNAUTHORIZED") {
                $scope.errMessage = "账号/密码不匹配!";
            } else {
                console.log("Error is:" + err.data);
            }
    	});
    };

    let isNull = (value) => {
    	return typeof(value) == undefined || value == null;
    };

    let encryptPsw = (acc, psw, vcode) => {
    	let code = vcode == undefined? 'opzq' : vcode;
    	return md5(md5(md5(psw) + acc) + code.toUpperCase());
    };

    // 设置内容居中
    $(function() {
        let contentH = 446; // 内容高度
        let clientH = $(window).height(); // 视口高度
        let marginT = (clientH - contentH) / 2 - 5;

        $(".index-module").css("margin-top", marginT + "px");
    });
};
