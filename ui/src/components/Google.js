import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link, withRouter } from 'react-router-dom';
import { signIn, signOut } from '../actions/index';

class Google extends Component {

    componentDidMount() {
        window.gapi.load('client:auth2', () => {
            window.gapi.client.init({
                clientId: '316452957768-i8vi1jg094blfmpji7gnh89uedb6hi6i.apps.googleusercontent.com',
                scope: 'email'
            }).then(() => {
                this.auth = window.gapi.auth2.getAuthInstance();
                this.onAuthChange(this.auth.isSignedIn.get());
                this.auth.isSignedIn.listen(this.onAuthChange);
            });
        });
    }

    onAuthChange = (isSignedIn) => {
        if (isSignedIn) {
            this.props.signIn(this.auth.currentUser.get().getId());
        } else {
            this.props.signOut();
        }
    };

    onSignInClick = () => {
        const { history } = this.props;
        this.auth.signIn().then((parm) => {
            history.push('/routinesType');
        });
    };

    onSignOutClick = () => {
        this.auth.signOut();
    };


    renderAuthButton() {
        if (this.props.isSignedIn === null) {
            return null;
        } else if (this.props.isSignedIn) {
            return (
                <Link to={`/`} onClick={this.onSignOutClick} className="ui red animated button">
                    <div className="visible content">
                        <i className="google icon" />
                    </div>
                    <div className="hidden content">
                        <i>LogOut</i>
                    </div>
                </Link>
            );
        } else {

            return (
                <div className="ui red animated button" onClick={this.onSignInClick}>
                    <div className="visible content">
                        <i className="google icon" />
                    </div>
                    <div className="hidden content">
                        <i>LogIn</i>
                    </div>
                </div>
            )

        }

    }

    render() {
        return (
            <div>
                {this.renderAuthButton()}
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}

export default withRouter(connect(mapStateToProps, { signIn, signOut })(Google));