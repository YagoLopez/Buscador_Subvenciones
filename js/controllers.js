MyApp.angular.controller('IndexPageController', function ($scope, InitService, $rootScope, ColeccionAyudas, ColeccionAyudas2) {

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

    $scope.obtenerAyudas = function(){
        ColeccionAyudas2.getDatos().success(function(data){
            ColeccionAyudas2.setDatos(data.results);
            console.log('coleccionayudas2.datos desde IndexCtrl.obtenerAyudas', ColeccionAyudas2.datos);
        }).error(function(msg){
            console.error(msg);
        });    };
});

MyApp.angular.controller('DetailPageController', function ($scope) {
  $scope.hello= 'hello from DetailPageController';
});

MyApp.angular.controller('AboutPageController', function ($scope) {
    console.log('hello from AboutPageController');
    $scope.hello2= 'hello from AboutPageController';

});

MyApp.angular.controller('IncludePageCtrl', function ($scope, $rootScope, ColeccionAyudas, ColeccionAyudas2) {
    console.log('IncludePageCtrl');
    $scope.contador = 0;
    $scope.nAyudas = 0;
    $scope.modificar = function(){
        $scope.contador = $scope.contador + 1;
    };
    $scope.averiguarAyudas = function(){
        if(ColeccionAyudas.todas){
            console.log('coleccion ayudas', ColeccionAyudas);
            console.log('coleccion ayudas.todas', ColeccionAyudas.todas);
            console.log('total coleccion ayudas', ColeccionAyudas.todas.length)
        }
    };

    $scope.averiguarAyudas2 = function(){
        console.log('coleccionayudas2.datos desde IncludePageCtrl.averiguarayudas2', ColeccionAyudas2.datos);
    };


});


