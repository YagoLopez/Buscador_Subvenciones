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
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, BoeItems) {

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        $scope.tipoAyuda = page.query.tipo;
        $scope.searchbarBoe = $$('#searchbarBoe')[0].f7Searchbar;
        $scope.searchbarBoe.params.removeDiacritics = true;
        if (page.fromPage.name === 'index'){
            $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
            $scope.getItems( BoeItems.getUrlFor(page.query.tipo) );
        }
        $$('#bloqueListaBoe').on('search', function(e){
            $scope.numItems = e.detail.foundItems.length; $scope.$apply();
        });
    });
    $scope.getItems = function(url){
      BoeItems.getAll(url).then(function(){
          $scope.searchbarBoe.disable();
          $scope.items = BoeItems.getCollection();
          $scope.numItems = BoeItems.getCollection().length;
          MyApp.fw7.app.hideIndicator();
      });
    };
    $scope.onIconBack = function() {
        $scope.items = null;
    };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, BoeItem, Utiles) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.htmlDetalle = 'Obteniendo datos...';
        $scope.pdf = decodeURIComponent(page.query.pdf);
        $scope.url = decodeURIComponent(page.query.url);
        BoeItem.getRemoteData( $scope.url ).then(function(htmlDetalle){
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
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, IdepaItems) {

    MyApp.fw7.app.onPageBeforeAnimation('listadoIdepa', function (page) {
        $scope.searchbarIdepa = $$('#searchbarIdepa')[0].f7Searchbar;
        $scope.searchbarIdepa.params.removeDiacritics = true;
        if (page.fromPage.name === 'index'){
            $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
            $scope.getItems();
        }
        $$('#bloqueListaIdepa').on('search', function(e){
            $scope.numItems = e.detail.foundItems.length; $scope.$apply();
        });
    });
    $scope.getItems = function(){
        IdepaItems.getAll().then(function(){
            $scope.searchbarIdepa.disable();
            $scope.items = IdepaItems.getItems();
            $scope.numItems = IdepaItems.getItems().length;
            MyApp.fw7.app.hideIndicator();
        })
    };
    $scope.onIconBack = function() {
        //todo: intentar arreglar esto: al volver atras desde el detalle se pierde la posicion de scroll
        $scope.items = null;
    };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleIdepaCtrl', function ($scope, IdepaItem, Utiles) {

  MyApp.fw7.app.onPageBeforeAnimation('detalleIdepa', function (page) {
    MyApp.fw7.app.showIndicator();
    $scope.htmlDetalle = 'Obteniendo datos...';
    $scope.url = decodeURIComponent(page.query.url);
    console.log($scope.url);
    IdepaItem.getItem( IdepaItem.url($scope.url) ).then(function(htmlDetalle){
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
MyApp.angular.controller('ListadoMineturCtrl', function ($scope, MineturItems, $location, $anchorScroll, MineturItem, $timeout) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoMinetur', function (page) {
    $timeout(function(){
      $scope.scrollToItem(MineturItem.index);
    }, 250);
    $scope.searchbarMinetur = $$('#searchbarMinetur')[0].f7Searchbar;
    $scope.searchbarMinetur.params.removeDiacritics = true;
    if (page.fromPage.name === 'index'){
      $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
      $scope.getItems();
    }
    $$('#bloqueListaMinetur').on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    MineturItems.getData().then(function(){
      $scope.searchbarMinetur.disable();
      $scope.items = MineturItems.getItems();
      $scope.numItems = MineturItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $scope.scrollToItem = function(itemIndex){
    itemIndex = parseInt(itemIndex)-2;
    $location.hash(itemIndex); $anchorScroll();
  }
});
// =====================================================================================================================
MyApp.angular.controller('DetalleMineturCtrl', function ($scope, MineturItems) {

  MyApp.fw7.app.onPageBeforeAnimation('detalleMinetur', function (page) {
    $scope.item = MineturItems.getItemById( page.query.index );
    $scope.$apply();
  });
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIpymeCtrl', function ($scope, IpymeItems) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoIpyme', function (page) {
    $scope.searchbarIpyme = $$('#searchbarIpyme')[0].f7Searchbar;
    $scope.searchbarIpyme.params.removeDiacritics = true;
    if (page.fromPage.name === 'index'){
      $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
      $scope.getItems();
    }
    $$('#bloqueListaIpyme').on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    IpymeItems.getAll().then(function(){
      $scope.searchbarIpyme.disable();
      $scope.items = IpymeItems.getItems();
      $scope.numItems = IpymeItems.getItems().length;
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

