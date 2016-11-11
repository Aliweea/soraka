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
    .state('app.environment', {
      abstract: true,
      name: 'environment',
      url: '/environment',
      templateUrl: 'app/in/Environment/Environment.html', 
      controller: 'environmentCtrl'
    })
    .state('app.environment.environmentlist', {
      url: '/environmentlist?categoryId',
      name: 'environmentlist',
      templateUrl: 'app/in/Environment/one/environmentlist.html',
      controller: 'environmentlistCtrl'
    })
    .state('app.environment.bystate', {
      url: '/bystate/?categoryId&state',
      name: 'bystate',
      templateUrl: 'app/in/Environment/one/bystate/bystate.html',
      controller: 'environmentByStateCtrl'
    })
    .state('app.environment.detail', {
      url: '/detail?kpiId',
      name: 'environmentdetail',
      templateUrl: 'app/in/Environment/two/environmentdetail.html',
      controller: 'environmentdetailCtrl'
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
    .state('app.publicsecurity', {
      abstract: true,
      name: 'publicsecurity',
      url: '/publicsecurity',
      templateUrl: 'app/in/publicsecurity/publicsecurity.html', 
      controller: 'publicsecurityCtrl'
    })
    .state('app.publicsecurity.publicsecuritylist', {
      url: '/publicsecuritylist?categoryId',
      name: 'publicsecuritylist',
      templateUrl: 'app/in/publicsecurity/one/publicsecuritylist.html',
      controller: 'publicsecuritylistCtrl'
    })
    .state('app.publicsecurity.bystate', {
      url: '/bystate/?categoryId&state',
      name: 'bystate',
      templateUrl: 'app/in/publicsecurity/one/bystate/bystate.html',
      controller: 'publicsecurityByStateCtrl'
    })
    .state('app.publicsecurity.detail', {
      url: '/detail?kpiId',
      name: 'publicsecuritydetail',
      templateUrl: 'app/in/publicsecurity/two/publicsecuritydetail.html',
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
    .state('app.publicsecurity.psthirdselect', {
      url: '/psthirdselect',
      templateUrl: 'app/in/publicsecurity/three/psthirdselect.html'
    })

    // 民生
    .state('app.livehood', {
      abstract: true,
      name: 'livehood',
      url: '/livehood',
      templateUrl: 'app/in/livehood/livehood.html', 
      controller: 'livehoodCtrl'
    })
    .state('app.livehood.livehoodlist', {
      url: '/livehoodlist?categoryId',
      name: 'livehoodlist',
      templateUrl: 'app/in/livehood/one/livehoodlist.html',
      controller: 'livehoodlistCtrl'
    })
    .state('app.livehood.bystate', {
      url: '/bystate/?categoryId&state',
      name: 'bystate',
      templateUrl: 'app/in/livehood/one/bystate/bystate.html',
      controller: 'livehoodByStateCtrl'
    })
    .state('app.livehood.detail', {
      url: '/detail?kpiId',
      name: 'livehooddetail',
      templateUrl: 'app/in/livehood/two/livehooddetail.html',
      controller: 'livehooddetailCtrl'
    })
    //民生人口三级界面
    .state('app.livehood.PopulationStructure',{
      url:'/PopulationThree/PopulationStructure',
      templateUrl:'app/in/livehood/three/population/populationThree.html',
      controller:'populationThreeCtrl'
    })
    .state('app.livehood.TerminalPopulation',{
      url:'/PopulationThree/TerminalPopulation',
      templateUrl:'app/in/livehood/three/population/populationThree.html',
      controller:'populationThreeCtrl'
    })
    .state('app.livehood.BornDeath',{
      url:'/PopulationThree/BornDeath',
      templateUrl:'app/in/livehood/three/population/populationThree.html',
      controller:'populationThreeCtrl'
    })
    .state('app.livehood.BearingWomen',{
      url:'/PopulationThree/BearingWomen',
      templateUrl:'app/in/livehood/three/population/populationThree.html',
      controller:'populationThreeCtrl'
    })
    .state('app.livehood.FirstMarriage',{
      url:'/PopulationThree/FirstMarriage',
      templateUrl:'app/in/livehood/three/population/populationThree.html',
      controller:'populationThreeCtrl'
    })
    //社会保险三级界面UBEI
      .state('app.livehood.UBEI', {
      url: '/InsuranceChart/UrbanBasicEndowmentInsuranceData',
      name: 'UBEI',
      templateUrl: 'app/in/livehood/three/insurance/insurance.html',
      controller: 'insuranceCtrl'
    })
         //社会保险三级界面UI
      .state('app.livehood.UI', {
      url: '/InsuranceChart/UnemploymentInsuranceData',
      name: 'UBEI',
      templateUrl: 'app/in/livehood/three/insurance/insurance.html',
      controller: 'insuranceCtrl'
    })
         .state('app.livehood.UBMI', {
      url: '/InsuranceChart/UrbanBasicMedicalInsuranceData',
      name: 'UBMI',
      templateUrl: 'app/in/livehood/three/insurance/insurance.html',
      controller: 'insuranceCtrl'
    })
         .state('app.livehood.EII', {
      url: '/InsuranceChart/EmploymentInjuryInsuranceData',
      name: 'EII',
      templateUrl: 'app/in/livehood/three/insurance/insurance.html',
      controller: 'insuranceCtrl'
    })
            .state('app.livehood.MI', {
      url: '/InsuranceChart/MaternityInsuranceData',
      name: 'MI',
      templateUrl: 'app/in/livehood/three/insurance/insurance.html',
      controller: 'insuranceCtrl'
    })
      .state('app.livehood.RBEI', {
      url: '/InsuranceChart/ResidentsBasicEndowmentInsuranceData',
      name: 'RBEI',
      templateUrl: 'app/in/livehood/three/insurance/insurance.html',
      controller: 'insuranceCtrl'
    })


    //公共事业
    .state('app.publicService', {
      abstract: true,
      name: 'publicService',
      url: '/publicService',
      templateUrl: 'app/in/publicService/publicService.html', 
      controller: 'publicServiceCtrl'
    })
    .state('app.publicService.publicServicelist', {
      url: '/publicServicelist?categoryId',
      name: 'publicServicelist',
      templateUrl: 'app/in/publicService/one/publicServicelist.html',
      controller: 'publicServicelistCtrl'
    })
    .state('app.publicService.bystate', {
      url: '/bystate/?categoryId&state',
      name: 'bystate',
      templateUrl: 'app/in/publicService/one/bystate/bystate.html',
      controller: 'publicServiceByStateCtrl'
    })
    .state('app.publicService.detail', {
      url: '/detail?kpiId',
      name: 'publicServicedetail',
      templateUrl: 'app/in/publicService/two/publicServicedetail.html',
      controller: 'publicServicedetailCtrl'
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
