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
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, Boe) {

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        $scope.tipoAyuda = page.query.tipo;
        $scope.searchbarBoe = $$('#searchbarBoe')[0].f7Searchbar;
        $scope.searchbarBoe.params.removeDiacritics = true;
        if (page.fromPage.name === 'index'){
            $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
            $scope.obtenerItems( Boe.creaUrl(page.query.tipo) );
        }
        $$('#bloqueListaBoe').on('search', function(e){
            $scope.numItems = e.detail.foundItems.length; $scope.$apply();
        });
    });
    $scope.obtenerItems = function(url){
      Boe.getListado(url).then(function(resp){
          $scope.searchbarBoe.disable();
          $scope.items = resp.data.query.results.item;
          $scope.numItems = resp.data.query.results.item.length;
          MyApp.fw7.app.hideIndicator();
      });
    };
    $scope.onIconBack = function() {
        $scope.items = null;
    };
    $scope.hallaId = Boe.hallaId;
});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, Utiles) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.htmlDetalle = 'Obteniendo datos...';
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
    $scope.onIconBack = function(){
        $scope.showButtons = false;
    };
    //$scope.getHtmlSafe = Utiles.getHtmlSafe;
    $scope.btnTop = Utiles.btnTop;
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, Idepa) {

    MyApp.fw7.app.onPageBeforeAnimation('listadoIdepa', function (page) {
        $scope.searchbarIdepa = $$('#searchbarIdepa')[0].f7Searchbar;
        $scope.searchbarIdepa.params.removeDiacritics = true;
        if (page.fromPage.name === 'index'){
            $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
            $scope.obtenerItems();
        }
        $$('#bloqueListaIdepa').on('search', function(e){
            $scope.numItems = e.detail.foundItems.length; $scope.$apply();
        });
    });
    $scope.obtenerItems = function(){
        Idepa.getListado().then(function(resp){
            $scope.searchbarIdepa.disable();
            $scope.items = resp.data.results.collection1;
            $scope.numItems = resp.data.results.collection1.length;
            MyApp.fw7.app.hideIndicator();
        })
    };
    $scope.onIconBack = function() {
        $scope.items = null;
    };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleIdepaCtrl', function ($scope, Idepa, Utiles) {

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
  $scope.onIconBack = function(){
    $scope.showButtons = false;
  };
  $scope.btnTop = Utiles.btnTop;
});
// =====================================================================================================================
MyApp.angular.controller('ListadoMineturCtrl', function ($scope, Minetur) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoMinetur', function (page) {
    $scope.searchbarMinetur = $$('#searchbarMinetur')[0].f7Searchbar;
    $scope.searchbarMinetur.params.removeDiacritics = true;
    if (page.fromPage.name === 'index'){
      $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
      $scope.obtenerItems();
    }
    $$('#bloqueListaMinetur').on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.obtenerItems = function(){
    Minetur.getListado().then(function(resp){
      $scope.searchbarMinetur.disable();
      $scope.items = resp.data.query.results.item;
      $scope.numItems = resp.data.query.results.item.length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleMineturCtrl', function ($scope, Minetur) {

  MyApp.fw7.app.onPageBeforeAnimation('detalleMinetur', function (page) {
    $scope.item = Minetur.getItemById( page.query.index );
    $scope.$apply();
  });
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIpymeCtrl', function ($scope, IpymeCollection) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoIpyme', function (page) {
    $scope.searchbarIpyme = $$('#searchbarIpyme')[0].f7Searchbar;
    $scope.searchbarIpyme.params.removeDiacritics = true;
    if (page.fromPage.name === 'index'){
      $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
      $scope.obtenerItems();
    }
    $$('#bloqueListaIpyme').on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.obtenerItems = function(){
    IpymeCollection.getListado().then(function(){
      $scope.searchbarIpyme.disable();
      $scope.items = IpymeCollection.getItems();
      $scope.numItems = IpymeCollection.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleIpymeCtrl', function ($scope, IpymeItem, Utiles) {

  MyApp.fw7.app.onPageBeforeAnimation('detalleIpyme', function (page) {
    MyApp.fw7.app.showIndicator();
    $scope.htmlDetalle = 'Obteniendo datos...';
    $scope.url = decodeURIComponent(page.query.url);
    console.log('$scope.url',$scope.url);
    IpymeItem.getRemoteData( $scope.url ).then(function(htmlDetalle){
      $scope.htmlDetalle = htmlDetalle;

      //$scope.textoItem = textoItem.replace(/\r\n|\r|\n/g, '').trim();
      //$scope.textoItem = $scope.textoItem.replace(/[:]/g, ':<br>');
      console.log('htmlDetalle', htmlDetalle);
      $scope.showButtons = true;
      MyApp.fw7.app.hideIndicator();
    });
    $scope.$apply();
  });
  $scope.onIconBack = function(){
    $scope.showButtons = false;
  };
  $scope.btnTop = Utiles.btnTop;
});

