// EN ESTE COMPONENT SE COLOCARAN FUNCIONES QUE SE PODRAN USAR EN VARIOS COMPONENTS, HACIENDOLO VER MAS DRY
import React, { useEffect } from 'react';
import { useLocation } from "react-router-dom";


const  LoadToTop = (props) => {
  // loadtotop sera un wrapper component que se colocara en el app.js del ui para que cada component o seccion de la pag cargue desde arriba hacia abajo siempre

  const location = useLocation();
  // este useLocation hook devuelve un objecto que va a representar el URL actual, cada vez que sea ejecutado va cambiar el obj por un nuevo siendo el nuevo URL
  // de este modo ayuda a  que en este caso se ejecute cuando cambiemos de seccion de la pag

  useEffect(() => {
    window.scrollTo(0, 0);
    // gracias al window.scrollTo con esas cordenadas cuando se ejecute esta funcion va a cargar el nuevo URL desde arriba hacia abajo siempre
  }, [location]);


  return <> {props.children} </>
    // colocamos props.children para devuelva la pag, ya que este se usara como wrapper component
};

export default LoadToTop;


