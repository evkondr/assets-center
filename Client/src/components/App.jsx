import React, {Fragment} from 'react'
import { BrowserRouter as Router } from "react-router-dom";

import AuthComponent from './AuthComponent'
import NavComponent from './NavComponent'
import Main from './Main'
import useAuth from '../hooks/useAuth'
import AuthContext from '../context/AuthContext'

let isAuthorized = false
const App = () =>{
    const {login, logout, token, userId} = useAuth()
    isAuthorized = !!token
    return(
        <AuthContext.Provider value = {{login, logout, token, userId, isAuthorized}} >
            <Router>
            {isAuthorized? <Main />:
            <Fragment>
                <NavComponent />
                <div className="main">
                    <AuthComponent />
                </div>
            </Fragment>
            } 
            </Router>
        </AuthContext.Provider>
    )
}
export default App