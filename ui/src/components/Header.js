import React, {Component} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import { signIn, signError} from '../actions';
import './Header.scss';


class Header extends Component {

    renderAuth(){
        if(this.props.isSignedIn){
            return(
                <div>
                    <Link to="/signout" className="button-icon">
                        <i className="window close outline icon"/>
                    </Link>
                </div>
            )
        }else {
            return(
                <div>
                    <div className="button-Sign-Up-In">
                        <Link to="/signup">Sign Up</Link>
                    </div>

                    <div className="button-Sign-Up-In">
                        <Link to="/signin">Sign In</Link>
                    </div>
                </div>
            )
        }
    }
    
    renderEjercicios(){
        if(this.props.isSignedIn){
            return(
                <Link to="/routinesType" className="button-icon">
                    <i className="trophy icon"></i>
                </Link>
            );
        } else {
            return(
                <div className="button-icon-disable">
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


export default connect(mapStateToProps, {signIn, signError}) (Header);