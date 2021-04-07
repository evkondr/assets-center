import React from 'react'
import AssetItem from './AssetItem'

const Details = (props) => {
    const {_id, cDay, mDay, byWho, comment} = props.assetInfo 
    return <div className='details-block'>
        <h4>Details of asset id{_id}</h4>
        <table className="table">
            <thead>
                <tr>
                <th scope="col">Created</th>
                <th scope="col">Modified</th>
                <th scope="col">User</th>
                <th scope="col">Comments</th>
                </tr>
            </thead>
            <tbody>
                <tr>
                    <td>{cDay}</td>
                    <td>{mDay}</td>
                    <td>{byWho}</td>
                    <td>{comment}</td>
                </tr>
                
                <tr className='details-block_controller'>
                    <td colSpan={4}>
                        <div className="btn-group" role="group" aria-label="Basic example">
                            <button type="button" className="btn btn-danger">delete</button>
                            <button type="button" className="btn btn-success">edite</button>
                        </div>
                    </td>
                </tr>
            </tbody>
            </table>
    </div>
}
export default Details