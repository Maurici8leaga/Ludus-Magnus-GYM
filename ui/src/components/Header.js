import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import Google from './Google';
import { signIn, signError } from '../actions';


class Header extends Component {

    renderAuth(){
        // AQUI IRA EL RENDER DEL SIGNIN SIGNOUT Y SIGNUP QUE SE REMPLAZARA POR EL GOOGLE
    }
    
    renderEjercicios(){
        if(this.props.isSignedIn){
            return(
                <Link to="/routinesType" className="item">
                    <i className="trophy icon"></i>
                </Link>
            );
        } else {
            return(
                <div className="ui disabled button">
                    <i className="trophy icon"></i>                      
                </div>
            );
        }
    }

    render (){
        return (
            <div className="ui menu">
                <div>{this.renderEjercicios()}</div>
               <div className="right menu" align="center">
                    <Google/>
               </div>
            </div>
        );    
    }
}

const mapStateToProps = (state) => {
    return { isSignedIn: state.auth.isSignedIn };
}


export default connect(mapStateToProps, {signIn , signError}) (Header);