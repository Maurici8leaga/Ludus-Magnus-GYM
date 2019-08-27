import {combineReducers } from 'redux';
import authReducer from './authReducer';
import musculosReducer from './musculosReducer';
import ejercicioReducer from './ejercicioReducer';

export default combineReducers({
    auth: authReducer,
    musculos: musculosReducer,
    ejercicios: ejercicioReducer

});