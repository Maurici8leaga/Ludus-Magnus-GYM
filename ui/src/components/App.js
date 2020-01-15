import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import Intro from './pages/Intro';
import Routin from './pages/Routin';
import RoutinesType from './pages/RoutinesType';
import RequireAuth from './RequireAuth';
import Video from './pages/Video';
import Header from './Header';
import SignIn from './auth/SignIn';
import SignUp from './auth/SignUp';
import Profile from './pages/Profile';
import store from './store';
import setAuthToken from './interceptor/setAuthToken';

if(localStorage.token){
    setAuthToken(localStorage.token);
    console.log('TOKEN ---->', localStorage.token);
}

class App extends Component {
    render(){
        return(
            <div className="ui container">
                <Provider store ={store}>
                    <BrowserRouter>
                        <div>
                            <Header/>
                            <Switch>
                                {/* NOTA LAS RUTAS DEL FRONTEND DEBEN SER DISTINTAS AL DEL BACKEND PARA NO CONFUNDIRSE */}
                                <Route path="/" exact component={Intro}/>
                                <Route path="/signin" exact component={SignIn}/>
                                <Route path="/signup" exact component={SignUp}/>
                                <Route path="/profile" exact component={Profile}/>
                                <Route path="/routinesType" exact component={RoutinesType}/>
                                <Route path="/routinesType/routin" exact component={Routin}/>
                                <Route path="/routinesType/routin/video" exact component={Video}/>
                            </Switch>
                        </div>
                    </BrowserRouter>
                </Provider>
            </div>
        );
    
    }
}

export default App;
