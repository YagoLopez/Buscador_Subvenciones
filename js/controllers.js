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
    console.log('listado boe ctrl');
    var url = null;
    $scope.totalItems = 0;

    MyApp.fw7.app.onPageBeforeInit('listadoBoe', function (page) {
        if(page.query.clase === 'subvenciones') url = Boe.urlListadoSubvenciones;
        else if(page.query.clase === 'becas'){}
        else if(page.query.clase === 'premios'){};
        //$scope.obtenerItems();
      });

    $scope.obtenerItems = function(){
      Boe.getListado(url).then(function(resp){
          $scope.items = resp.data.query.results.item;
      });
    };

});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, $sce) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        Boe.getDetalle(Boe.urlDetalleSubvencion).then(function(htmlDetalle){
            console.log('detalle subvencion', htmlDetalle);
            $scope.htmlDetalle = $sce.trustAsHtml(htmlDetalle);
        });
    });


});