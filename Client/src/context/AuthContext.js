import { createContext } from 'react'

const AuthContext  = createContext({
    userId: null,
    token: null,
    login: () =>{},
    logout: () => {},
    isAthenticated: false
})
export default AuthContext