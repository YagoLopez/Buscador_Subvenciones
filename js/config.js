
var MyApp = {};

MyApp.config = {};

// Init angular
MyApp.angular = angular.module('MyApp', []);

MyApp.fw7 = {
  app : new Framework7({
    material: true,
    pushState: false,
    sortable: false,
    cache: false
    //pushStateSeparator: '#!'
  }),
  options : {
    domCache: true
  },
  views : []
};

MyApp.fw7.app.onPageBeforeInit('about', function (page) {
  console.log('about page onpageinit');
});

