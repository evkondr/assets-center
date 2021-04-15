import React, {useState} from 'react'

const ModalForm = (props) => {
    
    const onChangeHandler = (e) => {
        props.setFormData({...props.formData, [e.target.id]: e.target.value})
    }
    console.log(props.formData)
    return(
        <form>
            <div className="form-group">
                <label htmlFor="name">Asset name</label>
                <input type="text" className="form-control" id="name" aria-describedby="emailHelp" placeholder="Enter asset name" value={props.formData.name} onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="serialNumber">Serial number</label>
                <input type="text" className="form-control" id="serialNumber" placeholder="Enter serial number" value={props.formData.serialNumber} onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="department">Department</label>
                <input type="text" className="form-control" id="department" aria-describedby="emailHelp" placeholder="Enter asset owner department" value={props.formData.department} onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="price">Asset price</label>
                <input type="text" className="form-control" id="price" placeholder="Enter serial asset price" value={props.formData.price} onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="owner">Asset owner</label>
                <input type="text" className="form-control" id="owner" aria-describedby="emailHelp" placeholder="Enter asset asset owner" value={props.formData.owner} onChange={onChangeHandler}/>
            </div>
            <div className="form-group">
                <label htmlFor="comments">Comments</label>
                <input type="text" className="form-control" id="comments" placeholder="Enter serial comments" value={props.formData.comments} onChange={onChangeHandler}/>
            </div>
        </form>
    )
}
export default ModalForm