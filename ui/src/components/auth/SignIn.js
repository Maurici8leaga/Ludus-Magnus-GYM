import React, { useState } from 'react';
import {Redirect} from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { signIn } from '../../actions/index';

const SignIn = ({signIn, isSignedIn }) => {

  const [formData, setFormData] = useState({
      email:'',
      password: '',
  });

  const {email, password} = formData;

                                      // el "[e.target.name]" va a permitir cambiar el valor del state del name del input (podria ser email , password etc)
                                                    // el "e.target.value" va a ser el estate actualizado
  const onChange = e => setFormData({...formData, [e.target.name] : e.target.value});
    // con esto estamos indicando que al llamar "onChange" va a cambiar el state del "setFormData"

  const onSubmit = async e => {
    e.preventDefault();
    signIn(formData);
    console.log('SUBMIT --->', formData);
  }

  if(isSignedIn){
    return <Redirect to='/routinesType'/>;
  }

    return (
      <form className="ui inverted form" onSubmit={e => onSubmit(e)}>
                                    {/* cuando el usuario realice el "onSubmit" este ejecutara la llamada de 'e' que es el evento que se encuentra dentro del "onSubmit"*/}

        <h1 className="intro" align="center">MONSTER GYM</h1>

        <div className="ui two column centered grid">
          <div className="ui equal width grid">
            <div className="grey column">

              <div className="content">
                <h3 className="ui inverted dividing header">Sign In</h3>

                <div className="field">
                  <label>Email</label>
                  <div className="ui left icon input">
                    <input type="text" component="input" name="email" placeholder="prueba@gmail.com" value={email} onChange={e=> onChange(e)} required autoComplete="none" />
                    <i className="user icon"></i>
                  </div>
                </div>

                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input type="password" component="input" name="password" placeholder="password" value={password} onChange={e=> onChange(e)} required autoComplete="none" />
                    <i className="lock icon"></i>
                  </div>
                </div>

                {/* <div>{ErrorMessage}</div> */}

                <div>
                  <input className="orange fluid ui button" type="submit" value="Login" />
                </div>

                {/* <div>
                  Don't have an account? <Redirect  className="button" to="/signup">Sign Up</Redirect>
                </div> */}
                {/* buscar la manera de crear esto <----- de otra forma ya que da error si se deja como esta */}

              </div>
            </div>
          </div>
        </div>

      </form>
    );
  }

SignIn.propTypes = {
  signIn: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool
}

const mapStatetoProps = state =>({
    isSignedIn: state.auth.isSignedIn,
    // ErrorMessage: state.auth.ErrorMessage
},console.log('LOGIN ¿? --->', state.auth.isSignedIn))

export default connect(mapStatetoProps, {signIn}) (SignIn);
                                  // se pasa solo "signIn" porque el es la funcion, el isSignedIn es mas condicion de estado

