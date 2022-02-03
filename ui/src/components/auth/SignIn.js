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

        <div className="container">
          <div className="text-center white-letter extra-mt-x10">
            {/* usamos text-center que sirve para que todo el contenido vaya centrado, my es para los margin verticales */}

            <h1 className="h1 fw-bold mb-3">Log In</h1>

            <form className="form-signIn" onSubmit={e => onSubmit(e)}>
              {/* cuando el usuario realice el "onSubmit" este ejecutara la llamada de 'e' que es el evento que se encuentra dentro del "onSubmit"*/}

              <label for="emailAddress" className="sr-only">Email</label>
              {/* el sr-only es para hacer invisible en este caso el contenido del label, se usa para ocultar en este caso tag que no se quiere que se vean, pero deben ir por normas */}
              <input className="form-control my-3" type="text" id="emailAddress" name="email" placeholder="Email" title=" Coloque su email" value={email} onChange={e => onChange(e)} required autoComplete="none" />
              {/* el form-control es el class que deben llevar los inputs y los text-areas, ademas se debe colocar como requisito los id a los input */}

              <label for="password" className="sr-only">Password</label>
              {/* en los label's deben ir los for y estos deben llevar el mismo nombre que se le coloque a los id de los inputs o viceversa */}
              <input className="form-control my-3" type="password" id="password" name="password" placeholder="Contraseña" title="Coloque su contraseña" value={password} onChange={e => onChange(e)} required autoComplete="none" />

              <div className="d-grid gap-2 my-3">
                {/* este d-grip y gap-2 hacen que este button tenga el estilo de un boton block, osea ocupe todo el espacio que tenga posible*/}
                <button className="btn boton -primary btn-lg" type="submit" value="Login"> Let get start training</button>
              </div>
            </form>

            <p className="h6">
              ¿ You don't have account but you want to join us? <Link to="/signup" className="links-scss"> Sign Up</Link>
            </p>

          </div>
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

