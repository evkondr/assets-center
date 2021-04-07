import React from 'react'
import { ThreeDots } from 'react-bootstrap-icons';

const AssetItem = (props) => {
    const { _id, name, serialNumber, price, department} = props.asset
    const onClickHandler = () => {
        props.displayDetails(props.asset)
    }
    return(
        <tr>
            <th >{props.num}</th>
            <td>{name}</td>
            <td>{serialNumber}</td>
            <td>{price}</td>
            <td>{department}</td>
            <td className='showmore' onClick={onClickHandler}><ThreeDots size={30}/></td>
        </tr>
    )
}
export default AssetItem