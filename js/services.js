
MyApp.angular.factory('InitService', function ($document) {
  //'use strict';

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

  var queryListado = 'select * from rss where url=@url';
  var queryDetalle = 'select * from html where url=@url and xpath="//*[@id=\'textoxslt\']//p" and compat="html5"';
  var urlYql = 'https://query.yahooapis.com/v1/public/yql';
  var urlBaseDetalle = 'http://www.boe.es/diario_boe/txt.php';

  this.urlSubvenciones = 'http://www.boe.es/rss/canal.php?c=ayudas';
  this.urlBecas = 'http://www.boe.es/rss/canal.php?c=becas';
  this.urlPremios = 'http://www.boe.es/rss/canal.php?c=premios';
  this.urlOposiciones = 'http://www.boe.es/rss/canal.php?c=oposiciones';

  this.urlListado = function(urlListadoBoe){
    return urlYql + '?url='+urlListadoBoe + '&q='+queryListado + '&format=json';
  };
  this.urlDetalle = function(idboe){
    return urlYql + '?url='+urlBaseDetalle+'?id='+idboe + '&q='+ queryDetalle+ '&format=xml';
  };

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

  this.getDetalle = function(url){
    var promesa = $http.get(url, {cache: true}).then(function(resp){
      //console.log(resp);
      parser = new DOMParser();
      xmlDoc = parser.parseFromString(resp.data, 'text/xml');
      var htmlDetalle = xmlDoc.getElementsByTagName('results')[0].innerHTML;
      //console.log('htmlDetalle', htmlDetalle);
      return htmlDetalle;
    },
    function(datosError){
      Error.mostrar(datosError);
    });
    return promesa;

  };

  //this.getDetalle = function(url){
  //  console.log('url', url);
  //  var promesa = $http.get(url, {cache: true}).then(function(resp){
  //    console.log(resp);
  //    return resp;
  //  },
  //  function(datosError){
  //    Error.mostrar(datosError);
  //  });
  //  return promesa;
  //};
});
// =====================================================================================================================
MyApp.angular.service('Idepa', function($http, Error){

  this.urlIdepa = 'https://www.kimonolabs.com/api/3mabj0bo?apikey=d3a469997b9fe51dba6bfaa47742b7c6&callback=JSON_CALLBACK';

/*  this.getListado = function(){
    return RemoteData.getData(this.urlIdepa).then(function(resp){
       console.log('datos idepa', resp);
       return resp;
    });
  };
*/

  this.getListado = function(){
    var promesa = $http.jsonp(this.urlIdepa, {cache: true}).then(function(resp){
      console.log(resp);
      return resp;},
    function(datosError){
      Error.mostrar(datosError);
    });
    return promesa;
  };

});
// =====================================================================================================================
MyApp.angular.service('Error', function(){
  this.mostrar = function(resp){
    MyApp.fw7.app.hideIndicator();
    msg = 'Codigo: '+resp.status+'<br>Datos: '+resp.statusText;
    MyApp.fw7.app.alert(msg, 'Error');
    console.error(resp);
  };
});
// =====================================================================================================================
MyApp.angular.filter('urlEncode', [function() {
  return window.encodeURIComponent;
}]);