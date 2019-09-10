import {combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import musculosReducer from './musculosReducer';
import ejercicioReducer from './ejercicioReducer';

export default combineReducers({
    auth: authReducer,
    musculos: musculosReducer,
    ejercicios: ejercicioReducer,
    form: formReducer
});