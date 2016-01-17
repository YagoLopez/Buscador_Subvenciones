
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
MyApp.angular.service('Boe', function($http){

  this.items = [];

  this.urlListadoSubvenciones = 'https://query.yahooapis.com/v1/public/yql/yls/boe-ayudas?format=json';
  this.urlDetalleSubvencion ='http://www.boe.es/diario_boe/xml.php?id=BOE-A-2016-387';
  this.urlListadoBecas = '';
  this.urlDetalleBeca = '';
  this.urlListadoPremios = '';
  this.urlDetallePremio = '';

  this.setItems = function(arrDatos){
    this.items = arrDatos;
  };

  this.getItems = function(){
    return this.items;
  };

  this.getJson = function(url){
    console.log('url', url);
    return $http.get(url, {cache: true});
  };

});
// =====================================================================================================================
