// Global variables ====================================================================================================

var MyApp = {};
var $$ = Dom7;

// Framework 7 creation and configuration ==============================================================================
MyApp.fw7 = {
  app : new Framework7({
    animatePages: false,
    material: true,
    materialRipple: false,
    materialPageLoadDelay: 1,
    activeState: true,
    fastClicks: true,
    pushState: false,
    sortable: false,
    cache: false,
    modalTitle: 'Informaci\u00F3n',
    modalButtonCancel: 'Cancelar',
    dynamicNavbar: false,
    materialPreloaderHtml: '<div style="text-align:center"><img src="img/9.gif" width="25"></div>',
    materialPreloaderSvg: '',
    materialRippleElements: '',
    scrollTopOnNavbarClick: true,
    swipePanel: 'left',
    swipePanelActiveArea: 500,
    swipePanelThreshold: 10,
    uniqueHistory: false,
    preloadPreviousPage: true,
    swipePanelNoFollow: true
    //swipeoutNoFollow: true
    //activeStateElements: '',
    //pushStateSeparator: '#!'
  })
};

MyApp.fw7.app.addView( '.view-main', {domCache: true} );

// Angular configuration and initialization ============================================================================
MyApp.angular = angular.module('MyApp', ['ngStorage']);

MyApp.angular.config( function($provide, $compileProvider, $httpProvider) { // config

  $compileProvider.debugInfoEnabled(false);
  $httpProvider.useApplyAsync(true);
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

MyApp.angular.run( function($rootScope, $localStorage, $http, Error) { // init

  // Preflight para obtener cookie de session de BDNS -> Da error CORS en consola. No afecta.
  $http.get('http://www.pap.minhap.gob.es/bdnstrans/es/index', {cache: true}).then(function (resp) {});

  // Inicializacion de favoritos en almacenamiento local
  if(typeof($localStorage) == 'undefined'){
    Error.mostrar2('Almacenamiento local de favoritos no soportado');
  } else{
    if (!$localStorage.favoritos)
      $localStorage.favoritos = [];
  };
  $rootScope.msgShare = 'Enlace de inter\u00E9s enviado desde App "Busca Fondos":\n\n';

});

