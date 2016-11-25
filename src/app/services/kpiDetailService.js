export default (dataDetailFactory, $sessionStorage) => {
	'ngInject';

	var error_conf = {
		ttl: 4000
	};
    
	return {
		query: function(tableName, fromDate, endDate, successProcess) {
			dataDetailFactory.query({
				'x-auth-token': $sessionStorage[TOKEN_KEY];
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
			dataDetailFactory.advancedQuery({
				'x-auth-token': $sessionStorage[TOKEN_KEY];
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
			dataDetailFactory.lastestObject({
				'x-auth-token': $sessionStorage[TOKEN_KEY];
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