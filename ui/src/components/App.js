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
import NotFoundPage from './extras/NotFoundPage';
import store from './store';
import { SIGN_IN } from '../actions/types';
import LoadToTop from '../components/extras/helpers';

if (localStorage.getItem('session')) {
    const payload = JSON.parse(localStorage.getItem('session'));
    // JSON.parse su funcion es convertir un string en un objeto, en este caso convertir el string que se encuentra almacenando dentro del localStore en object
    // el objeto que sen encuentra dentro del localStorage (vendria siendo "session")es el que permitira que el user se mantenga logeado hasta que decida salir del pag
    if (typeof payload === 'object') {
        // el typeoff retorna el tipo de dato, en este caso se quiere asegurar que "payload" sea un object si es un object entonces se podra realizar el dispatch
        // se necesita que payload sea un objecto para que asi el dispatch ejecute el actions y el mismo pueda usar el los datos dentro del payload
        store.dispatch({ type: SIGN_IN, payload });
        // con store podemos hacer dispatch de un actions SOLO SI TENEMOS ACCESO AL STORE en donde se vaya a realizar
    }
}

class App extends Component {
    render() {
        return (
            <div>
                <Provider store={store}>
                    <BrowserRouter>
                        <LoadToTop>
                            <>
                                <Header />
                                <Switch>
                                    {/* NOTA LAS RUTAS DEL FRONTEND DEBEN SER DISTINTAS AL DEL BACKEND PARA NO CONFUNDIRSE */}
                                    <Route path="/" exact component={Intro} />
                                    <Route path="/signin" exact component={SignIn} />
                                    <Route path="/signup" exact component={SignUp} />
                                    <RequireAuth path="/profile" exact component={Profile} />
                                    <RequireAuth path="/routinesType" exact component={RoutinesType} />
                                    <RequireAuth path="/exercises/:muscle" exact component={VideoListByMuscle} />
                                    <RequireAuth path="/video/execise/:id" exact component={Video} />
                                    <Route exact component={NotFoundPage} />
                                </Switch>
                            </>
                        </LoadToTop>
                    </BrowserRouter>
                </Provider>
            </div>
        );

    }
}

export default App;