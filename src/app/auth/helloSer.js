export default ($http, $window, lcConfig, $state) => {
  'ngInject';
  return {
    getData: () => {
      return $http({
        method: 'get',

        // api 请求的默认host 等设置在 config http.js 中
        url: '/api/hello'
      });
    }
  };
};

