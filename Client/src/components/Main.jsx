import React from 'react'

import AuthComponent from './AuthComponent'
import NavComponent from './NavComponent'
import AssetsContainer from './AssetsPage/AssetsContainer'
import ProfileComponent from './ProfilePage/ProfileComponent'

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
                    <AssetsContainer />
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
