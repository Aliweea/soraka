export default ($resource, BASE_URL) => {
  'ngInject';
  return {
  getType:(headers) => {
    return $resource(BASE_URL+'/dict/:id', {id: '@id'
    }, {
      'get': {
        method: 'GET',
        headers: headers
      }
    });
  },
  getDictListByType:(headers) => {
    return $resource(BASE_URL+'/dict/:id/list', {id: '@id'
    }, {
      'get': {
        method: 'GET',
        headers: headers
      }
    });
  }
  };
};