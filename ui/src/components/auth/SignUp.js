import React, { useState } from 'react';
import { Redirect, Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import DatePicker from '../../../../api/node_modules/react-datepicker';
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

  // state for calendar
  const [calendarDates, setcalendarDates] = useState(null);

  const formatedDate = (date) => {
    // date its default name of Datepicker
    setcalendarDates(date)

    // changing the date format
    const formated = moment(date).format('YYYY-MM-DD');

    // updating the state of the date
    setFormData({ ...formData, birth: formated });
  }

  const { name, lastname, sex, weight, height, email, password } = formData;
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    signUp(formData);
  }

  // redirect once the user has logged
  if (isSignedIn) {
    return <Redirect to='/routinesType' />;
  }

  return (
    <div className="screen">
      <div className="wrap-page overflow-scroll">

        <Alert />

        <div className="container ">
          <div className="text-center white-letter extra-mt-30vh">

            <h1 className="h1 fw-bold mb-3"> Create an account</h1>

            <form className="form-signUp" onSubmit={e => onSubmit(e)}>
              <div className="row g-3">

                <div className="col-sm-6 my-0">
                  <label className="form-label">Name</label>
                  <input type="text" id="name" className="form-control" name="name" maxLength="12" autoComplete="none" placeholder="Name" title="Type your first name" value={name} onChange={e => onChange(e)} required />
                </div>

                <div className="col-sm-6 my-0">
                  <label className="form-label">Lastname</label>
                  <input type="text" id="lastname" className="form-control" name="lastname" maxLength="12" autoComplete="none" placeholder="Lastname" title="Type your lastname" value={lastname} onChange={e => onChange(e)} required />
                </div>


                <div className="col-sm-6 col-md-3 my-0">
                  <label className="form-label">Gender</label>
                  <select className="form-control" id="sex" name="sex" title="Choose a gender" value={sex} onChange={e => onChange(e)} required>
                    <option value="" >Select a gender</option>
                    <option value="Man">Man</option>
                    <option value="Women">Women</option>
                  </select>
                </div>

                <div className="col-sm-6 col-md-3 my-0">
                  <label className="form-label">Date of birth</label>
                  <DatePicker className="form-control" dateFormat='yyyy/MM/dd' selected={calendarDates} placeholderText="YYYY/MM/DD" onChange={formatedDate} required />
                </div>

                <div className="col-sm-6 col-md-3 my-0">
                  <label className="form-label">Weight</label>
                  <input id="weight" className="form-control" type="number" min="0" max="250" step="0.1" name="weight" autoComplete="none" placeholder="Kg" title="Type your weight" value={weight} onChange={e => onChange(e)} required />
                </div>

                <div className="col-sm-6 col-md-3 my-0">
                  <label className="form-label">Height</label>
                  <input id="height" className="form-control" type="number" min="0" max="3" step="0.01" name="height" autoComplete="none" placeholder="Meters" title="Type your height" value={height} onChange={e => onChange(e)} required />
                </div>


                <div className="col-12 mt-1">
                  <label className="form-label">Email</label>
                  <input id="email" className="form-control" type="email" name="email" autoComplete="none" placeholder="Email" title=" Type your email " value={email} onChange={e => onChange(e)} required />
                </div>

                <div className="col-12 mt-1">
                  <label className="form-label">Password</label>
                  <input id="password" className="form-control" type="password" name="password" maxLength="15" autoComplete="none" placeholder="Password" title="Type your password" value={password} onChange={e => onChange(e)} required />
                </div>

                <div className="d-grid my-3">
                  <button className="btn button -primary btn-lg" type="submit" value="Register">Register me</button>
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