export default($rootScope) => {
	'ngInject';
	// Needed for the loading screen
	$rootScope.loading = false;

	try {
		workplat.forbiddenRefreshing();
	} catch(e) {
		console.log(e);
	}
};