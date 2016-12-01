/**
* 登陆控制器
* --Mondooo
*/
export default ($scope, $rootScope, $localStorage, $timeout, $state, $q, $sessionStorage, qService, accountRes, AuthTool) => {
    'ngInject';

    let TOKEN_KEY  = 'x-auth-token',
        USERNAME   = 'username',
        PASSWORD   = 'password',
        AUTOLOGIN  = 'ioc-kpi-autologin';

    // 密码加密函数
    const encryptPassword = (password) => {
        var password_ran = password + 'py458as586_v2';
        return md5(password_ran);
    }
    // 自动登录
    const autoLogin = () => {
        if ($localStorage[AUTOLOGIN] && $localStorage[USERNAME] && $localStorage[PASSWORD]) {
            let info = {
                'X-Username': $localStorage[USERNAME],
                'X-Password': encryptPassword($localStorage[PASSWORD])
            };
            qService.httpPost(accountRes.account, {}, info, {}).then((data) => {
                if (data.errorCode == "NO_ERROR") {
                    console.log("自动登录, 用户信息验证成功");
                    // 存储登陆用户data和token
                    AuthTool.saveLoginInfo(data.data, data.headers[TOKEN_KEY]);
                    $state.go('app.in.home');
                } else {
                    $scope.errMessage = "出错了, 请重试";
                }
            }, (err) => {
                if (err.errorCode == "UNAUTHORIZED") {
                    $scope.errMessage = "密码已变更, 请重新登陆";
                    AuthTool.delLoginInfo();
                } else {
                    $scope.errMessage = "出错了, 请重试";
                }
            });
        }
    }();

    $scope.isAutoLogin = true;
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
            'X-Password': encryptPassword($scope.loginPassword)
    	};
    	qService.httpPost(accountRes.account, {}, info, {}).then((data) => {
    		if (data.errorCode == "NO_ERROR") {
                // 如果用户选择自动登录, 则将其用户名和密码存到本地
                if ($scope.isAutoLogin) {
                    AuthTool.saveAutoLoginInfo($scope.loginAccount, $scope.loginPassword);
                    console.log("用户信息已保存, 启用自动登录");
                }
                // 存储登陆用户data和token
                AuthTool.saveLoginInfo(data.data, data.headers[TOKEN_KEY]);

    			$state.go('app.in.home');
    		} else {
                $scope.errMessage = "出错了, 请重试";
            }
    	}, (err) => {
            if (err.errorCode == "UNAUTHORIZED") {
                $scope.errMessage = "账号/密码不匹配!";
            } else {
                $scope.errMessage = "出错了, 请重试";
            }
    	});
    };

    let isNull = (value) => {
    	return typeof(value) == undefined || value == null;
    };

    // 设置内容居中
    $(function() {
        let contentH = 446; // 内容高度
        let clientH = $(window).height(); // 视口高度
        let clientW = $(window).width(); // 视口高度
        // 解决输入法弹窗bug
        if (clientH > clientW) {
            $rootScope.clientMax = $(window).height(); // 视口高度
        } else {
            $rootScope.clientMax = $(window).width(); // 视口宽度
        }
        // ! 解决输入法弹窗bug
        if (contentH < clientH) {
            let marginT = (clientH - contentH) / 2;
            $(".index-module").css("margin-top", marginT + "px");
        } else{
            $(".index-module").css({"margin-top":"30px","margin-bottom":"30px"});
        }
    });
    // ~ private methods
  
};
