import React, { Component } from 'react'
import { Col, Container, Jumbotron, Row } from 'react-bootstrap'
import Layout from '../../components/Layout'
import './style.css'
import { connect } from 'react-redux'
import { Redirect } from 'react-router-dom'


const mapStateToProps = state => {
    return {
        ...state
    }
}
class index extends Component {
    render() {
        if (!this.props.authReducers.authenticate) {
            return (
                <Redirect to='/signin' />
            )
        }

        return (
            <Layout sidebar>
                <h1>home</h1>

            </Layout>
        )
    }
}

export default connect(mapStateToProps)(index)
