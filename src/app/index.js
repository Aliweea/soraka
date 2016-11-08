/* 
* please keep the code elegant
*/

// config
import config from './config/config';
import httpConfig from './config/http';
import routerConfig from './config/route';
import loadingConfig from './config/loading';
import i18nConfig from './i18n/config';

// service
import commonSer from './common/commonSer';
import qService from './services/q-service';
import dService from './services/d-service';
import hService from './services/h-service';
import unitService from './services/unit-service';
import dateService from './services/date-service';
import AuthTool  from './services/auth-tool';

// resource
import accountRes from './resources/account-res';
import kpiRes from './resources/kpi-res';
import kpiSpanRes from './resources/SpanKPI-res';

// factories
import lFactory from './factories/l-factory';

// directive
import headerDirect from './common/header/headerDirect';

// filter
import economyFilter from './filter/EconomyFilter';
import GDPDetailFilter from './filter/GDPDetailFilter'
import kpiStatusTextFilter from './filter/publicsecurity/kpiStatusTextFilter';
import kpiStatusClassFilter from './filter/publicsecurity/kpiStatusClassFilter';
import insuranceFilter from './filter/insuranceFilter';
import populationFilter from './filter/PopulationFilter';
import energyFilter from './filter/Environment/EnergyFilter';
import landFilter from './filter/Environment/LandFilter';
import environmentDetailFilter from './filter/Environment/EnvironmentDetailFilter';
import publicsecuritydetailFilter from './filter/publicsecurity/publicsecuritydetailFilter';
import kpiUnitFilter from './filter/publicsecurity/kpiUnitFilter';
import applyDateFilter from './filter/applyDateFilter';
import unitTransFilter from './filter/unitTransFilter';
import FinanceDetailFilter from './filter/FinanceFilter';
import FinancialDetailFilter from './filter/FinancialFilter';
import investmentDetailFilter from './filter/investDetailFilter';
import industryDetailFilter from './filter/industryFilter';
// controllers

