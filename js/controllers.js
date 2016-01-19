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

    //$$(document).on('ajaxComplete', function (e) {
    //    var xhr = e.detail.xhr;
    //    console.log('e.detail.xhr');
    //});

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

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        //MyApp.fw7.app.showProgressbar();
        $scope.obtenerItems( hallaUrl(page.query.tipo) );
        //console.log(Dom7.find('li'));
        //console.log(Dom7('#lista')[0]);
        //console.log(Dom7('#lista')[0].childElementCount);
    });

    var hallaUrl = function(tipoAyuda){
        if (tipoAyuda === 'subvenciones') {
            return Boe.urlListado(Boe.urlSubvenciones);
        } else if (tipoAyuda === 'becas') {
            return Boe.urlListado(Boe.urlBecas);
        } else if (tipoAyuda === 'premios') {
            return Boe.urlListado(Boe.urlPremios);
        } else if (tipoAyuda === 'oposiciones') {
            return Boe.urlListado(Boe.urlOposiciones);
        };
    }

    $scope.obtenerItems = function(url){
      Boe.getListado(url).then(function(resp){
          $scope.items = resp.data.query.results.item;
          //MyApp.fw7.app.hideProgressbar();
          MyApp.fw7.app.hideIndicator();
      });
    };

    $scope.hallaId = function(url){
      return url.split('=')[1];
    };


});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, $sce) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        $scope.textoDetalle = 'Obteniendo datos...';
        MyApp.fw7.app.showIndicator();
        Dom7.get( Boe.urlDetalle(page.query.id), function (data) {
            $scope.textoDetalle = $sce.trustAsHtml(data);
            //console.log(data);
            $scope.$apply();
            MyApp.fw7.app.hideIndicator();
        });
        //console.log('pge', page.query.id);
        //console.log('url final', Boe.urlDetalle(page.query.id));
        //Boe.getDetalle( Boe.urlDetalle(page.query.id) ).then( function(resp){
        //    console.log(resp.data.query.results);
        //    $scope.textoDetalle = resp.data.query.results+'...';
        //    MyApp.fw7.app.hideIndicator();
        //});
    });


});