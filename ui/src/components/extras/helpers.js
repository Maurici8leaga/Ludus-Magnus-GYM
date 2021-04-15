// EN ESTE COMPONENT SE COLOCARAN FUNCIONES QUE SE PODRAN USAR EN VARIOS COMPONENTS, HACIENDOLO VER MAS DRY

export function loadToTop() {
  // se crea esta funcion de manera pueda cargar desde el principio cuando va de un component a otro
  window.scrollTo({
    top: 0,
    // se le coloca 0 en este caso para que valla hasta arriba de la pag
    left: 100,
    //  debe ir obligatorio de manera que se especifique la coordenada del lado horizontal de la pantalla
  });
};


