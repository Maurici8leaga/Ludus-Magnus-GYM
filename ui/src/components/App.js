import React, { Component } from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';
import { Provider } from 'react-redux';
import Intro from './pages/Intro';
import Routin from './pages/Routin';
import RoutinesType from './pages/RoutinesType';
import RequireAuth from './RequireAuth';
import Video from './pages/Video';
import Header from './Header';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Profile from './pages/Profile';
import Alert from '../components/extras/Alert';
import store from './store';
import setAuthToken from './interceptor/setAuthToken';

if (localStorage.token) {
    setAuthToken(localStorage.token);
    // <--- de esta forma el "setAuthToken" actualiza el token del axios. El token que tendra sera el ultimo usuario en logearse
}

class App extends Component {
    render() {
        return (
            <div className="ui container">
                <Provider store={store}>
                    <BrowserRouter>
                        <Alert />
                        <div>
                            <Header />
                            <Switch>
                                {/* NOTA LAS RUTAS DEL FRONTEND DEBEN SER DISTINTAS AL DEL BACKEND PARA NO CONFUNDIRSE */}
                                <Route path="/" exact component={Intro} />
                                <Route path="/signin" exact component={SignIn} />
                                <Route path="/signup" exact component={SignUp} />
                                <RequireAuth path="/profile" exact component={Profile} />
                                <RequireAuth path="/routinesType" exact component={RoutinesType} />
                                <RequireAuth path="/routinesType/routin" exact component={Routin} />
                                <RequireAuth path="/routinesType/routin/video" exact component={Video} />
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </div>
        );

    }
}

export default App;
