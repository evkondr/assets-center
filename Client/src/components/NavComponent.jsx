import React, {useContext} from 'react'
import { NavLink } from "react-router-dom";

import AuthContext from '../context/AuthContext'

const NavComponent = () => {
    const {isAuthorized, logout} = useContext(AuthContext)
    return(
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <div className="container">
            <a className="navbar-brand" href="#">Asset Center</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            {isAuthorized && <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav mr-auto">
                        <li className="nav-item active">
                            <NavLink className="nav-link" to="/assets" >Assets</NavLink>
                        </li>
                        <li className="nav-item">
                            <NavLink className="nav-link" to="/profile">Profile</NavLink>
                        </li>
                    </ul>
                <form className="form-inline my-2 my-lg-0">
                    <button className="btn" type="submit" onClick={logout}>Logout</button>
                </form>
            </div>}
            </div>
        </nav>
    )
}
export default NavComponent