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
    //console.log('url', url);
    return $http.get(url, {cache: true}).then(function(resp){
        if(resp.data.query)
          self.items = resp.data.query.results.item;
        else
          Error.mostrar2('No datos. Posibles causas: 1) Sin conexion. 2) Fallo servidor remoto');
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

  this.createUrl = function(urlDetalle){
    return C.YQL + ('?url='+urlDetalle) + ('&q='+query) + '&format=xml';
  };
  this.new = function (index){
    var i = BoeItems.getItems()[index];
    this.titulo = i.title;
    this.description = i.description;
    this.link = i.link;
    this.pdf = i.guid.content;
    this.index = index;
  };
  this.getData = function(urlDetalle){
    return $http.get(this.createUrl(urlDetalle), {cache: true}).then(function(resp){
        //console.log( resp );
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

  this.txt = { titulo: 'IDEPA', subtitulo: 'Instituto de Desarrollo Econ\u00F3mico del Principado de Asturias'};

  this.getItems = function(){
    return this.items;
  };
  this.getData = function(){
    return $http.get(this.url, {cache: true}).then(function(resp){
        //console.log(resp.data.results);
        self.items = resp.data.results;
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
    this.link = i.link_detalle;
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
    MyApp.fw7.app.hidePreloader();
    msg = 'CODIGO: '+resp.status+'<br>'+resp.statusText;
    if(resp.status == -1)
      msg = msg + 'Posibles causas:<br>1) No conexion datos<br>2) Fallo servidor remoto<br>' +
        '3) Configuracion de seguridad restrictiva en IExplorer<br><br>';
    MyApp.fw7.app.alert(msg, 'Error');
    console.error(resp);
  };
  this.mostrar2 = function(txtExcepcion){
    MyApp.fw7.app.hidePreloader();
    MyApp.fw7.app.alert(txtExcepcion, 'Error');
  };
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
    };
  };
});
// =====================================================================================================================
MyApp.angular.service('MineturItems', function($http, Utiles, C, Error){

  var self = this;
  var query = 'select * from rss where url=@url';
  var urlOrigen = 'http://www.minetur.gob.es/PortalAyudas/_layouts/genrss.aspx?List=listaayudas&View=vistaayudas';

  this.items = null;
  this.txt = { titulo: 'MINETUR', subtitulo: 'Ministerio de Industria, Energ\u00EDa y Turismo'};
  this.urlListado = C.YQL + ('?url='+encodeURIComponent(urlOrigen)) + ('&q='+query) + '&format=json';
  this.getItems = function(){
    return this.items;
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
MyApp.angular.service('MineturItem', function(MineturItems){

  this.new = function(index){
      var obj = MineturItems.getItems()[index];
      this.titulo = obj.title;
      this.content = obj.description;
      this.creator = obj.creator;
      this.link = obj.link;
      this.index = index;
  }
});
// =====================================================================================================================
MyApp.angular.constant('C', {
  YQL2: 'http://98.137.200.255/v1/public/yql', // usa ip en vez de domain name para menor latencia
  YQL:'https://query.yahooapis.com/v1/public/yql',
  STRINGS: {
    TXT_LOADING_DETALLE:'<img src="img/3.gif"> '+'Obteniendo datos... ',
    TXT_PRELOADER: '<span style="font-size:medium">Cargado. Espere un momento, por favor...</span>'
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
MyApp.angular.service('IpymeItems', function($http, Error){

  var self = this;
  this.url = 'https://api.import.io/store/connector/3c36ac22-1193-4d86-bc49-646d3b3917b2/_query?input=webpage/url:' +
    'http%3A%2F%2Fwww.ipyme.org%2Fes-ES%2FBBDD%2FAyudasIncentivos%2FPaginas%2FListaAyudasIncentivos.aspx%3F' +
    'TipoConsulta%3Dultimas%26PAGE%3D1&&_apikey=' +
    'a069ae78588c4657a607f526288701380ffd8be60c1406b008f67b34c724244b89b2ed5acf5a41ee5f54a0b9b08f62d7b6a82a9211ac0d79e12ef863de3d72c28de5494401fcef33ad8923248079daba';

  this.items = null;
  this.txt = { titulo: 'DGPYME', subtitulo: 'Direcci\u00F3n General de la Peque\u00F1a y Mediana Empresa'};

  this.getItems = function(){
    return this.items;
  };
  this.getData = function(){
    return $http.get(this.url, {cache: true}).then(function(resp){
        //console.log(resp);
        self.items = resp.data.results;
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
// =====================================================================================================================
MyApp.angular.service('IpymeItem', function($http, Error, Utiles, C, IpymeItems) {

  var query = 'select * from html where url=@url and xpath="//div[@class=\'zonalistado\']/p" and' +
    ' charset="utf-8" and compat="html5"';

  this.createUrl = function(urlDetalle){
    return C.YQL + ('?url='+urlDetalle) + ('&q='+query) + '&format=xml';
  };
  this.new = function (index){
    var i = IpymeItems.getItems()[index];
    this.titulo = i['link/_text'];
    this.ambito = i.ambito;
    this.link = i.link;
    this.plazo = i.plazo;
    this.index = index;
  };
  this.getData = function(urlDetalle){
    return $http.get(this.createUrl(urlDetalle), {cache: true}).then(function(resp){
        return Utiles.xmlParser(resp.data);
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
// =====================================================================================================================
/*
MyApp.angular.service('BdnsItem', function($http, Error, Utiles, C, BdnsItems) {

  var query = 'select * from html where url=@url and xpath="//section[1]" and compat="html5"';

  this.createUrl = function(){
    return C.YQL + ('?url='+this.link) + ('&q='+query) + '&format=xml';
  };
  this.new = function (index){
    var i = BdnsItems.getItemByIndex(index);
    this.idConvocatoria = i[0];
    this.linkExternal_Url_or_Pdf = i[6];
    this.link = 'http://www.pap.minhap.gob.es/bdnstrans/GE/es/convocatoria/'+this.idConvocatoria;
    this.index = index;
    //this.fechaConvocatoria = i[4];
    //this.titulo = i[5];
    //this.entidadConvocante = i[2];
    //this.ambito = i[1];
    //this.fechaConvocatoria = i[4];
  };
  this.getData = function(){
    return $http.get(this.createUrl(), {cache: true}).then(function(resp){
        console.log( resp );
        return Utiles.xmlParser(resp.data);
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
*/
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
    };
    return false;
  };
  this.getItem = function (arrIndex) {
    return this.getAll()[arrIndex];
  };
});
// =====================================================================================================================
MyApp.angular.service('BdnsItems', function ($http, Error) {

  var self = this;
  var urlBlockspring = 'https://run.blockspring.com/api_v2/blocks/query-public-google-spreadsheet?' +
    'api_key=br_9403_540bc3c7fbaf65825e90de7bfa42dd6b0328bf54&flatten=true&cache=true&expiry=3600';
  var urlGoogleSheet = 'https://docs.google.com/spreadsheets/d/1YrT9nzrSjF9agiCXrJqFCpHtSr49A6QazgFOfKWdTQQ/edit#gid=0';
  var post_data = {
    'query':'select *',
    'url': urlGoogleSheet,
    '_blockspring_spec': true,
    '_blockspring_ui': true
  };
  this.items = null;
  this.txt = {titulo: 'BDNS', subtitulo: 'Base de Datos Nacional de Subvenciones'};
  this.getItems = function(){
    return this.items;
  };
  this.getItemByIndex = function(index){
    return this.getItems()[index];
  };
  this.getData = function () {
    return $http.post( urlBlockspring, post_data, {cache: true} ).then(function (resp) {
      // Trunca array
      resp.data.data.length = 200;
      self.items = resp.data.data;
      console.log('data', resp.data.data);
      return resp.data.data;
    }, function (respError) {
      Error.mostrar(respError);
    })
  };

  // Encadenamiento de promesas
/*  this.getData2 = function () {
    return $http(requestConfig) // primera peticion: obtencion de cookie de forma transparente. No hay que hacer nada
      .then(function (resp) {
        console.log('efectuando primera peticion, obtencion de cookie, respuesta', resp);
      })
      .then(function () {
        return $http.get(urlUltimasAyudas, {cache:true, withCredentials:true}); // segunda peticion: obtencion de datos
      })
      .then(function (resp) {
        self.items = resp.data.rows;
        console.log('datos de segunda peticion', resp.data.rows);
        return resp.data.rows;
      }, function (respError) {
        Error.mostrar(respError);
      });
  };*/

});
// =====================================================================================================================
MyApp.angular.service('BdnsItem', function($http, Error, Utiles, C, BdnsItems) {

  var query = 'select * from html where url=@url and xpath="//section[1]" and compat="html5"';

  this.createUrl = function(){
    return C.YQL + ('?url='+this.link) + ('&q='+query) + '&format=xml';
  };
  this.new = function (index){
    var item = BdnsItems.getItemByIndex(index);

    this.titulo = item['Título'];
    this.idConvocatoria = item.ID;
    this.link = 'http://www.pap.minhap.gob.es/bdnstrans/GE/es/convocatoria/'+this.idConvocatoria;
    this.linkExternal_Url_or_Pdf = item['Bases reguladoras'];

    this.administracion = item['Administración'];
    this.departamento = item['Departamento'];
    this.fecha = item['Fecha de registro'];
    this.organo = item['Órgano'];
    this.description = 'Órgano: '+this.organo+'. Departamento: '+this.departamento+'. Administración: '+this.administracion;
    this.index = index;

    //this.fechaConvocatoria = i[4];
    //this.titulo = i[5];
    //this.entidadConvocante = i[2];
    //this.ambito = i[1];
    //this.fechaConvocatoria = i[4];
  };
  this.getData = function(){
    return $http.get(this.createUrl(), {cache: true}).then(function(resp){
        console.log( resp );
        return Utiles.xmlParser(resp.data);
      },
      function(datosError){
        Error.mostrar(datosError);
      });
  };
});
// =====================================================================================================================
