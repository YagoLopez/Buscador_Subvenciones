MyApp.angular.controller('ListadoBoeCtrl', function ($scope, $rootScope, BoeItems, BoeItem, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBoe', function (page) {
    MyApp.fw7.app.params.swipePanel = false;
    BoeItems.txt.tipo = page.query.tipo;
    $scope.txt = BoeItems.txt;
    $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems( BoeItems.getUrlFor(page.query.tipo) );
    MyApp.fw7.app.showIndicator();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length;
      $scope.$apply();
    });
  });
  //$scope.onClickItem = function (index) { MyApp.fw7.app.swipeoutOpen( $$('#'+index) ) };
  $scope.getItems = function(url){
    BoeItems.getData(url).then(function(){
      searchbar.disable();
      $scope.items = BoeItems.getItems();
      $scope.numItems = BoeItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    });
  };
  $scope.popupDetalle = function(itemIndex){
    BoeItem.new( itemIndex );
    BoeItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    BoeItem.organismo = 'BOE';
    $rootScope.item = BoeItem;
    MyApp.fw7.app.popup('.popup-detalle');
    BoeItem.getData( BoeItem.link ).then(function(htmlDetalle){
      BoeItem.content = htmlDetalle;
    });
  };
  $scope.onIconBack = function() {
    $scope.items = null;
    MyApp.fw7.app.params.swipePanel = 'left';
  };
  //$scope.addFavorito = function (itemIndex) {
  //  var aceptarGuardar = function () {
  //    var item = BoeItems.getItems()[itemIndex];
  //    item.txt = $scope.txt;
  //    item.enlaceExterno = item.link;
  //    if( !Favoritos.contiene(item) ){
  //      Favoritos.add(item);
  //      $scope.$apply();
  //      Favoritos.mostrarAviso('Favorito guardado');
  //    } else {
  //      MyApp.fw7.app.alert('El item ya existe en la lista de favoritos')}
  //  };
  //  MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  //};
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, $rootScope, IdepaItems, IdepaItem, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIdepa', function () {
    MyApp.fw7.app.params.swipePanel = false;
    $scope.txt = IdepaItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo)[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showIndicator();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  //$scope.onClickItem = function (index) { MyApp.fw7.app.swipeoutOpen( $$('#'+index) ) };
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
    MyApp.fw7.app.params.swipePanel = 'left';
  };
  $scope.popupDetalle = function(index){
    IdepaItem.new( index );
    IdepaItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    IdepaItem.organismo = 'IDEPA';
    $rootScope.item = IdepaItem;
    MyApp.fw7.app.popup('.popup-detalle');
    IdepaItem.getData( IdepaItem.link ).then(function(htmlDetalle){
      IdepaItem.content = htmlDetalle;
    });
  };
  //$scope.addFavorito = function (itemIndex) {
  //  var aceptarGuardar = function () {
  //    var item = IdepaItems.getItems()[itemIndex];
  //    item.txt = $scope.txt;
  //    item.enlaceExterno = item.link_detalle.href;
  //    if( !Favoritos.contiene(item) ){
  //      Favoritos.add(item);
  //      $scope.$apply();
  //      Favoritos.mostrarAviso('Favorito guardado');
  //    } else {
  //      MyApp.fw7.app.alert('El item ya existe en la lista de favoritos')}
  //  };
  //  MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  //};
});
// =====================================================================================================================
MyApp.angular.controller('ListadoMineturCtrl', function ($scope, $rootScope, MineturItems, MineturItem, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoMinetur', function () {
    MyApp.fw7.app.params.swipePanel = false;
    $scope.txt = MineturItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showIndicator();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  //$scope.onClickItem = function (index) { MyApp.fw7.app.swipeoutOpen( $$('#'+index) ) };
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
    MyApp.fw7.app.params.swipePanel = 'left';
  };
  $scope.popupDetalle = function(itemIndex){
    MineturItem.new( itemIndex );
    MineturItem.organismo = 'MINETUR';
    $rootScope.item = MineturItem;
    MyApp.fw7.app.popup('.popup-detalle');
  };
  //$scope.addFavorito = function (itemIndex) {
  //  var aceptarGuardar = function () {
  //    var item = MineturItems.getItems()[itemIndex];
  //    item.txt = $scope.txt;
  //    item.enlaceExterno = item.link;
  //    if( !Favoritos.contiene(item) ){
  //      Favoritos.add(item);
  //      $scope.$apply();
  //      Favoritos.mostrarAviso('Favorito guardado');
  //    } else {
  //      MyApp.fw7.app.alert('El item ya existe en la lista de favoritos')}
  //  };
  //  MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  //};
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIpymeCtrl', function ($scope, $rootScope, IpymeItems, IpymeItem, Favoritos) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIpyme', function () {
    MyApp.fw7.app.params.swipePanel = false;
    $scope.txt = IpymeItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showIndicator();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  //$scope.onClickItem = function (index) { MyApp.fw7.app.swipeoutOpen( $$('#'+index) ) };
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
    MyApp.fw7.app.params.swipePanel = 'left';
  };
  $scope.popupDetalle = function(index){
    IpymeItem.new( index );
    IpymeItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    IpymeItem.organismo = 'IPYME';
    $rootScope.item = IpymeItem;
    MyApp.fw7.app.popup('.popup-detalle');
    IpymeItem.getData( IpymeItem.link ).then(function(htmlDetalle){
      IpymeItem.content = htmlDetalle;
    });
  };
  //$scope.addFavorito = function (itemIndex) {
  //  var aceptarGuardar = function () {
  //    var item = IpymeItems.getItems()[itemIndex];
  //    item.txt = $scope.txt;
  //    item.enlaceExterno = item.link;
  //    if( !Favoritos.contiene(item) ){
  //      Favoritos.add(item);
  //      $scope.$apply();
  //      Favoritos.mostrarAviso('Favorito guardado');
  //    } else {
  //      MyApp.fw7.app.alert('El item ya existe en la lista de favoritos')}
  //  };
  //  MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  //};
});
// =====================================================================================================================
MyApp.angular.controller('ListadoBdnsCtrl', function($scope, $rootScope, $http, BdnsItems, BdnsItem, Favoritos){

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBdns', function () {
    MyApp.fw7.app.showIndicator();
    MyApp.fw7.app.params.swipePanel = false;
    $scope.txt = BdnsItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  //$scope.onClickItem = function (index) { MyApp.fw7.app.swipeoutOpen( $$('#'+index) ) };
  $scope.getItems = function(){
    BdnsItems.getData().then(function(){
      searchbar.disable();
      $scope.items = BdnsItems.getItems();
      $scope.numItems = BdnsItems.getItems().length;
      MyApp.fw7.app.hideIndicator();
    })
  };
  $scope.popupDetalle = function(index){
    BdnsItem.new( index );
    BdnsItem.content = '<img src="img/3.gif"> '+'Obteniendo datos... ';
    BdnsItem.organismo = 'BDNS';
    $rootScope.item = BdnsItem;
    MyApp.fw7.app.popup('.popup-detalle');
    BdnsItem.getData().then(function(htmlDetalle){
      BdnsItem.content = htmlDetalle;
    });
  };
  $scope.onIconBack = function() {
    $scope.items = null;
    MyApp.fw7.app.params.swipePanel = 'left';
  };
  //$scope.addFavorito = function (itemIndex) {
  //  var aceptarGuardar = function () {
  //    var candidatoFav = {};
  //    var item = BdnsItems.getItems()[itemIndex];
  //    candidatoFav.descripcion = item[5];
  //    candidatoFav.enlaceExterno = 'http://www.pap.minhap.gob.es/bdnstrans/GE/es/convocatoria/'+item[0];
  //    candidatoFav.creator = item[2];
  //    candidatoFav.plazo = item[4];
  //    candidatoFav.txt = {titulo: 'BDNS'};
  //    if( !Favoritos.contiene(candidatoFav) ){
  //      Favoritos.add(candidatoFav);
  //      $scope.$apply();
  //      Favoritos.mostrarAviso('Favorito guardado');
  //    } else {
  //      MyApp.fw7.app.alert('El item ya existe en la lista de favoritos')}
  //  };
  //  MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  //};
});
// =====================================================================================================================
MyApp.angular.controller('FavoritosCtrl', function ($scope, $rootScope, Favoritos, $window) {

  MyApp.fw7.app.onPageAfterAnimation('favoritos', function () {
    $scope.favoritos = Favoritos.getAll();
    $scope.$apply();
    $$('.swipeout').on('click', function () { MyApp.fw7.app.swipeoutOpen( $$(this) ) });
    //$$('.swipeout').on('closed', function () { MyApp.fw7.app.swipeoutClose( $$(this) ) });
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
    MyApp.fw7.app.confirm('Borrar todos los favoritos', 'Confirmar', function () {
      Favoritos.deleteAll();
      $scope.$apply();
    });
  };
  $scope.abreEnlace = function (url) {
    $window.open(url, '_blank');
  };
  $scope.popupDetalle = function(itemIndex){
    //console.log('itemIndex', itemIndex);
    //console.log('Favoritos.getitem()', Favoritos.getItem( itemIndex  ));
    $rootScope.item = Favoritos.getItem( itemIndex );
    console.log('$rootScope.item desde FavoritosCtrl', $rootScope.item);
    MyApp.fw7.app.popup('.popup-detalle');
    //todo: falta arreglar que se agregen duplicados a favoritos
    //todo: añadir un flag para saber en el detalle (o en listado) cuando un item esta en favoritos
    //todo: fallan los enlaces a web externa y pdf
  };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleCtrl', function ($scope, $rootScope, Favoritos) {


  $scope.addItemFavoritos = function () {

    console.log('$rootScope.item desde DetalleCtrl', $rootScope.item);

    var aceptarGuardar = function () {
      // Construccion de item (candidato a favorito)
      //var item = {};
      //item.organismo = $rootScope.item.organismo;
      //item.descripcionBreve = $rootScope.item.titulo || $rootScope.item.title;
      //item.textoPie = $rootScope.item.description || $rootScope.item.ambito || $rootScope.item.creator;
      //item.enlaceExterno = $rootScope.item.link;
      //item.content = $rootScope.item.content;

      if( !Favoritos.contiene( $rootScope.item ) ){
        Favoritos.add( $rootScope.item );
        $scope.$apply();
        Favoritos.mostrarAviso('Favorito guardado');
      } else {
        MyApp.fw7.app.alert('El item ya existe en la lista de favoritos')}
    };
    MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  };

  //todo: comprobar aqui si $rootScope.item esta en la lista de favoritos
  // en base a eso mostrar o no el boton de añadir a favoritos
  $scope.esFavorito = function () {
    console.log('favoritos', Favoritos.getAll());
    console.log('rootscope item', $rootScope.item);
    console.log(' es favorito', Favoritos.contiene( $rootScope.item ));
    return Favoritos.contiene( $rootScope.item );
  }


});
