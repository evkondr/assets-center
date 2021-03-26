import React from 'react'
import { BrowserRouter as Router } from "react-router-dom";
import {
    Switch,
    Route
  } from "react-router-dom";

import AuthComponent from './AuthComponent'
import NavComponent from './NavComponent'
import AssetsComponent from './AssetsComponent';
import ProfileComponent from './ProfileComponent';

const isAuthorized = true
const App = () =>{
    if(!isAuthorized){
        return (
            <Router>
                <div className="main">
                <NavComponent />
                <AuthComponent />
            </div>
            </Router>
        )
    }
    return(
        <Router>
            <div className='main'>
                <NavComponent />
                <Switch>
                    <Route exact path="/">
                        <AssetsComponent />
                    </Route>
                    <Route path="/profile">
                        <ProfileComponent />
                    </Route>
                </Switch>
            </div>
        </Router>
        
    )
}
export default App