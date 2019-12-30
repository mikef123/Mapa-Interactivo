lugaresModulo = (function () {
  var servicioLugares // Servicio para obtener lugares cercanos e información de lugares(como fotos, puntuación del lugar,etc).

  // Completa las direcciones ingresadas por el usuario a y establece los límites
  // con un círculo cuyo radio es de 20000 metros.
  function autocompletar() {
    /* Completar la función autocompletar(): autocompleta los 4 campos de texto de la
    página (las direcciones ingresables por el usuario).
    Para esto creá un círculo con radio de 20000 metros y usalo para fijar
    los límites de la búsqueda de dirección. El círculo no se debe ver en el mapa. */
    // var autocompleta = new google.maps.places.AutocompleteService();
    var location = new google.maps.LatLng({ lat: 4.6097102, lng: -74.081749 });
    // var direccion = document.getElementById('direccion');

    var circle = new google.maps.Circle(
      { center: location, radius: 20000 });
    var options = {
      bounds: circle.getBounds(),
      types: ['establishment']
    };
    var direccion = new google.maps.places.Autocomplete(
      document.getElementById('direccion'), options);
    direccion.bindTo('bounds', mapa);
    var desde = new google.maps.places.Autocomplete(
      document.getElementById('desde'), options);
    desde.bindTo('bounds', mapa);
    var hasta = new google.maps.places.Autocomplete(
      document.getElementById('hasta'), options);
    hasta.bindTo('bounds', mapa);
    var agregar = new google.maps.places.Autocomplete(
      document.getElementById('agregar'), options);
    agregar.bindTo('bounds', mapa);

  }

  // Inicializo la variable servicioLugares y llamo a la función autocompletar
  function inicializar() {
    servicioLugares = new google.maps.places.PlacesService(mapa)
    autocompletar()
  }

  // Busca lugares con el tipo especificado en el campo de TipoDeLugar

  function buscarCerca(posicion) {
    /* Completar la función buscarCerca  que realice la búsqueda de los lugares
del tipo (tipodeLugar) y con el radio indicados en el HTML cerca del lugar
pasado como parámetro y llame a la función marcarLugares. */
    var tipodeLugar = document.getElementById('tipoDeLugar').value;
    var radio = document.getElementById('radioS').value.split(" ");
    var ra = radio[0];
    var request = {
      location: posicion,
      radius: ra,
      keyword: tipodeLugar
    }
    if (tipodeLugar !== "") {
      servicioLugares.nearbySearch(request, function (places, status) {
        marcadorModulo.marcarLugares(places, status);
      });
    }
  }
  return {
    inicializar,
    buscarCerca
  }
})()
