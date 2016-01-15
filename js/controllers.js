MyApp.angular.controller('IndexPageController', function ($scope, InitService, $rootScope, Subvenciones) {

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

});

MyApp.angular.controller('DetailPageController', function ($scope) {
  $scope.hello= 'hello from DetailPageController';
});

MyApp.angular.controller('AboutPageController', function ($scope) {
    console.log('hello from AboutPageController');
    $scope.hello2= 'hello from AboutPageController';

});

//MyApp.angular.controller('IncludePageCtrl', function ($scope, $rootScope, Subvenciones) {
//    console.log('IncludePageCtrl');
//    $scope.contador = 0;
//    //$scope.totalSubvenciones = 0;
//    $scope.modificar = function(){
//        $scope.contador = $scope.contador + 1;
//    };
//    $scope.averiguarSubvenciones = function(){
//    };
//
//    $scope.averiguaSubvenciones = function(){
//        console.log('Subvenciones.datos desde IncludePageCtrl.averiguaSubvenciones', Subvenciones.getDatos());
//        $scope.totalSubvenciones = Subvenciones.getDatos().length;
//    };
//
//    MyApp.fw7.app.onPageBeforeInit('includepge', function (page) {
//        Subvenciones.getDatosRemotos().success(function(data){
//            Subvenciones.setDatos(data.results);
//            $scope.totalSubvenciones = data.results.length;
//            $scope.Subvenciones = data.results
//            console.log('Subvenciones.datos desde IncludePageCtrl', Subvenciones.getDatos() );
//        }).error(function(msg){
//            console.error(msg);
//        });
//
//    })
//});

MyApp.angular.controller('BoeCtrl', function ($scope, Subvenciones) {
    console.log('BoeCtrl');
    $scope.contador = 0;
    $scope.totalSubvenciones = 0;

    //MyApp.fw7.app.onPageBeforeInit('boe', function (page) {
    //    Subvenciones.getDatosRemotos().success(function(data){
    //        Subvenciones.setDatos(data.results);
    //        $scope.totalSubvenciones = data.results.length;
    //        $scope.subvenciones = data.results
    //        console.log('Subvenciones.datos desde BoeCtrl', Subvenciones.getDatos() );
    //    }).error(function(msg){
    //        console.error(msg);
    //    });
    //});

    $scope.buscarSubvenciones = function(){
        Subvenciones.getDatosRemotos().success(function(data){
            Subvenciones.setDatos(data.results);
            $scope.totalSubvenciones = data.results.length;
            $scope.subvenciones = data.results
            console.log('Subvenciones.datos desde BoeCtrl', Subvenciones.getDatos() );
        }).error(function(msg){
            console.error(msg);
        });
    };
});
