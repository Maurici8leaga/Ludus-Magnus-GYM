import {combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import musculosReducer from './musculosReducer';
import ejercicioReducer from './ejercicioReducer';
import profileReducer from './profileReducer';
import messageAlert from './messageAlert';

export default combineReducers({
    auth: authReducer,
    message: messageAlert,
    musculos: musculosReducer,
    ejercicios: ejercicioReducer,
    form: formReducer,
    profile: profileReducer,
});