import appCtrl from './appCtrl';
// 登陆及首页Controller
import portalCtrl from './auth/portal/portalCtrl';
import inCtrl from './in/inCtrl';
import homeCtrl from './in/home/homeCtrl';
// 侧边栏Controller
import meCtrl from './in/me/meCtrl';
import datepickCtrl from './in/datepick/datepickCtrl';
// 经济模块Controller
import GDPCtrl from './in/Economy/GDP/GDPCtrl.js';
import financeCtrl from './in/Economy/Finance/financeCtrl.js';
import financialCtrl from './in/Economy/Financial/financial.js';
import investmentCtrl from './in/Economy/investment/investmentCtrl.js';
import industryCtrl from './in/Economy/industry/industryCtrl.js';
import GDPDetailCtrl from './in/Economy/EconomyDetail/GDPDetail/GDPDetailCtrl';
import FirstDetailCtrl from './in/Economy/EconomyDetail/FirstGDP/firstgdp';
import FirstGDPIndexCtrl from './in/Economy/EconomyDetail/FirstGDP/firstgdpindex';
import SecondDetailCtrl from './in/Economy/EconomyDetail/SecondGDP/secondgdp';
import SecondDetailIndexCtrl from './in/Economy/EconomyDetail/SecondGDP/secondgdpindex';
import ThirdDetailCtrl from './in/Economy/EconomyDetail/ThirdGDP/thirdgdp';
import ThirdDetailIndexCtrl from './in/Economy/EconomyDetail/ThirdGDP/thirdgdpindex';
import FinancedetailCtrl from './in/Economy/FinanceDetail/financein.js';
import FinancialdetailCtrl from './in/Economy/FinancialDetail/financialDetail.js';
import investmentDetailCtrl from './in/Economy/investmentDetail/investmentDetailCtrl.js';
import industryDetailCtrl from './in/Economy/industryDetail/industryDetailCtrl';
//环境模块Controller
import EnvironmentCtrl from './in/Environment/EnvironmentCtrl.js';
import waterCtrl from './in/Environment/one/water/waterCtrl.js';
import airCtrl from './in/Environment/one/air/airCtrl.js';
import landCtrl from './in/Environment/one/land/landCtrl.js';
import energyCtrl from './in/Environment/one/energy/energyCtrl.js';
import waterSecondCtrl from './in/Environment/EnvironmentDetail/water/waterSecond.js';
import airSecondCtrl from './in/Environment/EnvironmentDetail/air/airSecond.js';
import energySecondCtrl from './in/Environment/EnvironmentDetail/energy/energySecond.js';
import commercialGrossDetailCtrl from './in/Environment/EnvironmentDetail/land/commercialGrossCtrl.js';
import commercialAreaDetailCtrl from './in/Environment/EnvironmentDetail/land/commercialAreaCtrl.js';
import cultivateAreaDetailCtrl from './in/Environment/EnvironmentDetail/land/cultivateAreaCtrl.js';
import illegalAreaDetailCtrl from './in/Environment/EnvironmentDetail/land/illegalAreaCtrl.js';
import industryAreaDetailCtrl from './in/Environment/EnvironmentDetail/land/industryAreaCtrl.js';
import industryGrossDetailCtrl from './in/Environment/EnvironmentDetail/land/industryGrossCtrl.js';
// 民生模块Controller
import LivehoodHomeCtrl from './in/livehood/one/LivehoodHomeCtrl.js';
import populationCtrl from './in/livehood/one/population/populationCtrl.js';
import insuranceCtrl from './in/livehood/one/insurance/insuranceCtrl.js';
import priceCtrl from './in/livehood/one/price/priceCtrl.js';
import lvdetailCtrl from './in/livehood/two/lvdetailCtrl.js';
// 公共安全模块Controller
import policeCtrl from './in/publicsecurity/one/police/policeCtrl.js';
import firecontrolCtrl from './in/publicsecurity/one/firecontrol/firecontrolCtrl.js';
import petitionCtrl from './in/publicsecurity/one/petition/petitionCtrl.js';
import safetyCtrl from './in/publicsecurity/one/safety/safetyCtrl.js';
import accidentCtrl from './in/publicsecurity/one/accident/accidentCtrl.js';
import publicsecuritydetailCtrl from './in/publicsecurity/two/publicsecuritydetailCtrl.js';
// 城市管理模块Controller
import cmCtrl from './in/citymanager/cmCtrl.js';
import refuseCtrl from './in/citymanager/one/refuse/refuseCtrl.js';
import punishCtrl from './in/citymanager/one/punish/punishCtrl.js';
import fixCtrl from './in/citymanager/one/fix/fixCtrl.js';
import icmCtrl from './in/citymanager/one/icm/icmCtrl.js';
import cmdetailCtrl from './in/citymanager/two/cmdetailCtrl.js';
// 公共事业Controller
import publicServiceCtrl from './in/publicService/publicServiceHomeCtrl.js';
import educationCtrl from './in/publicService/one/education/educationCtrl.js';
import healthCareCtrl from './in/publicService/one/healthCare/healthCareCtrl.js';
import telecomCtrl from './in/publicService/one/telecom/telecomCtrl.js';
import trafficCtrl from './in/publicService/one/traffic/trafficCtrl.js';
import publicServiceDetailCtrl from './in/publicService/two/publicServiceDetailCtrl.js';

