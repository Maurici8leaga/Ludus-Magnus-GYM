import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Intro from './pages/Intro';
import RoutinesType from './pages/RoutinesType';
import RequireAuth from './requireAuth';
import Video from './pages/Video';
import Header from './Header';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Profile from './pages/Profile';
import VideoListByMuscle from './pages/VideoListByMuscle';
import Alert from '../components/extras/Alert';
import store from './store';
import { SIGN_IN } from '../actions/types';

if (localStorage.getItem('session')) {
    const payload = JSON.parse(localStorage.getItem('session'));
    if (typeof payload === 'object'){
        store.dispatch({ type: SIGN_IN, payload });
    }
    // <--- de esta forma el "setAuthToken" actualiza el token del axios. El token que tendra sera el ultimo usuario en logearse
}

class App extends Component {
    render() {
        return (
            <div className="ui container">
                <Provider store={store}>
                    <BrowserRouter>
                        <div>
                            <Header />
                            <Alert />
                            <Switch>
                                {/* NOTA LAS RUTAS DEL FRONTEND DEBEN SER DISTINTAS AL DEL BACKEND PARA NO CONFUNDIRSE */}
                                <Route path="/" exact component={Intro} />
                                <Route path="/signin" exact component={SignIn} />
                                <Route path="/signup" exact component={SignUp} />
                                <RequireAuth path="/profile" exact component={Profile} />
                                <RequireAuth path="/routinesType" exact component={RoutinesType} />
                                <RequireAuth path="/exercises/:muscle" exact component={VideoListByMuscle} />
                                <RequireAuth path="/video/execise/:id" exact component={Video} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </div>
        );

    }
}

export default App;
