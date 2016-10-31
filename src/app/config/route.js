export default ($stateProvider, $urlRouterProvider, $locationProvider) => {
  'ngInject';

  // 去掉路由中的「#」井号
  $locationProvider.html5Mode(true);
  $stateProvider

    //登陆
    .state('portal', {
      url: '/',
      templateUrl: 'app/auth/portal/portal.html',
      controller: 'portalCtrl'
    })

    // 登陆之后的界面
    .state('app', {
      abstract: true,
      url: '/app',
      templateUrl: 'app/app.html',
      controller: 'appCtrl'
    })
    // 首页
    .state('app.in', {
      abstract: true,
      url: '/in',
      templateUrl: 'app/in/in.html', 
      controller: 'inCtrl'
    })
    .state('app.in.home', {
      url: '/home',
      templateUrl: 'app/in/home/home.html',
      controller: 'homeCtrl'
    })

    // 经济
    .state('app.economy',{
      abstract:true,
      url:'/economy',
      templateUrl:'app/in/Economy/EconomyHome.html'
    })
    .state('app.economy.gdp',{
      url:'/gdp',
      templateUrl:'app/in/Economy/GDP/GDP.html',
      controller:'GDPCtrl'
    })
    .state('app.economy.finance',{
      url:'/finance',
      templateUrl:'app/in/Economy/Finance/finance.html',
      controller:'financeCtrl'
    })
    .state('app.economy.financial',{
      url:'/financial',
      templateUrl:'app/in/Economy/Financial/financial.html',
      controller:'financialCtrl'
    })
    .state('app.economy.investment',{
      url:'/investment',
      templateUrl:'app/in/Economy/investment/investment.html',
      controller:'investmentCtrl'
    })
    .state('app.economy.industry',{
      url:'/industry',
      templateUrl:'app/in/Economy/industry/industry.html',
      controller:'industryCtrl'
    })

    // 民生
    .state('app.livehood',{
      url:'/livehood',
      templateUrl:'app/in/livehood/LivehoodHome.html'
    })

    // 环境
    .state('app.environment',{
      url:'/environment',
      templateUrl:'app/in/Environment/EnvironmentHome.html',
    })
    .state('app.water',{
      url:'/water',
      templateUrl:'app/in/Environment/water/water.html',
    })
    .state('app.air',{
      url:'/air',
      templateUrl:'app/in/Environment/air/air.html',
    })
    .state('app.land',{
      url:'/land',
      templateUrl:'app/in/Environment/land/land.html',
    })
    .state('app.energy',{
      url:'/energy',
      templateUrl:'app/in/Environment/energy/energy.html',
    })

    // 公共安全
    .state('app.publicsecurity',{ 
      url:'/publicsecurity',
      templateUrl:'app/in/publicsecurity/publicsecurityHome.html'
    })
    .state('app.police',{ 
      url:'/police',
      templateUrl:'app/in/publicsecurity/police/police.html'
    })
    .state('app.firecontrol',{ 
      url:'/firecontrol',
      templateUrl:'app/in/publicsecurity/firecontrol/firecontrol.html'
    })
    .state('app.petition',{ 
      url:'/petition',
      templateUrl:'app/in/publicsecurity/petition/petition.html'
    })
    ;
    

  $urlRouterProvider.otherwise('/');
};
