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
    setFormData({ ...formData, birth: formated });
    // de esta forma actualizamos el state de birth con la fecha formateada, ya que el resto del los object del state se actualizan de otra forma
  }

  const { name, lastname, sex, weight, height, email, password } = formData;

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

        <Alert />

        <div className="container ">
          <div className="text-center white-letter extra-mt-30vh">

            <h1 className="h1 fw-bold mb-3"> Create an account</h1>

            <form className="form-signUp" onSubmit={e => onSubmit(e)}>
              <div className="row g-3">

                <div className="col-sm-6 my-0">
                  <label for="name" className="form-label">Name</label>
                  {/* form-label es el class para los label dentro de los forms */}
                  <input type="text" id="name" className="form-control" name="name" maxLength="12" autoComplete="none" placeholder="Name" title="Coloque su primer nombre" value={name} onChange={e => onChange(e)} required />
                </div>

                <div className="col-sm-6 my-0">
                  <label for="lastname" className="form-label">Lastname</label>
                  <input type="text" id="lastname" className="form-control" name="lastname" maxLength="12" autoComplete="none" placeholder="Lastname" title="Coloque su primer apellido" value={lastname} onChange={e => onChange(e)} required />
                </div>


                <div className="col-sm-6 col-md-3 my-0">
                  {/* aqui se le pone 2 tipos de col, es para cuando el breakpoint width cambie estos elementos tengan un tamaño y orden segun el tamaño de la pantalla */}
                  <label for="sex" className="form-label">Gender</label>
                  <select className="form-control" id="sex" name="sex" title="Escoja un genero" value={sex} onChange={e => onChange(e)} required>
                    <option value="" >Select a gender</option>
                    <option value="Hombre">Man</option>
                    <option value="Mujer">Women</option>
                  </select>
                </div>

                <div className="col-sm-6 col-md-3 my-0">
                  <label className="form-label">Date of birth</label>
                  <DatePicker className="form-control" dateFormat='yyyy/MM/dd' selected={calendarDates} placeholderText="YYYY/MM/DD" onChange={formatedDate} required />
                  {/* dateFormat es un prop para indicar el formato que queremos de la fecha, selected es un prop que sera la fecha seleccionada por el user */}
                </div>

                <div className="col-sm-6 col-md-3 my-0">
                  <label for="weight" className="form-label">Weight</label>
                  <input id="weight" className="form-control" type="number" min="0" max="250" step="0.1" name="weight" autoComplete="none" placeholder="Kg" title="Coloque su peso" value={weight} onChange={e => onChange(e)} required />
                </div>

                <div className="col-sm-6 col-md-3 my-0">
                  <label for="height" className="form-label">Height</label>
                  <input id="height" className="form-control" type="number" min="0" max="3" step="0.01" name="height" autoComplete="none" placeholder="Meters" title="Coloque su altura" value={height} onChange={e => onChange(e)} required />
                </div>


                <div className="col-12 mt-1">
                  <label for="email" className="form-label">Email</label>
                  <input id="email" className="form-control" type="email" name="email" autoComplete="none" placeholder="Email" title=" Coloque un email " value={email} onChange={e => onChange(e)} required />
                </div>

                <div className="col-12 mt-1">
                  <label for="password" className="form-label">Password</label>
                  <input id="password" className="form-control" type="password" name="password" maxLength="15" autoComplete="none" placeholder="Password" title="Coloque una contraseña" value={password} onChange={e => onChange(e)} required />
                </div>

                <div className="d-grid my-3">
                  <button className="btn boton -primary btn-lg" type="submit" value="Register">Register me</button>
                </div>
              </div>
            </form>

            <p className="h6">
              ¿ Are you already part of our team? <Link to="/signin" className="links-scss"> Let get start training</Link>
            </p>

          </div>
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