MyApp.angular.controller('ListadoBoeCtrl', function ($scope, $rootScope, BoeItems, BoeItem, C) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBoe', function (page) {
    MyApp.fw7.app.params.swipePanel = false;
    BoeItems.txt.tipo = page.query.tipo;
    $scope.txt = BoeItems.txt;
    $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems( BoeItems.getUrlFor(page.query.tipo) );
    MyApp.fw7.app.showPreloader(C.STRINGS.TXT_PRELOADER);
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length;
      $scope.$apply();
    });
  });
  $scope.getItems = function(url){
    BoeItems.getData(url).then(function(){
      searchbar.disable();
      $scope.items = BoeItems.getItems();
      $scope.numItems = BoeItems.getItems().length;
      MyApp.fw7.app.hidePreloader();
    });
  };
  $scope.popupDetalle = function(itemIndex){
    BoeItem.new( itemIndex );
    BoeItem.content = C.STRINGS.TXT_LOADING_DETALLE;
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
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIdepaCtrl', function ($scope, $rootScope, IdepaItems, IdepaItem, C) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIdepa', function () {
    MyApp.fw7.app.params.swipePanel = false;
    $scope.txt = IdepaItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo)[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showPreloader(C.STRINGS.TXT_PRELOADER);
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    IdepaItems.getData().then(function(){
      searchbar.disable();
      $scope.items = IdepaItems.getItems();
      $scope.numItems = IdepaItems.getItems().length;
      MyApp.fw7.app.hidePreloader();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
    MyApp.fw7.app.params.swipePanel = 'left';
  };
  $scope.popupDetalle = function(index){
    IdepaItem.new( index );
    IdepaItem.content = C.STRINGS.TXT_LOADING_DETALLE;
    IdepaItem.organismo = 'IDEPA';
    $rootScope.item = IdepaItem;
    MyApp.fw7.app.popup('.popup-detalle');
    IdepaItem.getData( IdepaItem.link ).then(function(htmlDetalle){
      IdepaItem.content = htmlDetalle;
    });
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoMineturCtrl', function ($scope, $rootScope, MineturItems, MineturItem, C) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoMinetur', function () {
    MyApp.fw7.app.params.swipePanel = false;
    $scope.txt = MineturItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showPreloader(C.STRINGS.TXT_PRELOADER);
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    MineturItems.getData().then(function(){
      searchbar.disable();
      $scope.items = MineturItems.getItems();
      $scope.numItems = MineturItems.getItems().length;
      MyApp.fw7.app.hidePreloader();
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
});
// =====================================================================================================================
MyApp.angular.controller('ListadoIpymeCtrl', function ($scope, $rootScope, IpymeItems, IpymeItem, C) {

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoIpyme', function () {
    MyApp.fw7.app.params.swipePanel = false;
    $scope.txt = IpymeItems.txt; $scope.$apply();
    searchbar = $$( '#searchbar'+$scope.txt.titulo )[0].f7Searchbar;
    searchbar.params.removeDiacritics = true;
    $scope.getItems();
    MyApp.fw7.app.showPreloader(C.STRINGS.TXT_PRELOADER);
    $$( '#lista'+$scope.txt.titulo ).on('search', function(e){
      $scope.numItems = e.detail.foundItems.length; $scope.$apply();
    });
  });
  $scope.getItems = function(){
    IpymeItems.getData().then(function(){
      searchbar.disable();
      $scope.items = IpymeItems.getItems();
      $scope.numItems = IpymeItems.getItems().length;
      MyApp.fw7.app.hidePreloader();
    })
  };
  $scope.onIconBack = function() {
    $scope.items = null;
    MyApp.fw7.app.params.swipePanel = 'left';
  };
  $scope.popupDetalle = function(index){
    IpymeItem.new( index );
    IpymeItem.content = C.STRINGS.TXT_LOADING_DETALLE;
    IpymeItem.organismo = 'DGPYME';
    $rootScope.item = IpymeItem;
    MyApp.fw7.app.popup('.popup-detalle');
    IpymeItem.getData( IpymeItem.link ).then(function(htmlDetalle){
      IpymeItem.content = htmlDetalle;
    });
  };
});
// =====================================================================================================================
MyApp.angular.controller('ListadoBdnsCtrl', function($scope, $rootScope, $http, BdnsItems, BdnsItem, C){

  var searchbar = null;
  MyApp.fw7.app.onPageAfterAnimation('listadoBdns', function () {
    MyApp.fw7.app.showPreloader(C.STRINGS.TXT_PRELOADER);
    MyApp.fw7.app.params.swipePanel = false;
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
      MyApp.fw7.app.hidePreloader();
    })
  };
  $scope.popupDetalle = function(index){
    BdnsItem.new( index );
    BdnsItem.content = C.STRINGS.TXT_LOADING_DETALLE;
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
  $scope.popupDetalleFavorito = function(itemIndex){
    $rootScope.item = Favoritos.getItem( itemIndex );
    MyApp.fw7.app.popup('.popup-detalle');
  };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleCtrl', function ($scope, $rootScope, Favoritos, $http, $httpParamSerializerJQLike) {

  // Para guardar un item en favoritos es necesario crear una copia del mismo. Si se guarda $rootScope.item
  // directamente en favoritos se estará guardando un puntero, es decir, una referencia a dicho valor. Por lo tanto
  // cuando cambie el valor de dicha referencia a lo largo de la aplicación, cambiará el valor guardado en favoritos,
  // lo cual no es el comportamiento deseado. Se requiere que el item quede guardado en favoritos y no varie su valor.

  $scope.addItemFavoritos = function () {
    var candidatoFavorito = angular.copy( $rootScope.item );
    var aceptarGuardar = function () {
      if( !Favoritos.contiene( candidatoFavorito ) ){
        Favoritos.add( candidatoFavorito );
        $scope.$apply();
        Favoritos.mostrarAviso('Favorito guardado');
      } else {
        MyApp.fw7.app.alert('El item ya existe en la lista de favoritos')}
    };
    MyApp.fw7.app.confirm('Guardar como favorito?', 'Confirmar', aceptarGuardar);
  };

  $scope.esItemFavorito = function () {
    return Favoritos.contiene( $rootScope.item );
  };

  $scope.tipFavorito = function () {
    alert('Item ya figura como favorito')
  };



  //var url = 'http://www.pap.minhap.gob.es/bdnstrans/GE/es/convocatorias?titulo=&fecDesde=&fecHasta=&finalidad=&administracion=Admon_estado&_ministerios=1&_organos=1&_cAutonomas=1&_departamentos=1&_locales=1&_localesOculto=1&_regionalizacion=1&_beneficiarios=1&_sectores=1&strnumcov=300618';
  ////var post_data = 'administracion=Admon_estado&strnumcov=300617';
  ////var headers = { 'Content-Type': 'application/x-www-form-urlencoded', 'Access-Control-Allow-Origin': '*' };
  ////var headers = { 'Content-Type': 'application/x-www-form-urlencoded'};
  //
  //var req = {
  //  method: 'POST',
  //  url: url,
  //  headers: headers,
  //  withCredentials: false,
  //  data: $httpParamSerializerJQLike({ 'administration':'Admon_estado', 'strnumcov':'300617' })
  //};
  //var test = function () {
  //  $http(req).then(function (resp) {
  //    console.log('resp', resp);
  //  })
  //};
  //test();



});

