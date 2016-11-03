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


    // 环境
    .state('app.environment',{
      abstract:true,
      url:'/environment',
      templateUrl:'app/in/Environment/EnvironmentHome.html',
    })
    .state('app.environment.water',{
      url:'/water',
      templateUrl:'app/in/Environment/water/water.html',
      controller:'waterCtrl'
    })
    .state('app.environment.air',{
      url:'/air',
      templateUrl:'app/in/Environment/air/air.html',
      controller:'airCtrl'
    })
    .state('app.environment.land',{
      url:'/land',
      templateUrl:'app/in/Environment/land/land.html',
      controller:'landCtrl'
    })
    .state('app.environment.energy',{
      url:'/energy',
      templateUrl:'app/in/Environment/energy/energy.html',
      controller:'energyCtrl'
    })

    // 公共安全
    .state('app.publicsecurity',{ 
      abstract: true,
      url:'/publicsecurity',
      templateUrl:'app/in/publicsecurity/publicsecurityHome.html'
    })
    .state('app.publicsecurity.police',{ 
      url:'/police',
      templateUrl:'app/in/publicsecurity/police/police.html',
      controller: 'policeCtrl'
    })
    .state('app.publicsecurity.firecontrol',{ 
      url:'/firecontrol',
      templateUrl:'app/in/publicsecurity/firecontrol/firecontrol.html',
      controller: 'firecontrolCtrl'
    })
    .state('app.publicsecurity.petition',{ 
      url:'/petition',
      templateUrl:'app/in/publicsecurity/petition/petition.html',
      controller: 'petitionCtrl'
    })
    .state('app.publicsecurity.accident',{ 
      url:'/accident',
      templateUrl:'app/in/publicsecurity/accident/accident.html',
      controller: 'accidentCtrl'
    })
    .state('app.publicsecurity.safety',{ 
      url:'/safety',
      templateUrl:'app/in/publicsecurity/safety/safety.html',
      controller: 'safetyCtrl'
    })


    // 民生
    .state('app.livehood',{
      abstract: true,
      url:'/livehood',
      templateUrl:'app/in/livehood/LivehoodHome.html'
    })
    //民生之人口结构
    .state('app.livehood.population',{
      url:'/livehood/population',
      templateUrl:'app/in/livehood/population/population.html',
      controller:'populationCtrl'
    })
      //民生之社会保险
    .state('app.livehood.insurance',{
      url:'/livehood/insurance',
      templateUrl:'app/in/livehood/insurance/insurance.html',
      controller:'insuranceCtrl'
    })
      //民生之价格指数
    .state('app.livehood.price',{
      url:'/livehood/price',
     templateUrl:'app/in/livehood/price/price.html',
      controller:'priceCtrl'
    })

    //公共事业
    .state('app.publicService',{
      abstract:true,
      url:'/publicService',
      templateUrl:'app/in/publicService/publicServiceHome.html'
    })
    .state('app.publicService.education',{
      url:'/education',
      templateUrl:'app/in/publicService/education/education.html',
      controller:'educationCtrl'
    })
    .state('app.publicService.healthCare',{
      url:'/healthCare',
      templateUrl:'app/in/publicService/healthCare/healthCare.html',
      controller:'healthCareCtrl'
    })
    .state('app.publicService.telecom',{
      url:'/telecom',
      templateUrl:'app/in/publicService/telecom/telecom.html',
      controller:'telecomCtrl'
    })
    .state('app.publicService.traffic',{
      url:'/traffic',
      templateUrl:'app/in/publicService/traffic/traffic.html',
      controller:'trafficCtrl'
    })

    // 城市管理
    .state('app.cm', {
      abstract: true,
      name: 'cm',
      url: '/cm',
      templateUrl: 'app/in/citymanager/cm.html', 
      controller: 'cmCtrl'
    })
    .state('app.cm.refuse', {
      url: '/refuse',
      name: 'refuse',
      templateUrl: 'app/in/citymanager/refuse/refuse.html',
      controller: 'refuseCtrl'
    })
    .state('app.cm.punish', {
      url: '/punish',
      name: 'punish',
      templateUrl: 'app/in/citymanager/punish/punish.html',
      controller: 'punishCtrl'
    })
    .state('app.cm.fix', {
      url: '/fix',
      name: 'fix',
      templateUrl: 'app/in/citymanager/fix/fix.html',
      controller: 'fixCtrl'
    })
    .state('app.cm.icm', {
      url: '/icm',
      name: 'icm',
      templateUrl: 'app/in/citymanager/icm/icm.html',
      controller: 'icmCtrl'
    })
    ;
    

  $urlRouterProvider.otherwise('/');
};
