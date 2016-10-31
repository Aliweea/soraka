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
import ipRes from './resources/ip-res';

// directive
import headerDirect from './common/header/headerDirect';

// controller
import portalCtrl from './auth/portal/portalCtrl';
import appCtrl from './appCtrl';
import inCtrl from './in/inCtrl';
import homeCtrl from './in/home/homeCtrl';


import GDPCtrl from './in/Economy/GDP/GDPCtrl.js';
import financeCtrl from './in/Economy/Finance/financeCtrl.js';
import financialCtrl from './in/Economy/Financial/financial.js';
import investmentCtrl from './in/Economy/investment/investmentCtrl.js';
import industryCtrl from './in/Economy/industry/industryCtrl.js';


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
  .factory('ipRes', ipRes)

  // directive 初始化
  .directive('lcHeader', headerDirect)

  // controller 初始化
  .controller('portalCtrl', portalCtrl)
  .controller('appCtrl', appCtrl)
  .controller('inCtrl', inCtrl)
  .controller('homeCtrl', homeCtrl)
  .controller('GDPCtrl',GDPCtrl)
  .controller('financeCtrl',financeCtrl)
  .controller('financialCtrl',financialCtrl)
  .controller('investmentCtrl',investmentCtrl)
  .controller('industryCtrl',industryCtrl)
  ;