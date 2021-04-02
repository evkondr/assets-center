import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";


import useHttp from '../hooks/useHttp'
import AuthContext from '../context/AuthContext'

const AssetsComponent = (props) => {
    const history = useHistory()
    const {request} = useHttp()
    const {token, logout} = useContext(AuthContext)

    const getData = async () =>{
        try{
            const data = await request('api/assets', 'GET', {authorization: `Bearer ${token}`})
            console.log(data)
        }catch(e){
            console.log(e)
            logout()
            history.push('/athorization')
        }
    }
    const [assets, setAssets] = useState({})

    useEffect(() => {
        getData()
    }, [])
    return(
        <div>Assets</div>
    )
}
export default AssetsComponent