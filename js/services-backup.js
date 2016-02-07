
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
MyApp.angular.service('BoeItems', function($http, Error, Utiles, C){

  var self = this;
  var query = 'select * from rss where url=@url';
  var urlSubvenciones = 'http://www.boe.es/rss/canal.php?c=ayudas';
  var urlBecas = 'http://www.boe.es/rss/canal.php?c=becas';
  var urlPremios = 'http://www.boe.es/rss/canal.php?c=premios';
  var urlEmpleoPublico = 'http://www.boe.es/rss/canal_per.php?l=p&c=140';

  this.items = null;

  this.txt = { titulo: 'BOE', subtitulo: 'Bolet\u00EDn Oficial del Estado', tipo: ''};

  this.getItems = function(){
    return this.items;
  };
  this.urlListado = function(url){
    return C.YQL + ('?url='+encodeURIComponent(url)) + ('&q='+query) + '&format=json';
  };
  this.getData = function(url){
    console.log('url', url);
    return $http.get(url, {cache: true}).then(function(resp){
        self.items = resp.data.query.results.item;
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
  this.getUrlFor = function(tipoAyuda){
    if (tipoAyuda === 'subvenciones') {
      return this.urlListado(urlSubvenciones);
    } else if (tipoAyuda === 'becas') {
      return this.urlListado(urlBecas);
    } else if (tipoAyuda === 'premios') {
      return this.urlListado(urlPremios);
    } else if (tipoAyuda === 'empleoPublico') {
      return this.urlListado(urlEmpleoPublico);
    }
  };
});
// =====================================================================================================================
MyApp.angular.service('BoeItem', function($http, Error, Utiles, C, BoeItems) {

  var query = 'select * from html where url=@url and xpath="//*[@id=\'textoxslt\']//p" and compat="html5"';

  this.urlFrom = function(urlDetalle){
    return C.YQL + ('?url='+urlDetalle) + ('&q='+query) + '&format=xml';
  };
  this.new = function (index){
    var i = BoeItems.getItems()[index];
    this.titulo = i.title;
    this.description = i.description;
    this.link = i.link;
    this.pdf = i.guid.content;
    this.showButtons = false;
    this.index = index;
  };
  this.getData = function(urlDetalle){
    return $http.get(this.urlFrom(urlDetalle), {cache: true}).then(function(resp){
        console.log( resp );
        return Utiles.xmlParser(resp.data);;
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
// =====================================================================================================================
MyApp.angular.service('IdepaItems', function($http, Error){

  var self = this;
  this.items = null;
  this.url = 'https://www.kimonolabs.com/api/3mabj0bo?apikey=d3a469997b9fe51dba6bfaa47742b7c6&callback=JSON_CALLBACK';
  this.txt = { titulo: 'IDEPA', subtitulo: 'Instituto de Desarrollo Econ\u00F3mico del Principado de Asturias'};

  this.getItems = function(){
    return this.items;
  };
  this.getData = function(){
    return $http.jsonp(this.url, {cache: true}).then(function(resp){
        self.items = resp.data.results.collection1;
        console.log(self.items);
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
// =====================================================================================================================
MyApp.angular.service('IdepaItem', function($http, Error, Utiles, C, IdepaItems){

  var query = 'select * from html where url=@url and xpath="//div[@class=\'contenidosubseccionFichaAyuda\']" and  ' +
    'charset="utf-8" and compat="html5"';

  this.new = function (index){
    var i = IdepaItems.getItems()[index];
    this.titulo = i.descripcion;
    this.ambito = i.ambito;
    this.link = i.link_detalle.href;
    this.showButtons = false;
    this.index = index;
  };
  this.getUrl = function(){
    return C.YQL + ('?url='+ this.link) + ('q=' +query);
  }
  this.getData = function(){
    return $http.get(this.getUrl(), {cache: true}).then(function(resp){
      htmlDetalle = Utiles.xmlParser(resp.data);
      if (htmlDetalle.length < 100)
        htmlDetalle = 'No hay datos. Consultar Web para m&#225;s informaci&#243;n';
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
    msg = 'Codigo: '+resp.status+'<br>'+resp.statusText;
    if(resp.status == -1)
      msg = msg + 'Posibles causas:<br>1) No conexion datos<br>2) Fallo servidor remoto';
    MyApp.fw7.app.alert(msg, 'Error');
    console.error(resp);
  };
  this.mostrar2 = function(txtExcepcion){
    MyApp.fw7.app.hideIndicator();
    MyApp.fw7.app.alert(txtExcepcion, 'Error');
  };
});
// =====================================================================================================================
MyApp.angular.service('Utiles', function($sce, $location, $anchorScroll, $timeout, $interval){

  this.btnTop = function(){
    console.log('btnTop en detalle');
    $$('#detalleContent').scrollTop(0, 500); //500 velocidad
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
      return xmlDoc.getElementsByTagName('results')[0].xml; // no se puede usar innerHTML
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
// =====================================================================================================================
MyApp.angular.service('MineturItems', function($http, Utiles, C, Error, MineturItem){

  var self = this;
  var query = 'select * from rss where url=@url';
  var urlOrigen = 'http://www.minetur.gob.es/PortalAyudas/_layouts/genrss.aspx?List=listaayudas&View=vistaayudas';

  this.items = null;
  this.txt = { titulo: 'MINETUR', subtitulo: 'Ministerio de Industria, Energ\u00EDa y Turismo'};
  this.urlListado = C.YQL + ('?url='+encodeURIComponent(urlOrigen)) + ('&q='+query) + '&format=json';
  this.getItems = function(){
    return this.items;
  };
  this.getItemById = function(index){
    MineturItem.new(this.items[index], index);
    return MineturItem;
  };
  this.getData = function(){
    return $http.get(this.urlListado, {cache: true}).then(function(resp){
        if (!resp.data.query.results)
          Error.mostrar2('Posibles causas:<br>1) No conexion datos<br>2) Fallo servidor remoto');
        self.items = resp.data.query.results.item;
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
// =====================================================================================================================
MyApp.angular.service('MineturItem', function(Error){

  this.new = function(obj, index){
    if (obj != null && index != null){
      this.title = obj.title;
      this.content = obj.description;
      this.creator = obj.creator;
      this.link = obj.link;
      this.showButtons = true;
      this.index = index;
    } else
      Error.mostrar2('No se ha podido crear MineturItem');
  }
});
// =====================================================================================================================
MyApp.angular.constant('C', {
  YQL2: 'https://98.137.200.255/v1/public/yql', // usa ip en vez de domain name. Da error de seguridad en Edge
  YQL:'https://query.yahooapis.com/v1/public/yql'})
// =====================================================================================================================
MyApp.angular.filter('FiltroHtml', ['$sce', function($sce) {
  return function(value, type) {
    return $sce.trustAs(type || 'html', value);
  }
}]);
// =====================================================================================================================
MyApp.angular.filter('capitalize', function() {
  return function(input) {
    return (!!input) ? input.charAt(0).toUpperCase() + input.substr(1) : '';
  }
});
// =====================================================================================================================
MyApp.angular.service('IpymeItems', function($http, Error){

  var self = this;
  this.url = 'https://www.kimonolabs.com/api/7ni4mqfa?apikey=d3a469997b9fe51dba6bfaa47742b7c6&callback=JSON_CALLBACK';
  this.items = null;
  this.txt = { titulo: 'DGPYME', subtitulo: 'Direcci\u00F3n General de la Peque\u00F1a y Mediana Empresa'};

  this.getItems = function(){
    return this.items;
  };
  this.getData = function(){
    return $http.jsonp(this.url, {cache: true}).then(function(resp){
        self.items = resp.data.results.listado;
        console.log(self.items);
        return resp;},
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
// =====================================================================================================================
MyApp.angular.service('IpymeItem', function($http, Error, Utiles, C, IpymeItems) {

  var query = 'select * from html where url=@url and xpath="//div[@class=\'zonalistado\']/p" and' +
    ' charset="utf-8" and compat="html5"';

  this.urlFrom = function(urlDetalle){
    return C.YQL + ('?url='+urlDetalle) + ('&q='+query) + '&format=xml';
  };
  this.new = function (index){
    var i = IpymeItems.getItems()[index];
    this.titulo = i.titulo.text;
    this.ambito = i.ambito;
    this.link = i.titulo.href;
    this.plazo = i.plazo;
    this.showButtons = false;
    this.index = index;
  };
  this.getData = function(urlDetalle){
    console.log('url', this.urlFrom(urlDetalle));
    return $http.get(this.urlFrom(urlDetalle), {cache: true}).then(function(resp){
        console.log( resp );
        return Utiles.xmlParser(resp.data);
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };

});
// =====================================================================================================================
/*
MyApp.angular.filter('urlEncode', [function() {
  return window.encodeURIComponent;
}]);
*/
