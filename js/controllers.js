//todo: dos posibilidades:
// 1) hacer click programaticamente en el boton de cancelar la busueda al darle al boton de pagina atras.
// 2) que el total de items sea el numero de elementos li que se muestran
// 3) usar el codigo antiguo
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

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        //$scope.itemsBoe = []; $scope.itemsBoeLength = 0;
        $scope.tipoAyuda = page.query.tipo;
        $scope.searchbarBoe = $$('#searchbarBoe')[0].f7Searchbar;
        $scope.searchbarBoe.params.removeDiacritics = true;
        console.log('page from', page.fromPage.name);
        if (page.fromPage.name === 'index'){
            console.log('vengo desde index');
            MyApp.fw7.app.showIndicator();
            $scope.obtenerItems( hallaUrl(page.query.tipo) );
        }
        $$('#bloqueListaBoe').on('search', function(e){
            $scope.itemsBoeLength = e.detail.foundItems.length;
            $scope.$apply();
            console.warn('buscndo... itemsboe length', $scope.itemsBoeLength);
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
          $timeout(function(){
              $scope.searchbarBoe.clear();
              $scope.searchbarBoe.disable();
              $scope.itemsBoe = resp.data.query.results.item;
              $scope.itemsBoeLength = resp.data.query.results.item.length;
              console.log('obteniendo nuevos items', $scope.itemsBoe);
              console.warn('itemsboe length', $scope.itemsBoeLength);
          });
          MyApp.fw7.app.hideIndicator();
      });
    };

    $scope.hallaId = function(url){
      return url.split('=')[1];
    };
    //todo: mover a la izquierda el recuadro del total de resultados un poco
    $scope.resetSearchbar = function() {
        $scope.itemsBoe = null;
        $timeout(function(){
            //$scope.searchbarBoe.clear();
            //$scope.searchbarBoe.disable();
            console.log('reseteando searchbar y lista de items boe', $scope.itemsBoe);
        }, 100);
    };

    $scope.hallaNumItems = function(){
      $$('#listaBoe > li');
    };
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
    };
    $scope.onIconBack = function(){
        $scope.showButtons = false;
    }
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, Idepa, $timeout) {

    MyApp.fw7.app.onPageBeforeAnimation('listadoIdepa', function (page) {
        //$scope.itemsLength = 0; $scope.items = []; MyApp.fw7.app.showIndicator();
        $scope.searchbarIdepa = $$('#searchbarIdepa')[0].f7Searchbar;
        $scope.searchbarIdepa.params.removeDiacritics = true;
        if (page.fromPage.name === 'index'){
            console.log('vengo desde index');
            MyApp.fw7.app.showIndicator();
            $scope.obtenerItems();
        }
        $$('#bloqueListaIdepa').on('search', function(e){
            $scope.itemsLength = e.detail.foundItems.length;
            $scope.$apply();
            console.warn('buscndo... items idepa, length', $scope.itemsLength);
        });
    });

    $scope.obtenerItems = function(){
        Idepa.getListado().then(function(resp){
            $timeout(function(){
                $scope.searchbarIdepa.clear();
                $scope.searchbarIdepa.disable();
                var items = resp.data.results.collection1;
                $scope.items = items;
                $scope.itemsLength = items.length;
                console.warn('items idepa length', $scope.itemsLength);
            });
            MyApp.fw7.app.hideIndicator();
        })
    };

    $scope.hallaId = function(url){
    };

    $scope.resetSearchbar = function() {
        $scope.items = null;
        $timeout(function(){
            //$scope.searchbarIdepa.clear();
            //$scope.searchbarIdepa.disable();
            console.log('reseteando searchbar y lista de items idepa', $scope.itemsBoe);
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
