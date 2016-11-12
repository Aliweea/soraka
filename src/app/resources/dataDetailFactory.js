export default ($resource, BASE_URL) => {
  'ngInject';
  return{
    query:(headers) => {
      return $resource(BASE_URL+'/data/:tableName/query/spanData', {
      tableName: '@tableName'
    }, {
      'get': {
        method: 'GET',
        headers: headers
      }
    });
    },
    advancedQuery:(headers) => {
      return $resource(BASE_URL+'/data/:tableName/query/advanceQuery', {
      tableName: '@tableName'
    }, {
      'post': {
        method: 'POST',
        headers: headers
      }
    });
    },
    lastestObject:(headers) => {
      return $resource(BASE_URL+'/data/:tableName/lastestObject', {
      tableName: '@tableName'
    }, {
      'post': {
        method: 'POST',
        headers: headers
      }
    });
    },
    addData:(headers) => {
      return $resource(BASE_URL+'/data/:tableName', {
      tableName: '@tableName'
    }, {
      'post': {
        method: 'POST',
        headers: headers
      }
    });
    },
    dataURD:(headers) => {
      return $resource(BASE_URL+'/data/:tableName/:id', {
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
  };
};