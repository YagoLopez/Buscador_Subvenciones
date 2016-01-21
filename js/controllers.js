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
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, Boe, Error, $timeout) {

    //todo: quitar diacriticos en la busqueda

    var itemsLength = 0;
    //var searchTxt = '';

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.obtenerItems( hallaUrl(page.query.tipo) );
        $scope.mySearchbar = $$('.searchbar')[0].f7Searchbar;

        $$('.list-block-search').on('search', function(e){
            itemsLength = e.detail.foundItems.length;
            //searchTxt = e.detail.query;
            $scope.$broadcast('searchTxtChanged');
        });
    });

    MyApp.fw7.app.onPageReinit('listadoBoe', function(page){
        var searchTxt = $scope.mySearchbar.query;
        if(searchTxt != null && searchTxt != 'undefined'){
            $scope.mySearchbar.clear();
            $timeout(function() {
                console.log('searchtxt', searchTxt);
                $scope.mySearchbar.search(searchTxt);
            }, 10); // hay que esperar que termine el timer de searchbar
        };
    });

    $scope.$on('searchTxtChanged', function(e) {
        $scope.$apply(function(){
            $scope.itemsLenght = itemsLength;
            //$scope.searchTxt = searchTxt;
            //console.log('itemsLength', itemsLength);
            //console.log('searchTxt', searchTxt);
        });
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
          $scope.itemsLenght = resp.data.query.results.item.length;
          MyApp.fw7.app.hideIndicator();
      });
    };

    $scope.hallaId = function(url){
      return url.split('=')[1];
    };

    $scope.getSearchTxt = function(){
    };
    $scope.manualSearch = function(txt){
    };

});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, $sce) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.htmlDetalle = 'Obteniendo datos...';
        console.log('query string', decodeURIComponent(page.query.web), decodeURIComponent(page.query.pdf));
        $scope.web = decodeURIComponent(page.query.web);
        $scope.pdf = decodeURIComponent(page.query.pdf);

        Boe.getDetalle( Boe.urlDetalle(page.query.id)).then(function(htmlDetalle){
            //console.log(htmlDetalle);
            $scope.htmlDetalle = htmlDetalle;
            MyApp.fw7.app.hideIndicator();
        });
    });
    $scope.getHtmlSafe = function(html){
        return $sce.trustAsHtml(html);
    };
    $scope.btnTop = function(){
        console.log('click');
        Dom7('.page-content').scrollTop(0, 500); //500 velocidad
    }
});
// =====================================================================================================================
