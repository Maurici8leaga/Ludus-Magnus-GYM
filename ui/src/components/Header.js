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

  const avatarImage = () => {
    
    // Avatar default
    let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';
    const { avatar } = profile;

    // Avatar picture custom 
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

    // Avatar default
    let avatarUrl = 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_1280.png';

    if (isSignedIn && typeof profile === 'object' && profile !== null) {
      return (
        <div className="collapse navbar-collapse justify-content-end" id="navbarNav">

          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item mx-2 d-none d-md-block">
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

          <ul className="navbar-nav d-flex align-items-center">
            <li className="nav-item  mx-2 d-none d-md-block">
              <div className="avatar-container">
                <div className="avatar-mini">
                  <img className="avatar-mini" alt="avatar" src={avatarUrl} />
                </div>
              </div>
            </li>

            <li className="nav-item  mx-2">
              <Link to="/signup" className="link-header-scss nav-link active">
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
            <div className="avatar-container">
              <img src={logo} alt="logo" className="mx-2" />
              Ludus Magnus
            </div>
          </Link>
        </div>
      );
    } else {
      return (
        <div className="navbar-brand">
          <div className="link-header-scss">
            <div className="avatar-container">
              <img src={logo} alt="logo" className="mx-2" />
              Ludus Magnus
            </div>
          </div>
        </div>
      );
    }
  }

  return (
    <nav className="navbar navbar-expand-md navbar-light bg-light fixed-top color-bottom ">
      <div className="container-fluid ">

        <>
          {renderEjercicios()}
        </>

        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>

        <>
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