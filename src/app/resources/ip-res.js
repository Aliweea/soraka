export default ($resource) => {
	'ngInject';
	return {
		ip: (headers) => {
			return $resource('http://api.map.baidu.com/location/ip', {}, {
				get: {
					method: 'GET',
					headers: headers,
				}
			});
		},
	};
};