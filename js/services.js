
MyApp.angular.factory('InitService', ['$document', function ($document) {
  'use strict';

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
  
}]);

MyApp.angular.factory('Ayudas', function ($scope, $http) {
  var servicio = {};

  servicio.getCollection = $http.get('https://api.import.io/store/connector/cb3a963f-7792-4779-be4f-7ba379c46eed/_query' +
      '?input=webpage/url:http%3A%2F%2Fwww.boe.es%2Fbuscar%2Fayudas.php' +
      '&&_apikey=a069ae78588c4657a607f526288701380ffd8be60c1406b008f67b34c724244b89b2ed5acf5a41ee5f54a0b9b08f62d7b6a82a9211ac0d79e12ef863de3d72c28de5494401fcef33ad8923248079daba');
  return servicio;
});

