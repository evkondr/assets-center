import {useState, useCallback, useEffect} from 'react'
import { useHistory } from "react-router-dom";
const storageKey = 'user'
const useAuth = () => {
    const [token, setToken] = useState(null)
    const [userId, setUserId] = useState(null)
    const history = useHistory()
    const login = useCallback((id, jwtToken) => {
        setToken(jwtToken)
        setUserId(id)
        localStorage.setItem(storageKey, JSON.stringify({id, token: jwtToken}))
    }, [])
    const logout = useCallback(()=>{
        setToken(null)
        setUserId(null)
        localStorage.removeItem(storageKey)
    }, [])
    useEffect(() => {
        //check if user's id and token was stored
        const data = JSON.parse(localStorage.getItem(storageKey))
        if(data){
            login(data.id, data.token)
        }
    }, [login])
    return { token, userId, login, logout}
}
export default useAuth
