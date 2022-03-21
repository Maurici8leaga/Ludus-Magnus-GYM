import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signOut } from '../actions';
import { getProfile } from '../actions/profile';
import { compose } from 'redux';
import '../components/scss/index.scss';
import logo from '../components/img/dumbbell-logo.svg';

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
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {/* el class collapse sirve para que cuando la pagina se achique esta pase a meterse dentro de un hamburger menu, el justify-content-end es para colocar el contenido de esta seccion de la barra de lado derecho de la pantalla */}
          <ul className="navbar-nav d-flex align-items-center">
            {/* se usa ul y li para colocar los elementos del nav y el clas navbar-nav es para darle el estilo al contenido */}
            <li className="nav-item mx-2 d-none d-md-block">
              {/* el nav-item es para darle un estilo a cada contenido que tenga la barra, el d-none d-md-block es para ocultar este li o la img cuando el size del screen sea mobile */}
              <Link to="/profile" className="link-header-scss">
                <div className="avatar-container">
                  <div className="avatar-mini">
                    {avatarImage()}
                  </div>
                </div>
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to="/profile" className="h6 my-0 nav-link">
                  {/* nav-link es un class de bootstrap que le da un padding y un margin a los items */}
                {profile.name} {profile.lastname}
              </Link>
            </li>
            <li className="nav-item mx-2">
              <Link to='/signin' onClick={() => signOut()} className="link-header-scss nav-link">
                Log Out
              </Link>
            </li>
          </ul>
        </div>
      );
    } else {
      return (
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">
          {/* el class collapse sirve para que cuando la pagina se achique esta pase a meterse dentro de un hamburger menu, el justify-content-end es para colocar el contenido de esta seccion de la barra de lado derecho de la pantalla*/}
          <ul className="navbar-nav d-flex align-items-center">
            {/* se usa ul y li para colocar los elementos del nav y el clas navbar-nav es para darle el estilo al contenido */}
            <li className="nav-item  mx-2 d-none d-md-block">
              {/* el nav-item es para darle un estilo a cada contenido que tenga la barra, el d-none d-md-block es para ocultar este li o la img cuando el size del screen sea mobile */}
              <div className="avatar-container">
                <div className="avatar-mini">
                  <img className="avatar-mini" alt="avatar" src={avatarUrl} />
                </div>
              </div>
            </li>
            <li className="nav-item  mx-2">
              {/* mx 2 es para darle un margin horizontalmente */}
              <Link to="/signup" className="link-header-scss nav-link active">
                 {/* nav-link es un class de bootstrap que le da un padding y un margin a los items, el active le da un color a la letra mas oscuro sin el se veria muy claro la letra */}
                Sign Up
              </Link>
            </li>
            <li className="nav-item  mx-2">
              <Link to="/signin" className="link-header-scss nav-link active">Sign In</Link>
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
            {/* <i className="fas fa-dumbbell"></i> Ludus Magnus */}
            <div className="avatar-container">
              <img src={logo} alt="logo" className="mx-2" />
              Ludus Magnus
              {/* el texto debe ir fuera el "icon" de manera que el css que tenga el icon no se mescle con el del texto */}
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar-brand">
          {/* navbar-brand es un class para los logos o titulos del home de la pag, align-item-center es para centrar todo el contenido de la barra */}
          <div className="link-header-scss">
            <div className="avatar-container">
              <img src={logo} alt="logo" className="mx-2" />
              Ludus Magnus
              {/* el texto debe ir fuera el "icon" de manera que el css que tenga el icon no se mescle con el del texto */}
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top color-bottom ">
      {/* el class navbar es para las barras, navbar-expand-md es para indicar el tamaño, fixed-top es para que la barra baje en conjunto con la pagina, navbar-light bg-light es un class que le da el color del background a la barra entre otros*/}
      <div className="container-fluid ">

        <>
          {renderEjercicios()}
        </>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          {/* el class navbar-toggler es para los botones que van a desplegar un elemento, collapse hace la accion de que se abra y cierre, data-bs-target es el id este debe coincidir con el que tiene el elemento a collapsar,aria-expanded debe estar en false para que solo se abra el elemento cuando se solicita,aria-controls debe llevar el mismo nombre que se le coloque al id o targert   */}
          <span className="navbar-toggler-icon"></span>
          {/* este es un class para el hamburguer buttom */}
        </button>

        <>
        {/* no se le coloca div aca ya que interrumpe el class interno que tiene el elemento renderAuth y no funcionaria como se espera */}
          {renderAuth()}
        </>

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