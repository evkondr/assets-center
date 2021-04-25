import React, {useState, useEffect, useContext} from 'react'
import {useParams, useHistory} from "react-router-dom";

import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import Preloader from '../Preloader'

const ProfileComponent = () => {
    const history = useHistory()
    const [user, setUser] = useState({email:'', name:'', surname:'', position:''})
    const {userId} = useParams()  //Get parametr
    const {request, isLoading} = useHttp()  //Custom hook
    const {token, logout} = useContext(AuthContext)
    const currentUser =  useContext(AuthContext).userId
    const isCurrentUser = user._id == currentUser; //Make form editable when logged in user equal to routed
    const [isEditable, setIsEditable] = useState(false) //Allow to edit inputs

    
    //Change user with specific id
    const sendChanges = async () =>{
        try{
            const data = await request(`/api/users/`, 'PATCH', {authorization: `Bearer ${token}`}, {...user, id:userId})
            console.log(data)
        }catch(e){
            console.log(e)
        }
        
    }
    //Get user with specific id
    const getUser = async () => {    
        try{
            const data = await request(`/api/users/${userId}`, 'GET', {authorization: `Bearer ${token}`})
            setUser(data.user)
        }catch(e){
            console.log(e)
            logout()
            history.push('/athorization')
        }
    }
    //Inputs onchange handler sets state of changes
    const onChangeHandler = (e) => {
        const name = e.target.id
        const value = e.target.value
        setUser({...user, [name]:value})
    }
    //Click handler with condition
    //Sets input disable attribute to false and let make and send changes to server   
    const onClickHandler = (e) => {
        e.preventDefault()
        if(isEditable){ //
            sendChanges()
            setIsEditable(false) 
        }else{
            setIsEditable(true)
        }
    }
    useEffect(() => {
        getUser()
    }, [])

    if(isLoading){
        return <Preloader />
    }

    return(
        <div className="row">
            <div className="container">
                <div className="profile-block">
                    <h2>
                        User ID: {user._id}
                    </h2>
                    <form>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email address</label>
                            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" value={user.email} disabled onChange={onChangeHandler}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="name" className="form-label">Name</label>
                            <input type="text" className="form-control" id="name" aria-describedby="emailHelp" value={user.name} disabled = {!isEditable} onChange={onChangeHandler}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="surname" className="form-label">surname</label>
                            <input type="text" className="form-control" id="Surname" aria-describedby="emailHelp" value={user.surname} disabled = {!isEditable} onChange={onChangeHandler}/>
                        </div>
                        <div className="mb-3">
                            <label htmlFor="position" className="form-label">position</label>
                            <input type="text" className="form-control" id="position" aria-describedby="emailHelp" value={user.position} disabled = {!isEditable} onChange={onChangeHandler}/>
                        </div>
                        {isCurrentUser && <button type="submit" className="btn btn-primary" onClick={onClickHandler}>{isEditable?'save':'edit'}</button>} {isCurrentUser && <button type="submit" className="btn btn-danger">Delete</button>}
                    </form>
                </div>
            </div>
                
        </div>
    )
}
export default ProfileComponent