import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";
import {PlusCircleFill} from 'react-bootstrap-icons'

import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import Preloader from '../Preloader'
import AssetItem from './AssetItem'
import Details from './Detals'
import Modal from '../AddModal/ModalContainer'

//Component initialization
const AssetsContainer = () => {
    const history = useHistory()
    const {request, isLoading} = useHttp()
    const [assets, setAssets] = useState([])
    const [assetInfo, setAssetInfo] = useState({})
    const [isDisplayed, setDisplayed] = useState(false)
    const {token, logout} = useContext(AuthContext)
    const displayDetails = (asset) => {
        setDisplayed(!isDisplayed)
        setAssetInfo(asset)
    }
    // Data fetching from server
    useEffect(() => {
        (async () =>{
            try{
                const data = await request('api/assets', 'GET', {authorization: `Bearer ${token}`})
                setAssets(data.result)
            }catch(e){
                logout()
                history.push('/athorization')
            }
        })()
    }, [])
    if(isLoading){
        return <Preloader/>
    }
    return(
        <div className="container">
            <div className="row">
                <Modal />  
                <table className="table table-striped assets-list">
                    <thead>
                        <tr colspan='6'>
                            <td>
                                <button type="button" class="btn add-btn btn-success" data-toggle="modal" data-target="#addModal"> <PlusCircleFill/>Add new asset</button>
                            </td>
                        </tr>
                        <tr>
                            <th scope="col">#</th>
                            <th scope="col">Name</th>
                            <th scope="col">S/N</th>
                            <th scope="col">Price</th>
                            <th scope="col">Location</th>
                            <th scope="col">More</th>
                        </tr>
                    </thead>
                    <tbody>
                        { assets.length?
                            assets.map((asset, index) => (
                                <AssetItem asset={asset} num={index} key = {asset._id} displayDetails={displayDetails}/>
                            )):'There are no assets in the database'
                        }
                    </tbody>
                </table>
                {isDisplayed && < Details assetInfo = {assetInfo}/>}
            </div>
        </div>
        
    )
}
export default AssetsContainer