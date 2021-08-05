import React, { Component } from 'react'
import './style.css'

export class index extends Component {
    render() {
        return (
            <div className="card" {...this.props}>

                <div className="cardHeader">
                    {this.props.headerleft && <div>{this.props.headerleft}</div> }
                    {this.props.headerright && this.props.headerright}
                </div>

                {this.props.children}
            </div>
        )
    }
}

export default index
