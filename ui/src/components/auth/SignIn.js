import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../actions/index';
import Alert from '../extras/Alert';

const SignIn = ({ signIn, isSignedIn }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  // el "[e.target.name]" va a permitir cambiar el valor del state del name del input (podria ser email , password etc)
  // el "e.target.value" va a ser el estate actualizado
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });
  // con esto estamos indicando que al llamar "onChange" va a cambiar el state del "setFormData"

  const onSubmit = async e => {
    // onSubmit es solo para FORMS 
    e.preventDefault();
    // este es un metodo para prevenir que el browser ejecute un action por defecto de un elemento seleccionado. ES usado cuando hay un FORMS
    signIn(formData);
  }

  if (isSignedIn) {
        // colocamos esto para que el usuario cuando ya este logeado o isSignedIn sea true, no pueda acceder a este component y si lo hace lo redireccione
    return <Redirect to='/routinesType' />;
  }

  return (

    <div className="pantalla">

      <div className="wrap-page">

        <Alert />

        <div className="container-signin">

          <h1 className="grande texto-secundary"> Iniciar Sesion</h1>

          <form className="form" onSubmit={e => onSubmit(e)}>
            {/* cuando el usuario realice el "onSubmit" este ejecutara la llamada de 'e' que es el evento que se encuentra dentro del "onSubmit"*/}

            <div className="form-input-individual">
              <input type="text" component="input" name="email" placeholder="Email"  title=" Coloque su email" value={email} onChange={e => onChange(e)} required autoComplete="none" />
              {/* este "pattern" nos permite estipular el patron del correo, de manera que solo se admita el que se solicita */}
            </div>

            <div className="form-input-individual">
              <input type="password" component="input" name="password" placeholder="Contraseña" title="Coloque su contraseña" value={password} onChange={e => onChange(e)} required autoComplete="none" />
            </div>

            <button className="boton -primary-long" type="submit" value="Login">COMENZAR ENTRENAMIENTO</button>

            <p className="title-p-small">
              No tienes cuenta, pero quieres ser parte del club? <Link to="/signup" className="links-scss"> Crear usuario</Link>
            </p>

          </form>
        </div>
      </div>
    </div>
  );
}

SignIn.propTypes = {
  // los React.propTypes son validadores que pueden ser usados para estar seguros que la información recibida sea válida y si no va a mandar un advertencias al terminal
  signIn: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool
}

const mapStatetoProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  // ErrorMessage: state.auth.ErrorMessage
});

export default connect(mapStatetoProps, { signIn })(SignIn);
                // se pasa solo "signIn" porque el es la funcion del actions y estamos conectando todos los actions con conect, el isSignedIn es mas condicion de estado

