import React, { useEffect } from 'react';
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
    }
  }, [getProfile, isSignedIn])
    // coloco isSignedIn dentro porque si no sale un warning indicando que isSignedIn tiene un missing dependency

  const avatarImage = () => {
    let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    const { avatar } = profile;

    if (typeof avatar === 'object') {

      avatarUrl = `http://localhost:3001/api/avatar${avatar.url}`
      return (
        <img className="avatar-mini" alt="avatar" src={avatarUrl} />
      );
    }
    return (
      <img className="avatar-mini" alt="avatar" src={avatarUrl} />
    );
  }


  const renderAuth = () => {

    let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    if (isSignedIn && typeof profile === 'object' && profile !== null) {
      // se coloca este conditional para que no de error al entrar en caso de que profile sea o null y el user no este isSignedIn
      return (
        <div className="headerContent">
          <div>
            {profile.name} {profile.lastname}
          </div>
          <Link to="/profile" className="links-scss">
            <div className="avatar-container">
              <div className="avatar-mini">
                {avatarImage()}
              </div>
            </div>
          </Link>
          <Link to='/signin' onClick={() => signOut()} className="links-scss">
            Log Out
          </Link>
        </div>
      );
    } else {
      return (
        <div className="headerContent">
          <div className="headerContent -before-login">

            <div className="avatar-container">
              <div className="avatar-mini">
                <img className="avatar-mini" alt="avatar" src={avatarUrl} />
              </div>
            </div>

            <Link to="/signup" className="links-scss">
              Registrarme
            </Link>

            <Link to="/signin" className="links-scss" >Socios</Link>
          </div>
        </div>
      );
    }
  };

  const renderEjercicios = () => {
    if (isSignedIn) {
      return (
        <div className="headerContent">
          <Link to="/routinesType" className="links-scss">
            <i className="fas fa-dumbbell"></i> Ludus Magnus
          </Link>
        </div>
      );
    } else {
      return (
        <div>
          <div className="links-scss">
            {/* <--- hay que crear un clas para un desabled button */}
            <i className="fas fa-dumbbell"></i> Ludus Magnus
            {/* el texto debe ir fuera el "icon" de manera que el css que tenga el icon no se mescle con el del texto */}
          </div>
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