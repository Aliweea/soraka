/*
* 功能: 异步方式封装http调用
* $q服务注意点  --Mondooo
* 
* $q是angularjs中与异步相关的服务, 调用会得到一个promise.
* 使用$q有两种方式: 一种是模仿ES6中promise的实现方式(推荐). 一种是模仿Kris Kowal's Q 或者 jQuery's Deferred的实现方式(见下注释部分)
* promise.then()方法会返回另外一个promise, 具体是被resolved还是被rejected与successCallback errorCallback两个回调函数的执行结果有关.
*/
export default ($q, $state) => {
	'ngInject';

	var TOKEN_KEY = 'X-Auth-Token';

	const successHandler = (resolve, value, responseHeaders) => {
		let headers = responseHeaders ? responseHeaders() : "";
		if (value.errorCode == "NO_ERROR") {
			value.headers = headers;
			resolve(value);
		} else {
			$state.go("portal"); // 非正常状态暂时全部跳转登陆
		}
	}

	return {
		httpGet: (resource, parameters, headers) => {
			return $q((resolve, reject) => {
				resource(headers).get(parameters,
				(value, responseHeaders) => {
					successHandler(resolve, value, responseHeaders);
				}, 
				(httpResponse) => {
					reject(httpResponse);
				});
			});
			/* // This is an example using deferred like promise implementation.
			* var deferred = $q.defer();
			* resource(headers).get(parameters,
			* 	(value, responseHeaders) => {
			* 		deferred.resolve(value);
			* 	}, 
			* 	(httpResponse) => {
			* 		deferred.resolve(httpResponse);
			* 	});
			* return deferred.promise;
			*/
		},
		httpGetWithToken: (resource, parameters, headers) => {
			return $q((resolve, reject) => {
				headers["x-auth-token"] = $sessionStorage[TOKEN_KEY];
				resource(headers).get(parameters,
				(value, responseHeaders) => {
					successHandler(resolve, value, responseHeaders);
				}, 
				(httpResponse) => {
					reject(httpResponse);
				});
			});
		},
		httpPost: (resource, parameters, headers, body) => {
			return $q((resolve, reject) => {
				resource(headers).post(parameters,body,
				(value, responseHeaders) => {
					successHandler(resolve, value, responseHeaders);
				}, 
				(httpResponse) => {
					reject(httpResponse);
				});
			});
		},

	};
};