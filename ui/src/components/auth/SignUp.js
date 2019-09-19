import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import { compose } from 'redux';
import {connect} from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component{

    onSubmit = (formProps) => {
            // "formProps" en el se pasara el email y el password del user creado
        this.props.signUp(formProps, () => {
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
                    <Field type="text" component="input" name="email"  autoComplete="none" placeholder="prueba@gym.com"/>
                    {/* Es importante usar "Field" aca ya que con el redux nos da la facilidad de crear este form sin necesidad de crear un state para este componente, ya que este "Field" se conecta con los actions y reducers de nuestra app */}
                </div>
                <div className="field">
                    <label>Password</label>
                    <Field type="password" component="input" name="password"  autoComplete= "none" placeholder="password"/>
                </div>
                <div>{this.props.ErrorMessage}</div>
                <button className="ui button" type="submit">Sign Up</button>
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
    reduxForm({form: 'signup'})
)(SignUp);

