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

    //todo: quitar diacriticos en la busqueda

    var itemsLength;
    MyApp.fw7.app.onPageBeforeAnimation('listadoBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.obtenerItems( hallaUrl(page.query.tipo) );
        mySearchbar = $$('.searchbar')[0].f7Searchbar;
        console.log('searchTxt', $scope.search);
        if($scope.search != null && $scope.search != 'undefined'){
            console.log('searchbar', mySearchbar);
            console.log('buscando', $scope.search);
            mySearchbar.search($scope.search);
        };
        $$('.list-block-search').on('search', function(e){
            //$scope.$apply(function(){
                    console.log('search query...', e.detail.query);
                    console.log('found items...', e.detail.foundItems.length);
                    itemsLength = e.detail.foundItems.length;
                    console.log('items lenght dentro del evento f7', itemsLength);
                    //$scope.search = e.detail.query;
                    $scope.itemsLenght = itemsLength;
                    console.log('scope', $scope);
            //    }
            //);
            // $broadcast will send the event downwards the $scope hierarchy, while $emit will send it upwards
            $scope.$broadcast('searchTxtChanged');
        });
        console.log('search txt', $scope.search);


    });

    $scope.$on('searchTxtChanged', function(e) {
        // desired code in Angular's scope
        console.log('searchTxtChanged');
        console.log('items lenght fuera del evento f7', itemsLength);
        console.log('target scope', e.targetScope);
        console.log('asignacion de itemsLength fuera del evento f7');
        $scope.$apply(function(){
                $scope.itemsLenght = itemsLength;

            }
        )
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
          //$scope.itemsLenght = $scope.items.lenght;
          MyApp.fw7.app.hideIndicator();
      });
    };

    $scope.hallaId = function(url){
        //console.log('halla id de url:', url);
      return url.split('=')[1];
    };

    //$scope.searchTxtChanged = function(searchTxt){
    //  console.log('search txt changed', searchTxt);
    //};

    $scope.getSearchTxt = function(){
        console.log('inputTxt DOM Element', $$('#inputTxt')[0]);
        console.log('inputTxt value', $$('#inputTxt')[0].value);
    };
    $scope.setSearchTxt = function(txt){
        //console.log('inputTxt DOM Elementt', $$('#inputTxt')[0]);
        //console.log('inputTxt value', $$('#inputTxt')[0].value);
        //$scope.searchTxt = 'searchtxt from angular';
        //angular.element($$('#inputTxt')).triggerHandler('change');
        //probar a disparar el evento change desde f7, no con angular
        mySearchbar = $$('.searchbar')[0].f7Searchbar;
        console.log('searchbar', mySearchbar);
        mySearchbar.search('test');
    };

    $scope.getListLength = function(){

    };
});
// =====================================================================================================================
MyApp.angular.controller('DetalleBoeCtrl', function ($scope, Boe, $sce) {

    MyApp.fw7.app.onPageBeforeAnimation('detalleBoe', function (page) {
        MyApp.fw7.app.showIndicator();
        $scope.htmlDetalle = 'Obteniendo datos...';
        console.log('query string', decodeURIComponent(page.query.web), decodeURIComponent(page.query.pdf));
        $scope.web = decodeURIComponent(page.query.web);
        $scope.pdf = decodeURIComponent(page.query.pdf);

        Boe.getDetalle( Boe.urlDetalle(page.query.id)).then(function(htmlDetalle){
            //console.log(htmlDetalle);
            $scope.htmlDetalle = htmlDetalle;
            MyApp.fw7.app.hideIndicator();
        });
    });
    $scope.getHtmlSafe = function(html){
        return $sce.trustAsHtml(html);
    };
    $scope.btnTop = function(){
        console.log('click');
        Dom7('.page-content').scrollTop(0, 500); //500 velocidad
    }
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
