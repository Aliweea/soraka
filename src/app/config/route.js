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
    .state('livehood',{
      url:'/livehood',
      templateUrl:'app/in/livehood/LivehoodHome.html'
    })
    .state('environment',{
      url:'/environment',
      templateUrl:'app/in/Environment/EnvironmentHome.html',
    })
    .state('water',{
      url:'/water',
      templateUrl:'app/in/Environment/water/water.html',
    })
    .state('air',{
      url:'/air',
      templateUrl:'app/in/Environment/air/air.html',
    })
    .state('land',{
      url:'/land',
      templateUrl:'app/in/Environment/land/land.html',
    })
    .state('energy',{
      url:'/energy',
      templateUrl:'app/in/Environment/energy/energy.html',
    })   
    .state('publicsecurity',{ 
      url:'/publicsecurity',
      templateUrl:'app/in/publicsecurity/publicsecurityHome.html'
    })
    .state('police',{ 
      url:'/police',
      templateUrl:'app/in/publicsecurity/police/police.html'
    })
    .state('firecontrol',{ 
      url:'/firecontrol',
      templateUrl:'app/in/publicsecurity/firecontrol/firecontrol.html'
    })
    ;
    

  $urlRouterProvider.otherwise('/');
};
