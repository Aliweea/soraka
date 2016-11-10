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
    .state('app.in.me', {
      url: '/me',
      templateUrl: 'app/in/me/me.html',
      controller: 'meCtrl'
    })
    .state('app.in.datepick', {
      url: '/datepick',
      templateUrl: 'app/in/datepick/datepick.html',
      controller: 'datepickCtrl'
    })
    // 经济
    .state('app.economy', {
      abstract: true,
      name: 'economy',
      url: '/economy',
      templateUrl: 'app/in/economy/economy.html', 
      controller: 'economyCtrl'
    })
    .state('app.economy.economylist', {
      url: '/economylist?categoryId',
      name: 'economylist',
      templateUrl: 'app/in/economy/one/economylist.html',
      controller: 'economylistCtrl'
    })
    .state('app.economy.bystate', {
      url: '/bystate/?categoryId&state',
      name: 'bystate',
      templateUrl: 'app/in/economy/one/bystate/bystate.html',
      controller: 'economyByStateCtrl'
    })
    .state('app.economy.detail', {
      url: '/detail?kpiId',
      name: 'economydetail',
      templateUrl: 'app/in/economy/two/economydetail.html',
      controller: 'economydetailCtrl'
    })
    .state('app.thirddetail',{
     abstract:true,
     url:'/economy/third',
     templateUrl:'app/in/economy/EconomyThird/thirdHome.html'
    })
    .state('app.thirddetail.economy',{
     url:'/economy/third/economy',
     templateUrl:'app/in/economy/EconomyThird/thirddetail.html',
     controller:'thirdgdpcontroller'
    })
    .state('app.thirddetail.finance',{
     url:'/economy/third/fianance',
     templateUrl:'app/in/economy/EconomyThird/thirdfinance/thirdfinance.html',
     controller:'thirdfinancecontroller'
    })
    .state('app.thirddetail.thirdinvest',{
     url:'/economy/third/invest',
     templateUrl:'app/in/economy/EconomyThird/thirdinvest/thirdinvest.html',
     controller:'thirdinvestcontroller'
    })
    .state('app.thirddetail.thirdindustry',{
     url:'/economy/third/industry',
     templateUrl:'app/in/economy/EconomyThird/thirdindustry/thirdindustry.html',
     controller:'thirdindustrycontroller'
    })
    .state('app.thirddetail.thirdfisical',{
     url:'/economy/third/fisical',
     templateUrl:'app/in/economy/EconomyThird/thirdfisical/thirdfisical.html',
     controller:'thirdfisicalcontroller'
    })
    .state('app.thirddetail.select',{
     url:'/economy/third/select',
     templateUrl:'app/in/economy/EconomyThird/select.html'
    })
    // 环境
    .state('app.environment',{
      abstract:true,
      url:'/environment',
      templateUrl:'app/in/Environment/Environment.html',
      controller: 'EnvironmentCtrl'
    })
    .state('app.environment.water',{
      url:'/water',
      templateUrl:'app/in/Environment/one/water/water.html',
      controller:'waterCtrl'
    })
    .state('app.environment.air',{
      url:'/air',
      templateUrl:'app/in/Environment/one/air/air.html',
      controller:'airCtrl'
    })
    .state('app.environment.land',{
      url:'/land',
      templateUrl:'app/in/Environment/one/land/land.html',
      controller:'landCtrl'
    })
    .state('app.environment.energy',{
      url:'/energy',
      templateUrl:'app/in/Environment/one/energy/energy.html',
      controller:'energyCtrl'
    })
    .state('app.environment.detail', {
      url: '/detail?kpiId',
      templateUrl: 'app/in/Environment/two/EnvironmentDetail.html',
      controller: 'EnvironmentDetailCtrl'
    })
    .state('app.environment.waterThree', {
      url: '/waterThree',
      templateUrl: 'app/in/Environment/three/water/waterThree.html',
      controller: 'waterThreeCtrl'
    })
    .state('app.environment.airThree', {
      url: '/airThree',
      templateUrl: 'app/in/Environment/three/air/airThree.html',
      controller: 'airThreeCtrl'
    })
    .state('app.environment.landThree', {
      url: '/landThree',
      templateUrl: 'app/in/Environment/three/land/landThree.html',
      controller: 'landThreeCtrl'
    })
    .state('app.environment.energyThree', {
      url: '/energyThree',
      templateUrl: 'app/in/Environment/three/energy/energyThree.html',
      controller: 'energyThreeCtrl'
    })


    // 公共安全
    .state('app.publicsecurity',{ 
      abstract: true,
      url:'/publicsecurity',
      controller: 'publicsecurityCtrl',
      templateUrl:'app/in/publicsecurity/publicsecurityHome.html'
    })
    .state('app.publicsecurity.police',{ 
      url:'/police',
      templateUrl:'app/in/publicsecurity/one/police/police.html',
      controller: 'policeCtrl'
    })
    .state('app.publicsecurity.firecontrol',{ 
      url:'/firecontrol',
      templateUrl:'app/in/publicsecurity/one/firecontrol/firecontrol.html',
      controller: 'firecontrolCtrl'
    })
    .state('app.publicsecurity.petition',{ 
      url:'/petition',
      templateUrl:'app/in/publicsecurity/one/petition/petition.html',
      controller: 'petitionCtrl'
    })
    .state('app.publicsecurity.accident',{ 
      url:'/accident',
      templateUrl:'app/in/publicsecurity/one/accident/accident.html',
      controller: 'accidentCtrl'
    })
    .state('app.publicsecurity.safety',{ 
      url:'/safety',
      templateUrl:'app/in/publicsecurity/one/safety/safety.html',
      controller: 'safetyCtrl'
    })
    //公共安全二级界面
    .state('app.publicsecurity.detail',{        
        url:'/detail?kpiId',
        templateUrl:'app/in/publicsecurity/two/publicsecuritydetail.html',
        controller: 'publicsecuritydetailCtrl'
    })
    .state('app.publicsecurity.policethree', {
      url: '/policethree',
      templateUrl: 'app/in/publicsecurity/three/police/policethree.html',
      controller: 'policethreeCtrl'
    })
    .state('app.publicsecurity.accidentthree', {
      url: '/accidentthree',
      templateUrl: 'app/in/publicsecurity/three/accident/accidentthree.html',
      controller: 'accidentthreeCtrl'
    })
    .state('app.publicsecurity.firethree', {
      url: '/firethree',
      templateUrl: 'app/in/publicsecurity/three/fire/firethree.html',
      controller: 'firethreeCtrl'
    })
    .state('app.publicsecurity.petitionthree', {
      url: '/petitionthree',
      templateUrl: 'app/in/publicsecurity/three/petition/petitionthree.html',
      controller: 'petitionthreeCtrl'
    })
    .state('app.publicsecurity.safetythree', {
      url: '/safetythree',
      templateUrl: 'app/in/publicsecurity/three/safety/safetythree.html',
      controller: 'safetythreeCtrl'
    })

    // 民生
    .state('app.livehood',{
      abstract: true,
      url:'/livehood',
      templateUrl:'app/in/livehood/one/LivehoodHome.html',
      controller:'LivehoodHomeCtrl'
    })
    //民生之人口结构
    .state('app.livehood.population',{
      url:'/livehood/population',
      templateUrl:'app/in/livehood/one/population/population.html',
      controller:'populationCtrl'
    })
      //民生之社会保险
    .state('app.livehood.insurance',{
      url:'/livehood/insurance',
      templateUrl:'app/in/livehood/one/insurance/insurance.html',
      controller:'insuranceCtrl'
    })
      //民生之价格指数
    .state('app.livehood.price',{
      url:'/livehood/price',
     templateUrl:'app/in/livehood/one/price/price.html',
      controller:'priceCtrl'
    })
         //民生二级界面
    .state('app.livehood.detail',{
      url:'/lvdetail?kpiId',
     templateUrl:'app/in/livehood/two/lvdetail.html',
      controller:'lvdetailCtrl'
    })

    //公共事业
    .state('app.publicService', {
      abstract: true,
      name: 'publicService',
      url: '/publicService',
      templateUrl: 'app/in/publicService/publicServiceHome.html', 
      controller: 'publicServiceCtrl'
    })
    .state('app.publicService.education', {
      name: 'education',
      url: '/education',
      templateUrl: 'app/in/publicService/one/education/education.html', 
      controller: 'educationCtrl'
    })
    .state('app.publicService.healthCare', {
      name: 'healthCare',
      url: '/healthCare',
      templateUrl: 'app/in/publicService/one/healthCare/healthCare.html', 
      controller: 'healthCareCtrl'
    })
    .state('app.publicService.telecom', {
      name: 'telecom',
      url: '/telecom',
      templateUrl: 'app/in/publicService/one/telecom/telecom.html', 
      controller: 'telecomCtrl'
    })
    .state('app.publicService.traffic', {
      name: 'traffic',
      url: '/traffic',
      templateUrl: 'app/in/publicService/one/traffic/traffic.html', 
      controller: 'trafficCtrl'
    })
    .state('app.publicService.detail', {
      url: '/detail?kpiId',
      name: 'publicServiceDetail',
      templateUrl: 'app/in/publicService/two/publicServiceDetail.html',
      controller: 'publicServiceDetailCtrl'
    })
    
    // 城市管理
    .state('app.cm', {
      abstract: true,
      name: 'cm',
      url: '/cm',
      templateUrl: 'app/in/citymanager/cm.html', 
      controller: 'cmCtrl'
    })
    .state('app.cm.cmlist', {
      url: '/cmlist?categoryId',
      name: 'cmlist',
      templateUrl: 'app/in/citymanager/one/cmlist.html',
      controller: 'cmlistCtrl'
    })
    .state('app.cm.bystate', {
      url: '/bystate/?categoryId&state',
      name: 'bystate',
      templateUrl: 'app/in/citymanager/one/bystate/bystate.html',
      controller: 'cmByStateCtrl'
    })
    .state('app.cm.detail', {
      url: '/detail?kpiId',
      name: 'cmdetail',
      templateUrl: 'app/in/citymanager/two/cmdetail.html',
      controller: 'cmdetailCtrl'
    })
    ;
    

  $urlRouterProvider.otherwise('/');
};
