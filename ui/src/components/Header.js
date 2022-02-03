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
        <div className="collapse navbar-collapse">
          {/* el class collapse sirve para que cuando la pagina se achique esta pase a meterse dentro de un hamburger menu, en este caso no aplica */}
          <ul className="navbar-nav d-flex align-items-center">
            {/* se usa ul y li para colocar los elementos del nav y el clas navbar-nav es para darle el estilo al contenido */}
            <li className="nav-item mx-2">
              {/* el nav-item es para darle un estilo a cada contenido que tenga la barra */}
              <Link to="/profile" className="link-header-scss">
                <div className="avatar-container">
                  <div className="avatar-mini">
                    {avatarImage()}
                  </div>
                </div>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <p className="h6 my-0">
                {profile.name} {profile.lastname}
              </p>
            </li>
            <li className="nav-item mx-2">
              <Link to='/signin' onClick={() => signOut()} className="link-header-scss">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collapse navbar-collapse">
          {/* el class collapse sirve para que cuando la pagina se achique esta pase a meterse dentro de un hamburger menu, en este caso no aplica */}
          <ul className="navbar-nav d-flex align-items-center">
            {/* se usa ul y li para colocar los elementos del nav y el clas navbar-nav es para darle el estilo al contenido */}
            <li className="nav-item  mx-2">
              {/* el nav-item es para darle un estilo a cada contenido que tenga la barra */}

              <div className="avatar-container">
                <div className="avatar-mini">
                  <img className="avatar-mini" alt="avatar" src={avatarUrl} />
                </div>
              </div>
            </li>
            <li className="nav-item  mx-2">
              {/* mx 2 es para darle un margin horizontalmente */}
              <Link to="/signup" className="link-header-scss">
                Sign Up
              </Link>
            </li>
            <li className="nav-item  mx-2">
              <Link to="/signin" className="link-header-scss" >Sign In</Link>
            </li>
          </ul>
        </div>
      );
    }
  };

  const renderEjercicios = () => {
    if (isSignedIn) {
      return (
        <div className="navbar-brand">
          <Link to="/routinesType" className="link-header-scss">
            <i className="fas fa-dumbbell"></i> Ludus Magnus
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar-brand d-flex align-items-center">
          {/* navbar-brand es un class para los logos o titulos del home de la pag, align-item-center es para centrar todo el contenido de la barra */}
          <div className="link-header-scss">
            {/* <--- hay que crear un clas para un desabled button */}
            <i className="fas fa-dumbbell"></i> Ludus Magnus
            {/* el texto debe ir fuera el "icon" de manera que el css que tenga el icon no se mescle con el del texto */}
          </div>
        </div>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-md fondo-claro fixed-top d-flex justify-content-between color-bottom">
      {/* el class navbar es para las barras, navbar-expand-md es para indicar el tamaño, fixed-top es para que la barra baje en conjunto con la pagina, justify-content-between es para crear espacio entre los elementos y no esten tan pegados*/}
      <div className=" my-2 mx-5">
        {renderEjercicios()}
      </div>
      {/* <button type="button" data-bs-toogle="collapse" data-bs-target="#navbarNav" className="navbar-toggler"
        aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle Navigation">Menu</button> */}
      <div className=" my-2 mx-5">
        {renderAuth()}
      </div>
    </nav>
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