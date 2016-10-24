export default ($http, $state, lcConfig, $window) => {
  'ngInject';
  return {
    goHome: () => {
      $state.go('home');
    },
    redirect: (url) => {
      $window.location.href = url;
    }
  };
};

