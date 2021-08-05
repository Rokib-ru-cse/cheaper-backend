import React from 'react'

function Loading() {
    return (
        <>
            <div className="container">
                <div className="row">
                    <div className="col-12" style={{padding:"60px"}}>
                    <i className="fa fa-spinner fa-5x fa-fw text-primary fa-pulse"></i>
                    <i className='fa fa-spinner fa-pulse text-primary fa-5x'></i>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Loading
