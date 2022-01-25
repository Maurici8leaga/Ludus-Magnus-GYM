import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from '../../../../api/node_modules/react-datepicker';
// <-- esto es un package para poder colocar un calendario de escoger fechas
import moment from 'moment';
import { signUp } from '../../actions/index';
import Alert from '../extras/Alert';


const SignUp = ({ signUp, isSignedIn }) => {

  const [formData, setFormData] = useState({
    name: '',
    lastname: '',
    birth: '',
    sex: '',
    weight: '',
    height: '',
    email: '',
    password: ''
  });

  const [calendarDates, setcalendarDates] = useState(null);
  // creamos este otro state solo para el calendar

  const formatedDate = (date) => {
        // date es llamado asi por defecto del DatePicker, este es la fecha que el user selecciona se pasa aca para que luego podamos usarla para formatearla
    setcalendarDates(date)
    const formated = moment(date).format('YYYY-MM-DD');
    // moment aca nos ayuda a formatear la fecha que viene de un formato distinto al ISO y lo convierte en formato que se le indique en este caso a 'YYYY/MM/DD'
    setFormData({...formData, birth: formated});
    // de esta forma actualizamos el state de birth con la fecha formateada, ya que el resto del los object del state se actualizan de otra forma
  }

  const { name, lastname,  sex, weight, height, email, password } = formData;

  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    signUp(formData);
    // aqui se coloca "formData" ya que el contiene los state de los datos del usuario, si no se coloca dara un error 422
  }

  if (isSignedIn) {
     // colocamos esto para que el usuario cuando ya este logeado o isSignedIn sea true, no pueda acceder a este component y si lo hace lo redireccione
    return <Redirect to='/routinesType' />;
  }

  return (

    <div className="pantalla">

      <div className="wrap-page">

        <Alert/>

        <div className="container-signup">

          <h1 className="grande texto-secundary"> Crear usuario</h1>

          <form className="form" onSubmit={e => onSubmit(e)}>

            <div className="form-group-2">
              <div className="form-input-doble">
                <input type="text" name="name" maxLength="12" autoComplete="none" placeholder="Nombre" title="Coloque su primer nombre" value={name} onChange={e => onChange(e)} required />
              </div>

              <div className="form-input-doble">
                <input type="text" name="lastname" maxLength="12" autoComplete="none" placeholder="Apellido" title="Coloque su primer apellido" value={lastname} onChange={e => onChange(e)} required />
              </div>
            </div>

            <div className="form-group-4">

              <div className="form-input-genero">
                <select className="ui dropdown" name="sex" title="Escoja un genero" value={sex} onChange={e => onChange(e)} required>
                  <option value="" >Selecciona un Genero</option>
                  <option value="Hombre">Hombre</option>
                  <option value="Mujer">Mujer</option>
                </select>
              </div>

              <div className="form-input-data">
                <label>Fecha de nacimiento</label>
                {/* el "min = 0" hace que solo sean numeros positivos en el input, y "step" es para que el numero aumente 1 a 1*/}
                <DatePicker dateFormat='yyyy/MM/dd' selected={calendarDates} placeholderText="YYYY/MM/DD"   onChange={formatedDate} required/>
                {/* dateFormat es un prop para indicar el formato que queremos de la fecha, selected es un prop que sera la fecha seleccionada por el user */}
              </div>

              <div className="form-input-data">
                <label>Peso</label>
                <input type="number" min="0" max="250" step="0.1" name="weight" autoComplete="none" placeholder="Kg" title="Coloque su peso" value={weight} onChange={e => onChange(e)} required />
              </div>

              <div className="form-input-data">
                <label>Altura</label>
                <input type="number" min="0" max="3" step="0.01" name="height" autoComplete="none" placeholder="Metros" title="Coloque su altura" value={height} onChange={e => onChange(e)} required />
              </div>

            </div>

            <div className="form-input-individual">
              {/* <i className="user icon"></i> */}
              {/* Es importante usar "Field" aca ya que con el redux nos da la facilidad de crear este form sin necesidad de crear un state para este componente, ya que este "Field" se conecta con los actions y reducers de nuestra app */}
              <input type="email" name="email" autoComplete="none" placeholder="Email" title=" Coloque un email " value={email} onChange={e => onChange(e)} required />
              {/* este "pattern" nos permite estipular el patron del correo, de manera que solo se admita el que se solicita */}
            </div>

            <div className="form-input-individual">
              {/* <i className="lock icon"></i> */}
              <input type="password" name="password" maxLength="15" autoComplete="none" placeholder="Contraseña" title="Coloque una contraseña" value={password} onChange={e => onChange(e)} required />
            </div>

            <button className="boton -primary-long" type="submit" value="Register">REGISTRARME Y COMENZAR</button>

          </form>

          <p className="title-p-small">
            Ya eres socio de nuestro club ? <Link to="/signin" className="links-scss"> Comenzar Entrenamiento</Link>
          </p>

        </div>
      </div>
    </div>

  );
}

SignUp.propTypes = {
  signUp: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool
}


const mapStatetoProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStatetoProps, { signUp })(SignUp);