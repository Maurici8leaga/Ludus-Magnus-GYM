import React, { Component } from 'react';
import { connect } from 'react-redux';
import { changeMusculo } from '../../actions';
import './RoutinesType.scss';

class RoutinesType extends Component {

    buttonState = (musculo) => () => {
        const { history, changeMusculo } = this.props;

        changeMusculo(musculo);
        history.push('/routinesType/routin');
    }

    render() {
        return (
            <div className="ui container">

                <h1 className="intro">TIPOS DE RUTINA</h1>

                <div className="button-container">
                    <div className="button-div" onClick={this.buttonState('BICEP')}> BICEP </div>
                    <div className="button-div" onClick={this.buttonState('TRICEP')}>TRICEP</div>
                </div>
                <div className="button-container">
                    <div className="button-div" onClick={this.buttonState('PECHO')}>PECHO</div>
                    <div className="button-div" onClick={this.buttonState('HOMBRO')}>HOMBRO</div>
                </div>
                <div className="button-container">
                    <div className="button-div" onClick={this.buttonState('ESPALDA')}>ESPALDA</div>
                    <div className="button-div" onClick={this.buttonState('PIERNA')}>PIERNA</div>
                </div>
                <div className="button-container">
                    <div className="button-div" onClick={this.buttonState('ABDOMINAL')}>ABDOMINAL</div>
                </div>

            </div>    
        );
    }
}

export default connect(null, { changeMusculo })(RoutinesType);