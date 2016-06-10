describe('Tests unitarios servicio Favoritos', function () {
    var favoritos;

    beforeEach(module('MyApp'));
    beforeEach(inject(function(Favoritos) {
        favoritos = Favoritos;
    }));

    it('- Comprueba existencia de favoritos', function () {
        var favs = favoritos.getAll();
        expect(typeof favs).toEqual('object');
    });

    it('- Añadir favorito', function () {
        var fav = {nombre: 'nombre favorito 1', descripcion: 'descripcion favorito 1'};
        favoritos.add(fav);
        expect(favoritos.contiene(fav)).toBe(true);
    });

    it('- Borrar favorito', function () {
      var fav = {nombre: 'nombre favorito 1', descripcion: 'descripcion favorito 1'};
      favoritos.delete(0);
      expect(favoritos.getAll().length).toEqual(0);
    });

    it('- Borrar todos los favoritos', function () {
      favoritos.deleteAll();
      expect(favoritos.getAll().length).toEqual(0);
    });

    it('- Contiene favorito', function () {
      var fav = {nombre: 'nombre favorito 1', descripcion: 'descripcion favorito 1'};
      favoritos.deleteAll();
      favoritos.add(fav);
      var contieneNombre = favoritos.getAll()[0].nombre === 'nombre favorito 1';
      var contieneDescripcion = favoritos.getAll()[0].descripcion === 'descripcion favorito 1';
      expect( favoritos.contiene(fav)).toEqual( contieneNombre && contieneDescripcion  );
      favoritos.deleteAll();
    });

});