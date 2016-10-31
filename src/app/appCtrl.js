export default($rootScope) => {
	'ngInject';
	
	// Needed for the loading screen
	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.loading = true;
	});

	$rootScope.$on('$routeChangeSuccess', function() {
		$rootScope.loading = false;
	});
};