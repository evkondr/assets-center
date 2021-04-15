import React from 'react'
import {Trash, PencilSquare} from 'react-bootstrap-icons'

import Modal from '../Modal/ModalContainer'
import AssetItem from './AssetItem'



const Details = (props) => {

    const {_id, cDay, mDay, byWho, owner, comments} = props.assetInfo 
    
    const onDeleteHandler = () => {
        props.deleteAsset(_id)
    }
    return <div className='details-block'>
        <h4>Details of asset id{_id}</h4>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Created</th>
                <th scope="col">Modified</th>
                <th scope="col">User</th>
                <th scope="col">Owner</th>
                <th scope="col">Comments</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{cDay}</td>
                    <td>{mDay}</td>
                    <td>{byWho}</td>
                    <td>{owner}</td>
                    <td>{comments}</td>
                </tr>
                <tr className='details-block_controller'>
                    <td colSpan={5}>
                        <button type="button" className="btn btn-danger" onClick={onDeleteHandler}><Trash />delete</button>
                        <button type="button" className="btn btn-success" data-toggle="modal" data-target="#editModal"><PencilSquare />edit</button>
                    </td>
                </tr>
            </tbody>
            </table>
            <Modal modalId={'editModal'} title={'Edit asset'} editAsset={props.editAsset} assetInfo={props.assetInfo}/>    
    </div>
}
export default Details