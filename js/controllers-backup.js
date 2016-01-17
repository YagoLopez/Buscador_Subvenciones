MyApp.angular.controller('IndexPageController', function ($scope, InitService, $rootScope) {

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
// =====================================================================================================================
MyApp.angular.controller('DetailPageController', function ($scope) {
  $scope.hello= 'hello from DetailPageController';
});
// =====================================================================================================================
MyApp.angular.controller('AboutPageController', function ($scope) {
    console.log('hello from AboutPageController');
    $scope.hello2= 'hello from AboutPageController';
});
// =====================================================================================================================
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, Boe) {
    var url = null;
    $scope.totalItems = 0;

    MyApp.fw7.app.onPageBeforeInit('listadoBoe', function (page) {
        if(page.query.clase === 'subvenciones') url = Boe.urlListadoSubvenciones;
        else if(page.query.clase === 'becas'){}
        else if(page.query.clase === 'premios'){};
        //$scope.obtenerItems();
      });

    $scope.obtenerItems = function(){
        console.log('url', url);
        Boe.getJson(url).then(
            function(resp){
                var resultado = resp.query.results.item;
                Boe.setDatos(resultado);
                $scope.totalItems = resp.query.count;
                $scope.items = resultado;
                console.log('datos desde ListadoBoeCtrl', Boe.getDatos() );
        }, function(resp){
                console.error(resp);
                var msg = 'ERROR<br>Traza: ListadoBoeCtrl.getJson<br>Estado: '+resp.status+
                    '<br>Posibles causas:<br>'+'1) No conexion datos <br>2) Fallo servidor remoto'+resp.data;
                MyApp.fw7.app.alert(msg);
        });
    };

});
// =====================================================================================================================
MyApp.angular.controller('detalleBoeCtrl', function ($scope, Boe) {
    MyApp.fw7.app.onPageBeforeInit('listadoBoe', function (page) {
    });

});