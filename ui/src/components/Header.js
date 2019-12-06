import React, { Component } from 'react';
import { Link, withRouter } from 'react-router-dom';
import { connect } from 'react-redux';
import { signIn, signError, signOut } from '../actions';
import { compose } from 'redux';
import './Header.scss';


class Header extends Component {


  renderAuth() {

    const { signOut, isSignedIn, history } = this.props;

    if (isSignedIn) {
      return (
        <div>
          <a href="javascript:void(0)" onClick={() => signOut(history, '/api/signin')} className="button-icon">
            <i className="window close outline icon" />
          </a>
        </div>
      )
    } else {
      return (
        <div>
          <div className="button-Sign-Up-In">
            <Link to="/api/signup">Sign Up</Link>
          </div>

          <div className="button-Sign-Up-In">
            <Link to="/api/signin">Sign In</Link>
          </div>
        </div>
      )
    }
  }

  renderEjercicios() {
    if (this.props.isSignedIn) {
      return (
        <Link to="/api/routinesType" className="button-icon">
          <i className="trophy icon"></i>
        </Link>
      );
    } else {
      return (
        <div className="button-icon-disable">
          <i className="trophy icon"></i>
        </div>
      );
    }
  }

  render() {
    return (
      <div className="ui menu">
        <div>{this.renderEjercicios()}</div>
        <div className="right menu" align="center">
          <div>
            {this.renderAuth()}
          </div>
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return { isSignedIn: state.auth.isSignedIn };
}


export default
  compose(
    connect(mapStateToProps, { signIn, signError, signOut }),
    withRouter
  )(Header);