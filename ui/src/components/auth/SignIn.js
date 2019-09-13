import React, {Component} from 'react';
import {reduxForm} from 'redux-form';
import { compose } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SignIn extends Component{

    onSubmit = (formProps) => {
            // "formProps" en el se pasara el email y el password del user creado
        this.props.signIn(formProps, () => {
            this.props.history.push('/routinesType');
            // una vez que sea creado success sera renderizado al route "/routinesType"
        });
    }

    render(){

        const {handleSubmit} = this.props;
        return(
            <form className="form" onSubmit={handleSubmit(this.onSubmit)}>
                <div className="field">
                    <label>Email</label>
                    <input type="text" name="email" readOnly="" placeholder="prueba@gmail.com"/>>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" readOnly="" autoComplete= "none"/>>
                </div>
                <div>{this.props.ErrorMessage}</div>
                <button className="ui button" type="submit">Sign In</button>
            </form>
        );
    }
}

function mapStatetoProps (state){
    return{ ErrorMessage: state.auth.ErrorMessage };
}

export default compose(
        // "compose" nos ayuda a poder conectar varios HOC de una manera mas DRY
    connect(mapStatetoProps, actions),
    reduxForm({form: 'signin'})
)(SignIn);

