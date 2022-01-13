// ESTE ES UN MANUAL GENERICO DE COMO DEBE IR EL MODAL CON PORTAL, SOLO SE DEJARA COMO REFERENCIA LOS NOMBRE DE LOS PROPS Y LAS FUNCIONES

// 1ER PASO antes que cualquier otra cosa es, ir al file index.html en la carpeta punblic y colocar encima de "  <div id="root"></div>"  el siguiente "  <div id="modal"></div>" <- el nombre "modal" puede ser cual quier nombre que quiera pero si se coloca asi ahi debe ser colocado tambien en el modal component
import { useState } from "react";
import Modal from './Modal';
// se importa el component mondal o como le llamemos

const App = ()=>  {
  
  const [modal, setModal] = useState(false);
//   creamos un state para poder abrir y cerrar el modal desde dentro del appjs y dentro del modal
  const Toggle = () => setModal(!modal);
//   creamos esta funcion para poder abrir y cerrar el modal en este component y tambien dentro del modal component
  
  return (
    <div className="App">
        <Modal show={modal} title={'My title'} close={Toggle}>
            {/* show es el nombre del prop que se va a pasar a modal, y modal es el state */}
                {/* title se pasa como prop para el titulo del modal, y "My title" es el contenido que le quieras poner*/}
                    {/* close es una funcion que la vamos a pasar como prop, para que en dentro de modal podamos usarla para cerrar el modal */}
            This is Modal content
        </Modal>
    </div>
  );
}

export default App;