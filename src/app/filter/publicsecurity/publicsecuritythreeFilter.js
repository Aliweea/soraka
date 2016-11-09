export default($rootScope) => {
  'ngInject';
  
  // Needed for the loading screen
  return (input) => {
    switch (input) {
      case '3010':
        return 'policethree';
        break;
      case '3001':
        return 'policethree';
        break;
      case '3014':
        return 'policethree';
        break;
      case '3002':
        return 'policethree';
        break;
      case '3011':
        return 'policethree';
        break; 
      case '3003':
        return 'policethree';
        break;
      case '3005'://当月火灾事故发生数
        return 'firethree';
      case '3007'://当月火灾事故受伤人数
        return 'firethree';
      case '3006'://当月火灾事故死亡人数
        return 'firethree';
      case '3008'://当月火灾事故直接财产损失
        return 'firethree';

      case '3019'://当月受理信访案件总
        return 'petitionthree';
      case '3023'://当月信件结案
        return 'petitionthree';
      case '3024'://当月越级上访信件总
        return 'petitionthree';
      case '3017'://当月生产安全事故总数
        return 'safetythree';
      case '3020'://当月生产安全事故受伤人数
        return 'safetythree';
      case '3021'://当月生产安全事故死亡人数
        return 'safetythree';
      case '3022'://当月生产安全事故直接财产损失
        return 'safetythree';
      case '3009'://当月交通事故发生数
        return 'accidentthree';
      case '3004'://当月交通事故数环比增长率
        return 'accidentthree';
      case '3013'://当月交通事故受伤人数
        return 'accidentthree';
      case '3015'://当月交通事故死亡人数
        return 'accidentthree';
      case '3016'://当月交通事故直接财产损失
        return 'accidentthree';
      default:
        return 'not_found';
      
    };
  };
  
};