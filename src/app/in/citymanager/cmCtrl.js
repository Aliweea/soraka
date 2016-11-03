export default($scope, $rootScope, kpiRes) => {
	'ngInject';
	$scope.title = "城市管理";
	
	// Needed for the loading screen
	$rootScope.$on('$routeChangeStart', function() {
		$rootScope.loading = true;
	});

	$rootScope.$on('$routeChangeSuccess', function() {
		$rootScope.loading = false;
	});
};