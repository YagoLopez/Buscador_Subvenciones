// Global variables ====================================================================================================

var MyApp = {};
var $$ = Dom7;

// Framework 7 creation and configuration ==============================================================================
MyApp.fw7 = {
  app : new Framework7({
    material: true,
    materialRipple: false,
    materialPageLoadDelay: 10, // revisar
    activeState: true,
    fastClicks: true,//?
    pushState: false,//?
    //activeStateElements: '',
    sortable: false,
    cache: false,
    modalTitle: 'Informaci\u00F3n',
    modalButtonCancel: 'Cancelar',
    dynamicNavbar: false,
    materialPreloaderHtml: '<div style="color:white;font-size:12px;padding:10px">Cargando</div>',
    //materialPreloaderHtml: '<div><img src="img/10.gif" width="25"></div>',
    materialPreloaderSvg: '',
    materialRippleElements: '',
    scrollTopOnNavbarClick: true,
    swipePanel: 'left',
    swipePanelActiveArea: 500,
    swipePanelNoFollow: false,
    swipePanelThreshold: 10,
    uniqueHistory: false,
    preloadPreviousPage: true
    //pushStateSeparator: '#!'
  })
};

MyApp.fw7.app.addView( '.view-main', {domCache: true} );

// Angular configuration and initialization ============================================================================
MyApp.angular = angular.module('MyApp', []);

MyApp.angular.config( function($provide, $compileProvider, $httpProvider) {

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

MyApp.angular.run( function(Utiles, $rootScope) {
  //$rootScope.btnTop = Utiles.btnTop;
  $rootScope.msgShare = 'Enlace de inter\u00E9s enviado desde App "Busca Fondos":\n\n';
});
// Cordova/Phonegap init ===============================================================================================
/*
// Wait for device API libraries to load

function onLoad() {
  document.addEventListener("deviceready", onDeviceReady, false);
}

// device APIs are available
//
function onDeviceReady() {
  // Now safe to use device APIs
}
*/

