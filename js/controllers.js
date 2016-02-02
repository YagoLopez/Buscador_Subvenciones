//todo: posibles nombres: todo ayudas (buscador de ayudas y subvenciones), subventia, public money
//todo: slogan: base de datos con mas de 600 ayudas y subvenciones nacionales e internacinales actualizadas
MyApp.angular.controller('HomePageController', function ($scope, InitService, $rootScope) {

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
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, $rootScope, BoeItems, BoeItem) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
    $scope.titulo = 'BOE'; $scope.$apply();
    $scope.tipoAyuda = page.query.tipo;
    $scope.searchbar = $$( '#searchbar'+$scope.titulo )[0].f7Searchbar;
    $scope.searchbar.params.removeDiacritics = true;
    if (page.fromPage.name === 'index'){
      $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
      $scope.getItems( BoeItems.getUrlFor(page.query.tipo) );
    }
    $$('#bloqueListaBoe').on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(url){
    BoeItems.getData(url).then(function(){
      $scope.searchbar.disable();
      $scope.items = BoeItems.getItems();
      $scope.numItems = BoeItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    });
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $scope.openPopup = function(index){
    MyApp.fw7.app.popup('.popup-detalle');
    MyApp.fw7.app.showIndicator();
    BoeItem.new( index );
    BoeItem.content = 'Obteniendo datos...';
    $rootScope.item = BoeItem;
    BoeItem.getData( BoeItem.link ).then(function(htmlDetalle){
      BoeItem.content = htmlDetalle;
      BoeItem.showButtons = true;
      MyApp.fw7.app.hideIndicator();
    });
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, $rootScope, IdepaItems, IdepaItem) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoIdepa', function (page) {
    $scope.titulo = 'IDEPA'; $scope.$apply();
    $scope.searchbar = $$( '#searchbar'+$scope.titulo )[0].f7Searchbar;
    $scope.searchbar.params.removeDiacritics = true;
    if (page.fromPage.name === 'index'){
      $scope.numItems = null; MyApp.fw7.app.showIndicator();// init
      $scope.getItems();
    }
    $$('#bloqueListaIdepa').on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    IdepaItems.getData().then(function(){
      $scope.searchbar.disable();
      $scope.items = IdepaItems.getItems();
      $scope.numItems = IdepaItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $scope.openPopup = function(index){
    MyApp.fw7.app.popup('.popup-detalle');
    MyApp.fw7.app.showIndicator();
    IdepaItem.new( index );
    IdepaItem.content = 'Obteniendo datos...';
    $rootScope.item = IdepaItem;
    IdepaItem.getData( IdepaItem.link ).then(function(htmlDetalle){
      IdepaItem.content = htmlDetalle;
      IdepaItem.showButtons = true;
      MyApp.fw7.app.hideIndicator();
    });
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoMineturCtrl', function ($scope, $rootScope, MineturItems, MineturItem, Utiles, $timeout) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoMinetur', function (page) {
    $scope.titulo = 'MINETUR'; $scope.$apply();
    $scope.searchbar = $$( '#searchbar'+$scope.titulo )[0].f7Searchbar;
    $scope.searchbar.params.removeDiacritics = true;
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
      $scope.searchbar.disable();
      $scope.items = MineturItems.getItems();
      $scope.numItems = MineturItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $scope.openPopup = function(index){
    console.log('cargando datos detalle en popup. indice:', index);
    MyApp.fw7.app.popup('.popup-detalle');
    $rootScope.item = MineturItems.getItemById(index);
    console.log('$scope.item', $rootScope.item);
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIpymeCtrl', function ($scope, $rootScope, IpymeItems, IpymeItem) {

  MyApp.fw7.app.onPageBeforeAnimation('listadoIpyme', function (page) {
    $scope.titulo = 'IPYME'; $scope.$apply();
    $scope.searchbar = $$( '#searchbar'+$scope.titulo )[0].f7Searchbar;
    $scope.searchbar.params.removeDiacritics = true;
    if (page.fromPage.name === 'index'){
      $scope.numItems = null; MyApp.fw7.app.showIndicator(); // init
      $scope.getItems();
    }
    $$('#bloqueListaIpyme').on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    IpymeItems.getData().then(function(){
      $scope.searchbar.disable();
      $scope.items = IpymeItems.getItems();
      $scope.numItems = IpymeItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $scope.openPopup = function(index){
    MyApp.fw7.app.popup('.popup-detalle');
    MyApp.fw7.app.showIndicator();
    IpymeItem.new( index );
    IpymeItem.content = 'Obteniendo datos...';
    $rootScope.item = IpymeItem;
    IpymeItem.getData( IpymeItem.link ).then(function(htmlDetalle){
      IpymeItem.content = htmlDetalle;
      IpymeItem.showButtons = true;
      MyApp.fw7.app.hideIndicator();
    });
  };
});

