import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMusculo } from '../../actions';

class RoutinesType extends Component {

    buttonState = (musculo) => () => {
        const { history, changeMusculo } = this.props;

        changeMusculo(musculo);
        history.push('/routinesType/routin');
    }

    render() {
        return (
            <div className="ui container" align="center">
                <h1>TIPOS DE RUTINA</h1>
                <li className="ui vertical buttons">
                    <button className="fluid ui basic button" onClick={this.buttonState('BICEP')}>BICEP</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('TRICEP')}>TRICEP</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('PECHO')}>PECHO</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('HOMBRO')}>HOMBRO</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('ESPALDA')}>ESPALDA</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('PIERNA')}>PIERNA</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('ABDOMINAL')}>ABDOMINAL</button>
                </li>
            </div>
        );

    }
}

export default connect(null, { changeMusculo })(RoutinesType);