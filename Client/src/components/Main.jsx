import React, {Fragment} from 'react'

import AuthComponent from './AuthComponent'
import NavComponent from './NavComponent'
import AssetsContainer from './AssetsPage/AssetsContainer'
import ProfileComponent from './ProfilePage/ProfileComponent'

import { Switch, Route, Redirect } from "react-router-dom";
const Main = () => {
    return(
        <Fragment>
            <NavComponent />
            <div className='main'>
                <Switch>
                    <Route exact path="/">
                        <Redirect to="/assets" />
                    </Route>
                    <Route path="/assets">
                        <AssetsContainer />
                    </Route>
                    <Route exact path="/profile/:userId" children={<ProfileComponent />} />
                    <Route path="/athorization">
                        <AuthComponent />
                    </Route>
                    <Route exact path="/users/:userId" children={<ProfileComponent />} />
                </Switch>
            </div>
        </Fragment>
        
    )
}
export default Main
