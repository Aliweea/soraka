export default ($resource, BASE_URL) => {
  'ngInject';
  return {
    kpi: (headers) => {
      return $resource(BASE_URL+'/kpi/result/all', {}, {
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