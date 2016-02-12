MyApp.angular.controller('HomePageController', function ($scope, InitService, $rootScope) {

    InitService.addEventListener('ready', function () {
        // DOM ready
        console.log('IndexPageController: ok, DOM ready');

        // You can access angular like this:
        // MyApp.angular

        // And you can access Framework7 like this:
        // MyApp.fw7.app
    });
});
// =====================================================================================================================
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, $rootScope, BoeItems, BoeItem, Utiles) {

  //MyApp.fw7.app.onPageAfterAnimation('listadoBoe', function(){
  //  MyApp.fw7.app.showIndicator();
  //});

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBoe', function (page) {
    BoeItems.txt.tipo = page.query.tipo;
    $scope.txt = BoeItems.txt;
    $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems( BoeItems.getUrlFor(page.query.tipo) );
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
    MyApp.fw7.app.showIndicator();
  });
  $scope.getItems = function(url){
    BoeItems.getData(url).then(function(){
      searchbar.disable();
      $scope.items = BoeItems.getItems();
      $scope.numItems = BoeItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    });
  };
  $scope.openPopup = function(index){
    MyApp.fw7.app.popup('.popup-detalle');
    BoeItem.new( index );
    BoeItem.content = 'Obteniendo datos...';
    $rootScope.item = BoeItem;
    MyApp.fw7.app.showIndicator();
    BoeItem.getData( BoeItem.link ).then(function(htmlDetalle){
      BoeItem.content = htmlDetalle;
      BoeItem.showButtons = true;
      MyApp.fw7.app.hideIndicator();
    });
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $rootScope.btnTop = Utiles.btnTop;
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, $rootScope, IdepaItems, IdepaItem) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIdepa', function (page) {
    MyApp.fw7.app.showIndicator();
    $scope.txt = IdepaItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo)[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    IdepaItems.getData().then(function(){
      searchbar.disable();
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

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoMinetur', function (page) {
    MyApp.fw7.app.showIndicator();
    $scope.txt = MineturItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    MineturItems.getData().then(function(){
      searchbar.disable();
      $scope.items = MineturItems.getItems();
      $scope.numItems = MineturItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $scope.openPopup = function(index){
    MyApp.fw7.app.popup('.popup-detalle');
    $rootScope.item = MineturItems.getItemById(index);
    //console.log('$scope.item', $rootScope.item);
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIpymeCtrl', function ($scope, $rootScope, IpymeItems, IpymeItem) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIpyme', function (page) {
    MyApp.fw7.app.showIndicator();
    $scope.txt = IpymeItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    IpymeItems.getData().then(function(){
      searchbar.disable();
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
// =====================================================================================================================
MyApp.angular.controller('ListadoBdnsCtrl', function($scope, $rootScope, $http, BdnsItems, BdnsItem){

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBdns', function (page) {
    MyApp.fw7.app.showIndicator();
    $scope.txt = BdnsItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    BdnsItems.getData().then(function(){
      searchbar.disable();
      $scope.items = BdnsItems.getItems();
      $scope.numItems = BdnsItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.openPopup = function(index){
    MyApp.fw7.app.popup('.popup-detalle');
    MyApp.fw7.app.showIndicator();
    BdnsItem.new( index );
    BdnsItem.content = 'Obteniendo datos...';
    $rootScope.item = BdnsItem;
    BdnsItem.getData().then(function(htmlDetalle){
      BdnsItem.content = htmlDetalle;
      BdnsItem.showButtons = true;
      MyApp.fw7.app.hideIndicator();
    });
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
});
