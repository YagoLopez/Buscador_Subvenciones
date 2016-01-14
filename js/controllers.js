MyApp.angular.controller('IndexPageController', function ($scope, InitService, $rootScope, ColeccionAyudas) {

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

MyApp.angular.controller('IncludePageCtrl', function ($scope, $rootScope, ColeccionAyudas) {
    console.log('IncludePageCtrl');
    $scope.contador = 0;
    //$scope.nAyudas = 0;
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

    $scope.averiguaAyudas = function(){
        console.log('ColeccionAyudas.datos desde IncludePageCtrl.averiguaAyudas', ColeccionAyudas.getDatos());
        $scope.nAyudas = ColeccionAyudas.getDatos().length;
    };

    MyApp.fw7.app.onPageBeforeInit('includepge', function (page) {
        ColeccionAyudas.getDatosRemotos().success(function(data){
            ColeccionAyudas.setDatos(data.results);
            $scope.nAyudas = data.results.length;
            $scope.coleccionAyudas = data.results
            console.log('ColeccionAyudas.datos desde IncludePageCtrl', ColeccionAyudas.getDatos() );
        }).error(function(msg){
            console.error(msg);
        });

    })
});


