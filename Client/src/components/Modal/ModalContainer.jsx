// Modal window to add or edit an asset
import React, {useState, useEffect} from 'react'

import ModalForm from './ModalForm'

const Modal = (props) => {
    const [formData, setFormData] = useState({name: '', serialNumber: '', department: '', price: '', owner: '', comments: ''})
    const onClickHandler = (e) => {
        e.preventDefault()
        if(props.modalId=='editModal'){
            props.editAsset(props.assetInfo._id, formData)
        }else{
            props.submitNewAsset(formData)
        }
    }
    useEffect(()=> {
        if(props.assetInfo){
            setFormData({...props.assetInfo})
        }
    }, [props.assetInfo])

    return(
        <div className="modal fade" id={props.modalId} tabIndex="-1" role="dialog" aria-labelledby="exampleModalCenterTitle" aria-hidden="true">
            <div className="modal-dialog modal-dialog-centered" role="document">
                <div className="modal-content">
                <div className="modal-header">
                    <h5 className="modal-title" id="exampleModalLongTitle">{props.title}</h5>
                    <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                    </button>
                </div>
                <div className="modal-body">
                    <ModalForm formData={formData} setFormData={setFormData}/>
                </div>
                <div className="modal-footer">
                    <button type="button" className="btn btn-secondary" data-dismiss="modal">Close</button>
                    <button type="button" className="btn btn-primary" data-dismiss="modal" onClick={onClickHandler}>Submit</button>
                </div>
                </div>
            </div>
        </div>
    )
}
export default Modal