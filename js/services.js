
MyApp.angular.factory('InitService', function ($document) {
  'use strict';

  var pub = {},
    eventListeners = {
      'ready' : []
    };
  
  pub.addEventListener = function (eventName, listener) {
    eventListeners[eventName].push(listener);
  };

  function onReady() {
    var fw7 = MyApp.fw7;
    var i;

    fw7.views.push(fw7.app.addView('.view-main', fw7.options));

    for (i = 0; i < eventListeners.ready.length; i = i + 1) {
      eventListeners.ready[i]();
    }
  }

  // Init
  (function () {
    $document.ready(function () {

      if (document.URL.indexOf("http://") === -1 && document.URL.indexOf("https://") === -1) {
        // Cordova
        console.log("Using Cordova/PhoneGap setting");
        document.addEventListener("deviceready", onReady, false);
      } else {
        // Web browser
        console.log("Using web browser setting");
        onReady();
      }
      
    });
  }());

  return pub;
  
});
// =====================================================================================================================
MyApp.angular.service('Boe', function($http, Error){

  this.datos = [];

  this.urlListadoSubvenciones = 'https://query.yahooapis.com/v1/public/yql/yls/boe-ayudas?format=json';
  this.urlDetalleSubvencion ='http://www.boe.es/diario_boe/xml.php?id=BOE-A-2016-387';
  this.urlListadoBecas = '';
  this.urlDetalleBeca = '';
  this.urlListadoPremios = '';
  this.urlDetallePremio = '';

  this.setDatos = function(arrDatos){
    this.datos = arrDatos;
  };

  this.getDatos = function(){
    return this.datos;
  };

  this.getJson = function(url){
    console.log('url', url);
    return $http.get(url, {cache: true});
  };

  this.getJson2 = function(url){
    console.log('url', url);
    var promesa = $http.get(url, {cache: true}).then(function(resp){
      console.log(resp);
      this.datos = resp.data.query.results;
    }, function(resp){
      Error.mostrar(resp);
    });
    return promesa;
  };
});
// =====================================================================================================================
MyApp.angular.service('Error', function(){

  this.mostrar = function(resp){
    msg = resp.data+'<br>Posibles causas del Error:<br>'+'1) No conexion datos <br>2) Fallo servidor remoto';
    MyApp.fw7.app.alert(msg);
    console.error(resp);
  };
});