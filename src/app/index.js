/* 
* please keep the code elegant
*/

// config
import config from './config/config';
import httpConfig from './config/http';
import routerConfig from './config/route';
import i18nConfig from './i18n/config';

// service
import commonSer from './common/commonSer';
import qService from './services/q-service';
import AuthTool  from './services/auth-tool';

// resource
import accountRes from './resources/account-res';
import kpiRes from './resources/kpi-res';

// directive
import headerDirect from './common/header/headerDirect';

// filter
import economyFilter from './filter/EconomyFilter';
import kpiStatusTextFilter from './filter/publicsecurity/kpiStatusTextFilter';
import kpiStatusClassFilter from './filter/publicsecurity/kpiStatusClassFilter';
import insuranceFilter from './filter/insuranceFilter';
import populationFilter from './filter/PopulationFilter';
import energyFilter from './filter/EnergyFilter';
import landFilter from './filter/LandFilter';

// controllers
import appCtrl from './appCtrl';
// 登陆及首页Controller
import portalCtrl from './auth/portal/portalCtrl';
import inCtrl from './in/inCtrl';
import homeCtrl from './in/home/homeCtrl';
// 经济模块Controller
import GDPCtrl from './in/Economy/GDP/GDPCtrl.js';
import financeCtrl from './in/Economy/Finance/financeCtrl.js';
import financialCtrl from './in/Economy/Financial/financial.js';
import investmentCtrl from './in/Economy/investment/investmentCtrl.js';
import industryCtrl from './in/Economy/industry/industryCtrl.js';
// 环境模块Controller
import waterCtrl from './in/Environment/water/waterCtrl.js';
import airCtrl from './in/Environment/air/airCtrl.js';
import landCtrl from './in/Environment/land/landCtrl.js';
import energyCtrl from './in/Environment/energy/energyCtrl.js';
// 民生模块Controller
import populationCtrl from './in/livehood/population/populationCtrl.js';
import insuranceCtrl from './in/livehood/insurance/insuranceCtrl.js';
import priceCtrl from './in/livehood/price/priceCtrl.js';
// 公共安全模块Controller
import policeCtrl from './in/publicsecurity/police/policeCtrl.js';
import firecontrolCtrl from './in/publicsecurity/firecontrol/firecontrolCtrl.js';
import petitionCtrl from './in/publicsecurity/petition/petitionCtrl.js';
import safetyCtrl from './in/publicsecurity/safety/safetyCtrl.js';
import accidentCtrl from './in/publicsecurity/accident/accidentCtrl.js';
// 城市管理模块Controller
import cmCtrl from './in/citymanager/cmCtrl.js';
import refuseCtrl from './in/citymanager/refuse/refuseCtrl.js';
import punishCtrl from './in/citymanager/punish/punishCtrl.js';
import fixCtrl from './in/citymanager/fix/fixCtrl.js';
import icmCtrl from './in/citymanager/icm/icmCtrl.js';

angular.module('soraka',
  ['ngAnimate', 'ngCookies', 'ngSanitize', 'ui.router', 'ngResource', 'ngStorage', 'mobile-angular-ui','ui.bootstrap'])

  // 配置全局常量
  .constant('lcConfig', config)
  .constant('moment', window.moment)
  .constant('BASE_URL', 'http://10.60.36.96:8080/api') // 测试
  // .constant('BASE_URL', '/api') // 发布

  // 基础配置
  .config(httpConfig)
  .config(routerConfig)

  // 自动执行
  .run(i18nConfig)

  // services 初始化
  .service('commonSer', commonSer)
  .service('qService', qService)
  .service('AuthTool',AuthTool)

  // factory 初始化
  .factory('accountRes', accountRes)
  .factory('kpiRes',kpiRes)

  // directive 初始化
  .directive('lcHeader', headerDirect)
  
  // filter 初始化
  .filter('economyFilter',economyFilter)
  .filter('kpiStatusTextFilter', kpiStatusTextFilter)
  .filter('kpiStatusClassFilter', kpiStatusClassFilter)
  .filter('insuranceFilter',insuranceFilter)
  .filter('populationFilter', populationFilter)
  .filter('energyFilter',energyFilter)
  .filter('landFilter',landFilter)



  // controllers 初始化
  .controller('appCtrl', appCtrl)
  .controller('portalCtrl', portalCtrl)
  .controller('inCtrl', inCtrl)
  .controller('homeCtrl', homeCtrl)
  // 经济controllers
  .controller('GDPCtrl',GDPCtrl)
  .controller('financeCtrl',financeCtrl)
  .controller('financialCtrl',financialCtrl)
  .controller('investmentCtrl',investmentCtrl)
  .controller('industryCtrl',industryCtrl)
  // 环境controllers
  .controller('waterCtrl',waterCtrl)
  .controller('airCtrl',airCtrl)
  .controller('landCtrl',landCtrl)
  .controller('energyCtrl',energyCtrl)
  // 民生controllers
  .controller('populationCtrl',populationCtrl)
  .controller('insuranceCtrl',insuranceCtrl)
  .controller('priceCtrl',priceCtrl)
  // 公共安全controllers
  .controller('policeCtrl', policeCtrl)
  .controller('firecontrolCtrl', firecontrolCtrl)
  .controller('accidentCtrl', accidentCtrl)
  .controller('petitionCtrl', petitionCtrl)
  .controller('safetyCtrl', safetyCtrl)
  // 公共事业controllers

  // 城市管理controllers
  .controller('cmCtrl', cmCtrl)
  .controller('refuseCtrl', refuseCtrl)
  .controller('punishCtrl', punishCtrl)
  .controller('fixCtrl', fixCtrl)
  .controller('icmCtrl', icmCtrl)
  ;