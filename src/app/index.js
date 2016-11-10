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
import kpiDetailService from './services/kpiDetailService';
import AuthTool  from './services/auth-tool';
import generalService from './services/generalService';
import dictService from './services/dictService';

// resource
import accountRes from './resources/account-res';
import kpiRes from './resources/kpi-res';
import kpiSpanRes from './resources/SpanKPI-res';
import dataDetailFactory from './resources/dataDetailFactory';
import dictFactory from './resources/dictFactory';

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
import environmentThreeFilter from './filter/Environment/EnvironmentThreeFilter';
import publicsecuritythreeFilter from './filter/publicsecurity/publicsecuritythreeFilter';
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
import economyCtrl from './in/economy/economyCtrl.js';
import economylistCtrl from './in/economy/one/economylistCtrl.js';
import economydetailCtrl from './in/economy/two/economydetailCtrl.js';
import economyByStateCtrl from './in/economy/one/bystate/bystateCtrl.js';
import thirdgdpcontroller from './in/economy/EconomyThird/thirdgdpcontroller.js';
import thirdfinancecontroller from './in/economy/EconomyThird/thirdfinance/thirdfinance.js';
import thirdinvestcontroller from './in/economy/EconomyThird/thirdinvest/thirdinvest.js';
import thirdindustrycontroller from './in/economy/EconomyThird/thirdindustry/thirdindustry.js';
import thirdfisicalcontroller from './in/economy/EconomyThird/thirdfisical/thirdfisical.js';
//环境模块Controller
import environmentCtrl from './in/Environment/environmentCtrl.js';
import environmentlistCtrl from './in/Environment/one/environmentlistCtrl.js';
import environmentdetailCtrl from './in/Environment/two/environmentdetailCtrl.js';
import environmentByStateCtrl from './in/Environment/one/bystate/bystateCtrl.js';
import waterThreeCtrl from './in/Environment/three/water/waterThreeCtrl.js';
import airThreeCtrl from './in/Environment/three/air/airThreeCtrl.js';
import landThreeCtrl from './in/Environment/three/land/landThreeCtrl.js';
import energyThreeCtrl from './in/Environment/three/energy/energyThreeCtrl.js';

// 民生模块Controller
import LivehoodHomeCtrl from './in/livehood/one/LivehoodHomeCtrl.js';
import populationCtrl from './in/livehood/one/population/populationCtrl.js';
import insuranceCtrl from './in/livehood/one/insurance/insuranceCtrl.js';
import priceCtrl from './in/livehood/one/price/priceCtrl.js';
import lvdetailCtrl from './in/livehood/two/lvdetailCtrl.js';
// 公共安全模块Controller
import publicsecurityCtrl from './in/publicsecurity/publicsecurityCtrl.js';
import publicsecuritylistCtrl from './in/publicsecurity/one/publicsecuritylistCtrl.js';
import publicsecuritydetailCtrl from './in/publicsecurity/two/publicsecuritydetailCtrl.js';
import publicsecurityByStateCtrl from './in/publicsecurity/one/bystate/bystateCtrl.js';
import policethreeCtrl from './in/publicsecurity/three/police/policethreeCtrl.js';
import accidentthreeCtrl from './in/publicsecurity/three/accident/accidentthreeCtrl.js';
import firethreeCtrl from './in/publicsecurity/three/fire/firethreeCtrl.js';
import petitionthreeCtrl from './in/publicsecurity/three/petition/petitionthreeCtrl.js';
import safetythreeCtrl from './in/publicsecurity/three/safety/safetythreeCtrl.js';
// 城市管理模块Controller
import cmCtrl from './in/citymanager/cmCtrl.js';
import cmlistCtrl from './in/citymanager/one/cmlistCtrl.js';
import cmdetailCtrl from './in/citymanager/two/cmdetailCtrl.js';
import cmByStateCtrl from './in/citymanager/one/bystate/bystateCtrl.js';
// 公共事业Controller
import publicServiceCtrl from './in/publicService/publicServiceHomeCtrl.js';
import educationCtrl from './in/publicService/one/education/educationCtrl.js';
import healthCareCtrl from './in/publicService/one/healthCare/healthCareCtrl.js';
import telecomCtrl from './in/publicService/one/telecom/telecomCtrl.js';
import trafficCtrl from './in/publicService/one/traffic/trafficCtrl.js';
import publicServiceDetailCtrl from './in/publicService/two/publicServiceDetailCtrl.js';

