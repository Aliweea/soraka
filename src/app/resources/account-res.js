/*
* $resource注意点 --Mondooo
* 
* $resource是封装了$http, 比$http更高级的与RESTful服务器进行通信的服务.
* 格式: $resource(url, [paramDefaults], [actions], options);
* url中可以自由的使用变量, 比如'http://example.com/resource/:resource_id.:format'.
* parameters中的key会优先赋值给url中的同名变量, 剩下的附加在？之后.
* actions的格式与$http.config相同.
* $resource从服务器获得[Resource instance], $resource默认的actions: save, remove, delete可以通过前面加上$符号($action)操作这种[对象]. 
* 注意: 在angularjs中类的方法和对象的方法是有可能不同的, 比如: 
	HTTP GET "class" actions: Resource.action([parameters], [success], [error])
	non-GET "class" actions: Resource.action([parameters], postData, [success], [error])
	non-GET instance actions: instance.$action([parameters], [success], [error])
*/
export default ($resource, BASE_URL) => {
	'ngInject';
	return {
		account: (headers) => {
			return $resource(BASE_URL+'/token', {}, {
				post: {
					method: 'POST',
					headers: headers, 
				},
				get: {
					method: 'GET',
					headers: headers,
				}
			});
		},
	};
};