
var MyApp = {};
var $$ = Dom7;

// config MyApp
//MyApp.config = {
//
//};

// Init angular
MyApp.angular = angular.module('MyApp', []);

// Config angular
MyApp.angular.config( function($provide) {
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

MyApp.angular.run( function($anchorScroll) {
  //$anchorScroll.yOffset = 100;   // always scroll by 50 extra pixels
});