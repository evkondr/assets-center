import React, {useState, useContext} from 'react'
import {useHistory} from 'react-router-dom'

import useHttp from '../hooks/useHttp'
import AuthContext from '../context/AuthContext'

//Component initialization
const AuthComponent = (props) =>{
    const { isLoading, request, error } = useHttp()
    const [alert, setAlert] = useState(null)
    const [form, setForm] = useState({email: '', password: ''})
    const context = useContext(AuthContext)
    const history = useHistory()
    //Inputs change handler
    const onChangeHandler = (e) => {
        setForm({...form, [e.target.id]:e.target.value})
    }
    //Login click handler
    const onLoginHandler = async (e) =>  {
        e.preventDefault()
        try{
            const data = await request('/api/auth/login', 'POST', {'Content-Type': 'application/json'}, {...form})
            context.login(data.userId, data.token)
            history.push('/')
        }catch(e){
            setAlert({msg: e.message, class: "alert alert-warning"})
        }
    }
    //Register click handlers
    const onRegHandler = async (e) =>  {
        e.preventDefault()
        try{
            const data = await request('/api/auth/register', 'POST', {'Content-Type': 'application/json'}, {...form})
            setAlert({msg: "User successfully registered", class: "alert alert-success"})
        }catch(e){
            setAlert({msg: e.message, class: "alert alert-warning"})
        }
    }
    return(
        <div className="container">
            <div className="row align-items-center justify-content-center">
                <div className="form-container">
                    <h4>Authorization</h4>
                    <form>
                        <div className="form-group">
                            <label htmlFor="email">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter your email" onChange={onChangeHandler} value={form.email}/>
                            <small id="emailHelp" className="form-text text-muted">We'll never share your email with anyone else.</small>
                        </div>
                        <div className="form-group">
                            <label htmlFor="password">Password</label>
                            <input type="password" className="form-control" id="password" placeholder="Password" onChange={onChangeHandler} value={form.password}/>
                        </div>
                        {/* <div className="form-check">
                            <input type="checkbox" className="form-check-input" id="exampleCheck1" />
                            <label className="form-check-label" htmlFor="exampleCheck1">Check me out</label>
                        </div> */}
                        <button type="submit" className="btn btn-primary" onClick={onLoginHandler} disabled={isLoading}>Login</button>
                        <button type="submit" className="btn btn-secondary" onClick={onRegHandler} disabled={isLoading}>Register</button>
                    </form>
                    {alert&&<div className={alert.class} role="alert">
                        {alert.msg}
                    </div>}
                </div>
                
                
            </div>
        </div>
        
    )
}
export default AuthComponent