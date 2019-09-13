import React, {Component} from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import {Provider} from 'react-redux';
import {createStore, applyMiddleware} from 'redux';
import reduxThunk from 'redux-thunk';
import Intro from './pages/Intro';
import Routin from './pages/Routin';
import RoutinesType from './pages/RoutinesType';
import Video from './pages/Video';
import Header from './Header';
import SignIn from './auth/SignIn';
import SignOut from './auth/SignOut';
import SignUp from './auth/SignUp';
import reducers from '../reducers';

const store = createStore(
    reducers,
    {auth: {isSignedIn: localStorage.getItem('token')}},
    applyMiddleware(reduxThunk)
);

class App extends Component {
    render(){
        return(
            <div className="ui container">
                <Provider store ={store}>
                    <BrowserRouter>
                        <div>
                            <Header/>
                            <Switch>
                                <Route path="/" exact component={Intro}/>
                                <Route path="/signin" exact component={SignIn}/>
                                <Route path="/signout" exact component={SignOut}/>
                                <Route path="/signup" exact component={SignUp}/>
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
