import React from 'react';
import {BrowserRouter, Route, Switch} from 'react-router-dom';
import Intro from './pages/Intro';
import Routin from './pages/Routin';
import RoutinesType from './pages/RoutinesType';
import Video from './pages/Video';
import Header from './Header';

const App = () => {
    return(
        <div className="ui container">
            <BrowserRouter>
                <div>
                    <Header/>
                    <Switch>
                        <Route path="/" exact component={Intro}/>
                        <Route path="/routinesType" exact component={RoutinesType}/>
                        <Route path="/routinesType/routin" exact component={Routin}/>
                        <Route path="/routinesType/routin/video" exact component={Video}/>
                    </Switch>
                </div>
            </BrowserRouter>
        </div>
    );
}

export default App;
