import React from 'react'

import AuthComponent from './AuthComponent'
import NavComponent from './NavComponent'
import AssetsComponent from './AssetsComponent'
import ProfileComponent from './ProfileComponent'

import { Switch, Route, Redirect } from "react-router-dom";
const Main = () => {
    return(
        <div className='main'>
            <NavComponent />
            <Switch>
                <Route exact path="/">
                    <Redirect to="/assets" />
                </Route>
                <Route path="/assets">
                    <AssetsComponent />
                </Route>
                <Route path="/profile">
                    <ProfileComponent />
                </Route>
                <Route path="/athorization">
                    <AuthComponent />
                </Route>
            </Switch>
        </div>
    )
}
export default Main
