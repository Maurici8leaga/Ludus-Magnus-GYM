import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { compose } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component{

    onSubmit = (formProps) => {
            // "formProps" en el se pasara el email y el password del user creado
        this.props.signup(formProps, () => {
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
                    <input type="text" name="email" readonly="" placeholder="prueba@gmail.com"/>>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="password" name="password" readonly="" autoComplete= "none"/>>
                </div>
                <button className="ui button" type="submit">Sign Up</button>
            </form>
        );
    }
}



export default compose(
        // "compose" nos ayuda a poder conectar varios HOC de una manera mas DRY
    connect(actions),
    reduxForm({form: 'signup'})
)(SignUp);

