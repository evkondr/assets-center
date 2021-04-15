import React, {useState, useEffect, useContext} from 'react'
import { useHistory } from "react-router-dom";
import {PlusCircleFill} from 'react-bootstrap-icons'

import useHttp from '../../hooks/useHttp'
import AuthContext from '../../context/AuthContext'
import Preloader from '../Preloader'
import AssetItem from './AssetItem'
import Details from './Detals'
import Modal from '../Modal/ModalContainer'

//Component initialization
const AssetsContainer = () => {
    const history = useHistory()
    const {request, isLoading} = useHttp()
    const [assets, setAssets] = useState([])
    const [assetInfo, setAssetInfo] = useState({})
    const [isDisplayed, setDisplayed] = useState(false)
    const {token, logout, userId} = useContext(AuthContext)
    //Display asset details block
    const displayDetails = (asset) => {
        setDisplayed(!isDisplayed)
        setAssetInfo(asset)
    }
    //Delete an asset
    const deleteAsset = async (id) => {
        try{
            await request('api/assets', 'DELETE', {authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}, {id}) //request for delete
            setDisplayed(false) //close the details blog 
            gatAssets() //get new state
        }catch(e){
            alert(e.message)
        }
    }
    //Add new asset to DB
    const submitNewAsset = async (asset) => {
        try{
            await request('api/assets', 'POST', {authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}, {...asset, byWho: userId}) //request for adding
            gatAssets() //get new state
        }catch(e){
            alert(e.message)
        }
    }
    //Data fetching from server
    const gatAssets = async () =>{
        try{
            const data = await request('api/assets', 'GET', {authorization: `Bearer ${token}`}) //request for getting data
            setAssets(data.result) //set the state
        }catch(e){
            //if error occurs 
            logout()
            history.push('/athorization')
        }
    }
    //Edit current asset
    const editAsset = async(id, updates) => {
        try{
            await request('api/assets', 'PATCH', {authorization: `Bearer ${token}`, 'Content-Type': 'application/json'}, {id, updates: {...updates, byWho: userId}})
            gatAssets() //get new state
        }catch(e){
            //if error occurs 
            logout()
            history.push('/athorization')
        }
       
    }
    //When component did mount
    useEffect(() => {
        gatAssets() 
    }, [])
    //Set preloader until data fetched
    if(isLoading){
        return <Preloader/>
    }
    return(
        <div className="container">
            <div className="row">
                <Modal modalId={'addModal'} title={'Add new asset'} submitNewAsset={submitNewAsset}/>
                <table className="table table-striped assets-list">
                    <thead>
                        <tr colSpan='6'>
                            <td>
                                <button type="button" className="btn add-btn btn-success" data-toggle="modal" data-target="#addModal"> <PlusCircleFill/>Add new asset</button>
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
                        {/* Map table rows with fetched assets  */}
                        { assets.length?
                            assets.map((asset, index) => (
                                <AssetItem asset={asset} num={index} key = {asset._id} displayDetails={displayDetails}/>
                            )):<tr><td>{'There are no assets in the database'}</td></tr>
                        }
                    </tbody>
                </table>
                {isDisplayed && <Details assetInfo={assetInfo} deleteAsset={deleteAsset} editAsset={editAsset}/>}
            </div>
        </div>
        
    )
}
export default AssetsContainer