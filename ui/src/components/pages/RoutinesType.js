import React, { useState } from 'react';
import { connect } from 'react-redux';
import './scss/RoutinesType.scss';

const RoutinesType = ({ history }) => {
                    // se debe colocar "history" aqui como props para poder tener acceso a el y hacer el redireccionamiento 

    const [muscle, setMuscle] = useState('');

    const lista = ['bicep', 'tricep','hombro', 'pecho', 'espalda', 'abdominal'];
    // esta sera la lista de los posibles ejercicios que el usuario puede acceder
    
    const buttonMuscle = (muscle) => {
        setMuscle({...muscle});
        // al ejecutar la funcion de "click" este permitira que cuando se seleccione, este "setMuscle" tome y almacene en el state "muscle"
        history.push(`/exercises/${muscle}`);
    }

    const muscleList = () => (
        // el JSX siempre debe ir en parentesis!
        <ul>
            <h1 className="ui title">Tipo de rutina </h1>

            {/* hacemos una lista dinamica */}
            {lista.map((lista, index) => (
                                // "index" en este caso es llamado de manera que pueda usarse como key, de manera que cada elemento del li sea unico
                <div className="ui container"  onClick={() => buttonMuscle(lista)} value={muscle}  key={`${index} ${lista}`}>
                                                                    {/* colocamos el "value" que va hacer el state o muscle seleccionado */}
                    <div className="button-container">
                        <div className="button-div">
                            {lista}
                        </div>
                    </div>
                </div>
            ))}
        </ul>
    );

    return muscleList();
    // solo llamamos la funcion "muscleList" ya que todo esta dentro de ella.. no se puede colocar la funcion dentro de return de esa forma, habria que hacerlo de otra manera

};

export default connect(null)(RoutinesType);