export default ($scope) => {
	'ngInject';
	console.log("sdf");
	$scope.activeTab1 = () => {
		$scope.tab1 = true;
		$scope.tab2 = false;
	}
	$scope.activeTab1();
	$scope.activeTab2 = () => {
		$scope.tab1 = false;
		$scope.tab2 = true;
	}
	$scope.togglePanel = () => {
		$scope.examplePanel = !$scope.examplePanel;
	}
	$scope.activeItem = () => {
		$scope.examplePanel = false;	
	}
}