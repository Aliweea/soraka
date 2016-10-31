// angular.module('soraka')
//   .service('AuthTool', ['$localStorage', '$sessionStorage', function ($localStorage, $sessionStorage) {

//     //常量
//     var TOKEN_KEY = 'X-Auth-Token',
//       LOGIN_USER = 'Login-User',
//       CURR_WORKSPACE = 'Curr-Workspace',
//       WORKSPACE_LIST = 'Workspace-List',
//       USERNAME = 'username',
//       PASSWORD = 'password',
//       USER_EMAIL = 'useremail',
//       USER_ACCOUNT = 'useraccount',
//       USER_ROLE = 'userrole';

//     this.isLogin = function () {
//       return $sessionStorage[LOGIN_USER] && $sessionStorage[TOKEN_KEY];
//     };

//     this.login = function (user, token,username,useremail,useraccount,userrole) {
      // $sessionStorage[LOGIN_USER] = user;
      // $sessionStorage[TOKEN_KEY] = token;
      // $sessionStorage[USERNAME] = username;
      // $sessionStorage[USER_EMAIL] = useremail;
      // $sessionStorage[USER_ACCOUNT] = useraccount;
      // $sessionStorage[USER_ROLE] = userrole;
//     };

    
//   }]);


  export default ($localStorage,$sessionStorage) => {
    'ngInject';
    var TOKEN_KEY = 'X-Auth-Token',
            LOGIN_USER = 'Login-User',
            CURR_WORKSPACE = 'Curr-Workspace',
            WORKSPACE_LIST = 'Workspace-List',
            USERNAME = 'username',
            PASSWORD = 'password',
            USER_EMAIL = 'useremail',
            USER_ACCOUNT = 'useraccount',
            USER_ROLE = 'userrole';
      return{
        isLogin: () => {
          return $sessionStorage[LOGIN_USER] && $sessionStorage[TOKEN_KEY];
        },
        login: (user, token,username,useremail,useraccount,userrole) => {
           $sessionStorage[LOGIN_USER] = user;
           $sessionStorage[TOKEN_KEY] = token;
           $sessionStorage[USERNAME] = username;
           $sessionStorage[USER_EMAIL] = useremail;
           $sessionStorage[USER_ACCOUNT] = useraccount;
           $sessionStorage[USER_ROLE] = userrole;
        }
      }
  }
