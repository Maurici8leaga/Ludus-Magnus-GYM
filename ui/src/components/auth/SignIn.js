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
  const onChange = e => setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = async e => {
    e.preventDefault();
    signIn(formData);
  }

  // redirect once the user has logged
  if (isSignedIn) {
    return <Redirect to='/routinesType' />;
  }

  return (
    <div className="screen">
      <div className="wrap-page">

        <Alert />

        <div className="container">
          <div className="text-center white-letter extra-mt-30vh">

            <h1 className="h1 fw-bold mb-3">Log In</h1>

            <form className="form-signIn" onSubmit={e => onSubmit(e)}>

              <label  className="sr-only">Email</label>
              <input className="form-control my-3" type="text" id="emailAddress" name="email" placeholder="Email" title=" Type your email" value={email} onChange={e => onChange(e)} required autoComplete="none" />

              <label  className="sr-only">Password</label>
              <input className="form-control my-3" type="password" id="password" name="password" placeholder="Password" title="Type your password" value={password} onChange={e => onChange(e)} required autoComplete="none" />

              <div className="d-grid gap-2 my-3">
                <button className="btn button -primary btn-lg" type="submit" value="Login"> Let get start training</button>
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
  signIn: PropTypes.func.isRequired,
  isSignedIn: PropTypes.bool
}

const mapStatetoProps = state => ({
  isSignedIn: state.auth.isSignedIn,
});

export default connect(mapStatetoProps, { signIn })(SignIn);