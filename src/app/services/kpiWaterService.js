export default ($localStorage, dataWaterFactory) => {
	'ngInject';

	var error_conf = {
		ttl: 4000
	};
	return {
		query: function(tableName, fromDate, endDate, successProcess) {
			dataWaterFactory.query({
				'x-auth-token': $localStorage.token
			}).get({
					tableName: tableName,
					start: fromDate,
					end: endDate
				},
				function success(data) {
					successProcess(JSOG.parse(JSOG.stringify(data)));
				},
				function error(data) {
					// alert('error');
				});
		},
		advancedQuery: function(tableName, advancedQueryConfig, successProcess) {
			dataWaterFactory.advancedQuery({
				'x-auth-token': $localStorage.token
			}).post({
					tableName: tableName,
				},
				advancedQueryConfig,
				function success(data) {
					successProcess(JSOG.parse(JSOG.stringify(data)));
				},
				function error(data) {
					// alert('error');
				});
		},
		getLastestObject: function(tableName, sortArr, successProcess) {
			dataWaterFactory.lastestObject({
				'x-auth-token': $localStorage.token
			}).post({
					tableName: tableName,
				},
				sortArr,
				function success(data) {
					successProcess(JSOG.parse(JSOG.stringify(data)));
				},
				function error(data) {
					// alert('error');
				});
		}
	}

}