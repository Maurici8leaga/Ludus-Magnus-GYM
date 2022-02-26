import {combineReducers } from 'redux';
import {reducer as formReducer} from 'redux-form';
import authReducer from './authReducer';
import videoReducer from './videoReducer';
import profileReducer from './profileReducer';
import messageAlert from './messageAlert';
import modalReducer from './modalReducer';

export default combineReducers({
    auth: authReducer,
    message: messageAlert,
    video: videoReducer,
    form: formReducer,
    profile: profileReducer,
    modal: modalReducer
});