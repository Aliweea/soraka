export default($rootScope) => {
	'ngInject';
	// Needed for the loading screen
	$rootScope.loading = false;

	// APP内取消下拉刷新
	try {
		if (isFunction(window.webwindow.onPullDownToRefresh)) {
			window.webwindow.onPullDownToRefresh(() => {
				return false;
			});
		}
	} catch(e) {
		console.log('Error: ' + e);
	}

	const isFunction = (fn) => {
	   return Object.prototype.toString.call(fn) === '[object Function]';
	}
};