angular.module('soraka',
  ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router', 'ngResource', 'ngStorage', 'mobile-angular-ui','ui.bootstrap', 'highcharts-ng'])


  // 配置全局常量
  .constant('lcConfig', config)
  .constant('moment', window.moment)
  .constant('BASE_URL', 'http://10.60.36.96:8080/api') // 测试
  // .constant('BASE_URL', '/api') // 发布

  // 基础配置
  .config(httpConfig)
  .config(routerConfig)
  .config(loadingConfig)
  
  // 自动执行
  .run(i18nConfig)

  // services 初始化
  .service('commonSer', commonSer)
  .service('qService', qService)
  .service('dService', dService)
  .service('hService', hService)
  .service('AuthTool',AuthTool)
  .service('dateService',dateService)
  .service('unitService',unitService)

  // factory 初始化
  .factory('accountRes', accountRes)
  .factory('kpiRes',kpiRes)
  .factory('kpiSpanRes',kpiSpanRes)
  .factory('lFactory',lFactory)

  // directive 初始化
  .directive('lcHeader', headerDirect)
  
  // filter 初始化
  .filter('economyFilter',economyFilter)
  .filter('GDPDetailFilter',GDPDetailFilter)
  .filter('kpiStatusTextFilter', kpiStatusTextFilter)
  .filter('kpiStatusClassFilter', kpiStatusClassFilter)
  .filter('insuranceFilter',insuranceFilter)
  .filter('populationFilter', populationFilter)
  .filter('energyFilter',energyFilter)
  .filter('landFilter',landFilter)
  .filter('environmentDetailFilter',environmentDetailFilter)
  .filter('publicsecuritydetailFilter',publicsecuritydetailFilter)
  .filter('kpiUnitFilter',kpiUnitFilter)
  .filter('applyDateFilter',applyDateFilter)
  .filter('unitTransFilter',unitTransFilter)
  .filter('FinanceDetailFilter',FinanceDetailFilter)
  .filter('FinancialDetailFilter',FinancialDetailFilter)
  .filter('investmentDetailFilter',investmentDetailFilter)
  .filter('industryDetailFilter',industryDetailFilter)


  // controllers 初始化
  .controller('appCtrl', appCtrl)
  .controller('portalCtrl', portalCtrl)
  .controller('inCtrl', inCtrl)
  .controller('homeCtrl', homeCtrl)
  // 侧边栏controllers
  .controller('meCtrl', meCtrl)
  .controller('datepickCtrl', datepickCtrl)
  // 经济controllers
  .controller('GDPCtrl',GDPCtrl)
  .controller('financeCtrl',financeCtrl)
  .controller('financialCtrl',financialCtrl)
  .controller('investmentCtrl',investmentCtrl)
  .controller('industryCtrl',industryCtrl)
  .controller('GDPDetailCtrl',GDPDetailCtrl)
  .controller('FirstDetailCtrl',FirstDetailCtrl)
  .controller('FirstGDPIndexCtrl',FirstGDPIndexCtrl)
  .controller('SecondDetailCtrl',SecondDetailCtrl)
  .controller('SecondDetailIndexCtrl',SecondDetailIndexCtrl)
  .controller('ThirdDetailCtrl',ThirdDetailCtrl)
  .controller('ThirdDetailIndexCtrl',ThirdDetailIndexCtrl)
  .controller('FinancedetailCtrl',FinancedetailCtrl)
  .controller('FinancialdetailCtrl',FinancialdetailCtrl)
  .controller('investmentDetailCtrl',investmentDetailCtrl)
  .controller('industryDetailCtrl',industryDetailCtrl)

  // 环境controllers
  .controller('EnvironmentCtrl',EnvironmentCtrl)
  .controller('waterCtrl',waterCtrl)
  .controller('airCtrl',airCtrl)
  .controller('landCtrl',landCtrl)
  .controller('energyCtrl',energyCtrl)
  .controller('waterSecondCtrl',waterSecondCtrl)
  .controller('airSecondCtrl',airSecondCtrl)
  .controller('energySecondCtrl',energySecondCtrl)
  .controller('commercialGrossDetailCtrl',commercialGrossDetailCtrl)
  .controller('commercialAreaDetailCtrl',commercialAreaDetailCtrl)
  .controller('cultivateAreaDetailCtrl',cultivateAreaDetailCtrl)
  .controller('illegalAreaDetailCtrl',illegalAreaDetailCtrl)
  .controller('industryAreaDetailCtl',industryAreaDetailCtrl)
  .controller('industryGrossDetailCtrl',industryGrossDetailCtrl)
  // 民生controllers
  .controller('populationCtrl',populationCtrl)
  .controller('insuranceCtrl',insuranceCtrl)
  .controller('priceCtrl',priceCtrl)
  .controller('lvdetailCtrl',lvdetailCtrl)
  .controller('LivehoodHomeCtrl',LivehoodHomeCtrl)
  // 公共安全controllers
  .controller('policeCtrl', policeCtrl)
  .controller('firecontrolCtrl', firecontrolCtrl)
  .controller('accidentCtrl', accidentCtrl)
  .controller('petitionCtrl', petitionCtrl)
  .controller('safetyCtrl', safetyCtrl)
  .controller('publicsecuritydetailCtrl',publicsecuritydetailCtrl)

  // 公共事业controllers
  .controller('publicServiceCtrl', publicServiceCtrl)
  .controller('educationCtrl', educationCtrl)
  .controller('healthCareCtrl', healthCareCtrl)
  .controller('telecomCtrl', telecomCtrl)
  .controller('trafficCtrl', trafficCtrl)
  .controller('publicServiceDetailCtrl', publicServiceDetailCtrl)

  // 城市管理controllers
  .controller('cmCtrl', cmCtrl)
  .controller('refuseCtrl', refuseCtrl)
  .controller('punishCtrl', punishCtrl)
  .controller('fixCtrl', fixCtrl)
  .controller('icmCtrl', icmCtrl)
  .controller('cmdetailCtrl', cmdetailCtrl)
  ;