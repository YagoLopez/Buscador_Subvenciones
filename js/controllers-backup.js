//todo: posibles nombres: todo ayudas (buscador de ayudas y subvenciones), subventia, public money
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
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, Boe, $timeout) {

    var itemsLength = 0;

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        $scope.items = []; $scope.itemsLenght = 0; MyApp.fw7.app.showIndicator();
        $scope.tipoAyuda = page.query.tipo;
        $scope.obtenerItems( hallaUrl(page.query.tipo) );
        $scope.searchbarBoe = $$('#searchbarBoe')[0].f7Searchbar;
        $scope.searchbarBoe.params.removeDiacritics = true;

        $$('#bloqueListaBoe').on('search', function(e){
            itemsLength = e.detail.foundItems.length;
            $scope.$broadcast('searchTxtChanged');
        });
    });

    MyApp.fw7.app.onPageReinit('listadoBoe', function(page){
        var searchTxt = $scope.searchbarBoe.query;
        if(searchTxt != '' && searchTxt != 'undefined' && searchTxt != null){
            //console.log('hay texto que buscar');
            $scope.searchbarBoe.clear();
            $timeout(function() {
                console.log('searchtxt', searchTxt);
                $scope.searchbarBoe.search(searchTxt);
            }, 10); // hay que esperar que termine el timer de searchbar
        }
    });

    $scope.$on('searchTxtChanged', function(e) {
        $scope.$apply(function(){
            $scope.itemsLenght = itemsLength;
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
        }
    };

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

    $scope.resetSearchbar = function() {
        $scope.searchbarBoe.clear();
        $scope.searchbarBoe.disable();
    }
});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, $sce) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.htmlDetalle = 'Obteniendo datos...';
        //console.log('query string', decodeURIComponent(page.query.web), decodeURIComponent(page.query.pdf));
        $scope.web = decodeURIComponent(page.query.web);
        $scope.pdf = decodeURIComponent(page.query.pdf);
        $scope.idboe = page.query.id;

        Boe.getDetalle( Boe.urlDetalle(page.query.id)).then(function(htmlDetalle){
            //console.log(htmlDetalle);
            $scope.htmlDetalle = htmlDetalle;
            $scope.showButtons = true;
            MyApp.fw7.app.hideIndicator();
        });
    });

    //todo: agrupar estas funciones en un servicio de utilidad
    $scope.getHtmlSafe = function(html){
        return $sce.trustAsHtml(html);
    };
    $scope.btnTop = function(){
        $$('.page-content').scrollTop(0, 500); //500 velocidad
    }
    $scope.onIconBack = function(){
        $scope.showButtons = false;
    }
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, Idepa, $timeout) {

    MyApp.fw7.app.onPageInit('listadoIdepa', function (page) {
        $scope.itemsLength = 0; $scope.items = []; MyApp.fw7.app.showIndicator();
        $scope.obtenerItems();
        $scope.searchbarIdepa = $$('#searchbarIdepa')[0].f7Searchbar;
        $scope.searchbarIdepa.params.removeDiacritics = true;
        $$('#bloqueListaIdepa').on('search', function(e){
            $scope.itemsLength = e.detail.foundItems.length;
            $scope.$apply();
        });
    });

/*
    MyApp.fw7.app.onPageReinit('listadoIdepa', function(page){
        console.log('listadoIdepa on page reinit');
        //var searchTxt = $scope.searchbarIdepa.query;
        //$scope.searchbarIdepa.search(searchTxt);
        //console.log('listado idepa reinit itemsLength:', $scope.itemsLength);
        //$scope.$apply();
    });
*/

    $scope.obtenerItems = function(){
        Idepa.getListado().then(function(resp){
            var items = resp.data.results.collection1;
            $scope.items = items;
            $scope.itemsLength = items.length;
            MyApp.fw7.app.hideIndicator();
        })
    };

    $scope.hallaId = function(url){
    };

    $scope.resetSearchbar = function() {
        $timeout(function(){
            //$scope.searchbarIdepa.clear();
            $scope.searchbarIdepa.disable();
        }, 100);
    };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleIdepaCtrl', function ($scope, $sce, Idepa) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleIdepa', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.htmlDetalle = 'Obteniendo datos...';
        $scope.web = decodeURIComponent(page.query.web);
        console.log($scope.web);

        Idepa.getDetalle( Idepa.urlDetalle($scope.web) ).then(function(htmlDetalle){
            //console.log(htmlDetalle);
            $scope.htmlDetalle = htmlDetalle;
            $scope.showButtons = true;
            MyApp.fw7.app.hideIndicator();
        });
    });

    $scope.getHtmlSafe = function(html){
        return $sce.trustAsHtml(html);
    };
    $scope.btnTop = function(){
        $$('.page-content').scrollTop(0, 500); //500 velocidad
    };
    $scope.onIconBack = function(){
        $scope.showButtons = false;
    };
});
