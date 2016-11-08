export default ($resource) => {
	return {
		query: function(headers) {
			return $resource('/api/data/:tableName/query/spanData', {
				tableName: '@tableName'
			}, {
				'get': {
					method: 'GET',
					headers: headers
				}
			})
		},
		pageQuery: function(headers) {
			return $resource('/api/data/:tableName/list/:pageSize/:pageNumber', {
				tableName: '@tableName',
				pageSize: '@pageSize',
				pageNumber: '@pageNumber'
			}, {
				'get': {
					method: 'GET',
					headers: headers
				}
			});
		},
		advancedQuery: function(headers) {
			return $resource('/api/data/:tableName/query/advanceQuery', {
				tableName: '@tableName'
			}, {
				'post': {
					method: 'POST',
					headers: headers
				}
			});
		},
		lastestObject: function(headers) {
			return $resource('/api/data/:tableName/lastestObject', {
				tableName: '@tableName'
			}, {
				'post': {
					method: 'POST',
					headers: headers
				}
			});
		},
		addData: function(headers) {
			return $resource('/api/data/:tableName', {
				tableName: '@tableName'
			}, {
				'post': {
					method: 'POST',
					headers: headers
				}
			});
		},
		dataURD: function(headers) {
			return $resource('/api/data/:tableName/:id', {
				tableName: '@tableName',
				id: '@id'
			}, {
				'delete': {
					method: 'DELETE',
					headers: headers
				},
				'put': {
					method: 'PUT',
					headers: headers
				}
			});
		},
		pageAdvancedQuery: function(headers) {
		return $resource('/api/data/:tableName/query/advanceQuery/page/:pageSize/:pageNumber', {
				tableName: '@tableName',
				pageSize: '@pageSize',
				pageNumber: '@pageNumber'
			}, {
				'post': {
					method: 'POST',
					headers: headers
				}
			});
		}
	}

}