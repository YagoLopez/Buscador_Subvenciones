// Global variables ====================================================================================================
var MyApp = {};
var $$ = Dom7;

// config MyApp
//MyApp.config = {
//
//};

// Angular configuration and initialization ============================================================================
MyApp.angular = angular.module('MyApp', ['socialLinks']);

MyApp.angular.config( function($provide, $compileProvider) {

  $compileProvider.debugInfoEnabled(true);
  //$httpProvider.defaults.headers.common['Access-Control-Allow-Headers'] = '*';
  //delete $httpProvider.defaults.headers.common['X-Requested-With'];

  $provide.decorator('$exceptionHandler', function($log, $delegate, Error) {
    return function(exception, cause) {
      $log.debug('Manejador de excepciones de la aplicacion');
      $log.error('exception', exception, cause);
      $delegate(exception, cause);
      Error.mostrar2('<div style="overflow:auto">'+exception+'<br><br></div>');
    };
  });
});

MyApp.angular.run( function(Utiles, $rootScope) {
  $rootScope.btnTop = Utiles.btnTop;
  $rootScope.msgShare = 'Enlace de inter\u00E9s enviado desde App "Busca Fondos":\n\n';
});

// Framework 7 Creation and configuration ==============================================================================

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

