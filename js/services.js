// todo: hacer servicio especializado en la comunicacion con YQL
// todo: arreglar navegacion boton de hardware hacia atras

MyApp.angular.service('BoeItems', function($http, Error, C){

  var self = this;
  var yqlQuery = 'select * from rss where url=@url';
  var urlSubvenciones = 'http://www.boe.es/rss/canal.php?c=ayudas';
  var urlBecas = 'http://www.boe.es/rss/canal.php?c=becas';
  var urlPremios = 'http//www.boe.es/rss/canal.php?c=premios';
  var urlEmpleoPublico = 'http://www.boe.es/rss/canal_per.php?l=p&c=140';

  this.items = null;

  this.txt = {titulo: 'BOE', subtitulo: 'Boletín Oficial del Estado', tipo: ''};

  this.getItems = function(){
    return this.items;
  };
  this.getItemByIndex = function(index){
    return this.getItems()[index];
  };
  this.urlListado = function(url){
    return C.YQL + ('?url='+encodeURIComponent(url)) + ('&q='+yqlQuery) + '&format=json';
  };
  this.getData = function(url){
    return $http.get(url, {cache: true}).then(function(resp){
      if(resp.data.query.results)
        self.items = resp.data.query.results.item;
      else
        throw ('No hay datos. Posibles causas: 1) Sin conexion. 2) Fallo servidor remoto');
    })
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
  }
});
// =====================================================================================================================
MyApp.angular.service('BoeItem', function($http, Error, Utiles, C) {

  this.createUrl = function(urlDetalle){
    urlDetalle = urlDetalle.replace('txt', 'xml');
    return C.YQL + '?q=select texto from xml where url="' + urlDetalle + '"';
  };
  this.new = function (itemDeArray){
    this.titulo = itemDeArray.title;
    this.description = itemDeArray.description;
    this.link = itemDeArray.link;
    this.pdf = itemDeArray.guid.content;
    this.organismo = 'BOE';
  };
  this.getData = function(urlDetalle){
    return $http.get(this.createUrl(urlDetalle), {cache: true}).then(function(resp){
        // console.log('get detalle boe', resp);
        return Utiles.xmlParser(resp.data);
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
  this.url = 'https://api.import.io/store/connector/113c753a-37f6-43c2-9757-53fe2b31a079/_query?input=webpage/url:' +
    'http%3A%2F%2Fwww.idepa.es%2Fsites%2Fweb%2Fidepaweb%2Fservicios%2Fayudas%2Fbuscador%2Fresults.jsp' +
    '%3FSelectorAmbito%3D%26ayuda_max%3D1000%26ayuda_page%3D1%26EsAyuda%3Dtruee%26Activo%3Dtruee&&' +
    '_apikey=a069ae78588c4657a607f526288701380ffd8be60c1406b008f67b34c724244b89b2ed5acf5a41ee5f54a0b9b08f62d7b6a82a9211ac0d79e12ef863de3d72c28de5494401fcef33ad8923248079daba';

  this.txt = {titulo: 'IDEPA', subtitulo: 'Instituto de Desarrollo Económico del Principado de Asturias'};

  this.getItems = function(){
    return this.items;
  };
  this.getItemByIndex = function(index){
    return this.items[index];
  };
  this.getData = function(){
    return $http.get(this.url, {cache: true}).then(function(resp){
        self.items = resp.data.results;
      }).catch(function () {
        throw C.STRINGS.ERROR_TEXT;
    })
  };
});
// =====================================================================================================================
MyApp.angular.service('IdepaItem', function($http, Error, Utiles, C){

  var query = 'select * from html where url=@url and xpath="//div[@class=\'contenidosubseccionFichaAyuda\']" and  ' +
    'charset="utf-8" and compat="html5"';

  this.new = function (itemDeArray){
    this.titulo = itemDeArray.descripcion;
    this.ambito = itemDeArray.ambito;
    this.link = itemDeArray.link_detalle;
    this.organismo = 'IDEPA';
  };
  this.getUrl = function(){
    return C.YQL + ('?url='+ this.link) + ('q=' +query);
  };
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
    msg = 'CODIGO: '+resp.status+'<br>'+resp.statusText;
    if(resp.status == -1)
      msg = msg + 'Posibles causas:<br>1) No conexion datos<br>2) Fallo servidor remoto<br>' +
        '3) Configuracion de seguridad restrictiva de navegador<br><br>';
    MyApp.fw7.app.alert(msg, 'Error');
    // console.error(resp);
  };
  this.mostrar2 = function(txtExcepcion){
    MyApp.fw7.app.alert(txtExcepcion, 'Error');
  }
});
// =====================================================================================================================
MyApp.angular.service('Utiles', function(){

  this.btnTop = function(){
    $$('#detalleContent').scrollTop(0, 500); //500 velocidad
  };
  this.xmlParser = function(xmlStr){
    var xmlDoc = null;
    if( /Edge\/12./i.test(navigator.userAgent )){ // IE EDGE
      xmlDoc = document.implementation.createHTMLDocument(''); // es un hack
      xmlDoc.open(); xmlDoc.write(xmlStr); xmlDoc.close();
      return xmlDoc.getElementsByTagName('results')[0].innerHTML;
    }
    else if( ('ActiveXObject' in window) &&
              typeof(new window.ActiveXObject('Microsoft.XMLDOM')) === 'object' ) { // IEXPLORER
      xmlDoc = new window.ActiveXObject('Microsoft.XMLDOM');
      xmlDoc.async = 'false';
      xmlDoc.loadXML(xmlStr);
      return xmlDoc.getElementsByTagName('results')[0].xml; // no se puede usar innerHTML
    }
    else if (typeof window.DOMParser != 'undefined') { // CHROME, FIREFOX, ETC.
      var parser = new DOMParser();
      xmlDoc = parser.parseFromString(xmlStr, 'application/xml');
      return xmlDoc.getElementsByTagName('results')[0].innerHTML;
    }
     else {
      Error.mostrar2('No hay datos. Error al analizar fichero XML. Posible navegador no soportado');
    }
  };
});
// =====================================================================================================================
MyApp.angular.service('MineturItems', function($http, C, Error){

  var self = this;
  var query = 'select * from rss where url=@url';
  var urlOrigen = 'http://www.minetad.gob.es/PortalAyudas/_layouts/genrss.aspx?List=listaayudas&View=vistaayudas';

  this.items = null;
  this.txt = { titulo: 'MINETUR', subtitulo: 'Ministerio de Industria, Energ\u00EDa y Turismo'};
  this.urlListado = C.YQL + ('?url='+encodeURIComponent(urlOrigen)) + ('&q='+query) + '&format=json';
  this.getItems = function(){
    return this.items;
  };
  this.getItemByIndex = function(index){
    return this.getItems()[index];
  };
  this.getData = function(){
    return $http.get(this.urlListado, {cache: true}).then(function(resp){
      self.items = resp.data.query.results.item;
    }).catch(function (datosError) {
      throw 'Posibles causas:<br>1) No conexion datos<br>2) Fallo servidor remoto';
    })
  }
});
// =====================================================================================================================
MyApp.angular.service('MineturItem', function(MineturItems){

  this.new = function(itemDeArray){
    this.titulo   = itemDeArray.title;
    this.content  = itemDeArray.description;
    this.creator  = itemDeArray.creator;
    this.link     = itemDeArray.link;
    this.organismo = 'MINETUR';
  }
});
// =====================================================================================================================
MyApp.angular.constant('C', {
  YQL2: 'http://98.137.200.255/v1/public/yql', // usa ip en vez de domain name para menor latencia
  YQL:'https://query.yahooapis.com/v1/public/yql',
  STRINGS: {
    LOADING_ICON: '<img src="img/3.gif" style="vertical-align: middle"/>',
    TXT_LOADING_DETALLE: '<img src="img/3.gif" style="vertical-align: middle"/>' + ' Obteniendo datos... ',
    TXT_PRELOADER: '<div style="font-size:small">Cargando datos...</div><div style="font-size:small">El proceso puede tardar</div>',
    ERROR_TEXT: 'No hay datos. Posibles causas: 1) Sin conexion. 2) Fallo servidor remoto'
  }
});
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
MyApp.angular.service('IpymeItems', function($http, Error, C){

  var self = this;
  var urlIpyme = encodeURIComponent('http://www.ipyme.org/_layouts/15/IPYME/RSSNovedades.aspx');
  var yqlQuery = encodeURIComponent('select * from rss where url=@url');

  this.url = C.YQL + ('?url='+urlIpyme) + ('&q='+yqlQuery) + '&format=json';
  this.items = null;
  this.txt = { titulo: 'DGPYME', subtitulo: 'Dirección General de la Pequeña y Mediana Empresa'};

  this.getItems = function(){
    return this.items;
  };
  this.getItemByIndex = function(index){
    return this.items[index];
  };
  this.removeNullsFromArray = function (arr) {
    var temp = [], i = null;
    for (i = 0; i < arr.length; ++i) {
      if (arr[i] != null) { temp.push(arr[i]) }
    }
    return temp;
  };
  this.getData = function(){
    // console.log(this.url);
    return $http.get(this.url, {cache: true}).then(function(resp){
      // sometimes the server return malformed response with nulls, this remove them
      self.items = self.removeNullsFromArray(resp.data.query.results.item);
    }).catch(function (datosError) {
      throw C.STRINGS.ERROR_TEXT;
    })
  }
});
// =====================================================================================================================
MyApp.angular.service('IpymeItem', function($http, Error, Utiles, C) {

  var query = 'select * from html where url=@url and xpath="//div[@class=\'zonalistado\']/p" and' +
    ' charset="utf-8" and compat="html5"';

  this.createUrl = function(urlDetalle){
    return C.YQL + ('?url='+urlDetalle) + ('&q='+query) + '&format=xml';
  };
  this.new = function (itemDeArray){
    this.titulo = itemDeArray['title'];
    this.link = itemDeArray.link;
    this.plazo = itemDeArray.pubDate;
    this.organismo = 'DGPYME';
  };
  this.getData = function(urlDetalle){
    return $http.get(this.createUrl(urlDetalle), {cache: true}).then(function(resp){
        return Utiles.xmlParser(resp.data);
      }).catch(function () {
        throw C.STRINGS.ERROR_TEXT;
    })
  }
});
// =====================================================================================================================
MyApp.angular.service('Favoritos', function ($localStorage) {

  this.getAll = function () {
    return $localStorage.favoritos;
  };
  this.add = function (item) {
    $localStorage.favoritos.push(item);
  };
  this.delete = function (index) {
    $localStorage.favoritos.splice(index, 1);
  };
  this.deleteAll = function () {
    //$localStorage.favoritos.length = 0; <- Esta forma es menos portable
    totalFavs = $localStorage.favoritos.length;
    $localStorage.favoritos.splice(0, totalFavs);
  };
  this.mostrarAviso = function (texto) {
    MyApp.fw7.app.addNotification({
      message: texto,
      hold: 2000,
      button: {text:'Cerrar', close:true},
      closeOnClick: true
    });
  };
  this.contiene = function (item) {
    var favoritos = this.getAll();
    for (var i = 0; i < favoritos.length; i++) {
      if ( angular.equals(favoritos[i], item) ) {
        return true;
      }
    }
    return false;
  };
  this.getItem = function (arrIndex) {
    return this.getAll()[arrIndex];
  };
});
// =====================================================================================================================
/*MyApp.angular.service('BdnsItems', function ($http, Error) {

  var self = this;
  var urlJson = 'https://script.google.com/macros/s/AKfycbyYoPu_90c2NGrSIX-cy7ttDnPh4VwtWsfddNmw_FThfdxTwZI/exec';

  this.items = null;
  this.txt = {titulo: 'BDNS', subtitulo: 'Base de Datos Nacional de Subvenciones'};
  this.getItems = function(){
    if (this.items) {
      return this.items;
    } else {
      throw 'Datos no disponibles. Posibles causas: 1) Sin conexión de datos. 2) Fallo de red';
    }
  };
  this.getItemByIndex = function(index){
    return this.getItems()[index];
  };
  this.getData = function () {
    return $http.get( urlJson, {cache:true}).then(function (resp) {
        // Invierte array para tener items recientes al principio
        resp.data['Hoja 1'].reverse();
        // Trunca array. Solo interesan los 300 ultimos items
        // todo: seria mejor truncar en origen (gsheets) para descargar menos datos
        resp.data['Hoja 1'].length = 300;
        self.items = resp.data['Hoja 1'];
        //console.log('url listado bdns');
        //console.log('listado bdns', self.items);
        return self.items;
      }, function (datosError) {
        Error.mostrar(datosError);
      }
    );
  };
});*/
// =====================================================================================================================
MyApp.angular.service('BdnsItem', function($http, Error, Utiles, C) {

  //todo: intentar hacer el post del idBdns a mano para evitar llamada a import.io y simplificar

  var self = this;
  var query = 'select * from html where url=@url and xpath="//section[1]" and compat="html5"';

  this.urlParaHallarIdDetalle = function (idConvocatoria) {
    return 'https://api.import.io/store/connector/4134e2eb-7dc0-417f-b939-5b670eec0a3f/_query?' +
      'input=strnumcov:' + idConvocatoria  +
      '&_apikey=a069ae78588c4657a607f526288701380ffd8be60c1406b008f67b34c724244b89b2ed5acf5a41ee5f54a0b9b08f62d7b6a82a9211ac0d79e12ef863de3d72c28de5494401fcef33ad8923248079daba';
  };

  this.creaUrlYQL = function(urlDetalleBdns){
    return C.YQL + ('?url='+urlDetalleBdns) + ('&q='+query) + '&format=xml';
  };

  this.new = function (itemDeArray){

     //Preflight para obtener cookie de session -> Da error CORS en consola
    $http.head('http://www.pap.minhap.gob.es/bdnstrans/es/index', reqConfig).then(function (resp) {});

    this.titulo = itemDeArray['Título'];
    this.idConvocatoria = itemDeArray.ID;
    this.administracion = itemDeArray['Administración'];
    this.departamento = itemDeArray['Departamento'];
    this.fecha = itemDeArray['Fecha de registro'];
    this.organo = itemDeArray['Órgano'];
    this.organismo = 'BDNS';
    // propiedad creada para mostrar en favoritos
    this.creator = this.departamento + '. ' + this.organo;
  };

  this.getUrlDetalleBdns = function (urlIdDetalle) {
    return $http.get(urlIdDetalle, {cache: true}).then(function (datosDetalleBdns) {
      return datosDetalleBdns.data.results[0].titulo
    },
      function (datosError) {
        Error.mostrar(datosError);
      }
    )
  };

  // Para obtener el contenido del detalle es necesario saber su id en BDNS. Para ello hay que hacer una consulta previa
  // a la url que se obtiene mediante creaUrlIdDetalle(). Hay dos ids: id de convocatoria e id de BDNS, que es
  // el que aparece en la url de BDNS en el detalle.
  //
  // Por lo tanto hay que hacer dos consultas http. La primera para hallar el verdadero id del detalle de BDNS
  // (que no es idConvocatoria) y la segunda para obtener el contenido del
  // detalle. Esta complejidad añadida de dobles ids probablemente es por mal diseño de BDNS.

  var reqConfig = {cache: true};

  this.getContenidoRemoto = function(){
    // 1. Primero se obtiene urlDetalleBdns
    return this.getUrlDetalleBdns( this.urlParaHallarIdDetalle(this.idConvocatoria)).then(function (urlDetalleBdns) {
      // 2. Despues se obtiene el contenido del detalle
      $http.get( self.creaUrlYQL( urlDetalleBdns  ), reqConfig).then(function (xmlDetalle) {
        self.content = Utiles.xmlParser( xmlDetalle.data );
        self.link = urlDetalleBdns;
      }, function (datosError) {
        Error.mostrar(datosError);
      })
    })
  };

});
// =====================================================================================================================
MyApp.angular.service('BdnsItems', function ($http, Error) {

  var self = this;
  var urlJson = 'https://script.google.com/macros/s/AKfycbyYoPu_90c2NGrSIX-cy7ttDnPh4VwtWsfddNmw_FThfdxTwZI/exec';

  this.items = null;
  this.txt = {titulo: 'BDNS', subtitulo: 'Base de Datos Nacional de Subvenciones'};
  this.getItems = function(){
    if (this.items) {
      return this.items;
    } else {
      throw 'Datos no disponibles. Posibles causas: 1) Sin conexión de datos. 2) Fallo de red';
    }
  };
  this.getItemByIndex = function(index){
    return this.getItems()[index];
  };

  var urlBdnsHomePage = 'http://www.pap.minhap.gob.es/bdnstrans/es/index';
  var urlCsvData = 'http://www.pap.minhap.gob.es/bdnstrans/GE/es/exportar?tipo=CSV';
  var urlGsProxyCsv = 'https://script.google.com/macros/s/AKfycbygnUXEVsUmfEIuwooMWqJaadVxZ7zxQqRMqHs_4N2BrotmPnc/exec?url=http://www.pap.minhap.gob.es/bdnstrans/GE/es/exportar?tipo=CSV';
  var urlJsonData = 'http://www.pap.minhap.gob.es/bdnstrans/busqueda?type=topconv&_search=false&nd=1465935202024&rows=200&page=1&sidx=4&sord=desc';

  //Papa.parse(urlCsvData, {
  //  download: true,
  //});
  //console.log('papa', Papa);
});
// =====================================================================================================================
