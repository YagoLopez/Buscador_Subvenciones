
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

  this.urlListadoSubvenciones = 'https://query.yahooapis.com/v1/public/yql/yls/boe-ayudas?format=json';
  //this.urlDetalleSubvencion ='https://query.yahooapis.com/v1/public/yql?q=select texto from xml where url="http://www.boe.es/diario_boe/xml.php?id=BOE-A-2016-387"';
  this.urlDetalleSubvencion ='https://query.yahooapis.com/v1/public/yql?q=select * from html where url="http://www.boe.es/diario_boe/txt.php?id=BOE-A-2016-387" and compat="html5" and xpath="//*[@id=\'textoxslt\']/p[1]//text()"&format=json';
  this.urlListadoBecas = '';
  this.urlDetalleBeca = '';
  this.urlListadoPremios = '';
  this.urlDetallePremio = '';

  this.getListado = function(url){
    console.log('url', url);
    var promesa = $http.get(url, {cache: true}).then(function(resp){
      console.log(resp);
      return resp;},
    function(datosError){
      Error.mostrar(datosError);
    });
    return promesa;
  };

  this.getDetalleXml = function(url){
    console.log('url', url);
    var promesa = $http.get(url, {cache: true}).then(function(resp){
      console.log(resp);
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(resp.data,'text/xml');
      var htmlDetalle = xmlDoc.getElementsByTagName('texto')[0].innerHTML;
      console.log('htmlDetalle', htmlDetalle);
      return htmlDetalle;},
    function(datosError){
      Error.mostrar(datosError);
    });
    return promesa;

  };

  this.getDetalle = function(url){
    console.log('url', url);
    var promesa = $http.get(url, {cache: true}).then(function(resp){
      console.log(resp);
      return resp;
    },
    function(datosError){
      Error.mostrar(datosError);
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