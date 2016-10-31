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
      abstract:true,
      url:'/economy',
      templateUrl:'app/in/Economy/EconomyHome.html'
    })
    .state('economy.gdp',{
      url:'/gdp',
      templateUrl:'app/in/Economy/GDP/GDP.html',
      controller:'GDPCtrl'
    })
    .state('economy.finance',{
      url:'/finance',
      templateUrl:'app/in/Economy/Finance/finance.html',
      controller:'financeCtrl'
    })
    .state('economy.financial',{
      url:'/financial',
      templateUrl:'app/in/Economy/Financial/financial.html',
      controller:'financialCtrl'
    })
    .state('economy.investment',{
      url:'/investment',
      templateUrl:'app/in/Economy/investment/investment.html',
      controller:'investmentCtrl'
    })
    .state('economy.industry',{
      url:'/industry',
      templateUrl:'app/in/Economy/industry/industry.html',
      controller:'industryCtrl'
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
    ;

  $urlRouterProvider.otherwise('/');
};
