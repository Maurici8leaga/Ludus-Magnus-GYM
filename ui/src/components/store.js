import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import reducers from '../reducers';

const INITIAL_STATE = {}
const store = createStore(
    reducers,
    INITIAL_STATE,
    applyMiddleware(reduxThunk)
);

export default store;