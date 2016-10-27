export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
  'ngInject';

  // 去掉路由中的「#」井号
  $locationProvider.html5Mode(true);
  $stateProvider
    .state('home', {
      url: '/',
      templateUrl: 'app/auth/home/home.html',
      controller: 'homeCtrl'
    })
    .state('in', {
      abstract: true,
      url: '/in',
      templateUrl: 'app/in/in.html', 
      controller: 'inCtrl'
    })
    .state('in.account', {
      url: '^/account',
      templateUrl: 'app/in/account/account.html',
      controller: 'accountCtrl'
    })
    .state('economy',{
      url:'/economy',
      templateUrl:'app/in/Economy/EconomyHome.html'
    })
    .state('environment',{
      url:'/environment',
      templateUrl:'app/in/Environment/EnvironmentHome.html'
    })
    ;

  $urlRouterProvider.otherwise('/');
};
