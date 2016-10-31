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
    .state('water',{
      url:'/water',
      templateUrl:'app/in/water/water.html',
      controller: 'waterCtrl'
      // resolve: {
      //     deps: ['$ocLazyLoad',
      //       function($ocLazyLoad) {
      //         return $ocLazyLoad.load([
      //           'app/in/waterEnvironment/waterEnvironmentCtrl.js'
      //           ]);
      //       }
      //     ]
      //   }
    })
    .state('air',{
      url:'/air',
      templateUrl:'app/in/air/air.html',
    })
    .state('land',{
      url:'/land',
      templateUrl:'app/in/land/land.html',
    })
    .state('energy',{
      url:'/energy',
      templateUrl:'app/in/energy/energy.html',
    })
    
    .state('police',{ 
      url:'/police',
      templateUrl:'app/in/police/police.html'
    })
    .state('firecontrol',{ 
      url:'/firecontrol',
      templateUrl:'app/in/firecontrol/firecontrol.html'
    })
    ;
    

  $urlRouterProvider.otherwise('/');
};
