import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { compose } from 'redux';
import { connect } from 'react-redux';
import * as actions from '../../actions';

class SignUp extends Component {

  state = { gender: '' }


  handleChangeGender = (e) => {
    this.setState({ gender: e.target.value });
  }

  onSubmit = (formProps) => {
    
    // --> Otra forma de pasar el value de "sex" sin usar ReduxForm --->>>
    // formProps.sex = this.state.gender;
    // El "gender" al ser un state aparte de los otros components que estan siendo manejados por ReduxForm, este se le debe
    // crear una propiedad al "formProps" para que se pueda enviar al data-base


    // "formProps" en el se pasara el email y el password del user creado
    this.props.signUp(formProps, () => {
      this.props.history.push('/routinesType');
      // una vez que sea creado success sera renderizado al route "/routinesType"
    });
  }

  render() {

    const { handleSubmit } = this.props;
    return (

      <form className="ui inverted form" onSubmit={handleSubmit(this.onSubmit)}>

        <h1 className="intro">MONSTER GYM</h1>

        <div className="ui two column centered grid">
          <div className="ui equal width grid">
            <div className=" grey column">

              <div className="content">
                <h3 className="ui inverted dividing header">Sign Up</h3>

                <div className="field">
                  <label>Nombre</label>
                  <div className="two fields">
                    <div className="field">
                      <Field type="text" component="input" name="name" autoComplete="none" placeholder="Nombre" />
                    </div>

                    <div className="field">
                      <Field type="text" component="input" name="lastname" autoComplete="none" placeholder="Apellido" />
                    </div>
                  </div>
                </div>
                
                <div className="fields">
                  <div className="four wide field">
                    <label>Años</label>
                                  {/* el "min = 0" hace que solo sean numeros positivos en el input, y "step" es para que el numero aumente 1 a 1*/}
                    <Field type="number" min="0" step="1" component="input" name="age" autoComplete="none" placeholder="Edad" />
                  </div>

                  <div className="four wide field">
                    <label>Sexo</label>
                    <Field className="ui dropdown" component="select" name="sex" value={this.state.gender} onChange={this.handleChangeGender} placeholder="sexo">
                      <option value="" disabled>Selecciona</option>
                      <option value="H">Hombre</option>
                      <option value="M">Mujer</option>
                    </Field>
                  </div>

                  <div className="four wide field">
                    <label>Peso</label>
                    <Field type="number" min="0" step="0.1" component="input" name="weight" autoComplete="none" placeholder="Kg" />
                  </div>


                  <div className="four wide field">
                    <label>Altura</label>
                    <Field type="number" min="0" step="0.1" component="input" name="height" autoComplete="none" placeholder="metros" />
                  </div>
                
                </div>

                <div className="field">
                  <label>Email</label>
                  <div className="ui left icon input">
                    <Field type="text" component="input" name="email" autoComplete="none" placeholder="prueba@gym.com" />
                      {/* Es importante usar "Field" aca ya que con el redux nos da la facilidad de crear este form sin necesidad de crear un state para este componente, ya que este "Field" se conecta con los actions y reducers de nuestra app */}
                    <i className="user icon"></i>
                  </div>
                </div>

                <div className="field">
                  <label>Password</label>
                  <div className="ui left icon input">
                    <Field type="password" component="input" name="password" autoComplete="none" placeholder="password" />
                    <i className="lock icon"></i>
                  </div>
                </div>

                <div>{this.props.ErrorMessage}</div>
                <button className="orange fluid ui button" type="submit">Sign Up</button>

              

              </div>

            </div>
          </div>
        </div>
      </form>
    );
  }
}

function mapStatetoProps(state) {
  return { ErrorMessage: state.auth.ErrorMessage };
}

export default compose(
  // "compose" nos ayuda a poder conectar varios HOC de una manera mas DRY
  connect(mapStatetoProps, actions),
  reduxForm({ form: 'signup' })
)(SignUp);

