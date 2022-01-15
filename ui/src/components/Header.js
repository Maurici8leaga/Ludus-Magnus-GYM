import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import { getProfile } from '../actions/profile';
import { compose } from 'redux';
import '../components/scss/index.scss';


const Header = ({ signOut, isSignedIn, getProfile, profile }) => {


  useEffect(() => {
    if (isSignedIn) {
      getProfile();
      console.log('GETPROFILE LLAMANDO EN EL NAVBAR', profile);
    }
  }, [getProfile])

  const avatarImage = () => {
    let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    const { avatar } = profile;

    if (typeof avatar === 'object') {

      avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
      return (
        <img className="" alt="avatar" src={avatarUrl} />
      );
    }
    return (
      <img className="image" alt="avatar" src={avatarUrl} />
    );
  }


  const renderAuth = () => {

    if (isSignedIn && typeof profile === 'object') {
      // let hola = hola();
      console.log('ESTE ES PROFILE CUANDO LOGIN', profile)
      // console.log('ESTE ES USER CUANDO LOGIN', user.user);
      return (
        <div className="image">
          <Link to="/profile" className="links-scss">
            {/* <i className="fas fa-user-circle"></i> */}
            <div className="image-container-navbar">
              <div className="span-image">
                <div className="-sm">
                  <div className="-circle">
                    {avatarImage()}
                  </div>
                </div>
              </div>
            </div>
          </Link>
          <Link to='/signin' onClick={() => signOut()} className="links-scss">
            <i className="fas fa-times"></i>
          </Link>
        </div>
      );
    } else {
      // console.log('ESTE ES PROFILE CUANDO ESTA LOGOUT', profile);
      return (
        <div>
          <ul>
            <li >
              <Link to="/signup" className="links-scss">Registrarme</Link>
            </li>

            <li >
              <Link to="/signin" className="links-scss" >Socios</Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  const renderEjercicios = () => {
    if (isSignedIn) {
      return (
        <div>
          <Link to="/routinesType" className="links-scss">
            <i className="fas fa-dumbbell"></i> Ludus Magnus
          </Link>
        </div>
      );
    } else {
      return (
        <div className="button-icon-disable">
          <i className="fas fa-dumbbell"></i> Ludus Magnus
          {/* el texto debe ir fuera el "icon" de manera que el css que tenga el icon no se mescle con el del texto */}
        </div>
      );
    }
  }

  return (
    <div>
      <nav className="header fondo-claro">
        <div>
          {renderEjercicios()}
        </div>
        <div>
          {renderAuth()}
        </div>
      </nav>
    </div>
  );
};

Header.prototypes = {
  isSignedIn: PropTypes.object,
  signOut: PropTypes.func,
}

const mapStateToProps = state => ({
  isSignedIn: state.auth.isSignedIn,
  profile: state.profile.ProfileUser
});


export default
  compose(
    connect(mapStateToProps, { signOut, getProfile }),
    withRouter
  )(Header);
// Aca withRouter permite en este component poder acceder las propiedades de prop.history.push sin el no se pudiera redireccionar a las direcciones
// compose permite unir en este caso 2 middleware, connect para conectar los actions en los components y withrouter para las redirecciones