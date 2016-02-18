MyApp.angular.controller('ListadoBoeCtrl', function ($scope, $rootScope, BoeItems, BoeItem, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBoe', function (page) {
    BoeItems.txt.tipo = page.query.tipo;
    $scope.txt = BoeItems.txt;
    $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems( BoeItems.getUrlFor(page.query.tipo) );
    MyApp.fw7.app.showIndicator();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(url){
    BoeItems.getData(url).then(function(){
      searchbar.disable();
      $scope.items = BoeItems.getItems();
      $scope.numItems = BoeItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    });
  };
  $scope.openPopup = function(itemIndex){
    BoeItem.new( itemIndex );
    BoeItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    $rootScope.item = BoeItem;
    MyApp.fw7.app.popup('.popup-detalle');
    BoeItem.getData( BoeItem.link ).then(function(htmlDetalle){
      BoeItem.content = htmlDetalle;
      BoeItem.showButtons = true;
    });
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
  $scope.addFavorito = function (favoritoIndex) {
    var aceptarGuardar = function () {
      var favorito = BoeItems.getItems()[favoritoIndex];
      Favoritos.add(favorito);
      $scope.$apply();
      Favoritos.mostrarAviso('Favorito guardado');
    };
    MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, $rootScope, IdepaItems, IdepaItem, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIdepa', function () {
    $scope.txt = IdepaItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo)[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showIndicator();
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
    IdepaItem.new( index );
    IdepaItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    $rootScope.item = IdepaItem;
    MyApp.fw7.app.popup('.popup-detalle');
    IdepaItem.getData( IdepaItem.link ).then(function(htmlDetalle){
      IdepaItem.content = htmlDetalle;
      IdepaItem.showButtons = true;
    });
  };
  $scope.addFavorito = function (favoritoIndex) {
    var aceptarGuardar = function () {
      var favorito = IdepaItems.getItems()[favoritoIndex];
      Favoritos.add(favorito);
      $scope.$apply();
      Favoritos.mostrarAviso('Favorito guardado');
    };
    MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoMineturCtrl', function ($scope, $rootScope, MineturItems, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoMinetur', function () {
    $scope.txt = MineturItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showIndicator();
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
  $scope.openPopup = function(itemIndex){
    $rootScope.item = MineturItems.getItems()[itemIndex];
    MyApp.fw7.app.popup('.popup-detalle');
  };
  $scope.addFavorito = function (favoritoIndex) {
    var aceptarGuardar = function () {
      var favorito = MineturItems.getItems()[favoritoIndex];
      Favoritos.add(favorito);
      $scope.$apply();
      Favoritos.mostrarAviso('Favorito guardado');
    };
    MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIpymeCtrl', function ($scope, $rootScope, IpymeItems, IpymeItem, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIpyme', function () {
    $scope.txt = IpymeItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showIndicator();
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
    IpymeItem.new( index );
    IpymeItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    $rootScope.item = IpymeItem;
    MyApp.fw7.app.popup('.popup-detalle');
    IpymeItem.getData( IpymeItem.link ).then(function(htmlDetalle){
      IpymeItem.content = htmlDetalle;
      IpymeItem.showButtons = true;
    });
  };
  $scope.addFavorito = function (favoritoIndex) {
    var aceptarGuardar = function () {
      var favorito = IpymeItems.getItems()[favoritoIndex];
      Favoritos.add(favorito);
      $scope.$apply();
      Favoritos.mostrarAviso('Favorito guardado');
    };
    MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoBdnsCtrl', function($scope, $rootScope, $http, BdnsItems, BdnsItem, Favoritos){

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBdns', function () {
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
    BdnsItem.new( index );
    BdnsItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    $rootScope.item = BdnsItem;
    console.log('item', $rootScope.item);
    MyApp.fw7.app.popup('.popup-detalle');
    BdnsItem.getData().then(function(htmlDetalle){
      BdnsItem.content = htmlDetalle;
      BdnsItem.showButtons = true;
    });
  };
  $scope.addFavorito = function (favoritoIndex) {
    var aceptarGuardar = function () {
      var favorito = BdnsItems.getItems()[favoritoIndex];
      Favoritos.add(favorito);
      $scope.$apply();
      Favoritos.mostrarAviso('Favorito guardado');
    };
    MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  };
  $scope.onIconBack = function() {
    $scope.items = null;
  };
});
// =====================================================================================================================
MyApp.angular.controller('FavoritosCtrl', function ($scope, Favoritos) {

  MyApp.fw7.app.onPageAfterAnimation('favoritos', function () {
    $scope.favoritos = Favoritos.getAll();
    $scope.$apply();
  });
  $scope.deleteFavorito = function (itemIndex) {
    var aceptarBorrar = function () {
      Favoritos.delete(itemIndex);
      $scope.$apply();
      Favoritos.mostrarAviso('Favorito borrado');
    };
    MyApp.fw7.app.confirm('Borrar favorito?', 'Confirmar', aceptarBorrar);
  };
  $scope.deleteAll = function () {
    MyApp.fw7.app.confirm('Borrar Todos los favoritos', 'Confirmar', function () {
      Favoritos.deleteAll();
      $scope.$apply();
    });
  };
});