angular.module('soraka',
  ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router', 'ngResource', 'ngStorage', 'mobile-angular-ui','ui.bootstrap', 'highcharts-ng', '720kb.datepicker'])


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
  .service('generalService',generalService)
  .service('dictService',dictService)
  .service('kpiDetailService',kpiDetailService)
  .service('unitService',unitService)


  // factory 初始化
  .factory('accountRes', accountRes)
  .factory('kpiRes',kpiRes)
  .factory('kpiSpanRes',kpiSpanRes)
  .factory('dataDetailFactory',dataDetailFactory)
  .factory('dictFactory',dictFactory)
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
  .filter('environmentThreeFilter',environmentThreeFilter)
  .filter('publicsecuritythreeFilter',publicsecuritythreeFilter)
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
  .controller('economyCtrl', economyCtrl)
  .controller('economylistCtrl', economylistCtrl)
  .controller('economydetailCtrl', economydetailCtrl)
  .controller('economyByStateCtrl', economyByStateCtrl)
  .controller('thirdgdpcontroller',thirdgdpcontroller)
  .controller('thirdfinancecontroller',thirdfinancecontroller)
  .controller('thirdinvestcontroller',thirdinvestcontroller)
  .controller('thirdindustrycontroller',thirdindustrycontroller)
  .controller('thirdfisicalcontroller',thirdfisicalcontroller)
  // 环境controllers
  .controller('environmentCtrl', environmentCtrl)
  .controller('environmentlistCtrl', environmentlistCtrl)
  .controller('environmentdetailCtrl', environmentdetailCtrl)
  .controller('environmentByStateCtrl', environmentByStateCtrl)
  .controller('waterThreeCtrl',waterThreeCtrl)
  .controller('airThreeCtrl',airThreeCtrl)
  .controller('landThreeCtrl',landThreeCtrl)
  .controller('energyThreeCtrl',energyThreeCtrl)

  // 民生controllers
  .controller('populationCtrl',populationCtrl)
  .controller('insuranceCtrl',insuranceCtrl)
  .controller('priceCtrl',priceCtrl)
  .controller('lvdetailCtrl',lvdetailCtrl)
  .controller('LivehoodHomeCtrl',LivehoodHomeCtrl)
  // 公共安全controllers
  .controller('publicsecurityCtrl', publicsecurityCtrl)
  .controller('publicsecuritylistCtrl', publicsecuritylistCtrl)
  .controller('publicsecuritydetailCtrl', publicsecuritydetailCtrl)
  .controller('publicsecurityByStateCtrl', publicsecurityByStateCtrl)
  .controller('policethreeCtrl',policethreeCtrl)
  .controller('accidentthreeCtrl',accidentthreeCtrl)
  .controller('firethreeCtrl',firethreeCtrl)
  .controller('petitionthreeCtrl',petitionthreeCtrl)
  .controller('safetythreeCtrl',safetythreeCtrl)

  // 公共事业controllers
  .controller('publicServiceCtrl', publicServiceCtrl)
  .controller('educationCtrl', educationCtrl)
  .controller('healthCareCtrl', healthCareCtrl)
  .controller('telecomCtrl', telecomCtrl)
  .controller('trafficCtrl', trafficCtrl)
  .controller('publicServiceDetailCtrl', publicServiceDetailCtrl)

  // 城市管理controllers
  .controller('cmCtrl', cmCtrl)
  .controller('cmlistCtrl', cmlistCtrl)
  .controller('cmdetailCtrl', cmdetailCtrl)
  .controller('cmByStateCtrl', cmByStateCtrl)
  ;