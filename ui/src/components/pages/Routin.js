import React, { Component } from 'react';
import { connect } from 'react-redux';
import {changeEjercicio} from '../../actions';

class Routin extends Component {

    buttonState = (ejercicio) => () => {
        const { history, changeEjercicio } = this.props

        changeEjercicio(ejercicio);
        history.push('/routinesType/routin/video');
    }


    render() {
        const { selectedMusculo } = this.props;

        return (
            <div className="ui container" align="center">
                <h1>{selectedMusculo}</h1>
                
                <li className="ui vertical buttons">
                    <button className="fluid ui basic button" onClick={this.buttonState('MAQUINA')}>MAQUINA</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('MANCUERNA')}>MANCUERNA</button>
                    <button className="fluid ui basic button" onClick={this.buttonState('SIN PESAS')}>SIN PESAS</button>
                </li>
            </div>
        );
    }
}

const mapStateToProps = ({ musculos }) => {
    return { selectedMusculo: musculos.selectedMusculo }
}


export default connect(mapStateToProps, {changeEjercicio})(Routin);