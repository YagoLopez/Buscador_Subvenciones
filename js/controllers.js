MyApp.angular.controller('IndexPageController', ['$scope', '$http', 'InitService', function ($scope, $http, InitService) {

    InitService.addEventListener('ready', function () {
        // DOM ready
        console.log('IndexPageController: ok, DOM ready');

        // You can access angular like this:
        // MyApp.angular

        // And you can access Framework7 like this:
        // MyApp.fw7.app
    });

    $scope.hello= 'hello from IndexPageController';
    var $$ = Dom7;

    //$$('.alert-text').on('click', function () {
    //    MyApp.fw7.app.alert('Here goes alert text');
    //});

    $scope.doAlert = function(){
        MyApp.fw7.app.alert('Here goes alert text');
    }
}]);

MyApp.angular.controller('DetailPageController', ['$scope', function ($scope) {

  $scope.hello= 'hello from DetailPageController';
  
}]);

//MyApp.angular.controller('AboutPageController', ['$scope', function ($scope) {
//    console.log('AboutPageController');
//    $scope.hello2= 'hello from AboutPageController';
//
//}]);

MyApp.angular.controller('SerchCtrl', ['$scope', function ($scope) {
}]);

MyApp.angular.controller('IncludePageCtrl', ['$scope', '$templateCache', function ($scope, $window) {
    console.log('IncludePageCtrl');
    $scope.contador = 0;
    $scope.modificar = function(){
        $scope.contador = $scope.contador + 1;
    }
}]);