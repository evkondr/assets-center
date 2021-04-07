import React from 'react'

const Preloader = () => {
    return(
        <div className="row align-items-center justify-content-center">
            <div className="d-flex ">
                <div className="spinner-border" role="status">
                    <span className="visually-hidden"></span>
                </div>
                <p>Loading...</p>
            </div>
        </div>
        
    )
}
export default Preloader