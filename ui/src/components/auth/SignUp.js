import React, { useState } from 'react';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import {signUp} from '../../actions/index';

const SignUp = ({signUp, isSignedIn}) => {

  const [formData, SetFormData] = useState({
    name: '',
    lastname: '',
    age: '',
    sex: '',
    weight: '',
    height: '',
    email: '',
    password: ''
  });

  const {name, lastname, age, sex, weight, height, email, password} = formData;

  const onChange = e => SetFormData({...formData, [e.target.name] : e.target.value});

  const onSubmit = async e => {    
    e.preventDefault();
    signUp(formData);
    // aqui se coloca "formData" ya que el contiene los state de los datos del usuario, si no se coloca dara un error 422
    console.log('SUBMIT --->', formData);  
  }

  if(isSignedIn){ 
    console.log('LOGIN ¿OJO? --->', isSignedIn);

    return <Redirect to='/routinesType' />; 
  }

    return (

      <form className="ui inverted form" onSubmit={e => onSubmit(e)}>

        <h1 className="intro">MONSTER GYM</h1>

        <div className="ui two column centered grid">
          <div className="ui equal width grid">
            <div className=" grey column">

              <div className="content">
                <h3 className="ui inverted dividing header">Sign Up</h3>

                <div className="field">
                  <label>Nombre</label>
                  <div className="two fields">
                    <div className="field">
                      <input type="text" name="name" maxLength="12" autoComplete="none" placeholder="Nombre" value={name} onChange={e=> onChange(e)} required/>
                    </div>

                    <div className="field">
                      <input type="text" name="lastname" maxLength="12" autoComplete="none" placeholder="Apellido" value={lastname} onChange={e=> onChange(e)} required/>
                    </div>
                  </div>
                </div>
                
                <div className="fields">
                  <div className="four wide field">
                    <label>Años</label>
                                  {/* el "min = 0" hace que solo sean numeros positivos en el input, y "step" es para que el numero aumente 1 a 1*/}
                    <input type="number" min="0" max="99" step="1"  name="age" autoComplete="none" placeholder="Edad" value={age} onChange={e=> onChange(e)} required/>
                  </div>

                  <div className="four wide field">
                    <label>Sexo</label>
                    <select className="ui dropdown" name="sex" value={sex} onChange={e => onChange(e)} required>
                      <option value="" >Selecciona un Genero</option>
                      <option value="Hombre">Hombre</option>
                      <option value="Mujer">Mujer</option>
                    </select>
                  </div>

                  <div className="four wide field">
                    <label>Peso</label>
                    <input type="number" min="0" max="250" step="0.1" name="weight" autoComplete="none" placeholder="Kg" value={weight} onChange={e=> onChange(e)} required/>
                  </div>


                  <div className="four wide field">
                    <label>Altura</label>
                    <input type="number" min="0" max="3" step="0.1" name="height" autoComplete="none" placeholder="metros" value={height} onChange={e=> onChange(e)} required/>
                  </div>
                
                </div>

                <div className="field">
                  <label>Email</label>
                  <div className="ui left icon input">
                      {/* Es importante usar "Field" aca ya que con el redux nos da la facilidad de crear este form sin necesidad de crear un state para este componente, ya que este "Field" se conecta con los actions y reducers de nuestra app */}
                    <input type="text" name="email" autoComplete="none" placeholder="prueba@gym.com" pattern=".+@gym.com" title=" Coloque su email seguido del @gym.com " value={email} onChange={e=> onChange(e)} required/>
                                                                              {/* este "pattern" nos permite estipular el patron del correo, de manera que solo se admita el que se solicita */}
                    <i className="user icon"></i>
                  </div>
                </div>

                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <input type="password" name="password" maxLength="15" autoComplete="none" placeholder="password" value={password} onChange={e=> onChange(e)} required/>
                    <i className="lock icon"></i>
                  </div>
                </div>

                {/* <div>{ErrorMessage}</div> */}
                <button className="orange fluid ui button" type="submit" value="Register">Sign Up</button>

              

              </div>

            </div>
          </div>
        </div>
      </form>
    );
  }

  SignUp.propTypes = {
    signUp: PropTypes.func.isRequired,
    isSignedIn: PropTypes.bool
  }
  

const mapStatetoProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  // ErrorMessage: state.auth.ErrorMessage
});

export default connect(mapStatetoProps, {signUp}) (SignUp);