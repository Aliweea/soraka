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
    .state('app.economydetail',{
      abstract:true,
      url:'/economydetail',
      templateUrl:'app/in/Economy/EconomyDetail/EconomyDetail.html'
    })
     .state('app.economydetail.gdp',{
      url:'/economydetail/GDP',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'GDPDetailCtrl'
    })
     .state('app.economydetail.firstgdp',{
      url:'/economydetail/firstgdp',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FirstDetailCtrl'
    })
      .state('app.economydetail.firstgdpindex',{
      url:'/economydetail/firstgdpindex',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FirstGDPIndexCtrl'
    })
     .state('app.economydetail.secondgdp',{
      url:'/economydetail/secondgdp',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'SecondDetailCtrl'
    })
     .state('app.economydetail.secondgdpindex',{
      url:'/economydetail/secondgdpindex',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'SecondDetailIndexCtrl'
    })
     .state('app.economydetail.thirdgdp',{
      url:'/economydetail/thirdgdp',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'ThirdDetailCtrl'
    })
     .state('app.economydetail.thirdgdpindex',{
      url:'/economydetail/thirdgdp',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'ThirdDetailIndexCtrl'
    })
     .state('app.economydetail.financein',{
      url:'/fianancedetail/finance/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.financeinIndex',{
      url:'/fianancedetail/financeinIndex/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.localfinancein',{
      url:'/fianancedetail/localfinancein/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.localfinanceinIndex',{
      url:'/fianancedetail/localfinanceinIndex/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.monthfinancein',{
      url:'/fianancedetail/monthfinancein/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.monthfinanceinIndex',{
      url:'/fianancedetail/monthfinancein/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.monthaccumfinance',{
      url:'/fianancedetail/monthaccumfinance/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     
     .state('app.economydetail.monthaccumfinanceIndex',{
      url:'/fianancedetail/monthaccumfinanceIndex/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.yearfinanceincomplete',{
      url:'/fianancedetail/yearfinanceincomplete/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.financeout',{
      url:'/fianancedetail/financeout/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.financeoutIndex',{
      url:'/fianancedetail/financeoutIndex/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.monthfinanceout',{
      url:'/fianancedetail/monthfinanceout/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.monthfinanceoutIndex',{
      url:'/fianancedetail/monthfinanceoutIndex/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.yearfiananceoutcomplete',{
      url:'/fianancedetail/yearfiananceoutcomplete/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancedetailCtrl'
     })
     .state('app.economydetail.fixedInvestment',{
      url:'/fianancialdetail/fixedInvestment/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })

     .state('app.economydetail.fixedInvestmentcomplete',{
      url:'/fianancialdetail/fixedInvestmentcomplete/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
     .state('app.economydetail.industryInvestment',{
      url:'/fianancialdetail/industryInvestment/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
     .state('app.economydetail.serveInvestment',{
      url:'/fianancialdetail/serveInvestment/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
     .state('app.economydetail.realtyInvestment',{
      url:'/fianancialdetail/realtyInvestment/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
    
     .state('app.economydetail.realforeigncapitaluse',{
      url:'/fianancialdetail/realforeigncapitaluse/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
      .state('app.economydetail.importnewinnercapital',{
      url:'/fianancialdetail/importnewinnercapital/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
       .state('app.economydetail.accumimexport',{
      url:'/fianancialdetail/accumimexport/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
        .state('app.economydetail.yearaccumimexportcomplete',{
      url:'/fianancialdetail/yearaccumimexportcomplete/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
         .state('app.economydetail.accumexport',{
      url:'/fianancialdetail/accumexport/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })
          .state('app.economydetail.exportcomplete',{
      url:'/fianancialdetail/exportcomplete/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'FinancialdetailCtrl'
     })

      .state('app.economydetail.savemoneyRMB',{
      url:'/investment/savemoneyRMB/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'investmentDetailCtrl'
     })
      .state('app.economydetail.loanmoneyRMB',{
      url:'/investment/loanmoneyRMB/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'investmentDetailCtrl'
     })
      .state('app.economydetail.savemoney',{
      url:'/investment/savemoney/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'investmentDetailCtrl'
     })
     .state('app.economydetail.loanmoney',{
      url:'/investment/loanmoney/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'investmentDetailCtrl'
     })
     .state('app.economydetail.industryvalue',{
      url:'/industry/industryvalue/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'industryDetailCtrl'
     })
     .state('app.economydetail.newindustryvalue',{
      url:'/industry/newindustryvalue/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'industryDetailCtrl'
     })
     .state('app.economydetail.industryprofit',{
      url:'/industry/industryprofit/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'industryDetailCtrl'
     })
     .state('app.economydetail.industrytax',{
      url:'/industry/industrytax/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'industryDetailCtrl'
     })
     .state('app.economydetail.industrysale',{
      url:'/industry/industrysale/:id',
      templateUrl:'app/in/Economy/EconomyDetail/GDPDetail/GDPDetail.html',
      controller:'industryDetailCtrl'
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
    .state('app.environmentdetail',{
      abstract:true,
      url:'/environmentdetail',
      templateUrl:'app/in/Environment/EnvironmentDetail/EnvironmentDetail.html'
    })
    .state('app.environmentdetail.financein',{
      url:'/environmentdetail/finance/:id',
      templateUrl:'app/in/Environment/EnvironmentDetail/EnvironmentSecond.html',
      controller:'EnvironmentSecondCtrl'
    })
    .state('app.environmentdetail.commercialLandGross',{
      url:'/land/commercialGross',
      templateUrl:'app/in/Environment/EnvironmentDetail/land/LandDetail.html',
      controller:'commercialGrossDetailCtrl'
    })
    .state('app.environmentdetail.commercialLandArea',{
      url:'/land/commercialArea',
      templateUrl:'app/in/Environment/EnvironmentDetail/land/LandDetail.html',
      controller:'commercialAreaDetailCtrl'
      })
    .state('app.environmentdetail.industryLandGross',{
      url:'/land/industryGross',
      templateUrl:'app/in/Environment/EnvironmentDetail/land/LandDetail.html',
      controller:'industryGrossDetailCtrl'
      })
      .state('app.environmentdetail.industryLandArea',{
        url:'/land/industryArea',
        templateUrl:'app/in/Environment/EnvironmentDetail/land/LandDetail.html',
        controller:'industryAreaDetailCtrl'
      })
      .state('app.environmentdetail.illegalLandArea',{
        url:'/land/illegalArea',
        templateUrl:'app/in/Environment/EnvironmentDetail/land/LandDetail.html',
        controller:'illegalAreaDetailCtrl'
      })
      .state('app.environmentdetail.cultivateLandArea',{
        url:'/land/cultivateArea',
        templateUrl:'app/in/Environment/EnvironmentDetail/land/LandDetail.html',
        controller:'cultivateAreaDetailCtrl'
      })
    .state('app.environmentdetail.waterQuality',{
      url:'/waterQuality',
      templateUrl:'app/in/Environment/EnvironmentDetail/water/waterQuality.html',
      controller:'waterQualityCtrl'
    })
    .state('app.environmentdetail.wasteWater',{
      url:'/wasteWater',
      templateUrl:'app/in/Environment/EnvironmentDetail/water/wasteWater.html',
      controller:'wasteWaterCtrl'
    })
    .state('app.environmentdetail.waterCondition',{
      url:'/waterCondition',
      templateUrl:'app/in/Environment/EnvironmentDetail/water/waterCondition.html',
      controller:'waterConditionCtrl'
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
    .state('app.publicsecuritydetail',{
        abstract:true,
        url:'/publicsecuritydetail',
        templateUrl:'app/in/publicsecurity/publicsecuritydetail/publicsecuritydetail.html'
    })
    .state('app.publicsecuritydetail.policecall',{
        url:'/policecall',
        templateUrl:'app/in/publicsecurity/publicsecuritydetail/police/policecall.html',
        controller:'policecallCtrl'
    })
    .state('app.publicsecuritydetail.policesafe',{
        url:'/policesafe',
        templateUrl:'app/in/publicsecurity/publicsecuritydetail/police/policesafe.html',
        controller:'policesafeCtrl'
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
