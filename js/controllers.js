MyApp.angular.controller('IndexPageController', function ($scope, InitService, $rootScope) {

    InitService.addEventListener('ready', function () {
        // DOM ready
        console.log('IndexPageController: ok, DOM ready');

        // You can access angular like this:
        // MyApp.angular

        // And you can access Framework7 like this:
        // MyApp.fw7.app
    });

    $scope.hello= 'hello from IndexPageController';
    var $$ = Dom7;

    //$$(document).on('ajaxComplete', function (e) {
    //    var xhr = e.detail.xhr;
    //    console.log('e.detail.xhr');
    //});

    //$$('.alert-text').on('click', function () {
    //    MyApp.fw7.app.alert('Here goes alert text');
    //});

    $scope.doAlert = function(){
        MyApp.fw7.app.alert('Here goes alert text');
    }

});
// =====================================================================================================================
MyApp.angular.controller('DetailPageController', function ($scope) {
  $scope.hello= 'hello from DetailPageController';
});
// =====================================================================================================================
MyApp.angular.controller('AboutPageController', function ($scope) {
    console.log('hello from AboutPageController');
    $scope.hello2= 'hello from AboutPageController';
});
// =====================================================================================================================
MyApp.angular.controller('ListadoBoeCtrl', function ($scope, Boe, Error) {

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        console.log('listado boe ctrl, on page before animation');
        console.log('page.query.tipo', page.query.tipo);
        $scope.obtenerItems( hallaUrl(page.query.tipo) );
        //$scope.$apply();
    });

    var hallaUrl = function(tipoAyuda){
        if (tipoAyuda === 'subvenciones') {
            return Boe.urlListado(Boe.urlSubvenciones);
        } else if (tipoAyuda === 'becas') {
            return Boe.urlListado(Boe.urlBecas);
        } else if (tipoAyuda === 'premios') {
            return Boe.urlListado(Boe.urlPremios);
        } else if (tipoAyuda === 'oposiciones') {
            return Boe.urlListado(Boe.urlOposiciones);
        };
    }

    $scope.obtenerItems = function(url){
      Boe.getListado(url).then(function(resp){
          $scope.items = resp.data.query.results.item;
          MyApp.fw7.app.hideIndicator();
      });
    };

    $scope.hallaId = function(url){
        //console.log('halla id de url:', url);
      return url.split('=')[1];
    };


});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, $sce) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        $scope.htmlDetalle = 'Obteniendo datos...';
        //$scope.textoDetalle = 'Obteniendo datos...';
        //MyApp.fw7.app.showIndicator();
        //Dom7.get( Boe.urlDetalle( page.query.id ), function (data) {
        //    //$scope.textoDetalle = $sce.trustAsHtml(data);
        //    console.log(data);
        //    $scope.$apply();
        //    MyApp.fw7.app.hideIndicator();
        //});



        console.log('url final', Boe.urlDetalle(page.query.id));
        Boe.getDetalleXml( Boe.urlDetalle(page.query.id)).then(function(htmlDetalle){
            //console.log(htmlDetalle);
            $scope.htmlDetalle = $sce.trustAsHtml(htmlDetalle);

        });

    });


});
// =====================================================================================================================
/*
MyApp.angular.controller('ListadoBoeCtrl2', function ($scope, Boe, Error) {
    var listTemplate =
        '<ul>' +
        '{{#each items}}' +
        '<li>' +
        '<a href="#" class="item-link item-content feeds-item-link" data-index="{{@index}}">' +
        '<div class="item-inner">' +
        '<div class="item-title">titulo: {{title}}</div>' +
        '<div class="item-after">{{formattedDate}}</div>' +
        '</div>' +
        '</a>' +
        '</li>' +
        '{{/each}}' +
        '</ul>';
    var itemPopupTemplate =
        '<div class="popup">' +
        '<div class="view navbar-fixed">' +
        '<div class="navbar">' +
        '<div class="navbar-inner">' +
        '<div class="left sliding">' +
        '<a href="#" class="close-popup link">' +
        '<i class="icon icon-back"></i>' +
        '<span>Close</span>' +
        '</a>' +
        '</div>' +
        '<div class="center sliding">{{title}}</div>' +
        '</div>' +
        '</div>' +
        '<div class="pages">' +
        '<div class="page feeds-page" data-page="feeds-page-{{index}}">' +
        '<div class="page-content">' +
        '<div class="content-block">' +
        '<a href="{{link}}" class="external" target="_blank">{{title}}</a><br>' +
        '<small>{{formattedDate}}</small>' +
        '</div>' +
        '<div class="content-block"><div class="content-block-inner">{{description}}</div></div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>' +
        '</div>';

    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe2', function (page) {
        //MyApp.fw7.app.showIndicator();
        //MyApp.fw7.app.showProgressbar();
        //$scope.obtenerItems( hallaUrl(page.query.tipo) );
        //console.log(Dom7.find('li'));
        //console.log(Dom7('#lista')[0]);
        //console.log(Dom7('#lista')[0].childElementCount);
        console.log('tipo', page.query.tipo);
        console.log('urltest', hallaUrl(page.query.tipo));
        var myFeed = MyApp.fw7.app.feeds('#feeds', {
            url: hallaUrl(page.query.tipo),
            openIn: 'popup',
            listTemplate:listTemplate,
            itemPopupTemplate:itemPopupTemplate,
            customItemFields:['content:encoded', 'author']
        });
        //$scope.$apply();
    });

    var hallaUrl = function(tipoAyuda){
        if (tipoAyuda === 'subvenciones') {
            return Boe.urlListado(Boe.urlSubvenciones);
        } else if (tipoAyuda === 'becas') {
            return Boe.urlListado(Boe.urlBecas);
        } else if (tipoAyuda === 'premios') {
            return Boe.urlListado(Boe.urlPremios);
        } else if (tipoAyuda === 'oposiciones') {
            return Boe.urlListado(Boe.urlOposiciones);
        };
    }

    //$scope.obtenerItems = function(url){
    //    $scope.items = 'Obteniendo datos...';
    //    Boe.getListado(url).then(function(resp){
    //        $scope.items = resp.data.query.results.item;
    //        //MyApp.fw7.app.hideProgressbar();
    //        MyApp.fw7.app.hideIndicator();
    //    });
    //};

    $scope.hallaId = function(url){
        return url.split('=')[1];
    };


});
*/
