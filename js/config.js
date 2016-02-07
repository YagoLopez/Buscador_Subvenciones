
var MyApp = {};
var $$ = Dom7;

// config MyApp
//MyApp.config = {
//
//};

// Define angular
MyApp.angular = angular.module('MyApp', ['socialLinks']);

// Config angular
MyApp.angular.config( function($provide, $compileProvider, $httpProvider) {

  $compileProvider.debugInfoEnabled(true);
  $httpProvider.defaults.withCredentials = true;

  //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $provide.decorator('$exceptionHandler', function($log, $delegate, Error) {
    return function(exception, cause) {
      $log.debug('Manejador de excepciones de la aplicacion');
      console.log('exception', exception, cause);
      $delegate(exception, cause);
      Error.mostrar2('<div style="overflow:auto">'+exception+'<br><br></div>');
    };
  });
});

MyApp.fw7 = {
  app : new Framework7({
    material: true,
    pushState: false,
    sortable: false,
    cache: false,
    materialPageLoadDelay: 1,
    modalTitle: 'Informaci\u00F3n',
    modalButtonCancel: 'Cancelar',
    dynamicNavbar: false,
    //pushStateSeparator: '#!'
  }),
  options : {
    domCache: true
  },
  views : []
};

MyApp.angular.run( function(Utiles, $rootScope) {
  $rootScope.btnTop = Utiles.btnTop;
  $rootScope.msgShare = 'Enlace de inter\u00E9s enviado desde App "Busca Fondos":\n\n';
});