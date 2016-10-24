/*
* angular-loading-bar配置
* 
* @Author Mondooo
*/
export default(cfpLoadingBarProvider) => {

	cfpLoadingBarProvider.includeSpinner = false; //加载圈

	cfpLoadingBarProvider.includeBar = true; //加载条

	cfpLoadingBarProvider.latencyThreshold = 500; //最小时间(mm)
};