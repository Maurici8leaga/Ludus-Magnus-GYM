import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeEjercicio} from '../../actions';
import { compose } from 'redux';
import requireAuth from '../requireAuth';
import './RoutinesType.scss';

class Routin extends Component {

    buttonState = (ejercicio) => () => {
        const { history, changeEjercicio } = this.props

        changeEjercicio(ejercicio);
        history.push('/api/routinesType/routin/video');
    }


    render() {
        const { selectedMusculo } = this.props;

        return (
            <div className="ui container">

                <h1 className="intro">{selectedMusculo}</h1>
                
                <div className="button-container2">
                    <div className="button-div" onClick={this.buttonState('MAQUINA')}>MAQUINA</div>
                    <div className="button-div" onClick={this.buttonState('MANCUERNA')}>MANCUERNA</div>
                    <div className="button-div" onClick={this.buttonState('SIN PESAS')}>SIN PESAS</div>
                </div>

            </div>
        );
    }
}

const mapStateToProps = ({ musculos }) => {
    return { selectedMusculo: musculos.selectedMusculo }
}

// aqui falta incorporar el compose para unirlo con el "requireAuth"
export default compose(
    connect(mapStateToProps, {changeEjercicio}),
    requireAuth
)(Routin);