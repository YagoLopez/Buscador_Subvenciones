
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
MyApp.angular.service('Boe', function($http, Error, Utiles){

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
      var htmlDetalle, xmlDoc;
      htmlDetalle = Utiles.xmlParser(resp.data);
      //console.log('htmlDetalle', htmlDetalle);
      return htmlDetalle;
    }, function(datosError){
      //Error.mostrar(datosError);
      return datosError;
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
  this.creaUrl = function(tipoAyuda){
    if (tipoAyuda === 'subvenciones') {
      return this.urlListado(this.urlSubvenciones);
    } else if (tipoAyuda === 'becas') {
      return this.urlListado(this.urlBecas);
    } else if (tipoAyuda === 'premios') {
      return this.urlListado(this.urlPremios);
    } else if (tipoAyuda === 'oposiciones') {
      return this.urlListado(this.urlOposiciones);
    }
  };

  this.hallaId = function(url){
    return url.split('=')[1];
  };

});
// =====================================================================================================================
MyApp.angular.service('Idepa', function($http, Error, Utiles){

  var query = 'select * from html where url=@url and xpath="//div[@class=\'contenidosubseccionFichaAyuda\']" and  ' +
      'charset="utf-8" and compat="html5"';
  var urlYql = 'https://query.yahooapis.com/v1/public/yql';
  this.urlListado = 'https://www.kimonolabs.com/api/3mabj0bo?apikey=d3a469997b9fe51dba6bfaa47742b7c6&callback=JSON_CALLBACK';
  this.urlDetalle = function(urlDetalleIdepa){
    return urlYql + '?url=' + urlDetalleIdepa + '&q=' + query;
  };

  this.getListado = function(){
    return $http.jsonp(this.urlListado, {cache: true}).then(function(resp){
        console.log(resp);
        return resp;},
      function(datosError){
        Error.mostrar(datosError);
      });
  };

  this.getDetalle = function(url){
    return $http.get(url, {cache: true}).then(function(resp){
      //console.log(resp);
      htmlDetalle = Utiles.xmlParser(resp.data);
      if (htmlDetalle.length < 100)
        htmlDetalle = 'No hay datos. Consultar Web para m&#225;s informaci&#243;n'
      //console.warn('htmlDetalle', htmlDetalle);
      return htmlDetalle;
    }, function(datosError){
      Error.mostrar(datosError);
    });
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
// =====================================================================================================================
MyApp.angular.service('Utiles', function($sce){

  this.getHtmlSafe = function(html){
      return $sce.trustAsHtml(html);
  };
  this.btnTop = function(){
    console.log('btnTop en detalle');
    $$('.page-content').scrollTop(0, 500); //500 velocidad
  };

  this.xmlParser = function(xmlStr){
    var xmlDoc = null;
    if( /Edge\/12./i.test(navigator.userAgent )){ // IE EDGE
      console.log('xmlParser, navegador edge');
      xmlDoc = document.implementation.createHTMLDocument(''); // es un hack
      xmlDoc.open(); xmlDoc.write(xmlStr); xmlDoc.close();
      return xmlDoc.getElementsByTagName('results')[0].innerHTML;
    }
    else if( ('ActiveXObject' in window) &&
              typeof(new window.ActiveXObject('Microsoft.XMLDOM')) === 'object' ) { // IEXPLORER
      console.log('xmlParser, IExplorer');
      xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = 'false';
      xmlDoc.loadXML(xmlStr);
      return xmlDoc.getElementsByTagName('results')[0].xml;
    }
    else if (typeof window.DOMParser != 'undefined') { // CHROME, FIREFOX, ETC.
      console.log('xmlParser, Chrome, Firefox, etc.');
      var parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlStr, 'application/xml');
      return xmlDoc.getElementsByTagName('results')[0].innerHTML;
    }
     else {
      //todo: mostrar popup error?
      //throw new Error('No hay datos. Error al analizar fichero XML');
      return 'No hay datos. Error al analizar fichero XML';
    };
  };

});