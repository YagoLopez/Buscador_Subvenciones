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
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, Boe, Error) {
    var url = null;

    MyApp.fw7.app.onPageBeforeInit('listadoBoe', function (page) {
        if(page.query.clase === 'subvenciones') url = Boe.urlListadoSubvenciones;
        else if(page.query.clase === 'becas'){Boe.urlListadoBecas}
        else if(page.query.clase === 'premios'){Boe.urlListadoPremios}
        else if(page.query.clase === 'oposiciones'){Boe.urlListadoPremios};
        //$scope.obtenerItems();
      });

    $scope.obtenerItems = function(){
      Boe.getListado(url).then(function(resp){
          $scope.items = resp.data.query.results.item;
      });
    };

    $scope.hallaId = function(url){
      return url.split('=')[1];
    };

});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, $sce) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        console.log('pge', page.query.id);
        $scope.textoDetalle = 'Obteniendo datos...';
        Boe.getDetalle( Boe.urlDetalleSubvencion(page.query.id) ).then(function(resp){
            console.log(resp.data.query.results.lenght);
            if (resp.data.query.results.length < 100)
                $scope.textoDetalle =  "[Texto demasiado largo. Consultar p\u00E1gina web o PDF]";
            else
                $scope.textoDetalle = resp.data.query.results+'...';
        });
    });


});